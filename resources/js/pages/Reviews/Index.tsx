import PageLayout from '@/Layouts/PageLayout';
import { Link } from '@inertiajs/react';

const testimonials = [
    {
        writer: 'Kaylin G.',
        type: 'Research paper',
        content: 'The experts are super friendly and respond within few minutes. And the content they deliver is always on flick. Thanks!',
        customerId: '#315479',
        date: 'Mar 11, 2024',
        rating: 5,
    },
    {
        writer: 'Kate D.',
        type: 'Coursework',
        content: 'The expert finished my paper a few days before the deadline and the writing was lit.',
        customerId: '#315400',
        date: 'Mar 6, 2024',
        rating: 5,
    },
    {
        writer: 'Colton M.',
        type: 'Essay',
        content: 'I was looking for someone who can write essay for me. The writer I chose was very quick and the essay was well written.',
        customerId: '#315358',
        date: 'Feb 22, 2024',
        rating: 5,
    },
    {
        writer: 'Sarah L.',
        type: 'Dissertation',
        content: 'The quality of work exceeded my expectations. The writer was very professional and delivered on time.',
        customerId: '#315200',
        date: 'Feb 15, 2024',
        rating: 5,
    },
    {
        writer: 'Michael R.',
        type: 'Term Paper',
        content: 'Great service! The writer followed all my instructions and the paper was well-researched.',
        customerId: '#315100',
        date: 'Feb 10, 2024',
        rating: 5,
    },
    {
        writer: 'Emily W.',
        type: 'Admission Essay',
        content: 'The writer helped me craft a compelling admission essay that got me accepted into my dream school!',
        customerId: '#315000',
        date: 'Feb 5, 2024',
        rating: 5,
    },
];

const stats = [
    { label: 'Total Reviews', value: '10,000+' },
    { label: 'Average Rating', value: '4.9/5' },
    { label: 'Satisfied Customers', value: '98%' },
    { label: 'On-time Delivery', value: '99%' },
];

export default function Reviews() {
    return (
        <PageLayout title="Customer Reviews" description="See what our customers are saying about their experience with our writing services.">
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
                {stats.map((stat) => (
                    <div
                        key={stat.label}
                        className="flex flex-col items-center rounded-2xl bg-white p-8 shadow-sm ring-1 ring-gray-900/5 dark:bg-gray-700"
                    >
                        <div className="text-3xl font-bold text-blue-600 dark:text-blue-400">{stat.value}</div>
                        <div className="mt-2 text-sm text-gray-600 dark:text-gray-300">{stat.label}</div>
                    </div>
                ))}
            </div>

            <div className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
                {testimonials.map((testimonial) => (
                    <div
                        key={testimonial.customerId}
                        className="flex flex-col rounded-2xl bg-white p-8 shadow-sm ring-1 ring-gray-900/5 dark:bg-gray-700"
                    >
                        <div className="flex items-center gap-x-4">
                            <div className="text-lg font-semibold text-gray-900 dark:text-white">Writer: {testimonial.writer}</div>
                            <div className="text-sm text-gray-600 dark:text-gray-300">{testimonial.type}</div>
                        </div>
                        <div className="mt-4 flex items-center">
                            {[...Array(testimonial.rating)].map((_, i) => (
                                <svg key={i} className="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                    <path
                                        fillRule="evenodd"
                                        d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401z"
                                        clipRule="evenodd"
                                    />
                                </svg>
                            ))}
                        </div>
                        <p className="mt-4 text-sm text-gray-600 dark:text-gray-300">{testimonial.content}</p>
                        <div className="mt-4 flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
                            <div>Customer ID: {testimonial.customerId}</div>
                            <div>{testimonial.date}</div>
                        </div>
                    </div>
                ))}
            </div>

            <div className="mt-16 text-center">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Ready to experience our service?</h2>
                <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">
                    Join thousands of satisfied customers who trust us with their academic success.
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
