
import { useState } from 'react'
import { jsPDF } from 'jspdf'
import mammoth from 'mammoth'
import './WordToPdf.css'

export default function WordToPdf() {
  const [file, setFile] = useState<File | null>(null)
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')

  const handleFile = (selectedFile?: File) => {
    setMessage('')
    setError('')

    if (!selectedFile) return

    if (!selectedFile.name.toLowerCase().endsWith('.docx')) {
      setError('Please select a DOCX Word document.')
      setFile(null)
      return
    }

    setFile(selectedFile)
  }

  const convertToPdf = async () => {
    if (!file) return

    setLoading(true)
    setMessage('')
    setError('')

    try {
      const arrayBuffer = await file.arrayBuffer()

      const result = await mammoth.extractRawText({ arrayBuffer })
      const text = result.value.trim()

      if (!text) {
        throw new Error('No readable text found in this Word document.')
      }

      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4',
      })

      const margin = 15
      const pageWidth = pdf.internal.pageSize.getWidth()
      const pageHeight = pdf.internal.pageSize.getHeight()
      const maxWidth = pageWidth - margin * 2
      const lineHeight = 7

      const lines = pdf.splitTextToSize(text, maxWidth)
      let y = margin

      pdf.setFont('helvetica', 'normal')
      pdf.setFontSize(11)

      for (const line of lines) {
        if (y + lineHeight > pageHeight - margin) {
          pdf.addPage()
          y = margin
        }

        pdf.text(line, margin, y)
        y += lineHeight
      }

      const fileName = file.name.replace(/\.docx$/i, '')
      pdf.save(`${fileName}.pdf`)

      setMessage('Word document converted to PDF successfully!')
    } catch (err) {
      console.error(err)
      setError(
        err instanceof Error
          ? err.message
          : 'Conversion failed. Please try another Word document.'
      )
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="word-pdf-tool">
      <div className="word-pdf-heading">
        <div className="word-pdf-icon">📝</div>
        <h2>Word to PDF Converter</h2>
        <p>Convert Word documents into PDF files.</p>
      </div>

      <div className="word-pdf-upload">
        <div className="word-pdf-upload-icon">📁</div>
        <h3>Select Your Word File</h3>
        <p>Choose a .docx document from your device.</p>

        <label className="word-pdf-browse">
          Browse Word File
          <input
            type="file"
            accept=".docx,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
            hidden
            onChange={(e) => handleFile(e.target.files?.[0])}
          />
        </label>

        {file && (
          <div className="word-pdf-file">
            <span>📝</span>
            <div>
              <strong>{file.name}</strong>
              <small>
                {(file.size / 1024 / 1024).toFixed(2)} MB
              </small>
            </div>
            <button
              type="button"
              onClick={() => {
                setFile(null)
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

      {error && <div className="word-pdf-error">⚠️ {error}</div>}
      {message && <div className="word-pdf-success">✓ {message}</div>}

      <button
        type="button"
        className="word-pdf-convert"
        onClick={convertToPdf}
        disabled={!file || loading}
      >
        {loading ? 'Converting...' : 'Convert to PDF →'}
      </button>

      <div className="word-pdf-note">
        <strong>Important:</strong>
        <p>
          This version extracts text from DOCX files. Original formatting,
          images, tables and advanced document layouts may not be preserved.
          Scanned or image-only documents are not supported.
        </p>
      </div>
    </div>
  )
}
