import { Download, FileText } from 'lucide-react'
import { useMemo, useState } from 'react'
import {
  generateDocumentPdfBlob,
  triggerPdfDownload,
} from '../services/pdfService'

const initialForm = {
  partyA: '',
  partyB: '',
  duration: '',
  jurisdiction: '',
  clauses: '',
}

function Generate() {
  const [formData, setFormData] = useState(initialForm)
  const [generatedDocument, setGeneratedDocument] = useState('')
  const [isDownloadingPdf, setIsDownloadingPdf] = useState(false)
  const [pdfError, setPdfError] = useState('')

  const previewDocument = useMemo(() => {
    if (generatedDocument) {
      return generatedDocument
    }

    return `NON-DISCLOSURE AGREEMENT

This Agreement is entered into between ${formData.partyA || '[Party A]'} and ${
      formData.partyB || '[Party B]'
    }.

Term:
This Agreement remains in effect for ${formData.duration || '[Duration]'}.

Jurisdiction:
This Agreement shall be governed by the laws of ${formData.jurisdiction || '[Jurisdiction]'}.

Additional Clauses:
${formData.clauses || 'No additional clauses provided yet.'}

The parties agree to protect confidential information, use it only for authorized purposes, and follow the obligations described in this document.`
  }, [formData, generatedDocument])

  const handleChange = (event) => {
    const { name, value } = event.target

    setFormData((currentData) => ({
      ...currentData,
      [name]: value,
    }))
  }

  const handleGenerate = (event) => {
    event.preventDefault()
    setPdfError('')

    setGeneratedDocument(`NON-DISCLOSURE AGREEMENT

This Agreement is made between ${formData.partyA || 'Party A'} and ${
      formData.partyB || 'Party B'
    } and is intended to protect confidential information shared for business or professional purposes.

1. Parties
Party A: ${formData.partyA || 'Not provided'}
Party B: ${formData.partyB || 'Not provided'}

2. Duration
This Agreement will remain active for ${formData.duration || 'a period to be defined by the parties'}.

3. Jurisdiction
The governing jurisdiction for this Agreement is ${formData.jurisdiction || 'not specified'}.

4. Confidentiality Obligations
Each party agrees not to disclose or misuse confidential information received under this Agreement without proper authorization.

5. Additional Clauses
${formData.clauses || 'No additional clauses were added.'}

6. Closing
Both parties acknowledge that this document is a draft and should be reviewed before formal use.`)
  }

  const handleDownload = async () => {
    setPdfError('')
    setIsDownloadingPdf(true)

    try {
      const blob = await generateDocumentPdfBlob(previewDocument)
      triggerPdfDownload(blob, 'legal-document.pdf')
    } catch (error) {
      console.error('PDF download failed:', error)
      setPdfError('PDF generation failed')
    } finally {
      setIsDownloadingPdf(false)
    }
  }

  return (
    <section className="space-y-6">
      <div className="rounded-[2rem] border border-white/80 bg-white/90 p-8 shadow-[0_24px_70px_-30px_rgba(79,70,229,0.22)] backdrop-blur sm:p-10">
        <div className="flex items-start gap-4">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-indigo-50 text-indigo-600">
            <FileText size={26} />
          </div>
          <div>
            <h1 className="text-3xl font-semibold tracking-tight text-slate-950">Generate Document</h1>
            <p className="mt-3 max-w-2xl text-base leading-7 text-slate-600">
              Draft legal agreements with a clean form workflow, guided inputs,
              and an instant preview surface.
            </p>
          </div>
        </div>

        <form onSubmit={handleGenerate} className="mt-8 grid gap-5 md:grid-cols-2">
          <label className="flex flex-col gap-2">
            <span className="text-sm font-medium text-slate-700">Party A</span>
            <input
              name="partyA"
              value={formData.partyA}
              onChange={handleChange}
              placeholder="Enter first party name"
              className="rounded-xl border border-slate-200 px-4 py-3 text-sm text-slate-700 outline-none transition duration-200 focus:border-indigo-400 focus:ring-4 focus:ring-indigo-100"
            />
          </label>

          <label className="flex flex-col gap-2">
            <span className="text-sm font-medium text-slate-700">Party B</span>
            <input
              name="partyB"
              value={formData.partyB}
              onChange={handleChange}
              placeholder="Enter second party name"
              className="rounded-xl border border-slate-200 px-4 py-3 text-sm text-slate-700 outline-none transition duration-200 focus:border-indigo-400 focus:ring-4 focus:ring-indigo-100"
            />
          </label>

          <label className="flex flex-col gap-2">
            <span className="text-sm font-medium text-slate-700">Duration</span>
            <input
              name="duration"
              value={formData.duration}
              onChange={handleChange}
              placeholder="e.g. 12 months"
              className="rounded-xl border border-slate-200 px-4 py-3 text-sm text-slate-700 outline-none transition duration-200 focus:border-indigo-400 focus:ring-4 focus:ring-indigo-100"
            />
          </label>

          <label className="flex flex-col gap-2">
            <span className="text-sm font-medium text-slate-700">Jurisdiction</span>
            <input
              name="jurisdiction"
              value={formData.jurisdiction}
              onChange={handleChange}
              placeholder="e.g. India"
              className="rounded-xl border border-slate-200 px-4 py-3 text-sm text-slate-700 outline-none transition duration-200 focus:border-indigo-400 focus:ring-4 focus:ring-indigo-100"
            />
          </label>

          <label className="flex flex-col gap-2 md:col-span-2">
            <span className="text-sm font-medium text-slate-700">Additional Clauses</span>
            <textarea
              name="clauses"
              value={formData.clauses}
              onChange={handleChange}
              rows={5}
              placeholder="Add any extra obligations, confidentiality notes, or terms..."
              className="resize-none rounded-xl border border-slate-200 px-4 py-3 text-sm text-slate-700 outline-none transition duration-200 focus:border-indigo-400 focus:ring-4 focus:ring-indigo-100"
            />
          </label>

          <div className="md:col-span-2">
            <button
              type="submit"
              className="inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-5 py-3 text-sm font-medium text-white shadow-[0_18px_34px_-18px_rgba(79,70,229,0.85)] transition-all duration-200 hover:-translate-y-0.5 hover:bg-indigo-700"
            >
              <FileText size={16} />
              Generate Document
            </button>
          </div>
        </form>
      </div>

      <article className="rounded-[2rem] border border-white/80 bg-white/90 p-6 shadow-[0_24px_60px_-34px_rgba(15,23,42,0.35)] backdrop-blur sm:p-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <h2 className="text-2xl font-semibold text-slate-900">Generated Document Preview</h2>
            <p className="mt-2 text-sm leading-6 text-slate-500">
              Review the generated output before sending, exporting, or refining it.
            </p>
          </div>
          <button
            type="button"
            onClick={handleDownload}
            disabled={isDownloadingPdf}
            aria-label="Download PDF"
            className="inline-flex items-center gap-2 self-start rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 shadow-[0_16px_32px_-24px_rgba(15,23,42,0.45)] transition-all duration-200 hover:-translate-y-0.5 hover:border-indigo-200 hover:text-indigo-700 disabled:cursor-not-allowed disabled:opacity-60"
          >
            <Download size={16} />
            <span>{isDownloadingPdf ? 'Preparing PDF' : 'Download PDF'}</span>
          </button>
        </div>

        {pdfError ? (
          <div className="mt-4 rounded-xl border border-rose-100 bg-rose-50 px-4 py-3 text-sm text-rose-700">
            {pdfError}
          </div>
        ) : null}

        <div className="mt-6 rounded-[1.5rem] bg-gradient-to-br from-indigo-50 via-white to-slate-50 p-4 shadow-inner">
          <pre className="overflow-x-auto whitespace-pre-wrap rounded-[1.25rem] border border-slate-100 bg-white p-5 text-sm leading-7 text-slate-700 shadow-sm">
            {previewDocument}
          </pre>
        </div>
      </article>
    </section>
  )
}

export default Generate
