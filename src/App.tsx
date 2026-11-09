
import { useEffect, useMemo, useState } from 'react'
import './App.css'

import lionLogo from './assets/lionramp-logo.png'

import ImageConverter from './tools/ImageConverter'
import ImageCompressor from './tools/ImageCompressor'
import ImageResizer from './tools/ImageResizer'
import TextToPdf from './tools/TextToPdf'

import PdfToWord from './tools/PdfToWord'
import WordToPdf from './tools/WordToPdf'
import MergePdf from './tools/MergePdf'
import SplitPdf from './tools/SplitPdf'
import VideoConverter from './tools/VideoConverter'
import AudioConverter from './tools/AudioConverter'
import ZipExtractor from './tools/ZipExtractor'
import UnitConverter from './tools/UnitConverter'

type Tool = {
  name: string
  category: string
  icon: string
  description: string
}

const tools: Tool[] = [
  { name: 'PDF to Word', category: 'PDF', icon: '📄', description: 'Convert PDF files into editable Word documents.' },
  { name: 'Word to PDF', category: 'PDF', icon: '📝', description: 'Turn Word documents into PDF files.' },
  { name: 'Merge PDF', category: 'PDF', icon: '📚', description: 'Combine multiple PDF files into one document.' },
  { name: 'Split PDF', category: 'PDF', icon: '✂️', description: 'Separate pages from a PDF document.' },
  { name: 'Text to PDF', category: 'PDF', icon: '📰', description: 'Turn your written text into a downloadable PDF.' },

  { name: 'Image Converter', category: 'Image', icon: '🖼️', description: 'Convert images between PNG, JPG and WEBP formats.' },
  { name: 'Image Compressor', category: 'Image', icon: '🗜️', description: 'Reduce image file size while maintaining quality.' },
  { name: 'Image Resizer', category: 'Image', icon: '📐', description: 'Resize images to your preferred dimensions.' },

  { name: 'Video Converter', category: 'Video', icon: '🎬', description: 'Convert video files between supported formats.' },
  { name: 'Audio Converter', category: 'Audio', icon: '🎵', description: 'Convert audio files into different formats.' },

  { name: 'ZIP Extractor', category: 'Utility', icon: '📦', description: 'Extract files from ZIP archives.' },
  { name: 'Unit Converter', category: 'Utility', icon: '🔄', description: 'Convert common measurements and units.' },
]

const categories = ['All Tools', 'PDF', 'Image', 'Video', 'Audio', 'Utility']

const toolRoutes: Record<string, string> = {
  'PDF to Word': 'pdf-to-word',
  'Word to PDF': 'word-to-pdf',
  'Merge PDF': 'merge-pdf',
  'Split PDF': 'split-pdf',
  'Text to PDF': 'text-to-pdf',
  'Image Converter': 'image-converter',
  'Image Compressor': 'image-compressor',
  'Image Resizer': 'image-resizer',
  'Video Converter': 'video-converter',
  'Audio Converter': 'audio-converter',
  'ZIP Extractor': 'zip-extractor',
  'Unit Converter': 'unit-converter',
}

const routeTools: Record<string, string> = {
  'pdf-to-word': 'PDF to Word',
  'word-to-pdf': 'Word to PDF',
  'merge-pdf': 'Merge PDF',
  'split-pdf': 'Split PDF',
  'text-to-pdf': 'Text to PDF',
  'image-converter': 'Image Converter',
  'image-compressor': 'Image Compressor',
  'image-resizer': 'Image Resizer',
  'video-converter': 'Video Converter',
  'audio-converter': 'Audio Converter',
  'zip-extractor': 'ZIP Extractor',
  'unit-converter': 'Unit Converter',
}

