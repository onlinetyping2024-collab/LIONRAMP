
import React from "react";

const PrivacyPolicy: React.FC = () => {
  const lastUpdated = "November 10, 2026";

  const sections = [
    {
      id: "introduction",
      number: "01",
      icon: "📋",
      title: "Introduction",
      content: (
        <>
          <p>
            Welcome to <strong>LIONRAMP</strong> (https://lionramp.iceiy.com).
            Your privacy is important to us. This Privacy Policy explains how
            we collect, use, disclose, and protect information when you visit
            our website and use our online tools and services.
          </p>
          <p>
            By accessing or using LIONRAMP, you agree to the practices
            described in this Privacy Policy.
          </p>
        </>
      ),
    },
    {
      id: "information",
      number: "02",
      icon: "🔎",
      title: "Information We Collect",
      content: (
        <>
          <p>
            We may collect information that you voluntarily provide, such as
            information submitted through website contact forms or other
            available communication features, if enabled.
          </p>
          <p>
            We may also automatically collect certain technical information,
            including browser type, device information, IP address, pages
            visited, and usage statistics through cookies and analytics
            services, where enabled.
          </p>
        </>
      ),
    },
    {
      id: "file-processing",
      number: "03",
      icon: "📁",
      title: "File Processing and User Privacy",
      content: (
        <>
          <p>
            LIONRAMP provides online tools for working with PDF documents,
            images, audio, video, and other files. The processing and handling
            of files may vary depending on the specific tool.
          </p>
          <p>
            Users should avoid uploading confidential, sensitive, or personal
            documents unless they understand how the relevant tool processes
            and handles those files.
          </p>
          <p>
            We do not claim that all file processing takes place locally in
            your browser. Please refer to the functionality of each
            individual tool.
          </p>
        </>
      ),
    },
    {
      id: "cookies",
      number: "04",
      icon: "🍪",
      title: "Cookies and Tracking Technologies",
      content: (
        <>
          <p>
            LIONRAMP may use cookies and similar technologies to improve
            website functionality, understand visitor behavior, analyze
            website traffic, and support advertising services.
          </p>
          <p>
            You can manage or disable cookies through your browser settings.
            However, disabling certain cookies may affect some website
            features.
          </p>
        </>
      ),
    },
    {
      id: "advertising",
      number: "05",
      icon: "📢",
      title: "Google AdSense and Third-Party Advertising",
      content: (
        <>
          <p>
            We may use Google AdSense or other third-party advertising
            services to display advertisements on our website.
          </p>
          <p>
            Google and its partners may use cookies, web beacons, or similar
            technologies to serve advertisements based on your visits to this
            website and other websites.
          </p>
          <p>
            These technologies may help advertisers deliver relevant
            advertisements and measure advertising performance.
          </p>
          <p>
            Learn more about how Google uses information from websites that
            use its services:
          </p>
          <a
            href="https://policies.google.com/technologies/partner-sites"
            target="_blank"
            rel="noopener noreferrer"
            className="pp-link"
          >
            Google Partner Sites Policy <span>↗</span>
          </a>
        </>
      ),
    },
    {
      id: "preferences",
      number: "06",
      icon: "⚙️",
      title: "Google Advertising Preferences",
      content: (
        <>
          <p>
            Google provides options that allow users to manage how
            advertisements are personalized.
          </p>
          <p>
            You can manage your Google advertising preferences through:
          </p>
          <a
            href="https://adssettings.google.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="pp-link"
          >
            Google Ads Settings <span>↗</span>
          </a>
        </>
      ),
    },
    {
      id: "third-party",
      number: "07",
      icon: "🔗",
      title: "Third-Party Services",
      content: (
        <>
          <p>
            Our website may use third-party services for analytics,
            advertising, website functionality, or other purposes.
          </p>
          <p>
            These third-party providers may collect information according to
            their own privacy policies. We encourage users to review the
            privacy policies of those services.
          </p>
        </>
      ),
    },
    {
      id: "security",
      number: "08",
      icon: "🛡️",
      title: "Data Security",
      content: (
        <p>
          We take reasonable measures to protect information associated with
          our website. However, no method of electronic transmission or
          storage is completely secure, and we cannot guarantee absolute
          security.
        </p>
      ),
    },
    {
      id: "children",
      number: "09",
      icon: "👨‍👩‍👧",
      title: "Children's Privacy",
      content: (
        <p>
          LIONRAMP is not intended to knowingly collect personal information
          from children under the age of 13. If we become aware that personal
          information has been collected from a child without appropriate
          authorization, we will take reasonable steps to address the
          situation.
        </p>
      ),
    },
    {
      id: "rights",
      number: "10",
      icon: "🔐",
      title: "Your Privacy Rights",
      content: (
        <>
          <p>
            Depending on your location and applicable laws, you may have
            rights to access, correct, or request deletion of personal
            information associated with you.
          </p>
          <p>
            You may use the website address provided below to find information
            about LIONRAMP and available ways to contact the website operator.
          </p>
        </>
      ),
    },
    {
      id: "changes",
      number: "11",
      icon: "📝",
      title: "Changes to This Privacy Policy",
      content: (
        <p>
          We may update this Privacy Policy from time to time. Any changes
          will be published on this page with an updated revision date.
        </p>
      ),
    },
    {
      id: "contact",
      number: "12",
      icon: "🌐",
      title: "Contact & Website",
      content: (
        <>
          <p>
            If you have any questions, concerns, or requests regarding this
            Privacy Policy, please visit our website.
          </p>
          <a
            href="https://lionramp.iceiy.com"
            target="_blank"
            rel="noopener noreferrer"
            className="pp-link"
          >
            https://lionramp.iceiy.com <span>↗</span>
          </a>
        </>
      ),
    },
  ];

  return (
    <div className="min-h-screen bg-[#f6f7fb] text-[#25263a]">

      {/* HERO */}
      <header className="relative overflow-hidden bg-[#111126] text-white">
        <div className="absolute -top-40 -right-20 h-96 w-96 rounded-full bg-violet-600/20 blur-3xl" />
        <div className="absolute -bottom-40 -left-20 h-96 w-96 rounded-full bg-blue-600/20 blur-3xl" />

        <div className="relative mx-auto max-w-7xl px-5 pb-20 pt-12 md:px-8 md:pb-24 md:pt-16">

          <div className="mb-12 flex items-center justify-between">
            <a
              href="https://lionramp.iceiy.com"
              className="flex items-center gap-3 no-underline"
            >
              <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/15 bg-white/10 text-xl">
                🦁
              </div>
              <div>
                <div className="text-lg font-black tracking-wider text-white">
                  LIONRAMP
                </div>
                <div className="text-[10px] tracking-[0.25em] text-gray-400">
                  ONLINE TOOLS
                </div>
              </div>
            </a>

            <div className="hidden rounded-full border border-white/15 bg-white/5 px-4 py-2 text-xs font-medium text-gray-300 sm:block">
              Privacy Center
            </div>
          </div>

          <div className="max-w-3xl">
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-violet-400/20 bg-violet-400/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.2em] text-violet-300">
              <span>✦</span>
              Privacy & Security
            </div>

            <h1 className="mb-6 text-4xl font-black tracking-tight text-white sm:text-5xl md:text-7xl">
              Privacy <span className="text-violet-400">Policy.</span>
            </h1>

            <p className="max-w-2xl text-sm leading-7 text-gray-300 md:text-base">
              Transparency matters. Discover how information may be
              collected, used, and handled when you explore and use
              LIONRAMP online tools.
            </p>

            <div className="mt-9 flex flex-wrap items-center gap-4">
              <div className="flex items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-4 py-3">
                <span className="text-violet-300">◷</span>
                <div>
                  <div className="text-[10px] uppercase tracking-wider text-gray-400">
                    Last updated
                  </div>
                  <div className="text-xs font-semibold text-white">
                    {lastUpdated}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-4 py-3">
                <span className="text-green-400">●</span>
                <div>
                  <div className="text-[10px] uppercase tracking-wider text-gray-400">
                    Document
                  </div>
                  <div className="text-xs font-semibold text-white">
                    12 Policy Sections
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* MAIN CONTENT */}
      <main className="mx-auto max-w-7xl px-4 py-10 md:px-8 md:py-16">

        <div className="mb-10 rounded-2xl border border-violet-100 bg-white p-5 shadow-sm md:p-7">
          <div className="flex items-start gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-violet-50 text-2xl">
              🔒
            </div>
            <div>
              <h2 className="mb-2 text-lg font-bold text-[#17172f]">
                Your Privacy Matters
              </h2>
              <p className="text-sm leading-7 text-gray-500">
                This Privacy Policy describes important information about
                privacy, cookies, advertising, and the use of LIONRAMP online
                tools. Please read it carefully to understand our practices.
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-[260px_minmax(0,1fr)]">

          {/* SIDEBAR */}
          <aside className="lg:sticky lg:top-6">
            <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
              <div className="mb-4 flex items-center justify-between">
                <h2 className="text-sm font-extrabold text-[#17172f]">
                  On This Page
                </h2>
                <span className="rounded-md bg-violet-50 px-2 py-1 text-[10px] font-bold text-violet-600">
                  12 ITEMS
                </span>
              </div>

              <nav className="flex gap-2 overflow-x-auto pb-2 lg:block lg:space-y-1 lg:overflow-visible lg:pb-0">
                {sections.map((section) => (
                  <a
                    key={section.id}
                    href={`#${section.id}`}
                    className="flex shrink-0 items-center gap-3 rounded-lg px-3 py-2.5 text-xs font-medium text-gray-500 transition-all hover:bg-violet-50 hover:text-violet-700 lg:w-full"
                  >
                    <span className="text-[10px] font-bold text-violet-400">
                      {section.number}
                    </span>
                    <span className="whitespace-nowrap lg:whitespace-normal">
                      {section.title}
                    </span>
                  </a>
                ))}
              </nav>

              <div className="mt-5 hidden border-t border-gray-100 pt-5 lg:block">
                <div className="rounded-xl bg-[#17172f] p-4 text-white">
                  <div className="mb-2 text-lg">🦁</div>
                  <p className="mb-2 text-sm font-bold">LIONRAMP</p>
                  <p className="text-xs leading-5 text-gray-400">
                    Simple and useful online tools for your digital tasks.
                  </p>
                  <a
                    href="https://lionramp.iceiy.com"
                    className="mt-3 inline-block text-xs font-bold text-violet-300 hover:text-white"
                  >
                    Visit Website ↗
                  </a>
                </div>
              </div>
            </div>
          </aside>

          {/* POLICY SECTIONS */}
          <div className="min-w-0 space-y-5">
            {sections.map((section) => (
              <section
                key={section.id}
                id={section.id}
                className="scroll-mt-8 rounded-2xl border border-gray-200/80 bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg sm:p-7 md:p-8"
              >
                <div className="mb-5 flex items-start gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-violet-50 to-indigo-50 text-xl">
                    {section.icon}
                  </div>

                  <div className="min-w-0 flex-1">
                    <div className="mb-1 text-[10px] font-extrabold tracking-[0.2em] text-violet-500">
                      SECTION {section.number}
                    </div>
                    <h2 className="text-lg font-extrabold leading-snug text-[#17172f] sm:text-xl">
                      {section.title}
                    </h2>
                  </div>
                </div>

                <div className="policy-premium-content border-t border-gray-100 pt-5 text-sm leading-7 text-gray-600 md:text-[15px]">
                  {section.content}
                </div>
              </section>
            ))}

            {/* BOTTOM FOOTER CARD */}
            <div className="overflow-hidden rounded-2xl bg-[#111126] p-7 text-center text-white md:p-10">
              <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl border border-white/10 bg-white/10 text-3xl">
                🦁
              </div>

              <h2 className="mb-2 text-2xl font-black tracking-wide">
                LIONRAMP
              </h2>

              <p className="mx-auto mb-6 max-w-md text-sm leading-6 text-gray-400">
                Explore useful online tools designed to make your digital
                work easier, faster, and more convenient.
              </p>

              <a
                href="https://lionramp.iceiy.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-xl bg-violet-600 px-6 py-3 text-sm font-bold text-white transition-all hover:bg-violet-500 hover:shadow-lg hover:shadow-violet-500/20"
              >
                Explore LIONRAMP <span>↗</span>
              </a>

              <div className="mt-8 border-t border-white/10 pt-5">
                <p className="text-xs text-gray-500">
                  © {new Date().getFullYear()} LIONRAMP. All Rights Reserved.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* CUSTOM STYLES */}
      <style>{`
        html {
          scroll-behavior: smooth;
        }

        .policy-premium-content p {
          margin-bottom: 14px;
        }

        .policy-premium-content p:last-child {
          margin-bottom: 0;
        }

        .policy-premium-content strong {
          color: #17172f;
          font-weight: 800;
        }

        .policy-premium-content a:not(.pp-link) {
          color: #7046d3;
          font-weight: 600;
          overflow-wrap: anywhere;
          text-decoration: none;
        }

        .policy-premium-content a:not(.pp-link):hover {
          text-decoration: underline;
        }

        .pp-link {
          display: inline-flex;
          align-items: center;
          gap: 12px;
          margin-top: 7px;
          border: 1px solid #e9e2ff;
          border-radius: 10px;
          background: #f7f4ff;
          padding: 11px 15px;
          color: #6941c6;
          font-size: 13px;
          font-weight: 800;
          text-decoration: none;
          transition: all 0.2s ease;
          overflow-wrap: anywhere;
        }

        .pp-link:hover {
          border-color: #c9b8ff;
          background: #eee8ff;
          transform: translateY(-2px);
        }

        @media (max-width: 640px) {
          .policy-premium-content {
            font-size: 13px;
            line-height: 1.9;
          }
        }
      `}</style>
    </div>
  );
};

export default PrivacyPolicy;
