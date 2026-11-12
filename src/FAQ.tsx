
import React from 'react'

const FAQ: React.FC = () => {
  const questions = [
    {
      q: 'What is LIONRAMP?',
      a: 'LIONRAMP is an online platform that provides useful tools for working with images, PDF documents, videos, audio files, ZIP archives and common measurement units.',
    },
    {
      q: 'Are LIONRAMP tools free to use?',
      a: 'LIONRAMP provides its available tools free of charge. Some tools may have technical limitations depending on the file type, browser or device.',
    },
    {
      q: 'Do I need to create an account?',
      a: 'You do not need to create an account to use the tools currently available on LIONRAMP.',
    },
    {
      q: 'Can I use LIONRAMP on my mobile phone?',
      a: 'Yes. LIONRAMP is designed to work on supported desktop, laptop, tablet and mobile browsers.',
    },
    {
      q: 'Which file formats are supported?',
      a: 'Supported formats depend on the individual tool. Please check the relevant tool page for available file formats and options.',
    },
    {
      q: 'Why is my file not converting?',
      a: 'A conversion may fail because of an unsupported format, damaged file, large file size, insufficient device memory or browser limitations. Try another supported file or browser.',
    },
    {
      q: 'Is there a file size limit?',
      a: 'File size limits can vary depending on the tool, browser and available device resources. Check the individual tool for its current limitations.',
    },
    {
      q: 'Are my uploaded files stored?',
      a: 'File handling depends on the individual tool and how it processes files. Please read our Privacy Policy before uploading files containing personal or confidential information.',
    },
    {
      q: 'Can I use LIONRAMP without installing software?',
      a: 'Most LIONRAMP tools are accessible directly through a web browser without installing a separate application.',
    },
    {
      q: 'What should I do if a tool is not working?',
      a: 'Refresh the page, check your internet connection, use a supported browser and try again. If the issue continues, use the available contact information on our Contact page.',
    },
  ]

  return (
    <section style={{
      maxWidth: '900px',
      margin: '0 auto',
      padding: '50px 20px 80px',
      color: 'var(--text-color, inherit)',
    }}>
      <div style={{ textAlign: 'center', marginBottom: '40px' }}>
        <p style={{ fontWeight: 700, letterSpacing: '2px' }}>
          HELP CENTER
        </p>
        <h1>Frequently Asked Questions</h1>
        <p>
          Find answers to common questions about LIONRAMP and its online tools.
        </p>
      </div>

      <div style={{ display: 'grid', gap: '16px' }}>
        {questions.map((item, index) => (
          <details
            key={index}
            style={{
              padding: '20px',
              border: '1px solid #88888840',
              borderRadius: '12px',
              background: 'var(--card-bg, transparent)',
            }}
          >
            <summary style={{
              cursor: 'pointer',
              fontWeight: 700,
              lineHeight: 1.6,
            }}>
              {item.q}
            </summary>

            <p style={{
              lineHeight: 1.8,
              marginTop: '14px',
              opacity: 0.85,
            }}>
              {item.a}
            </p>
          </details>
        ))}
      </div>

      <div style={{ textAlign: 'center', marginTop: '45px' }}>
        <h2>Still Have Questions?</h2>
        <p>Visit our Contact page for available contact information.</p>
        <a href="/?page=contact">Contact LIONRAMP →</a>
      </div>
    </section>
  )
}

export default FAQ
