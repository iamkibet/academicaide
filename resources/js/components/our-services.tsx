import {
    AcademicCapIcon,
    ArrowDownTrayIcon,
  
    DocumentTextIcon,
    LightBulbIcon,
 
} from '@heroicons/react/24/outline';
import { useEffect, useState } from 'react';

const ServiceSteps = () => {
    const [activeStep, setActiveStep] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setActiveStep((prev) => (prev + 1) % 3);
        }, 5000);

        return () => clearInterval(interval);
    }, []);

    const steps = [
        {
            title: 'Submit Your Requirements',
            description: 'Provide details about your paper including topic, length, academic level, and deadline.',
            icon: <LightBulbIcon className="h-8 w-8" />,
            color: 'from-indigo-600 to-indigo-800',
            badge: 'bg-indigo-100 text-indigo-800',
        },
        {
            title: 'Expert Writing Process',
            description: 'A qualified academic expert researches, writes, and perfects your paper.',
            icon: <DocumentTextIcon className="h-8 w-8" />,
            color: 'from-blue-600 to-blue-800',
            badge: 'bg-blue-100 text-blue-800',
        },
        {
            title: 'Receive & Review',
            description: 'Download your completed paper, review it, and request revisions if needed.',
            icon: <ArrowDownTrayIcon className="h-8 w-8" />,
            color: 'from-teal-600 to-teal-800',
            badge: 'bg-teal-100 text-teal-800',
        },
    ];

    return (
        <section className="relative w-full overflow-hidden bg-gradient-to-br from-slate-50 to-indigo-50 py-16 md:py-24">
            {/* Decorative elements */}
            <div className="animate-blob absolute top-20 left-0 h-64 w-64 rounded-full bg-indigo-200 opacity-30 mix-blend-multiply blur-3xl filter"></div>
            <div className="animate-blob animation-delay-2000 absolute top-40 right-20 h-72 w-72 rounded-full bg-blue-200 opacity-30 mix-blend-multiply blur-3xl filter"></div>
            <div className="animate-blob animation-delay-4000 absolute bottom-10 left-1/3 h-80 w-80 rounded-full bg-teal-200 opacity-30 mix-blend-multiply blur-3xl filter"></div>

            <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="mb-16 text-center">
                    <div className="mb-4 inline-flex items-center justify-center rounded-full bg-indigo-100 px-6 py-1.5 text-sm font-medium text-indigo-800">
                        <AcademicCapIcon className="mr-2 h-5 w-5" />
                        Academic Excellence
                    </div>
                    <h2 className="relative mb-4 pb-2 text-3xl font-bold text-slate-800 md:text-4xl">
                        How Our Academic Service Works
                        <div className="absolute bottom-0 left-1/2 h-1 w-24 -translate-x-1/2 transform rounded-full bg-gradient-to-r from-indigo-500 to-teal-500"></div>
                    </h2>
                    <p className="mx-auto mt-4 max-w-2xl text-lg text-slate-600">
                        Our streamlined process ensures you receive high-quality academic work with complete transparency at every step.
                    </p>
                </div>

                {/* Mobile Stepper */}
                <div className="mb-12 md:hidden">
                    <div className="mb-8 flex justify-center space-x-4">
                        {steps.map((step, index) => (
                            <button
                                key={index}
                                onClick={() => setActiveStep(index)}
                                className={`h-3 w-3 rounded-full transition-all ${index === activeStep ? 'scale-125 bg-indigo-600' : 'bg-slate-300'}`}
                                aria-label={`Go to step ${index + 1}`}
                            ></button>
                        ))}
                    </div>

                    <div className="rounded-2xl bg-white p-6 shadow-lg transition-all duration-300">
                        <div className="mb-4 flex items-start">
                            <div className={`bg-gradient-to-br ${steps[activeStep].color} mr-4 rounded-full p-3`}>
                                <div className="text-white">{steps[activeStep].icon}</div>
                            </div>
                            <div>
                                <div className={`inline-flex items-center rounded-full px-3 py-0.5 text-xs font-medium ${steps[activeStep].badge}`}>
                                    Step {activeStep + 1}
                                </div>
                                <h3 className="mt-2 text-xl font-bold text-slate-800">{steps[activeStep].title}</h3>
                            </div>
                        </div>
                        <p className="text-slate-600">{steps[activeStep].description}</p>
                    </div>
                </div>

                {/* Desktop Steps */}
                <div className="relative mt-16 hidden md:block">
                    {/* Timeline */}
                    <div className="absolute top-1/2 right-0 left-0 z-0 h-1 -translate-y-1/2 bg-gradient-to-r from-indigo-200 to-teal-200">
                        <div className="animate-timeline absolute inset-0 w-0 bg-gradient-to-r from-indigo-500 to-teal-500 transition-all duration-1000"></div>
                    </div>

                    <div className="relative z-10 grid grid-cols-3 gap-8">
                        {steps.map((step, index) => (
                            <div
                                key={index}
                                className={`group rounded-2xl border border-white bg-white p-6 shadow-lg transition-all duration-300 hover:shadow-xl ${
                                    activeStep === index ? 'scale-[1.02] ring-2 ring-indigo-500' : ''
                                }`}
                                onMouseEnter={() => setActiveStep(index)}
                            >
                                <div className="relative flex flex-col items-center">
                                    <div className="relative mb-6">
                                        <div
                                            className={`absolute inset-0 scale-125 transform rounded-full opacity-20 transition-all duration-300 group-hover:opacity-30 ${
                                                index === 0 ? 'bg-indigo-500' : index === 1 ? 'bg-blue-500' : 'bg-teal-500'
                                            }`}
                                        ></div>
                                        <div
                                            className={`relative flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br ${step.color} text-white shadow-lg`}
                                        >
                                            {step.icon}
                                        </div>
                                        <div
                                            className={`absolute -right-2 -bottom-2 flex h-8 w-8 items-center justify-center rounded-full text-sm font-bold ${step.badge}`}
                                        >
                                            {index + 1}
                                        </div>
                                    </div>

                                    <h3 className="mb-3 text-xl font-bold text-slate-800">{step.title}</h3>
                                    <p className="text-center text-slate-600">{step.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

               

               
            </div>

            {/* Animations */}
            <style>{`
                @keyframes fade-in {
                    from {
                        opacity: 0;
                        transform: translateY(10px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
                .animate-fade-in {
                    animation: fade-in 0.5s ease forwards;
                }

                @keyframes timeline {
                    from {
                        width: 0;
                    }
                    to {
                        width: 100%;
                    }
                }
                .animate-timeline {
                    animation: timeline 1.5s ease-out forwards;
                }

                @keyframes blob {
                    0% {
                        transform: translate(0px, 0px) scale(1);
                    }
                    33% {
                        transform: translate(30px, -50px) scale(1.1);
                    }
                    66% {
                        transform: translate(-20px, 20px) scale(0.9);
                    }
                    100% {
                        transform: translate(0px, 0px) scale(1);
                    }
                }
                .animate-blob {
                    animation: blob 7s infinite;
                }
                .animation-delay-2000 {
                    animation-delay: 2s;
                }
                .animation-delay-4000 {
                    animation-delay: 4s;
                }
            `}</style>
        </section>
    );
};

export default ServiceSteps;
