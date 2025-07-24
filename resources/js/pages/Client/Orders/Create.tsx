import FileUpload from '@/components/FileUpload';
import MaxWidthWrapper from '@/components/MaxWidthWrapper';
import ClientLayout from '@/layouts/ClientLayout';
import type { User } from '@/types';
import { Dialog } from '@headlessui/react';
import { useForm } from '@inertiajs/react';
import axios from 'axios';
import { ArrowLeft, Check, Edit } from 'lucide-react';
import { FormEvent, useEffect, useMemo, useState } from 'react';

// Type definitions
interface Auth {
    user: User | null;
    check: boolean;
}

interface DeadlineOption {
    hours: number;
    label: string;
}

interface Addon {
    id: string;
    name: string;
    price: number;
    description: string;
    isFree: boolean;
}

interface OrderFormData {
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
    addons: string[];
    subject: string;
    files: File[];
    source_count: string;
    citation_style: string;
    title: string;
    promo_code: string; // <-- Add promo code
    topic: string; // <-- Add topic
    [key: string]: string | number | boolean | string[] | File[];
}

interface StepActionsProps {
    currentStep: number;
    onNext: () => void;
    onBack: () => void;
    isLastStep: boolean;
    processing?: boolean;
}

type UploadedFile = {
    id: string;
    original_filename?: string;
    original_name?: string;
    size: number;
};

// Constants
const DEADLINE_OPTIONS: DeadlineOption[] = [
    { hours: 24, label: '24 Hours' },
    { hours: 48, label: '2 Days' },
    { hours: 120, label: '5 Days' },
];

const ADDONS: Addon[] = [
    {
        id: 'abstract',
        name: '1-Page Abstract',
        price: 12.99,
        description: 'Concise summary of your paper',
        isFree: false,
    },
    {
        id: 'graphics',
        name: 'Graphics & Tables',
        price: 8.99,
        description: 'Professional visual elements',
        isFree: false,
    },
    {
        id: 'sources',
        name: 'Printable Sources',
        price: 6.99,
        description: 'All sources in printable format',
        isFree: false,
    },
    {
        id: 'outline',
        name: 'Detailed Outline',
        price: 9.99,
        description: 'Comprehensive paper structure',
        isFree: false,
    },
    {
        id: 'plagiarism',
        name: 'Plagiarism & AI Report',
        price: 0,
        description: 'Detailed originality report',
        isFree: true,
    },
];

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

const SERVICE_TYPES = [
    { id: 'writing', label: 'Writing' },
    { id: 'rewriting', label: 'Rewriting' },
    { id: 'editing', label: 'Editing' },
    { id: 'proofreading', label: 'Proofreading' },
];

const ACADEMIC_LEVELS = [
    { id: 'high_school', label: 'High School' },
    { id: 'college', label: 'College' },
    { id: 'bachelors', label: "Bachelor's" },
    { id: 'masters', label: "Master's" },
];

const LANGUAGES = [
    { id: 'en_us', label: 'English', code: 'US', flag: '🇺🇸' },
    { id: 'en_uk', label: 'English', code: 'UK', flag: '🇬🇧' },
];

const LINE_SPACING_OPTIONS = [
    { id: 'single', label: 'Single' },
    { id: 'double', label: 'Double' },
];

const SUBJECTS = [
    'Global Studies',
    'Government',
    'International Affairs/Relations',
    'Political Science',
    'Social Sciences',
    'Communications and Media',
    'Psychology',
    'Sociology',
];

const SUGGESTED_SUBJECTS = ['Cultural Studies', 'Business and Management', 'English', 'Psychology'];

// Pricing configuration
const ACADEMIC_LEVEL_MULTIPLIERS: Record<string, number> = {
    high_school: 1,
    college: 1.1,
    bachelors: 1.2,
    masters: 1.3,
};

const DEADLINE_MULTIPLIERS: Record<number, number> = {
    24: 1.5,
    48: 1.2,
    120: 1,
};

const SPACING_MULTIPLIERS: Record<string, number> = {
    single: 1.5,
    double: 1,
};

const BASE_PRICE_PER_PAGE = 12.99;

