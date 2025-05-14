import { Head, Link, useForm } from '@inertiajs/react';
import TipTapLink from '@tiptap/extension-link';
import Placeholder from '@tiptap/extension-placeholder';
import { EditorContent, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { FormEvent, useEffect, useRef, useState } from 'react';

interface Auth {
    user: {
        name: string;
        email: string;
    } | null;
    check: boolean;
}

interface Props {
    auth: Auth;
}

interface DeadlineOption {
    hours: number;
    label: string;
}

const DEADLINE_OPTIONS: DeadlineOption[] = [
    { hours: 3, label: '3 Hours' },
    { hours: 6, label: '6 Hours' },
    { hours: 12, label: '12 Hours' },
    { hours: 24, label: '24 Hours' },
    { hours: 48, label: '2 Days' },
    { hours: 120, label: '5 Days' },
];

interface Addon {
    id: string;
    name: string;
    price: number;
    description: string;
    isFree: boolean;
}

const ADDONS: Addon[] = [
    {
        id: 'abstract',
        name: '1-Page abstract',
        price: 12.99,
        description: 'A concise summary of your paper',
        isFree: false,
    },
    {
        id: 'graphics',
        name: 'Graphics & tables',
        price: 8.99,
        description: 'Professional visual elements',
        isFree: false,
    },
    {
        id: 'sources',
        name: 'Printable sources',
        price: 6.99,
        description: 'All sources in printable format',
        isFree: false,
    },
    {
        id: 'outline',
        name: 'Detailed outline',
        price: 9.99,
        description: 'Comprehensive paper structure',
        isFree: false,
    },
    {
        id: 'plagiarism',
        name: 'Plagiarism & AI report',
        price: 0,
        description: 'Detailed originality report',
        isFree: true,
    },
    {
        id: 'revisions',
        name: 'Unlimited revisions',
        price: 0,
        description: 'Make as many changes as needed',
        isFree: true,
    },
    {
        id: 'unlimited_sources',
        name: 'Unlimited sources',
        price: 0,
        description: 'Access to all reference materials',
        isFree: true,
    },
    {
        id: 'formatting',
        name: 'Title page and formatting',
        price: 0,
        description: 'Professional formatting included',
        isFree: true,
    },
];

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
    is_urgent: boolean;
    size_unit: string;
    addons: string[];
    subject: string;
    files: File[];
    source_count: string;
    citation_style: string;
    [key: string]: string | number | boolean | string[] | File[];
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

const SOURCE_COUNTS = [
    { id: 'not_specified', label: 'Not specified' },
    { id: '1', label: '1 source required' },
    { id: '2', label: '2 sources required' },
    { id: '3', label: '3 sources required' },
    { id: '4', label: '4 sources required' },
    { id: '5', label: '5 sources required' },
    { id: '6', label: '6 sources required' },
    { id: '7', label: '7 sources required' },
    { id: '8', label: '8 sources required' },
    { id: '9', label: '9 sources required' },
    { id: '10', label: '10 sources required' },
    { id: '11', label: '11 sources required' },
    { id: '12', label: '12 sources required' },
    { id: '13', label: '13 sources required' },
    { id: '14', label: '14 sources required' },
    { id: '15', label: '15 sources required' },
    { id: '16', label: '16 sources required' },
];

const CITATION_STYLES = [
    { id: 'apa_6', label: 'APA 6th edition' },
    { id: 'apa_7', label: 'APA 7th edition' },
    { id: 'asa', label: 'ASA' },
    { id: 'bluebook', label: 'Bluebook' },
    { id: 'chicago', label: 'Chicago/Turabian' },
    { id: 'harvard', label: 'Harvard' },
    { id: 'ieee', label: 'IEEE' },
    { id: 'mla', label: 'MLA' },
    { id: 'other', label: 'Other' },
    { id: 'not_applicable', label: 'Not applicable' },
];

const PopularDeadlineButton = ({
    option,
    isSelected,
    onSelect,
}: {
    option: DeadlineOption;
    isSelected: boolean;
    timeLeft: string;
    onSelect: () => void;
}) => (
    <button
        type="button"
        onClick={onSelect}
        className={`flex flex-col items-start rounded-xl px-3 py-1 text-left transition-all ${
            isSelected ? 'bg-blue-50 ring-2 ring-blue-600' : 'bg-white ring-1 ring-gray-200 hover:bg-gray-50 hover:ring-gray-300'
        }`}
        aria-pressed={isSelected}
    >
        <span className={`text-base font-medium ${isSelected ? 'text-blue-600' : 'text-gray-900'}`}>{option.label}</span>
    </button>
);

const AddonToggle = ({ addon, isSelected, onToggle }: { addon: Addon; isSelected: boolean; onToggle: () => void }) => (
    <div className="flex items-center justify-between space-y-3 rounded-xl transition-all">
        <div className="flex-1">
            <div className="flex items-center gap-2">
                <h3 className="text-base font-medium text-gray-900">{addon.name}</h3>
                {addon.isFree && <span className="rounded-full bg-green-100 px-2 py-0.5 text-xs font-medium text-green-800">FREE</span>}
                <div className="group relative">
                    <svg className="h-4 w-4 cursor-help text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                    </svg>
                    <div className="invisible absolute bottom-full left-1/2 mb-2 w-48 -translate-x-1/2 rounded-lg bg-gray-900 px-3 py-2 text-sm text-white shadow-lg group-hover:visible">
                        {addon.description}
                        <div className="absolute top-full left-1/2 -mt-1 h-2 w-2 -translate-x-1/2 rotate-45 bg-gray-900"></div>
                    </div>
                </div>
            </div>
        </div>
        <div className="ml-4 flex items-center">
            {!addon.isFree && <span className="mr-3 text-base font-medium text-gray-900">${addon.price.toFixed(2)}</span>}
            <button
                type="button"
                role="switch"
                aria-checked={isSelected}
                onClick={onToggle}
                className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:ring-2 focus:ring-blue-600 focus:ring-offset-2 focus:outline-none ${
                    isSelected ? 'bg-blue-400' : 'bg-gray-400'
                }`}
            >
                <span
                    aria-hidden="true"
                    className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                        isSelected ? 'translate-x-5' : 'translate-x-0'
                    }`}
                />
            </button>
        </div>
    </div>
);

