import { Head, Link, usePage } from '@inertiajs/react';
import { useEffect, useState } from 'react';

interface Props {
  children: React.ReactNode;
  title?: string;
  meta?: string;
  ftImg?: string;
  h1heading?: string;
}

export default function GuestLayout({ children, title, meta, ftImg, h1heading }: Props) {
  const { app, auth } = usePage().props as any;
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div className="font-sans text-[#0b0b0b] antialiased bg-[#f5f5f5] min-h-screen flex flex-col">
      <Head>
        <title>{title ? `${title} | ${app?.name}` : app?.name || 'Stress-free Assignment Writing Service'}</title>
        <meta name="description" content={meta ?? 'A team of professional assignment writers to guarantee a stress-free assignment writing help with quality, original, plagiarism-free assignment papers. For all your "write my assignment for me" requests.'} />
        <meta name="keywords" content="write my assignment for me, assignment writer, plagiarism-free essay paper, professional writer, online essay writer, essay writing service, write my essay" />
        <meta name="csrf-token" content={app?.csrf_token} />
        <meta name="google-site-verification" content={app?.google_site_verification} />
        <meta property="og:title" content={title ? `${title} | ${app?.name}` : app?.name || 'Professional Essay Writing Service'} />
        <meta property="og:description" content={meta ?? 'Guaranteed stress-free assignment writing help with quality, original, plagiarism-free assignment papers. For all your "write my assignment for me" requests.'} />
        <meta property="og:image" content={ftImg ?? '/assets/assignment-papers-logo-white.png'} />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap" rel="stylesheet" />
        {/* @vite(['resources/css/app.css', 'resources/js/app.js']) handled by Vite plugin */}
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'Essay Writing Service',
          name: app?.name,
          headline: h1heading ?? 'Stress-free Assignment writing help | Top grades Online assignment writers in academic writing',
          description: meta ?? 'Guaranteed stress-free assignment writing help with quality, original, plagiarism-free assignment papers. For all your "write my assignment for me" requests.',
          logo: '/assets/assignment-papers-logo-white.png',
        }) }} />
      </Head>
      {/* Navigation/Header */}
      <header className={`fixed w-full z-10 md:leading-[26px] top-0 transition-colors duration-300 h-20 flex justify-center items-center ${scrolled ? 'bg-white shadow-lg' : ''}`}
        style={{ WebkitBackdropFilter: 'blur(2px)', backdropFilter: 'blur(2px)' }}>
        <nav className="w-full flex items-center h-16">
          <div className="w-full flex items-center justify-between px-4 max-w-7xl mx-auto">
            <div className="flex items-center justify-start">
              <Link href="/">
                {/* Replace with your logo component if available */}
                <span className="text-2xl font-bold font-serif tracking-tight">Academic<span className="text-orange-500">Pro</span></span>
              </Link>
              <a href="tel:+254720449012" className="hidden md:flex items-center text-sm ml-2 font-normal border-l-2 border-gray-300 whitespace-nowrap cursor-pointer" aria-label="Call Researchers at +254 720 449 012">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 mx-2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 1.5H8.25A2.25 2.25 0 0 0 6 3.75v16.5a2.25 2.25 0 0 0 2.25 2.25h7.5A2.25 2.25 0 0 0 18 20.25V3.75a2.25 2.25 0 0 0-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-3 18.75h3" />
                </svg>
                <span>+254 (720) 449-012</span>
              </a>
            </div>
            {/* Desktop Nav Links */}
            <div className="hidden md:flex items-center gap-x-2">
              <Link href="/services" className="text-gray-800 hover:text-orange-500 px-3 py-2 rounded transition-colors">Services</Link>
              <Link href="/pricing" className="text-gray-800 hover:text-orange-500 px-3 py-2 rounded transition-colors">Pricing</Link>
              <Link href="/samples" className="text-gray-800 hover:text-orange-500 px-3 py-2 rounded transition-colors">Samples</Link>
              <Link href="/about" className="text-gray-800 hover:text-orange-500 px-3 py-2 rounded transition-colors">About Us</Link>
              <Link href="/blog" className="text-gray-800 hover:text-orange-500 px-3 py-2 rounded transition-colors">Blog</Link>
              <Link href="/order-new" className="text-gray-800 hover:text-orange-500 px-3 py-2 rounded transition-colors">Place Order</Link>
              {auth?.user ? (
                <Link href="/dashboard" className="ml-2 bg-orange-600 hover:bg-orange-700 text-white px-4 py-2 rounded transition-colors">Dashboard</Link>
              ) : (
                <>
                  <Link href="/login" className="ml-2 bg-white border border-orange-600 text-orange-600 hover:bg-orange-50 px-4 py-2 rounded transition-colors">Login</Link>
                  <Link href="/order-new" className="ml-2 bg-orange-600 hover:bg-orange-700 text-white px-4 py-2 rounded transition-colors">Order Now</Link>
                </>
              )}
            </div>
            {/* Mobile Hamburger */}
            <div className="md:hidden">
              {/* Implement mobile menu toggle logic here if needed */}
              <button className="focus:outline-none">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            </div>
          </div>
        </nav>
      </header>
      {/* Main Content */}
      <div className="w-full pt-20 flex-1">
        {children}
      </div>
      {/* Footer */}
      <footer className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-16">
            {/* Company Info */}
            <div className="space-y-6">
              <div className="flex items-center">
                <span className="text-2xl font-bold font-serif tracking-tight">Academic<span className="text-orange-500">Pro</span></span>
              </div>
              <p className="text-slate-300 text-sm leading-relaxed">
                Premium academic writing services since 2015. Trusted by 50,000+ students worldwide for research papers, essays, and dissertation assistance.
              </p>
              <div className="flex space-x-4">
                <a href="#" className="text-slate-300 hover:text-orange-400 transition-colors" aria-label="Facebook">
                  {/* Facebook SVG */}
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                  </svg>
                </a>
                <a href="#" className="text-slate-300 hover:text-orange-400 transition-colors" aria-label="Twitter">
                  {/* Twitter SVG */}
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                  </svg>
                </a>
                <a href="#" className="text-slate-300 hover:text-orange-400 transition-colors" aria-label="LinkedIn">
                  {/* LinkedIn SVG */}
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" clipRule="evenodd" />
                  </svg>
                </a>
              </div>
            </div>
            {/* Quick Links */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold tracking-wider text-orange-400 uppercase">Quick Links</h3>
              <ul className="space-y-3">
                <li><Link href="/" className="text-slate-300 hover:text-orange-400 transition-colors flex items-start"><svg className="w-4 h-4 mt-1 mr-2 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>Home</Link></li>
                <li><Link href="/services" className="text-slate-300 hover:text-orange-400 transition-colors flex items-start"><svg className="w-4 h-4 mt-1 mr-2 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>Our Services</Link></li>
                <li><Link href="/blog" className="text-slate-300 hover:text-orange-400 transition-colors flex items-start"><svg className="w-4 h-4 mt-1 mr-2 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>Academic Blog</Link></li>
                <li><Link href="/order-new" className="text-slate-300 hover:text-orange-400 transition-colors flex items-start"><svg className="w-4 h-4 mt-1 mr-2 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>Place Order</Link></li>
              </ul>
            </div>
            {/* Subjects */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold tracking-wider text-orange-400 uppercase">Popular Subjects</h3>
              <ul className="space-y-3">
                <li><Link href="/blog?category=nursing" className="text-slate-300 hover:text-orange-400 transition-colors flex items-start"><svg className="w-4 h-4 mt-1 mr-2 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>Nursing Papers</Link></li>
                <li><Link href="/blog?category=business" className="text-slate-300 hover:text-orange-400 transition-colors flex items-start"><svg className="w-4 h-4 mt-1 mr-2 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>Business & Accounting</Link></li>
                <li><Link href="/blog?category=finance" className="text-slate-300 hover:text-orange-400 transition-colors flex items-start"><svg className="w-4 h-4 mt-1 mr-2 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>Finance & Economics</Link></li>
                <li><Link href="/blog?category=education" className="text-slate-300 hover:text-orange-400 transition-colors flex items-start"><svg className="w-4 h-4 mt-1 mr-2 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>Education Papers</Link></li>
              </ul>
            </div>
            {/* Contact Info */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold tracking-wider text-orange-400 uppercase">Contact Us</h3>
              <address className="not-italic text-slate-300 space-y-3">
                <div className="flex items-start"><svg className="w-5 h-5 mr-3 text-orange-500 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg><span>support@academicpro.com</span></div>
                <div className="flex items-start"><svg className="w-5 h-5 mr-3 text-orange-500 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg><span>+1 (555) 123-4567</span></div>
                <div className="flex items-start"><svg className="w-5 h-5 mr-3 text-orange-500 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg><span>123 Academic Way, Boston, MA 02108</span></div>
              </address>
              {/* Newsletter */}
              <div className="pt-4">
                <h4 className="text-sm font-medium text-slate-200 mb-2">Subscribe to our newsletter</h4>
                <form className="flex">
                  <input type="email" placeholder="Your email" className="px-4 py-2 w-full rounded-l-md text-slate-900 focus:outline-none focus:ring-2 focus:ring-orange-500" />
                  <button type="submit" className="bg-orange-600 hover:bg-orange-700 text-white px-4 py-2 rounded-r-md transition-colors">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
                  </button>
                </form>
              </div>
            </div>
          </div>
          {/* Bottom Bar */}
          <div className="border-t border-slate-700 mt-12 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <p className="text-sm text-slate-400">© {new Date().getFullYear()} AcademicPro. All rights reserved.</p>
              <div className="flex space-x-6 mt-4 md:mt-0">
                <a href="#" className="text-sm text-slate-400 hover:text-orange-400 transition-colors">Privacy Policy</a>
                <a href="#" className="text-sm text-slate-400 hover:text-orange-400 transition-colors">Terms of Service</a>
                <a href="#" className="text-sm text-slate-400 hover:text-orange-400 transition-colors">Cookie Policy</a>
              </div>
              <p className="text-sm text-slate-500 mt-4 md:mt-0">
                <a href="https://mwangikanothe.com" target="_blank" rel="noopener noreferrer" className="hover:text-orange-400 transition-colors">Developed by Kanothe</a>
              </p>
            </div>
          </div>
        </div>
      </footer>
      {/* Tawk.to Script (production only) */}
      {process.env.NODE_ENV === 'production' && (
        <script dangerouslySetInnerHTML={{ __html: `
          var Tawk_API = Tawk_API || {}, Tawk_LoadStart = new Date();
          (function() {
            var s1 = document.createElement("script"),
              s0 = document.getElementsByTagName("script")[0];
            s1.async = true;
            s1.src = 'https://embed.tawk.to/63c8802dc2f1ac1e202e6df2/1gn3j9djh';
            s1.charset = 'UTF-8';
            s1.setAttribute('crossorigin', '*');
            s0.parentNode.insertBefore(s1, s0);
          })();
        `}} />
      )}
    </div>
  );
}
