import { Download, FileText } from 'lucide-react'
import { useMemo, useState } from 'react'

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

  const handleDownload = () => {
    const blob = new Blob([previewDocument], { type: 'application/pdf' })
    const fileUrl = URL.createObjectURL(blob)
    const link = document.createElement('a')

    link.href = fileUrl
    link.download = 'lexnode-document-preview.pdf'
    link.click()

    URL.revokeObjectURL(fileUrl)
  }

  return (
    <section className="space-y-6">
      <div className="rounded-[2rem] bg-white p-8 shadow sm:p-10">
        <div className="flex items-start gap-4">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-violet-50 text-violet-700">
            <FileText size={26} />
          </div>
          <div>
            <h1 className="text-3xl font-semibold text-slate-900">Generate Document</h1>
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
              className="rounded-xl border border-slate-200 px-4 py-3 text-sm text-slate-700 outline-none transition focus:border-violet-400"
            />
          </label>

          <label className="flex flex-col gap-2">
            <span className="text-sm font-medium text-slate-700">Party B</span>
            <input
              name="partyB"
              value={formData.partyB}
              onChange={handleChange}
              placeholder="Enter second party name"
              className="rounded-xl border border-slate-200 px-4 py-3 text-sm text-slate-700 outline-none transition focus:border-violet-400"
            />
          </label>

          <label className="flex flex-col gap-2">
            <span className="text-sm font-medium text-slate-700">Duration</span>
            <input
              name="duration"
              value={formData.duration}
              onChange={handleChange}
              placeholder="e.g. 12 months"
              className="rounded-xl border border-slate-200 px-4 py-3 text-sm text-slate-700 outline-none transition focus:border-violet-400"
            />
          </label>

          <label className="flex flex-col gap-2">
            <span className="text-sm font-medium text-slate-700">Jurisdiction</span>
            <input
              name="jurisdiction"
              value={formData.jurisdiction}
              onChange={handleChange}
              placeholder="e.g. India"
              className="rounded-xl border border-slate-200 px-4 py-3 text-sm text-slate-700 outline-none transition focus:border-violet-400"
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
              className="resize-none rounded-xl border border-slate-200 px-4 py-3 text-sm text-slate-700 outline-none transition focus:border-violet-400"
            />
          </label>

          <div className="md:col-span-2">
            <button
              type="submit"
              className="inline-flex items-center gap-2 rounded-xl bg-slate-900 px-5 py-3 text-sm font-medium text-white shadow transition hover:bg-slate-800"
            >
              <FileText size={16} />
              Generate Document
            </button>
          </div>
        </form>
      </div>

      <article className="rounded-[2rem] bg-white p-6 shadow sm:p-8">
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
            className="inline-flex items-center gap-2 self-start rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 shadow transition hover:border-slate-300 hover:text-slate-900"
          >
            <Download size={16} />
            Download PDF
          </button>
        </div>

        <div className="mt-6 rounded-2xl bg-slate-50 p-4 shadow-inner">
          <pre className="overflow-x-auto whitespace-pre-wrap rounded-xl bg-white p-5 text-sm leading-7 text-slate-700 shadow">
            {previewDocument}
          </pre>
        </div>
      </article>
    </section>
  )
}

export default Generate
