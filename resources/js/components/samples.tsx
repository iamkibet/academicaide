import MaxWidthWrapper from '@/components/MaxWidthWrapper';
import { useEffect, useState } from 'react';

interface Sample {
    id: number;
    title: string;
    style: string;
    discipline: string;
    pages: number;
    level: string;
    rating: number;
    description: string;
}

const samples: Sample[] = [
    {
        id: 1,
        title: 'Cognitive Development in Adolescents',
        style: 'APA',
        discipline: 'Psychology',
        pages: 12,
        level: 'Undergraduate',
        rating: 4.8,
        description: 'Analysis of cognitive development patterns in adolescents aged 12-18, exploring the impact of social media on attention span.',
    },
    {
        id: 2,
        title: 'Shakespearean Influence on Modern Literature',
        style: 'MLA',
        discipline: 'Literature',
        pages: 8,
        level: 'Master',
        rating: 4.9,
        description: "Examining Shakespeare's narrative techniques and character development in contemporary novels and screenwriting.",
    },
    {
        id: 3,
        title: 'Economic Impact of the Industrial Revolution',
        style: 'Chicago',
        discipline: 'History',
        pages: 15,
        level: 'PhD',
        rating: 4.7,
        description: 'Study of socioeconomic transformations during the Industrial Revolution and long-term effects on modern economies.',
    },
];

