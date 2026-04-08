# LexNode

LexNode is a modern AI-powered legal document platform built in the
`legal-ai-assistant` app folder.

It currently supports:

- AI legal chat using Groq
- Markdown-formatted chat responses
- Document upload and AI summarization for `PDF`, `DOCX`, and `TXT`
- Legal document generation with downloadable PDF export

## Project Layout

```text
LexNode/
|-- legal-ai-assistant/
|   |-- src/
|   |-- package.json
|   `-- README.md
|-- .env.example
|-- .gitignore
`-- README.md
```

## Main App

The active frontend app lives here:

- [legal-ai-assistant/README.md](/d:/LexNode/legal-ai-assistant/README.md#L1)

## Notes

- The app uses environment variables for Groq configuration.
- Real secrets should only be stored in local `.env` files and never committed.
- The Git history was cleaned to remove a previously leaked API key before pushing.