// Utility functions
const calculateTotalPrice = (data: OrderFormData): number => {
    if (!data.pages || !data.academic_level || !data.deadline) return 0;

    let base = BASE_PRICE_PER_PAGE * Number(data.pages);
    base *= SPACING_MULTIPLIERS[data.line_spacing] || 1;
    base *= ACADEMIC_LEVEL_MULTIPLIERS[data.academic_level] || 1;

    const deadlineHours = Math.max(1, Math.round((new Date(data.deadline).getTime() - Date.now()) / 3600000));

    let deadlineMultiplier = 1;
    if (deadlineHours <= 24) deadlineMultiplier = DEADLINE_MULTIPLIERS[24];
    else if (deadlineHours <= 48) deadlineMultiplier = DEADLINE_MULTIPLIERS[48];
    else deadlineMultiplier = DEADLINE_MULTIPLIERS[120];

    base *= deadlineMultiplier;

    const addonTotal = data.addons.reduce((sum, id) => {
        const addon = ADDONS.find((a) => a.id === id);
        return sum + (addon && !addon.isFree ? addon.price : 0);
    }, 0);

    return Math.round((base + addonTotal) * 100) / 100;
};

// Components
const StepActions = ({ currentStep, onNext, onBack, isLastStep, processing }: StepActionsProps) => (
    <div className="mt-8 flex justify-between border-t border-gray-100 pt-6">
        {currentStep > 1 && (
            <button
                type="button"
                onClick={onBack}
                className="flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-5 py-2.5 text-sm font-medium text-gray-600 shadow-sm transition-colors hover:bg-gray-50"
            >
                <ArrowLeft className="text-lg" />
                Back
            </button>
        )}

        <button
            type="button"
            onClick={onNext}
            disabled={processing}
            className={`flex items-center gap-2 rounded-lg bg-gradient-to-r from-blue-600 to-indigo-700 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition-all hover:from-blue-500 hover:to-indigo-600 ${
                processing ? 'cursor-not-allowed opacity-80' : 'hover:shadow-md'
            }`}
        >
            {isLastStep ? (
                processing ? (
                    'Processing...'
                ) : (
                    'Submit Order'
                )
            ) : (
                <>
                    Continue
                    <ArrowLeft className="rotate-180 text-lg" />
                </>
            )}
        </button>
    </div>
);

