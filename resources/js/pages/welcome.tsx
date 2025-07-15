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
            <section id="hero-section" className="relative mt-5 h-screen w-full overflow-hidden">
                <div className="mx-auto flex h-full max-w-7xl flex-col">
                    <div className="grid h-full items-center gap-8 py-12 md:grid-cols-2">
                        {/* Left side */}
                        <div className="space-y-6 px-4 md:px-0">
                            <h1 className="text-4xl leading-tight font-bold text-gray-800 md:text-5xl">
                                Unlock Your Academic Potential
                                <br />
                                <span>One Task at a Time</span>
                            </h1>
                            <p className="max-w-md text-xl text-gray-600">
                                Our team of experts from across the World are ready to work on your papers and meet your academic needs. Our tutors
                                are ready to work with you
                            </p>
                            <div className="flex w-full justify-around">
                                <p className="rounded-lg bg-white px-3 py-2 shadow-md">
                                    <strong>Simple</strong> ordering process
                                </p>
                                <p className="rounded-lg bg-white px-3 py-2 shadow-md">
                                    <strong>Affordable</strong> services
                                </p>
                                <p className="rounded-lg bg-white px-3 py-2 shadow-md">
                                    <strong>Quick</strong> delivery
                                </p>
                            </div>
                            <div className="flex justify-between py-4">
                                {/* Company 1 */}
                                <div className="flex items-center p-2">
                                    <img
                                        src="https://raw.githubusercontent.com/iamkibet/assets/main/logo-sitejabber-small.svg"
                                        alt="Sitejabber Reviews"
                                        className="mr-4 h-10"
                                    />
                                    <div className="text-left">
                                        <p className="text-[12px] font-medium text-gray-800">sitejabber.com</p>
                                        <div className="flex items-center">
                                            <h1 className="mr-1 text-lg font-bold text-indigo-600">4.7</h1>
                                            {/* Star SVG */}
                                            <span className="text-yellow-400">★</span>
                                        </div>
                                    </div>
                                </div>
                                {/* Company 2 */}
                                <div className="flex items-center p-2">
                                    <img
                                        src="https://raw.githubusercontent.com/iamkibet/assets/refs/heads/main/logo_reviews.svg"
                                        alt="Company 2 Reviews"
                                        className="mr-4 h-10"
                                    />
                                    <div className="text-left">
                                        <p className="text-[12px] font-medium text-gray-800">reviews.io</p>
                                        <div className="flex items-center">
                                            <h1 className="mr-1 text-lg font-bold text-indigo-600">4.5</h1>
                                            <span className="text-yellow-400">★</span>
                                        </div>
                                    </div>
                                </div>
                                {/* Company 3 */}
                                <div className="flex items-center p-2">
                                    <img
                                        src="https://raw.githubusercontent.com/iamkibet/assets/main/logo-sitejabber-small.svg"
                                        className="mr-4 h-10"
                                    />
                                    <div className="text-left">
                                        <p className="text-[12px] font-medium text-gray-800">google.com</p>
                                        <div className="flex items-center">
                                            <h1 className="mr-1 text-lg font-bold text-indigo-600">
                                                4.<span>8</span>
                                            </h1>
                                            <span className="text-yellow-400">★</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* Right side: Calculator */}
                        <div className="relative flex h-full items-center justify-center px-4 md:px-0">
                            <div className="w-full max-w-md rounded-xl bg-white p-6 shadow-2xl">
                                <GlobalCalculator />
                            </div>
                        </div>
                    </div>
                </div>
                {/* Decorative elements */}
                <div className="absolute bottom-0 left-0 h-16 w-full -skew-y-3 transform bg-indigo-600 opacity-10"></div>
                <div className="animate-blob absolute top-0 right-0 h-24 w-24 rounded-full bg-yellow-300 opacity-70 mix-blend-multiply blur-xl filter"></div>
                <div className="animate-blob animation-delay-2000 absolute bottom-0 left-10 h-24 w-24 rounded-full bg-pink-300 opacity-70 mix-blend-multiply blur-xl filter"></div>
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
                        <div className="flex-shrink-0 rounded-lg bg-white p-3 shadow-sm"><Search className='text-black'/></div>
                        <div>
                            <h1 className="text-lg font-extrabold md:text-xl">Zero plagiarism</h1>
                            <p className="text-sm text-white/90 md:text-base">
                                Your writer checks the essay for plagiarism before delivering it to you.
                            </p>
                        </div>
                    </div>
                    <div className="flex min-w-[300px] flex-col items-start gap-4 p-3 md:min-w-0 md:flex-row md:items-center md:gap-6">
                        <div className="flex-shrink-0 rounded-lg bg-white p-3 shadow-sm text-black"><Pen /></div>
                        <div>
                            <h1 className="text-lg font-extrabold md:text-xl">Free revisions</h1>
                            <p className="text-sm text-white/90 md:text-base">We polish your essay for free if you don’t add any new guidelines.</p>
                        </div>
                    </div>
                    <div className="flex min-w-[300px] flex-col items-start gap-4 p-3 md:min-w-0 md:flex-row md:items-center md:gap-6">
                        <div className="flex-shrink-0 rounded-lg bg-white p-3 shadow-sm text-black"><DollarSign /></div>
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
                <div className="text-center text-gray-400"><Samples /></div>
            </div>

            {/* Qualified Writers Section */}
            <section className="bg-white py-8">
                <div className="mx-auto mt-4 max-w-7xl">
                    <div className="space-y-2">
                        <h2 className="text-2xl leading-tight font-bold text-gray-900 sm:text-3xl lg:text-4xl">
                            <span className="section-header">300+ Qualified Writers</span>
                            <br />
                            Framework
                        </h2>
                    </div>
                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
                        {/* Feature grid - replace with icons as needed */}
                        {[
                            'Approx. 275 words/page',
                            'All formats (APA, MLA, CHICAGO etc)',
                            '12-point font (Arial or Times New Roman)',
                            'Free bibliography page',
                            'Progressive delivery',
                            'Free title page for a written paper',
                            'Academic integrity',
                            'Plagiarism free papers',
                        ].map((text, idx) => (
                            <div key={idx} className="flex flex-col items-center p-4">
                                <div className="mb-2 flex h-12 w-12 items-center justify-center rounded-full bg-indigo-600">
                                    {/* Icon placeholder */}
                                </div>
                                <p className="text-center text-lg font-bold">{text}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Accordion, Testimonials, Blog, and Strategies Sections */}
            {/* TODO: Replace with Accordion, Testimonials, Blog, and Strategies components */}
            <div className="my-8 text-center text-gray-400">[Accordion, Testimonials, Blog, and Strategies Placeholders]</div>

            {/* Revision Excellence & Enhanced CTA Section */}
            <section className="relative bg-gradient-to-b from-slate-50 to-white pt-20 pb-32">
                <div className="mx-auto max-w-4xl px-6">
                    <div className="mb-16 text-center">
                        <h3 className="mb-4 font-serif text-4xl font-bold text-slate-800">Smart Academic Help Strategies</h3>
                        <div className="mx-auto mt-6 h-1 w-24 rounded-full bg-orange-600"></div>
                    </div>
                    {/* Strategies - replace with dynamic content if needed */}
                    <div className="mb-16 flex flex-col items-center gap-8 md:flex-row">
                        <div className="text-center md:w-1/3 md:text-right">
                            <span className="inline-block font-serif text-6xl font-bold text-orange-600">01</span>
                        </div>
                        <div className="md:w-2/3">
                            <h4 className="mb-4 text-2xl font-semibold text-slate-800">Early Bird Advantage</h4>
                            <p className="mb-4 leading-relaxed text-slate-600">
                                Reserve expert help 7+ days in advance to unlock significant benefits:
                            </p>
                            <ul className="list-disc space-y-2 pl-5 text-slate-600">
                                <li>
                                    <span className="font-medium">Save up to 30%</span> with early orders. All our orders are priced depending on the
                                    deadline, level of expertise and Discipline. Making your order early will save you time and upto 30% of the total
                                    cost.
                                </li>
                                <li>
                                    First pick of <span className="font-medium">top-rated writers</span> in your field. Our top rated writers will
                                    guarantee you a value for your money.{' '}
                                </li>
                                <li>
                                    Ample time for <span className="font-medium">multiple revisions</span> and refinements. All our{' '}
                                    <span className="font-medium">revisions </span> are done free of charge to ensure that you get the best and the
                                    quality meets your standard
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className="mb-16 flex flex-col items-center gap-8 md:flex-row">
                        <div className="order-2 text-center md:order-1 md:w-1/3 md:text-right">
                            <span className="inline-block font-serif text-6xl font-bold text-orange-600">02</span>
                        </div>
                        <div className="order-1 md:order-2 md:w-2/3">
                            <h4 className="mb-4 text-2xl font-semibold text-slate-800">Precision Writer Matching</h4>
                            <p className="mb-4 leading-relaxed text-slate-600">Our rigorous selection process ensures perfect alignment:</p>
                            <ul className="list-disc space-y-2 pl-5 text-slate-600">
                                <li>
                                    PhD-verified experts in <span className="font-medium">your specific discipline</span>
                                </li>
                                <li>
                                    Writers with <span className="font-medium">proven track records</span> in your subject
                                </li>
                                <li>
                                    Direct communication channels for <span className="font-medium">real-time collaboration</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                {/* Revision Excellence Section */}
                <section className="relative -mt-24 bg-slate-800 pb-20">
                    <div className="mx-auto max-w-7xl rounded-xl border border-orange-900/30 px-4 py-12 shadow-2xl sm:px-6 sm:py-16 xl:py-20">
                        <div className="mx-auto max-w-7xl">
                            <header className="xs:flex-row xs:items-center mb-10 flex flex-col items-start gap-6 sm:mb-12 lg:mb-14">
                                <div className="space-y-2">
                                    <h2 className="text-2xl leading-tight font-bold text-white sm:text-3xl lg:text-4xl">
                                        <span className="section-header">Revision Excellence</span>
                                        <br />
                                        Framework
                                    </h2>
                                    <p className="max-w-2xl text-sm font-medium text-orange-300/90 sm:text-base">
                                        Unlimited refinement protocol ensuring academic perfection across all disciplines
                                    </p>
                                </div>
                            </header>
                            <div className="grid grid-cols-1 gap-4 sm:gap-6 md:grid-cols-2 xl:grid-cols-3">
                                {/* Feature 1 */}
                                <article className="group relative rounded-xl border-slate-600/30 bg-slate-700/40 p-5 transition-all duration-300 sm:p-6">
                                    <div className="flex items-start gap-4">
                                        <div className="mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-orange-600 text-lg font-bold text-white shadow-sm">
                                            1
                                        </div>
                                        <div className="space-y-3">
                                            <h3 className="text-lg font-semibold text-white sm:text-xl">Cost-Free Refinements</h3>
                                            <p className="text-sm leading-relaxed text-slate-300/90 sm:text-base">
                                                Comprehensive adjustments including formatting compliance (APA/MLA/Chicago), citation optimization,
                                                and structural enhancements -{' '}
                                                <span className="font-medium text-orange-300">zero additional costs</span>.
                                            </p>
                                        </div>
                                    </div>
                                </article>
                                {/* Feature 2 */}
                                <article className="group relative rounded-xl border-slate-600/30 bg-slate-700/40 p-5 transition-all duration-300 sm:p-6">
                                    <div className="flex items-start gap-4">
                                        <div className="mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-orange-600 text-lg font-bold text-white shadow-sm">
                                            2
                                        </div>
                                        <div className="space-y-3">
                                            <h3 className="text-lg font-semibold text-white sm:text-xl">Expert Continuity Assurance</h3>
                                            <p className="text-sm leading-relaxed text-slate-300/90 sm:text-base">
                                                Retention of your original <span className="font-medium text-orange-300">PhD-qualified writer</span>{' '}
                                                throughout all revision cycles, maintaining deep subject expertise and consistent quality standards.
                                            </p>
                                        </div>
                                    </div>
                                </article>
                                {/* Feature 3 */}
                                <article className="group relative rounded-xl border-slate-600/30 bg-slate-700/40 p-5 transition-all duration-300 sm:p-6">
                                    <div className="flex items-start gap-4">
                                        <div className="mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-orange-600 text-lg font-bold text-white shadow-sm">
                                            3
                                        </div>
                                        <div className="space-y-3">
                                            <h3 className="text-lg font-semibold text-white sm:text-xl">Priority Revision Support</h3>
                                            <p className="text-sm leading-relaxed text-slate-300/90 sm:text-base">
                                                Expedited assistance protocol:
                                                <span className="mt-2 block space-y-1 font-medium text-orange-300/90">
                                                    <span className="flex items-center gap-2">✔ 2-hour response guarantee</span>
                                                    <span className="flex items-center gap-2">✔ 6-hour turnaround option</span>
                                                    <span className="flex items-center gap-2">✔ 24/7 availability</span>
                                                </span>
                                            </p>
                                        </div>
                                    </div>
                                </article>
                            </div>
                            {/* Stats Grid */}
                            <div className="mt-10 rounded-xl bg-gradient-to-r from-orange-900/30 via-slate-800/50 to-slate-800/50 p-5 backdrop-blur-sm sm:mt-12 sm:p-6">
                                <div className="grid grid-cols-2 gap-4 text-center sm:grid-cols-4 sm:gap-6">
                                    <div className="space-y-1 border-r border-orange-800/30 pr-4 last:border-0 sm:space-y-2 sm:pr-6">
                                        <p className="text-2xl font-bold text-orange-400 sm:text-3xl">
                                            92<span className="text-lg sm:text-xl">%</span>
                                        </p>
                                        <p className="text-xs leading-tight font-medium text-orange-200/90 sm:text-sm">B+ or Higher Grades</p>
                                    </div>
                                    <div className="space-y-1 border-r border-orange-800/30 pr-4 last:border-0 sm:space-y-2 sm:pr-6">
                                        <p className="text-2xl font-bold text-orange-400 sm:text-3xl">
                                            68<span className="text-lg sm:text-xl">%</span>
                                        </p>
                                        <p className="text-xs leading-tight font-medium text-orange-200/90 sm:text-sm">Score Improvements</p>
                                    </div>
                                    <div className="space-y-1 border-r border-orange-800/30 pr-4 last:border-0 sm:space-y-2 sm:pr-6">
                                        <p className="text-2xl font-bold text-orange-400 sm:text-3xl">24/7</p>
                                        <p className="text-xs leading-tight font-medium text-orange-200/90 sm:text-sm">Support Availability</p>
                                    </div>
                                    <div className="space-y-1 sm:space-y-2">
                                        <p className="text-2xl font-bold text-orange-400 sm:text-3xl">0$</p>
                                        <p className="text-xs leading-tight font-medium text-orange-200/90 sm:text-sm">Extra Fees</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* Enhanced CTA */}
                    <div className="relative mt-12 overflow-hidden rounded-xl bg-indigo-600 p-8 text-center md:p-10">
                        <div className="absolute -top-20 -right-20 h-64 w-64 rounded-full bg-orange-700 opacity-20"></div>
                        <div className="absolute -bottom-20 -left-20 h-64 w-64 rounded-full bg-orange-700 opacity-20"></div>
                        <div className="relative z-10">
                            <h3 className="mb-6 text-3xl font-bold text-white">Ready for Academic Success?</h3>
                            <p className="mx-auto mb-8 max-w-2xl text-xl text-orange-100">
                                Join thousands of students who trust our expert writers for their most important assignments
                            </p>
                            <div className="flex flex-col justify-center gap-4 sm:flex-row">
                                <a
                                    href="#"
                                    className="flex-1 transform rounded-lg bg-white px-8 py-4 text-center font-bold text-orange-600 shadow-lg transition-all duration-300 hover:scale-105 hover:bg-slate-100 hover:shadow-xl sm:flex-none"
                                >
                                    Get Started Now
                                </a>
                                <a
                                    href="#"
                                    className="hover:bg-opacity-10 flex-1 transform rounded-lg border-2 border-white px-8 py-4 text-center font-bold text-white shadow-lg transition-all duration-300 hover:scale-105 hover:bg-white hover:shadow-xl sm:flex-none"
                                >
                                    Speak to an Expert
                                </a>
                            </div>
                            <p className="mt-6 text-sm text-orange-100">
                                <span className="mr-1 inline-block h-5 w-5 align-middle">✔</span>
                                100% Original Work • 24/7 Support • Money-Back Guarantee
                            </p>
                        </div>
                    </div>
                </section>
            </section>
        </GuestLayout>
    );
}