const Samples = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isTransitioning, setIsTransitioning] = useState(false);

    const currentSample = samples[currentIndex];

    const handlePrev = () => {
        if (isTransitioning) return;
        setIsTransitioning(true);
        setCurrentIndex((prev) => (prev - 1 + samples.length) % samples.length);
    };

    const handleNext = () => {
        if (isTransitioning) return;
        setIsTransitioning(true);
        setCurrentIndex((prev) => (prev + 1) % samples.length);
    };

    useEffect(() => {
        if (isTransitioning) {
            const timer = setTimeout(() => {
                setIsTransitioning(false);
            }, 300);
            return () => clearTimeout(timer);
        }
    }, [isTransitioning]);

    // Calculate visible samples in the stack
    const visibleSamples = [];
    for (let i = -1; i <= 1; i++) {
        const index = (currentIndex + i + samples.length) % samples.length;
        visibleSamples.push({
            ...samples[index],
            position: i,
            zIndex: 10 - Math.abs(i),
            opacity: 1 - Math.abs(i) * 0.3,
            scale: 1 - Math.abs(i) * 0.1,
        });
    }

    return (
        <MaxWidthWrapper>
            <div className="px-2 py-10 sm:px-4 md:py-16 lg:py-24">
                {/* Centered Header */}
                <div className="mb-10 text-center md:mb-16">
                    <h2 className="mb-3 text-2xl font-bold text-slate-800 sm:text-3xl md:mb-4 md:text-4xl md:text-5xl">
                        Academic Excellence <span className="text-orange-600">Showcase</span>
                    </h2>
                    <div className="mx-auto mt-4 h-1 w-16 rounded-full bg-orange-600 md:mt-6 md:w-24"></div>
                    <p className="mx-auto mt-4 max-w-md text-base text-slate-600 md:mt-6 md:max-w-2xl md:text-lg">
                        Explore our premium academic samples across various subjects and formats.
                    </p>
                </div>

                {/* Content Grid */}
                <div className="grid grid-cols-1 items-center gap-10 md:gap-12 lg:grid-cols-2">
                    {/* Left Column - Sample Details */}
                    <div className="space-y-6 md:space-y-8">
                        <div className="space-y-3 md:space-y-4">
                            <div className="flex flex-wrap items-center gap-2 md:gap-4">
                                <div className="rounded-full bg-orange-100 px-3 py-1 text-xs font-medium text-orange-800 md:text-sm">
                                    {currentSample.level}
                                </div>
                                <div className="ml-0 flex md:ml-3">
                                    {[...Array(5)].map((_, i) => (
                                        <svg
                                            key={i}
                                            className={`h-4 w-4 md:h-5 md:w-5 ${i < Math.floor(currentSample.rating) ? 'fill-current text-orange-500' : 'text-orange-200'}`}
                                            viewBox="0 0 24 24"
                                        >
                                            <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                                        </svg>
                                    ))}
                                </div>
                            </div>

                            <h3 className="text-xl font-bold text-slate-800 md:text-3xl">{currentSample.title}</h3>
                            <p className="text-base text-slate-600 md:text-lg">{currentSample.description}</p>
                        </div>

                        <div className="grid grid-cols-2 gap-3 md:gap-4">
                            <div className="border-l-4 border-orange-500 pl-3 md:pl-4">
                                <div className="text-xs text-slate-500 md:text-sm">Discipline</div>
                                <div className="text-sm font-bold text-slate-800 md:text-base">{currentSample.discipline}</div>
                            </div>

                            <div className="border-l-4 border-orange-500 pl-3 md:pl-4">
                                <div className="text-xs text-slate-500 md:text-sm">Format</div>
                                <div className="text-sm font-bold text-slate-800 md:text-base">{currentSample.style}</div>
                            </div>

                            <div className="border-l-4 border-orange-500 pl-3 md:pl-4">
                                <div className="text-xs text-slate-500 md:text-sm">Pages</div>
                                <div className="text-sm font-bold text-slate-800 md:text-base">{currentSample.pages}</div>
                            </div>

                            <div className="border-l-4 border-orange-500 pl-3 md:pl-4">
                                <div className="text-xs text-slate-500 md:text-sm">Quality Rating</div>
                                <div className="text-sm font-bold text-slate-800 md:text-base">{currentSample.rating}/5</div>
                            </div>
                        </div>

                        <div className="mt-4 flex flex-col gap-3 sm:flex-row md:mt-6 md:gap-4">
                            <button className="w-full flex-1 rounded-lg bg-orange-600 px-4 py-2.5 font-medium text-white transition-all hover:bg-orange-700 sm:w-auto md:px-6 md:py-3">
                                Download Sample
                            </button>
                            <button className="w-full flex-1 rounded-lg border border-slate-300 px-4 py-2.5 font-medium text-slate-700 transition-all hover:bg-slate-50 sm:w-auto md:px-6 md:py-3">
                                View All Samples
                            </button>
                        </div>
                    </div>

                    {/* Right Column - Stacked Preview */}
                    <div className="xs:h-[350px] relative h-[320px] sm:h-[370px] md:h-[400px]">
                        {visibleSamples.map((sample) => (
                            <div
                                key={`${sample.id}-${sample.position}`}
                                className={`xs:h-[250px] xs:max-w-sm absolute inset-0 mx-auto h-[200px] w-full max-w-xs rounded-xl border border-slate-200 bg-white shadow-sm transition-all duration-300 ease-out sm:h-[300px] sm:max-w-md md:h-[350px] ${
                                    isTransitioning ? 'transitioning' : ''
                                }`}
                                style={{
                                    zIndex: sample.zIndex,
                                    opacity: sample.opacity,
                                    transform: `translateY(${sample.position * 20}px) scale(${sample.scale})`,
                                    boxShadow: sample.position === 0 ? '0 10px 20px -8px rgba(0, 0, 0, 0.10)' : '0 3px 10px -4px rgba(0, 0, 0, 0.05)',
                                }}
                            >
                                <div className="relative h-full overflow-hidden rounded-xl">
                                    {/* Preview Header */}
                                    <div className="flex h-12 items-center border-b border-slate-200 bg-slate-50 p-3 md:h-16 md:p-4">
                                        <div className="text-sm font-medium text-slate-800 md:text-base">{sample.discipline}</div>
                                        <div className="ml-auto text-xs text-slate-500 md:text-sm">{sample.style} Format</div>
                                    </div>

                                    {/* Preview Body */}
                                    <div className="flex h-[calc(100%-3rem)] flex-col p-3 md:h-[calc(100%-4rem)] md:p-6">
                                        {/* PDF preview placeholder */}
                                        <div className="mb-3 flex-1 overflow-hidden rounded-lg border border-slate-200 bg-slate-50 md:mb-4">
                                            <div className="flex h-full items-center justify-center">
                                                <div className="text-center">
                                                    <div className="mx-auto mb-2 flex h-10 w-10 items-center justify-center rounded-lg border-2 border-dashed border-slate-300 bg-white md:mb-3 md:h-16 md:w-16">
                                                        <svg
                                                            xmlns="http://www.w3.org/2000/svg"
                                                            className="h-6 w-6 text-orange-500 md:h-8 md:w-8"
                                                            fill="none"
                                                            viewBox="0 0 24 24"
                                                            stroke="currentColor"
                                                        >
                                                            <path
                                                                strokeLinecap="round"
                                                                strokeLinejoin="round"
                                                                strokeWidth={2}
                                                                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                                                            />
                                                        </svg>
                                                    </div>
                                                    <p className="text-xs text-slate-500 md:text-sm">Sample Preview</p>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="flex justify-between text-xs text-slate-500 md:text-sm">
                                            <span>{sample.pages} pages</span>
                                            <span>#{sample.id.toString().padStart(2, '0')}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}

                        {/* Navigation Buttons */}
                        <div className="absolute right-0 bottom-0 left-0 flex justify-center space-x-3 pb-2 md:space-x-4 md:pb-0">
                            <button
                                onClick={handlePrev}
                                className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-white shadow-sm transition-colors hover:bg-slate-50 md:h-12 md:w-12"
                                disabled={isTransitioning}
                            >
                                <svg className="h-5 w-5 text-slate-700 md:h-6 md:w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                                </svg>
                            </button>

                            <div className="flex items-center px-2 md:px-4">
                                <span className="text-sm font-medium text-slate-700 md:text-base">
                                    {currentIndex + 1} / {samples.length}
                                </span>
                            </div>

                            <button
                                onClick={handleNext}
                                className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-white shadow-sm transition-colors hover:bg-slate-50 md:h-12 md:w-12"
                                disabled={isTransitioning}
                            >
                                <svg className="h-5 w-5 text-slate-700 md:h-6 md:w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>

                {/* View All Samples */}
                <div className="mt-10 text-center md:mt-16">
                    <a
                        href="/samples"
                        className="inline-flex items-center text-base font-medium text-orange-600 transition-colors hover:text-orange-800 md:text-lg"
                    >
                        Browse All Academic Samples
                        <svg className="ml-2 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                        </svg>
                    </a>
                </div>
            </div>
        </MaxWidthWrapper>
    );
};

export default Samples;