const subjects = [
    'Global studies',
    'Government',
    'Immigration and citizenship',
    'International affairs / relations',
    'Military science',
    'Political science',
    'Social sciences',
    'Behavioral science and human development',
    'Career and professional development',
    'Communications and media',
    'Community and society',
    'Cultural studies',
    'Family and child studies',
    'Feminism',
    'Homeland security',
    'Human relations',
    'Human services',
    'Organizational behavior',
    'Psychology',
    'Social psychology',
    'Social science',
    'Social studies',
    'Social work',
    'Sociology',
    'Student activities',
];

const suggestedSubjects = [
    'Cultural studies',
    'Business and management',
    'Advertising',
    'Nursing',
    'Business and management',
    'English',
    'Psychology',
    'Healthcare',
];

const RichTextEditor = ({ content, onChange }: { content: string; onChange: (content: string) => void }) => {
    const editor = useEditor({
        extensions: [
            StarterKit,
            TipTapLink.configure({
                openOnClick: false,
                HTMLAttributes: {
                    class: 'text-blue-500 hover:text-blue-600 underline',
                },
            }),
            Placeholder.configure({
                placeholder: 'Enter your instructions here...',
            }),
        ],
        content: content,
        onUpdate: ({ editor }) => {
            onChange(editor.getHTML());
        },
        editorProps: {
            attributes: {
                class: 'prose prose-sm max-w-none min-h-[200px] focus:outline-none',
            },
        },
    });

    if (!editor) {
        return null;
    }

    const handleButtonClick = (callback: () => void) => {
        callback();
        editor.commands.focus();
    };

    return (
        <div className="rounded-lg border border-gray-200 bg-white">
            <div className="flex items-center border-b border-gray-200 bg-gray-50 p-2">
                <div className="flex items-center gap-1">
                    <button
                        onClick={() => handleButtonClick(() => editor.chain().focus().toggleBold().run())}
                        className={`rounded p-1 hover:bg-gray-200 ${editor.isActive('bold') ? 'bg-gray-200' : ''}`}
                        title="Bold"
                    >
                        <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 12h8a4 4 0 100-8H6v8zm0 0h8a4 4 0 110 8H6v-8z" />
                        </svg>
                    </button>
                    <button
                        onClick={() => handleButtonClick(() => editor.chain().focus().toggleItalic().run())}
                        className={`rounded p-1 hover:bg-gray-200 ${editor.isActive('italic') ? 'bg-gray-200' : ''}`}
                        title="Italic"
                    >
                        <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l-4 4-4-4" />
                        </svg>
                    </button>
                    <button
                        onClick={() => handleButtonClick(() => editor.chain().focus().toggleBulletList().run())}
                        className={`rounded p-1 hover:bg-gray-200 ${editor.isActive('bulletList') ? 'bg-gray-200' : ''}`}
                        title="Bullet List"
                    >
                        <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                        </svg>
                    </button>
                    <button
                        onClick={() => handleButtonClick(() => editor.chain().focus().toggleOrderedList().run())}
                        className={`rounded p-1 hover:bg-gray-200 ${editor.isActive('orderedList') ? 'bg-gray-200' : ''}`}
                        title="Numbered List"
                    >
                        <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M7 20h14M7 12h14M7 4h14M3 20h.01M3 12h.01M3 4h.01"
                            />
                        </svg>
                    </button>
                    <button
                        onClick={() => {
                            const url = window.prompt('Enter URL');
                            if (url) {
                                handleButtonClick(() => editor.chain().focus().setLink({ href: url }).run());
                            }
                        }}
                        className={`rounded p-1 hover:bg-gray-200 ${editor.isActive('link') ? 'bg-gray-200' : ''}`}
                        title="Add Link"
                    >
                        <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"
                            />
                        </svg>
                    </button>
                </div>
            </div>
            <EditorContent editor={editor} className="p-4" />
        </div>
    );
};

