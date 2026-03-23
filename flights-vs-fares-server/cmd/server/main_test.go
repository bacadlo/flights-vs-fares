package main

import (
	"encoding/json"
	"net/http"
	"net/http/httptest"
	"strings"
	"testing"
)

func TestHealthHandler_OK(t *testing.T) {
	req := httptest.NewRequest(http.MethodGet, "/health", nil)
	rec := httptest.NewRecorder()

	healthHandler(rec, req)

	if rec.Code != http.StatusOK {
		t.Fatalf("expected status 200, got %d", rec.Code)
	}

	ct := rec.Header().Get("Content-Type")
	if ct != contentTypeJSON {
		t.Fatalf("expected Content-Type %q, got %q", contentTypeJSON, ct)
	}

	var body map[string]string
	if err := json.NewDecoder(rec.Body).Decode(&body); err != nil {
		t.Fatalf("failed to decode response body: %v", err)
	}
	if body["status"] != "ok" {
		t.Fatalf("expected status \"ok\", got %q", body["status"])
	}
}

func TestHealthHandler_MethodNotAllowed(t *testing.T) {
	for _, method := range []string{http.MethodPost, http.MethodPut, http.MethodDelete} {
		req := httptest.NewRequest(method, "/health", nil)
		rec := httptest.NewRecorder()

		healthHandler(rec, req)

		if rec.Code != http.StatusMethodNotAllowed {
			t.Errorf("%s /health: expected 405, got %d", method, rec.Code)
		}
		if !strings.Contains(rec.Body.String(), "method not allowed") {
			t.Errorf("%s /health: expected body to contain \"method not allowed\", got %q", method, rec.Body.String())
		}
	}
}
