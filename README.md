# LexNode

LexNode is an AI-powered legal document automation platform with a React frontend and an Express backend powered by Gemini.

## Backend Files

- `server.js`
- `services/geminiService.js`
- `.env.example`

## Setup

1. Install dependencies:

```bash
npm install
```

2. Create a local environment file:

```bash
copy .env.example .env
```

3. Add your Gemini API key to `.env`:

```env
PORT=5000
GEMINI_API_KEY=your_gemini_api_key_here
VITE_API_BASE_URL=http://localhost:5000
```

## Run Instructions

Run the backend:

```bash
npm run server
```

Run the frontend:

```bash
npm run dev
```

Run both together:

```bash
npm run dev:full
```

## API Endpoints

### `GET /`

Returns:

```text
LexNode API is running
```

### `POST /generate-document`

Request body:

```json
{
  "partyA": "Acme Pvt Ltd",
  "partyB": "John Doe",
  "duration": "12 months",
  "jurisdiction": "India",
  "extra": "Include confidentiality obligations for contractors."
}
```

The server also accepts the current frontend field names:

```json
{
  "partyAName": "Acme Pvt Ltd",
  "partyBName": "John Doe",
  "duration": "12 months",
  "jurisdiction": "India",
  "additionalClauses": "Include confidentiality obligations for contractors."
}
```

Response:

```json
{
  "document": "Generated NDA text..."
}
```

### `POST /chat`

Request body:

```json
{
  "message": "What is an NDA in simple terms?"
}
```

Response:

```json
{
  "reply": "An NDA is a confidentiality agreement..."
}
```

## Folder Structure

```text
LexNode/
|-- services/
|   `-- geminiService.js
|-- src/
|-- .env.example
|-- package.json
|-- server.js
`-- README.md
```
