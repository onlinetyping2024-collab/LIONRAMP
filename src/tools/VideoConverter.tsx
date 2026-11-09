
import { useRef, useState } from 'react'
import { FFmpeg } from '@ffmpeg/ffmpeg'
import { fetchFile } from '@ffmpeg/util'
import './VideoConverter.css'

const formats = ['mp4', 'webm', 'avi', 'mov', 'mp3']

export default function VideoConverter() {
  const [file, setFile] = useState<File | null>(null)
  const [format, setFormat] = useState('mp4')
  const [loading, setLoading] = useState(false)
  const [progress, setProgress] = useState(0)
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')
  const ffmpegRef = useRef<FFmpeg | null>(null)

  const convert = async () => {
    if (!file) return

    setLoading(true)
    setError('')
    setMessage('')
    setProgress(0)

    try {
      let ffmpeg = ffmpegRef.current

      if (!ffmpeg) {
        ffmpeg = new FFmpeg()
        ffmpeg.on('progress', ({ progress }) => {
          setProgress(Math.min(99, Math.round(progress * 100)))
        })
        await ffmpeg.load()
        ffmpegRef.current = ffmpeg
      }

      const inputName = 'input-video'
      const outputName = `output.${format}`

      await ffmpeg.writeFile(inputName, await fetchFile(file))

      await ffmpeg.exec([
        '-i', inputName,
        '-y',
        ...(format === 'mp3'
          ? ['-vn', '-b:a', '192k']
          : format === 'webm'
            ? ['-c:v', 'libvpx', '-c:a', 'libvorbis']
            : format === 'avi'
              ? ['-c:v', 'mpeg4', '-c:a', 'mp3']
              : format === 'mov'
                ? ['-c:v', 'libx264', '-c:a', 'aac']
                : ['-c:v', 'libx264', '-c:a', 'aac', '-preset', 'ultrafast']),
        outputName,
      ])

      const data = await ffmpeg.readFile(outputName)

      if (typeof data === 'string') {
        throw new Error('Unable to create output file.')
      }

      const mimeType = format === 'mp3'
        ? 'audio/mpeg'
        : format === 'webm'
          ? 'video/webm'
          : format === 'mov'
            ? 'video/quicktime'
            : format === 'avi'
              ? 'video/x-msvideo'
              : 'video/mp4'

      const blob = new Blob([data as BlobPart], { type: mimeType })
      const url = URL.createObjectURL(blob)
      const link = window.document.createElement('a')

      link.href = url
      link.download = `${file.name.replace(/\.[^/.]+$/, '')}.${format}`
      window.document.body.appendChild(link)
      link.click()
      link.remove()

      setTimeout(() => URL.revokeObjectURL(url), 1000)
      setProgress(100)
      setMessage('Conversion completed successfully!')

      await ffmpeg.deleteFile(inputName)
      await ffmpeg.deleteFile(outputName)
    } catch (err) {
      console.error(err)
      setError(
        'Conversion failed. Try another file or a supported video format.'
      )
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="video-converter-tool">
      <div className="video-converter-heading">
        <div className="video-converter-icon">🎬</div>
        <h2>Video Converter</h2>
        <p>Convert video files into different formats.</p>
      </div>

      <div className="video-converter-upload">
        <span>📁</span>
        <h3>Select Video File</h3>
        <p>Choose a video from your device.</p>

        <label className="video-converter-browse">
          Browse Video
          <input
            type="file"
            accept="video/*"
            hidden
            onChange={(e) => {
              setFile(e.target.files?.[0] || null)
              setError('')
              setMessage('')
              setProgress(0)
            }}
          />
        </label>

        {file && (
          <div className="video-converter-file">
            <strong>{file.name}</strong>
            <small>{(file.size / 1024 / 1024).toFixed(2)} MB</small>
            <button
              type="button"
              onClick={() => setFile(null)}
              disabled={loading}
            >
              ✕
            </button>
          </div>
        )}
      </div>

      <div className="video-converter-settings">
        <label htmlFor="video-format">Output Format</label>
        <select
          id="video-format"
          value={format}
          onChange={(e) => setFormat(e.target.value)}
          disabled={loading}
        >
          {formats.map((item) => (
            <option key={item} value={item}>
              {item.toUpperCase()}
            </option>
          ))}
        </select>
      </div>

      {loading && (
        <div className="video-converter-progress">
          <div>
            <span>Processing...</span>
            <span>{progress}%</span>
          </div>
          <div className="video-converter-progress-track">
            <div style={{ width: `${progress}%` }} />
          </div>
        </div>
      )}

      {error && <div className="video-converter-error">⚠️ {error}</div>}
      {message && <div className="video-converter-success">✓ {message}</div>}

      <button
        type="button"
        className="video-converter-button"
        onClick={convert}
        disabled={!file || loading}
      >
        {loading ? 'Converting...' : 'Convert Video →'}
      </button>

      <div className="video-converter-note">
        <strong>Note:</strong>
        <p>
          Video conversion runs in your browser and may use significant
          memory and processing power. Large videos can take a long time.
          Browser support and available FFmpeg codecs may limit some formats.
        </p>
      </div>
    </div>
  )
}
