
import { useState } from 'react'
import { PDFDocument } from 'pdf-lib'
import './MergePdf.css'

export default function MergePdf() {
  const [files, setFiles] = useState<File[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [message, setMessage] = useState('')

  const handleFiles = (selectedFiles: FileList | null) => {
    if (!selectedFiles) return

    const newFiles = Array.from(selectedFiles)
    const invalidFile = newFiles.find(
      (file) =>
        file.type !== 'application/pdf' &&
        !file.name.toLowerCase().endsWith('.pdf')
    )

    if (invalidFile) {
      setError('Please select PDF files only.')
      return
    }

    setFiles((previous) => [...previous, ...newFiles])
    setError('')
    setMessage('')
  }

  const removeFile = (index: number) => {
    setFiles((previous) => previous.filter((_, i) => i !== index))
    setMessage('')
  }

  const moveFile = (index: number, direction: number) => {
    const newFiles = [...files]
    const targetIndex = index + direction

    if (targetIndex < 0 || targetIndex >= newFiles.length) return

    ;[newFiles[index], newFiles[targetIndex]] = [
      newFiles[targetIndex],
      newFiles[index],
    ]

    setFiles(newFiles)
    setMessage('')
  }

  const mergePdfs = async () => {
    if (files.length < 2) {
      setError('Please select at least two PDF files.')
      return
    }

    setLoading(true)
    setError('')
    setMessage('')

    try {
      const mergedPdf = await PDFDocument.create()

      for (const file of files) {
        const bytes = await file.arrayBuffer()
        const pdf = await PDFDocument.load(bytes)
        const pages = await mergedPdf.copyPages(
          pdf,
          pdf.getPageIndices()
        )

        pages.forEach((page) => mergedPdf.addPage(page))
      }

      const mergedBytes = await mergedPdf.save()
      const blob = new Blob([mergedBytes as BlobPart], {
        type: 'application/pdf',
      })

      const url = URL.createObjectURL(blob)
      const link = window.document.createElement('a')

      link.href = url
      link.download = 'lionramp-merged.pdf'

      window.document.body.appendChild(link)
      link.click()
      link.remove()

      setTimeout(() => URL.revokeObjectURL(url), 1000)

      setMessage('PDF files merged successfully!')
    } catch (err) {
      console.error(err)
      setError(
        'Unable to merge these files. Check whether they are valid and not password-protected.'
      )
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="merge-pdf-tool">
      <div className="merge-pdf-heading">
        <div className="merge-pdf-icon">📚</div>
        <h2>Merge PDF Files</h2>
        <p>Combine multiple PDF documents into one file.</p>
      </div>

      <label className="merge-pdf-browse">
        + Add PDF Files
        <input
          type="file"
          accept=".pdf,application/pdf"
          multiple
          hidden
          onChange={(e) => {
            handleFiles(e.target.files)
            e.target.value = ''
          }}
        />
      </label>

      <div className="merge-pdf-list">
        {files.length === 0 ? (
          <div className="merge-pdf-empty">
            <span>📂</span>
            <h3>No PDF files selected</h3>
            <p>Add at least two PDF files to merge.</p>
          </div>
        ) : (
          <>
            <div className="merge-pdf-list-heading">
              <strong>Selected PDF Files ({files.length})</strong>
              <button
                type="button"
                onClick={() => {
                  setFiles([])
                  setMessage('')
                  setError('')
                }}
                disabled={loading}
              >
                Clear All
              </button>
            </div>

            {files.map((file, index) => (
              <div className="merge-pdf-file" key={`${file.name}-${index}`}>
                <span className="merge-pdf-file-icon">📄</span>

                <div className="merge-pdf-file-info">
                  <strong>{file.name}</strong>
                  <small>
                    {(file.size / 1024 / 1024).toFixed(2)} MB
                  </small>
                </div>

                <div className="merge-pdf-actions">
                  <button
                    type="button"
                    title="Move up"
                    onClick={() => moveFile(index, -1)}
                    disabled={index === 0 || loading}
                  >
                    ↑
                  </button>

                  <button
                    type="button"
                    title="Move down"
                    onClick={() => moveFile(index, 1)}
                    disabled={index === files.length - 1 || loading}
                  >
                    ↓
                  </button>

                  <button
                    type="button"
                    title="Remove file"
                    onClick={() => removeFile(index)}
                    disabled={loading}
                  >
                    ✕
                  </button>
                </div>
              </div>
            ))}
          </>
        )}
      </div>

      {error && <div className="merge-pdf-error">⚠️ {error}</div>}
      {message && <div className="merge-pdf-success">✓ {message}</div>}

      <button
        type="button"
        className="merge-pdf-button"
        onClick={mergePdfs}
        disabled={files.length < 2 || loading}
      >
        {loading ? 'Merging PDFs...' : 'Merge PDF Files →'}
      </button>

      <div className="merge-pdf-note">
        <strong>Note:</strong>
        <p>
          Files will be merged in the displayed order. Use the arrow buttons
          to change their order before merging. Processing happens in your
          browser.
        </p>
      </div>
    </div>
  )
}
