import AcademicExcellenceSection from '@/components/academic-excellence';
import Accordion from '@/components/accordion';
import GlobalCalculator from '@/components/global-calculator';
import ServiceSteps from '@/components/our-services';
import Samples from '@/components/samples';
import GuestLayout from '@/layouts/GuestLayout';
import { Head } from '@inertiajs/react';
import { DollarSign, Pen, Search } from 'lucide-react';

export default function Welcome() {
    return (
        <GuestLayout>
            <Head title="Academic Writing Services">
                <link href="https://fonts.bunny.net/css?family=inter:400,500,600,700" rel="stylesheet" />
            </Head>

            {/* Hero Section */}
            <section className="relative min-h-screen overflow-hidden bg-gradient-to-br from-slate-50 to-slate-100 px-2 pt-14 sm:px-0 sm:pt-20">
                {/* Background elements */}
                <div className="absolute top-0 right-0 left-0 h-32 bg-gradient-to-b from-slate-900/5 to-transparent sm:h-64"></div>
                <div className="absolute top-1/4 right-1/4 h-40 w-40 rounded-full bg-orange-500/10 blur-3xl sm:h-96 sm:w-96"></div>
                <div className="absolute bottom-1/3 left-1/4 h-32 w-32 rounded-full bg-blue-500/10 blur-3xl sm:h-80 sm:w-80"></div>

                <div className="relative z-10 mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="grid min-h-0 min-w-0 grid-cols-1 items-start gap-6 md:grid-cols-2 lg:grid-cols-3">
                        {/* Content */}
                        <div className="col-span-2 flex flex-col justify-center px-2 text-center sm:px-0 lg:text-left">
                            <div className="mb-4 inline-flex items-center rounded-full bg-slate-200/70 px-3 py-1 text-xs font-medium text-slate-700 sm:mb-6 sm:px-4 sm:text-sm">
                                <span className="mr-2">🎓</span> Trusted by students worldwide
                            </div>

                            <h1 className="xs:text-3xl mb-4 text-2xl leading-tight font-bold text-slate-900 sm:mb-6 sm:text-4xl md:text-5xl lg:text-6xl">
                                <span className="block">Unlock Your</span>
                                <span className="mt-2 block text-orange-600">Academic Potential</span>
                            </h1>

                            <p className="xs:max-w-md xs:text-base mx-auto mb-6 max-w-xs text-sm text-slate-600 sm:mb-8 sm:max-w-2xl sm:text-xl lg:mx-0">
                                Expert academic assistance from PhD-qualified writers tailored to your needs
                            </p>

                            {/* Features */}
                            <div className="mb-8 max-w-full overflow-x-auto sm:mb-10">
                                <div className="flex max-w-xs min-w-[260px] grid-cols-3 items-start justify-start gap-2 sm:max-w-lg sm:min-w-0 sm:gap-4 lg:mx-0">
                                    {[
                                        { title: 'Simple', icon: '📝' },
                                        { title: 'Affordable', icon: '💰' },
                                        { title: 'Quick', icon: '⚡' },
                                    ].map((feature, index) => (
                                        <div key={index} className="flex items-center gap-1 sm:gap-2">
                                            <div className="flex text-2xl sm:text-3xl">{feature.icon}</div>
                                            <div className="text-xs font-bold text-slate-800 sm:text-base">{feature.title}</div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Reviews */}
                            <div className="mb-8 w-full max-w-full overflow-x-auto sm:mb-10">
                                <div className="flex min-w-[420px] flex-row flex-nowrap justify-center gap-3 sm:min-w-0 sm:flex-row sm:flex-wrap sm:gap-4 lg:justify-start">
                                    {[
                                        { name: 'Sitejabber', rating: 4.7, logo: 'SJ', color: 'text-blue-600' },
                                        { name: 'Reviews.io', rating: 4.5, logo: 'RI', color: 'text-green-600' },
                                        { name: 'Google', rating: 4.8, logo: 'G', color: 'text-orange-600' },
                                    ].map((review, index) => (
                                        <div
                                            key={index}
                                            className="flex min-w-[120px] items-center rounded-lg bg-white px-3 py-2 shadow-sm sm:min-w-[140px] sm:px-4 sm:py-3"
                                        >
                                            <div
                                                className={`flex h-8 w-8 items-center justify-center rounded-full font-bold sm:h-10 sm:w-10 ${review.color} mr-2 bg-slate-100 sm:mr-3`}
                                            >
                                                {review.logo}
                                            </div>
                                            <div>
                                                <div className="text-xs font-medium text-slate-800 sm:text-sm">{review.name}</div>
                                                <div className="flex items-center">
                                                    <div className="mr-1 text-base font-bold sm:text-lg">{review.rating}</div>
                                                    <div className="flex text-orange-400">
                                                        {[...Array(5)].map((_, i) => (
                                                            <svg key={i} className="h-3 w-3 fill-current sm:h-4 sm:w-4" viewBox="0 0 24 24">
                                                                <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                                                            </svg>
                                                        ))}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* CTA */}
                            <div className="flex w-full flex-col justify-center gap-3 sm:flex-row sm:gap-4 lg:justify-start">
                                <button className="w-full rounded-full bg-gradient-to-r from-orange-500 to-orange-600 px-6 py-3 font-bold text-white shadow-lg transition-all hover:from-orange-600 hover:to-orange-700 hover:shadow-xl sm:w-auto sm:px-8 sm:py-4">
                                    Get Started
                                </button>
                                <button className="w-full rounded-full border-2 border-slate-300 bg-white px-6 py-3 font-bold text-slate-700 transition-all hover:border-orange-500 sm:w-auto sm:px-8 sm:py-4">
                                    How It Works
                                </button>
                            </div>
                        </div>

                        {/* Calculator Card */}
                        <div className="relative col-span-1 mt-8 w-full max-w-full px-2 sm:px-0 md:mt-0">
                            <GlobalCalculator />
                        </div>
                    </div>
                </div>

                {/* Bottom wave */}
                <div className="absolute right-0 bottom-0 left-0">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 1440 120"
                        className="xs:h-12 h-10 w-full fill-current text-slate-50 sm:h-20 md:h-28 lg:h-32"
                    >
                        <path d="M0,64L80,58.7C160,53,320,43,480,48C640,53,800,75,960,74.7C1120,75,1280,53,1360,42.7L1440,32L1440,120L1360,120C1280,120,1120,120,960,120C800,120,640,120,480,120C320,120,160,120,80,120L0,120Z"></path>
                    </svg>
                </div>
            </section>

            {/* Universities Section */}
            <section id="universities" className="relative overflow-hidden bg-gradient-to-b from-gray-100 to-white py-16">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="mb-12 text-center">
                        <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">Trusted by Top Universities</h2>
                        <p className="mx-auto mt-3 max-w-2xl text-xl text-gray-500 sm:mt-4">
                            Over 1,739 students from world-renowned institutions rely on our services.
                        </p>
                    </div>
                    <div className="mt-10">
                        <div className="flex flex-wrap items-center justify-center gap-8">
                            {/* University logos - replace src with your assets if needed */}
                            <div className="group">
                                <img
                                    className="h-16 w-auto grayscale transition duration-300 group-hover:scale-110 group-hover:grayscale-0"
                                    src="/assets/the-best-homework-help-service-and-custom-paper-writing-website-for-snhu-university-students.png"
                                    alt="SNHU University"
                                />
                                <span className="mt-2 block text-sm font-medium text-gray-500 group-hover:text-indigo-600">SNHU University</span>
                            </div>
                            <div className="group">
                                <img
                                    className="h-16 w-auto grayscale transition duration-300 group-hover:scale-110 group-hover:grayscale-0"
                                    src="/assets/the-best-homework-help-service-and-custom-paper-writing-website-for-liverpool-university-students.png"
                                    alt="Liverpool University"
                                />
                                <span className="mt-2 block text-sm font-medium text-gray-500 group-hover:text-indigo-600">Liverpool University</span>
                            </div>
                            <div className="group">
                                <img
                                    className="h-16 w-auto grayscale transition duration-300 group-hover:scale-110 group-hover:grayscale-0"
                                    src="/assets/the-best-homework-help-service-and-custom-paper-writing-website-for-london-school-University-students.png"
                                    alt="London School of Economics"
                                />
                                <span className="group-hover:text-primary mt-2 block text-sm font-medium text-gray-500">
                                    London School of Economics
                                </span>
                            </div>
                            <div className="group">
                                <img
                                    className="h-16 w-auto grayscale transition duration-300 group-hover:scale-110 group-hover:grayscale-0"
                                    src="/assets/the-best-homework-help-service-and-custom-paper-writing-website-for-Strayer-University-students.png"
                                    alt="Strayer University"
                                />
                                <span className="group-hover:text-primary mt-2 block text-sm font-medium text-gray-500">Strayer University</span>
                            </div>
                        </div>
                    </div>
                </div>
                {/* Decorative background elements */}
                <div className="absolute top-0 left-0 h-1/2 w-full bg-gradient-to-b from-indigo-100 to-transparent opacity-50"></div>
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 transform">
                    {/* SVG pattern background - can be replaced with a React SVG or left as is */}
                </div>
            </section>

            <ServiceSteps />

            {/* Pricing & Free Features Section */}
            <div className="relative w-full overflow-hidden bg-black p-6 text-white">
                <div className="mx-auto max-w-7xl">
                    <div className="overflow-hidden rounded-lg px-6 py-12 shadow-lg lg:px-12">
                        <div className="relative">
                            <p className="relative mb-4 w-full text-2xl font-bold md:w-3/4 lg:w-1/2">
                                Our essay service offers <span className="text-white">affordable prices</span>
                            </p>
                            <div className="relative flex flex-col items-center justify-between md:flex-row">
                                <p className="mb-6 flex-1 text-[16px] md:text-left md:text-[20px]">
                                    Value for money, we take care of your budget while delivering quality papers. Our prices start at{' '}
                                    <span className="font-bold text-indigo-400">$10</span> per page in academic writing services.
                                </p>
                                <div className="mt-4 flex-none md:mt-0 md:ml-20">
                                    <a
                                        href="/"
                                        className="group inline-flex items-center justify-center rounded-lg bg-indigo-600 px-6 py-3 text-white shadow-lg transition duration-300 hover:bg-indigo-700"
                                    >
                                        <span className="font-semibold">Write My Essay</span>
                                        <span className="ml-2">→</span>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="grid grid-cols-1 gap-6 px-6 text-white sm:grid-cols-2 lg:grid-cols-5 lg:px-12">
                        {/* Pricing Tiers */}
                        <div className="flex h-[200px] flex-col items-center justify-center rounded-lg border-[0.5px] border-white p-6 text-center duration-300 ease-in-out hover:border-indigo-400 hover:bg-indigo-700">
                            <h1 className="text-5xl font-extrabold">
                                <strong>$10</strong> <span className="text-base">/ page</span>
                            </h1>
                            <h4 className="mt-3 text-xl font-medium">High School</h4>
                        </div>
                        <div className="flex h-[200px] flex-col items-center justify-center rounded-lg border-[0.5px] border-white p-6 text-center duration-300 ease-in-out hover:border-indigo-400 hover:bg-indigo-700">
                            <h1 className="text-5xl font-extrabold">
                                <strong>$15</strong> <span className="text-base">/ page</span>
                            </h1>
                            <h4 className="mt-3 text-xl font-medium">College</h4>
                            <p className="mt-1 text-sm">(Years 1-2)</p>
                        </div>
                        <div className="flex h-[200px] flex-col items-center justify-center rounded-lg border-[0.5px] border-white p-6 text-center duration-300 ease-in-out hover:border-indigo-400 hover:bg-indigo-700">
                            <h1 className="text-5xl font-extrabold">
                                <strong>$20</strong> <span className="text-base">/ page</span>
                            </h1>
                            <h4 className="mt-3 text-xl font-medium">University</h4>
                            <p className="mt-1 text-sm">(Years 3-4)</p>
                        </div>
                        <div className="flex h-[200px] flex-col items-center justify-center rounded-lg border-[0.5px] border-white p-6 text-center duration-300 ease-in-out hover:border-indigo-400 hover:bg-indigo-700">
                            <h1 className="text-5xl font-extrabold">
                                <strong>$25</strong> <span className="text-base">/ page</span>
                            </h1>
                            <h4 className="mt-3 text-xl font-medium">Graduate</h4>
                        </div>
                        <div className="flex h-[200px] transform flex-col items-center justify-center rounded-lg border border-white p-6 text-center transition-transform hover:scale-105 hover:border-indigo-400 hover:bg-indigo-700">
                            <h1 className="text-5xl font-extrabold">
                                <strong>$29</strong> <span className="text-base">/ page</span>
                            </h1>
                            <h4 className="mt-3 text-xl font-medium">PhD</h4>
                        </div>
                    </div>
                    <div className="relative p-6 text-white lg:p-12">
                        <div className="mb-8 flex flex-col items-center gap-5 md:flex-row">
                            <h1 className="mb-2 text-3xl font-extrabold">Free Features</h1>
                            <p className="text-lg">Get everything you need at no extra charge</p>
                        </div>
                        <div className="my-6 flex w-full flex-col gap-4 md:flex-row">
                            {/* Free features */}
                            {['Title Page', 'Bibliography', 'Formatting', 'Top Writer'].map((feature) => (
                                <div key={feature} className="relative flex flex-col items-center rounded-lg bg-white/15 px-6 py-4 shadow-md">
                                    <code className="text-center text-lg leading-[20px] font-medium">
                                        {feature}
                                        <span className="relative ml-2 inline-block">
                                            <span className="text-yellow-200 line-through">$10</span>
                                        </span>
                                    </code>
                                </div>
                            ))}
                        </div>
                        {/* Save $35 Banner */}
                        <div className="absolute top-1/2 right-8 hidden h-36 w-36 -translate-y-1/2 transform items-center justify-center rounded-full bg-white p-4 text-black shadow-lg md:flex">
                            <span className="rotate-12 transform text-center text-3xl font-bold">
                                SAVE <span>$35!</span>
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Guarantees Section */}
            <section className="bg-black/90 p-6 py-12 text-white">
                <div className="mx-auto flex max-w-7xl gap-4 overflow-x-auto md:overflow-visible">
                    {/* Guarantee cards */}
                    <div className="flex min-w-[300px] flex-col items-start gap-4 p-3 md:min-w-0 md:flex-row md:items-center md:gap-6">
                        <div className="flex-shrink-0 rounded-lg bg-white p-3 shadow-sm">
                            <Search className="text-black" />
                        </div>
                        <div>
                            <h1 className="text-lg font-extrabold md:text-xl">Zero plagiarism</h1>
                            <p className="text-sm text-white/90 md:text-base">
                                Your writer checks the essay for plagiarism before delivering it to you.
                            </p>
                        </div>
                    </div>
                    <div className="flex min-w-[300px] flex-col items-start gap-4 p-3 md:min-w-0 md:flex-row md:items-center md:gap-6">
                        <div className="flex-shrink-0 rounded-lg bg-white p-3 text-black shadow-sm">
                            <Pen />
                        </div>
                        <div>
                            <h1 className="text-lg font-extrabold md:text-xl">Free revisions</h1>
                            <p className="text-sm text-white/90 md:text-base">We polish your essay for free if you don’t add any new guidelines.</p>
                        </div>
                    </div>
                    <div className="flex min-w-[300px] flex-col items-start gap-4 p-3 md:min-w-0 md:flex-row md:items-center md:gap-6">
                        <div className="flex-shrink-0 rounded-lg bg-white p-3 text-black shadow-sm">
                            <DollarSign />
                        </div>
                        <div>
                            <h1 className="text-lg font-extrabold md:text-xl">Money-back</h1>
                            <p className="text-sm text-white/90 md:text-base">
                                You get your money back to your card if anything goes wrong with your order.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Samples Section */}
            <div className="bg-white/90 py-6">
                {/* TODO: Replace with Samples component */}
                <div className="text-center text-gray-400">
                    <Samples />
                </div>
            </div>

            {/* Qualified Writers Section */}
            <section className="bg-gradient-to-br from-slate-50 to-slate-100 py-16">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="mb-16 text-center">
                        <h2 className="text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl">
                            <span className="block">300+ Qualified Academic Writers</span>
                            <span className="mt-2 block text-orange-600">Excellence Framework</span>
                        </h2>
                        <div className="mx-auto mt-6 max-w-3xl">
                            <p className="text-xl text-slate-600">
                                Our carefully vetted writers follow strict quality standards to deliver exceptional academic work
                            </p>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
                        {[
                            {
                                title: 'Precision Formatting',
                                description: 'Approx. 275 words/page',
                                icon: (
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
                                        />
                                    </svg>
                                ),
                            },
                            {
                                title: 'Style Flexibility',
                                description: 'All formats (APA, MLA, Chicago, etc)',
                                icon: (
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"
                                        />
                                    </svg>
                                ),
                            },
                            {
                                title: 'Professional Standards',
                                description: '12-point font (Arial or Times New Roman)',
                                icon: (
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                                        />
                                    </svg>
                                ),
                            },
                            {
                                title: 'Comprehensive Research',
                                description: 'Free bibliography page',
                                icon: (
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                                        />
                                    </svg>
                                ),
                            },
                            {
                                title: 'Phased Delivery',
                                description: 'Progressive delivery',
                                icon: (
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                                    </svg>
                                ),
                            },
                            {
                                title: 'Professional Presentation',
                                description: 'Free title page for written papers',
                                icon: (
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                                        />
                                    </svg>
                                ),
                            },
                            {
                                title: 'Ethical Standards',
                                description: 'Academic integrity guarantee',
                                icon: (
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                                        />
                                    </svg>
                                ),
                            },
                            {
                                title: 'Original Work',
                                description: 'Plagiarism-free papers',
                                icon: (
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                                        />
                                    </svg>
                                ),
                            },
                        ].map((feature, idx) => (
                            <div
                                key={idx}
                                className="rounded-xl border border-slate-100 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md"
                            >
                                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-orange-100 text-orange-600">
                                    {feature.icon}
                                </div>
                                <h3 className="mb-2 text-lg font-bold text-slate-900">{feature.title}</h3>
                                <p className="text-slate-600">{feature.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <div className="my-8 text-center text-gray-400">
                <Accordion />
            </div>

            <AcademicExcellenceSection />
        </GuestLayout>
    );
}
