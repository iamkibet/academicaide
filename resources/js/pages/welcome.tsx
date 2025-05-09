import { type SharedData } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';

export default function Welcome() {
    const { auth } = usePage<SharedData>().props;

    return (
        <>
            <Head title="Welcome to AcademicAide">
                <link rel="preconnect" href="https://fonts.bunny.net" />
                <link href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600" rel="stylesheet" />
            </Head>
            <div className="min-h-screen bg-white dark:bg-gray-900">
                {/* Navigation */}
                <header className="fixed top-0 right-0 left-0 z-50 bg-white shadow-sm dark:bg-gray-800">
                    <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                        <div className="flex h-16 items-center justify-between">
                            <div className="flex items-center">
                                <Link href="/" className="flex items-center">
                                    <h1 className="text-2xl font-bold text-blue-600">AcademicAide</h1>
                                </Link>
                                <div className="hidden md:ml-10 md:flex md:space-x-8">
                                    <Link href="#services" className="text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white">
                                        Services
                                    </Link>
                                    <Link href="#pricing" className="text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white">
                                        Pricing
                                    </Link>
                                    <Link href="#about" className="text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white">
                                        About Us
                                    </Link>
                                    <Link href="#reviews" className="text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white">
                                        Reviews
                                    </Link>
                                </div>
                            </div>
                            <div className="flex items-center gap-4">
                                {auth.user ? (
                                    <Link
                                        href={route('dashboard')}
                                        className="inline-block rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
                                    >
                                        Dashboard
                                    </Link>
                                ) : (
                                    <>
                                        <Link
                                            href={route('login')}
                                            className="text-sm font-medium text-gray-700 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white"
                                        >
                                            Log in
                                        </Link>
                                        <Link
                                            href={route('register')}
                                            className="inline-block rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
                                        >
                                            Get Started
                                        </Link>
                                    </>
                                )}
                            </div>
                        </div>
                    </nav>
                </header>

                {/* Hero Section */}
                <div className="relative pt-24">
                    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                        <div className="text-center">
                            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl dark:text-white">
                                Professional Academic Writing Services
                            </h1>
                            <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-300">
                                Get expert help with your academic papers, essays, and research projects. Our team of qualified writers is here to
                                support your academic success.
                            </p>
                            <div className="mt-10 flex items-center justify-center gap-x-6">
                                <Link
                                    href={route('register')}
                                    className="rounded-md bg-blue-600 px-6 py-3 text-lg font-semibold text-white shadow-sm hover:bg-blue-500"
                                >
                                    Place Your Order
                                </Link>
                                <Link href="#features" className="text-lg leading-6 font-semibold text-gray-900 dark:text-white">
                                    Learn more <span aria-hidden="true">→</span>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Services Section */}
                <div id="services" className="py-24 sm:py-32">
                    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                        <div className="mx-auto max-w-2xl lg:text-center">
                            <h2 className="text-base leading-7 font-semibold text-blue-600">Our Services</h2>
                            <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl dark:text-white">
                                Professional Writing Services
                            </p>
                        </div>
                        <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
                            <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-3">
                                {[
                                    {
                                        title: 'Essay Writing',
                                        description: 'Custom essays written by expert writers with advanced degrees in your field.',
                                    },
                                    {
                                        title: 'Research Papers',
                                        description: 'In-depth research papers with proper citations and academic formatting.',
                                    },
                                    {
                                        title: 'Dissertation Help',
                                        description: 'Comprehensive support for your dissertation or thesis writing.',
                                    },
                                ].map((service) => (
                                    <div key={service.title} className="flex flex-col">
                                        <dt className="text-xl leading-7 font-semibold text-gray-900 dark:text-white">{service.title}</dt>
                                        <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-gray-600 dark:text-gray-300">
                                            <p className="flex-auto">{service.description}</p>
                                        </dd>
                                    </div>
                                ))}
                            </dl>
                        </div>
                    </div>
                </div>

                {/* Pricing Section */}
                <div id="pricing" className="bg-gray-50 py-24 sm:py-32 dark:bg-gray-800">
                    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                        <div className="mx-auto max-w-2xl text-center">
                            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl dark:text-white">
                                Simple, Transparent Pricing
                            </h2>
                            <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-300">Choose the perfect plan for your academic needs</p>
                        </div>
                        <div className="mx-auto mt-16 grid max-w-lg grid-cols-1 items-center gap-y-6 sm:mt-20 sm:gap-y-0 lg:max-w-4xl lg:grid-cols-3">
                            {[
                                {
                                    name: 'Basic',
                                    price: '$10',
                                    description: 'Perfect for short essays and assignments',
                                    features: ['500 words', '24-hour delivery', 'Basic formatting', 'Free revisions'],
                                },
                                {
                                    name: 'Standard',
                                    price: '$15',
                                    description: 'Ideal for research papers and longer essays',
                                    features: ['1000 words', '12-hour delivery', 'Advanced formatting', 'Free revisions', 'Bibliography'],
                                },
                                {
                                    name: 'Premium',
                                    price: '$20',
                                    description: 'Best for complex assignments and dissertations',
                                    features: [
                                        '2000+ words',
                                        '6-hour delivery',
                                        'Premium formatting',
                                        'Free revisions',
                                        'Bibliography',
                                        'Plagiarism report',
                                    ],
                                },
                            ].map((plan) => (
                                <div
                                    key={plan.name}
                                    className="relative flex flex-col rounded-2xl bg-white p-8 shadow-sm ring-1 ring-gray-900/5 dark:bg-gray-700"
                                >
                                    <h3 className="text-lg leading-8 font-semibold text-gray-900 dark:text-white">{plan.name}</h3>
                                    <p className="mt-4 text-sm leading-6 text-gray-600 dark:text-gray-300">{plan.description}</p>
                                    <p className="mt-6 flex items-baseline gap-x-1">
                                        <span className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white">{plan.price}</span>
                                        <span className="text-sm leading-6 font-semibold text-gray-600 dark:text-gray-300">/page</span>
                                    </p>
                                    <ul role="list" className="mt-8 space-y-3 text-sm leading-6 text-gray-600 dark:text-gray-300">
                                        {plan.features.map((feature) => (
                                            <li key={feature} className="flex gap-x-3">
                                                <svg className="h-6 w-5 flex-none text-blue-600" viewBox="0 0 20 20" fill="currentColor">
                                                    <path
                                                        fillRule="evenodd"
                                                        d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z"
                                                        clipRule="evenodd"
                                                    />
                                                </svg>
                                                {feature}
                                            </li>
                                        ))}
                                    </ul>
                                    <Link
                                        href={route('register')}
                                        className="mt-8 block rounded-md bg-blue-600 px-3 py-2 text-center text-sm leading-6 font-semibold text-white shadow-sm hover:bg-blue-500"
                                    >
                                        Get started
                                    </Link>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* CTA Section */}
                <div className="bg-blue-600">
                    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
                        <div className="text-center">
                            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">Ready to get started?</h2>
                            <p className="mx-auto mt-4 max-w-2xl text-lg text-blue-100">
                                Join thousands of students who trust AcademicAide for their academic success.
                            </p>
                            <div className="mt-8">
                                <Link
                                    href={route('register')}
                                    className="inline-block rounded-md bg-white px-6 py-3 text-lg font-semibold text-blue-600 shadow-sm hover:bg-blue-50"
                                >
                                    Create Account
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <footer className="bg-white dark:bg-gray-800">
                    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
                        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
                            <div>
                                <h3 className="text-sm font-semibold text-gray-900 dark:text-white">Company</h3>
                                <ul className="mt-4 space-y-4">
                                    <li>
                                        <Link
                                            href="#about"
                                            className="text-sm text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white"
                                        >
                                            About Us
                                        </Link>
                                    </li>
                                    <li>
                                        <Link
                                            href="#careers"
                                            className="text-sm text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white"
                                        >
                                            Careers
                                        </Link>
                                    </li>
                                    <li>
                                        <Link
                                            href="#contact"
                                            className="text-sm text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white"
                                        >
                                            Contact
                                        </Link>
                                    </li>
                                </ul>
                            </div>
                            <div>
                                <h3 className="text-sm font-semibold text-gray-900 dark:text-white">Services</h3>
                                <ul className="mt-4 space-y-4">
                                    <li>
                                        <Link
                                            href="#essays"
                                            className="text-sm text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white"
                                        >
                                            Essays
                                        </Link>
                                    </li>
                                    <li>
                                        <Link
                                            href="#research"
                                            className="text-sm text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white"
                                        >
                                            Research Papers
                                        </Link>
                                    </li>
                                    <li>
                                        <Link
                                            href="#dissertations"
                                            className="text-sm text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white"
                                        >
                                            Dissertations
                                        </Link>
                                    </li>
                                </ul>
                            </div>
                            <div>
                                <h3 className="text-sm font-semibold text-gray-900 dark:text-white">Support</h3>
                                <ul className="mt-4 space-y-4">
                                    <li>
                                        <Link
                                            href="#help"
                                            className="text-sm text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white"
                                        >
                                            Help Center
                                        </Link>
                                    </li>
                                    <li>
                                        <Link
                                            href="#faq"
                                            className="text-sm text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white"
                                        >
                                            FAQ
                                        </Link>
                                    </li>
                                    <li>
                                        <Link
                                            href="#terms"
                                            className="text-sm text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white"
                                        >
                                            Terms of Service
                                        </Link>
                                    </li>
                                </ul>
                            </div>
                            <div>
                                <h3 className="text-sm font-semibold text-gray-900 dark:text-white">Connect</h3>
                                <ul className="mt-4 space-y-4">
                                    <li>
                                        <Link
                                            href="#facebook"
                                            className="text-sm text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white"
                                        >
                                            Facebook
                                        </Link>
                                    </li>
                                    <li>
                                        <Link
                                            href="#twitter"
                                            className="text-sm text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white"
                                        >
                                            Twitter
                                        </Link>
                                    </li>
                                    <li>
                                        <Link
                                            href="#linkedin"
                                            className="text-sm text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white"
                                        >
                                            LinkedIn
                                        </Link>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div className="mt-8 border-t border-gray-200 pt-8 dark:border-gray-700">
                            <p className="text-sm text-gray-500 dark:text-gray-400">
                                © {new Date().getFullYear()} AcademicAide. All rights reserved.
                            </p>
                        </div>
                    </div>
                </footer>
            </div>
        </>
    );
}
