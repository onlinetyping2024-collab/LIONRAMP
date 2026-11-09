
import { useState } from 'react'
import { jsPDF } from 'jspdf'
import './TextToPdf.css'

function TextToPdf() {
  const [title, setTitle] = useState('My Document')
  const [text, setText] = useState('')
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)

  const wordCount = text.trim() ? text.trim().split(/\s+/).length : 0

  const createPDF = () => {
    setError('')
    setSuccess(false)

    if (!text.trim()) {
      setError('Please enter some text before creating your PDF.')
      return
    }

    try {
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4',
      })

      const pageWidth = pdf.internal.pageSize.getWidth()
      const pageHeight = pdf.internal.pageSize.getHeight()
      const margin = 20
      const usableWidth = pageWidth - margin * 2
      let y = 25

      const documentTitle = title.trim() || 'My Document'

      pdf.setFont('helvetica', 'bold')
      pdf.setFontSize(20)

      const titleLines = pdf.splitTextToSize(documentTitle, usableWidth)

      titleLines.forEach((line: string) => {
        if (y > pageHeight - margin) {
          pdf.addPage()
          y = margin
        }
        pdf.text(line, margin, y)
        y += 10
      })

      y += 5
      pdf.setDrawColor(200, 200, 200)
      pdf.line(margin, y, pageWidth - margin, y)
      y += 12

      pdf.setFont('helvetica', 'normal')
      pdf.setFontSize(11)

      text.split('\n').forEach((paragraph) => {
        if (!paragraph.trim()) {
          y += 7
          if (y > pageHeight - margin) {
            pdf.addPage()
            y = margin
          }
          return
        }

        const lines = pdf.splitTextToSize(paragraph, usableWidth)

        lines.forEach((line: string) => {
          if (y > pageHeight - margin) {
            pdf.addPage()
            y = margin
          }
          pdf.text(line, margin, y)
          y += 7
        })

        y += 3
      })

      const safeName =
        documentTitle.replace(/[^a-z0-9]/gi, '_').replace(/_+/g, '_') ||
        'document'

      pdf.save(`${safeName}.pdf`)
      setSuccess(true)
    } catch (err) {
      console.error(err)
      setError('Something went wrong while creating the PDF. Please try again.')
    }
  }

  const clearText = () => {
    setText('')
    setTitle('My Document')
    setError('')
    setSuccess(false)
  }

  return (
    <div className="text-to-pdf">
      <div className="text-pdf-heading">
        <div className="text-pdf-icon">📝</div>
        <div>
          <h1>Text to PDF Converter</h1>
          <p>Convert your written text into a downloadable PDF document.</p>
        </div>
      </div>

      <div className="text-pdf-workspace">
        <div className="text-pdf-field">
          <label htmlFor="document-title">Document Title</label>
          <input
            id="document-title"
            type="text"
            value={title}
            onChange={(e) => {
              setTitle(e.target.value)
              setSuccess(false)
            }}
            placeholder="Enter document title..."
            maxLength={100}
          />
        </div>

        <div className="text-pdf-field">
          <label htmlFor="document-text">Your Text</label>
          <textarea
            id="document-text"
            value={text}
            onChange={(e) => {
              setText(e.target.value)
              setSuccess(false)
            }}
            placeholder="Type or paste your text here..."
            rows={14}
          />
        </div>

        <div className="text-pdf-info">
          <span>Words: {wordCount}</span>
          <span>Characters: {text.length}</span>
        </div>

        {error && <div className="text-pdf-error">{error}</div>}
        {success && (
          <div className="text-pdf-success">
            ✓ Your PDF has been created and downloaded successfully!
          </div>
        )}

        <div className="text-pdf-actions">
          <button className="text-pdf-button" onClick={createPDF} disabled={!text.trim()}>
            📄 Create & Download PDF
          </button>
          <button className="text-pdf-clear" onClick={clearText}>Clear</button>
        </div>
      </div>

      <div className="text-pdf-note">
        <strong>Note:</strong> This version supports basic Latin text.
        Sinhala and other Unicode scripts need an embedded Unicode font
        for correct PDF display.
      </div>
    </div>
  )
}

export default TextToPdf
