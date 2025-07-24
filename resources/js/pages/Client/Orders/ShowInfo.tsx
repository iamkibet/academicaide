import ClientLayout from '@/layouts/ClientLayout';
import { Link } from '@inertiajs/react';
import { CreditCard, File, Info, MessageSquare } from 'lucide-react';

function StatusBadge({ status }: { status: string }) {
    const color =
        status === 'pending_payment'
            ? 'bg-yellow-100 text-yellow-800'
            : status === 'completed'
              ? 'bg-green-100 text-green-800'
              : status === 'cancelled'
                ? 'bg-red-100 text-red-800'
                : 'bg-blue-100 text-blue-800';
    return <span className={`inline-flex rounded-full px-2 text-xs font-semibold ${color}`}>{status.replace('_', ' ')}</span>;
}

export default function ShowInfo({ auth, order }: any) {
    return (
        <ClientLayout user={auth.user}>
            <div className="mx-auto max-w-3xl py-8">
                {/* Header */}
                <div className="mb-6 flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
                    <div>
                        <div className="text-sm text-gray-500">Writer's choice</div>
                        <div className="text-2xl font-bold text-gray-900">#{order.id}</div>
                        <StatusBadge status={order.status} />
                        {order.status === 'pending_payment' && (
                            <div className="mt-2 rounded border-l-4 border-yellow-400 bg-yellow-50 p-3 text-sm text-yellow-800">
                                Your order is unpaid. Please check your email and follow the tips to complete the payment procedure.
                            </div>
                        )}
                        <div className="mt-2 text-xs text-gray-500">
                            Deadline:{' '}
                            {order.deadline && new Date(order.deadline).toLocaleString(undefined, { dateStyle: 'medium', timeStyle: 'short' })} (if
                            you pay right now)
                        </div>
                    </div>
                    <div className="mt-4 flex flex-wrap gap-2 md:mt-0">
                        <Link
                            href="#info"
                            className="flex items-center gap-1 rounded bg-blue-50 px-3 py-2 text-sm font-medium text-blue-700 hover:bg-blue-100"
                        >
                            <Info className="h-4 w-4" /> Info
                        </Link>
                        <Link
                            href="#messages"
                            className="flex items-center gap-1 rounded bg-blue-50 px-3 py-2 text-sm font-medium text-blue-700 hover:bg-blue-100"
                        >
                            <MessageSquare className="h-4 w-4" /> Messages
                        </Link>
                        <Link
                            href="#files"
                            className="flex items-center gap-1 rounded bg-blue-50 px-3 py-2 text-sm font-medium text-blue-700 hover:bg-blue-100"
                        >
                            <File className="h-4 w-4" /> Files
                        </Link>
                        {order.status === 'pending_payment' && (
                            <Link
                                href={`/client/orders/${order.id}/pay`}
                                className="flex items-center gap-1 rounded bg-green-600 px-3 py-2 text-sm font-medium text-white hover:bg-green-700"
                            >
                                <CreditCard className="h-4 w-4" /> Pay Now
                            </Link>
                        )}
                    </div>
                </div>

                {/* Info Section */}
                <div id="info" className="mb-8 rounded-lg border bg-white p-6 shadow-sm">
                    <h2 className="mb-4 text-lg font-semibold text-gray-800">Order Details</h2>
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                        <div>
                            <div className="mb-2 text-xs text-gray-500">Academic level</div>
                            <div className="font-medium text-gray-900">{order.academicLevel?.name || '-'}</div>
                        </div>
                        <div>
                            <div className="mb-2 text-xs text-gray-500">Type of paper</div>
                            <div className="font-medium text-gray-900">{order.assignment_type || '-'}</div>
                        </div>
                        <div>
                            <div className="mb-2 text-xs text-gray-500">Discipline</div>
                            <div className="font-medium text-gray-900">{order.subjectCategory?.name || '-'}</div>
                        </div>
                        <div>
                            <div className="mb-2 text-xs text-gray-500">Topic</div>
                            <div className="font-medium text-gray-900">{order.topic || "Writer's choice"}</div>
                        </div>
                        <div className="md:col-span-2">
                            <div className="mb-2 text-xs text-gray-500">Paper details</div>
                            <div className="font-medium whitespace-pre-line text-gray-900">{order.instructions || '-'}</div>
                        </div>
                        <div>
                            <div className="mb-2 text-xs text-gray-500">Paper format</div>
                            <div className="font-medium text-gray-900">{order.citation_style?.toUpperCase() || '-'}</div>
                        </div>
                        <div>
                            <div className="mb-2 text-xs text-gray-500">First draft deadline</div>
                            <div className="font-medium text-gray-900">
                                {order.deadline && new Date(order.deadline).toLocaleString(undefined, { dateStyle: 'medium', timeStyle: 'short' })}
                            </div>
                        </div>
                        <div>
                            <div className="mb-2 text-xs text-gray-500">Number of sources</div>
                            <div className="font-medium text-gray-900">{order.source_count || '-'}</div>
                        </div>
                    </div>
                </div>

                {/* Price Breakdown */}
                <div className="mb-8 rounded-lg border bg-white p-6 shadow-sm">
                    <h2 className="mb-4 text-lg font-semibold text-gray-800">Price Breakdown</h2>
                    <div className="flex flex-col gap-2">
                        <div className="flex justify-between text-sm">
                            <span className="text-gray-500">
                                {order.pages} pages × ${order.price_per_page?.toFixed(2) ?? '0.00'}
                            </span>
                            <span className="text-gray-900">${(order.pages * order.price_per_page).toFixed(2)}</span>
                        </div>
                        {/* Example add-ons, replace with real data if available */}
                        <div className="flex justify-between text-sm">
                            <span className="text-gray-500">Copy of sources used</span>
                            <span className="text-gray-900">$14.95</span>
                        </div>
                        <div className="flex justify-between text-sm">
                            <span className="text-gray-500">Draft/Outline</span>
                            <span className="text-gray-900">$7.50</span>
                        </div>
                        <div className="flex justify-between border-t pt-2 text-base font-semibold">
                            <span>Grand total price</span>
                            <span>${order.total_price?.toFixed(2) ?? '0.00'}</span>
                        </div>
                    </div>
                </div>

                {/* Upsell Section */}
                <div className="mb-8 rounded-lg border bg-white p-6 shadow-sm">
                    <h2 className="mb-4 text-lg font-semibold text-gray-800">Add services to your order</h2>
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                        <div>
                            <div className="mb-2 text-xs text-gray-500">Additional pages</div>
                            <div className="flex items-center justify-between">
                                <span>Additional pages to be added to your original order</span>
                                <span className="font-medium text-gray-900">$15.00 per page</span>
                            </div>
                        </div>
                        <div>
                            <div className="mb-2 text-xs text-gray-500">Power Point slides</div>
                            <div className="flex items-center justify-between">
                                <span>Choose the number of slides you need</span>
                                <span className="font-medium text-gray-900">$7.50 per slide</span>
                            </div>
                        </div>
                        <div>
                            <div className="mb-2 text-xs text-gray-500">Charts</div>
                            <div className="flex items-center justify-between">
                                <span>Choose the number of charts you need</span>
                                <span className="font-medium text-gray-900">$7.50 per chart</span>
                            </div>
                        </div>
                        <div>
                            <div className="mb-2 text-xs text-gray-500">Shorten deadline</div>
                            <div className="flex items-center justify-between">
                                <span>Keep in mind, that it takes ≈1 hour to write 1 page of quality text</span>
                            </div>
                        </div>
                        <div>
                            <div className="mb-2 text-xs text-gray-500">Boost writer’s category</div>
                            <div className="flex items-center gap-4">
                                <span className="inline-block rounded bg-blue-100 px-2 py-1 text-xs font-medium text-blue-700">+25% Advanced</span>
                                <span className="inline-block rounded bg-blue-100 px-2 py-1 text-xs font-medium text-blue-700">+30% EN</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </ClientLayout>
    );
}
