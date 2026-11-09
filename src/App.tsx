
import { useEffect, useMemo, useState } from 'react'
import { createPortal } from 'react-dom'

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

import PrivacyPolicy from './PrivacyPolicy'

type Tool = {
  name: string
  category: string
  icon: string
  description: string
}

type Question = {
  id: number
  name: string
  email: string
  subject: string
  message: string
  status: 'read' | 'unread'
  created_at: string
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

const routeTools: Record<string, string> = Object.fromEntries(
  Object.entries(toolRoutes).map(([name, route]) => [route, name])
)

function AdminDashboard() {
  const [loggedIn, setLoggedIn] = useState(false)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [questions, setQuestions] = useState<Question[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [search, setSearch] = useState('')
  const [filter, setFilter] = useState('all')
  const [selectedQuestion, setSelectedQuestion] = useState<Question | null>(null)

  const loadQuestions = async () => {
    setLoading(true)
    setError('')

    try {
      const response = await fetch('/api/admin.php?action=questions', {
        credentials: 'include',
      })
      const data = await response.json()

      if (!response.ok || !data.success) {
        if (response.status === 401) setLoggedIn(false)
        throw new Error(data.message || 'Could not load questions.')
      }

      setQuestions(data.questions || [])
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Could not load questions.')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (loggedIn) loadQuestions()
  }, [loggedIn])

  const login = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setLoading(true)
    setError('')

    try {
      const response = await fetch('/api/admin.php?action=login', {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      })

      const data = await response.json()

      if (!response.ok || !data.success) {
        throw new Error(data.message || 'Invalid login details.')
      }

      setLoggedIn(true)
      setPassword('')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Login failed.')
    } finally {
      setLoading(false)
    }
  }

  const logout = async () => {
    await fetch('/api/admin.php?action=logout', {
      method: 'POST',
      credentials: 'include',
    })

    setLoggedIn(false)
    setQuestions([])
    setSelectedQuestion(null)
  }

  const updateStatus = async (question: Question, status: 'read' | 'unread') => {
    try {
      const response = await fetch('/api/admin.php?action=status', {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: question.id, status }),
      })

      const data = await response.json()
      if (!response.ok || !data.success) {
        throw new Error(data.message || 'Status update failed.')
      }

      setQuestions((current) =>
        current.map((item) =>
          item.id === question.id ? { ...item, status } : item
        )
      )

      if (selectedQuestion?.id === question.id) {
        setSelectedQuestion({ ...question, status })
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Status update failed.')
    }
  }

  const deleteQuestion = async (id: number) => {
    if (!window.confirm('Are you sure you want to delete this question?')) return

    try {
      const response = await fetch('/api/admin.php?action=delete', {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id }),
      })

      const data = await response.json()
      if (!response.ok || !data.success) {
        throw new Error(data.message || 'Delete failed.')
      }

      setQuestions((current) => current.filter((item) => item.id !== id))
      setSelectedQuestion(null)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Delete failed.')
    }
  }

  const filteredQuestions = useMemo(() => {
    return questions.filter((question) => {
      const matchesSearch = [
        question.name,
        question.email,
        question.subject,
        question.message,
      ].join(' ').toLowerCase().includes(search.toLowerCase())

      const matchesFilter =
        filter === 'all' || question.status === filter

      return matchesSearch && matchesFilter
    })
  }, [questions, search, filter])

  if (!loggedIn) {
    return (
      <main className="admin-page">
        <div className="admin-login-card">
          <img src={lionLogo} alt="LIONRAMP" />
          <h2>Admin Login</h2>
          <p>Sign in to manage visitor questions.</p>

          <form onSubmit={login}>
            <input
              type="text"
              placeholder="Admin username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />

            <input
              type="password"
              placeholder="Admin password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            {error && <p className="question-error">{error}</p>}

            <button type="submit" className="question-submit-button" disabled={loading}>
              {loading ? 'Signing in...' : 'Login'}
            </button>
          </form>

          <a href="/">← Back to Website</a>
        </div>
      </main>
    )
  }

  return (
    <main className="admin-page">
      <div className="admin-header">
        <div>
          <h1>LIONRAMP Admin</h1>
          <p>Manage visitor questions</p>
        </div>
        <div>
          <button className="admin-action-button" onClick={loadQuestions}>
            ↻ Refresh
          </button>
          <button className="admin-action-button" onClick={logout}>
            Logout
          </button>
        </div>
      </div>

      <div className="admin-stats">
        <div className="admin-stat-card">
          <span>Total Questions</span>
          <h2>{questions.length}</h2>
        </div>
        <div className="admin-stat-card">
          <span>Unread</span>
          <h2>{questions.filter((q) => q.status === 'unread').length}</h2>
        </div>
        <div className="admin-stat-card">
          <span>Read</span>
          <h2>{questions.filter((q) => q.status === 'read').length}</h2>
        </div>
      </div>

      <div className="admin-toolbar">
        <input
          className="admin-search"
          type="search"
          placeholder="Search questions..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select
          className="admin-filter"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        >
          <option value="all">All Questions</option>
          <option value="unread">Unread</option>
          <option value="read">Read</option>
        </select>
      </div>

      {error && <p className="question-error">{error}</p>}

      {loading && <p>Loading questions...</p>}

      {!loading && filteredQuestions.length === 0 && (
        <div className="admin-empty-state">
          <h3>No questions found</h3>
          <p>Visitor submissions will appear here.</p>
        </div>
      )}

      <div className="admin-questions-list">
        {filteredQuestions.map((question) => (
          <article className="admin-question-card" key={question.id}>
            <div className="admin-question-top">
              <div>
                <h3>{question.subject}</h3>
                <p className="admin-question-meta">
                  {question.name} · {question.email}
                </p>
                <p className="admin-question-meta">
                  {new Date(question.created_at).toLocaleString()}
                </p>
              </div>

              <span className={`admin-status ${question.status}`}>
                {question.status}
              </span>
            </div>

            <p className="admin-question-body">
              {question.message.length > 180
                ? `${question.message.slice(0, 180)}...`
                : question.message}
            </p>

            <div className="admin-question-actions">
              <button
                className="admin-action-button"
                onClick={() => {
                  setSelectedQuestion(question)
                  if (question.status === 'unread') updateStatus(question, 'read')
                }}
              >
                View
              </button>

              <button
                className="admin-action-button"
                onClick={() =>
                  updateStatus(
                    question,
                    question.status === 'read' ? 'unread' : 'read'
                  )
                }
              >
                Mark as {question.status === 'read' ? 'Unread' : 'Read'}
              </button>

              <button
                className="admin-action-button"
                onClick={() => deleteQuestion(question.id)}
              >
                Delete
              </button>
            </div>
          </article>
        ))}
      </div>

      {selectedQuestion && (
        <div className="privacy-modal-overlay" onClick={() => setSelectedQuestion(null)}>
          <div
            className="privacy-modal-content"
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
          >
            <button
              className="privacy-close-button"
              onClick={() => setSelectedQuestion(null)}
            >
              ✕
            </button>
            <h2>{selectedQuestion.subject}</h2>
            <p><strong>Name:</strong> {selectedQuestion.name}</p>
            <p><strong>Email:</strong> {selectedQuestion.email}</p>
            <p><strong>Date:</strong> {new Date(selectedQuestion.created_at).toLocaleString()}</p>
            <hr />
            <p style={{ whiteSpace: 'pre-wrap' }}>{selectedQuestion.message}</p>
          </div>
        </div>
      )}

      <p style={{ marginTop: 30 }}>
        <a href="/">← Visit LIONRAMP Website</a>
      </p>
    </main>
  )
}

