import { Message, Order } from '@/types';
import { Head, Link, useForm } from '@inertiajs/react';
import { FormEvent, useState } from 'react';

interface Props {
    order: Order & {
        files: Array<{
            id: number;
            filename: string;
            original_filename: string;
            mime_type: string;
            size: number;
            created_at: string;
        }>;
        messages: Array<Message>;
    };
}

export default function Show({ order }: Props) {
    const [showMessageForm, setShowMessageForm] = useState(false);
    const { data, setData, post, processing, errors, reset } = useForm({
        content: '',
    });

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        post(route('messages.store', order.id), {
            onSuccess: () => {
                reset();
                setShowMessageForm(false);
            },
        });
    };

    const handleRequestRevision = () => {
        post(route('orders.revision', order.id));
    };

    const handleMarkAsCompleted = () => {
        post(route('orders.complete', order.id));
    };

    return (
        <>
            <Head title={`Order: ${order.title}`} />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        <div className="p-6">
                            <div className="mb-6 flex items-center justify-between">
                                <h2 className="text-2xl font-semibold text-gray-800">{order.title}</h2>
                                <div className="space-x-4">
                                    {order.status === 'draft' && (
                                        <Link
                                            href={route('orders.edit', order.id)}
                                            className="rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700"
                                        >
                                            Edit Order
                                        </Link>
                                    )}
                                    {order.status === 'active' && order.revision_count < 3 && (
                                        <button
                                            onClick={handleRequestRevision}
                                            className="rounded bg-yellow-500 px-4 py-2 font-bold text-white hover:bg-yellow-700"
                                        >
                                            Request Revision
                                        </button>
                                    )}
                                    {order.status === 'active' && (
                                        <button
                                            onClick={handleMarkAsCompleted}
                                            className="rounded bg-green-500 px-4 py-2 font-bold text-white hover:bg-green-700"
                                        >
                                            Mark as Completed
                                        </button>
                                    )}
                                </div>
                            </div>

                            <div className="mb-6 grid grid-cols-1 gap-6 md:grid-cols-2">
                                <div>
                                    <h3 className="mb-4 text-lg font-medium text-gray-900">Order Details</h3>
                                    <dl className="grid grid-cols-1 gap-4">
                                        <div>
                                            <dt className="text-sm font-medium text-gray-500">Subject</dt>
                                            <dd className="mt-1 text-sm text-gray-900">{order.subject}</dd>
                                        </div>
                                        <div>
                                            <dt className="text-sm font-medium text-gray-500">Academic Level</dt>
                                            <dd className="mt-1 text-sm text-gray-900">{order.academic_level}</dd>
                                        </div>
                                        <div>
                                            <dt className="text-sm font-medium text-gray-500">Citation Style</dt>
                                            <dd className="mt-1 text-sm text-gray-900">{order.citation_style || 'Not specified'}</dd>
                                        </div>
                                        <div>
                                            <dt className="text-sm font-medium text-gray-500">Pages</dt>
                                            <dd className="mt-1 text-sm text-gray-900">{order.pages}</dd>
                                        </div>
                                        <div>
                                            <dt className="text-sm font-medium text-gray-500">Word Count</dt>
                                            <dd className="mt-1 text-sm text-gray-900">{order.word_count || 'Not specified'}</dd>
                                        </div>
                                        <div>
                                            <dt className="text-sm font-medium text-gray-500">Deadline</dt>
                                            <dd className="mt-1 text-sm text-gray-900">{new Date(order.deadline).toLocaleString()}</dd>
                                        </div>
                                    </dl>
                                </div>

                                <div>
                                    <h3 className="mb-4 text-lg font-medium text-gray-900">Status & Payment</h3>
                                    <dl className="grid grid-cols-1 gap-4">
                                        <div>
                                            <dt className="text-sm font-medium text-gray-500">Status</dt>
                                            <dd className="mt-1">
                                                <span
                                                    className={`inline-flex rounded-full px-2 text-xs leading-5 font-semibold ${
                                                        order.status === 'completed'
                                                            ? 'bg-green-100 text-green-800'
                                                            : order.status === 'active'
                                                              ? 'bg-blue-100 text-blue-800'
                                                              : 'bg-gray-100 text-gray-800'
                                                    }`}
                                                >
                                                    {order.status}
                                                </span>
                                            </dd>
                                        </div>
                                        <div>
                                            <dt className="text-sm font-medium text-gray-500">Payment Status</dt>
                                            <dd className="mt-1">
                                                <span
                                                    className={`inline-flex rounded-full px-2 text-xs leading-5 font-semibold ${
                                                        order.payment_status === 'paid'
                                                            ? 'bg-green-100 text-green-800'
                                                            : 'bg-yellow-100 text-yellow-800'
                                                    }`}
                                                >
                                                    {order.payment_status}
                                                </span>
                                            </dd>
                                        </div>
                                        <div>
                                            <dt className="text-sm font-medium text-gray-500">Price per Page</dt>
                                            <dd className="mt-1 text-sm text-gray-900">${order.price_per_page}</dd>
                                        </div>
                                        <div>
                                            <dt className="text-sm font-medium text-gray-500">Total Price</dt>
                                            <dd className="mt-1 text-sm text-gray-900">${order.total_price}</dd>
                                        </div>
                                        {order.is_urgent && (
                                            <div>
                                                <dt className="text-sm font-medium text-gray-500">Urgent Order</dt>
                                                <dd className="mt-1 text-sm text-red-600">Yes (1.5x base price)</dd>
                                            </div>
                                        )}
                                    </dl>
                                </div>
                            </div>

                            <div className="mb-6">
                                <h3 className="mb-4 text-lg font-medium text-gray-900">Instructions</h3>
                                <div className="rounded-lg bg-gray-50 p-4">
                                    <p className="text-sm whitespace-pre-wrap text-gray-900">{order.instructions}</p>
                                </div>
                            </div>

                            {order.client_notes && (
                                <div className="mb-6">
                                    <h3 className="mb-4 text-lg font-medium text-gray-900">Client Notes</h3>
                                    <div className="rounded-lg bg-gray-50 p-4">
                                        <p className="text-sm whitespace-pre-wrap text-gray-900">{order.client_notes}</p>
                                    </div>
                                </div>
                            )}

                            {order.admin_notes && (
                                <div className="mb-6">
                                    <h3 className="mb-4 text-lg font-medium text-gray-900">Admin Notes</h3>
                                    <div className="rounded-lg bg-gray-50 p-4">
                                        <p className="text-sm whitespace-pre-wrap text-gray-900">{order.admin_notes}</p>
                                    </div>
                                </div>
                            )}

                            {order.files.length > 0 && (
                                <div className="mb-6">
                                    <h3 className="mb-4 text-lg font-medium text-gray-900">Files</h3>
                                    <div className="rounded-lg bg-gray-50 p-4">
                                        <ul className="divide-y divide-gray-200">
                                            {order.files.map((file) => (
                                                <li key={file.id} className="py-3">
                                                    <div className="flex items-center justify-between">
                                                        <div>
                                                            <p className="text-sm font-medium text-gray-900">{file.original_filename}</p>
                                                            <p className="text-sm text-gray-500">{(file.size / 1024).toFixed(1)} KB</p>
                                                        </div>
                                                        <a
                                                            href={route('files.download', file.id)}
                                                            className="text-sm font-medium text-blue-600 hover:text-blue-900"
                                                        >
                                                            Download
                                                        </a>
                                                    </div>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            )}

                            <div className="mb-6">
                                <div className="mb-4 flex items-center justify-between">
                                    <h3 className="text-lg font-medium text-gray-900">Messages</h3>
                                    <button
                                        onClick={() => setShowMessageForm(!showMessageForm)}
                                        className="text-sm font-medium text-blue-600 hover:text-blue-900"
                                    >
                                        {showMessageForm ? 'Cancel' : 'New Message'}
                                    </button>
                                </div>

                                {showMessageForm && (
                                    <form onSubmit={handleSubmit} className="mb-6">
                                        <div className="mb-4">
                                            <textarea
                                                value={data.content}
                                                onChange={(e) => setData('content', e.target.value)}
                                                rows={4}
                                                className="focus:ring-opacity-50 w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200"
                                                placeholder="Type your message here..."
                                                required
                                            />
                                            {errors.content && <div className="mt-1 text-sm text-red-500">{errors.content}</div>}
                                        </div>
                                        <div className="flex justify-end">
                                            <button
                                                type="submit"
                                                disabled={processing}
                                                className="focus:shadow-outline rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700 focus:outline-none disabled:opacity-50"
                                            >
                                                Send Message
                                            </button>
                                        </div>
                                    </form>
                                )}

                                <div className="space-y-4">
                                    {order.messages.map((message) => (
                                        <div
                                            key={message.id}
                                            className={`rounded-lg p-4 ${
                                                message.sender_id === order.client_id ? 'ml-4 bg-blue-50' : 'mr-4 bg-gray-50'
                                            }`}
                                        >
                                            <div className="mb-2 flex items-start justify-between">
                                                <div>
                                                    <p className="text-sm font-medium text-gray-900">{message.sender.name}</p>
                                                    <p className="text-xs text-gray-500">{new Date(message.created_at).toLocaleString()}</p>
                                                </div>
                                                {!message.is_read && message.receiver_id === order.client_id && (
                                                    <span className="rounded-full bg-blue-100 px-2 py-1 text-xs font-semibold text-blue-800">
                                                        New
                                                    </span>
                                                )}
                                            </div>
                                            <p className="text-sm whitespace-pre-wrap text-gray-900">{message.content}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
