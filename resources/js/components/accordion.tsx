import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';

const Accordion = () => {
    const [activeIndex, setActiveIndex] = useState<number | null>(null);

    const toggleAccordion = (index: number) => {
        setActiveIndex(activeIndex === index ? null : index);
    };

    const faqItems = [
        {
            question: 'How long does it take to complete an academic paper?',
            answer: 'Our standard delivery time is 3-5 days for most papers. However, we offer expedited options starting from 6 hours for urgent requests. The exact timeframe depends on the complexity, length, and academic level of your paper.',
        },
        {
            question: 'What qualifications do your writers have?',
            answer: "All our writers hold at least a Master's degree in their field of expertise, with 60% holding PhDs. They undergo a rigorous 4-stage selection process and are native English speakers with proven academic writing experience.",
        },
        {
            question: 'Can I request revisions if needed?',
            answer: "Yes, we offer unlimited free revisions within 14 days of paper delivery. Our writers will work with you until you're completely satisfied with the final result, ensuring it meets all your requirements.",
        },
        {
            question: 'How do you ensure the originality of papers?',
            answer: "Every paper undergoes thorough plagiarism checks using Turnitin and Copyscape. We guarantee 100% original work with a money-back promise. You'll receive a detailed plagiarism report with your completed paper.",
        },
        {
            question: 'What if I need to communicate with my writer?',
            answer: "You'll have direct communication access to your assigned writer through our secure messaging system. You can discuss requirements, ask questions, and request updates throughout the writing process.",
        },
    ];

    return (
        <section className="bg-gradient-to-br from-slate-50 to-slate-100 py-16">
            <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
                <div className="mb-16 text-center">
                    <h2 className="text-4xl font-bold tracking-tight text-slate-900">Frequently Asked Questions</h2>
                    <div className="mx-auto mt-4 h-1 w-24 rounded-full bg-orange-600"></div>
                    <p className="mx-auto mt-6 max-w-2xl text-xl text-slate-600">
                        Find answers to common questions about our academic writing services
                    </p>
                </div>

                <div className="space-y-4">
                    {faqItems.map((item, index) => (
                        <div key={index} className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
                            <button
                                className="flex w-full items-center justify-between p-6 text-left focus:outline-none"
                                onClick={() => toggleAccordion(index)}
                            >
                                <h3 className="pr-4 text-lg font-bold text-slate-900 md:text-xl">{item.question}</h3>
                                <motion.div
                                    animate={{ rotate: activeIndex === index ? 180 : 0 }}
                                    transition={{ duration: 0.3 }}
                                    className="flex-shrink-0"
                                >
                                    <svg className="h-6 w-6 text-orange-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                    </svg>
                                </motion.div>
                            </button>

                            <AnimatePresence>
                                {activeIndex === index && (
                                    <motion.div
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{
                                            height: 'auto',
                                            opacity: 1,
                                            transition: {
                                                height: { duration: 0.3 },
                                                opacity: { duration: 0.2, delay: 0.1 },
                                            },
                                        }}
                                        exit={{
                                            height: 0,
                                            opacity: 0,
                                            transition: {
                                                height: { duration: 0.3 },
                                                opacity: { duration: 0.1 },
                                            },
                                        }}
                                        className="overflow-hidden"
                                    >
                                        <div className="px-6 pb-6 text-slate-600">
                                            {item.answer}
                                            {index === 0 && (
                                                <div className="mt-4 flex flex-wrap gap-3">
                                                    {['3-5 days', '24 hours', '12 hours', '6 hours'].map((time, i) => (
                                                        <span
                                                            key={i}
                                                            className={`rounded-full px-3 py-1 text-sm font-medium ${
                                                                i === 0 ? 'bg-orange-100 text-orange-800' : 'bg-slate-100 text-slate-800'
                                                            }`}
                                                        >
                                                            {time}
                                                        </span>
                                                    ))}
                                                </div>
                                            )}
                                            {index === 1 && (
                                                <div className="mt-4 grid grid-cols-2 gap-3">
                                                    <div className="flex items-center">
                                                        <div className="mr-2 h-3 w-3 rounded-full bg-orange-500"></div>
                                                        <span>Master's Degree Holders: 40%</span>
                                                    </div>
                                                    <div className="flex items-center">
                                                        <div className="mr-2 h-3 w-3 rounded-full bg-orange-700"></div>
                                                        <span>PhD Holders: 60%</span>
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    ))}
                </div>

                <div className="mt-12 text-center">
                    <p className="mb-6 text-slate-600">Still have questions? Our support team is available 24/7</p>
                    <div className="flex flex-col justify-center gap-4 sm:flex-row">
                        <a
                            href="/contact"
                            className="rounded-full bg-gradient-to-r from-orange-500 to-orange-600 px-8 py-3 font-medium text-white shadow-lg transition-all hover:from-orange-600 hover:to-orange-700 hover:shadow-xl"
                        >
                            Contact Support
                        </a>
                        <a
                            href="/faq"
                            className="rounded-full border-2 border-slate-300 px-8 py-3 font-medium text-slate-700 transition-all hover:border-orange-500 hover:text-orange-600"
                        >
                            View Full FAQ
                        </a>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Accordion;
