
import { useEffect, useState } from 'react'
import './ImageResizer.css'

export default function ImageResizer() {
  const [file, setFile] = useState<File | null>(null)
  const [preview, setPreview] = useState('')
  const [width, setWidth] = useState(800)
  const [height, setHeight] = useState(600)
  const [locked, setLocked] = useState(true)
  const [ratio, setRatio] = useState(4 / 3)
  const [format, setFormat] = useState('image/png')
  const [result, setResult] = useState('')
  const [error, setError] = useState('')

  useEffect(() => {
    return () => {
      if (preview) URL.revokeObjectURL(preview)
      if (result) URL.revokeObjectURL(result)
    }
  }, [preview, result])

  function selectImage(selected?: File) {
    if (!selected) return

    if (!selected.type.startsWith('image/') ||
        selected.type === 'image/svg+xml') {
      setError('Please select a supported image file.')
      return
    }

    const url = URL.createObjectURL(selected)
    const image = new Image()

    image.onload = () => {
      setFile(selected)
      setPreview(url)
      setWidth(image.naturalWidth)
      setHeight(image.naturalHeight)
      setRatio(image.naturalWidth / image.naturalHeight)
      setResult('')
      setError('')
    }

    image.onerror = () => {
      URL.revokeObjectURL(url)
      setError('Unable to read this image.')
    }

    image.src = url
  }

  function changeWidth(value: number) {
    setWidth(value)
    if (locked && value > 0) {
      setHeight(Math.max(1, Math.round(value / ratio)))
    }
    setResult('')
  }

  function changeHeight(value: number) {
    setHeight(value)
    if (locked && value > 0) {
      setWidth(Math.max(1, Math.round(value * ratio)))
    }
    setResult('')
  }

  function resizeImage() {
    if (!file || width < 1 || height < 1) {
      setError('Please enter valid dimensions.')
      return
    }

    if (width > 12000 || height > 12000) {
      setError('Maximum width and height are 12000 pixels.')
      return
    }

    const image = new Image()

    image.onload = () => {
      const canvas = document.createElement('canvas')
      canvas.width = width
      canvas.height = height

      const context = canvas.getContext('2d')

      if (!context) {
        setError('Image processing failed.')
        return
      }

      if (format === 'image/jpeg') {
        context.fillStyle = '#ffffff'
        context.fillRect(0, 0, width, height)
      }

      context.drawImage(image, 0, 0, width, height)

      canvas.toBlob((blob) => {
        if (!blob) {
          setError('Could not create resized image.')
          return
        }

        setResult(URL.createObjectURL(blob))
        setError('')
      }, format, 0.92)
    }

    image.onerror = () => setError('Unable to load image.')

    image.src = preview
  }

  function reset() {
    setFile(null)
    setPreview('')
    setResult('')
    setError('')
    setWidth(800)
    setHeight(600)
  }

  return (
    <div className="image-resizer">
      <div className="resizer-heading">
        <div className="resizer-icon">📐</div>
        <h2>Image Resizer</h2>
        <p>Resize images to your preferred dimensions.</p>
      </div>

      {!file ? (
        <label className="resizer-upload">
          <span>📁</span>
          <strong>Choose an Image</strong>
          <small>Click here to select an image from your device</small>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => selectImage(e.target.files?.[0])}
          />
        </label>
      ) : (
        <div className="resizer-workspace">
          <div className="resizer-preview">
            <img src={preview} alt="Original image" />
            <p>{file.name}</p>
            <small>
              Original: {file.type} · {file.size < 1024 * 1024
                ? `${(file.size / 1024).toFixed(1)} KB`
                : `${(file.size / (1024 * 1024)).toFixed(2)} MB`}
            </small>
          </div>

          <div className="resizer-settings">
            <h3>Resize Dimensions</h3>

            <div className="resizer-dimensions">
              <label>
                Width (px)
                <input
                  type="number"
                  min="1"
                  max="12000"
                  value={width}
                  onChange={(e) => changeWidth(Number(e.target.value))}
                />
              </label>

              <label>
                Height (px)
                <input
                  type="number"
                  min="1"
                  max="12000"
                  value={height}
                  onChange={(e) => changeHeight(Number(e.target.value))}
                />
              </label>
            </div>

            <button
              className="resizer-lock"
              onClick={() => setLocked(!locked)}
            >
              {locked ? '🔒 Aspect Ratio Locked' : '🔓 Aspect Ratio Unlocked'}
            </button>

            <label className="resizer-format-label">
              Output Format
              <select
                value={format}
                onChange={(e) => {
                  setFormat(e.target.value)
                  setResult('')
                }}
              >
                <option value="image/png">PNG</option>
                <option value="image/jpeg">JPG</option>
                <option value="image/webp">WEBP</option>
              </select>
            </label>

            <button className="resizer-button" onClick={resizeImage}>
              Resize Image
            </button>
          </div>

          {result && (
            <div className="resizer-success">
              <h3>Image Resized Successfully!</h3>
              <p>New dimensions: {width} × {height} pixels</p>
              <a
                href={result}
                download={`lionramp-resized.${format.split('/')[1]}`}
              >
                Download Resized Image
              </a>
            </div>
          )}

          <button className="resizer-reset" onClick={reset}>
            Choose Another Image
          </button>
        </div>
      )}

      {error && <p className="resizer-error">{error}</p>}

      <p className="resizer-note">
        Images are resized directly in your browser. Your files are not
        uploaded to our server.
      </p>
    </div>
  )
}
