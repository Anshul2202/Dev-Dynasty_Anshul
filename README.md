## Kalpathon Hackathon Submission

* Team Name
  
  [ Dev-Dynasty ]

* Project Name

  [LexNode]

* Selected Track

  [Web-dev]

* Selected Problem Statement (PS)

  [ 5 / AI-Powered Legal Document Automation Platform ]

* Team Leader

  Name : Anshul
  Phone no. : 7571032548

* Team Members & Roles
  
  [Anshul]	[FullStack Developer]
  [Shreya Gupta]	[UI/UX Designer]


 * Project Description

# LexNode

LexNode is a frontend web application for legal assistance workflows. It helps users ask legal questions, upload legal documents for AI-powered summaries, and generate simple agreement drafts that can be exported as PDF files.

The main application lives in the `legal-ai-assistant` folder and is built as a single-page app with React and Vite.

## What The Project Does

LexNode includes these core features:

- AI legal chat for quick question-and-answer guidance
- Document upload and text extraction for `PDF`, `DOCX`, and `TXT` files
- AI-generated document summaries with key legal terms in simple language
- Legal draft generation using a guided form
- PDF export for generated legal documents

## Languages And Technologies Used

This project is mainly built with:

- `JavaScript` for the application logic and React components
- `JSX` for building the UI in React
- `HTML` through the Vite app entry file
- `CSS` with Tailwind utility classes for styling

Libraries and tools used in the project:

- `React` for the user interface
- `React Router` for page navigation
- `Vite` for development and production builds
- `Tailwind CSS` for styling
- `Groq API` for AI chat and document summarization
- `react-markdown` and `remark-gfm` for rendering markdown responses
- `pdfjs-dist` for reading PDF content
- `mammoth` for extracting text from DOCX files
- `pdf-lib` for generating downloadable PDF documents

## Project Structure

```text
LexNode/
|-- legal-ai-assistant/
|   |-- src/
|   |   |-- layout/
|   |   |-- pages/
|   |   `-- services/
|   |-- package.json
|   |-- vite.config.js
|   `-- .env.example
|-- .env.example
|-- netlify.toml
`-- README.md
```

## Main Application Pages

- `Home` page for introducing the platform
- `Chat` page for AI-powered legal conversation
- `Upload` page for document analysis and summarization
- `Generate` page for drafting and exporting legal documents

## Environment Setup

The app uses environment variables for AI configuration. A local `.env` file inside `legal-ai-assistant` is used to provide values such as:

- `VITE_GROQ_API_KEY`
- `VITE_GROQ_MODEL`

Do not commit real API keys or secrets to the repository.

## Development

From the `legal-ai-assistant` directory, use:

```bash
npm install
npm run dev
```

To create a production build:

```bash
npm run build
```

## Summary

LexNode is a JavaScript-based legal assistant app that combines React, Vite, Tailwind CSS, and the Groq API to provide chat, document understanding, and legal draft generation in a single interface.
