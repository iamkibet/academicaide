import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import ClientLayout from '@/layouts/ClientLayout';
import { User } from '@/types';
import { Head, Link } from '@inertiajs/react';

interface Order {
    id: number;
    title: string;
    description: string;
    subject_category: {
        name: string;
    };
    academic_level: {
        name: string;
    };
    deadline: string;
    status: 'pending' | 'in_progress' | 'completed' | 'revision' | 'cancelled';
    total_amount: number;
    created_at: string;
    pages: number;
    spacing: 'single' | 'double';
    addons: Array<{
        id: number;
        name: string;
        price: number;
        is_free: boolean;
    }>;
    files: Array<{
        id: number;
        name: string;
        url: string;
        size: number;
        created_at: string;
    }>;
    messages: Array<{
        id: number;
        sender: {
            name: string;
            role: 'client' | 'admin' | 'writer';
        };
        message: string;
        created_at: string;
        attachments: Array<{
            id: number;
            name: string;
            url: string;
        }>;
    }>;
}

interface Props {
    auth: { user: User };
    order: Order;
}

const statusColors = {
    pending: 'bg-yellow-100 text-yellow-800',
    in_progress: 'bg-blue-100 text-blue-800',
    completed: 'bg-green-100 text-green-800',
    revision: 'bg-purple-100 text-purple-800',
    cancelled: 'bg-red-100 text-red-800',
};

const statusLabels = {
    pending: 'Pending',
    in_progress: 'In Progress',
    completed: 'Completed',
    revision: 'In Revision',
    cancelled: 'Cancelled',
};

