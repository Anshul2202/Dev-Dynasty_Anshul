# LexNode Frontend

LexNode is an AI-powered legal document automation frontend built with React, Tailwind CSS, Axios, and `html2pdf.js`.

## Setup

1. Install dependencies:

```bash
npm install
```

2. Create your environment file:

```bash
copy .env.example .env
```

3. Set `VITE_API_BASE_URL` in `.env` to your backend base URL.

4. Start the development server:

```bash
npm run dev
```

5. Build for production:

```bash
npm run build
```

## API Endpoints

- `POST /generate-document`
- `POST /chat`

The frontend expects the document generation response to include one of:

- `document`
- `content`
- `text`

The chat response can include one of:

- `reply`
- `message`
- `content`

## Folder Structure

```text
LexNode/
|-- src/
|   |-- components/
|   |   |-- AppLayout.jsx
|   |   |-- Disclaimer.jsx
|   |   |-- DocumentPreview.jsx
|   |   |-- LoadingSpinner.jsx
|   |   `-- Navbar.jsx
|   |-- lib/
|   |   `-- api.js
|   |-- pages/
|   |   |-- AIAssistantPage.jsx
|   |   |-- DocumentGeneratorPage.jsx
|   |   `-- HomePage.jsx
|   |-- App.jsx
|   |-- index.css
|   `-- main.jsx
|-- .env.example
|-- index.html
|-- package.json
|-- postcss.config.js
|-- tailwind.config.js
`-- vite.config.js
```

## Included Features

- Responsive home page with a dashboard-style hero inspired by the reference layout
- Legal document generator form
- Editable document preview
- PDF export with `html2pdf.js`
- Copy-to-clipboard action
- AI assistant chat interface
- Axios API integration
- Loading and error states
- Shared legal disclaimer across all pages
