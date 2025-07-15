import { useEffect, useRef, useState } from 'react';

// Academic Excellence Section Component
const AcademicExcellenceSection = () => {
    const [activeStrategy, setActiveStrategy] = useState(0);
    const [highlightStyle, setHighlightStyle] = useState<React.CSSProperties>({});
    const buttonRefs = [useRef<HTMLButtonElement>(null), useRef<HTMLButtonElement>(null)];
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const activeBtn = buttonRefs[activeStrategy].current;
        const container = containerRef.current;
        if (activeBtn && container) {
            const btnRect = activeBtn.getBoundingClientRect();
            const containerRect = container.getBoundingClientRect();
            setHighlightStyle({
                top: btnRect.top - containerRect.top + 'px',
                left: btnRect.left - containerRect.left + 'px',
                width: btnRect.width + 'px',
                height: btnRect.height + 'px',
            });
        }
    }, [activeStrategy]);

    // Strategies Data
    const strategies = [
        {
            id: 0,
            title: 'Early Bird Advantage',
            number: '01',
            description: 'Reserve expert help 7+ days in advance to unlock significant benefits:',
            benefits: [
                'Save up to 30% with early orders',
                'First pick of top-rated writers in your field',
                'Ample time for multiple revisions and refinements',
            ],
        },
        {
            id: 1,
            title: 'Precision Writer Matching',
            number: '02',
            description: 'Our rigorous selection process ensures perfect alignment:',
            benefits: [
                'PhD-verified experts in your specific discipline',
                'Writers with proven track records in your subject',
                'Direct communication channels for real-time collaboration',
            ],
        },
    ];

    // Revision Features Data
    const revisionFeatures = [
        {
            id: 1,
            title: 'Cost-Free Refinements',
            description:
                'Comprehensive adjustments including formatting compliance (APA/MLA/Chicago), citation optimization, and structural enhancements - zero additional costs.',
        },
        {
            id: 2,
            title: 'Expert Continuity Assurance',
            description: 'Retention of your original PhD-qualified writer throughout all revision cycles, maintaining deep subject expertise.',
        },
        {
            id: 3,
            title: 'Priority Revision Support',
            description: 'Expedited assistance protocol with 2-hour response guarantee and 24/7 availability.',
        },
    ];

    // Stats Data
    const stats = [
        { value: '92%', label: 'B+ or Higher Grades' },
        { value: '68%', label: 'Score Improvements' },
        { value: '24/7', label: 'Support Availability' },
        { value: '0$', label: 'Extra Fees' },
    ];

    return (
        <section className="bg-gradient-to-b from-slate-50 to-slate-100 py-12 sm:py-16">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                {/* Section Header */}
                <div className="mb-12 text-center sm:mb-16">
                    <h2 className="text-3xl font-bold text-slate-900 sm:text-4xl">
                        Smart Academic <span className="text-orange-600">Excellence</span>
                    </h2>
                    <div className="mx-auto mt-4 h-1 w-20 rounded-full bg-orange-600 sm:w-24"></div>
                    <p className="mx-auto mt-6 max-w-2xl text-base text-slate-600 sm:max-w-3xl sm:text-xl">
                        Proven strategies and frameworks to elevate your academic performance
                    </p>
                </div>

                {/* Strategies Section */}
                <div className="mb-14 sm:mb-20">
                    <div className="mb-10 flex justify-center">
                        <div
                            ref={containerRef}
                            className="justify-center inline-flex relative w-full max-w-md flex-col items-center rounded-2xl bg-gradient-to-r from-slate-50 to-white p-1 shadow-lg sm:flex-row sm:rounded-full"
                        >
                            {/* Dynamic highlight */}
                            <div
                                className="absolute rounded-2xl bg-orange-600 transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)]"
                                style={highlightStyle}
                            />
                            {strategies.map((strategy, index) => (
                                <button
                                    key={strategy.id}
                                    ref={buttonRefs[index]}
                                    onClick={() => setActiveStrategy(index)}
                                    className={`relative z-10 w-full rounded-2xl px-6 py-4 text-lg font-semibold transition-colors duration-300 focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 focus:outline-none sm:w-auto sm:rounded-full sm:py-3 ${
                                        activeStrategy === index ? 'text-white' : 'text-slate-700 hover:text-orange-600'
                                    } ${index > 0 ? 'mt-2 sm:mt-0 sm:ml-2' : ''}`}
                                >
                                    <div className="flex items-center justify-center">
                                        <div className={`mr-3 h-2 w-2 rounded-full ${activeStrategy === index ? 'bg-white' : 'bg-orange-600'}`} />
                                        <span>Strategy {strategy.number}</span>
                                    </div>
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Strategy Content */}
                    <div className="overflow-hidden rounded-2xl bg-white shadow-lg">
                        <div className="flex flex-col md:grid md:grid-cols-3">
                            {/* Number & Title */}
                            <div className="flex flex-col items-center justify-center bg-orange-600 p-8 text-center sm:p-10">
                                <div className="mb-2 text-6xl font-bold text-white opacity-20 sm:mb-4 sm:text-8xl">
                                    {strategies[activeStrategy].number}
                                </div>
                                <h3 className="text-2xl font-bold text-white sm:text-3xl">{strategies[activeStrategy].title}</h3>
                            </div>

                            {/* Description & Benefits */}
                            <div className="p-6 sm:p-10 md:col-span-2">
                                <p className="mb-4 text-base text-slate-700 sm:mb-6 sm:text-xl">{strategies[activeStrategy].description}</p>
                                <div className="space-y-3 sm:space-y-4">
                                    {strategies[activeStrategy].benefits.map((benefit, index) => (
                                        <div key={index} className="flex items-start">
                                            <div className="mt-1 flex-shrink-0">
                                                <div className="flex h-6 w-6 items-center justify-center rounded-full bg-orange-100">
                                                    <svg className="h-4 w-4 text-orange-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                                    </svg>
                                                </div>
                                            </div>
                                            <p className="ml-3 text-sm text-slate-700 sm:ml-4 sm:text-lg">{benefit}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Revision Excellence Section */}
                <div className="overflow-hidden rounded-2xl bg-slate-900 shadow-xl">
                    <div className="p-6 sm:p-10">
                        <div className="mx-auto max-w-4xl">
                            {/* Revision Header */}
                            <div className="mb-8 text-center sm:mb-12">
                                <h2 className="mb-2 text-2xl font-bold text-white sm:mb-4 sm:text-3xl">
                                    Revision <span className="text-orange-400">Excellence</span> Framework
                                </h2>
                                <p className="mx-auto max-w-xl text-sm text-orange-200 sm:max-w-2xl sm:text-base">
                                    Unlimited refinement protocol ensuring academic perfection across all disciplines
                                </p>
                            </div>

                            {/* Revision Features */}
                            <div className="mb-8 grid grid-cols-1 gap-4 sm:mb-12 sm:gap-6 md:grid-cols-3">
                                {revisionFeatures.map((feature) => (
                                    <div
                                        key={feature.id}
                                        className="rounded-xl border border-slate-700 bg-gradient-to-br from-slate-800 to-slate-900 p-4 transition-all hover:border-orange-500 sm:p-6"
                                    >
                                        <div className="mb-3 flex items-center sm:mb-4">
                                            <div className="mr-3 flex h-8 w-8 items-center justify-center rounded-lg bg-orange-600 text-lg font-bold text-white sm:mr-4 sm:h-10 sm:w-10 sm:text-xl">
                                                {feature.id}
                                            </div>
                                            <h3 className="text-base font-bold text-white sm:text-xl">{feature.title}</h3>
                                        </div>
                                        <p className="text-sm text-slate-300 sm:text-base">{feature.description}</p>
                                    </div>
                                ))}
                            </div>

                            {/* Stats */}
                            <div className="rounded-xl bg-gradient-to-r from-orange-900/20 to-slate-800/50 p-4 backdrop-blur-sm sm:p-6">
                                <div className="grid grid-cols-2 gap-4 sm:gap-6 md:grid-cols-4">
                                    {stats.map((stat, index) => (
                                        <div key={index} className="text-center">
                                            <div className="mb-1 text-2xl font-bold text-orange-400 sm:mb-2 sm:text-3xl md:text-4xl">
                                                {stat.value}
                                            </div>
                                            <div className="text-xs font-medium text-orange-200 sm:text-sm">{stat.label}</div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Enhanced CTA */}
                    <div className="bg-gradient-to-r from-orange-700 to-orange-600 p-6 sm:p-10">
                        <div className="mx-auto max-w-4xl">
                            <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
                                {/* CTA Text */}
                                <div className="md:mr-10">
                                    <h3 className="mb-1 text-xl font-bold text-white sm:mb-2 sm:text-2xl">Ready for Academic Success?</h3>
                                    <p className="max-w-xl text-sm text-orange-100 sm:text-base">
                                        Join thousands of students who trust our expert writers for their most important assignments
                                    </p>
                                </div>

                                {/* CTA Buttons */}
                                <div className="flex w-full flex-col gap-3 sm:flex-row sm:gap-4 md:w-auto">
                                    <a
                                        href="#"
                                        className="w-full rounded-lg bg-white px-6 py-3 text-center font-bold text-orange-600 shadow-lg transition-all hover:bg-slate-100 hover:shadow-xl sm:w-auto"
                                    >
                                        Get Started
                                    </a>
                                    
                                </div>
                            </div>

                            {/* CTA Features */}
                            <div className="mt-6 border-t border-orange-500/30 pt-4 sm:mt-8 sm:pt-6">
                                <div className="flex flex-wrap justify-center gap-3 text-xs text-orange-100 sm:gap-4 sm:text-sm">
                                    <div className="flex items-center">
                                        <svg className="mr-1 h-4 w-4 sm:mr-2 sm:h-5 sm:w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                        </svg>
                                        100% Original Work
                                    </div>
                                    <div className="flex items-center">
                                        <svg className="mr-1 h-4 w-4 sm:mr-2 sm:h-5 sm:w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                        </svg>
                                        24/7 Support
                                    </div>
                                    <div className="flex items-center">
                                        <svg className="mr-1 h-4 w-4 sm:mr-2 sm:h-5 sm:w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                        </svg>
                                        Money-Back Guarantee
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default AcademicExcellenceSection;
