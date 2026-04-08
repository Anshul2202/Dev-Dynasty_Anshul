import { PDFDocument, StandardFonts, rgb } from 'pdf-lib'

const PDF_MIME_TYPE = 'application/pdf'

function splitTextIntoLines(text, maxCharactersPerLine = 90) {
  return text.split('\n').flatMap((paragraph) => {
    if (!paragraph.trim()) {
      return ['']
    }

    const words = paragraph.split(/\s+/)
    const lines = []
    let currentLine = ''

    words.forEach((word) => {
      const nextLine = currentLine ? `${currentLine} ${word}` : word

      if (nextLine.length > maxCharactersPerLine) {
        if (currentLine) {
          lines.push(currentLine)
        }
        currentLine = word
      } else {
        currentLine = nextLine
      }
    })

    if (currentLine) {
      lines.push(currentLine)
    }

    return lines
  })
}

export async function generateDocumentPdfBlob(documentText) {
  console.info('PDF generation started')

  if (!documentText?.trim()) {
    throw new Error('No document content available for PDF generation')
  }

  const pdfDoc = await PDFDocument.create()
  let page = pdfDoc.addPage([595.28, 841.89])
  const font = await pdfDoc.embedFont(StandardFonts.Helvetica)
  const boldFont = await pdfDoc.embedFont(StandardFonts.HelveticaBold)

  const { height } = page.getSize()
  const marginX = 48
  const marginTop = 60
  const lineHeight = 18

  page.drawText('Legal Document', {
    x: marginX,
    y: height - marginTop,
    size: 18,
    font: boldFont,
    color: rgb(0.09, 0.11, 0.16),
  })

  let cursorY = height - marginTop - 34
  const lines = splitTextIntoLines(documentText)

  lines.forEach((line) => {
    if (cursorY < 60) {
      page = pdfDoc.addPage([595.28, 841.89])
      cursorY = page.getSize().height - marginTop
      page.drawText(line || ' ', {
        x: marginX,
        y: cursorY,
        size: 11,
        font,
        color: rgb(0.2, 0.24, 0.31),
      })
      cursorY -= lineHeight
      return
    }

    page.drawText(line || ' ', {
      x: marginX,
      y: cursorY,
      size: 11,
      font,
      color: rgb(0.2, 0.24, 0.31),
    })
    cursorY -= lineHeight
  })

  const pdfBytes = await pdfDoc.save()
  const blob = new Blob([pdfBytes], { type: PDF_MIME_TYPE })

  await assertValidPdfBlob(blob)

  console.info('PDF generated successfully')

  return blob
}

export async function assertValidPdfBlob(blob) {
  if (!blob || blob.type !== PDF_MIME_TYPE || blob.size === 0) {
    throw new Error('Invalid PDF response received')
  }

  const headerBytes = new Uint8Array(await blob.slice(0, 5).arrayBuffer())
  const header = new TextDecoder().decode(headerBytes)

  if (header !== '%PDF-') {
    throw new Error('Invalid PDF response received')
  }
}

export function triggerPdfDownload(blob, filename = 'legal-document.pdf') {
  console.info('PDF download triggered')

  const url = window.URL.createObjectURL(blob)
  const link = document.createElement('a')

  link.href = url
  link.download = filename
  document.body.appendChild(link)
  link.click()
  link.remove()
  window.URL.revokeObjectURL(url)
}
