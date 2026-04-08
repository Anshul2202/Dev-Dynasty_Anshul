import { FileText, FolderOpen, Scale, Upload as UploadIcon } from 'lucide-react'
import { useRef, useState } from 'react'

const supportedTypes = ['pdf', 'docx', 'txt']

const keyTerms = [
  {
    term: 'Indemnity',
    explanation: 'A legal promise to cover losses or damage suffered by another party.',
  },
  {
    term: 'Confidential Information',
    explanation: 'Private business or personal information that must not be disclosed without permission.',
  },
  {
    term: 'Termination',
    explanation: 'The clause that explains how and when the agreement can be legally ended.',
  },
]

function Upload() {
  const inputRef = useRef(null)
  const [isDragging, setIsDragging] = useState(false)
  const [selectedFile, setSelectedFile] = useState(null)

  const handleFileSelection = (file) => {
    if (!file) {
      return
    }

    const extension = file.name.split('.').pop()?.toLowerCase()

    if (!supportedTypes.includes(extension)) {
      return
    }

    setSelectedFile(file)
  }

  const handleDragOver = (event) => {
    event.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = (event) => {
    event.preventDefault()
    setIsDragging(false)
  }

  const handleDrop = (event) => {
    event.preventDefault()
    setIsDragging(false)
    handleFileSelection(event.dataTransfer.files?.[0])
  }

  const handleBrowse = () => {
    inputRef.current?.click()
  }

  return (
    <section className="space-y-6">
      <div className="rounded-[2rem] border border-white/80 bg-white/90 p-8 shadow-[0_24px_70px_-30px_rgba(79,70,229,0.22)] backdrop-blur sm:p-10">
        <div className="flex items-start gap-4">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-indigo-50 text-indigo-600">
            <UploadIcon size={26} />
          </div>
          <div>
            <h1 className="text-3xl font-semibold tracking-tight text-slate-950">Upload Documents</h1>
            <p className="mt-3 max-w-2xl text-base leading-7 text-slate-600">
              Upload a legal file to preview its details, generate a concise summary,
              and review the key legal terms in simple language.
            </p>
          </div>
        </div>

        <div
          role="button"
          tabIndex={0}
          onClick={handleBrowse}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onKeyDown={(event) => {
            if (event.key === 'Enter' || event.key === ' ') {
              event.preventDefault()
              handleBrowse()
            }
          }}
          className={`mt-8 rounded-[1.5rem] border-2 border-dashed p-8 text-center transition-all duration-200 ${
            isDragging
              ? 'border-indigo-500 bg-indigo-50'
              : 'border-slate-200 bg-slate-50 hover:-translate-y-0.5 hover:border-indigo-300 hover:bg-indigo-50/60'
          }`}
        >
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-white text-indigo-600 shadow-[0_18px_34px_-24px_rgba(15,23,42,0.3)]">
            <FolderOpen size={30} />
          </div>
          <h2 className="mt-5 text-xl font-semibold text-slate-900">
            Drag and drop your file here
          </h2>
          <p className="mt-2 text-sm text-slate-500">Supported formats: PDF, DOCX, TXT</p>
          <button
            type="button"
            onClick={(event) => {
              event.stopPropagation()
              handleBrowse()
            }}
            className="mt-6 inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-5 py-3 text-sm font-medium text-white shadow-[0_18px_34px_-18px_rgba(79,70,229,0.85)] transition-all duration-200 hover:-translate-y-0.5 hover:bg-indigo-700"
          >
            <UploadIcon size={16} />
            Upload Document
          </button>
          <input
            ref={inputRef}
            type="file"
            accept=".pdf,.docx,.txt"
            onChange={(event) => handleFileSelection(event.target.files?.[0])}
            className="hidden"
          />
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        <article className="rounded-[2rem] border border-white/80 bg-white/90 p-6 shadow-[0_24px_60px_-34px_rgba(15,23,42,0.35)] backdrop-blur">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-indigo-50 text-indigo-600">
              <FileText size={22} />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-slate-900">File Preview</h2>
              <p className="text-sm text-slate-500">Selected document details</p>
            </div>
          </div>

          <div className="mt-6 rounded-[1.25rem] bg-slate-50 p-4">
            {selectedFile ? (
              <div className="space-y-3">
                <div className="rounded-xl border border-slate-100 bg-white p-4 shadow-sm">
                  <p className="text-sm font-medium text-slate-500">File Name</p>
                  <p className="mt-1 text-base font-semibold text-slate-900">{selectedFile.name}</p>
                </div>
                <div className="grid gap-3 sm:grid-cols-2">
                  <div className="rounded-xl border border-slate-100 bg-white p-4 shadow-sm">
                    <p className="text-sm font-medium text-slate-500">File Type</p>
                    <p className="mt-1 text-base text-slate-900">
                      {selectedFile.name.split('.').pop()?.toUpperCase()}
                    </p>
                  </div>
                  <div className="rounded-xl border border-slate-100 bg-white p-4 shadow-sm">
                    <p className="text-sm font-medium text-slate-500">File Size</p>
                    <p className="mt-1 text-base text-slate-900">
                      {(selectedFile.size / 1024).toFixed(1)} KB
                    </p>
                  </div>
                </div>
              </div>
            ) : (
              <div className="rounded-xl border border-slate-100 bg-white p-6 text-sm leading-6 text-slate-500 shadow-sm">
                No file selected yet. Upload a supported document to view its preview here.
              </div>
            )}
          </div>
        </article>

        <article className="rounded-[2rem] border border-white/80 bg-white/90 p-6 shadow-[0_24px_60px_-34px_rgba(15,23,42,0.35)] backdrop-blur">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-indigo-50 text-indigo-600">
              <Scale size={22} />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-slate-900">Document Summary</h2>
              <p className="text-sm text-slate-500">Simple legal overview</p>
            </div>
          </div>

          <div className="mt-6 rounded-[1.25rem] bg-slate-50 p-4 text-sm leading-7 text-slate-600">
            {selectedFile ? (
              <div className="rounded-xl border border-slate-100 bg-white p-4 shadow-sm">
                This uploaded document appears to define obligations between the
                parties, restrict disclosure of confidential information, and
                explain how the agreement may be enforced or terminated.
              </div>
            ) : (
              <div className="rounded-xl border border-slate-100 bg-white p-4 shadow-sm">
                Upload a document to generate a summary view here.
              </div>
            )}
          </div>
        </article>
      </div>

      <article className="rounded-[2rem] border border-white/80 bg-white/90 p-6 shadow-[0_24px_60px_-34px_rgba(15,23,42,0.35)] backdrop-blur">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-indigo-50 text-indigo-600">
            <Scale size={22} />
          </div>
          <div>
            <h2 className="text-xl font-semibold text-slate-900">Key Legal Terms</h2>
            <p className="text-sm text-slate-500">Simple explanations of common terms</p>
          </div>
        </div>

        <div className="mt-6 grid gap-4 md:grid-cols-3">
          {keyTerms.map((item) => (
            <div
              key={item.term}
              className="rounded-[1.25rem] border border-slate-100 bg-slate-50 p-5 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-indigo-100 hover:bg-white"
            >
              <p className="text-lg font-semibold text-slate-900">{item.term}</p>
              <p className="mt-2 text-sm leading-6 text-slate-600">{item.explanation}</p>
            </div>
          ))}
        </div>
      </article>
    </section>
  )
}

export default Upload
