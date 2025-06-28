import PageLayout from '@/Layouts/PageLayout';
import { Link } from '@inertiajs/react';

const services = [
    {
        title: 'Custom Essay Writing',
        description: 'Get a professionally written essay tailored to your specific requirements and academic level.',
        icon: (
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25"
                />
            </svg>
        ),
        link: route('services.custom-essay'),
    },
    {
        title: 'Dissertation Writing',
        description: 'Expert assistance with your dissertation, from proposal to final submission.',
        icon: (
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"
                />
            </svg>
        ),
        link: route('services.dissertation'),
    },
    {
        title: 'Research Paper',
        description: 'Comprehensive research papers with proper citations and academic formatting.',
        icon: (
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25"
                />
            </svg>
        ),
        link: route('services.research-paper'),
    },
    {
        title: 'Term Paper',
        description: 'Well-researched term papers that meet your course requirements and deadlines.',
        icon: (
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"
                />
            </svg>
        ),
        link: route('services.term-paper'),
    },
    {
        title: 'Admission Essay',
        description: 'Compelling admission essays that help you stand out to college admissions committees.',
        icon: (
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342M6.75 15a.75.75 0 100-1.5.75.75 0 000 1.5zm0 0v-3.675A55.378 55.378 0 0112 8.443m-7.007 11.55A5.981 5.981 0 006.75 15.75v-1.5"
                />
            </svg>
        ),
        link: route('services.admission-essay'),
    },
    {
        title: 'Essay Editing',
        description: 'Professional editing services to polish your essays and improve your grades.',
        icon: (
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                />
            </svg>
        ),
        link: route('services.essay-editing'),
    },
];

const features = [
    {
        title: 'Expert Writers',
        description: 'Our team consists of experienced academic writers with advanced degrees.',
    },
    {
        title: '100% Original',
        description: 'Every paper is written from scratch and checked for plagiarism.',
    },
    {
        title: 'On-time Delivery',
        description: 'We guarantee timely delivery of all papers, even with tight deadlines.',
    },
    {
        title: '24/7 Support',
        description: 'Our customer support team is available round the clock to assist you.',
    },
];

export default function Services() {
    return (
        <PageLayout title="Our Writing Services" description="Professional writing services to help you achieve academic success.">
            {/* Services Grid */}
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
                {services.map((service) => (
                    <Link
                        key={service.title}
                        href={service.link}
                        className="flex flex-col rounded-2xl bg-white p-8 shadow-sm ring-1 ring-gray-900/5 hover:ring-blue-500 dark:bg-gray-700"
                    >
                        <div className="flex items-center gap-x-4">
                            <div className="rounded-lg bg-blue-600 p-2 text-white">{service.icon}</div>
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{service.title}</h3>
                        </div>
                        <p className="mt-4 text-sm text-gray-600 dark:text-gray-300">{service.description}</p>
                    </Link>
                ))}
            </div>

            {/* Features Section */}
            <div className="mt-16">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Why Choose Our Services?</h2>
                <div className="mt-8 grid grid-cols-1 gap-8 sm:grid-cols-2">
                    {features.map((feature) => (
                        <div key={feature.title} className="flex flex-col rounded-2xl bg-white p-8 shadow-sm ring-1 ring-gray-900/5 dark:bg-gray-700">
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{feature.title}</h3>
                            <p className="mt-4 text-sm text-gray-600 dark:text-gray-300">{feature.description}</p>
                        </div>
                    ))}
                </div>
            </div>

            {/* CTA Section */}
            <div className="mt-16 text-center">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Ready to get started?</h2>
                <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">
                    Choose your service and let our expert writers help you achieve academic success.
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
