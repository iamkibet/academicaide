import { DateTimeInput, FormField, NumberInput, SelectInput, SubmitButton, Textarea, TextInput } from '@/components/ui/FormComponents';
import {
    CARD_ENTER,
    CARD_INITIAL,
    CARD_TRANSITION,
    FeatureCard,
    SectionWrapper,
    TestimonialCard,
    WriterCard,
} from '@/components/ui/SectionComponents';
import GuestLayout from '@/layouts/GuestLayout';
import { AcademicCapIcon, CheckCircleIcon, ClockIcon, DocumentTextIcon, RocketLaunchIcon, ShieldCheckIcon } from '@heroicons/react/24/outline';
import { Head, Link, useForm } from '@inertiajs/react';
import { AnimatePresence, motion } from 'framer-motion';
import { ChangeEvent, FormEvent } from 'react';
import { useInView } from 'react-intersection-observer';

// Configuration
const WRITERS = [
    {
        name: 'Edward M.',
        rating: 4.9,
        degree: "Master's degree",
        subjects: ['Business and Management'],
    },
    {
        name: 'Stephanie S.',
        rating: 4.9,
        degree: "Bachelor's degree",
        subjects: ['English', 'History'],
    },
    {
        name: 'Maison T.',
        rating: 4.9,
        degree: "Bachelor's degree",
        subjects: ['Psychology', 'Criminology'],
    },
    {
        name: 'Martin S.',
        rating: 4.8,
        degree: "Master's degree",
        subjects: ['Education', 'Social work'],
    },
    {
        name: 'Diana C.',
        rating: 5.0,
        degree: "Bachelor's degree",
        subjects: ['Nursing', 'Healthcare'],
    },
];

const TESTIMONIALS = [
    {
        writer: 'Kaylin G.',
        type: 'Research paper',
        content: 'The experts are super friendly and respond within few minutes. And the content they deliver is always on flick. Thanks!',
        customerId: '#315479',
        date: 'Mar 11, 2024',
    },
    {
        writer: 'Kate D.',
        type: 'Coursework',
        content: 'The expert finished my paper a few days before the deadline and the writing was lit.',
        customerId: '#315400',
        date: 'Mar 6, 2024',
    },
    {
        writer: 'Colton M.',
        type: 'Essay',
        content: 'I was looking for someone who can write essay for me. The writer I chose was very quick and the essay was well written.',
        customerId: '#315358',
        date: 'Feb 22, 2024',
    },
];

const FEATURES = [
    {
        title: 'Original writing',
        description:
            "Our essay writing service guarantees high originality. Our experts don't copy-paste or use AI to write a paper, maintaining authenticity.",
    },
    {
        title: '24/7 support by your side',
        description:
            'You can ask us to "write my essay for me" anytime, even in the middle of the night. Our customer service team is available around the clock.',
    },
    {
        title: 'Personal data safety',
        description:
            'Hire a paper writer without worrying about the security of your personal and financial information. We prioritize your data security.',
    },
    {
        title: 'Unlimited edits free of charge',
        description:
            'Enjoy free revisions within 14 to 30 days after order completion. Our expert essay writers are committed to ensuring your paper meets your requirements.',
    },
];

type FormData = {
    type: string;
    deadline: string;
    pages: string;
    subject: string;
    instructions: string;
};