function App() {
  const [search, setSearch] = useState('')
  const [activeCategory, setActiveCategory] = useState('All Tools')
  const [showPrivacyPolicy, setShowPrivacyPolicy] = useState(false)

  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem('lionramp-theme') === 'dark'
  })

  const isAdmin = window.location.pathname.replace(/\/+$/, '') === '/admin'

  const [activeTool] = useState(() => {
    const params = new URLSearchParams(window.location.search)
    const slug = params.get('tool')
    return slug ? routeTools[slug] || '' : ''
  })

  useEffect(() => {
    localStorage.setItem('lionramp-theme', darkMode ? 'dark' : 'light')
    document.documentElement.setAttribute('data-theme', darkMode ? 'dark' : 'light')
  }, [darkMode])

  useEffect(() => {
    if (!showPrivacyPolicy) return

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setShowPrivacyPolicy(false)
    }

    window.addEventListener('keydown', handleEscape)
    return () => window.removeEventListener('keydown', handleEscape)
  }, [showPrivacyPolicy])

  useEffect(() => {
    document.body.style.overflow = showPrivacyPolicy ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [showPrivacyPolicy])

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
      case 'PDF to Word': return <PdfToWord />
      case 'Word to PDF': return <WordToPdf />
      case 'Merge PDF': return <MergePdf />
      case 'Split PDF': return <SplitPdf />
      case 'Text to PDF': return <TextToPdf />
      case 'Image Converter': return <ImageConverter />
      case 'Image Compressor': return <ImageCompressor />
      case 'Image Resizer': return <ImageResizer />
      case 'Video Converter': return <VideoConverter />
      case 'Audio Converter': return <AudioConverter />
      case 'ZIP Extractor': return <ZipExtractor />
      case 'Unit Converter': return <UnitConverter />
      default: return <p>Tool not found. Please return to the homepage.</p>
    }
  }

  const privacyModal = showPrivacyPolicy
    ? createPortal(
        <div className="privacy-modal-overlay" onClick={() => setShowPrivacyPolicy(false)}>
          <div
            className="privacy-modal-content"
            onClick={(event) => event.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-label="Privacy Policy"
          >
            <button
              type="button"
              className="privacy-close-button"
              onClick={() => setShowPrivacyPolicy(false)}
              aria-label="Close Privacy Policy"
            >
              ✕
            </button>
            <PrivacyPolicy />
          </div>
        </div>,
        document.body
      )
    : null

  if (isAdmin) {
    return (
      <div className={`app ${darkMode ? 'dark-mode' : 'light-mode'}`}>
        <AdminDashboard />
      </div>
    )
  }

  if (activeTool) {
    return (
      <div className={`app ${darkMode ? 'dark-mode' : 'light-mode'}`}>
        <header className="site-header">
          <div className="header-content">
            <a href="/" className="brand">
              <img src={lionLogo} alt="LIONRAMP Logo" className="brand-logo" />
              <span>LIONRAMP</span>
            </a>
            <div className="header-actions">
              <button type="button" className="theme-toggle" onClick={() => setDarkMode(!darkMode)}>
                {darkMode ? '☀️ Light' : '🌙 Dark'}
              </button>
            </div>
          </div>
        </header>

        <main className="tool-page">
          <button
            type="button"
            className="back-button"
            onClick={() => { window.location.href = window.location.pathname }}
          >
            ← Back to Home
          </button>
          <div className="active-tool-container">{renderActiveTool()}</div>
        </main>

        <footer className="site-footer">
          <p>© {new Date().getFullYear()} LIONRAMP. All rights reserved.</p>
          <p>Powerful Tools. Simple Solutions.</p>
          <a
            href="https://lionramp.iceiy.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            https://lionramp.iceiy.com
          </a>
          <button type="button" className="privacy-footer-link" onClick={() => setShowPrivacyPolicy(true)}>
            Privacy Policy
          </button>
        </footer>
        {privacyModal}
      </div>
    )
  }

  return (
    <div className={`app ${darkMode ? 'dark-mode' : 'light-mode'}`}>
      <header className="site-header">
        <div className="header-content">
          <a href="/" className="brand">
            <img src={lionLogo} alt="LIONRAMP Logo" className="brand-logo" />
            <span>LIONRAMP</span>
          </a>

          <nav className="main-nav">
            <a href="#home">Home</a>
            <a href="#tools">Tools</a>
            <a href="#about">About</a>
          </nav>

          <div className="header-actions">
            <button type="button" className="theme-toggle" onClick={() => setDarkMode(!darkMode)}>
              {darkMode ? '☀️ Light' : '🌙 Dark'}
            </button>
          </div>
        </div>
      </header>

      <main>
        <section className="hero-section" id="home">
          <div className="hero-content">
            <span className="hero-badge">FREE ONLINE TOOLS</span>
            <h1>Powerful Tools.<br /><span>Simple Solutions.</span></h1>
            <p>
              Everything you need to convert, compress and manage your files.
              Fast, simple and completely free.
            </p>
            <a href="#tools" className="hero-button">Explore All Tools <span>→</span></a>
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
                type="button"
                key={category}
                className={`category-button ${activeCategory === category ? 'active' : ''}`}
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
                <button type="button" className="open-tool-button" onClick={() => openTool(tool.name)}>
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
              <a
                href="https://lionramp.iceiy.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                https://lionramp.iceiy.com
              </a>
            </div>
          </div>

          <div className="footer-bottom">
            <p>© {new Date().getFullYear()} LIONRAMP. All rights reserved.</p>
            <button
              type="button"
              className="privacy-footer-link"
              onClick={() => setShowPrivacyPolicy(true)}
            >
              Privacy Policy
            </button>
          </div>
        </div>
      </footer>

      {privacyModal}
    </div>
  )
}

export default App
