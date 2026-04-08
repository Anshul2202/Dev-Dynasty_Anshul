# Legal AI Platform

A modern AI-powered legal assistant platform with chat, document upload, and
document generation features.

## What The App Does

LexNode helps users in three core workflows:

- Ask legal questions through an AI chat interface powered by Groq
- Upload `PDF`, `DOCX`, and `TXT` files and generate AI summaries
- Generate legal drafts and export them as valid PDF files

## Current Features

- Product-style landing page with responsive navigation
- Multi-page routing using React Router
- AI chat with:
  `Enter` to send, `Shift+Enter` for a new line, loading state, markdown rendering, and Groq integration
- Upload flow with:
  drag-and-drop support, client-side file parsing, extracted text preview, AI summary, and key legal terms
- Document generation flow with:
  structured form inputs, live preview, and valid PDF download

## Tech Stack

- React
- Vite
- Tailwind CSS
- React Router
- Lucide React
- Groq API
- `react-markdown`
- `remark-gfm`
- `pdfjs-dist`
- `mammoth`
- `pdf-lib`

## Environment Setup

Create a local `.env` file inside `legal-ai-assistant/`.

Example:

```env
VITE_GROQ_API_KEY=your_groq_api_key_here
VITE_GROQ_MODEL=openai/gpt-oss-120b
```

Notes:

- `VITE_GROQ_API_KEY` is required for AI chat and document summarization.
- `VITE_GROQ_MODEL` is optional and defaults to `openai/gpt-oss-120b`.
- `.env` is ignored by git.

## Available Scripts

From `legal-ai-assistant/`:

```bash
npm install
npm run dev
npm run build
```

## App Structure

```text
legal-ai-assistant/
|-- src/
|   |-- layout/
|   |-- pages/
|   |-- services/
|   |-- App.jsx
|   `-- main.jsx
|-- .env.example
|-- .gitignore
|-- package.json
`-- README.md
```

## Important Pages

- `Home`: landing page and product overview
- `Chat`: Groq-powered legal assistant with markdown response rendering
- `Upload`: document parsing and AI summarization
- `Generate`: legal draft creation and PDF export

## Notes

- Uploaded files are parsed client-side before text is sent to the AI service.
- Very large extracted documents are trimmed before summarization.
- PDF download now generates a real valid PDF binary instead of a renamed text blob.

## Disclaimer

This platform provides general legal information and drafting assistance. It is
not legal advice.