export default function Welcome() {
    const { data, setData, post, processing, errors } = useForm<FormData>({
        type: '',
        deadline: '',
        pages: '',
        subject: '',
        instructions: '',
    });

    // Intersection observers for scroll animations
    const [heroRef, heroInView] = useInView({ threshold: 0.1, triggerOnce: true });
    const [writersRef, writersInView] = useInView({ threshold: 0.1, triggerOnce: true });
    const [testimonialsRef, testimonialsInView] = useInView({ threshold: 0.1, triggerOnce: true });
    const [featuresRef, featuresInView] = useInView({ threshold: 0.1, triggerOnce: true });

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        post(route('orders.store'));
    };

    const handleChange = (field: keyof FormData) => (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        setData(field, e.target.value);
    };

    return (
        <GuestLayout>
            <Head title="Welcome to AcademicAide">
                <link href="https://fonts.bunny.net/css?family=inter:400,500,600,700" rel="stylesheet" />
            </Head>

            {/* Hero Section */}
            <section ref={heroRef} className="relative overflow-hidden bg-gradient-to-b from-blue-50 to-white dark:from-gray-900 dark:to-gray-800">
                {/* Decorative background elements */}
                <div className="absolute inset-0 -z-10">
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900 dark:to-blue-800" />
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 blur-3xl xl:-top-6" aria-hidden="true">
                        <div
                            className="aspect-[1155/678] w-[72.1875rem] bg-gradient-to-tr from-blue-200 to-blue-400 opacity-30"
                            style={{
                                clipPath:
                                    'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
                            }}
                        />
                    </div>
                </div>

                <div className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8 lg:py-32">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={heroInView ? CARD_ENTER : CARD_INITIAL}
                        transition={CARD_TRANSITION}
                        className="grid items-center gap-16 lg:grid-cols-2"
                    >
                        <div className="space-y-8">
                            <div className="inline-flex items-center rounded-full bg-blue-100 px-4 py-1.5 text-sm font-medium text-blue-600 dark:bg-blue-900 dark:text-blue-300">
                                <AcademicCapIcon className="mr-2 h-5 w-5" />
                                Trusted by 10,000+ Students
                            </div>
                            <h1 className="text-5xl leading-[1.15] font-bold tracking-tight text-gray-900 dark:text-white">
                                Transform Academic Stress
                                <br />
                                <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Into Success</span>
                            </h1>
                            <p className="text-xl leading-relaxed text-gray-600 dark:text-gray-300">
                                Premium writing assistance with 24/7 expert support, guaranteed originality, and on-time delivery.
                            </p>

                            <div className="grid gap-4 sm:grid-cols-2">
                                <div className="flex items-center gap-3 rounded-lg bg-white p-4 shadow-sm dark:bg-gray-800">
                                    <div className="rounded-full bg-green-100 p-2 dark:bg-green-900">
                                        <CheckCircleIcon className="h-5 w-5 text-green-600 dark:text-green-300" />
                                    </div>
                                    <div>
                                        <p className="font-medium text-gray-900 dark:text-white">4.9/5 Rating</p>
                                        <p className="text-sm text-gray-500 dark:text-gray-400">Expert Writers</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3 rounded-lg bg-white p-4 shadow-sm dark:bg-gray-800">
                                    <div className="rounded-full bg-blue-100 p-2 dark:bg-blue-900">
                                        <ClockIcon className="h-5 w-5 text-blue-600 dark:text-blue-300" />
                                    </div>
                                    <div>
                                        <p className="font-medium text-gray-900 dark:text-white">24/7 Support</p>
                                        <p className="text-sm text-gray-500 dark:text-gray-400">Always Available</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Order Form */}
                        <motion.div initial={{ scale: 0.95 }} animate={{ scale: 1 }} className="group relative">
                            <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-600 to-purple-600 opacity-20 blur-xl filter transition-opacity duration-300 group-hover:opacity-30" />

                            <form
                                onSubmit={handleSubmit}
                                className="relative rounded-2xl border border-gray-100 bg-white p-8 shadow-2xl shadow-blue-100/50 dark:border-gray-700 dark:bg-gray-800 dark:shadow-none"
                            >
                                <div className="mb-8 flex items-center justify-between">
                                    <div>
                                        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Start Your Order</h2>
                                        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">Quick and easy process</p>
                                    </div>
                                    <div className="rounded-lg bg-blue-100 p-2 dark:bg-blue-900">
                                        <DocumentTextIcon className="h-6 w-6 text-blue-600 dark:text-blue-300" />
                                    </div>
                                </div>

                                <div className="space-y-6">
                                    <FormField label="Type of Paper" error={errors.type} htmlFor="type">
                                        <SelectInput
                                            id="type"
                                            value={data.type}
                                            onChange={handleChange('type')}
                                            options={[
                                                { value: 'essay', label: 'Essay' },
                                                { value: 'research', label: 'Research Paper' },
                                                { value: 'coursework', label: 'Coursework' },
                                            ]}
                                        />
                                    </FormField>

                                    <FormField label="Deadline" error={errors.deadline} htmlFor="deadline">
                                        <DateTimeInput id="deadline" value={data.deadline} onChange={handleChange('deadline')} />
                                    </FormField>

                                    <FormField label="Number of Pages" error={errors.pages} htmlFor="pages">
                                        <NumberInput id="pages" value={data.pages} onChange={handleChange('pages')} min="1" unit="pages" />
                                    </FormField>

                                    <FormField label="Subject Area" error={errors.subject} htmlFor="subject">
                                        <TextInput
                                            id="subject"
                                            value={data.subject}
                                            onChange={handleChange('subject')}
                                            placeholder="e.g., Business, Psychology"
                                        />
                                    </FormField>

                                    <FormField label="Instructions" error={errors.instructions} htmlFor="instructions">
                                        <Textarea
                                            id="instructions"
                                            value={data.instructions}
                                            onChange={handleChange('instructions')}
                                            rows={3}
                                            placeholder="Detailed requirements, formatting guidelines, etc."
                                        />
                                    </FormField>

                                    <SubmitButton processing={processing} />
                                </div>
                            </form>
                        </motion.div>
                    </motion.div>
                </div>
            </section>

            {/* Writers Section */}
            <SectionWrapper
                title="Meet Our Expert Writers"
                description="Quality-driven professionals with proven academic backgrounds"
                ref={writersRef}
            >
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    <AnimatePresence>
                        {WRITERS.map((writer, idx) => (
                            <motion.div
                                key={writer.name}
                                initial={CARD_INITIAL}
                                animate={writersInView ? CARD_ENTER : CARD_INITIAL}
                                transition={{ ...CARD_TRANSITION, delay: idx * 0.1 }}
                                className="group rounded-xl border border-gray-100 bg-white p-6 shadow-sm transition-all duration-300 hover:scale-[1.02] hover:shadow-md dark:border-gray-700 dark:bg-gray-800"
                            >
                                <WriterCard writer={writer} />
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </div>
            </SectionWrapper>

            {/* Testimonials Section */}
            <SectionWrapper
                title="Student Success Stories"
                description="See how we've helped students achieve academic excellence"
                bgClass="bg-gray-50 dark:bg-gray-900"
                ref={testimonialsRef}
            >
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {TESTIMONIALS.map((testimonial, idx) => (
                        <motion.div
                            key={testimonial.customerId}
                            initial={CARD_INITIAL}
                            animate={testimonialsInView ? CARD_ENTER : CARD_INITIAL}
                            transition={{ ...CARD_TRANSITION, delay: idx * 0.1 }}
                            className="group rounded-xl border border-gray-100 bg-white p-6 shadow-sm transition-all duration-300 hover:scale-[1.02] hover:shadow-md dark:border-gray-700 dark:bg-gray-800"
                        >
                            <TestimonialCard testimonial={testimonial} />
                        </motion.div>
                    ))}
                </div>
            </SectionWrapper>

            {/* Features Section */}
            <SectionWrapper title="Why Choose AcademicAide" ref={featuresRef}>
                <div className="grid gap-6 md:grid-cols-2">
                    {FEATURES.map((feature, idx) => (
                        <motion.div
                            key={feature.title}
                            initial={CARD_INITIAL}
                            animate={featuresInView ? CARD_ENTER : CARD_INITIAL}
                            transition={{ ...CARD_TRANSITION, delay: idx * 0.1 }}
                            className="group rounded-xl border border-gray-100 bg-white p-6 shadow-sm transition-all duration-300 hover:scale-[1.02] hover:shadow-md dark:border-gray-700 dark:bg-gray-800"
                        >
                            <FeatureCard feature={feature} />
                        </motion.div>
                    ))}
                </div>
            </SectionWrapper>

            {/* CTA Section */}
            <div className="relative overflow-hidden bg-gradient-to-r from-blue-600 to-purple-600">
                <div className="absolute inset-0">
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 opacity-90" />
                    <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10" />
                </div>
                <div className="relative mx-auto max-w-7xl px-4 py-20 text-center sm:px-6 lg:px-8">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5 }}
                        className="space-y-6"
                    >
                        <div className="inline-flex items-center rounded-full bg-white/10 px-4 py-1.5 text-sm font-medium text-white backdrop-blur-sm">
                            <ShieldCheckIcon className="mr-2 h-5 w-5" />
                            Secure & Confidential
                        </div>
                        <h2 className="text-4xl font-bold text-white">Ready to Elevate Your Academic Performance?</h2>
                        <p className="mx-auto max-w-2xl text-xl text-blue-100">
                            Join thousands of successful students who trust AcademicAide with their academic goals
                        </p>
                        <div className="mt-8">
                            <Link
                                href={route('register')}
                                className="inline-flex transform items-center rounded-lg bg-white px-8 py-4 font-semibold text-blue-600 shadow-md transition-all duration-200 hover:scale-[1.02] hover:shadow-lg active:scale-95"
                            >
                                <RocketLaunchIcon className="mr-2 h-5 w-5" />
                                Get Started Now
                            </Link>
                        </div>
                    </motion.div>
                </div>
            </div>
        </GuestLayout>
    );
}
