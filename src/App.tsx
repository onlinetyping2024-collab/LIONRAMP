
import { useEffect, useMemo, useState } from 'react'
import type { ChangeEvent } from 'react'

import './App.css'
import lionLogo from './assets/lionramp-logo.png'
import CookieConsent from './CookieConsent'

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
import AboutUs from './AboutUs'
import TermsAndConditions from './TermsAndConditions'
import ContactUs from './ContactUs'
import FAQ from './FAQ'
import Disclaimer from './Disclaimer'

type Tool = {
  name: string
  category: string
  icon: string
  description: string
}

type ToolInformation = {
  overview: string
  features: string[]
  steps: string[]
  formats: string
  limitations: string[]
  keywords: string
}

const SITE_URL = 'https://lionramp.pages.dev'

const tools: Tool[] = [
  { name: 'PDF to Word', category: 'PDF', icon: '📄', description: 'Convert PDF files into editable Word documents.' },
  { name: 'Word to PDF', category: 'PDF', icon: '📝', description: 'Turn Word documents into PDF files.' },
  { name: 'Merge PDF', category: 'PDF', icon: '📚', description: 'Combine multiple PDF files into one document.' },
  { name: 'Split PDF', category: 'PDF', icon: '✂️', description: 'Extract selected pages from a PDF document.' },
  { name: 'Text to PDF', category: 'PDF', icon: '📰', description: 'Turn your written text into a downloadable PDF.' },
  { name: 'Image Converter', category: 'Image', icon: '🖼️', description: 'Convert images between PNG, JPG and WEBP formats.' },
  { name: 'Image Compressor', category: 'Image', icon: '🗜️', description: 'Reduce image file size while maintaining quality.' },
  { name: 'Image Resizer', category: 'Image', icon: '📐', description: 'Resize images to your preferred dimensions.' },
  { name: 'Video Converter', category: 'Video', icon: '🎬', description: 'Convert video files between supported formats.' },
  { name: 'Audio Converter', category: 'Audio', icon: '🎵', description: 'Convert audio files into different formats.' },
  { name: 'ZIP Extractor', category: 'Utility', icon: '📦', description: 'Open ZIP archives and extract their contents.' },
  { name: 'Unit Converter', category: 'Utility', icon: '🔄', description: 'Convert common measurements and units.' },
]

