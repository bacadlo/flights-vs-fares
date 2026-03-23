package main

import (
	"log/slog"
	"net/http"
	"os"
)

const contentTypeJSON = "application/json"

var healthBody = []byte("{\"status\":\"ok\"}\n")

func healthHandler(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodGet {
		http.Error(w, "method not allowed", http.StatusMethodNotAllowed)
		return
	}
	w.Header().Set("Content-Type", contentTypeJSON)
	if _, err := w.Write(healthBody); err != nil {
		slog.Error("health write failed", "error", err)
	}
}

func main() {
	port := os.Getenv("PORT")
	if port == "" {
		port = "8080"
	}

	mux := http.NewServeMux()

	mux.HandleFunc("/health", healthHandler)

	slog.Info("starting server", "port", port)
	if err := http.ListenAndServe(":"+port, mux); err != nil {
		slog.Error("server failed", "error", err)
		os.Exit(1)
	}
}
