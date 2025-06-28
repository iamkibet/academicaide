import { ChangeEvent } from 'react';

interface FormFieldProps {
    label: string;
    error?: string;
    htmlFor: string;
    children: React.ReactNode;
}

export const FormField = ({ label, error, htmlFor, children }: FormFieldProps) => (
    <div className="space-y-2">
        <label htmlFor={htmlFor} className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            {label}
        </label>
        {children}
        {error && (
            <p className="text-sm text-red-600 dark:text-red-400 animate-[slide-in_0.3s_ease]">
                {error}
            </p>
        )}
    </div>
);

interface InputProps {
    id: string;
    value: string;
    onChange: (e: ChangeEvent<HTMLInputElement>) => void;
    placeholder?: string;
    type?: string;
    min?: string;
    className?: string;
}

export const TextInput = ({ id, value, onChange, placeholder, className = '' }: InputProps) => (
    <input
        type="text"
        id={id}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={`mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white transition-all duration-200 hover:border-blue-400 ${className}`}
    />
);

export const NumberInput = ({ id, value, onChange, min, unit, className = '' }: InputProps & { unit?: string }) => (
    <div className="relative">
        <input
            type="number"
            id={id}
            value={value}
            onChange={onChange}
            min={min}
            className={`mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white transition-all duration-200 hover:border-blue-400 ${className}`}
        />
        {unit && (
            <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                <span className="text-gray-500 dark:text-gray-400 text-sm">{unit}</span>
            </div>
        )}
    </div>
);

export const DateTimeInput = ({ id, value, onChange, className = '' }: InputProps) => (
    <input
        type="datetime-local"
        id={id}
        value={value}
        onChange={onChange}
        className={`mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white transition-all duration-200 hover:border-blue-400 ${className}`}
    />
);

interface SelectProps extends InputProps {
    options: { value: string; label: string }[];
}

export const SelectInput = ({ id, value, onChange, options, className = '' }: SelectProps) => (
    <select
        id={id}
        value={value}
        onChange={onChange}
        className={`mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white transition-all duration-200 hover:border-blue-400 ${className}`}
    >
        <option value="">Select an option</option>
        {options.map((option) => (
            <option key={option.value} value={option.value}>
                {option.label}
            </option>
        ))}
    </select>
);

interface TextareaProps extends InputProps {
    rows?: number;
}

export const Textarea = ({ id, value, onChange, placeholder, rows = 3, className = '' }: TextareaProps) => (
    <textarea
        id={id}
        value={value}
        onChange={onChange}
        rows={rows}
        placeholder={placeholder}
        className={`mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white transition-all duration-200 hover:border-blue-400 resize-none ${className}`}
    />
);

interface SubmitButtonProps {
    processing: boolean;
}

export const SubmitButton = ({ processing }: SubmitButtonProps) => (
    <button
        type="submit"
        disabled={processing}
        className="w-full py-4 px-6 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-lg shadow-md hover:shadow-lg transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50"
    >
        {processing ? (
            <div className="flex items-center justify-center space-x-2">
                <SpinnerIcon className="w-5 h-5 animate-spin" />
                <span>Processing Order...</span>
            </div>
        ) : (
            'Start Your Order Now'
        )}
    </button>
);

const SpinnerIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg {...props} className="animate-spin" fill="none" viewBox="0 0 24 24">
        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
    </svg>
); 