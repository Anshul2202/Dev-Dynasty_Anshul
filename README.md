# LexNode

LexNode is an AI-powered legal document platform for small businesses, founders, freelancers, and individuals who need help preparing documents faster. It combines a React frontend with an Express backend and lets users generate legal drafts, chat with an AI assistant, and upload existing documents for summarization.

## What The App Does

LexNode helps users with three main workflows:

1. Generate legal documents  
Users can fill in details such as party names, duration, jurisdiction, and additional clauses. LexNode sends that information to the backend, creates a structured AI prompt, and returns a draft document such as an NDA or similar agreement.

2. Chat with an AI legal assistant  
Users can ask beginner-friendly legal questions in plain language. The assistant is designed to explain concepts simply and avoid presenting itself as official legal advice.

3. Summarize uploaded documents  
Users can upload `.txt`, `.pdf`, or `.docx` files. The backend extracts the text, sends it to the AI service, and returns a concise summary with key points, obligations, and risks.

## Main Features

- AI-powered legal document generation
- AI legal assistant chat interface
- Document upload and summarization
- PDF export for generated documents
- Editable document preview
- Responsive frontend built with React and Tailwind CSS
- Lightweight backend with no database
- File validation and upload size limits

## Tech Stack

### Frontend

- React
- React Router
- Tailwind CSS
- Axios
- `html2pdf.js`

### Backend

- Node.js
- Express.js
- Axios / OpenAI-compatible SDK integration
- Multer
- `pdf-parse`
- `mammoth`
- `dotenv`
- `cors`

## Project Structure

```text
LexNode/
|-- services/
|   |-- openaiService.js
|   `-- geminiService.js
|-- src/
|   |-- components/
|   |-- lib/
|   |-- pages/
|   |-- App.jsx
|   `-- main.jsx
|-- .env
|-- .env.example
|-- package.json
|-- server.js
`-- README.md
```

## Frontend Pages

### Home Page

The landing page introduces LexNode, highlights the product value, and links users into the main legal workflows.

### Generate Document

This page collects:

- Party A Name
- Party B Name
- Duration
- Jurisdiction
- Additional Clauses

The generated draft appears in a preview area where users can edit the text, copy it, or export it as a PDF.

### AI Assistant

This page provides a chat interface for asking legal questions in simple language. Messages are sent to the backend and the AI reply is shown in a conversational UI.

### Summarize Document

This page allows file uploads for `.txt`, `.pdf`, and `.docx` documents. After upload:

- the backend extracts the text
- LexNode summarizes the document
- the UI shows extracted text preview
- the UI shows the final summary output

## Backend API

### `GET /`

Health check endpoint.

Response:

```text
LexNode API is running
```

### `POST /generate-document`

Creates an AI-generated legal draft.

Accepted request body:

```json
{
  "partyA": "Acme Pvt Ltd",
  "partyB": "John Doe",
  "duration": "12 months",
  "jurisdiction": "India",
  "extra": "Include confidentiality obligations for contractors."
}
```

The current frontend field names also work:

```json
{
  "partyAName": "Acme Pvt Ltd",
  "partyBName": "John Doe",
  "duration": "12 months",
  "jurisdiction": "India",
  "additionalClauses": "Include confidentiality obligations for contractors."
}
```

You can also send a direct prompt:

```json
{
  "prompt": "Draft a freelancer agreement for a 6 month engagement."
}
```

Response:

```json
{
  "document": "Generated legal draft..."
}
```

### `POST /chat`

Sends a user message to the AI assistant.

Request:

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

### `POST /summarize`

Summarizes an uploaded document.

Request:

- Content type: `multipart/form-data`
- Field name: `document`
- Supported files: `.txt`, `.pdf`, `.docx`
- File size limit: `5MB`

Response:

```json
{
  "extractedText": "Preview of extracted text...",
  "summary": "Simple-language legal summary..."
}
```

## Environment Variables

Create a `.env` file in the project root.

Example:

```env
PORT=5000
XAI_API_KEY=your_grok_api_key_here
XAI_MODEL=grok-4
XAI_BASE_URL=https://api.x.ai/v1
VITE_API_BASE_URL=http://localhost:5000
```

Notes:

- `XAI_API_KEY` is used only on the backend
- the frontend must never contain private API keys
- `VITE_API_BASE_URL` is safe for frontend use because it only points to your backend server

## Local Setup

Install dependencies:

```bash
npm install
```

Create your local env file:

```bash
copy .env.example .env
```

Run only the backend:

```bash
npm run server
```

Run only the frontend:

```bash
npm run dev
```

Run both together:

```bash
npm run dev:full
```

Build the frontend:

```bash
npm run build
```

## File Handling Rules

- Maximum upload size is `5MB`
- Supported file formats are `.txt`, `.pdf`, and `.docx`
- Uploaded files are processed in memory
- No database is used

## Current Behavior

LexNode is designed to stay lightweight and easy to understand:

- no authentication
- no database
- no user accounts
- no persistent storage

This makes it easy to run locally and extend later.

## Important Disclaimer

LexNode does not provide legal advice. Documents and summaries are AI-generated and should be reviewed by a qualified lawyer before real-world use.
