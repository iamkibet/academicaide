import PageLayout from '@/Layouts/PageLayout';
import { Link } from '@inertiajs/react';

const steps = [
    {
        number: '01',
        title: 'Fill out the order form',
        description: 'Provide details about your assignment, including the type of paper, academic level, deadline, and any specific requirements.',
    },
    {
        number: '02',
        title: 'Choose your writer',
        description: 'Browse through our pool of professional writers and select the one that best matches your requirements and preferences.',
    },
    {
        number: '03',
        title: 'Track the progress',
        description: 'Monitor the progress of your order in real-time and communicate with your writer through our messaging system.',
    },
    {
        number: '04',
        title: 'Download your paper',
        description: 'Once your paper is ready, review it and download it. If you need any revisions, we offer unlimited free edits.',
    },
];

export default function HowToOrder() {
    return (
        <PageLayout title="How to Order" description="Follow these simple steps to get your custom-written paper delivered on time.">
            <div className="relative">
                <div className="absolute inset-0 flex items-center" aria-hidden="true">
                    <div className="w-full border-t border-gray-300 dark:border-gray-600" />
                </div>
                <div className="relative flex justify-center">
                    <span className="bg-white px-3 text-base leading-6 font-semibold text-gray-900 dark:bg-gray-800 dark:text-white">
                        Simple 4-Step Process
                    </span>
                </div>
            </div>

            <div className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
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

            <div className="mt-16 text-center">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Ready to get started?</h2>
                <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">
                    Place your order now and get your custom-written paper delivered on time.
                </p>
                <div className="mt-8">
                    <Link
                        href={route('register')}
                        className="inline-block rounded-md bg-blue-600 px-6 py-3 text-lg font-semibold text-white shadow-sm hover:bg-blue-500"
                    >
                        Order Now
                    </Link>
                </div>
            </div>
        </PageLayout>
    );
}
