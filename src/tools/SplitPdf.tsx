
import { useState } from 'react'
import { PDFDocument } from 'pdf-lib'
import './SplitPdf.css'

export default function SplitPdf() {
  const [file, setFile] = useState<File | null>(null)
  const [pageCount, setPageCount] = useState(0)
  const [pageRange, setPageRange] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [message, setMessage] = useState('')

  const handleFile = async (selectedFile?: File) => {
    setError('')
    setMessage('')
    setPageRange('')
    setPageCount(0)

    if (!selectedFile) return

    if (
      selectedFile.type !== 'application/pdf' &&
      !selectedFile.name.toLowerCase().endsWith('.pdf')
    ) {
      setError('Please select a PDF file.')
      setFile(null)
      return
    }

    try {
      const bytes = await selectedFile.arrayBuffer()
      const pdf = await PDFDocument.load(bytes)

      setFile(selectedFile)
      setPageCount(pdf.getPageCount())
    } catch {
      setFile(null)
      setError('Unable to read this PDF file.')
    }
  }

  const splitPdf = async () => {
    if (!file || !pageRange.trim()) {
      setError('Please select a PDF and enter page numbers.')
      return
    }

    setLoading(true)
    setError('')
    setMessage('')

    try {
      const originalBytes = await file.arrayBuffer()
      const originalPdf = await PDFDocument.load(originalBytes)

      const pageNumbers = new Set<number>()

      const parts = pageRange.split(',')

      for (const part of parts) {
        const value = part.trim()

        if (!value) continue

        if (value.includes('-')) {
          const range = value.split('-')

          if (range.length !== 2) {
            throw new Error('Invalid page range.')
          }

          const start = Number(range[0].trim())
          const end = Number(range[1].trim())

          if (
            !Number.isInteger(start) ||
            !Number.isInteger(end) ||
            start < 1 ||
            end > pageCount ||
            start > end
          ) {
            throw new Error(`Invalid page range: ${value}`)
          }

          for (let page = start; page <= end; page++) {
            pageNumbers.add(page - 1)
          }
        } else {
          const page = Number(value)

          if (
            !Number.isInteger(page) ||
            page < 1 ||
            page > pageCount
          ) {
            throw new Error(`Invalid page number: ${value}`)
          }

          pageNumbers.add(page - 1)
        }
      }

      const selectedPages = Array.from(pageNumbers).sort((a, b) => a - b)

      if (selectedPages.length === 0) {
        throw new Error('Please enter valid page numbers.')
      }

      const newPdf = await PDFDocument.create()
      const copiedPages = await newPdf.copyPages(
        originalPdf,
        selectedPages
      )

      copiedPages.forEach((page) => newPdf.addPage(page))

      const outputBytes = await newPdf.save()
      const blob = new Blob([outputBytes as BlobPart], {
        type: 'application/pdf',
      })

      const url = URL.createObjectURL(blob)
      const link = window.document.createElement('a')

      link.href = url
      link.download = `${file.name.replace(/\.pdf$/i, '')}-split.pdf`

      window.document.body.appendChild(link)
      link.click()
      link.remove()

      setTimeout(() => URL.revokeObjectURL(url), 1000)

      setMessage(`${selectedPages.length} page(s) extracted successfully!`)
    } catch (err) {
      setError(
        err instanceof Error ? err.message : 'Unable to split PDF.'
      )
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="split-pdf-tool">
      <div className="split-pdf-heading">
        <div className="split-pdf-icon">✂️</div>
        <h2>Split PDF</h2>
        <p>Extract selected pages from your PDF document.</p>
      </div>

      <div className="split-pdf-upload">
        <div className="split-pdf-upload-icon">📁</div>
        <h3>Select PDF File</h3>
        <p>Choose a PDF document from your device.</p>

        <label className="split-pdf-browse">
          Browse PDF
          <input
            type="file"
            accept=".pdf,application/pdf"
            hidden
            onChange={(e) => handleFile(e.target.files?.[0])}
          />
        </label>

        {file && (
          <div className="split-pdf-file">
            <span>📄</span>
            <div>
              <strong>{file.name}</strong>
              <small>{pageCount} pages</small>
            </div>
            <button
              type="button"
              onClick={() => {
                setFile(null)
                setPageCount(0)
                setPageRange('')
                setMessage('')
                setError('')
              }}
              disabled={loading}
            >
              ✕
            </button>
          </div>
        )}
      </div>

      {file && (
        <div className="split-pdf-range">
          <label htmlFor="split-page-range">Enter Page Numbers</label>
          <input
            id="split-page-range"
            type="text"
            placeholder="Example: 1, 3, 5-8"
            value={pageRange}
            onChange={(e) => {
              setPageRange(e.target.value)
              setError('')
              setMessage('')
            }}
          />
          <small>
            Total pages: {pageCount}. Enter individual pages or ranges.
          </small>
        </div>
      )}

      {error && <div className="split-pdf-error">⚠️ {error}</div>}
      {message && <div className="split-pdf-success">✓ {message}</div>}

      <button
        type="button"
        className="split-pdf-button"
        onClick={splitPdf}
        disabled={!file || !pageRange.trim() || loading}
      >
        {loading ? 'Splitting PDF...' : 'Split PDF →'}
      </button>

      <div className="split-pdf-note">
        <strong>Example:</strong>
        <p>
          Enter <b>1, 3, 5-8</b> to extract pages 1, 3, 5, 6, 7 and 8
          into one new PDF document. Pages are kept in their original order.
        </p>
      </div>
    </div>
  )
}
