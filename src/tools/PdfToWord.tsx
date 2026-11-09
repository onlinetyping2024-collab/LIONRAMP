
import { useState } from 'react'
import * as pdfjsLib from 'pdfjs-dist/legacy/build/pdf.mjs'
import pdfWorker from 'pdfjs-dist/legacy/build/pdf.worker.mjs?url'
import { Document, Packer, Paragraph, TextRun } from 'docx'
import './PdfToWord.css'

pdfjsLib.GlobalWorkerOptions.workerSrc = pdfWorker

export default function PdfToWord() {
  const [file, setFile] = useState<File | null>(null)
  const [loading, setLoading] = useState(false)
  const [progress, setProgress] = useState(0)
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')

  const handleFile = (selectedFile?: File) => {
    setMessage('')
    setError('')
    setProgress(0)

    if (!selectedFile) return

    if (
      selectedFile.type !== 'application/pdf' &&
      !selectedFile.name.toLowerCase().endsWith('.pdf')
    ) {
      setError('Please select a PDF file.')
      setFile(null)
      return
    }

    setFile(selectedFile)
  }

  const convertToWord = async () => {
    if (!file) {
      setError('Please select a PDF file first.')
      return
    }

    setLoading(true)
    setError('')
    setMessage('')
    setProgress(0)

    try {
      const data = new Uint8Array(await file.arrayBuffer())
      const loadingTask = pdfjsLib.getDocument({ data })
      const pdf = await loadingTask.promise

      const paragraphs: Paragraph[] = []

      for (let pageNumber = 1; pageNumber <= pdf.numPages; pageNumber++) {
        const page = await pdf.getPage(pageNumber)
        const content = await page.getTextContent()

        const textItems = content.items
          .filter((item) => 'str' in item)
          .map((item) => {
            return (item as { str: string }).str
          })

        const pageText = textItems.join(' ').trim()

        paragraphs.push(
          new Paragraph({
            children: [
              new TextRun({
                text: `Page ${pageNumber}`,
                bold: true,
                size: 24,
              }),
            ],
            spacing: { before: 200, after: 120 },
          })
        )

        if (pageText) {
          paragraphs.push(
            new Paragraph({
              children: [new TextRun(pageText)],
              spacing: { after: 200 },
            })
          )
        } else {
          paragraphs.push(
            new Paragraph({
              children: [
                new TextRun({
                  text: '[No selectable text found on this page]',
                  italics: true,
                }),
              ],
            })
          )
        }

        setProgress(Math.round((pageNumber / pdf.numPages) * 85))
      }

      const wordDocument = new Document({
        sections: [
          {
            properties: {},
            children: paragraphs,
          },
        ],
      })

      const blob = await Packer.toBlob(wordDocument)
      const url = URL.createObjectURL(blob)

      const link = window.document.createElement('a')
      link.href = url
      link.download = `${file.name.replace(/\.pdf$/i, '')}.docx`

      window.document.body.appendChild(link)
      link.click()
      link.remove()

      setTimeout(() => URL.revokeObjectURL(url), 1000)

      setProgress(100)
      setMessage('Your Word document has been created successfully!')
    } catch (err) {
      console.error(err)
      setError(
        'Conversion failed. The PDF may be damaged, password-protected, or unsupported.'
      )
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="pdf-word-tool">
      <div className="pdf-word-heading">
        <div className="pdf-word-icon">📄</div>
        <h2>PDF to Word Converter</h2>
        <p>Convert PDF documents into editable Word files.</p>
      </div>

      <div className="pdf-word-upload">
        <div className="pdf-word-upload-icon">📁</div>
        <h3>Select Your PDF File</h3>
        <p>Choose a PDF document from your device.</p>

        <label className="pdf-word-browse">
          Browse PDF
          <input
            type="file"
            accept=".pdf,application/pdf"
            onChange={(e) => handleFile(e.target.files?.[0])}
            hidden
          />
        </label>

        {file && (
          <div className="pdf-word-file">
            <span>📄</span>
            <div>
              <strong>{file.name}</strong>
              <small>{(file.size / 1024 / 1024).toFixed(2)} MB</small>
            </div>
            <button
              type="button"
              className="pdf-word-remove"
              onClick={() => {
                setFile(null)
                setMessage('')
                setError('')
                setProgress(0)
              }}
              disabled={loading}
            >
              ✕
            </button>
          </div>
        )}
      </div>

      {loading && (
        <div className="pdf-word-progress">
          <div className="pdf-word-progress-info">
            <span>Converting PDF...</span>
            <span>{progress}%</span>
          </div>
          <div className="pdf-word-progress-track">
            <div style={{ width: `${progress}%` }} />
          </div>
        </div>
      )}

      {error && <div className="pdf-word-error">⚠️ {error}</div>}
      {message && <div className="pdf-word-success">✓ {message}</div>}

      <button
        type="button"
        className="pdf-word-convert"
        onClick={convertToWord}
        disabled={!file || loading}
      >
        {loading ? 'Converting...' : 'Convert to Word →'}
      </button>

      <div className="pdf-word-note">
        <strong>Important:</strong>
        <p>
          This converter extracts selectable text from PDF files and creates
          a Word document. Complex layouts, tables, images and original
          formatting may not be preserved. Scanned PDFs require OCR, which
          is not included.
        </p>
      </div>
    </div>
  )
}
