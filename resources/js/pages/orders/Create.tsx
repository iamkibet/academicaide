import { Head, useForm } from '@inertiajs/react';
import { FormEvent, useState } from 'react';

interface OrderFormData extends Record<string, string | number | boolean> {
    assignment_type: string;
    service_type: string;
    academic_level: string;
    language: string;
    pages: number;
    words: number;
    line_spacing: string;
    deadline: string;
    instructions: string;
    client_notes: string;
    is_urgent: boolean;
}

const assignmentTypes = [
    { id: 'essay', label: 'Essay (any type)', popular: true },
    { id: 'research_paper', label: 'Research paper', popular: true },
    { id: 'discussion_post', label: 'Discussion post', popular: true },
    { id: 'powerpoint', label: 'PowerPoint PPT', popular: true },

    { id: 'case_study', label: 'Case study', popular: true },
    { id: 'assignment', label: 'Assignment', popular: false },
    { id: 'admission_essay', label: 'Admission essay', popular: false },
    { id: 'analysis', label: 'Analysis (any type)', popular: false },
    { id: 'annotated_bibliography', label: 'Annotated bibliography', popular: false },
    { id: 'article_review', label: 'Article review', popular: false },
    { id: 'article_writing', label: 'Article writing', popular: false },
    { id: 'book_review', label: 'Book/Movie review', popular: false },
    { id: 'business_plan', label: 'Business plan', popular: false },
    { id: 'business_proposal', label: 'Business proposal', popular: false },
    { id: 'coursework', label: 'Coursework', popular: false },
    { id: 'capstone', label: 'Capstone project', popular: false },
    { id: 'creative_writing', label: 'Creative writing', popular: false },
];

const serviceTypes = [
    { id: 'writing', label: 'Writing' },
    { id: 'rewriting', label: 'Rewriting' },
    { id: 'editing', label: 'Editing' },
    { id: 'proofreading', label: 'Proofreading' },
    { id: 'problem_solving', label: 'Problem solving' },
    { id: 'calculations', label: 'Calculations' },
];

const academicLevels = [
    { id: 'high_school', label: 'High school' },
    { id: 'college', label: 'College' },
    { id: 'bachelors', label: "Bachelor's" },
    { id: 'masters', label: "Master's" },
    { id: 'doctorate', label: 'Doctorate' },
];

const languages = [
    { id: 'en_us', label: 'English', code: 'US', flag: '🇺🇸' },
    { id: 'en_uk', label: 'English', code: 'UK', flag: '🇬🇧' },
    { id: 'es', label: 'Spanish', code: 'ES', flag: '🇪🇸' },
    { id: 'fr', label: 'French', code: 'FR', flag: '🇫🇷' },
];

const lineSpacingOptions = [
    { id: 'single', label: 'Single' },
    { id: 'double', label: 'Double' },
    { id: '1.5', label: '1.5' },
];