const OrderSummary = ({
    data,
    currentStep,
    onEditStep,
    draftId,
    showDiscardModal,
    setShowDiscardModal,
    handleDiscard,
}: {
    data: OrderFormData;
    currentStep: number;
    onEditStep: (step: number) => void;
    draftId: string | null;
    showDiscardModal: boolean;
    setShowDiscardModal: (v: boolean) => void;
    handleDiscard: () => void;
}) => {
    const totalPrice = useMemo(() => calculateTotalPrice(data), [data]);
    // Add 'Title' as a step before 'Subject'
    const stepLabels = [
        'Assignment Type',
        'Service',
        'Academic Level',
        'Language',
        'Size',
        'Deadline',
        'Add-ons',
        'Topic',
        'Subject',
        'Instructions',
        'Sources & Style',
        'Promo code',
    ];
    const getStepValue = (step: number) => {
        switch (step) {
            case 1:
                return assignmentTypes.find((t) => t.id === data.assignment_type)?.label || '';
            case 2:
                return SERVICE_TYPES.find((t) => t.id === data.service_type)?.label || '';
            case 3:
                return ACADEMIC_LEVELS.find((l) => l.id === data.academic_level)?.label || '';
            case 4:
                return currentStep > 4 ? LANGUAGES.find((l) => l.id === data.language)?.label || '' : '';
            case 5:
                return currentStep > 5 && data.pages && data.words ? `${data.pages} pages (~ ${data.words} words), ${data.line_spacing} spacing` : '';
            case 6:
                return data.deadline ? new Date(data.deadline).toLocaleString() : '';
            case 7:
                return data.addons?.length ? `${data.addons.length} addon${data.addons.length > 1 ? 's' : ''} selected` : '';
            case 8:
                return data.topic || '';
            case 9:
                return data.subject || '';
            case 10:
                return data.instructions || '';
            case 11:
                return data.source_count || data.citation_style
                    ? `${data.source_count ? `${data.source_count} sources` : ''}${data.source_count && data.citation_style ? ' / ' : ''}${data.citation_style ? `${data.citation_style.toUpperCase()}${data.citation_style === 'apa' ? ' 7th edition' : ''}` : ''}`
                    : '';
            case 12:
                return data.promo_code || '';
            default:
                return '';
        }
    };
    const filledSteps = stepLabels
        .map((label, idx) => ({
            label,
            value: getStepValue(idx + 1),
            step: idx + 1,
        }))
        .filter((step) => step.value);
    return (
        <div className="sticky top-8 mb-8 rounded-lg bg-white/90 p-3 shadow-[0_10px_40px_-15px_rgba(0,0,0,0.1)] backdrop-blur-md">
            <div className="mb-4 flex items-center justify-between">
                <h2 className="text-lg font-bold text-gray-900">Order Summary</h2>
                <div className="rounded-full bg-gray-100 px-3 py-1 text-sm font-medium text-gray-600">Step {currentStep} of 12</div>
            </div>
            <div className="">
                {filledSteps.map(({ label, value, step }) => (
                    <div
                        key={step}
                        className={`flex items-center justify-between rounded-lg py-1.5 transition-colors ${
                            step === currentStep ? 'bg-blue-50/60 ring-1 ring-blue-100' : 'border-b border-gray-100 last:border-b-0'
                        }`}
                    >
                        <div className="flex items-start">
                            <div className="flex items-center gap-3 text-center">
                                <div className="text-xs font-medium text-gray-400">{label}</div>
                                <div className="text-sm font-medium text-gray-900">{value}</div>
                            </div>
                        </div>
                        {currentStep > step && (
                            <button
                                type="button"
                                onClick={() => onEditStep(step)}
                                className="ml-2 rounded-full p-1.5 text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-600"
                                aria-label={`Edit ${label}`}
                            >
                                <Edit className="h-4 w-4" />
                            </button>
                        )}
                    </div>
                ))}
            </div>
            <div className="mt-6 flex items-center justify-between rounded-lg bg-gradient-to-r from-gray-50 to-gray-100/50 px-4 py-3">
                <span className="text-base font-semibold text-gray-700">Total Price</span>
                <span className="text-gradient bg-gradient-to-r from-blue-600 to-indigo-700 bg-clip-text text-xl font-bold text-transparent">
                    ${totalPrice.toFixed(2)}
                </span>
            </div>
            {draftId && (
                <div className="mt-6 flex justify-center">
                    <button
                        type="button"
                        className="rounded-lg border border-red-200 bg-red-50 px-4 py-2 text-sm font-semibold text-red-700 shadow-sm transition-colors hover:bg-red-100 focus:ring-2 focus:ring-red-300 focus:outline-none"
                        onClick={() => setShowDiscardModal(true)}
                    >
                        Discard Draft
                    </button>
                </div>
            )}
            <Dialog
                open={showDiscardModal}
                onClose={() => setShowDiscardModal(false)}
                className="fixed inset-0 z-50 flex items-center justify-center"
            >
                {/* Overlay */}
                <div className="fixed inset-0 bg-black opacity-30" />
                <Dialog.Panel className="relative mx-auto max-w-sm rounded-xl bg-white p-8 shadow-xl">
                    <Dialog.Title className="mb-2 text-lg font-bold">Discard Draft?</Dialog.Title>
                    <Dialog.Description className="mb-4 text-gray-600">
                        Are you sure you want to discard your draft? This action cannot be undone.
                    </Dialog.Description>
                    <div className="flex justify-end gap-4">
                        <button
                            className="rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                            onClick={() => setShowDiscardModal(false)}
                        >
                            Cancel
                        </button>
                        <button
                            className="rounded-lg border border-red-200 bg-red-50 px-4 py-2 text-sm font-semibold text-red-700 hover:bg-red-100"
                            onClick={handleDiscard}
                        >
                            Discard
                        </button>
                    </div>
                </Dialog.Panel>
            </Dialog>
        </div>
    );
};

// Define OptionCardProps for OptionCard
interface OptionCardProps {
    id: string;
    label: string;
    selected: boolean;
    onClick: (id: string) => void;
    icon?: React.ReactNode;
    popular?: boolean;
    description?: string;
}

const OptionCard = ({ id, label, selected, onClick, icon, popular, description }: OptionCardProps) => (
    <button
        type="button"
        onClick={() => onClick(id)}
        aria-pressed={selected}
        className={`relative flex flex-col items-center justify-center rounded-xl border-1 p-3 text-center transition-all duration-300 ease-in-out hover:border-blue-400 hover:bg-blue-50/30 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none ${
            selected ? 'border-blue-500 bg-blue-50/60 shadow-[0_4px_12px_rgba(59,130,246,0.15)]' : 'border-gray-200 bg-white'
        }`}
    >
        {/* Popular badge */}
        {popular && (
            <span className="absolute -top-2 right-3 rounded-full bg-gradient-to-r from-amber-400 to-orange-500 px-2.5 py-1 text-xs font-semibold text-white shadow-sm">
                POPULAR
            </span>
        )}
        {/* Centered selection indicator */}
        <div
            className={`absolute -top-2 left-1/2 flex h-4 w-4 -translate-x-1/2 items-center justify-center rounded-full border-2 ${selected ? 'border-blue-500 bg-blue-500' : 'border-gray-300 bg-white'}`}
        >
            {selected && (
                <svg className="h-4 w-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                </svg>
            )}
        </div>
        <div className="flex items-center gap-2">
            {/* Icon */}
            {icon && (
                <div className={`transition-transform ${selected ? 'scale-110' : ''}`}>
                    <span className="text-2xl">{icon}</span>
                </div>
            )}
            {/* Label */}
            <span className={`font-medium text-gray-800 transition-colors ${selected ? 'text-blue-700' : ''}`}>{label}</span>
        </div>
        {/* Description */}
        {description && <p className="mt-2 text-sm text-gray-500 opacity-0 transition-opacity group-hover:opacity-100">{description}</p>}
    </button>
);

