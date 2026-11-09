
import { useRef, useState } from 'react'
import { FFmpeg } from '@ffmpeg/ffmpeg'
import { fetchFile } from '@ffmpeg/util'
import './AudioConverter.css'

const formats = ['mp3', 'wav', 'ogg', 'flac', 'aac']

export default function AudioConverter() {
  const [file, setFile] = useState<File | null>(null)
  const [format, setFormat] = useState('mp3')
  const [loading, setLoading] = useState(false)
  const [progress, setProgress] = useState(0)
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')
  const ffmpegRef = useRef<FFmpeg | null>(null)

  const convertAudio = async () => {
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

      const inputName = 'input-audio'
      const outputName = `converted.${format}`

      await ffmpeg.writeFile(inputName, await fetchFile(file))

      let codecArguments: string[] = []

      switch (format) {
        case 'mp3':
          codecArguments = ['-c:a', 'libmp3lame', '-b:a', '192k']
          break

        case 'wav':
          codecArguments = ['-c:a', 'pcm_s16le']
          break

        case 'ogg':
          codecArguments = ['-c:a', 'libvorbis', '-q:a', '5']
          break

        case 'flac':
          codecArguments = ['-c:a', 'flac']
          break

        case 'aac':
          codecArguments = ['-c:a', 'aac', '-b:a', '192k']
          break
      }

      await ffmpeg.exec([
        '-i',
        inputName,
        '-vn',
        '-y',
        ...codecArguments,
        outputName,
      ])

      const data = await ffmpeg.readFile(outputName)

      if (typeof data === 'string') {
        throw new Error('Unable to create audio file.')
      }

      const mimeTypes: Record<string, string> = {
        mp3: 'audio/mpeg',
        wav: 'audio/wav',
        ogg: 'audio/ogg',
        flac: 'audio/flac',
        aac: 'audio/aac',
      }

      const blob = new Blob([data as BlobPart], {
        type: mimeTypes[format],
      })

      const url = URL.createObjectURL(blob)
      const link = window.document.createElement('a')

      link.href = url
      link.download = `${file.name.replace(/\.[^/.]+$/, '')}.${format}`

      window.document.body.appendChild(link)
      link.click()
      link.remove()

      setTimeout(() => URL.revokeObjectURL(url), 1000)

      setProgress(100)
      setMessage('Audio converted successfully!')

      await ffmpeg.deleteFile(inputName)
      await ffmpeg.deleteFile(outputName)
    } catch (err) {
      console.error(err)
      setError(
        'Audio conversion failed. Please try another audio file.'
      )
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="audio-converter-tool">
      <div className="audio-converter-heading">
        <div className="audio-converter-icon">🎵</div>
        <h2>Audio Converter</h2>
        <p>Convert your audio files into different formats.</p>
      </div>

      <div className="audio-converter-upload">
        <div className="audio-converter-upload-icon">🎧</div>

        <h3>Select Audio File</h3>
        <p>Choose an audio file from your device.</p>

        <label className="audio-converter-browse">
          Browse Audio
          <input
            type="file"
            accept="audio/*"
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
          <div className="audio-converter-file">
            <div className="audio-converter-file-icon">🎶</div>

            <div className="audio-converter-file-info">
              <strong>{file.name}</strong>
              <small>
                {(file.size / 1024 / 1024).toFixed(2)} MB
              </small>
            </div>

            <button
              type="button"
              onClick={() => setFile(null)}
              disabled={loading}
              aria-label="Remove audio file"
            >
              ✕
            </button>
          </div>
        )}
      </div>

      <div className="audio-converter-settings">
        <label htmlFor="audio-output-format">
          Output Format
        </label>

        <select
          id="audio-output-format"
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
        <div className="audio-converter-progress">
          <div className="audio-converter-progress-label">
            <span>Converting Audio...</span>
            <span>{progress}%</span>
          </div>

          <div className="audio-converter-progress-track">
            <div style={{ width: `${progress}%` }} />
          </div>
        </div>
      )}

      {error && (
        <div className="audio-converter-error">
          ⚠️ {error}
        </div>
      )}

      {message && (
        <div className="audio-converter-success">
          ✓ {message}
        </div>
      )}

      <button
        type="button"
        className="audio-converter-button"
        onClick={convertAudio}
        disabled={!file || loading}
      >
        {loading ? 'Converting...' : 'Convert Audio →'}
      </button>

      <div className="audio-converter-note">
        <strong>Privacy & Information</strong>
        <p>
          Your audio is processed inside your browser.
          Files are not intentionally uploaded to a server.
          Large audio files may require more memory and processing time.
          Available output formats depend on the FFmpeg codecs.
        </p>
      </div>
    </div>
  )
}
