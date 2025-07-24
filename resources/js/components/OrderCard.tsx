import { Link } from '@inertiajs/react';
import { AlertCircle, Book, Check, Clock, DollarSign, File, MessageSquare, User, X } from 'lucide-react';

interface OrderCardProps {
    order: {
        id: number;
        title: string;
        status: string;
        deadline: string;
        subject: string;
        pages: number;
        academic_level: string;
        total_price: number;
        progress?: number;
    };
}

const STATUS_STEPS = [
    { key: 'payment', label: 'Payment', icon: <DollarSign className="h-4 w-4" /> },
    { key: 'writer', label: 'Writer', icon: <User className="h-4 w-4" /> },
    { key: 'progress', label: 'Progress', icon: <Clock className="h-4 w-4" /> },
    { key: 'review', label: 'Review', icon: <Book className="h-4 w-4" /> },
    { key: 'approval', label: 'Approval', icon: <Check className="h-4 w-4" /> },
];

const OrderCard = ({ order }: OrderCardProps) => {
    const currentStepIndex = STATUS_STEPS.findIndex((step) => step.key === order.status);

    return (
        <div className="rounded-lg border border-gray-200 bg-white shadow-sm">
            {/* Card Header */}
            <div className="border-b border-gray-200 px-4 py-3">
                <div className="flex items-center justify-between">
                    <h3 className="text-base font-semibold text-gray-800">{order.subject} / Writer's choice</h3>
                    <div className="flex items-center gap-1 rounded-full bg-gray-100 px-2.5 py-0.5 text-xs font-medium text-gray-600">
                        <Clock className="h-3.5 w-3.5" />
                        <span>Deadline: {new Date(order.deadline).toLocaleDateString()}</span>
                    </div>
                </div>
            </div>

            {/* Enhanced Progress Indicator */}
            <div className="relative border-b border-slate-200/60 bg-gradient-to-r from-slate-50 to-blue-50/30 px-4 py-4">
                {/* Background decoration */}
                <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(59,130,246,0.04),transparent_60%)]"></div>
                <div className="relative">
                    {/* Step indicators */}
                    <div className="flex items-center justify-between">
                        {STATUS_STEPS.map((step, index) => (
                            <div key={step.key} className="group flex items-center">
                                {/* Step circle */}
                                <div className="relative">
                                    <div
                                        className={`flex h-7 w-7 items-center justify-center rounded-full border-2 shadow-sm transition-all duration-300 ${
                                            index < currentStepIndex
                                                ? 'border-blue-500 bg-gradient-to-br from-blue-500 to-blue-600 text-white shadow-blue-100'
                                                : index === currentStepIndex
                                                  ? 'border-blue-500 bg-white text-blue-600 ring-2 ring-blue-100'
                                                  : 'border-slate-200 bg-white text-slate-400'
                                        }`}
                                    >
                                        {index < currentStepIndex ? (
                                            <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                                                <path
                                                    fillRule="evenodd"
                                                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                                    clipRule="evenodd"
                                                />
                                            </svg>
                                        ) : (
                                            <span className="text-base font-semibold">{step.icon}</span>
                                        )}
                                    </div>
                                    {/* Pulse animation for current step */}
                                    {index === currentStepIndex && (
                                        <div className="absolute inset-0 animate-ping rounded-full bg-blue-400 opacity-15"></div>
                                    )}
                                </div>
                                {/* Connector line */}
                                {index < STATUS_STEPS.length - 1 && (
                                    <div className="relative mx-2 flex-1">
                                        <div className="h-0.5 rounded-full bg-slate-200"></div>
                                        <div
                                            className={`absolute top-0 h-0.5 rounded-full bg-gradient-to-r from-blue-500 to-blue-600 transition-all duration-500 ${index < currentStepIndex ? 'w-full' : 'w-0'}`}
                                        ></div>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                    {/* Step labels */}
                    <div className="mt-2 flex justify-between">
                        {STATUS_STEPS.map((step, index) => (
                            <div key={step.key} className="flex min-w-[60px] flex-col items-center">
                                <span
                                    className={`text-center text-xs leading-tight font-medium transition-all duration-200 ${
                                        step.key === order.status
                                            ? 'font-semibold text-blue-700'
                                            : index <= currentStepIndex
                                              ? 'text-slate-700'
                                              : 'text-slate-400'
                                    }`}
                                >
                                    {step.label}
                                </span>
                                {/* Current step indicator */}
                                {step.key === order.status && <div className="mt-1 h-1 w-4 rounded-full bg-blue-500" />}
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Order Details */}
            <div className="bg-gray-50 px-4 py-4">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    {/* Left: Order Meta */}
                    <div className="flex flex-wrap items-center gap-4 text-sm text-gray-700">
                        <div className="flex items-center gap-1">
                            <span className="text-xs text-gray-400">Order</span>
                            <span className="font-semibold text-gray-900">#{order.id}</span>
                        </div>
                        <span className="hidden text-gray-300 sm:block">|</span>
                        <div className="flex items-center gap-1">
                            <Book className="h-4 w-4 text-gray-400" />
                            <span className="font-medium">{order.subject}</span>
                        </div>
                        <span className="hidden text-gray-300 sm:block">|</span>
                        <div className="flex items-center gap-1">
                            <User className="h-4 w-4 text-gray-400" />
                            <span>{order.academic_level}</span>
                        </div>
                        <span className="hidden text-gray-300 sm:block">|</span>
                        <div className="flex items-center gap-1">
                            <File className="h-4 w-4 text-gray-400" />
                            <span>{order.pages} pages</span>
                        </div>
                    </div>
                    {/* Right: Price & Deadline */}
                    <div className="flex min-w-[120px] flex-col items-end gap-1">
                        <div className="flex items-center gap-1">
                            <DollarSign className="h-5 w-5 text-green-600" />
                            <span className="text-lg font-bold text-gray-900">${order.total_price.toFixed(2)}</span>
                        </div>
                        <div className="flex items-center gap-1 text-xs text-gray-500">
                            <Clock className="h-4 w-4" />
                            <span>Due {new Date(order.deadline).toLocaleDateString()}</span>
                        </div>
                    </div>
                </div>

                {/* Payment Notice */}
                {order.status === 'payment' && (
                    <div className="mt-4 flex items-start gap-2 rounded-lg bg-yellow-50 p-3 text-sm text-yellow-800">
                        <AlertCircle className="mt-0.5 h-4 w-4 flex-shrink-0" />
                        <div>
                            <p className="font-medium">Your order is unpaid</p>
                            <p>Please check your email and follow the tips to complete the payment procedure.</p>
                            <p className="mt-1 text-xs">Deadline: {new Date(order.deadline).toLocaleString()} (if you pay right now)</p>
                        </div>
                    </div>
                )}
            </div>

            {/* Action Buttons */}
            <div className="border-t border-gray-200 px-4 py-3">
                <div className="flex flex-wrap items-center justify-between gap-3">
                    <div className="flex flex-wrap gap-2">
                        <Link
                            href={`/client/orders/${order.id}/messages`}
                            className="flex items-center gap-1.5 rounded-lg bg-gray-100 px-3 py-1.5 text-sm font-medium text-gray-700 hover:bg-gray-200"
                        >
                            <MessageSquare className="h-4 w-4" />
                            Messages
                        </Link>
                        <Link
                            href={`/client/orders/${order.id}/files`}
                            className="flex items-center gap-1.5 rounded-lg bg-gray-100 px-3 py-1.5 text-sm font-medium text-gray-700 hover:bg-gray-200"
                        >
                            <File className="h-4 w-4" />
                            Files
                        </Link>
                        {order.status === 'payment' && (
                            <Link
                                href={`/client/orders/${order.id}/pay`}
                                className="flex items-center gap-1.5 rounded-lg bg-green-600 px-3 py-1.5 text-sm font-medium text-white hover:bg-green-700"
                            >
                                <DollarSign className="h-4 w-4" />
                                Pay Now
                            </Link>
                        )}
                    </div>

                    <Link
                        href={`/client/orders/${order.id}/cancel`}
                        className="flex items-center gap-1.5 rounded-lg bg-red-100 px-3 py-1.5 text-sm font-medium text-red-700 hover:bg-red-200"
                    >
                        <X className="h-4 w-4" />
                        Cancel order
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default OrderCard;