export default function Create({ auth }: Props) {
    const [currentStep, setCurrentStep] = useState(1);
    const [searchQuery, setSearchQuery] = useState('');
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [editingStep, setEditingStep] = useState<number | null>(null);
    const [isDragging, setIsDragging] = useState(false);
    const [completedSteps, setCompletedSteps] = useState<number[]>(() => {
        const savedSteps = localStorage.getItem('completedSteps');
        return savedSteps ? JSON.parse(savedSteps) : [];
    });
    const fileInputRef = useRef<HTMLInputElement>(null);
    const { data, setData, post, processing, errors } = useForm<OrderFormData>({
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
        is_urgent: false,
        size_unit: 'pages',
        addons: [],
        subject: '',
        files: [],
        source_count: 'not_specified',
        citation_style: 'not_applicable',
    });

    // Load form data from localStorage on component mount
    useEffect(() => {
        const savedData = localStorage.getItem('orderFormData');
        if (savedData) {
            const parsedData = JSON.parse(savedData);
            setData(parsedData);
        }
    }, []);

    // Save form data to localStorage whenever it changes
    useEffect(() => {
        localStorage.setItem('orderFormData', JSON.stringify(data));
    }, [data]);

    // Save completed steps to localStorage whenever they change
    useEffect(() => {
        localStorage.setItem('completedSteps', JSON.stringify(completedSteps));
    }, [completedSteps]);

    const handleNext = (step: number) => {
        setCurrentStep(step + 1);
        if (!completedSteps.includes(step)) {
            setCompletedSteps([...completedSteps, step]);
        }
    };

    const handleEdit = (step: number) => {
        setEditingStep(step);
    };

    const handleUpdate = () => {
        setEditingStep(null);
    };

    const filteredSubjects = subjects.filter((subject) => subject.toLowerCase().includes(searchQuery.toLowerCase()));

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        if (processing) return;

        post(route('client.orders.store'), {
            onSuccess: () => {
                // Clear localStorage after successful submission
                localStorage.removeItem('orderFormData');
                localStorage.removeItem('completedSteps');
                setCompletedSteps([]);
            },
            onError: (errors) => {
                console.error(errors);
            },
        });
    };

    const handleIncrement = () => {
        const newValue = data.size_unit === 'pages' ? data.pages + 1 : data.words + 275;
        if (data.size_unit === 'pages') {
            setData('pages', newValue);
            setData('words', newValue * 275);
        } else {
            setData('words', newValue);
            setData('pages', Math.ceil(newValue / 275));
        }
    };

    const handleDecrement = () => {
        const newValue = data.size_unit === 'pages' ? Math.max(1, data.pages - 1) : Math.max(275, data.words - 275);
        if (data.size_unit === 'pages') {
            setData('pages', newValue);
            setData('words', newValue * 275);
        } else {
            setData('words', newValue);
            setData('pages', Math.ceil(newValue / 275));
        }
    };

    const handleOptionSelect = (field: keyof OrderFormData, value: string | number) => {
        setData(field, value);
        if (editingStep) {
            setEditingStep(null);
        } else if (currentStep < 11) {
            handleNext(currentStep);
        }
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            const newFiles = Array.from(e.target.files);
            setData('files', [...data.files, ...newFiles]);
        }
    };

    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(true);
    };

    const handleDragLeave = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(false);
    };

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(false);
        if (e.dataTransfer.files) {
            const newFiles = Array.from(e.dataTransfer.files);
            setData('files', [...data.files, ...newFiles]);
        }
    };

    const removeFile = (index: number) => {
        const newFiles = [...data.files];
        newFiles.splice(index, 1);
        setData('files', newFiles);
    };

    const renderOrderSummary = () => {
        const summaryItems = [];

        if (completedSteps.includes(1) && data.assignment_type) {
            const selectedType = assignmentTypes.find((type) => type.id === data.assignment_type);
            summaryItems.push({
                label: 'Assignment type',
                value: selectedType?.label || '',
                step: 1,
            });
        }

        if (completedSteps.includes(2) && data.service_type) {
            const selectedService = serviceTypes.find((type) => type.id === data.service_type);
            summaryItems.push({
                label: 'Service',
                value: selectedService?.label || '',
                step: 2,
            });
        }

        if (completedSteps.includes(3) && data.academic_level) {
            const selectedLevel = academicLevels.find((level) => level.id === data.academic_level);
            summaryItems.push({
                label: 'Academic level',
                value: selectedLevel?.label || '',
                step: 3,
            });
        }

        if (completedSteps.includes(4) && data.language) {
            const selectedLang = languages.find((lang) => lang.id === data.language);
            summaryItems.push({
                label: 'Language',
                value: selectedLang?.label || '',
                step: 4,
            });
        }

        if (completedSteps.includes(5) && data.pages && data.line_spacing) {
            summaryItems.push({
                label: 'Size',
                value: `${data.pages} pages (${data.words} words) - ${data.line_spacing} spacing`,
                step: 5,
            });
        }

        if (completedSteps.includes(6) && data.deadline) {
            const deadlineDate = new Date(data.deadline);
            const formattedDeadline = deadlineDate.toLocaleString();
            summaryItems.push({
                label: 'Deadline',
                value: formattedDeadline,
                step: 6,
            });
        }

        if (completedSteps.includes(7)) {
            const addonCount = data.addons.length;
            summaryItems.push({
                label: 'Add-ons',
                value: addonCount > 0 ? `${addonCount} addon${addonCount > 1 ? 's' : ''} selected` : 'None selected',
                step: 7,
            });
        }

        if (completedSteps.includes(8) && data.instructions) {
            summaryItems.push({
                label: 'Assignment Topic',
                value: data.instructions,
                step: 8,
            });
        }

        if (completedSteps.includes(9) && data.subject) {
            summaryItems.push({
                label: 'Subject',
                value: data.subject,
                step: 9,
            });
        }

        if (completedSteps.includes(10) && data.client_notes) {
            const tempDiv = document.createElement('div');
            tempDiv.innerHTML = data.client_notes;
            const textContent = tempDiv.textContent?.trim() || '';
            const words = textContent.split(/\s+/);
            const truncatedText = words.slice(0, 3).join(' ') + (words.length > 3 ? '...' : '');

            summaryItems.push({
                label: 'Instructions',
                value: truncatedText,
                step: 10,
            });
        }

        if (completedSteps.includes(11)) {
            const selectedSourceCount = SOURCE_COUNTS.find((count) => count.id === data.source_count);
            const selectedStyle = CITATION_STYLES.find((style) => style.id === data.citation_style);

            const sourceText = selectedSourceCount ? selectedSourceCount.label : 'Not specified';
            const citationText = selectedStyle ? selectedStyle.label : 'Not specified';

            summaryItems.push({
                label: 'Sources & Citation',
                value: `${sourceText} / ${citationText}`,
                step: 11,
            });
        }

        if (summaryItems.length === 0) return null;

        return (
            <div className="mb-8 space-y-1">
                {summaryItems.map((item) => (
                    <div
                        key={item.label}
                        className={`rounded-lg border border-gray-200 bg-white px-4 py-2 transition-all duration-200 ${
                            editingStep === item.step ? 'ring-2 ring-blue-500' : ''
                        }`}
                    >
                        <div className="flex items-center justify-between gap-4">
                            <div className="flex flex-1 items-center justify-between">
                                <span className="text-base font-medium text-gray-500">{item.label}</span>
                                <p className="ml-4 text-base font-medium text-gray-900">{item.value}</p>
                            </div>
                            <button
                                type="button"
                                onClick={() => handleEdit(item.step)}
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
                        {editingStep === item.step && (
                            <div className="mt-4 border-t border-gray-100 pt-4">
                                {renderStep(item.step)}
                                <div className="mt-4 flex justify-end">
                                    <button
                                        type="button"
                                        onClick={handleUpdate}
                                        className="rounded-md bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
                                    >
                                        Update
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        );
    };

    const renderStep = (step: number) => {
        const filteredTypes = assignmentTypes.filter((type) => type.label.toLowerCase().includes(searchQuery.toLowerCase()));
        const popularTypes = assignmentTypes.filter((type) => type.popular);
        const otherTypes = filteredTypes.filter((type) => !type.popular);

        const renderStepContent = () => {
            switch (step) {
                case 1:
                    return (
                        <div className="space-y-8">
                            <div className="text-start">
                                <h2 className="text-2xl font-bold text-gray-900">Assignment type</h2>
                            </div>

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
                                            data.service_type === type.id
                                                ? 'border-blue-500 bg-blue-50 text-blue-700'
                                                : 'border-gray-200 text-gray-700'
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
                            <div className="mt-8">
                                <div className="flex items-center justify-between rounded-2xl border border-gray-200 bg-gradient-to-br from-white to-gray-50 p-4 shadow-sm">
                                    <div className="flex items-center gap-3 rounded-xl bg-white/80 p-2 ring-1 ring-gray-100/50 backdrop-blur-sm">
                                        <div className="flex items-center gap-1.5 rounded-lg bg-gray-50 p-1.5 ring-1 ring-gray-200/30">
                                            <button
                                                onClick={() => setData('size_unit', 'pages')}
                                                className={`rounded-lg px-4 py-2 transition-all duration-200 ${
                                                    data.size_unit === 'pages'
                                                        ? 'bg-gradient-to-br from-blue-600 to-blue-500 text-white shadow-sm'
                                                        : 'bg-transparent text-gray-500 hover:bg-gray-100/50'
                                                } flex items-center gap-2 text-sm font-medium`}
                                            >
                                                Pages
                                            </button>
                                            <button
                                                onClick={() => setData('size_unit', 'words')}
                                                className={`rounded-lg px-4 py-2 transition-all duration-200 ${
                                                    data.size_unit === 'words'
                                                        ? 'bg-gradient-to-br from-blue-600 to-blue-500 text-white shadow-sm'
                                                        : 'bg-transparent text-gray-500 hover:bg-gray-100/50'
                                                } flex items-center gap-2 text-sm font-medium`}
                                            >
                                                Words
                                            </button>
                                        </div>
                                    </div>
                                    <div>
                                        <div className="flex-col items-center justify-center rounded-lg border border-gray-100 bg-white p-3 shadow-sm">
                                            <div className="flex items-center gap-4">
                                                <button
                                                    onClick={handleDecrement}
                                                    className="flex h-8 w-8 items-center justify-center rounded-lg bg-gray-50 text-gray-600 transition-all hover:bg-blue-50 hover:text-blue-600 focus:ring-2 focus:ring-blue-500 focus:ring-offset-1 focus:outline-none"
                                                >
                                                    <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                                                    </svg>
                                                </button>

                                                <div className="flex flex-col items-center">
                                                    <input
                                                        type="number"
                                                        value={data.size_unit === 'pages' ? data.pages : data.words}
                                                        onChange={(e) => {
                                                            const value = parseInt(e.target.value) || 0;
                                                            setData(data.size_unit === 'pages' ? 'pages' : 'words', value);
                                                        }}
                                                        className="w-16 rounded-md bg-gray-50/50 text-center text-xl font-bold text-gray-900 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                                    />
                                                </div>

                                                <button
                                                    onClick={handleIncrement}
                                                    className="flex h-8 w-8 items-center justify-center rounded-lg bg-gray-50 text-gray-600 transition-all hover:bg-blue-50 hover:text-blue-600 focus:ring-2 focus:ring-blue-500 focus:ring-offset-1 focus:outline-none"
                                                >
                                                    <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                                                    </svg>
                                                </button>
                                            </div>
                                        </div>
                                        <div className="mt-1 flex items-center justify-center text-xs text-gray-500">
                                            {data.size_unit === 'pages' ? data.words : data.pages} {data.size_unit === 'pages' ? 'words' : 'pages'}
                                        </div>
                                    </div>
                                    <div className="flex h-[72px] w-32 flex-col py-1">
                                        <label htmlFor="line-spacing" className="text-xs font-medium text-gray-700">
                                            Line spacing
                                        </label>
                                        <div className="relative mt-1 w-full">
                                            <select
                                                id="line-spacing"
                                                name="line_spacing"
                                                value={data.line_spacing}
                                                onChange={(e) => setData('line_spacing', e.target.value)}
                                                className="w-full appearance-none rounded-lg border border-gray-300 bg-white px-3 py-3 text-sm font-medium text-gray-700 shadow-sm transition-all hover:border-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:ring-offset-0 focus:outline-none disabled:cursor-not-allowed disabled:bg-gray-50 disabled:text-gray-500"
                                                aria-label="Select line spacing"
                                            >
                                                {lineSpacingOptions.map((option) => (
                                                    <option
                                                        key={option.id}
                                                        value={option.id}
                                                        className="px-3 py-2 text-sm font-medium text-gray-700 hover:bg-white focus:bg-white"
                                                    >
                                                        {option.label}
                                                    </option>
                                                ))}
                                            </select>
                                            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2">
                                                <svg className="h-4 w-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                                </svg>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    );

                case 6:
                    return (
                        <div className="space-y-6">
                            <div className="mt-8 space-y-6">
                                <div>
                                    <div className="space-y-1">
                                        <h2 className="text-2xl font-semibold text-gray-900">Select Deadline</h2>
                                    </div>

                                    <div className="mt-6 rounded-xl bg-white p-6 shadow-sm ring-1 ring-gray-900/5">
                                        <div className="space-y-4">
                                            <div className="flex items-center justify-between">
                                                <label htmlFor="custom-deadline" className="block text-sm font-medium text-gray-700">
                                                    Custom Deadline
                                                    <span className="ml-2 text-xs text-gray-400">(UTC)</span>
                                                </label>
                                            </div>

                                            <div
                                                className="relative cursor-pointer rounded-lg border-0 bg-gray-50 ring-1 ring-gray-300 transition-all ring-inset focus-within:ring-2 focus-within:ring-blue-600 hover:ring-gray-400"
                                                onClick={() => {
                                                    const input = document.getElementById('custom-deadline') as HTMLInputElement;
                                                    if (input) input.showPicker();
                                                }}
                                            >
                                                <input
                                                    id="custom-deadline"
                                                    type="datetime-local"
                                                    value={data.deadline}
                                                    onChange={(e) => setData('deadline', e.target.value)}
                                                    min={new Date().toISOString().slice(0, 16)}
                                                    className="w-full cursor-pointer rounded-lg bg-transparent px-4 py-3 text-base text-gray-900 placeholder:text-gray-400 focus:outline-none"
                                                    aria-describedby="deadline-description"
                                                />
                                            </div>
                                            <p id="deadline-description" className="text-sm text-gray-500">
                                                {data.deadline
                                                    ? `Selected: ${new Date(data.deadline).toLocaleString()}`
                                                    : 'Click to choose date and time'}
                                            </p>
                                        </div>
                                    </div>

                                    <div className="mt-6 space-y-4">
                                        <h3 className="text-sm font-medium text-gray-700">Quick Selection</h3>
                                        <div className="flex flex-wrap gap-3">
                                            {DEADLINE_OPTIONS.map((option) => {
                                                const deadline = new Date();
                                                deadline.setHours(deadline.getHours() + option.hours);
                                                const formattedDeadline = deadline.toISOString().slice(0, 16);
                                                const isSelected = data.deadline === formattedDeadline;
                                                const timeLeft = `${option.hours} hour${option.hours > 1 ? 's' : ''}`;

                                                return (
                                                    <PopularDeadlineButton
                                                        key={option.hours}
                                                        option={option}
                                                        isSelected={isSelected}
                                                        timeLeft={timeLeft}
                                                        onSelect={() => setData('deadline', formattedDeadline)}
                                                    />
                                                );
                                            })}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    );

                case 7:
                    return (
                        <div className="space-y-6">
                            <div className="text-start">
                                <h2 className="text-2xl font-bold text-gray-900">Add-ons</h2>
                                <p className="mt-2 text-sm text-gray-500">Enhance your order with these additional features</p>
                            </div>

                            <div className="mt-8">
                                <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
                                    <div className="rounded-lg bg-gradient-to-br from-gray-50 to-gray-100 p-4 shadow-sm ring-1 ring-gray-200/50">
                                        <h3 className="mb-4 text-lg font-semibold text-gray-900">Premium Features</h3>
                                        <div className="space-y-3">
                                            {ADDONS.filter((addon) => !addon.isFree).map((addon) => (
                                                <AddonToggle
                                                    key={addon.id}
                                                    addon={addon}
                                                    isSelected={data.addons.includes(addon.id)}
                                                    onToggle={() => {
                                                        const newAddons = data.addons.includes(addon.id)
                                                            ? data.addons.filter((id) => id !== addon.id)
                                                            : [...data.addons, addon.id];
                                                        setData('addons', newAddons);
                                                    }}
                                                />
                                            ))}
                                        </div>
                                    </div>

                                    <div className="rounded-lg bg-gradient-to-br from-gray-50 to-gray-100 p-4 shadow-sm ring-1 ring-gray-200/50">
                                        <h3 className="mb-4 text-lg font-semibold text-gray-900">On Us</h3>
                                        <div className="space-y-3">
                                            {ADDONS.filter((addon) => addon.isFree).map((addon) => (
                                                <div
                                                    key={addon.id}
                                                    className="flex items-center justify-between rounded-lg p-1 transition-all hover:ring-gray-300/50"
                                                >
                                                    <div className="flex-1">
                                                        <div className="flex items-center gap-2">
                                                            <h3 className="text-base font-medium text-gray-900">{addon.name}</h3>
                                                            <span className="rounded-full bg-emerald-100 px-2 py-0.5 text-xs font-medium text-emerald-700">
                                                                FREE
                                                            </span>
                                                            <div className="group relative">
                                                                <svg
                                                                    className="h-4 w-4 cursor-help text-gray-400 transition-colors hover:text-gray-600"
                                                                    fill="none"
                                                                    stroke="currentColor"
                                                                    viewBox="0 0 24 24"
                                                                >
                                                                    <path
                                                                        strokeLinecap="round"
                                                                        strokeLinejoin="round"
                                                                        strokeWidth={2}
                                                                        d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                                                    />
                                                                </svg>
                                                                <div className="invisible absolute bottom-full left-1/2 mb-2 w-48 -translate-x-1/2 rounded-lg bg-gray-900/95 px-3 py-2 text-sm text-white shadow-lg backdrop-blur-sm group-hover:visible">
                                                                    {addon.description}
                                                                    <div className="absolute top-full left-1/2 -mt-1 h-2 w-2 -translate-x-1/2 rotate-45 bg-gray-900/95"></div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    );

                case 8:
                    return (
                        <div className="space-y-6">
                            <div className="text-start">
                                <h2 className="text-2xl font-bold text-gray-900">Assignment Topic</h2>
                            </div>

                            <div className="mt-8">
                                <div className="rounded-lg bg-gradient-to-br from-gray-50 to-gray-100 p-6 shadow-sm ring-1 ring-gray-200/50">
                                    <div className="space-y-4">
                                        <div>
                                            <div className="flex items-center justify-between">
                                                <label htmlFor="topic" className="block text-sm font-medium text-gray-700">
                                                    Assignment Topic or Name
                                                </label>
                                                <div className="group relative mt-2">
                                                    <svg
                                                        className="h-4 w-4 cursor-help text-gray-400"
                                                        fill="none"
                                                        stroke="currentColor"
                                                        viewBox="0 0 24 24"
                                                    >
                                                        <path
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            strokeWidth={2}
                                                            d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                                        />
                                                    </svg>
                                                    <div className="invisible absolute bottom-full left-1/2 mb-2 w-48 -translate-x-1/2 rounded-lg bg-gray-900 px-3 py-2 text-sm text-white shadow-lg group-hover:visible">
                                                        Provide a clear and concise title or topic for your assignment
                                                        <div className="absolute top-full left-1/2 -mt-1 h-2 w-2 -translate-x-1/2 rotate-45 bg-gray-900"></div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="mt-2">
                                                <input
                                                    type="text"
                                                    id="topic"
                                                    name="topic"
                                                    value={data.instructions}
                                                    onChange={(e) => setData('instructions', e.target.value)}
                                                    className="block w-full rounded-lg border-0 bg-white px-4 py-3 text-gray-900 shadow-sm ring-1 ring-gray-300 ring-inset placeholder:text-gray-400 focus:ring-2 focus:ring-blue-600 focus:ring-inset sm:text-sm sm:leading-6"
                                                    placeholder="e.g., The Impact of Climate Change on Global Agriculture"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    );

                case 9:
                    return (
                        <div className="space-y-6">
                            <div className="text-start">
                                <h2 className="text-2xl font-bold text-gray-900">Subject</h2>
                                <p className="mt-2 text-sm text-gray-500">Choose your subject</p>
                            </div>

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
                                            placeholder="Search subjects..."
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
                                        {filteredSubjects.length === 0 ? (
                                            <div className="px-4 py-2 text-gray-500">No results found</div>
                                        ) : (
                                            filteredSubjects.map((subject) => (
                                                <button
                                                    key={subject}
                                                    type="button"
                                                    onClick={() => {
                                                        handleOptionSelect('subject', subject);
                                                        setIsDropdownOpen(false);
                                                    }}
                                                    className="w-full px-4 py-2 text-left text-gray-700 hover:bg-blue-50"
                                                >
                                                    {subject}
                                                </button>
                                            ))
                                        )}
                                    </div>
                                )}
                            </div>

                            <div className="mt-8">
                                <h3 className="mb-4 text-lg font-semibold text-gray-900">Suggested</h3>
                                <div className="flex flex-wrap gap-2">
                                    {suggestedSubjects.map((subject) => {
                                        const isSelected = data.subject === subject;
                                        const buttonClasses = `
                                            group relative flex  items-center rounded-md border px-3 py-2
                                            text-left text-base transition-all duration-200 ease-in-out
                                            hover:border-blue-300 hover:bg-blue-50 hover:shadow-sm
                                            focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1
                                            ${isSelected ? 'border-blue-500 bg-blue-50 ' : 'border-gray-200'}
                                        `;

                                        return (
                                            <button
                                                key={subject}
                                                type="button"
                                                onClick={() => handleOptionSelect('subject', subject)}
                                                className={buttonClasses.trim()}
                                            >
                                                <span className="font-medium text-gray-700 group-hover:text-gray-900">{subject}</span>
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
                        </div>
                    );

                case 10:
                    return (
                        <div className="space-y-6">
                            <div className="text-start">
                                <h2 className="text-2xl font-bold text-gray-900">Instructions</h2>
                                <div className="mt-2 flex items-center gap-2">
                                    <p className="mt-2 text-sm text-gray-500">
                                        Describe your assignment. Share references, links to articles, and list any other instructions.
                                    </p>
                                    <div className="group relative inline-block text-center">
                                        <svg className="h-4 w-4 cursor-help text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                            />
                                        </svg>
                                        <div className="invisible absolute bottom-full left-1/2 mb-2 w-64 -translate-x-1/2 rounded-lg bg-gray-900/95 px-3 py-2 text-sm text-white shadow-lg backdrop-blur-sm group-hover:visible">
                                            Do not share personal information (name, email, phone number, etc.)
                                            <div className="absolute top-full left-1/2 -mt-1 h-2 w-2 -translate-x-1/2 rotate-45 bg-gray-900/95"></div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-8 space-y-6">
                                <RichTextEditor content={data.client_notes} onChange={(content) => setData('client_notes', content)} />

                                <div
                                    className={`relative rounded-lg border-2 border-dashed p-4 transition-colors ${
                                        isDragging ? 'border-blue-500 bg-blue-50' : 'border-gray-300 bg-white'
                                    }`}
                                    onDragOver={handleDragOver}
                                    onDragLeave={handleDragLeave}
                                    onDrop={handleDrop}
                                >
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-3">
                                            <svg className="h-8 w-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth={2}
                                                    d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                                                />
                                            </svg>
                                            <div>
                                                <button
                                                    type="button"
                                                    onClick={() => fileInputRef.current?.click()}
                                                    className="text-sm font-semibold text-gray-900 hover:text-gray-700"
                                                >
                                                    Browse files
                                                </button>
                                                <input type="file" ref={fileInputRef} onChange={handleFileChange} multiple className="hidden" />
                                                <p className="text-xs text-gray-500">or drag and drop files here</p>
                                            </div>
                                        </div>
                                        <p className="text-xs text-gray-500">Max file size: 150 MB</p>
                                    </div>
                                </div>

                                {data.files.length > 0 && (
                                    <div className="rounded-lg border border-gray-200 bg-white p-3">
                                        <h3 className="mb-2 text-sm font-medium text-gray-900">Uploaded Files</h3>
                                        <ul className="divide-y divide-gray-200">
                                            {data.files.map((file, index) => (
                                                <li key={index} className="flex items-center justify-between py-2">
                                                    <div className="flex items-center">
                                                        <svg className="h-4 w-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path
                                                                strokeLinecap="round"
                                                                strokeLinejoin="round"
                                                                strokeWidth={2}
                                                                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                                                            />
                                                        </svg>
                                                        <span className="ml-2 text-sm text-gray-900">{file.name}</span>
                                                    </div>
                                                    <button
                                                        type="button"
                                                        onClick={() => removeFile(index)}
                                                        className="rounded-full p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-500"
                                                    >
                                                        <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path
                                                                strokeLinecap="round"
                                                                strokeLinejoin="round"
                                                                strokeWidth={2}
                                                                d="M6 18L18 6M6 6l12 12"
                                                            />
                                                        </svg>
                                                    </button>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                )}
                            </div>
                        </div>
                    );

                case 11:
                    return (
                        <div className="space-y-8">
                            <div className="text-start">
                                <h2 className="text-2xl font-bold text-gray-900">Review & Submit</h2>
                                <p className="mt-2 text-sm text-gray-500">Review your order details before submitting</p>
                            </div>

                            <div className="mt-8 space-y-6">
                                <div className="rounded-lg bg-gradient-to-br from-gray-50 to-gray-100 p-6 shadow-sm ring-1 ring-gray-200/50">
                                    <h3 className="mb-4 text-lg font-semibold text-gray-900">Order Summary</h3>
                                    <dl className="space-y-4">
                                        <div className="flex justify-between">
                                            <dt className="text-gray-600">Assignment Type</dt>
                                            <dd className="font-medium text-gray-900">
                                                {assignmentTypes.find((t) => t.id === data.assignment_type)?.label}
                                            </dd>
                                        </div>
                                        <div className="flex justify-between">
                                            <dt className="text-gray-600">Service</dt>
                                            <dd className="font-medium text-gray-900">
                                                {serviceTypes.find((t) => t.id === data.service_type)?.label}
                                            </dd>
                                        </div>
                                        <div className="flex justify-between">
                                            <dt className="text-gray-600">Academic Level</dt>
                                            <dd className="font-medium text-gray-900">
                                                {academicLevels.find((l) => l.id === data.academic_level)?.label}
                                            </dd>
                                        </div>
                                        <div className="flex justify-between">
                                            <dt className="text-gray-600">Size</dt>
                                            <dd className="font-medium text-gray-900">
                                                {data.pages} pages ({data.words} words) - {data.line_spacing} spacing
                                            </dd>
                                        </div>
                                        <div className="flex justify-between">
                                            <dt className="text-gray-600">Deadline</dt>
                                            <dd className="font-medium text-gray-900">{new Date(data.deadline).toLocaleString()}</dd>
                                        </div>
                                        {data.subject && (
                                            <div className="flex justify-between">
                                                <dt className="text-gray-600">Subject</dt>
                                                <dd className="font-medium text-gray-900">{data.subject}</dd>
                                            </div>
                                        )}
                                        {data.addons.length > 0 && (
                                            <div className="flex justify-between">
                                                <dt className="text-gray-600">Add-ons</dt>
                                                <dd className="font-medium text-gray-900">{data.addons.length} selected</dd>
                                            </div>
                                        )}
                                        {data.files.length > 0 && (
                                            <div className="flex justify-between">
                                                <dt className="text-gray-600">Files</dt>
                                                <dd className="font-medium text-gray-900">{data.files.length} attached</dd>
                                            </div>
                                        )}
                                    </dl>
                                </div>

                                <div className="flex items-center justify-between rounded-lg bg-blue-50 p-4">
                                    <div className="flex items-center">
                                        <svg className="h-5 w-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                            />
                                        </svg>
                                        <p className="ml-3 text-sm text-blue-700">You can edit your order details after submission if needed.</p>
                                    </div>
                                </div>

                                <div className="flex justify-end space-x-4">
                                    <button
                                        type="button"
                                        onClick={() => setCurrentStep(currentStep - 1)}
                                        className="rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-semibold text-gray-700 shadow-sm hover:bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none"
                                    >
                                        Back
                                    </button>
                                    <button
                                        type="submit"
                                        disabled={processing}
                                        className={`rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none ${
                                            processing ? 'cursor-not-allowed opacity-50' : ''
                                        }`}
                                    >
                                        {processing ? 'Submitting...' : 'Submit Order'}
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
            <div className="space-y-6">
                {renderStepContent()}

                {/* Show Next button only when not editing and step is less than 11 */}
                {!editingStep && step < 11 && (
                    <div className="flex justify-between pt-6">
                        <button
                            type="button"
                            onClick={() => handleNext(step)}
                            className="rounded-lg bg-blue-600 px-4 py-2 text-lg font-semibold text-white transition-colors hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none"
                        >
                            Next
                        </button>
                    </div>
                )}
            </div>
        );
    };

    return (
        <>
            <Head title="Create Order" />
            <div className="min-h-screen bg-gray-50 py-8">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="mb-8">
                        <h1 className="text-3xl font-bold text-gray-900">Create New Order</h1>
                        {auth.check ? (
                            <p className="mt-2 text-sm text-gray-600">
                                Logged in as <span className="font-medium">{auth.user?.name}</span>
                            </p>
                        ) : (
                            <p className="mt-2 text-sm text-gray-600">
                                Please{' '}
                                <Link href={route('login')} className="text-blue-600 hover:text-blue-500">
                                    log in
                                </Link>{' '}
                                or{' '}
                                <Link href={route('register')} className="text-blue-600 hover:text-blue-500">
                                    register
                                </Link>{' '}
                                to track your order
                            </p>
                        )}
                    </div>

                    <div className="bg-gray-50 py-12">
                        <div className="mx-auto max-w-3xl">
                            {renderOrderSummary()}

                            {!editingStep && (
                                <div className="overflow-hidden bg-white shadow-xl sm:rounded-lg">
                                    <div className="p-8">
                                        <form onSubmit={handleSubmit}>
                                            {renderStep(currentStep)}
                                            {Object.keys(errors).length > 0 && (
                                                <div className="mt-4 rounded-md bg-red-50 p-4">
                                                    <div className="flex">
                                                        <div className="flex-shrink-0">
                                                            <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                                                                <path
                                                                    fillRule="evenodd"
                                                                    d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                                                                    clipRule="evenodd"
                                                                />
                                                            </svg>
                                                        </div>
                                                        <div className="ml-3">
                                                            <h3 className="text-sm font-medium text-red-800">
                                                                There were errors with your submission
                                                            </h3>
                                                            <div className="mt-2 text-sm text-red-700">
                                                                <ul className="list-disc space-y-1 pl-5">
                                                                    {Object.entries(errors).map(([key, value]) => (
                                                                        <li key={key}>{value}</li>
                                                                    ))}
                                                                </ul>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            )}
                                            {currentStep === 11 && (
                                                <div className="mt-6 space-y-6">
                                                    {!auth.check && (
                                                        <div className="rounded-lg bg-blue-50 p-4">
                                                            <div className="flex items-center">
                                                                <svg
                                                                    className="h-5 w-5 text-blue-400"
                                                                    fill="none"
                                                                    stroke="currentColor"
                                                                    viewBox="0 0 24 24"
                                                                >
                                                                    <path
                                                                        strokeLinecap="round"
                                                                        strokeLinejoin="round"
                                                                        strokeWidth={2}
                                                                        d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                                                    />
                                                                </svg>
                                                                <p className="ml-3 text-sm text-blue-700">
                                                                    Please{' '}
                                                                    <Link
                                                                        href={route('login')}
                                                                        className="font-medium text-blue-600 hover:text-blue-500"
                                                                    >
                                                                        log in
                                                                    </Link>{' '}
                                                                    or{' '}
                                                                    <Link
                                                                        href={route('register')}
                                                                        className="font-medium text-blue-600 hover:text-blue-500"
                                                                    >
                                                                        register
                                                                    </Link>{' '}
                                                                    to track your order
                                                                </p>
                                                            </div>
                                                        </div>
                                                    )}
                                                    <div className="flex justify-end space-x-4">
                                                        <button
                                                            type="button"
                                                            onClick={() => setCurrentStep(currentStep - 1)}
                                                            className="rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-semibold text-gray-700 shadow-sm hover:bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none"
                                                        >
                                                            Back
                                                        </button>
                                                        <button
                                                            type="submit"
                                                            disabled={processing}
                                                            className={`rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none ${
                                                                processing ? 'cursor-not-allowed opacity-50' : ''
                                                            }`}
                                                        >
                                                            {processing ? 'Submitting...' : 'Submit Order'}
                                                        </button>
                                                    </div>
                                                </div>
                                            )}
                                        </form>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
