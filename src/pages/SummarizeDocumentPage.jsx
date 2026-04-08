import { useState } from 'react';
import api from '../lib/api';
import LoadingSpinner from '../components/LoadingSpinner';

const acceptedTypes = '.txt,.pdf,.docx';
const maxFileSizeMb = 5;

function SummarizeDocumentPage() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [extractedText, setExtractedText] = useState('');
  const [summary, setSummary] = useState('');
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState('');
  const [isSummarizing, setIsSummarizing] = useState(false);

  const handleFileChange = (event) => {
    const file = event.target.files?.[0];
    setError('');
    setSummary('');
    setExtractedText('');
    setProgress(0);

    if (!file) {
      setSelectedFile(null);
      return;
    }

    const extension = file.name.split('.').pop()?.toLowerCase();

    if (!['txt', 'pdf', 'docx'].includes(extension || '')) {
      setSelectedFile(null);
      setError('Please upload a valid .txt, .pdf, or .docx file.');
      return;
    }

    if (file.size > maxFileSizeMb * 1024 * 1024) {
      setSelectedFile(null);
      setError(`File size must be ${maxFileSizeMb}MB or less.`);
      return;
    }

    setSelectedFile(file);
  };

  const handleSummarize = async () => {
    if (!selectedFile) {
      setError('Choose a document before requesting a summary.');
      return;
    }

    const formData = new FormData();
    formData.append('document', selectedFile);

    setIsSummarizing(true);
    setError('');
    setSummary('');
    setExtractedText('');
    setProgress(0);

    try {
      const response = await api.post('/summarize', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        onUploadProgress: (event) => {
          if (!event.total) {
            return;
          }

          setProgress(Math.round((event.loaded * 100) / event.total));
        },
      });

      const extracted = response.data?.extractedText || '';
      const summarizedText = response.data?.summary || response.data?.content || response.data?.text || '';

      if (!summarizedText) {
        throw new Error('The API response did not include a summary.');
      }

      setExtractedText(extracted);
      setSummary(summarizedText);
      setProgress(100);
    } catch (submissionError) {
      setError(
        submissionError.response?.data?.message ||
          submissionError.message ||
          'Unable to summarize the document right now.',
      );
      setProgress(0);
    } finally {
      setIsSummarizing(false);
    }
  };

  return (
    <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
      <div className="mx-auto max-w-3xl text-center">
        <h1 className="section-title">Summarize Document</h1>
        <p className="mt-4 text-base leading-7 text-slate-500">
          Upload a legal document and LexNode will extract the contents, summarize the key points,
          and call out important obligations and risks in plain language.
        </p>
      </div>

      <div className="mt-10 grid gap-6 xl:grid-cols-[0.9fr_1.1fr]">
        <section className="shell-card p-6 lg:p-8">
          <div className="mb-6">
            <h2 className="text-xl font-semibold text-slate-950">Upload document</h2>
            <p className="mt-1 text-sm text-slate-500">
              Supported formats: `.txt`, `.pdf`, `.docx`. Maximum file size: {maxFileSizeMb}MB.
            </p>
          </div>

          <div className="rounded-3xl border border-dashed border-slate-300 bg-slate-50 p-6">
            <label htmlFor="document-upload" className="field-label">
              Choose a file
            </label>
            <input
              id="document-upload"
              type="file"
              accept={acceptedTypes}
              onChange={handleFileChange}
              className="block w-full text-sm text-slate-500 file:mr-4 file:rounded-xl file:border-0 file:bg-brand-50 file:px-4 file:py-3 file:font-semibold file:text-brand-700 hover:file:bg-brand-100"
            />
            <p className="mt-4 text-sm text-slate-500">
              {selectedFile
                ? `Selected file: ${selectedFile.name}`
                : 'No file selected yet.'}
            </p>
          </div>

          <div className="mt-5 space-y-4">
            <button
              type="button"
              onClick={handleSummarize}
              className="primary-btn w-full"
              disabled={isSummarizing || !selectedFile}
            >
              {isSummarizing ? 'Summarizing...' : 'Summarize Document'}
            </button>

            {isSummarizing ? <LoadingSpinner label="Uploading and summarizing your document..." /> : null}

            {progress > 0 ? (
              <div>
                <div className="mb-2 flex items-center justify-between text-sm text-slate-500">
                  <span>Upload progress</span>
                  <span>{progress}%</span>
                </div>
                <div className="h-2 overflow-hidden rounded-full bg-slate-100">
                  <div
                    className="h-full rounded-full bg-brand-500 transition-all"
                    style={{ width: `${progress}%` }}
                  />
                </div>
              </div>
            ) : null}

            {error ? (
              <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                {error}
              </div>
            ) : null}
          </div>
        </section>

        <div className="space-y-6">
          <section className="shell-card p-6 lg:p-8">
            <div className="mb-4">
              <h2 className="text-xl font-semibold text-slate-950">Extracted Text Preview</h2>
              <p className="mt-1 text-sm text-slate-500">
                Optional preview of the extracted document content before summarization.
              </p>
            </div>
            <div className="min-h-[220px] rounded-2xl border border-slate-200 bg-slate-50 p-4 text-sm leading-7 text-slate-600">
              {extractedText || 'Extracted text will appear here after a successful upload.'}
            </div>
          </section>

          <section className="shell-card p-6 lg:p-8">
            <div className="mb-4">
              <h2 className="text-xl font-semibold text-slate-950">Summary Output</h2>
              <p className="mt-1 text-sm text-slate-500">
                Concise, beginner-friendly summary of key clauses, obligations, and risks.
              </p>
            </div>
            <div className="min-h-[260px] rounded-2xl border border-slate-200 bg-white p-5 text-sm leading-7 text-slate-700 shadow-sm">
              {summary || 'Your summary will appear here once LexNode finishes processing the file.'}
            </div>
          </section>
        </div>
      </div>
    </section>
  );
}

export default SummarizeDocumentPage;
