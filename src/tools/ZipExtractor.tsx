
import { useState } from 'react'
import JSZip from 'jszip'
import './ZipExtractor.css'

interface ZipFileItem {
  name: string
  size: number
  path: string
  isDirectory: boolean
}

export default function ZipExtractor() {
  const [file, setFile] = useState<File | null>(null)
  const [files, setFiles] = useState<ZipFileItem[]>([])
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')

  const formatSize = (bytes: number) => {
    if (bytes < 1024) return `${bytes} B`
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(2)} KB`
    return `${(bytes / (1024 * 1024)).toFixed(2)} MB`
  }

  const handleFile = async (selectedFile: File | null) => {
    if (!selectedFile) return

    setFile(selectedFile)
    setFiles([])
    setError('')
    setMessage('')
    setLoading(true)

    try {
      const zip = await JSZip.loadAsync(selectedFile)

      const items: ZipFileItem[] = Object.values(zip.files).map((item) => ({
        name: item.name.split('/').filter(Boolean).pop() || item.name,
        size: 0,
        path: item.name,
        isDirectory: item.dir,
      }))

      setFiles(items)
      setMessage(`${items.length} items found inside ZIP file.`)
    } catch (err) {
      console.error(err)
      setFile(null)
      setError('Unable to open this ZIP file. Please select a valid ZIP archive.')
    } finally {
      setLoading(false)
    }
  }

  const extractAll = async () => {
    if (!file) return

    setLoading(true)
    setError('')
    setMessage('')

    try {
      const zip = await JSZip.loadAsync(file)
      const outputZip = new JSZip()

      const entries = Object.values(zip.files).filter(
        (item) => !item.dir
      )

      for (const entry of entries) {
        const content = await entry.async('uint8array')
        outputZip.file(entry.name, content)
      }

      const blob = await outputZip.generateAsync({
        type: 'blob',
        compression: 'DEFLATE',
        compressionOptions: { level: 6 },
      })

      const url = URL.createObjectURL(blob)
      const link = window.document.createElement('a')

      link.href = url
      link.download = `${file.name.replace(/\.zip$/i, '')}-extracted.zip`

      window.document.body.appendChild(link)
      link.click()
      link.remove()

      setTimeout(() => URL.revokeObjectURL(url), 1000)

      setMessage('Extraction completed! Your extracted files are downloaded as a ZIP folder.')
    } catch (err) {
      console.error(err)
      setError('Extraction failed. The ZIP file may be damaged or too large.')
    } finally {
      setLoading(false)
    }
  }

  const extractSingle = async (path: string) => {
    if (!file) return

    setLoading(true)
    setError('')
    setMessage('')

    try {
      const zip = await JSZip.loadAsync(file)
      const entry = zip.file(path)

      if (!entry) {
        throw new Error('File not found')
      }

      const content = await entry.async('blob')
      const url = URL.createObjectURL(content)
      const link = window.document.createElement('a')

      link.href = url
      link.download = path.split('/').pop() || 'download'
      window.document.body.appendChild(link)
      link.click()
      link.remove()

      setTimeout(() => URL.revokeObjectURL(url), 1000)
      setMessage('File downloaded successfully!')
    } catch (err) {
      console.error(err)
      setError('Unable to extract this file.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="zip-extractor-tool">
      <div className="zip-extractor-heading">
        <div className="zip-extractor-icon">📦</div>
        <h2>ZIP Extractor</h2>
        <p>Open ZIP archives and download their contents.</p>
      </div>

      <div className="zip-extractor-upload">
        <div className="zip-extractor-upload-icon">🗂️</div>
        <h3>Select ZIP File</h3>
        <p>Choose a ZIP archive from your device.</p>

        <label className="zip-extractor-browse">
          Browse ZIP
          <input
            type="file"
            accept=".zip,application/zip"
            hidden
            onChange={(e) => handleFile(e.target.files?.[0] || null)}
          />
        </label>

        {file && (
          <div className="zip-extractor-selected">
            <strong>{file.name}</strong>
            <small>{formatSize(file.size)}</small>
            <button
              type="button"
              disabled={loading}
              onClick={() => {
                setFile(null)
                setFiles([])
                setMessage('')
                setError('')
              }}
            >
              ✕
            </button>
          </div>
        )}
      </div>

      {loading && (
        <div className="zip-extractor-loading">
          <span className="zip-extractor-spinner" />
          Processing ZIP file...
        </div>
      )}

      {error && (
        <div className="zip-extractor-error">⚠️ {error}</div>
      )}

      {message && (
        <div className="zip-extractor-success">✓ {message}</div>
      )}

      {files.length > 0 && (
        <div className="zip-extractor-file-list">
          <div className="zip-extractor-list-heading">
            <h3>Archive Contents</h3>
            <span>{files.length} items</span>
          </div>

          {files.map((item, index) => (
            <div className="zip-extractor-item" key={`${item.path}-${index}`}>
              <span className="zip-extractor-item-icon">
                {item.isDirectory ? '📁' : '📄'}
              </span>

              <div className="zip-extractor-item-info">
                <strong>{item.name}</strong>
                <small>{item.isDirectory ? 'Folder' : item.path}</small>
              </div>

              {!item.isDirectory && (
                <button
                  type="button"
                  disabled={loading}
                  onClick={() => extractSingle(item.path)}
                >
                  Download
                </button>
              )}
            </div>
          ))}

          <button
            type="button"
            className="zip-extractor-all-button"
            onClick={extractAll}
            disabled={loading}
          >
            Extract All Files ↓
          </button>
        </div>
      )}

      <div className="zip-extractor-note">
        <strong>Privacy & Information</strong>
        <p>
          ZIP processing happens locally in your browser.
          Extract All downloads a new ZIP containing the extracted files,
          which you can open using your computer or phone's archive manager.
          Password-protected and some advanced archive formats are not supported.
        </p>
      </div>
    </div>
  )
}
