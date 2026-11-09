
import { useEffect, useState } from 'react'
import './ImageConverter.css'

type ImageFormat = 'png' | 'jpeg' | 'webp'

export default function ImageConverter() {
  const [file, setFile] = useState<File | null>(null)
  const [preview, setPreview] = useState('')
  const [format, setFormat] = useState<ImageFormat>('png')
  const [quality, setQuality] = useState(90)
  const [convertedUrl, setConvertedUrl] = useState('')
  const [convertedName, setConvertedName] = useState('')
  const [error, setError] = useState('')
  const [dragging, setDragging] = useState(false)
  const [converting, setConverting] = useState(false)

  useEffect(() => {
    return () => {
      if (preview) URL.revokeObjectURL(preview)
      if (convertedUrl) URL.revokeObjectURL(convertedUrl)
    }
  }, [preview, convertedUrl])

  function selectFile(selectedFile?: File) {
    if (!selectedFile) return

    if (!selectedFile.type.startsWith('image/')) {
      setError('Please select a valid image file.')
      return
    }

    if (preview) URL.revokeObjectURL(preview)
    if (convertedUrl) URL.revokeObjectURL(convertedUrl)

    setFile(selectedFile)
    setPreview(URL.createObjectURL(selectedFile))
    setConvertedUrl('')
    setConvertedName('')
    setError('')
  }

  async function convertImage() {
    if (!file || !preview) return

    setConverting(true)
    setError('')

    try {
      const image = new Image()
      image.src = preview

      await new Promise<void>((resolve, reject) => {
        image.onload = () => resolve()
        image.onerror = () => reject(new Error('Unable to load image.'))
      })

      const canvas = document.createElement('canvas')
      canvas.width = image.naturalWidth
      canvas.height = image.naturalHeight

      const context = canvas.getContext('2d')
      if (!context) throw new Error('Canvas is not supported.')

      context.drawImage(image, 0, 0)

      const mimeType = `image/${format}`

      const blob = await new Promise<Blob>((resolve, reject) => {
        canvas.toBlob(
          (result) => {
            if (result) resolve(result)
            else reject(new Error('Image conversion failed.'))
          },
          mimeType,
          quality / 100,
        )
      })

      const url = URL.createObjectURL(blob)

      if (convertedUrl) URL.revokeObjectURL(convertedUrl)

      setConvertedUrl(url)

      const originalName = file.name.replace(/\.[^/.]+$/, '')
      setConvertedName(
        `${originalName}.${format === 'jpeg' ? 'jpg' : format}`,
      )
    } catch {
      setError('Conversion failed. Please try another image.')
    } finally {
      setConverting(false)
    }
  }

  function downloadImage() {
    if (!convertedUrl) return

    const link = document.createElement('a')
    link.href = convertedUrl
    link.download = convertedName
    link.click()
  }

  function resetTool() {
    if (preview) URL.revokeObjectURL(preview)
    if (convertedUrl) URL.revokeObjectURL(convertedUrl)

    setFile(null)
    setPreview('')
    setConvertedUrl('')
    setConvertedName('')
    setError('')
  }

  return (
    <div className="image-converter">
      <div className="converter-heading">
        <span className="converter-icon">🖼️</span>
        <h1>Image Converter</h1>
        <p>
          Convert your images into PNG, JPG and WebP formats easily.
        </p>
      </div>

      {!file ? (
        <label
          className={`image-upload-area ${dragging ? 'dragging' : ''}`}
          onDragOver={(event) => {
            event.preventDefault()
            setDragging(true)
          }}
          onDragLeave={() => setDragging(false)}
          onDrop={(event) => {
            event.preventDefault()
            setDragging(false)
            selectFile(event.dataTransfer.files[0])
          }}
        >
          <input
            type="file"
            accept="image/*"
            hidden
            onChange={(event) => selectFile(event.target.files?.[0])}
          />

          <div className="upload-symbol">↑</div>
          <h2>Upload Your Image</h2>
          <p>Drag and drop your image here</p>
          <span className="upload-button">Choose Image</span>
          <small>
            Supports JPG, PNG, WebP and other browser-supported images
          </small>
        </label>
      ) : (
        <div className="converter-workspace">
          <div className="image-preview-box">
            <h3>Image Preview</h3>
            <img src={preview} alt="Selected image preview" />
            <p>{file.name}</p>
          </div>

          <div className="conversion-settings">
            <h3>Conversion Settings</h3>

            <label htmlFor="image-format">Output Format</label>

            <select
              id="image-format"
              value={format}
              onChange={(event) => {
                setFormat(event.target.value as ImageFormat)
                setConvertedUrl('')
              }}
            >
              <option value="png">PNG</option>
              <option value="jpeg">JPG / JPEG</option>
              <option value="webp">WebP</option>
            </select>

            {format !== 'png' && (
              <div className="quality-control">
                <label htmlFor="image-quality">
                  Image Quality: {quality}%
                </label>

                <input
                  id="image-quality"
                  type="range"
                  min="10"
                  max="100"
                  value={quality}
                  onChange={(event) => {
                    setQuality(Number(event.target.value))
                    setConvertedUrl('')
                  }}
                />
              </div>
            )}

            <button
              className="convert-button"
              onClick={convertImage}
              disabled={converting}
            >
              {converting ? 'Converting...' : 'Convert Image'}
            </button>

            {convertedUrl && (
              <div className="conversion-success">
                <span>✓</span>
                <p>Image converted successfully!</p>

                <button
                  className="download-button"
                  onClick={downloadImage}
                >
                  Download Image ↓
                </button>
              </div>
            )}

            <button className="reset-button" onClick={resetTool}>
              Choose Another Image
            </button>
          </div>
        </div>
      )}

      {error && <p className="converter-error">{error}</p>}

      <div className="converter-note">
        <span>🔒</span>
        <p>
          Your images are processed directly in your browser.
          They are not uploaded to our server.
        </p>
      </div>
    </div>
  )
}