const AddonCard = ({ addon, selected, onClick }: { addon: Addon; selected: boolean; onClick: (id: string) => void }) => (
    <div
        onClick={() => onClick(addon.id)}
        className={`flex cursor-pointer items-center justify-between rounded-xl border p-4 transition-all ${
            selected ? 'border-blue-500 bg-blue-50 ring-2 ring-blue-500/30' : 'border-gray-200 hover:border-blue-300 hover:bg-blue-50/50'
        }`}
    >
        <div>
            <div className="flex items-center">
                <h3 className="font-medium text-gray-800">{addon.name}</h3>
                {addon.isFree && <span className="ml-2 rounded-full bg-green-100 px-2 py-0.5 text-xs font-medium text-green-800">FREE</span>}
            </div>
            <p className="mt-1 text-sm text-gray-500">{addon.description}</p>
        </div>

        <div className="flex items-center">
            {!addon.isFree && <span className="mr-3 text-base font-medium text-gray-800">${addon.price.toFixed(2)}</span>}
            <div
                className={`flex h-5 w-5 items-center justify-center rounded-full border ${
                    selected ? 'border-blue-500 bg-blue-500' : 'border-gray-300'
                }`}
            >
                {selected && <Check className="h-3 w-3 text-white" />}
            </div>
        </div>
    </div>
);

