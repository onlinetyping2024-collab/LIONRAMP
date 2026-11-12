import React from 'react'

const ContactUs: React.FC = () => {
  return (
    <main className="info-page">
      <div className="info-page-inner">
        <span className="info-label">GET IN TOUCH</span>
        <h1>Contact LIONRAMP</h1>
        <p className="info-intro">
          Thank you for visiting LIONRAMP.
        </p>

        <section className="info-card">
          <h2>About Contacting Us</h2>
          <p>
            LIONRAMP is an online platform created to provide useful and
            accessible digital tools. We appreciate your interest in our
            website and services.
          </p>
        </section>

        <section className="info-card">
          <h2>Website Information</h2>
          <p>
            You can visit our official website to explore the available
            tools and learn more about LIONRAMP.
          </p>
          <a
            className="info-action-link"
            href="https://lionramp.iceiy.com"
          >
            https://lionramp.iceiy.com
          </a>
        </section>

        <section className="info-card">
          <h2>Before Using Our Tools</h2>
          <p>
            If you experience an issue while using a tool, please check
            that your browser is up to date, your file is supported and
            your internet connection is stable where an internet
            connection is required.
          </p>
        </section>

        <section className="info-card">
          <h2>Important Information</h2>
          <p>
            LIONRAMP does not currently provide a direct contact form or
            a published email support channel. We do not want to display
            contact details that are not available.
          </p>
        </section>

        <p className="info-updated">Last updated: November 11, 2026</p>
      </div>
    </main>
  )
}

export default ContactUs