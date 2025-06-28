import PageLayout from '@/Layouts/PageLayout';
import { Link } from '@inertiajs/react';

const stats = [
    { label: 'Years of Experience', value: '10+' },
    { label: 'Expert Writers', value: '500+' },
    { label: 'Happy Students', value: '1.5M+' },
    { label: 'Papers Delivered', value: '2M+' },
];

const values = [
    {
        title: 'Academic Excellence',
        description: 'We maintain the highest standards of academic writing and research in every paper we deliver.',
        icon: (
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342M6.75 15a.75.75 0 100-1.5.75.75 0 000 1.5zm0 0v-3.675A55.378 55.378 0 0112 8.443m-7.007 11.55A5.981 5.981 0 006.75 15.75v-1.5"
                />
            </svg>
        ),
    },
    {
        title: 'Original Content',
        description: 'Every paper is written from scratch, ensuring 100% originality and plagiarism-free content.',
        icon: (
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z"
                />
            </svg>
        ),
    },
    {
        title: '24/7 Support',
        description: 'Our customer support team is available round the clock to assist you with any queries.',
        icon: (
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5.25h.008v.008H12v-.008z"
                />
            </svg>
        ),
    },
    {
        title: 'On-time Delivery',
        description: 'We guarantee timely delivery of all papers, even with the tightest deadlines.',
        icon: (
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
        ),
    },
];

export default function About() {
    return (
        <PageLayout
            title="About AcademicAide"
            description="Learn more about our mission to help students achieve academic success through professional writing services."
        >
            {/* Stats Section */}
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

            {/* Mission Section */}
            <div className="mt-16">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Our Mission</h2>
                <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">
                    At AcademicAide, our mission is to empower students to achieve their academic goals by providing high-quality, custom-written
                    papers that meet the highest standards of academic excellence. We believe in supporting students through their educational journey
                    by offering reliable, professional writing services that help them succeed in their studies.
                </p>
            </div>

            {/* Values Section */}
            <div className="mt-16">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Our Values</h2>
                <div className="mt-8 grid grid-cols-1 gap-8 sm:grid-cols-2">
                    {values.map((value) => (
                        <div key={value.title} className="flex flex-col rounded-2xl bg-white p-8 shadow-sm ring-1 ring-gray-900/5 dark:bg-gray-700">
                            <div className="flex items-center gap-x-4">
                                <div className="rounded-lg bg-blue-600 p-2 text-white">{value.icon}</div>
                                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{value.title}</h3>
                            </div>
                            <p className="mt-4 text-sm text-gray-600 dark:text-gray-300">{value.description}</p>
                        </div>
                    ))}
                </div>
            </div>

            {/* CTA Section */}
            <div className="mt-16 text-center">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Ready to get started?</h2>
                <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">
                    Join thousands of students who trust AcademicAide for their academic success.
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
