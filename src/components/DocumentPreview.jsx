import html2pdf from 'html2pdf.js';
import { useRef } from 'react';

function DocumentPreview({ documentText, onChange, onCopy, copySuccess }) {
  const documentRef = useRef(null);

  const handleDownloadPdf = () => {
    if (!documentRef.current || !documentText.trim()) {
      return;
    }

    html2pdf()
      .set({
        margin: 0.5,
        filename: 'lexnode-document.pdf',
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2 },
        jsPDF: { unit: 'in', format: 'a4', orientation: 'portrait' },
      })
      .from(documentRef.current)
      .save();
  };

  return (
    <section className="shell-card p-6 lg:p-8">
      <div className="mb-6 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-xl font-semibold text-slate-950">Document Preview</h2>
          <p className="mt-1 text-sm text-slate-500">
            Review and refine your AI-generated draft before exporting.
          </p>
        </div>
        <div className="flex flex-wrap gap-3">
          <button
            type="button"
            onClick={handleDownloadPdf}
            className="secondary-btn"
            disabled={!documentText.trim()}
          >
            Download as PDF
          </button>
          <button
            type="button"
            onClick={onCopy}
            className="primary-btn"
            disabled={!documentText.trim()}
          >
            {copySuccess ? 'Copied' : 'Copy to Clipboard'}
          </button>
        </div>
      </div>

      <textarea
        value={documentText}
        onChange={(event) => onChange(event.target.value)}
        className="field-input min-h-[320px] resize-y font-medium leading-7"
        placeholder="Your generated legal document will appear here."
      />

      <div className="pointer-events-none absolute -left-[9999px] top-0 opacity-0">
        <div
          ref={documentRef}
          className="rounded-2xl bg-white p-10 text-[15px] leading-7 text-slate-900"
          style={{ whiteSpace: 'pre-wrap' }}
        >
          {documentText}
        </div>
      </div>
    </section>
  );
}

export default DocumentPreview;
