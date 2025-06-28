import PageLayout from '@/Layouts/PageLayout';
import { Link } from '@inertiajs/react';

const features = [
    {
        title: 'Custom Written',
        description: 'Every essay is written from scratch according to your specific requirements.',
    },
    {
        title: 'Expert Writers',
        description: 'Our writers hold advanced degrees and have extensive experience in academic writing.',
    },
    {
        title: 'Plagiarism Free',
        description: 'All essays are checked for plagiarism using advanced detection software.',
    },
    {
        title: 'On-time Delivery',
        description: 'We guarantee timely delivery, even with the tightest deadlines.',
    },
];

const steps = [
    {
        number: '01',
        title: 'Place Your Order',
        description: 'Fill out the order form with your essay requirements, deadline, and any specific instructions.',
    },
    {
        number: '02',
        title: 'Choose Your Writer',
        description: 'Select from our pool of expert writers based on their qualifications and ratings.',
    },
    {
        number: '03',
        title: 'Track Progress',
        description: 'Monitor the progress of your essay and communicate with your writer through our platform.',
    },
    {
        number: '04',
        title: 'Download Your Essay',
        description: 'Review and download your completed essay. Request revisions if needed.',
    },
];

const pricing = [
    {
        title: 'High School',
        price: '$12.99',
        features: ['500 words', 'Standard quality', '14 days deadline', 'Free revisions'],
    },
    {
        title: 'College',
        price: '$14.99',
        features: ['500 words', 'Premium quality', '10 days deadline', 'Free revisions'],
        popular: true,
    },
    {
        title: 'University',
        price: '$16.99',
        features: ['500 words', 'Top quality', '7 days deadline', 'Free revisions'],
    },
];

export default function CustomEssay() {
    return (
        <PageLayout
            title="Custom Essay Writing Service"
            description="Get a professionally written custom essay tailored to your specific requirements and academic level."
        >
            {/* Hero Section */}
            <div className="relative isolate overflow-hidden bg-blue-600 py-24 sm:py-32">
                <div className="mx-auto max-w-7xl px-6 lg:px-8">
                    <div className="mx-auto max-w-2xl lg:mx-0">
                        <h2 className="text-4xl font-bold tracking-tight text-white sm:text-6xl">Professional Custom Essay Writing Service</h2>
                        <p className="mt-6 text-lg leading-8 text-blue-100">
                            Get a high-quality custom essay written by expert academic writers. We guarantee originality, timely delivery, and
                            complete satisfaction.
                        </p>
                        <div className="mt-10 flex items-center gap-x-6">
                            <Link
                                href={route('register')}
                                className="rounded-md bg-white px-6 py-3 text-lg font-semibold text-blue-600 shadow-sm hover:bg-blue-50"
                            >
                                Order Now
                            </Link>
                            <Link href="#pricing" className="text-lg leading-6 font-semibold text-white">
                                View Pricing <span aria-hidden="true">→</span>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

            {/* Features Section */}
            <div className="bg-white py-24 sm:py-32 dark:bg-gray-800">
                <div className="mx-auto max-w-7xl px-6 lg:px-8">
                    <div className="mx-auto max-w-2xl lg:text-center">
                        <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl dark:text-white">
                            Why Choose Our Custom Essay Writing Service?
                        </h2>
                    </div>
                    <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
                        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
                            {features.map((feature) => (
                                <div
                                    key={feature.title}
                                    className="flex flex-col rounded-2xl bg-white p-8 shadow-sm ring-1 ring-gray-900/5 dark:bg-gray-700"
                                >
                                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{feature.title}</h3>
                                    <p className="mt-4 text-sm text-gray-600 dark:text-gray-300">{feature.description}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* How It Works Section */}
            <div className="bg-gray-50 py-24 sm:py-32 dark:bg-gray-900">
                <div className="mx-auto max-w-7xl px-6 lg:px-8">
                    <div className="mx-auto max-w-2xl lg:text-center">
                        <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl dark:text-white">How It Works</h2>
                    </div>
                    <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
                        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
                            {steps.map((step) => (
                                <div
                                    key={step.number}
                                    className="relative flex flex-col rounded-2xl bg-white p-8 shadow-sm ring-1 ring-gray-900/5 dark:bg-gray-700"
                                >
                                    <div className="absolute -top-4 -left-4 flex h-8 w-8 items-center justify-center rounded-full bg-blue-600 text-sm font-semibold text-white">
                                        {step.number}
                                    </div>
                                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{step.title}</h3>
                                    <p className="mt-4 text-sm text-gray-600 dark:text-gray-300">{step.description}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Pricing Section */}
            <div id="pricing" className="bg-white py-24 sm:py-32 dark:bg-gray-800">
                <div className="mx-auto max-w-7xl px-6 lg:px-8">
                    <div className="mx-auto max-w-2xl lg:text-center">
                        <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl dark:text-white">Simple, Transparent Pricing</h2>
                        <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-300">
                            Choose the perfect plan for your academic needs. All prices are per page (500 words).
                        </p>
                    </div>
                    <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-8 sm:mt-20 lg:mx-0 lg:max-w-none lg:grid-cols-3">
                        {pricing.map((plan) => (
                            <div
                                key={plan.title}
                                className={`flex flex-col rounded-2xl bg-white p-8 shadow-sm ring-1 ring-gray-900/5 dark:bg-gray-700 ${
                                    plan.popular ? 'ring-2 ring-blue-600' : ''
                                }`}
                            >
                                {plan.popular && (
                                    <div className="-mt-2 mb-4 inline-flex items-center rounded-full bg-blue-600 px-3 py-1 text-sm font-semibold text-white">
                                        Most Popular
                                    </div>
                                )}
                                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{plan.title}</h3>
                                <p className="mt-4 text-3xl font-bold text-gray-900 dark:text-white">{plan.price}</p>
                                <p className="mt-1 text-sm text-gray-600 dark:text-gray-300">per page</p>
                                <ul className="mt-8 space-y-4">
                                    {plan.features.map((feature) => (
                                        <li key={feature} className="flex items-center text-sm text-gray-600 dark:text-gray-300">
                                            <svg
                                                className="mr-3 h-5 w-5 flex-shrink-0 text-blue-600"
                                                viewBox="0 0 20 20"
                                                fill="currentColor"
                                                aria-hidden="true"
                                            >
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
                                <div className="mt-8">
                                    <Link
                                        href={route('register')}
                                        className={`block w-full rounded-md px-4 py-2 text-center text-sm font-semibold ${
                                            plan.popular
                                                ? 'bg-blue-600 text-white hover:bg-blue-500'
                                                : 'bg-gray-100 text-gray-900 hover:bg-gray-200 dark:bg-gray-600 dark:text-white dark:hover:bg-gray-500'
                                        }`}
                                    >
                                        Get Started
                                    </Link>
                                </div>
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
                                Order Now
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </PageLayout>
    );
}
