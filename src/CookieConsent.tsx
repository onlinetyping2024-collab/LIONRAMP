
import { useEffect, useState } from 'react'
import './CookieConsent.css'

type CookiePreferences = {
  necessary: true
  analytics: boolean
  advertising: boolean
}

const STORAGE_KEY = 'lionramp-cookie-preferences'

function CookieConsent() {
  const [preferences, setPreferences] =
    useState<CookiePreferences | null>(null)

  const [loading, setLoading] = useState(true)
  const [showSettings, setShowSettings] = useState(false)
  const [analytics, setAnalytics] = useState(false)
  const [advertising, setAdvertising] = useState(false)

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY)

      if (saved) {
        const parsed = JSON.parse(saved) as CookiePreferences

        setPreferences(parsed)
        setAnalytics(parsed.analytics)
        setAdvertising(parsed.advertising)
      }
    } catch {
      localStorage.removeItem(STORAGE_KEY)
    }

    setLoading(false)
  }, [])

  const savePreferences = (newPreferences: CookiePreferences) => {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(newPreferences)
    )

    setPreferences(newPreferences)
    setShowSettings(false)
  }

  const acceptAll = () => {
    setAnalytics(true)
    setAdvertising(true)

    savePreferences({
      necessary: true,
      analytics: true,
      advertising: true,
    })
  }

  const rejectOptional = () => {
    setAnalytics(false)
    setAdvertising(false)

    savePreferences({
      necessary: true,
      analytics: false,
      advertising: false,
    })
  }

  const saveCustomPreferences = () => {
    savePreferences({
      necessary: true,
      analytics,
      advertising,
    })
  }

  if (loading) return null

  if (preferences && !showSettings) {
    return (
      <button
        className="cookie-settings-button"
        onClick={() => setShowSettings(true)}
        aria-label="Open cookie settings"
      >
        🍪 Cookie Settings
      </button>
    )
  }

  return (
    <div className="cookie-overlay">
      <div
        className="cookie-popup"
        role="dialog"
        aria-modal="true"
        aria-labelledby="cookie-title"
      >
        <div className="cookie-icon">🍪</div>

        <h2 id="cookie-title">We Value Your Privacy</h2>

        <p className="cookie-description">
          LIONRAMP uses cookies and similar technologies to
          improve your browsing experience, understand website
          usage and support advertising. You can choose which
          optional categories you allow.
        </p>

        <div className="cookie-category">
          <div>
            <strong>Necessary Cookies</strong>
            <p>
              Required for essential website functionality.
            </p>
          </div>

          <span className="cookie-always-active">
            Always Active
          </span>
        </div>

        <div className="cookie-category">
          <div>
            <strong>Analytics Cookies</strong>
            <p>
              Help us understand how visitors use our website.
            </p>
          </div>

          <label className="cookie-switch">
            <input
              type="checkbox"
              checked={analytics}
              onChange={(e) =>
                setAnalytics(e.target.checked)
              }
            />
            <span className="cookie-slider" />
          </label>
        </div>

        <div className="cookie-category">
          <div>
            <strong>Advertising Cookies</strong>
            <p>
              May be used to support relevant advertising.
            </p>
          </div>

          <label className="cookie-switch">
            <input
              type="checkbox"
              checked={advertising}
              onChange={(e) =>
                setAdvertising(e.target.checked)
              }
            />
            <span className="cookie-slider" />
          </label>
        </div>

        <div className="cookie-actions">
          <button
            className="cookie-accept"
            onClick={acceptAll}
          >
            Accept All
          </button>

          <button
            className="cookie-reject"
            onClick={rejectOptional}
          >
            Reject Optional
          </button>

          <button
            className="cookie-save"
            onClick={saveCustomPreferences}
          >
            Save Preferences
          </button>
        </div>

        <div className="cookie-footer">
          <a href="/?page=privacy-policy">
            Privacy Policy
          </a>

          <span>•</span>

          <a href="/?page=terms">
            Terms &amp; Conditions
          </a>
        </div>
      </div>
    </div>
  )
}

export default CookieConsent
