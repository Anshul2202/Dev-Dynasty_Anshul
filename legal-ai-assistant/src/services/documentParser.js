import mammoth from 'mammoth'
import * as pdfjsLib from 'pdfjs-dist'

pdfjsLib.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.min.mjs',
  import.meta.url,
).toString()

export async function extractTextFromPDF(file) {
  const arrayBuffer = await file.arrayBuffer()

  const pdf = await pdfjsLib.getDocument({
    data: arrayBuffer,
  }).promise

  let text = ''

  for (let i = 1; i <= pdf.numPages; i += 1) {
    const page = await pdf.getPage(i)
    const content = await page.getTextContent()

    const pageText = content.items.map((item) => item.str).join(' ')

    text += `${pageText}\n`
  }

  return text
}

export async function extractTextFromDOCX(file) {
  const arrayBuffer = await file.arrayBuffer()

  const result = await mammoth.extractRawText({
    arrayBuffer,
  })

  return result.value
}

export async function extractTextFromTXT(file) {
  return file.text()
}

export async function extractTextFromFile(file) {
  const type = file.type

  if (type === 'application/pdf') {
    return extractTextFromPDF(file)
  }

  if (
    type ===
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
  ) {
    return extractTextFromDOCX(file)
  }

  if (type === 'text/plain') {
    return extractTextFromTXT(file)
  }

  throw new Error('Unsupported file type')
}
