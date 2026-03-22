# Flights vs Fares

An AI-powered flight search launcher. Describe your trip, get strategic booking advice, then open all 8 major flight search sites simultaneously — in one click. No ads, no tracking, always free.

## Features

- **AI trip advisor** — chat with an AI strategist before you book; get a budget reality check, best booking window, and routing hacks
- **One-click multi-launch** — opens Google Flights, Skyscanner, Kayak, Kiwi.com, Momondo, Expedia, CheapFlights, and Hopper simultaneously
- **Multi-provider AI** — swap between Anthropic, OpenAI, DeepSeek, Gemini, or a local Ollama model via a single environment variable
- **Flight tips** — curated strategy guide covering booking windows, departure day savings, split tickets, and more
- **Sky theme** — day/night atmosphere toggle

## Getting started

### Prerequisites

- Node.js 20+
- Go 1.26+
- An API key for at least one supported AI provider (see below)

### Environment variables

Create a `.env.local` file inside `flights-vs-fares-client/`:

```
AI_PROVIDER=anthropic          # anthropic | openai | deepseek | gemini | ollama
ANTHROPIC_API_KEY=...
OPENAI_API_KEY=...
DEEPSEEK_API_KEY=...
GEMINI_API_KEY=...
OLLAMA_MODEL=llama3.3          # optional, defaults to llama3.3
```

Only the key for your chosen provider is required.

### Run the client

```bash
cd flights-vs-fares-client
npm install
npm run dev
```

The app runs at `http://localhost:3000`.

### Run the server

```bash
cd flights-vs-fares-server
go run ./cmd/server
```

The server runs at `http://localhost:8080` and exposes a `/health` endpoint.

## AI providers

| Provider    | `AI_PROVIDER` value | Model used          |
|-------------|---------------------|---------------------|
| Anthropic   | `anthropic`         | claude-sonnet-4-6   |
| OpenAI      | `openai`            | gpt-4o              |
| DeepSeek    | `deepseek`          | deepseek-chat       |
| Google      | `gemini`            | gemini-2.0-flash    |
| Ollama      | `ollama`            | `OLLAMA_MODEL` env  |

## Testing

```bash
cd flights-vs-fares-client
npm test              # run all tests
npm run test:watch    # watch mode
npm run test:coverage # with coverage report
```
