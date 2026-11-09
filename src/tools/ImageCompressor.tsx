import { useEffect, useState } from 'react'
import './ImageCompressor.css'

export default function ImageCompressor() {
  const [file, setFile] = useState<File | null>(null)
  const [preview, setPreview] = useState('')
  const [quality, setQuality] = useState(70)
  const [format, setFormat] = useState('image/jpeg')
  const [result, setResult] = useState('')
  const [resultSize, setResultSize] = useState(0)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    return () => {
      if (preview) URL.revokeObjectURL(preview)
      if (result) URL.revokeObjectURL(result)
    }
  }, [preview, result])

  function selectFile(selected: File | undefined) {
    if (!selected) return

    if (!selected.type.startsWith('image/')) {
      setError('Please select a valid image file.')
      return
    }

    if (selected.type === 'image/svg+xml') {
      setError('SVG files are not supported by this compressor.')
      return
    }

    setFile(selected)
    setPreview(URL.createObjectURL(selected))
    setResult('')
    setError('')
  }

  function compressImage() {
    if (!file) return

    setLoading(true)
    setError('')

    const image = new Image()
    const imageUrl = URL.createObjectURL(file)

    image.onload = () => {
      const canvas = document.createElement('canvas')
      canvas.width = image.naturalWidth
      canvas.height = image.naturalHeight

      const context = canvas.getContext('2d')

      if (!context) {
        setError('Could not process this image.')
        setLoading(false)
        URL.revokeObjectURL(imageUrl)
        return
      }

      context.drawImage(image, 0, 0)

      canvas.toBlob(
        (blob) => {
          URL.revokeObjectURL(imageUrl)

          if (!blob) {
            setError('Compression failed. Please try another image.')
            setLoading(false)
            return
          }

          setResult(URL.createObjectURL(blob))
          setResultSize(blob.size)
          setLoading(false)
        },
        format,
        quality / 100
      )
    }

    image.onerror = () => {
      URL.revokeObjectURL(imageUrl)
      setError('Unable to read this image.')
      setLoading(false)
    }

    image.src = imageUrl
  }

  function reset() {
    setFile(null)
    setPreview('')
    setResult('')
    setResultSize(0)
    setError('')
  }

  function formatSize(size: number) {
    return size < 1024 * 1024
      ? `${(size / 1024).toFixed(1)} KB`
      : `${(size / (1024 * 1024)).toFixed(2)} MB`
  }

  const reduction = file && resultSize
    ? Math.max(0, ((file.size - resultSize) / file.size) * 100)
    : 0

  return (
    <div className="image-compressor">
      <div className="compressor-heading">
        <div className="compressor-icon">🗜️</div>
        <h2>Image Compressor</h2>
        <p>Reduce image file size without unnecessary quality loss.</p>
      </div>

      {!file ? (
        <label className="compressor-upload">
          <span className="compressor-upload-icon">📁</span>
          <strong>Choose an image</strong>
          <span>JPG, PNG, WEBP and other supported image formats</span>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => selectFile(e.target.files?.[0])}
          />
        </label>
      ) : (
        <div className="compressor-workspace">
          <div className="compressor-preview">
            <img src={preview} alt="Selected image preview" />
            <p>{file.name}</p>
            <span>Original size: {formatSize(file.size)}</span>
          </div>

          <div className="compressor-settings">
            <label htmlFor="compression-quality">
              Image Quality: <strong>{quality}%</strong>
            </label>

            <input
              id="compression-quality"
              type="range"
              min="10"
              max="100"
              value={quality}
              onChange={(e) => setQuality(Number(e.target.value))}
            />

            <label htmlFor="compression-format">Output Format</label>
            <select
              id="compression-format"
              value={format}
              onChange={(e) => {
                setFormat(e.target.value)
                setResult('')
              }}
            >
              <option value="image/jpeg">JPG</option>
              <option value="image/png">PNG</option>
              <option value="image/webp">WEBP</option>
            </select>

            <button
              className="compressor-button"
              onClick={compressImage}
              disabled={loading}
            >
              {loading ? 'Compressing...' : 'Compress Image'}
            </button>
          </div>

          {result && (
            <div className="compressor-result">
              <h3>Compression Complete!</h3>
              <p>Original: {formatSize(file.size)}</p>
              <p>Compressed: {formatSize(resultSize)}</p>
              <p>Size reduction: {reduction.toFixed(1)}%</p>

              <a
                href={result}
                download={`lionramp-compressed.${format.split('/')[1]}`}
                className="compressor-download"
              >
                Download Compressed Image
              </a>
            </div>
          )}

          <button className="compressor-reset" onClick={reset}>
            Choose Another Image
          </button>
        </div>
      )}

      {error && <p className="compressor-error">{error}</p>}

      <p className="compressor-note">
        Your image is processed directly in your browser. It is not uploaded
        to our server.
      </p>
    </div>
  )
}