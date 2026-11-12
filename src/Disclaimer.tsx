
import React from 'react'

const Disclaimer: React.FC = () => {
  return (
    <section style={{
      maxWidth: '900px',
      margin: '0 auto',
      padding: '50px 20px 80px',
      lineHeight: 1.8,
      color: 'var(--text-color, inherit)',
    }}>
      <div style={{ textAlign: 'center', marginBottom: '40px' }}>
        <p style={{ fontWeight: 700, letterSpacing: '2px' }}>
          IMPORTANT INFORMATION
        </p>
        <h1>Disclaimer</h1>
        <p>Last Updated: November 12, 2026</p>
      </div>

      <h2>1. General Information</h2>
      <p>
        The information and tools provided on LIONRAMP are intended for
        general informational and personal productivity purposes.
        We make reasonable efforts to maintain the website and its tools,
        but we do not guarantee that every feature will always be available
        or error-free.
      </p>

      <h2>2. Tool Accuracy and Results</h2>
      <p>
        LIONRAMP provides tools for converting, compressing, resizing
        and managing digital files. Results may vary depending on file
        formats, file quality, browser compatibility and device limitations.
        Users should check the output files before relying on them.
      </p>

      <h2>3. User Responsibility</h2>
      <p>
        Users are responsible for ensuring that they have the legal right
        to upload, process and use the files they provide to our tools.
        Users should keep original copies of important files before
        performing conversions or modifications.
      </p>

      <h2>4. No Guarantee</h2>
      <p>
        We do not guarantee that every tool will meet every user's specific
        requirements. LIONRAMP is provided on an as-available basis,
        subject to technical limitations and maintenance.
      </p>

      <h2>5. External Links</h2>
      <p>
        Our website may contain links to external websites or services.
        We do not control and are not responsible for the content,
        availability or privacy practices of those third-party websites.
      </p>

      <h2>6. Advertising</h2>
      <p>
        LIONRAMP may display advertisements provided by third-party
        advertising services, including Google. These services may use
        cookies or similar technologies according to their own policies
        and applicable privacy settings.
      </p>

      <h2>7. Changes to This Disclaimer</h2>
      <p>
        We may update this Disclaimer when necessary. Any changes will
        be published on this page with an updated revision date.
      </p>

      <h2>8. Contact</h2>
      <p>
        For questions about this Disclaimer, please visit our Contact page
        for the available contact information.
      </p>

      <p style={{ marginTop: '35px', fontWeight: 600 }}>
        By using LIONRAMP, you acknowledge that you have read this Disclaimer.
      </p>
    </section>
  )
}

export default Disclaimer
