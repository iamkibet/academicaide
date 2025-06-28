import { motion } from 'framer-motion';
import { ReactNode, forwardRef } from 'react';

// Animation constants
export const CARD_ENTER = { opacity: 1, y: 0 };
export const CARD_INITIAL = { opacity: 0, y: 20 };
export const CARD_TRANSITION = { type: 'spring', stiffness: 300, damping: 25 };

interface SectionWrapperProps {
    title: string;
    description?: string;
    children: ReactNode;
    bgClass?: string;
}

export const SectionWrapper = forwardRef<HTMLElement, SectionWrapperProps>(
    ({ title, description, children, bgClass = '' }, ref) => (
        <section ref={ref} className={`py-24 ${bgClass}`}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <motion.h2
                        initial={CARD_INITIAL}
                        animate={ref ? CARD_ENTER : CARD_INITIAL}
                        transition={CARD_TRANSITION}
                        className="text-3xl font-bold text-gray-900 dark:text-white"
                    >
                        {title}
                    </motion.h2>
                    {description && (
                        <motion.p
                            initial={CARD_INITIAL}
                            animate={ref ? CARD_ENTER : CARD_INITIAL}
                            transition={{ ...CARD_TRANSITION, delay: 0.1 }}
                            className="mt-4 text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto"
                        >
                            {description}
                        </motion.p>
                    )}
                </div>
                {children}
            </div>
        </section>
    )
);

interface WriterCardProps {
    writer: {
        name: string;
        rating: number;
        degree: string;
        subjects: string[];
    };
}

export const WriterCard = ({ writer }: WriterCardProps) => (
    <div className="space-y-4">
        <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{writer.name}</h3>
            <div className="flex items-center text-yellow-400">
                <span className="mr-1">{writer.rating}</span>
                <StarIcon className="w-5 h-5" />
            </div>
        </div>
        <p className="text-sm text-gray-600 dark:text-gray-300">{writer.degree}</p>
        <div className="flex flex-wrap gap-2">
            {writer.subjects.map((subject) => (
                <span
                    key={subject}
                    className="px-2 py-1 text-xs font-medium text-blue-600 bg-blue-100 dark:text-blue-300 dark:bg-blue-900 rounded-full"
                >
                    {subject}
                </span>
            ))}
        </div>
    </div>
);

interface TestimonialCardProps {
    testimonial: {
        writer: string;
        type: string;
        content: string;
        customerId: string;
        date: string;
    };
}

export const TestimonialCard = ({ testimonial }: TestimonialCardProps) => (
    <div className="space-y-4">
        <div className="flex items-center justify-between">
            <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{testimonial.writer}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">{testimonial.type}</p>
            </div>
            <div className="text-sm text-gray-500 dark:text-gray-400">{testimonial.date}</div>
        </div>
        <p className="text-gray-600 dark:text-gray-300">{testimonial.content}</p>
        <div className="text-sm text-gray-500 dark:text-gray-400">Customer ID: {testimonial.customerId}</div>
    </div>
);

interface FeatureCardProps {
    feature: {
        title: string;
        description: string;
    };
}

export const FeatureCard = ({ feature }: FeatureCardProps) => (
    <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{feature.title}</h3>
        <p className="text-gray-600 dark:text-gray-300">{feature.description}</p>
    </div>
);

const StarIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg {...props} fill="currentColor" viewBox="0 0 20 20">
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
    </svg>
); 