const toolInformation: Record<string, ToolInformation> = {
  'PDF to Word': {
    overview: 'Convert PDF documents into editable Microsoft Word DOCX files using LIONRAMP PDF to Word Converter. The tool extracts selectable text from PDF pages and places it into a new Word document, making it easier to reuse or edit written content.',
    features: [
      'Extract selectable text from PDF documents.',
      'Create a downloadable DOCX Word document.',
      'Process PDF pages and display conversion progress.',
      'Add page headings to help identify the original PDF pages.',
      'Process documents directly in your browser.',
    ],
    steps: [
      'Select a PDF document from your device.',
      'Start the PDF to Word conversion.',
      'Wait while the tool extracts text from the document pages.',
      'Download the generated Word DOCX file.',
    ],
    formats: 'Input: PDF. Output: DOCX (Microsoft Word).',
    limitations: [
      'Only selectable text can be extracted. Scanned or image-only PDFs are not supported because OCR is not included.',
      'Original formatting, images, tables, columns and complex layouts are not preserved.',
      'Text positioning and spacing may differ from the original PDF.',
      'Password-protected, damaged or unsupported PDF files may fail to convert.',
    ],
    keywords: 'PDF to Word, PDF to DOCX, convert PDF online, PDF text extraction, free PDF converter',
  },

  'Word to PDF': {
    overview: 'Convert Microsoft Word DOCX documents into downloadable PDF files with LIONRAMP Word to PDF Converter. The tool extracts readable text from a DOCX document and creates a clean A4 PDF document.',
    features: [
      'Upload a DOCX Word document.',
      'Extract readable text from the document.',
      'Generate an A4 PDF document.',
      'Automatically create additional pages when required.',
      'Download the converted PDF file.',
      'Process documents directly in your browser.',
    ],
    steps: [
      'Choose a DOCX Word document from your device.',
      'Check that the selected file is correct.',
      'Click the Convert to PDF button.',
      'Wait for the conversion to finish.',
      'Download your generated PDF document.',
    ],
    formats: 'Input: DOCX. Output: PDF (A4). Older DOC files are not supported.',
    limitations: [
      'Only DOCX files are accepted.',
      'Original Word formatting, images, tables and advanced layouts are not preserved.',
      'The converter extracts raw text and creates a basic text-based PDF.',
      'The generated PDF uses the standard Helvetica font.',
      'Sinhala and other Unicode scripts may not display correctly because a Unicode font is not embedded.',
    ],
    keywords: 'Word to PDF, DOCX to PDF, convert Word document online, free Word PDF converter',
  },

  'Merge PDF': {
    overview: 'Combine multiple PDF documents into one convenient PDF file using LIONRAMP Merge PDF. Select multiple PDF files, arrange them in your preferred order and create a single combined document.',
    features: [
      'Select two or more PDF documents.',
      'Combine pages from multiple PDF files.',
      'Change the order of documents before merging.',
      'Remove unwanted files from the selection.',
      'Clear the file list and start again.',
      'Download the merged PDF document.',
    ],
    steps: [
      'Select at least two PDF files from your device.',
      'Arrange the files in the order you want them to appear.',
      'Remove any unwanted documents if necessary.',
      'Click the merge button.',
      'Download the combined PDF file.',
    ],
    formats: 'Input: Multiple PDF files. Output: One combined PDF file.',
    limitations: [
      'At least two PDF files are required.',
      'The order of documents determines the order of pages in the merged PDF.',
      'Password-protected, damaged or invalid PDF documents may not merge successfully.',
      'Large PDF files may require additional browser memory and processing time.',
    ],
    keywords: 'Merge PDF, combine PDF files, join PDF documents, merge PDF online, free PDF merger',
  },

  'Split PDF': {
    overview: 'Extract specific pages from a PDF document using LIONRAMP Split PDF. Enter individual page numbers or page ranges to create a new PDF containing only the pages you need.',
    features: [
      'Upload a PDF document.',
      'View the total number of pages.',
      'Select individual pages.',
      'Select page ranges such as 1-5 or 3-8.',
      'Combine selected pages into one new PDF.',
      'Download the extracted PDF document.',
    ],
    steps: [
      'Upload a PDF document.',
      'Enter the page numbers or ranges you want to extract.',
      'Use commas to separate selections, for example: 1, 3, 5-8.',
      'Start the extraction process.',
      'Download the new PDF containing your selected pages.',
    ],
    formats: 'Input: PDF. Output: One PDF containing the selected pages.',
    limitations: [
      'The tool creates one new PDF containing all selected pages; it does not create a separate PDF for every page.',
      'Page numbers must be within the original document page range.',
      'Selected pages are arranged in their original document order.',
      'Password-protected, damaged or invalid PDF documents may fail.',
      'Large PDF files may require additional browser memory.',
    ],
    keywords: 'Split PDF, extract PDF pages, select PDF pages, PDF page extractor, free PDF splitter',
  },

  'Text to PDF': {
    overview: 'Create a downloadable PDF document from your own written text with LIONRAMP Text to PDF Converter. Add a document title, type or paste your content, and generate a clean A4 PDF file.',
    features: [
      'Enter a custom document title.',
      'Type or paste text into the editor.',
      'Automatically count words and characters.',
      'Generate A4 PDF documents.',
      'Automatically add new pages when the content exceeds the page limit.',
      'Download the generated PDF using a filename based on the document title.',
    ],
    steps: [
      'Enter your preferred document title.',
      'Type or paste your text into the content area.',
      'Review the word and character counts.',
      'Click Create & Download PDF.',
      'Your generated PDF will be downloaded automatically.',
    ],
    formats: 'Input: Text entered in the editor. Output: A4 PDF.',
    limitations: [
      'The current version supports basic Latin text.',
      'Sinhala and other Unicode scripts require an embedded Unicode font for correct PDF display.',
      'The document uses standard Helvetica typography.',
      'Advanced formatting, images and tables are not supported in this basic text editor.',
    ],
    keywords: 'Text to PDF, create PDF from text, online PDF creator, text document to PDF, free PDF generator',
  },

  'Image Converter': {
    overview: 'Convert images between popular image formats using LIONRAMP Image Converter. Choose an image, select your preferred output format and download the converted file without using a separate desktop application.',
    features: [
      'Convert images to PNG format.',
      'Convert images to JPEG format.',
      'Convert images to WebP format.',
      'Preview the selected image.',
      'Adjust output quality for JPEG and WebP.',
      'Download the converted image.',
      'Maintain the original image dimensions.',
    ],
    steps: [
      'Select or upload an image from your device.',
      'Choose PNG, JPEG or WebP as the output format.',
      'Adjust the quality setting when available.',
      'Start the conversion.',
      'Download your converted image.',
    ],
    formats: 'Input: Browser-supported image formats. Output: PNG, JPEG and WebP.',
    limitations: [
      'Image conversion depends on the image formats supported by your browser.',
      'The output keeps the original image dimensions; this tool does not resize images.',
      'The quality setting is available for JPEG and WebP, not PNG.',
      'Transparency may not be retained when converting an image to JPEG.',
      'Very large images may require additional browser memory.',
    ],
    keywords: 'Image Converter, PNG to JPG, JPG to PNG, WebP converter, convert images online, free image converter',
  },

  'Image Compressor': {
    overview: 'Reduce the file size of images with LIONRAMP Image Compressor. Adjust the compression quality and export images in JPEG, PNG or WebP formats to help manage image file sizes.',
    features: [
      'Compress supported image files in your browser.',
      'Choose JPEG, PNG or WebP as the output format.',
      'Adjust image quality from 10% to 100%.',
      'View original and compressed file sizes.',
      'See the estimated file size reduction.',
      'Maintain the original image dimensions.',
      'Download the compressed image.',
    ],
    steps: [
      'Select an image from your device.',
      'Choose the desired output format.',
      'Adjust the compression quality.',
      'Review the original and compressed file sizes.',
      'Download your compressed image.',
    ],
    formats: 'Input: Supported raster image files. SVG is not supported. Output: JPEG, PNG and WebP.',
    limitations: [
      'SVG files are not supported.',
      'The tool preserves the original image dimensions and does not resize images.',
      'PNG compression may not significantly reduce file size because PNG is a lossless format.',
      'Compression results depend on the image content, output format and selected quality.',
      'Very large images may require additional browser memory.',
    ],
    keywords: 'Image Compressor, compress images online, reduce image size, JPG compressor, PNG compressor, WebP compressor',
  },

  'Image Resizer': {
    overview: 'Change image dimensions with LIONRAMP Image Resizer. Enter your preferred width and height, keep the original aspect ratio when needed, and export the resized image in a popular image format.',
    features: [
      'Upload an image and view its original dimensions.',
      'Set custom output width and height.',
      'Lock the aspect ratio to maintain image proportions.',
      'Choose PNG, JPEG or WebP output.',
      'Preview the selected image.',
      'Download the resized image.',
      'Support for dimensions up to 12000 × 12000 pixels.',
    ],
    steps: [
      'Select an image from your device.',
      'Enter your preferred width and height.',
      'Keep the aspect ratio locked or unlock it for custom proportions.',
      'Choose PNG, JPEG or WebP.',
      'Create and download the resized image.',
    ],
    formats: 'Input: Supported raster image formats. SVG is not supported. Output: PNG, JPEG and WebP.',
    limitations: [
      'SVG and non-image files are not supported.',
      'The maximum permitted width and height are 12000 pixels each.',
      'JPEG output uses a white background and does not preserve transparency.',
      'Output image quality uses a fixed browser Canvas setting.',
      'Very large dimensions may require significant browser memory.',
    ],
    keywords: 'Image Resizer, resize image online, change image dimensions, photo resizer, PNG resizer, JPG resizer',
  },

  'Video Converter': {
    overview: 'Convert video files into different formats using LIONRAMP Video Converter. The tool uses FFmpeg technology in your browser to process video files and create downloadable output files.',
    features: [
      'Convert videos to MP4 format.',
      'Convert videos to WebM format.',
      'Convert videos to AVI format.',
      'Convert videos to MOV format.',
      'Extract audio from video and save it as MP3.',
      'View conversion progress.',
      'Automatically download the converted file.',
    ],
    steps: [
      'Select a video file from your device.',
      'Choose your preferred output format.',
      'Click Convert Video.',
      'Wait while FFmpeg processes your file.',
      'Download the converted video or extracted MP3 audio.',
    ],
    formats: 'Input: Browser-selected video files. Output: MP4, WebM, AVI, MOV and MP3 audio.',
    limitations: [
      'Conversion depends on the available FFmpeg codecs and supported input formats.',
      'Some video or audio codecs may not be supported.',
      'Large video files can consume significant browser memory and processing power.',
      'Conversion time depends on the video size, codec and device performance.',
      'MP3 output extracts audio only; it does not include video.',
    ],
    keywords: 'Video Converter, convert video online, MP4 converter, WebM converter, AVI converter, MOV converter, video to MP3',
  },

  'Audio Converter': {
    overview: 'Convert audio files into popular audio formats using LIONRAMP Audio Converter. Select an audio file, choose an output format and create a downloadable converted audio file directly in your browser.',
    features: [
      'Convert audio to MP3.',
      'Convert audio to WAV.',
      'Convert audio to OGG.',
      'Convert audio to FLAC.',
      'Convert audio to AAC.',
      'View conversion progress.',
      'Download the converted audio file.',
    ],
    steps: [
      'Select an audio file from your device.',
      'Choose MP3, WAV, OGG, FLAC or AAC.',
      'Start the conversion.',
      'Wait for the browser-based FFmpeg process to finish.',
      'Download your converted audio file.',
    ],
    formats: 'Input: Browser-selected audio files. Output: MP3, WAV, OGG, FLAC and AAC.',
    limitations: [
      'Conversion depends on the available FFmpeg codecs.',
      'Some input audio formats or codecs may not be supported.',
      'Large audio files may take longer to process and require more browser memory.',
      'Output quality and file size depend on the selected format and encoding settings.',
      'Conversion errors may occur if the input file is damaged or unsupported.',
    ],
    keywords: 'Audio Converter, convert audio online, MP3 converter, WAV converter, OGG converter, FLAC converter, AAC converter',
  },

  'ZIP Extractor': {
    overview: 'Open ZIP archives and access their contents with LIONRAMP ZIP Extractor. View the files and folders inside an archive, download individual files or create a new ZIP containing all extracted files.',
    features: [
      'Open ZIP archive files.',
      'Display files and folders inside the archive.',
      'View file paths and archive contents.',
      'Download individual files.',
      'Extract all files into a new ZIP archive.',
      'Preserve the folder structure when creating the extracted ZIP.',
      'Display the number of items found.',
    ],
    steps: [
      'Select a ZIP archive from your device.',
      'Wait while the archive contents are loaded.',
      'Review the files and folders displayed.',
      'Download an individual file or select Extract All Files.',
      'If you select Extract All, download the new ZIP archive and open it using your device archive manager.',
    ],
    formats: 'Input: ZIP archives. Output: Individual extracted files or a new ZIP archive.',
    limitations: [
      'Password-protected and some advanced archive formats are not supported.',
      'Extract All creates a new ZIP archive rather than directly saving every file into a device folder.',
      'Large archives may require significant browser memory.',
      'Damaged or invalid ZIP files may fail to open or extract.',
    ],
    keywords: 'ZIP Extractor, extract ZIP online, open ZIP files, unzip files, ZIP archive extractor, download ZIP contents',
  },

  'Unit Converter': {
    overview: 'Convert everyday measurements quickly using LIONRAMP Unit Converter. Select a measurement category, enter a value and choose the units you want to convert between. The result is calculated automatically.',
    features: [
      'Convert length measurements.',
      'Convert weight and mass measurements.',
      'Convert temperature between Celsius, Fahrenheit and Kelvin.',
      'Convert area measurements.',
      'Convert volume measurements.',
      'Convert speed measurements.',
      'Convert time units.',
      'Convert digital storage units.',
      'Swap the selected units.',
      'Copy the conversion result.',
    ],
    steps: [
      'Choose a measurement category.',
      'Enter the value you want to convert.',
      'Select the original unit.',
      'Select the target unit.',
      'View the automatically calculated result.',
      'Use the swap or copy options when needed.',
    ],
    formats: 'Categories: Length, Weight, Temperature, Area, Volume, Speed, Time and Data Storage.',
    limitations: [
      'The converter supports predefined units within its available categories.',
      'Data storage conversions use a 1024-based calculation system.',
      'Results are based on fixed conversion factors.',
      'This tool does not provide live currency or exchange-rate conversion.',
    ],
    keywords: 'Unit Converter, online measurement converter, length converter, weight converter, temperature converter, area converter, volume converter, speed converter, data storage converter',
  },
}

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
  Object.entries(toolRoutes).map(([name, slug]) => [slug, name])
)