export default function Create({ auth }: { auth: Auth }) {
    const [currentStep, setCurrentStep] = useState(1);
    const [searchQuery, setSearchQuery] = useState('');
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [draftId, setDraftId] = useState<string | null>(null);
    const [showDiscardModal, setShowDiscardModal] = useState(false);
    const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);
    const { data, setData, post, processing, reset } = useForm<OrderFormData>({
        assignment_type: '',
        service_type: '',
        academic_level: '',
        language: 'en_us',
        pages: 1,
        words: 275,
        line_spacing: 'double',
        deadline: '',
        instructions: '',
        client_notes: '',
        addons: [],
        subject: '',
        files: [],
        source_count: '',
        citation_style: '',
        title: '',
        promo_code: '', // <-- Add promo_code
        topic: '', // <-- Add topic
    });

    // Filtering logic for assignment types
    const popularTypes = useMemo(
        () => assignmentTypes.filter((t) => t.popular && t.label.toLowerCase().includes(searchQuery.toLowerCase())),
        [searchQuery],
    );
    const otherTypes = useMemo(
        () => assignmentTypes.filter((t) => !t.popular && t.label.toLowerCase().includes(searchQuery.toLowerCase())),
        [searchQuery],
    );

    // Fetch draft on mount
    useEffect(() => {
        axios.get('/client/orders/draft').then((res) => {
            if (res.data.draft) {
                setData({
                    ...res.data.draft,
                    source_count: res.data.draft.source_count || '',
                    citation_style: res.data.draft.citation_style || '',
                    title: res.data.draft.title || '',
                    promo_code: res.data.draft.promo_code || '', // <-- Add promo_code
                    topic: res.data.draft.topic || '', // <-- Add topic
                });
                setDraftId(res.data.draft.id);
                setUploadedFiles(res.data.draft.files || []);
            }
        });
    }, []);

    // Only auto-save draft if at least one required field is filled
    useEffect(() => {
        const hasRequired = data.assignment_type || data.service_type || data.academic_level || data.language || data.pages > 0;
        if (!hasRequired) return;
        const saveDraft = async () => {
            if (draftId) {
                const res = await axios.patch(`/client/orders/${draftId}/draft`, data);
                setDraftId(res.data.draft.id);
            } else {
                const res = await axios.post('/client/orders/draft', data);
                setDraftId(res.data.draft.id);
            }
        };
        saveDraft();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [data]);

    const handleDiscard = async () => {
        if (!draftId) return;
        await axios.delete(`/client/orders/${draftId}/draft`);
        setDraftId(null);
        reset();
        setCurrentStep(1);
        setShowDiscardModal(false);
    };

    const handleNext = () => {
        if (currentStep < 12) setCurrentStep(currentStep + 1);
        else handleSubmit();
    };

    const handleBack = () => currentStep > 1 && setCurrentStep(currentStep - 1);
    const handleEditStep = (step: number) => setCurrentStep(step);

    const handleOptionSelect = (field: keyof OrderFormData, value: string) => {
        setData(field, value);
        if (currentStep < 5) setTimeout(handleNext, 300);
    };

    const updatePages = (newValue: number) => {
        newValue = Math.max(1, newValue);
        setData((prev) => ({ ...prev, pages: newValue, words: newValue * 275 }));
    };

    const toggleAddon = (id: string) => {
        setData('addons', data.addons.includes(id) ? data.addons.filter((addonId) => addonId !== id) : [...data.addons, id]);
    };

    const handleSubmit = (e?: FormEvent) => {
        e?.preventDefault();
        if (processing) return;

        post(route('client.orders.store'), {
            onSuccess: () => localStorage.removeItem('orderFormData'),
        });
    };

    // Step renderers
    const filteredSubjects = SUBJECTS.filter((subject) => subject.toLowerCase().includes(searchQuery.toLowerCase()));
    const filteredSuggested = SUGGESTED_SUBJECTS.filter((subject) => subject.toLowerCase().includes(searchQuery.toLowerCase()));
    const stepTitles = [
        'Assignment Type',
        'Service',
        'Academic Level',
        'Language',
        'Size',
        'Deadline',
        'Add-ons',
        'Topic',
        'Subject',
        'Instructions',
        'Sources & Style',
        'Promo code',
        'Summary',
    ];
    const renderStep = () => {
        switch (currentStep) {
            case 1:
                return (
                    <div className="space-y-8">
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
                    <div className="space-y-8">
                        <div>
                            <p className="mt-2 text-gray-500">What service do you require?</p>
                        </div>

                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-4">
                            {SERVICE_TYPES.map((type) => (
                                <OptionCard
                                    key={type.id}
                                    id={type.id}
                                    label={type.label}
                                    selected={data.service_type === type.id}
                                    onClick={() => handleOptionSelect('service_type', type.id)}
                                />
                            ))}
                        </div>
                    </div>
                );

            case 3:
                return (
                    <div className="space-y-8">
                        <div>
                            <h2 className="text-2xl font-bold text-gray-900">{stepTitles[2]}</h2>
                            <p className="mt-2 text-gray-500">What academic level is required?</p>
                        </div>

                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-4">
                            {ACADEMIC_LEVELS.map((level) => (
                                <OptionCard
                                    key={level.id}
                                    id={level.id}
                                    label={level.label}
                                    selected={data.academic_level === level.id}
                                    onClick={() => handleOptionSelect('academic_level', level.id)}
                                />
                            ))}
                        </div>
                    </div>
                );

            case 4:
                return (
                    <div className="space-y-8">
                        <div>
                            <p className="mt-2 text-gray-500">Choose your preferred language</p>
                        </div>

                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                            {LANGUAGES.map((lang) => (
                                <OptionCard
                                    key={lang.id}
                                    id={lang.id}
                                    label={`${lang.label} (${lang.code})`}
                                    selected={data.language === lang.id}
                                    onClick={() => handleOptionSelect('language', lang.id)}
                                    icon={lang.flag}
                                />
                            ))}
                        </div>
                    </div>
                );

            case 5:
                return (
                    <div className="space-y-8">
                        <div>
                            <h2 className="text-2xl font-bold text-gray-900">{stepTitles[4]}</h2>
                            <p className="mt-2 text-gray-500">1 page = 275 words</p>
                        </div>

                        <div className="flex flex-col gap-8 rounded-2xl border border-gray-200 bg-white p-6 sm:flex-row">
                            <div className="flex-1">
                                <h3 className="mb-3 text-sm font-medium text-gray-700">Number of pages</h3>
                                <div className="flex items-center">
                                    <button
                                        onClick={() => updatePages(data.pages - 1)}
                                        className="flex h-12 w-12 items-center justify-center rounded-l-lg border border-gray-300 bg-gray-50 text-gray-600 transition-colors hover:bg-gray-100"
                                    >
                                        <span className="text-xl">-</span>
                                    </button>
                                    <div className="flex h-12 w-20 items-center justify-center border-y border-gray-300 bg-white text-center text-lg font-medium">
                                        {data.pages}
                                    </div>
                                    <button
                                        onClick={() => updatePages(data.pages + 1)}
                                        className="flex h-12 w-12 items-center justify-center rounded-r-lg border border-gray-300 bg-gray-50 text-gray-600 transition-colors hover:bg-gray-100"
                                    >
                                        <span className="text-xl">+</span>
                                    </button>
                                </div>
                                <div className="mt-3 text-center text-sm text-gray-500">≈ {data.words} words</div>
                            </div>

                            <div className="flex-1">
                                <h3 className="mb-3 text-sm font-medium text-gray-700">Line spacing</h3>
                                <select
                                    value={data.line_spacing}
                                    onChange={(e) => setData('line_spacing', e.target.value)}
                                    className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-gray-800 shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
                                >
                                    {LINE_SPACING_OPTIONS.map((option) => (
                                        <option key={option.id} value={option.id}>
                                            {option.label}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>
                    </div>
                );

            case 6:
                return (
                    <div className="space-y-8">
                        <div>
                            <h2 className="text-2xl font-bold text-gray-900">{stepTitles[5]}</h2>
                            <p className="mt-2 text-gray-500">When do you need this completed?</p>
                        </div>

                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
                            {DEADLINE_OPTIONS.map((option) => {
                                const deadline = new Date();
                                deadline.setHours(deadline.getHours() + option.hours);
                                const formattedDeadline = deadline.toISOString().slice(0, 16);
                                const isSelected = data.deadline === formattedDeadline;

                                return (
                                    <OptionCard
                                        key={option.hours}
                                        id={option.label}
                                        label={option.label}
                                        selected={isSelected}
                                        onClick={() => setData('deadline', formattedDeadline)}
                                    />
                                );
                            })}
                        </div>

                        <div className="mt-4">
                            <h3 className="mb-2 text-sm font-medium text-gray-700">Or choose custom deadline:</h3>
                            <input
                                type="datetime-local"
                                value={data.deadline}
                                onChange={(e) => setData('deadline', e.target.value)}
                                min={new Date().toISOString().slice(0, 16)}
                                className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-gray-800 shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                    </div>
                );

            case 7:
                return (
                    <div className="space-y-8">
                        <div>
                            <h2 className="text-2xl font-bold text-gray-900">Add-ons & Files</h2>
                            <p className="mt-2 text-gray-500">Enhance your order with additional features and upload any relevant files.</p>
                        </div>
                        <div className="space-y-4">
                            {ADDONS.map((addon) => (
                                <AddonCard key={addon.id} addon={addon} selected={data.addons.includes(addon.id)} onClick={toggleAddon} />
                            ))}
                        </div>
                    </div>
                );

            case 8:
                return (
                    <div className="space-y-8">
                        <div>
                            <h2 className="text-2xl font-bold text-gray-900">Topic</h2>
                            <p className="mt-2 text-gray-500">Enter the topic for your assignment.</p>
                        </div>
                        <input
                            type="text"
                            value={data.topic || ''}
                            onChange={(e) => setData('topic', e.target.value)}
                            placeholder="e.g., The Impact of Climate Change on Global Agriculture"
                            className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-gray-800 shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
                            maxLength={120}
                        />
                    </div>
                );

            case 9:
                return (
                    <div className="space-y-8">
                        <div>
                            <h2 className="text-2xl font-bold text-gray-900">Subject</h2>
                            <p className="mt-2 text-gray-500">Select your subject area</p>
                        </div>

                        <div className="relative">
                            <input
                                type="text"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                placeholder="Search subjects..."
                                className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 pl-11 text-gray-800 shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
                            />
                            <svg
                                className="absolute top-1/2 left-4 h-5 w-5 -translate-y-1/2 text-gray-400"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                        </div>

                        {filteredSuggested.length > 0 && (
                            <div>
                                <h3 className="mb-3 text-sm font-medium text-gray-700">Suggested subjects</h3>
                                <div className="flex flex-wrap gap-2">
                                    {filteredSuggested.map((subject) => (
                                        <button
                                            key={subject}
                                            type="button"
                                            onClick={() => setData('subject', subject)}
                                            className={`rounded-lg border px-3 py-2 text-sm font-medium transition-colors ${
                                                data.subject === subject
                                                    ? 'border-blue-500 bg-blue-50 text-blue-700'
                                                    : 'border-gray-200 text-gray-700 hover:border-blue-300 hover:bg-blue-50'
                                            }`}
                                        >
                                            {subject}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}

                        <div>
                            <h3 className="mb-3 text-sm font-medium text-gray-700">All subjects</h3>
                            <div className="max-h-60 overflow-y-auto rounded-xl border border-gray-200">
                                {filteredSubjects.map((subject) => (
                                    <button
                                        key={subject}
                                        type="button"
                                        onClick={() => setData('subject', subject)}
                                        className={`flex w-full items-center justify-between px-4 py-3 text-left transition-colors ${
                                            data.subject === subject ? 'bg-blue-50 font-medium text-blue-700' : 'hover:bg-gray-50'
                                        }`}
                                    >
                                        {subject}
                                        {data.subject === subject && <Check className="h-5 w-5 text-blue-500" />}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                );

            case 10:
                return (
                    <div className="space-y-8">
                        <div>
                            <h2 className="text-2xl font-bold text-gray-900">Instructions</h2>
                            <p className="mt-2 text-gray-500">
                                Describe your assignment. Share references, links to articles, and list any other instructions.
                                <br />
                                <span className="text-red-500">Do not share personal information (name, email, phone number, etc.)</span>
                                <br />
                                <span className="font-medium">Browse or drag and drop multiple files here</span>
                                <br />
                                Max file size is 150 MB. Also, you can add a Dropbox or Sendspace link in the instructions.
                            </p>
                        </div>
                        <textarea
                            value={data.instructions}
                            onChange={(e) => setData('instructions', e.target.value)}
                            placeholder="e.g., The Impact of Climate Change on Global Agriculture"
                            className="min-h-[120px] w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-gray-800 shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
                        />
                        <FileUpload
                            orderId={draftId || ''}
                            files={uploadedFiles}
                            onFilesUploaded={(newFiles: UploadedFile[]) => setUploadedFiles((prev) => [...prev, ...newFiles])}
                            onRemove={handleRemoveFile}
                        />
                    </div>
                );

            case 11:
                return (
                    <div className="space-y-8">
                        <div>
                            <h2 className="text-2xl font-bold text-gray-900">Sources & Style</h2>
                            <p className="mt-2 text-gray-500">Specify the number of sources and citation style required.</p>
                        </div>
                        <div className="flex flex-col gap-6 sm:flex-row">
                            <div className="flex-1">
                                <label className="mb-2 block text-sm font-medium text-gray-700">Number of sources</label>
                                <input
                                    type="number"
                                    min={0}
                                    value={data.source_count || ''}
                                    onChange={(e) => setData('source_count', e.target.value)}
                                    className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-gray-800 shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
                                />
                            </div>
                            <div className="flex-1">
                                <label className="mb-2 block text-sm font-medium text-gray-700">Citation style</label>
                                <select
                                    value={data.citation_style || ''}
                                    onChange={(e) => setData('citation_style', e.target.value)}
                                    className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-gray-800 shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
                                >
                                    <option value="">Select style</option>
                                    <option value="apa">APA</option>
                                    <option value="mla">MLA</option>
                                    <option value="chicago">Chicago</option>
                                    <option value="harvard">Harvard</option>
                                    <option value="other">Other</option>
                                </select>
                            </div>
                        </div>
                    </div>
                );

            case 12:
                return (
                    <div className="space-y-8">
                        <div>
                            <h2 className="text-2xl font-bold text-gray-900">Promo code</h2>
                            <p className="mt-2 text-gray-500">Enter a promo code if you have one.</p>
                        </div>
                        <input
                            type="text"
                            value={data.promo_code || ''}
                            onChange={(e) => setData('promo_code', e.target.value)}
                            placeholder="e.g., SAVE10"
                            className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-gray-800 shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
                            maxLength={32}
                        />
                    </div>
                );

            default:
                return null;
        }
    };

    // Remove file from backend and state
    const handleRemoveFile = async (fileId: string) => {
        if (!draftId) return;
        await axios.delete(`/client/orders/${draftId}/files/${fileId}`);
        setUploadedFiles((prev) => prev.filter((f) => f.id !== fileId));
    };

    if (!auth.user) {
        return (
            <div className="flex min-h-screen items-center justify-center">
                <p className="text-lg text-gray-700">Please log in to create an order.</p>
            </div>
        );
    }

    if (currentStep === 12) {
        return (
            <ClientLayout user={auth.user as User}>
                <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 py-8">
                    <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
                        <div className="mb-8 text-center">
                            <h1 className="text-3xl font-bold text-gray-900">Review & Submit Your Order</h1>
                            <p className="mt-2 text-gray-600">Please review your order details and uploaded files before proceeding to payment.</p>
                        </div>
                        <div className="mb-8 rounded-2xl bg-white p-8 shadow-xl">
                            <OrderSummary
                                data={data}
                                currentStep={currentStep}
                                onEditStep={handleEditStep}
                                draftId={draftId}
                                showDiscardModal={showDiscardModal}
                                setShowDiscardModal={setShowDiscardModal}
                                handleDiscard={handleDiscard}
                            />
                            <div className="mt-8">
                                <h2 className="mb-2 text-lg font-semibold">Uploaded Files</h2>
                                {uploadedFiles.length === 0 ? (
                                    <div className="text-gray-500">No files uploaded.</div>
                                ) : (
                                    <ul className="space-y-2">
                                        {uploadedFiles.map((file) => (
                                            <li key={file.id} className="flex items-center justify-between rounded bg-gray-50 px-3 py-2">
                                                <span className="max-w-xs truncate">{file.original_filename || file.original_name}</span>
                                                <span className="ml-2 text-xs text-gray-400">{(file.size / 1024).toFixed(1)} KB</span>
                                            </li>
                                        ))}
                                    </ul>
                                )}
                            </div>
                        </div>
                        <div className="flex flex-col justify-center gap-4 sm:flex-row">
                            <button
                                className="rounded-lg bg-gradient-to-r from-blue-600 to-indigo-700 px-8 py-4 text-lg font-bold text-white shadow-lg transition-all hover:from-blue-500 hover:to-indigo-600"
                                onClick={async () => {
                                    if (!draftId) return;
                                    await axios.post(`/client/orders/${draftId}/submit`);
                                    window.location.href = '/dashboard';
                                }}
                            >
                                Proceed to Payment
                            </button>
                            <button
                                className="rounded-lg border border-gray-300 bg-white px-8 py-4 text-lg font-bold text-gray-700 shadow-lg transition-all hover:bg-gray-50"
                                onClick={async () => {
                                    // Save as pending_payment and redirect to dashboard
                                    if (draftId) {
                                        await axios.post(`/client/orders/${draftId}/pay-later`);
                                    } else {
                                        const draftRes = await axios.post('/client/orders/draft', data);
                                        await axios.post(`/client/orders/${draftRes.data.draft.id}/pay-later`);
                                    }
                                    window.location.href = '/dashboard';
                                }}
                            >
                                Pay Later (Save as Pending Payment)
                            </button>
                        </div>
                    </div>
                </div>
            </ClientLayout>
        );
    }

    return (
        <ClientLayout user={auth.user as User}>
            <div className="bg-gradient-to-b from-gray-50 to-gray-100 py-8">
                <MaxWidthWrapper className="mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-col gap-8 md:flex-row md:items-start">
                        <form onSubmit={handleSubmit} className="flex-1">
                            <div className="overflow-hidden rounded-2xl bg-white shadow-xl">
                                <div className="p-6 sm:p-8">
                                    <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
                                        <div className="flex items-center">
                                            <div className="mr-3 flex h-9 w-9 items-center justify-center rounded-full bg-blue-100 text-base font-medium text-blue-800">
                                                {currentStep}
                                            </div>
                                            <h2 className="text-xl font-bold text-gray-900">
                                                {
                                                    [
                                                        'Assignment Type',
                                                        'Service',
                                                        'Academic Level',
                                                        'Language',
                                                        'Size',
                                                        'Deadline',
                                                        'Add-ons',
                                                        'Topic',
                                                        'Subject',
                                                        'Instructions',
                                                        'Sources & Style',
                                                        'Promo code',
                                                        'Summary',
                                                    ][currentStep - 1]
                                                }
                                            </h2>
                                        </div>
                                    </div>

                                    {renderStep()}

                                    <StepActions
                                        currentStep={currentStep}
                                        onNext={handleNext}
                                        onBack={handleBack}
                                        isLastStep={currentStep === 12}
                                        processing={processing}
                                    />
                                </div>
                            </div>
                        </form>

                        <div className="w-full md:sticky md:top-8 md:w-96">
                            <OrderSummary
                                data={data}
                                currentStep={currentStep}
                                onEditStep={handleEditStep}
                                draftId={draftId}
                                showDiscardModal={showDiscardModal}
                                setShowDiscardModal={setShowDiscardModal}
                                handleDiscard={handleDiscard}
                            />
                        </div>
                    </div>
                </MaxWidthWrapper>
            </div>
        </ClientLayout>
    );
}
