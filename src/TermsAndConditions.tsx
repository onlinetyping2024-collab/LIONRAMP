import React from 'react'

const TermsAndConditions: React.FC = () => {
  return (
    <main className="info-page">
      <div className="info-page-inner">
        <span className="info-label">LEGAL INFORMATION</span>
        <h1>Terms & Conditions</h1>
        <p className="info-intro">
          Please read these terms before using LIONRAMP.
        </p>

        <section className="info-card">
          <h2>1. Acceptance of Terms</h2>
          <p>
            By accessing or using LIONRAMP, you agree to these Terms &
            Conditions. If you do not agree with these terms, please stop
            using the website.
          </p>
        </section>

        <section className="info-card">
          <h2>2. Use of Our Services</h2>
          <p>
            LIONRAMP provides online tools for image, PDF, document, video,
            audio and other digital tasks. You agree to use these tools only
            for lawful purposes and in accordance with applicable laws.
          </p>
        </section>

        <section className="info-card">
          <h2>3. User Responsibilities</h2>
          <p>When using LIONRAMP, you agree that you will not:</p>
          <ul>
            <li>Use the website for illegal or unauthorized activities.</li>
            <li>Upload or process files that violate another person's rights.</li>
            <li>Attempt to damage, disrupt or interfere with the website.</li>
            <li>Attempt to gain unauthorized access to website systems.</li>
            <li>Use our services in a way that harms other users.</li>
          </ul>
        </section>

        <section className="info-card">
          <h2>4. Your Files and Content</h2>
          <p>
            You remain responsible for the files and content you choose to
            use with LIONRAMP. You should only upload or process files that
            you have the legal right to use.
          </p>
          <p>
            You are responsible for keeping copies of important original
            files. We recommend checking the output of any tool before
            relying on it.
          </p>
        </section>

        <section className="info-card">
          <h2>5. Availability of Services</h2>
          <p>
            We aim to keep LIONRAMP available and working properly. However,
            we do not guarantee that the website or every tool will always
            be available, uninterrupted, error-free or compatible with every
            device or file format.
          </p>
          <p>
            Features may be changed, updated, temporarily unavailable or
            discontinued when necessary.
          </p>
        </section>

        <section className="info-card">
          <h2>6. Intellectual Property</h2>
          <p>
            The LIONRAMP website design, branding, logos, original text and
            other original website materials are protected by applicable
            intellectual property laws.
          </p>
          <p>
            You may not copy, reproduce or redistribute our original website
            materials without permission, except where permitted by law.
          </p>
        </section>

        <section className="info-card">
          <h2>7. Third-Party Services and Advertising</h2>
          <p>
            LIONRAMP may use third-party services, including advertising
            services, analytics tools or external links. These services may
            operate under their own terms and privacy policies.
          </p>
          <p>
            We are not responsible for the content, policies or practices of
            external websites and services.
          </p>
        </section>

        <section className="info-card">
          <h2>8. Disclaimer</h2>
          <p>
            LIONRAMP is provided on an "as available" basis. Although we aim
            to provide useful and reliable tools, we do not guarantee that
            results will always be accurate, complete or suitable for every
            purpose.
          </p>
          <p>
            Users should independently verify important results before
            relying on them.
          </p>
        </section>

        <section className="info-card">
          <h2>9. Limitation of Liability</h2>
          <p>
            To the extent permitted by applicable law, LIONRAMP will not be
            responsible for indirect or unexpected losses resulting from
            the use of, or inability to use, the website or its tools.
          </p>
          <p>
            Nothing in these terms excludes liability where such exclusion
            is not permitted by applicable law.
          </p>
        </section>

        <section className="info-card">
          <h2>10. Changes to These Terms</h2>
          <p>
            We may update these Terms & Conditions from time to time.
            Updated terms will be published on this page with a revised
            update date. Continued use of the website after changes are
            published means you accept the updated terms, to the extent
            permitted by applicable law.
          </p>
        </section>

        <section className="info-card">
          <h2>11. Contact and Website</h2>
          <p>
            For general information about LIONRAMP, please visit our
            official website.
          </p>
          <a
            className="info-action-link"
            href="https://lionramp.iceiy.com"
          >
            https://lionramp.iceiy.com
          </a>
        </section>

        <p className="info-updated">Last updated: November 11, 2026</p>
      </div>
    </main>
  )
}

export default TermsAndConditions