const pageTitles: Record<string, string> = {
  about: 'About LIONRAMP',
  terms: 'Terms & Conditions',
  contact: 'Contact LIONRAMP',
  faq: 'Frequently Asked Questions',
  disclaimer: 'Disclaimer',
  'privacy-policy': 'Privacy Policy',
}

const pageDescriptions: Record<string, string> = {
  about: 'Learn more about LIONRAMP, our free online tools and our goal of making everyday digital tasks easier.',
  terms: 'Read the terms and conditions for using LIONRAMP online tools and services.',
  contact: 'Contact LIONRAMP for questions, feedback, suggestions or support.',
  faq: 'Find answers to frequently asked questions about LIONRAMP tools and services.',
  disclaimer: 'Read the LIONRAMP disclaimer and important information about using our online tools.',
  'privacy-policy': 'Learn how LIONRAMP handles privacy, browser-based processing and website information.',
}

function getCurrentRoute() {
  const pathname = window.location.pathname.replace(/\/+$/, '') || '/'
  const params = new URLSearchParams(window.location.search)

  const toolMatch = pathname.match(/^\/tools\/([^/]+)$/)

  if (toolMatch) {
    return {
      tool: routeTools[toolMatch[1]] || '',
      page: '',
    }
  }

  const pageSlug = pathname.replace(/^\//, '')

  if (pageSlug && pageTitles[pageSlug]) {
    return {
      tool: '',
      page: pageSlug,
    }
  }

  const oldTool = params.get('tool')
  const oldPage = params.get('page')

  return {
    tool: oldTool ? routeTools[oldTool] || '' : '',
    page: oldPage && pageTitles[oldPage] ? oldPage : '',
  }
}

function ToolDetails({ toolName }: { toolName: string }) {
  const info = toolInformation[toolName]

  if (!info) return null

  return (
    <section className="tool-details">
      <div className="tool-details-header">
        <span className="section-label">LIONRAMP TOOL GUIDE</span>
        <h2>About {toolName}</h2>
        <p>{info.overview}</p>
      </div>

      <div className="tool-details-section">
        <h3>Key Features</h3>
        <ul>
          {info.features.map((feature, index) => (
            <li key={index}>{feature}</li>
          ))}
        </ul>
      </div>

      <div className="tool-details-section">
        <h3>How to Use {toolName}</h3>
        <ol>
          {info.steps.map((step, index) => (
            <li key={index}>{step}</li>
          ))}
        </ol>
      </div>

      <div className="tool-details-section">
        <h3>Supported Formats and Options</h3>
        <p>{info.formats}</p>
      </div>

      <div className="tool-details-section tool-details-limitations">
        <h3>Important Limitations</h3>
        <ul>
          {info.limitations.map((limitation, index) => (
            <li key={index}>{limitation}</li>
          ))}
        </ul>
      </div>

      <div className="tool-details-section">
        <h3>Privacy and Processing</h3>
        <p>
          This tool processes files in your browser using its implemented
          browser-based libraries and technologies. Processing may use your
          device memory and processing power. Your browser and device
          capabilities may affect performance and supported file types.
        </p>
      </div>

      <div className="tool-details-keywords">
        <strong>Related topics:</strong>
        <p>{info.keywords}</p>
      </div>
    </section>
  )
}

function setMetaTag(
  attribute: 'name' | 'property',
  key: string,
  content: string
) {
  let element = document.querySelector(
    `meta[${attribute}="${key}"]`
  ) as HTMLMetaElement | null

  if (!element) {
    element = document.createElement('meta')
    element.setAttribute(attribute, key)
    document.head.appendChild(element)
  }

  element.content = content
}

function App() {
  const [search, setSearch] = useState('')
  const [activeCategory, setActiveCategory] = useState('All Tools')
  const [searchFocused, setSearchFocused] = useState(false)

  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem('lionramp-theme') === 'dark'
  })

  const currentRoute = useMemo(() => getCurrentRoute(), [])

  const activeTool = currentRoute.tool
  const activePage = currentRoute.page

  useEffect(() => {
    localStorage.setItem('lionramp-theme', darkMode ? 'dark' : 'light')

    document.documentElement.setAttribute(
      'data-theme',
      darkMode ? 'dark' : 'light'
    )
  }, [darkMode])

  useEffect(() => {
    let title = 'LIONRAMP | Powerful Tools. Simple Solutions.'

    let description =
      'Explore free online tools from LIONRAMP. Convert, compress and manage PDF, image, video, audio and other files easily.'

    let canonicalUrl = `${SITE_URL}/`

    if (activePage) {
      title = `${pageTitles[activePage]} | LIONRAMP`
      description = pageDescriptions[activePage] || description
      canonicalUrl = `${SITE_URL}/${activePage}`
    } else if (activeTool) {
      title = `${activeTool} | LIONRAMP`

      const info = toolInformation[activeTool]

      if (info) {
        description = info.overview
      }

      const slug = toolRoutes[activeTool]

      if (slug) {
        canonicalUrl = `${SITE_URL}/tools/${slug}`
      }
    }

    document.title = title

    setMetaTag('name', 'description', description)

    let canonical = document.querySelector(
      'link[rel="canonical"]'
    ) as HTMLLinkElement | null

    if (!canonical) {
      canonical = document.createElement('link')
      canonical.rel = 'canonical'
      document.head.appendChild(canonical)
    }

    canonical.href = canonicalUrl

    setMetaTag('property', 'og:type', 'website')
    setMetaTag('property', 'og:site_name', 'LIONRAMP')
    setMetaTag('property', 'og:title', title)
    setMetaTag('property', 'og:description', description)
    setMetaTag('property', 'og:url', canonicalUrl)

    setMetaTag('name', 'twitter:card', 'summary')
    setMetaTag('name', 'twitter:title', title)
    setMetaTag('name', 'twitter:description', description)
  }, [activePage, activeTool])

  const filteredTools = useMemo(() => {
    return tools.filter((tool) => {
      const matchesSearch =
        tool.name.toLowerCase().includes(search.toLowerCase()) ||
        tool.description.toLowerCase().includes(search.toLowerCase())

      const matchesCategory =
        activeCategory === 'All Tools' ||
        tool.category === activeCategory

      return matchesSearch && matchesCategory
    })
  }, [search, activeCategory])

  const openTool = (toolName: string) => {
    const route = toolRoutes[toolName]

    if (!route) {
      alert(`${toolName} is currently unavailable.`)
      return
    }

    window.open(
      `${window.location.origin}/tools/${route}`,
      '_blank',
      'noopener,noreferrer'
    )
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

  const renderActivePage = () => {
    switch (activePage) {
      case 'about': return <AboutUs />
      case 'terms': return <TermsAndConditions />
      case 'contact': return <ContactUs />
      case 'faq': return <FAQ />
      case 'disclaimer': return <Disclaimer />
      case 'privacy-policy': return <PrivacyPolicy />
      default: return null
    }
  }

  const footerLinks = (
    <div className="footer-page-links">
      <a href="/">Home</a>
      <a href="/about">About Us</a>
      <a href="/faq">FAQ</a>
      <a href="/contact">Contact Us</a>
      <a href="/privacy-policy">Privacy Policy</a>
      <a href="/terms">Terms & Conditions</a>
      <a href="/disclaimer">Disclaimer</a>
    </div>
  )

  const header = (
    <header className="site-header">
      <div className="header-content">
        <a href="/" className="brand">
          <img src={lionLogo} alt="LIONRAMP Logo" className="brand-logo" />
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
  )

  const footer = (
    <footer className="site-footer">
      <div className="footer-content">
        <div className="footer-brand">
          <img src={lionLogo} alt="LIONRAMP Logo" />
          <div>
            <h3>LIONRAMP</h3>
            <p>Powerful Tools. Simple Solutions.</p>
          </div>
        </div>

        <div className="footer-bottom">
          <p>© {new Date().getFullYear()} LIONRAMP. All rights reserved.</p>
          {footerLinks}
        </div>
      </div>
    </footer>
  )

  if (activeTool) {
    return (
      <div className={`app ${darkMode ? 'dark-mode' : 'light-mode'}`}>
        {header}

        <main className="tool-page">
          <button
            className="back-button"
            onClick={() => {
              window.location.href = '/'
            }}
          >
            ← Back to Home
          </button>

          <div className="active-tool-container">
            {renderActiveTool()}
          </div>

          <ToolDetails toolName={activeTool} />
        </main>

        {footer}
        <CookieConsent />
      </div>
    )
  }

  if (activePage) {
    return (
      <div className={`app ${darkMode ? 'dark-mode' : 'light-mode'}`}>
        {header}

        <main>
          <div className="info-back-wrap">
            <a href="/" className="back-button info-back-button">
              ← Back to Home
            </a>
          </div>

          {renderActivePage()}
        </main>

        {footer}
        <CookieConsent />
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
            <a href="/faq">FAQ</a>
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

          <div
            className={`search-container ${
              searchFocused ? 'search-focused' : ''
            }`}
          >
            <span className="search-icon" aria-hidden="true">
              🔍
            </span>

            <input
              type="search"
              placeholder="Search for a tool..."
              value={search}
              onFocus={() => setSearchFocused(true)}
              onBlur={() => setSearchFocused(false)}
              onChange={(event: ChangeEvent<HTMLInputElement>) =>
                setSearch(event.target.value)
              }
              aria-label="Search for a tool"
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

            <a href="/about" className="info-action-link">
              Learn More About Us →
            </a>
          </div>
        </section>
      </main>

      {footer}
      <CookieConsent />
    </div>
  )
}

export default App