export default function Show({ auth, order }: Props) {
    if (!auth?.user) {
        return null; // or handle loading state
    }

    return (
        <ClientLayout user={auth.user}>
            <Head title={`Order #${order.id}`} />

            <div className="space-y-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-semibold text-gray-900">Order #{order.id}</h1>
                        <p className="mt-1 text-sm text-gray-500">View order details and progress</p>
                    </div>
                    <div className="flex items-center gap-4">
                        {order.status === 'pending' && (
                            <Button variant="outline" asChild>
                                <Link href={`/client/orders/${order.id}/edit`}>Edit Order</Link>
                            </Button>
                        )}
                        <Button asChild>
                            <Link href="/client/orders/create">New Order</Link>
                        </Button>
                    </div>
                </div>

                <div className="grid gap-6 lg:grid-cols-3">
                    {/* Main Order Details */}
                    <div className="space-y-6 lg:col-span-2">
                        <Card>
                            <div className="p-6">
                                <h2 className="text-lg font-medium text-gray-900">Order Details</h2>
                                <div className="mt-4 space-y-4">
                                    <div>
                                        <h3 className="text-sm font-medium text-gray-500">Title</h3>
                                        <p className="mt-1 text-sm text-gray-900">{order.title}</p>
                                    </div>
                                    <div>
                                        <h3 className="text-sm font-medium text-gray-500">Description</h3>
                                        <p className="mt-1 text-sm whitespace-pre-wrap text-gray-900">{order.description}</p>
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <h3 className="text-sm font-medium text-gray-500">Subject</h3>
                                            <p className="mt-1 text-sm text-gray-900">{order.subject_category.name}</p>
                                        </div>
                                        <div>
                                            <h3 className="text-sm font-medium text-gray-500">Academic Level</h3>
                                            <p className="mt-1 text-sm text-gray-900">{order.academic_level.name}</p>
                                        </div>
                                        <div>
                                            <h3 className="text-sm font-medium text-gray-500">Pages</h3>
                                            <p className="mt-1 text-sm text-gray-900">
                                                {order.pages} pages ({order.spacing} spacing)
                                            </p>
                                        </div>
                                        <div>
                                            <h3 className="text-sm font-medium text-gray-500">Deadline</h3>
                                            <p className="mt-1 text-sm text-gray-900">{new Date(order.deadline).toLocaleDateString()}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Card>

                        {/* Files */}
                        <Card>
                            <div className="p-6">
                                <h2 className="text-lg font-medium text-gray-900">Files</h2>
                                <div className="mt-4">
                                    {order.files.length > 0 ? (
                                        <ul className="divide-y divide-gray-200">
                                            {order.files.map((file) => (
                                                <li key={file.id} className="flex items-center justify-between py-3">
                                                    <div className="flex items-center">
                                                        <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path
                                                                strokeLinecap="round"
                                                                strokeLinejoin="round"
                                                                strokeWidth={2}
                                                                d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                                                            />
                                                        </svg>
                                                        <div className="ml-3">
                                                            <p className="text-sm font-medium text-gray-900">{file.name}</p>
                                                            <p className="text-sm text-gray-500">
                                                                {(file.size / 1024 / 1024).toFixed(2)} MB •{' '}
                                                                {new Date(file.created_at).toLocaleDateString()}
                                                            </p>
                                                        </div>
                                                    </div>
                                                    <Button variant="outline" size="sm" asChild>
                                                        <a href={file.url} download>
                                                            Download
                                                        </a>
                                                    </Button>
                                                </li>
                                            ))}
                                        </ul>
                                    ) : (
                                        <p className="text-sm text-gray-500">No files attached to this order.</p>
                                    )}
                                </div>
                            </div>
                        </Card>

                        {/* Messages */}
                        <Card>
                            <div className="p-6">
                                <h2 className="text-lg font-medium text-gray-900">Messages</h2>
                                <div className="mt-4 space-y-4">
                                    {order.messages.map((message) => (
                                        <div key={message.id} className="flex space-x-3">
                                            <div
                                                className={`flex h-8 w-8 items-center justify-center rounded-full ${
                                                    message.sender.role === 'client'
                                                        ? 'bg-blue-100'
                                                        : message.sender.role === 'admin'
                                                          ? 'bg-purple-100'
                                                          : 'bg-green-100'
                                                }`}
                                            >
                                                <span className="text-sm font-medium">{message.sender.name.charAt(0).toUpperCase()}</span>
                                            </div>
                                            <div className="flex-1">
                                                <div className="flex items-center justify-between">
                                                    <h3 className="text-sm font-medium text-gray-900">
                                                        {message.sender.name}{' '}
                                                        <span className="text-sm text-gray-500">
                                                            • {new Date(message.created_at).toLocaleString()}
                                                        </span>
                                                    </h3>
                                                </div>
                                                <p className="mt-1 text-sm whitespace-pre-wrap text-gray-700">{message.message}</p>
                                                {message.attachments.length > 0 && (
                                                    <div className="mt-2">
                                                        <h4 className="text-xs font-medium text-gray-500">Attachments:</h4>
                                                        <div className="mt-1 flex items-center gap-2">
                                                            {message.attachments.map((attachment) => (
                                                                <Button key={attachment.id} variant="outline" size="sm" asChild>
                                                                    <a href={attachment.url} download>
                                                                        {attachment.name}
                                                                    </a>
                                                                </Button>
                                                            ))}
                                                        </div>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </Card>
                    </div>

                    {/* Sidebar */}
                    <div className="space-y-6">
                        {/* Status Card */}
                        <Card>
                            <div className="p-6">
                                <h2 className="text-lg font-medium text-gray-900">Order Status</h2>
                                <div className="mt-4">
                                    <span className={`inline-flex rounded-full px-2 text-xs leading-5 font-semibold ${statusColors[order.status]}`}>
                                        {statusLabels[order.status]}
                                    </span>
                                    <p className="mt-2 text-sm text-gray-500">Order placed on {new Date(order.created_at).toLocaleDateString()}</p>
                                </div>
                            </div>
                        </Card>

                        {/* Price Breakdown */}
                        <Card>
                            <div className="p-6">
                                <h2 className="text-lg font-medium text-gray-900">Price Breakdown</h2>
                                <div className="mt-4 space-y-4">
                                    <div className="flex justify-between text-sm">
                                        <span className="text-gray-500">Base Price ({order.pages} pages)</span>
                                        <span className="text-gray-900">
                                            ${(order.total_amount - order.addons.reduce((sum, addon) => sum + addon.price, 0)).toFixed(2)}
                                        </span>
                                    </div>
                                    {order.addons.length > 0 && (
                                        <>
                                            <div className="border-t border-gray-200 pt-4">
                                                <h3 className="text-sm font-medium text-gray-900">Add-ons</h3>
                                                {order.addons.map((addon) => (
                                                    <div key={addon.id} className="mt-2 flex justify-between text-sm">
                                                        <span className="text-gray-500">{addon.name}</span>
                                                        <span className="text-gray-900">{addon.is_free ? 'Free' : `$${addon.price.toFixed(2)}`}</span>
                                                    </div>
                                                ))}
                                            </div>
                                            <div className="flex justify-between border-t border-gray-200 pt-4">
                                                <span className="text-base font-medium text-gray-900">Total</span>
                                                <span className="text-base font-medium text-gray-900">${order.total_amount.toFixed(2)}</span>
                                            </div>
                                        </>
                                    )}
                                </div>
                            </div>
                        </Card>

                        {/* Quick Actions */}
                        <Card>
                            <div className="p-6">
                                <h2 className="text-lg font-medium text-gray-900">Quick Actions</h2>
                                <div className="mt-4 space-y-3">
                                    <Button className="w-full" asChild>
                                        <Link href="/client/messages">Contact Support</Link>
                                    </Button>
                                    {order.status === 'completed' && (
                                        <Button variant="outline" className="w-full" asChild>
                                            <Link href={`/client/orders/${order.id}/review`}>Leave Review</Link>
                                        </Button>
                                    )}
                                </div>
                            </div>
                        </Card>
                    </div>
                </div>
            </div>
        </ClientLayout>
    );
}