export default function Create() {
    const [currentStep, setCurrentStep] = useState(1);
    const [searchQuery, setSearchQuery] = useState('');
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [editingStep, setEditingStep] = useState<number | null>(null);
    const { data, setData, post, processing } = useForm<OrderFormData>({
        assignment_type: '',
        service_type: '',
        academic_level: '',
        language: '',
        pages: 1,
        words: 0,
        line_spacing: '',
        deadline: '',
        instructions: '',
        client_notes: '',
        is_urgent: false,
    });

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        post(route('orders.store'));
    };

    const handleOptionSelect = (field: keyof OrderFormData, value: string | number) => {
        setData(field, value);
        if (editingStep) {
            setEditingStep(null);
        } else if (currentStep < 6) {
            setCurrentStep(currentStep + 1);
        }
    };

    const renderOrderSummary = () => {
        const summaryItems = [];

        if (data.assignment_type) {
            const selectedType = assignmentTypes.find((type) => type.id === data.assignment_type);
            summaryItems.push({
                label: 'Assignment type',
                value: selectedType?.label || '',
                step: 1,
            });
        }

        if (data.service_type) {
            const selectedService = serviceTypes.find((type) => type.id === data.service_type);
            summaryItems.push({
                label: 'Service',
                value: selectedService?.label || '',
                step: 2,
            });
        }

        if (data.academic_level) {
            const selectedLevel = academicLevels.find((level) => level.id === data.academic_level);
            summaryItems.push({
                label: 'Academic level',
                value: selectedLevel?.label || '',
                step: 3,
            });
        }

        if (data.language) {
            const selectedLang = languages.find((lang) => lang.id === data.language);
            summaryItems.push({
                label: 'Language',
                value: selectedLang?.label || '',
                step: 4,
            });
        }

        if (data.pages && data.line_spacing) {
            summaryItems.push({
                label: 'Size',
                value: `${data.pages} pages (${data.words} words) - ${data.line_spacing} spacing`,
                step: 5,
            });
        }

        if (summaryItems.length === 0) return null;

        return (
            <div className="mb-8 space-y-1">
                {summaryItems.map((item) => (
                    <div key={item.label} className="rounded-lg border border-gray-200 bg-white px-4 py-2">
                        <div className="flex items-center justify-between gap-4">
                            <div className="flex flex-1 items-center justify-between">
                                <span className="text-base font-medium text-gray-500">{item.label}</span>
                                <p className="ml-4 text-base font-medium text-gray-900">{item.value}</p>
                            </div>
                            <button
                                type="button"
                                onClick={() => setEditingStep(editingStep === item.step ? null : item.step)}
                                className="flex-shrink-0 rounded-full p-2 text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-500 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none"
                            >
                                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                                    />
                                </svg>
                            </button>
                        </div>
                        {editingStep === item.step && <div className="mt-4 border-t border-gray-100 pt-4">{renderStep(item.step)}</div>}
                    </div>
                ))}
            </div>
        );
    };

    const renderStep = (step: number) => {
        const filteredTypes = assignmentTypes.filter((type) => type.label.toLowerCase().includes(searchQuery.toLowerCase()));
        const popularTypes = assignmentTypes.filter((type) => type.popular);
        const otherTypes = filteredTypes.filter((type) => !type.popular);

        switch (step) {
            case 1:
                return (
                    <div className="space-y-8">
                        <div className="text-start">
                            <h2 className="text-2xl font-bold text-gray-900">Assignment type</h2>
                        </div>

                        {/* Search Input with Dropdown */}
                        <div className="relative">
                            <div
                                className="flex cursor-pointer items-center justify-between rounded-lg border border-gray-300 bg-white px-4 py-3 text-left text-lg transition-all hover:border-blue-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
                                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                            >
                                <div className="flex items-center">
                                    <svg className="mr-3 h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                                        />
                                    </svg>
                                    <input
                                        type="text"
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                        placeholder="Search assignment types..."
                                        className="w-full border-none p-0 focus:ring-0 focus:outline-none"
                                        onClick={(e) => e.stopPropagation()}
                                    />
                                </div>
                                <svg
                                    className={`h-5 w-5 transform text-gray-400 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`}
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                </svg>
                            </div>

                            {/* Dropdown Menu */}
                            {isDropdownOpen && (
                                <div className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-lg border border-gray-200 bg-white py-1 shadow-lg">
                                    {otherTypes.length === 0 ? (
                                        <div className="px-4 py-2 text-gray-500">No results found</div>
                                    ) : (
                                        otherTypes.map((type) => (
                                            <button
                                                key={type.id}
                                                type="button"
                                                onClick={() => {
                                                    handleOptionSelect('assignment_type', type.id);
                                                    setIsDropdownOpen(false);
                                                }}
                                                className="w-full px-4 py-2 text-left text-gray-700 hover:bg-blue-50"
                                            >
                                                {type.label}
                                            </button>
                                        ))
                                    )}
                                </div>
                            )}
                        </div>

                        {/* Popular Choices Section */}
                        {popularTypes.length > 0 && (
                            <div className="mt-8">
                                <h3 className="mb-4 text-lg font-semibold text-gray-900">Popular Choices</h3>
                                <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-4">
                                    {popularTypes.map((type) => {
                                        const isSelected = data.assignment_type === type.id;
                                        const buttonClasses = `
                                            group relative flex min-h-[48px] w-full items-center rounded-md border px-3
                                            text-left text-base transition-all duration-200 ease-in-out
                                            hover:border-blue-300 hover:bg-blue-50 hover:shadow-sm
                                            focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1
                                            ${isSelected ? 'border-blue-500 bg-blue-50 shadow-sm' : 'border-gray-200'}
                                        `;

                                        return (
                                            <button
                                                key={type.id}
                                                type="button"
                                                onClick={() => handleOptionSelect('assignment_type', type.id)}
                                                className={buttonClasses.trim()}
                                            >
                                                <span className="font-medium text-gray-700 group-hover:text-gray-900">{type.label}</span>
                                                {isSelected && (
                                                    <svg
                                                        className="absolute right-2 h-4 w-4 text-blue-500"
                                                        fill="none"
                                                        stroke="currentColor"
                                                        viewBox="0 0 24 24"
                                                    >
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                                    </svg>
                                                )}
                                            </button>
                                        );
                                    })}
                                </div>
                            </div>
                        )}
                    </div>
                );

            case 2:
                return (
                    <div className="space-y-6">
                        <div className="text-start">
                            <h2 className="text-2xl font-bold text-gray-900">Service</h2>
                        </div>
                        <div className="mt-8 flex flex-wrap gap-3">
                            {serviceTypes.map((type) => (
                                <button
                                    key={type.id}
                                    type="button"
                                    onClick={() => handleOptionSelect('service_type', type.id)}
                                    className={`flex rounded-lg border px-3 py-2 text-base font-medium transition-all hover:border-blue-300 hover:bg-blue-50 ${
                                        data.service_type === type.id ? 'border-blue-500 bg-blue-50 text-blue-700' : 'border-gray-200 text-gray-700'
                                    }`}
                                >
                                    {type.label}
                                </button>
                            ))}
                        </div>
                    </div>
                );

            case 3:
                return (
                    <div className="space-y-6">
                        <div className="text-start">
                            <h2 className="text-2xl font-bold text-gray-900">Academic level</h2>
                        </div>
                        <div className="mt-8 flex gap-3">
                            {academicLevels.map((level) => (
                                <button
                                    key={level.id}
                                    type="button"
                                    onClick={() => handleOptionSelect('academic_level', level.id)}
                                    className={`flex rounded-lg border px-3 py-2 text-base font-medium transition-all hover:border-blue-300 hover:bg-blue-50 ${
                                        data.academic_level === level.id
                                            ? 'border-blue-500 bg-blue-50 text-blue-700'
                                            : 'border-gray-200 text-gray-700'
                                    }`}
                                >
                                    {level.label}
                                </button>
                            ))}
                        </div>
                    </div>
                );

            case 4:
                return (
                    <div className="space-y-6">
                        <div className="text-start">
                            <h2 className="text-2xl font-bold text-gray-900">Language</h2>
                        </div>
                        <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-4">
                            {languages.map((lang) => (
                                <button
                                    key={lang.id}
                                    type="button"
                                    onClick={() => handleOptionSelect('language', lang.id)}
                                    className={`group relative flex items-center gap-2 rounded-xl border px-4 py-1 text-left transition-all hover:border-blue-300 hover:bg-blue-50 ${
                                        data.language === lang.id ? 'border-blue-500 bg-blue-50' : 'border-gray-200'
                                    }`}
                                >
                                    <span className="text-2xl">{lang.flag}</span>
                                    <div className="flex-1">
                                        <span
                                            className={`block text-sm font-medium ${
                                                data.language === lang.id ? 'text-blue-700' : 'text-gray-700 group-hover:text-gray-900'
                                            }`}
                                        >
                                            {lang.label} <span className="text-gray-500">({lang.code})</span>
                                        </span>
                                    </div>
                                    {data.language === lang.id && (
                                        <div className="ml-2">
                                            <svg className="h-4 w-4 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                            </svg>
                                        </div>
                                    )}
                                </button>
                            ))}
                        </div>
                    </div>
                );

            case 5:
                return (
                    <div className="space-y-6">
                        <div className="text-start">
                            <h2 className="text-2xl font-bold text-gray-900">Size</h2>
                        </div>
                        <div className="mt-8 space-y-6">
                            <div className="grid gap-6">
                                <div>
                                    <label className="mb-2 block text-lg font-medium text-gray-700">Pages</label>
                                    <input
                                        type="number"
                                        min="1"
                                        value={data.pages}
                                        onChange={(e) => {
                                            const pages = parseInt(e.target.value);
                                            setData('pages', pages);
                                            setData('words', pages * 275);
                                        }}
                                        className="w-full rounded-lg border border-gray-300 p-4 text-lg transition-all focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
                                    />
                                    <p className="mt-2 text-sm text-gray-500">~ {data.words} words</p>
                                </div>
                                <div>
                                    <label className="mb-2 block text-lg font-medium text-gray-700">Line spacing</label>
                                    <select
                                        value={data.line_spacing}
                                        onChange={(e) => setData('line_spacing', e.target.value)}
                                        className="w-full rounded-lg border border-gray-300 p-4 text-lg transition-all focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
                                    >
                                        {lineSpacingOptions.map((option) => (
                                            <option key={option.id} value={option.id}>
                                                {option.label}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                            <button
                                type="button"
                                onClick={() => setCurrentStep(currentStep + 1)}
                                className="mt-6 w-full rounded-lg bg-blue-600 px-8 py-4 text-lg font-semibold text-white transition-colors hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none"
                            >
                                Continue
                            </button>
                        </div>
                    </div>
                );

            case 6:
                return (
                    <div className="space-y-6">
                        <div className="text-start">
                            <h2 className="text-2xl font-bold text-gray-900">Final details</h2>
                        </div>
                        <div className="mt-8 space-y-6">
                            <div>
                                <label className="mb-2 block text-lg font-medium text-gray-700">Deadline</label>
                                <input
                                    type="datetime-local"
                                    value={data.deadline}
                                    onChange={(e) => setData('deadline', e.target.value)}
                                    className="w-full rounded-lg border border-gray-300 p-4 text-lg transition-all focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
                                    required
                                />
                            </div>
                            <div>
                                <label className="mb-2 block text-lg font-medium text-gray-700">Instructions</label>
                                <textarea
                                    value={data.instructions}
                                    onChange={(e) => setData('instructions', e.target.value)}
                                    rows={4}
                                    className="w-full rounded-lg border border-gray-300 p-4 text-lg transition-all focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
                                    placeholder="Provide detailed instructions for your paper..."
                                    required
                                />
                            </div>
                            <div>
                                <label className="flex cursor-pointer items-center rounded-lg bg-gray-50 p-4 hover:bg-gray-100">
                                    <input
                                        type="checkbox"
                                        checked={data.is_urgent}
                                        onChange={(e) => setData('is_urgent', e.target.checked)}
                                        className="h-5 w-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                                    />
                                    <div className="ml-3">
                                        <span className="text-lg font-medium text-gray-900">Mark as Urgent</span>
                                        <p className="text-gray-500">1.5x base price - Get your paper faster</p>
                                    </div>
                                </label>
                            </div>
                            <div className="flex justify-between pt-6">
                                <button
                                    type="button"
                                    onClick={() => setCurrentStep(currentStep - 1)}
                                    className="rounded-lg bg-gray-100 px-8 py-4 text-lg font-semibold text-gray-700 transition-colors hover:bg-gray-200 focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 focus:outline-none"
                                >
                                    Back
                                </button>
                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="rounded-lg bg-blue-600 px-8 py-4 text-lg font-semibold text-white transition-colors hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none disabled:opacity-50"
                                >
                                    {processing ? 'Creating Order...' : 'Create Order'}
                                </button>
                            </div>
                        </div>
                    </div>
                );

            default:
                return null;
        }
    };

    return (
        <>
            <Head title="Create Order" />

            <div className="mx-auto flex max-w-3xl items-center justify-between py-6">
                <div>
                    <h1 className="mb-2 text-3xl font-bold">Create a new order</h1>
                </div>
                <div className="flex items-center gap-4">
                    <div className="w-32">
                        <div className="relative h-1.5 w-full rounded-full bg-gray-200">
                            <div
                                className="absolute top-0 left-0 h-full rounded-full bg-blue-600 transition-all duration-300"
                                style={{ width: `${((currentStep - 1) / 5) * 100}%` }}
                            />
                        </div>
                    </div>
                    <button
                        type="button"
                        onClick={() => window.history.back()}
                        className="rounded-lg bg-gray-100 px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-200 focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 focus:outline-none"
                    >
                        Discard
                    </button>
                </div>
            </div>

            <div className="bg-gray-50 py-12">
                <div className="mx-auto max-w-3xl">
                    {renderOrderSummary()}

                    {!editingStep && (
                        <div className="overflow-hidden bg-white shadow-xl sm:rounded-lg">
                            <div className="p-8">
                                <form onSubmit={handleSubmit}>{renderStep(currentStep)}</form>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}