function App() {
  const [search, setSearch] = useState('')
  const [activeCategory, setActiveCategory] = useState('All Tools')

  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem('lionramp-theme') === 'dark'
  })

  const [activeTool] = useState(() => {
    const params = new URLSearchParams(window.location.search)
    const slug = params.get('tool')
    return slug ? routeTools[slug] || '' : ''
  })

  useEffect(() => {
    localStorage.setItem('lionramp-theme', darkMode ? 'dark' : 'light')
    document.documentElement.setAttribute(
      'data-theme',
      darkMode ? 'dark' : 'light'
    )
  }, [darkMode])

  const filteredTools = useMemo(() => {
    return tools.filter((tool) => {
      const matchesSearch =
        tool.name.toLowerCase().includes(search.toLowerCase()) ||
        tool.description.toLowerCase().includes(search.toLowerCase())

      const matchesCategory =
        activeCategory === 'All Tools' || tool.category === activeCategory

      return matchesSearch && matchesCategory
    })
  }, [search, activeCategory])

  const openTool = (toolName: string) => {
    const route = toolRoutes[toolName]

    if (!route) {
      alert(`${toolName} is currently unavailable.`)
      return
    }

    const url = `${window.location.origin}${window.location.pathname}?tool=${route}`

    window.open(url, '_blank', 'noopener,noreferrer')
  }

  const renderActiveTool = () => {
    switch (activeTool) {
      case 'PDF to Word':
        return <PdfToWord />

      case 'Word to PDF':
        return <WordToPdf />

      case 'Merge PDF':
        return <MergePdf />

      case 'Split PDF':
        return <SplitPdf />

      case 'Text to PDF':
        return <TextToPdf />

      case 'Image Converter':
        return <ImageConverter />

      case 'Image Compressor':
        return <ImageCompressor />

      case 'Image Resizer':
        return <ImageResizer />

      case 'Video Converter':
        return <VideoConverter />

      case 'Audio Converter':
        return <AudioConverter />

      case 'ZIP Extractor':
        return <ZipExtractor />

      case 'Unit Converter':
        return <UnitConverter />

      default:
        return <p>Tool not found. Please return to the homepage.</p>
    }
  }

  if (activeTool) {
    return (
      <div className={`app ${darkMode ? 'dark-mode' : 'light-mode'}`}>
        <header className="site-header">
          <div className="header-content">
            <a href="/" className="brand">
              <img
                src={lionLogo}
                alt="LIONRAMP Logo"
                className="brand-logo"
              />
              <span>LIONRAMP</span>
            </a>

            <div className="header-actions">
              <button
                className="theme-toggle"
                onClick={() => setDarkMode(!darkMode)}
              >
                {darkMode ? '☀️ Light' : '🌙 Dark'}
              </button>
            </div>
          </div>
        </header>

        <main className="tool-page">
          <button
            className="back-button"
            onClick={() => {
              window.location.href = window.location.pathname
            }}
          >
            ← Back to Home
          </button>

          <div className="active-tool-container">
            {renderActiveTool()}
          </div>
        </main>

        <footer className="site-footer">
          <p>© {new Date().getFullYear()} LIONRAMP. All rights reserved.</p>
          <p>Powerful Tools. Simple Solutions.</p>
        </footer>
      </div>
    )
  }

  return (
    <div className={`app ${darkMode ? 'dark-mode' : 'light-mode'}`}>
      <header className="site-header">
        <div className="header-content">
          <a href="/" className="brand">
            <img
              src={lionLogo}
              alt="LIONRAMP Logo"
              className="brand-logo"
            />
            <span>LIONRAMP</span>
          </a>

          <nav className="main-nav">
            <a href="#home">Home</a>
            <a href="#tools">Tools</a>
            <a href="#about">About</a>
          </nav>

          <div className="header-actions">
            <button
              className="theme-toggle"
              onClick={() => setDarkMode(!darkMode)}
            >
              {darkMode ? '☀️ Light' : '🌙 Dark'}
            </button>
          </div>
        </div>
      </header>

      <main>
        <section className="hero-section" id="home">
          <div className="hero-content">
            <span className="hero-badge">FREE ONLINE TOOLS</span>

            <h1>
              Powerful Tools.
              <br />
              <span>Simple Solutions.</span>
            </h1>

            <p>
              Everything you need to convert, compress and manage your files.
              Fast, simple and completely free.
            </p>

            <a href="#tools" className="hero-button">
              Explore All Tools <span>→</span>
            </a>
          </div>
        </section>

        <section className="tools-section" id="tools">
          <div className="section-heading">
            <span className="section-label">OUR TOOLS</span>
            <h2>Explore Our Free Tools</h2>
            <p>Choose a tool and get your work done quickly and easily.</p>
          </div>

          <div className="search-container">
            <span className="search-icon">🔍</span>

            <input
              type="search"
              placeholder="Search for a tool..."
              value={search}
              onChange={(event) => setSearch(event.target.value)}
            />
          </div>

          <div className="category-filter">
            {categories.map((category) => (
              <button
                key={category}
                className={`category-button ${
                  activeCategory === category ? 'active' : ''
                }`}
                onClick={() => setActiveCategory(category)}
              >
                {category}
              </button>
            ))}
          </div>

          <div className="tools-grid">
            {filteredTools.map((tool) => (
              <article className="tool-card" key={tool.name}>
                <div className="tool-icon">{tool.icon}</div>

                <div className="tool-card-content">
                  <span className="tool-category">{tool.category}</span>
                  <h3>{tool.name}</h3>
                  <p>{tool.description}</p>
                </div>

                <button
                  className="open-tool-button"
                  onClick={() => openTool(tool.name)}
                >
                  Open Tool <span>→</span>
                </button>
              </article>
            ))}
          </div>

          {filteredTools.length === 0 && (
            <div className="no-tools">
              <span>🔎</span>
              <h3>No tools found</h3>
              <p>Try another search term or category.</p>
            </div>
          )}
        </section>

        <section className="about-section" id="about">
          <div className="about-content">
            <span className="section-label">ABOUT LIONRAMP</span>
            <h2>One Place. Many Powerful Tools.</h2>

            <p>
              LIONRAMP provides simple and useful online tools to help you
              complete everyday digital tasks. Our goal is to make file
              conversion and other useful utilities accessible to everyone.
            </p>

            <div className="about-features">
              <div className="about-feature">
                <span>🆓</span>
                <h3>Completely Free</h3>
                <p>Use our tools without subscriptions or payments.</p>
              </div>

              <div className="about-feature">
                <span>⚡</span>
                <h3>Simple to Use</h3>
                <p>Easy interfaces designed for everyone.</p>
              </div>

              <div className="about-feature">
                <span>🔒</span>
                <h3>Privacy Focused</h3>
                <p>Browser-based processing where supported.</p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="footer-content">
          <div className="footer-brand">
            <img src={lionLogo} alt="LIONRAMP Logo" />

            <div>
              <h3>LIONRAMP</h3>
              <p>Powerful Tools. Simple Solutions.</p>
            </div>
          </div>

          <p>© {new Date().getFullYear()} LIONRAMP. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}

export default App
