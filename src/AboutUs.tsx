import React from 'react'

const AboutUs: React.FC = () => {
  return (
    <main className="info-page">
      <div className="info-page-inner">
        <span className="info-label">ABOUT US</span>
        <h1>About LIONRAMP</h1>
        <p className="info-intro">
          Powerful Tools. Simple Solutions.
        </p>

        <section className="info-card">
          <h2>Who We Are</h2>
          <p>
            LIONRAMP is an online platform that provides simple and useful
            digital tools to help people complete everyday tasks. Our goal is
            to make common file-related tasks easier, faster and more
            accessible.
          </p>
        </section>

        <section className="info-card">
          <h2>What We Offer</h2>
          <p>
            LIONRAMP provides a collection of online utilities for working
            with images, PDF documents, videos, audio files and other common
            digital tasks.
          </p>
          <ul>
            <li>Image conversion, compression and resizing tools</li>
            <li>PDF and document conversion tools</li>
            <li>PDF merging and splitting tools</li>
            <li>Video and audio conversion tools</li>
            <li>ZIP extraction and unit conversion utilities</li>
          </ul>
        </section>

        <section className="info-card">
          <h2>Our Mission</h2>
          <p>
            Our mission is to make useful digital tools accessible through a
            simple and user-friendly experience. We aim to keep improving
            LIONRAMP by making our tools easier to use and more helpful for
            everyday digital needs.
          </p>
        </section>

        <section className="info-card">
          <h2>Our Approach</h2>
          <p>
            We focus on simplicity, accessibility and user experience.
            Depending on the tool, files may be processed directly in your
            browser or through the services required for that tool.
          </p>
        </section>

        <section className="info-card">
          <h2>Explore LIONRAMP</h2>
          <p>
            Discover the available tools and find simple solutions for your
            everyday digital tasks.
          </p>
          <a className="info-action-link" href="/">
            Explore Our Tools →
          </a>
        </section>

        <p className="info-updated">Last updated: November 11, 2026</p>
      </div>
    </main>
  )
}

export default AboutUs