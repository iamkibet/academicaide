import PageLayout from '@/Layouts/PageLayout';
import { Link } from '@inertiajs/react';

const writers = [
    {
        name: 'Edward M.',
        rating: 4.9,
        degree: "Master's degree",
        subjects: ['Business and Management'],
        completedOrders: 1250,
        reviews: 980,
    },
    {
        name: 'Stephanie S.',
        rating: 4.9,
        degree: "Bachelor's degree",
        subjects: ['English', 'History'],
        completedOrders: 980,
        reviews: 850,
    },
    {
        name: 'Maison T.',
        rating: 4.9,
        degree: "Bachelor's degree",
        subjects: ['Psychology', 'Criminology'],
        completedOrders: 750,
        reviews: 680,
    },
    {
        name: 'Martin S.',
        rating: 4.8,
        degree: "Master's degree",
        subjects: ['Education', 'Social work'],
        completedOrders: 620,
        reviews: 580,
    },
    {
        name: 'Diana C.',
        rating: 5.0,
        degree: "Bachelor's degree",
        subjects: ['Nursing', 'Healthcare'],
        completedOrders: 890,
        reviews: 820,
    },
];

export default function Writers() {
    return (
        <PageLayout
            title="Our Professional Writers"
            description="Meet our team of expert writers who are ready to help you achieve academic success."
        >
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
                {writers.map((writer) => (
                    <div key={writer.name} className="flex flex-col rounded-2xl bg-white p-8 shadow-sm ring-1 ring-gray-900/5 dark:bg-gray-700">
                        <div className="flex items-center gap-x-4">
                            <div className="text-lg font-semibold text-gray-900 dark:text-white">{writer.name}</div>
                            <div className="text-sm text-blue-600 dark:text-blue-400">{writer.rating} ★</div>
                        </div>
                        <div className="mt-4 text-sm text-gray-600 dark:text-gray-300">{writer.degree}</div>
                        <div className="mt-2 text-sm text-gray-600 dark:text-gray-300">{writer.subjects.join(' • ')}</div>
                        <div className="mt-4 flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
                            <div>{writer.completedOrders} orders completed</div>
                            <div>{writer.reviews} reviews</div>
                        </div>
                        <div className="mt-6">
                            <Link
                                href={route('register')}
                                className="block w-full rounded-md bg-blue-600 px-4 py-2 text-center text-sm font-semibold text-white hover:bg-blue-500"
                            >
                                Hire Writer
                            </Link>
                        </div>
                    </div>
                ))}
            </div>
        </PageLayout>
    );
}
