
import React from "react";

const PrivacyPolicy: React.FC = () => {
  const lastUpdated = "November 11, 2026";

  const sections = [
    { id: "introduction", title: "1. Introduction" },
    { id: "information", title: "2. Information We Collect" },
    { id: "file-processing", title: "3. File Processing & Privacy" },
    { id: "cookies", title: "4. Cookies & Tracking" },
    { id: "advertising", title: "5. Google AdSense & Advertising" },
    { id: "preferences", title: "6. Advertising Preferences" },
    { id: "third-party", title: "7. Third-Party Services" },
    { id: "security", title: "8. Data Security" },
    { id: "children", title: "9. Children's Privacy" },
    { id: "rights", title: "10. Your Privacy Rights" },
    { id: "changes", title: "11. Changes to This Policy" },
    { id: "contact", title: "12. Contact & Website" },
  ];

  const policySections = [
    {
      id: "introduction",
      title: "Introduction",
      content: (
        <>
          <p>
            Welcome to <strong>LIONRAMP</strong>. Your privacy is important to
            us. This Privacy Policy explains how information may be collected,
            used, stored, and protected when you visit and use our website.
          </p>
          <p>
            LIONRAMP provides online tools designed to help users work with
            images, documents, PDFs, and other digital content.
          </p>
          <p>
            By accessing or using our website, you acknowledge that you have
            read and understood this Privacy Policy.
          </p>
        </>
      ),
    },
    {
      id: "information",
      title: "Information We Collect",
      content: (
        <>
          <p>
            We aim to collect only the information reasonably necessary to
            operate and improve our website.
          </p>
          <ul>
            <li>
              <strong>Usage information:</strong> Browser type, device
              information, pages visited, and general website interaction data.
            </li>
            <li>
              <strong>Technical information:</strong> IP address, operating
              system, browser settings, and diagnostic information that may be
              provided through hosting or analytics services.
            </li>
            <li>
              <strong>Voluntarily provided information:</strong> Information
              you choose to submit through any available website feature.
            </li>
          </ul>
          <p>
            We do not intentionally request sensitive personal information
            through our online tools.
          </p>
        </>
      ),
    },
    {
      id: "file-processing",
      title: "File Processing & User Privacy",
      content: (
        <>
          <p>
            LIONRAMP offers tools for working with images, PDFs, documents,
            and other files.
          </p>
          <p>
            Depending on the individual tool, file processing may take place
            directly in your browser or through an external processing service.
            Please check the behavior of the specific tool before uploading
            confidential or sensitive files.
          </p>
          <ul>
            <li>
              Do not upload files containing confidential or highly sensitive
              information unless you understand how that tool processes them.
            </li>
            <li>
              We do not intend to use your personal files for advertising
              purposes.
            </li>
            <li>
              Any third-party processing service may handle information
              according to its own privacy policy.
            </li>
          </ul>
        </>
      ),
    },
    {
      id: "cookies",
      title: "Cookies & Tracking Technologies",
      content: (
        <>
          <p>
            Our website and third-party services may use cookies or similar
            technologies to support website functionality, understand visitor
            activity, and improve user experience.
          </p>
          <p>Cookies may be used for purposes such as:</p>
          <ul>
            <li>Remembering certain website preferences.</li>
            <li>Understanding website traffic and performance.</li>
            <li>Supporting advertising and measurement services.</li>
          </ul>
          <p>
            You can manage or disable cookies through your browser settings.
            However, disabling cookies may affect certain website features.
          </p>
        </>
      ),
    },
    {
      id: "advertising",
      title: "Google AdSense & Third-Party Advertising",
      content: (
        <>
          <p>
            LIONRAMP may display advertisements provided by Google AdSense
            and other advertising partners.
          </p>
          <p>
            Third-party advertising providers may use cookies, web beacons,
            or similar technologies to show advertisements based on previous
            visits to this or other websites.
          </p>
          <p>
            Google and its advertising partners may process certain information
            in accordance with their own privacy policies and applicable
            advertising requirements.
          </p>
          <p>
            For more information about how Google handles data, visit:
          </p>
          <a
            href="https://policies.google.com/privacy"
            target="_blank"
            rel="noopener noreferrer"
          >
            Google Privacy Policy
          </a>
        </>
      ),
    },
    {
      id: "preferences",
      title: "Google Advertising Preferences",
      content: (
        <>
          <p>
            Users may be able to manage their Google advertising
            personalization preferences through Google's account settings.
          </p>
          <p>
            You can learn more about advertising controls and personalization
            at:
          </p>
          <a
            href="https://myadcenter.google.com/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Google My Ad Center
          </a>
          <p>
            You may also manage cookies through your browser settings and
            available privacy controls.
          </p>
        </>
      ),
    },
    {
      id: "third-party",
      title: "Third-Party Services",
      content: (
        <>
          <p>
            LIONRAMP may use third-party services to support hosting,
            advertising, analytics, security, and website functionality.
          </p>
          <p>
            These providers may process certain technical or usage information
            when you interact with our website.
          </p>
          <p>
            Third-party services operate under their own terms and privacy
            policies. We encourage users to review those policies when using
            external services.
          </p>
        </>
      ),
    },
    {
      id: "security",
      title: "Data Security",
      content: (
        <>
          <p>
            We take reasonable steps to protect our website and the information
            handled through its services.
          </p>
          <p>
            However, no website, internet connection, or electronic storage
            method can be guaranteed to be completely secure.
          </p>
          <p>
            Users should take appropriate precautions when accessing online
            services and sharing personal or confidential information.
          </p>
        </>
      ),
    },
    {
      id: "children",
      title: "Children's Privacy",
      content: (
        <>
          <p>
            LIONRAMP is not intentionally designed to collect personal
            information from children under the age of 13.
          </p>
          <p>
            We do not knowingly collect personal information from children
            under 13 without appropriate parental consent where required by
            applicable law.
          </p>
          <p>
            If you believe that a child has provided personal information
            through our website, appropriate steps should be taken to address
            the issue.
          </p>
        </>
      ),
    },
    {
      id: "rights",
      title: "Your Privacy Rights",
      content: (
        <>
          <p>
            Depending on your location and applicable privacy laws, you may
            have rights regarding your personal information.
          </p>
          <ul>
            <li>The right to request access to personal information.</li>
            <li>The right to request correction of inaccurate information.</li>
            <li>The right to request deletion where legally applicable.</li>
            <li>The right to object to or restrict certain data processing.</li>
            <li>The right to manage cookies and advertising preferences.</li>
          </ul>
          <p>
            These rights may vary depending on the laws applicable to your
            location and the services involved.
          </p>
        </>
      ),
    },
    {
      id: "changes",
      title: "Changes to This Privacy Policy",
      content: (
        <>
          <p>
            We may update this Privacy Policy from time to time to reflect
            changes to our website, services, technology, or legal requirements.
          </p>
          <p>
            Any updates will be published on this page with a revised
            "Last Updated" date.
          </p>
          <p>
            We encourage visitors to review this page periodically to stay
            informed about our privacy practices.
          </p>
        </>
      ),
    },
    {
      id: "contact",
      title: "Contact & Website",
      content: (
        <>
          <p>
            If you have questions or concerns about this Privacy Policy or
            LIONRAMP's privacy practices, please visit our website for
            available information and support.
          </p>
          <div className="pp-website-link">
            <span className="pp-link-icon">↗</span>
            <div>
              <span className="pp-link-label">Official Website</span>
              <a
                href="https://lionramp.iceiy.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                https://lionramp.iceiy.com
              </a>
            </div>
          </div>
        </>
      ),
    },
  ];

  return (
    <div className="pp-page">
      <style>{`
        .pp-page {
          --pp-primary: #7558f6;
          --pp-primary-dark: #5940d8;
          --pp-text: #252b40;
          --pp-muted: #727b91;
          --pp-border: #e9eaf2;
          min-height: 100vh;
          background: #f5f6fb;
          color: var(--pp-text);
          font-family: Inter, Arial, sans-serif;
          padding-bottom: 60px;
        }

        .pp-page * {
          box-sizing: border-box;
        }

        .pp-hero {
          position: relative;
          overflow: hidden;
          background: linear-gradient(125deg, #111329 0%, #21194b 55%, #4630a0 100%);
          color: #fff;
          padding: 70px 24px 100px;
        }

        .pp-hero::before {
          content: "";
          position: absolute;
          width: 420px;
          height: 420px;
          border-radius: 50%;
          background: rgba(143, 108, 255, 0.18);
          filter: blur(75px);
          right: -100px;
          top: -180px;
          pointer-events: none;
        }

        .pp-hero::after {
          content: "";
          position: absolute;
          width: 320px;
          height: 320px;
          border-radius: 50%;
          background: rgba(90, 116, 255, 0.14);
          filter: blur(70px);
          left: -120px;
          bottom: -200px;
          pointer-events: none;
        }

        .pp-hero-inner {
          position: relative;
          z-index: 1;
          max-width: 1100px;
          margin: 0 auto;
        }

        .pp-brand {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          font-size: 15px;
          font-weight: 900;
          letter-spacing: 2.5px;
          color: #fff;
          margin-bottom: 40px;
        }

        .pp-brand-icon {
          display: grid;
          place-items: center;
          width: 34px;
          height: 34px;
          border-radius: 10px;
          background: linear-gradient(135deg, #9c83ff, #6847ec);
          box-shadow: 0 5px 20px rgba(115, 83, 255, .35);
          font-size: 18px;
        }

        .pp-eyebrow {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 7px 13px;
          border: 1px solid rgba(255,255,255,.18);
          background: rgba(255,255,255,.08);
          border-radius: 30px;
          color: #d5caff;
          font-size: 12px;
          font-weight: 700;
          letter-spacing: 1.1px;
          text-transform: uppercase;
          margin-bottom: 18px;
        }

        .pp-eyebrow-dot {
          width: 7px;
          height: 7px;
          background: #9e86ff;
          border-radius: 50%;
        }

        .pp-hero h1 {
          margin: 0;
          max-width: 750px;
          font-size: clamp(36px, 6vw, 62px);
          line-height: 1.08;
          font-weight: 850;
          letter-spacing: -2px;
        }

        .pp-hero h1 span {
          display: block;
          color: #aa98ff;
        }

        .pp-hero-description {
          max-width: 650px;
          margin: 22px 0 28px;
          color: #d2d1e5;
          font-size: 16px;
          line-height: 1.85;
        }

        .pp-hero-meta {
          display: flex;
          flex-wrap: wrap;
          gap: 12px;
        }

        .pp-meta-item {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 10px 14px;
          border: 1px solid rgba(255,255,255,.14);
          background: rgba(255,255,255,.07);
          border-radius: 9px;
          color: #e2defb;
          font-size: 12px;
        }

        .pp-layout {
          position: relative;
          z-index: 2;
          max-width: 1100px;
          margin: -42px auto 0;
          padding: 0 22px;
          display: grid;
          grid-template-columns: 250px minmax(0, 1fr);
          gap: 25px;
          align-items: start;
        }

        .pp-sidebar {
          position: sticky;
          top: 25px;
          background: #fff;
          border: 1px solid var(--pp-border);
          border-radius: 17px;
          padding: 22px 16px;
          box-shadow: 0 12px 40px rgba(28, 32, 68, .06);
        }

        .pp-sidebar-title {
          padding: 0 10px 15px;
          font-size: 11px;
          font-weight: 900;
          letter-spacing: 1.5px;
          color: #9299aa;
          text-transform: uppercase;
        }

        .pp-nav {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .pp-nav a {
          display: block;
          padding: 10px 11px;
          border-radius: 8px;
          color: #687087;
          font-size: 12px;
          font-weight: 600;
          line-height: 1.5;
          text-decoration: none;
          transition: .2s ease;
        }

        .pp-nav a:hover {
          color: var(--pp-primary-dark);
          background: #f2efff;
          transform: translateX(3px);
        }

        .pp-content {
          min-width: 0;
        }

        .pp-intro {
          background: linear-gradient(120deg, #f0edff, #f9f8ff);
          border: 1px solid #e4defe;
          border-radius: 15px;
          padding: 22px 24px;
          margin-bottom: 18px;
          display: flex;
          gap: 15px;
          align-items: flex-start;
        }

        .pp-intro-icon {
          flex-shrink: 0;
          display: grid;
          place-items: center;
          width: 38px;
          height: 38px;
          border-radius: 11px;
          background: #e2dafe;
          color: #6246d5;
          font-size: 20px;
        }

        .pp-intro strong {
          display: block;
          margin-bottom: 5px;
          color: #382b7d;
          font-size: 14px;
        }

        .pp-intro p {
          margin: 0;
          color: #625b83;
          font-size: 13px;
          line-height: 1.75;
        }

        .pp-section {
          scroll-margin-top: 25px;
          background: #fff;
          border: 1px solid var(--pp-border);
          border-radius: 15px;
          padding: 27px 29px;
          margin-bottom: 15px;
          box-shadow: 0 5px 22px rgba(28, 32, 68, .025);
          transition: box-shadow .2s ease, border-color .2s ease;
        }

        .pp-section:hover {
          border-color: #ded7ff;
          box-shadow: 0 8px 28px rgba(65, 49, 130, .06);
        }

        .pp-section-heading {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 17px;
        }

        .pp-section-number {
          display: grid;
          place-items: center;
          flex-shrink: 0;
          width: 35px;
          height: 35px;
          border-radius: 10px;
          background: #f0edff;
          color: #684bdf;
          font-size: 13px;
          font-weight: 900;
        }

        .pp-section h2 {
          margin: 0;
          color: #252b40;
          font-size: 18px;
          font-weight: 800;
          letter-spacing: -.3px;
        }

        .pp-section-body {
          color: #687087;
          font-size: 13.5px;
          line-height: 1.9;
        }

        .pp-section-body p {
          margin: 0 0 13px;
        }

        .pp-section-body p:last-child {
          margin-bottom: 0;
        }

        .pp-section-body strong {
          color: #343b52;
          font-weight: 750;
        }

        .pp-section-body ul {
          margin: 9px 0 16px;
          padding-left: 22px;
        }

        .pp-section-body li {
          padding-left: 5px;
          margin-bottom: 8px;
        }

        .pp-section-body li::marker {
          color: #8065ec;
        }

        .pp-section-body a {
          display: inline-block;
          color: #674ce0;
          font-weight: 700;
          text-decoration: none;
          border-bottom: 1px solid #d5ccff;
          overflow-wrap: anywhere;
        }

        .pp-section-body a:hover {
          color: #4530b6;
          border-color: #674ce0;
        }

        .pp-website-link {
          display: flex;
          align-items: center;
          gap: 13px;
          padding: 17px;
          margin-top: 17px;
          border: 1px solid #e6e0ff;
          border-radius: 12px;
          background: #f8f6ff;
        }

        .pp-link-icon {
          display: grid;
          place-items: center;
          width: 40px;
          height: 40px;
          border-radius: 11px;
          background: #e9e2ff;
          color: #674ce0;
          font-size: 20px;
        }

        .pp-link-label {
          display: block;
          margin-bottom: 4px;
          color: #88819e;
          font-size: 10px;
          font-weight: 800;
          letter-spacing: 1px;
          text-transform: uppercase;
        }

        .pp-website-link a {
          font-size: 13px;
        }

        .pp-footer {
          max-width: 1100px;
          margin: 32px auto 0;
          padding: 0 22px;
        }

        .pp-footer-inner {
          padding: 30px;
          text-align: center;
          border-radius: 17px;
          color: #fff;
          background: linear-gradient(120deg, #17152f, #33236f);
        }

        .pp-footer-logo {
          font-size: 17px;
          font-weight: 900;
          letter-spacing: 3px;
          margin-bottom: 9px;
        }

        .pp-footer-inner p {
          margin: 0;
          color: #c7c2e2;
          font-size: 12px;
          line-height: 1.8;
        }

        .pp-footer-inner a {
          display: inline-block;
          margin-top: 14px;
          color: #c2b3ff;
          font-size: 12px;
          font-weight: 700;
          text-decoration: none;
        }

        .pp-mobile-nav {
          display: none;
        }

        @media (max-width: 850px) {
          .pp-layout {
            grid-template-columns: 1fr;
            gap: 17px;
          }

          .pp-sidebar {
            display: none;
          }

          .pp-mobile-nav {
            display: block;
            overflow-x: auto;
            white-space: nowrap;
            background: #fff;
            border: 1px solid var(--pp-border);
            border-radius: 12px;
            padding: 11px;
            margin-bottom: 16px;
            scrollbar-width: thin;
          }

          .pp-mobile-nav a {
            display: inline-block;
            margin-right: 7px;
            padding: 8px 11px;
            border-radius: 7px;
            background: #f3f1ff;
            color: #5e48bd;
            font-size: 11px;
            font-weight: 700;
            text-decoration: none;
          }
        }

        @media (max-width: 600px) {
          .pp-hero {
            padding: 44px 20px 78px;
          }

          .pp-brand {
            margin-bottom: 30px;
          }

          .pp-hero h1 {
            letter-spacing: -1.3px;
          }

          .pp-hero-description {
            font-size: 14px;
          }

          .pp-layout {
            padding: 0 13px;
            margin-top: -30px;
          }

          .pp-section {
            padding: 21px 18px;
            border-radius: 13px;
          }

          .pp-section h2 {
            font-size: 16px;
          }

          .pp-section-body {
            font-size: 13px;
          }

          .pp-intro {
            padding: 17px;
          }

          .pp-footer {
            padding: 0 13px;
          }

          .pp-footer-inner {
            padding: 25px 18px;
          }
        }

        @media print {
          .pp-sidebar,
          .pp-mobile-nav {
            display: none !important;
          }

          .pp-layout {
            display: block;
            margin: 20px auto;
          }

          .pp-hero {
            padding: 30px;
          }

          .pp-section {
            break-inside: avoid;
            box-shadow: none;
          }
        }
      `}</style>

      <header className="pp-hero">
        <div className="pp-hero-inner">
          <div className="pp-brand">
            <span className="pp-brand-icon">L</span>
            LIONRAMP
          </div>

          <div className="pp-eyebrow">
            <span className="pp-eyebrow-dot" />
            YOUR PRIVACY MATTERS
          </div>

          <h1>
            Privacy <span>Policy.</span>
          </h1>

          <p className="pp-hero-description">
            Transparency matters. Learn how LIONRAMP handles information,
            protects your privacy, and provides a safer experience while
            using our online tools.
          </p>

          <div className="pp-hero-meta">
            <div className="pp-meta-item">
              <span>◷</span>
              Last Updated: {lastUpdated}
            </div>
            <div className="pp-meta-item">
              <span>▤</span>
              12 Policy Sections
            </div>
            <div className="pp-meta-item">
              <span>✓</span>
              Privacy Information
            </div>
          </div>
        </div>
      </header>

      <main className="pp-layout">
        <aside className="pp-sidebar">
          <div className="pp-sidebar-title">On This Page</div>
          <nav className="pp-nav">
            {sections.map((section) => (
              <a key={section.id} href={`#${section.id}`}>
                {section.title}
              </a>
            ))}
          </nav>
        </aside>

        <div className="pp-content">
          <nav className="pp-mobile-nav">
            {sections.map((section) => (
              <a key={section.id} href={`#${section.id}`}>
                {section.title}
              </a>
            ))}
          </nav>

          <div className="pp-intro">
            <div className="pp-intro-icon">ⓘ</div>
            <div>
              <strong>Your privacy is important to us.</strong>
              <p>
                Please read this policy carefully to understand how
                information may be handled when you use LIONRAMP.
              </p>
            </div>
          </div>

          {policySections.map((section, index) => (
            <section
              className="pp-section"
              id={section.id}
              key={section.id}
            >
              <div className="pp-section-heading">
                <div className="pp-section-number">
                  {String(index + 1).padStart(2, "0")}
                </div>
                <h2>{section.title}</h2>
              </div>

              <div className="pp-section-body">
                {section.content}
              </div>
            </section>
          ))}
        </div>
      </main>

      <footer className="pp-footer">
        <div className="pp-footer-inner">
          <div className="pp-footer-logo">LIONRAMP</div>
          <p>
            Simple. Useful. Powerful online tools.
            <br />
            Thank you for trusting LIONRAMP.
          </p>
          <a
            href="https://lionramp.iceiy.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            lionramp.iceiy.com
          </a>
        </div>
      </footer>
    </div>
  );
};

export default PrivacyPolicy;
