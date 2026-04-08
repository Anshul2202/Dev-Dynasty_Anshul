import { useState } from 'react';
import api from '../lib/api';
import LoadingSpinner from '../components/LoadingSpinner';
import DocumentPreview from '../components/DocumentPreview';

const initialForm = {
  partyAName: '',
  partyBName: '',
  duration: '',
  jurisdiction: 'India',
  additionalClauses: '',
};

function DocumentGeneratorPage() {
  const [formData, setFormData] = useState(initialForm);
  const [documentText, setDocumentText] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState('');
  const [copySuccess, setCopySuccess] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((current) => ({ ...current, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsGenerating(true);
    setError('');
    setCopySuccess(false);

    try {
      const response = await api.post('/generate-document', formData);
      const generatedDocument =
        response.data?.document || response.data?.content || response.data?.text || '';

      if (!generatedDocument) {
        throw new Error('The API response did not include a document body.');
      }

      setDocumentText(generatedDocument);
    } catch (submissionError) {
      setError(
        submissionError.response?.data?.message ||
          submissionError.message ||
          'Unable to generate the document right now.',
      );
    } finally {
      setIsGenerating(false);
    }
  };

  const handleCopy = async () => {
    if (!documentText.trim()) {
      return;
    }

    try {
      await navigator.clipboard.writeText(documentText);
      setCopySuccess(true);
      window.setTimeout(() => setCopySuccess(false), 2000);
    } catch {
      setError('Clipboard access failed. Please copy the text manually.');
    }
  };

  return (
    <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
      <div className="mx-auto max-w-3xl text-center">
        <h1 className="section-title">Generate Legal Document</h1>
        <p className="mt-4 text-base leading-7 text-slate-500">
          Draft legal documents faster with an AI-assisted workflow designed for small businesses and individuals.
        </p>
      </div>

      <div className="mt-10 grid gap-6 xl:grid-cols-[0.92fr_1.08fr]">
        <section className="shell-card p-6 lg:p-8">
          <div className="mb-6">
            <h2 className="text-xl font-semibold text-slate-950">Document details</h2>
            <p className="mt-1 text-sm text-slate-500">
              Fill in the key terms and LexNode will assemble a first draft for you.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label htmlFor="partyAName" className="field-label">
                Party A Name
              </label>
              <input
                id="partyAName"
                name="partyAName"
                type="text"
                value={formData.partyAName}
                onChange={handleChange}
                className="field-input"
                placeholder="Enter the first party name"
                required
              />
            </div>

            <div>
              <label htmlFor="partyBName" className="field-label">
                Party B Name
              </label>
              <input
                id="partyBName"
                name="partyBName"
                type="text"
                value={formData.partyBName}
                onChange={handleChange}
                className="field-input"
                placeholder="Enter the second party name"
                required
              />
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <label htmlFor="duration" className="field-label">
                  Duration
                </label>
                <input
                  id="duration"
                  name="duration"
                  type="text"
                  value={formData.duration}
                  onChange={handleChange}
                  className="field-input"
                  placeholder="e.g. 12 months"
                  required
                />
              </div>

              <div>
                <label htmlFor="jurisdiction" className="field-label">
                  Jurisdiction
                </label>
                <input
                  id="jurisdiction"
                  name="jurisdiction"
                  type="text"
                  value={formData.jurisdiction}
                  onChange={handleChange}
                  className="field-input"
                />
              </div>
            </div>

            <div>
              <label htmlFor="additionalClauses" className="field-label">
                Additional Clauses
              </label>
              <textarea
                id="additionalClauses"
                name="additionalClauses"
                value={formData.additionalClauses}
                onChange={handleChange}
                className="field-input min-h-[180px] resize-y"
                placeholder="Add any special clauses, obligations, or context."
              />
            </div>

            {error ? (
              <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                {error}
              </div>
            ) : null}

            <button type="submit" className="primary-btn w-full" disabled={isGenerating}>
              {isGenerating ? 'Generating...' : 'Generate Document'}
            </button>

            {isGenerating ? <LoadingSpinner label="Generating your document..." /> : null}
          </form>
        </section>

        <DocumentPreview
          documentText={documentText}
          onChange={setDocumentText}
          onCopy={handleCopy}
          copySuccess={copySuccess}
        />
      </div>
    </section>
  );
}

export default DocumentGeneratorPage;
