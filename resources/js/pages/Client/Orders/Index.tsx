import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import ClientLayout from '@/layouts/ClientLayout';
import { User } from '@/types';
import { router } from '@inertiajs/core';
import { Head, Link } from '@inertiajs/react';
import { FormEvent, useState } from 'react';

interface Order {
    id: number;
    title: string;
    subject_category: {
        name: string;
    };
    academic_level: {
        name: string;
    };
    deadline: string;
    status: 'pending' | 'in_progress' | 'completed' | 'revision' | 'cancelled' | 'draft';
    total_amount: number;
    created_at: string;
    pages: number;
}

type Props = {
    auth?: {
        user: User | null;
    };
    orders: {
        data: Order[];
        meta: {
            current_page: number;
            last_page: number;
            per_page: number;
            total: number;
        };
    };
    filters: {
        status?: string;
        search?: string;
    };
};

const ORDER_STATUSES = ['pending', 'in_progress', 'active', 'completed', 'revision', 'cancelled', 'draft'] as const;

const ORDER_TABS = [
    { key: 'all', label: 'All Orders' },
    { key: 'drafts', label: 'Drafts' },
    { key: 'completed', label: 'Completed' },
];

type OrderStatus = (typeof ORDER_STATUSES)[number];

const statusColors: Record<OrderStatus, string> = {
    pending: 'bg-yellow-100 text-yellow-800',
    in_progress: 'bg-blue-100 text-blue-800',
    active: 'bg-blue-200 text-blue-900',
    completed: 'bg-green-100 text-green-800',
    revision: 'bg-purple-100 text-purple-800',
    cancelled: 'bg-red-100 text-red-800',
    draft: 'bg-gray-100 text-gray-800',
};

const statusLabels: Record<OrderStatus, string> = {
    pending: 'Pending',
    in_progress: 'In Progress',
    active: 'Active',
    completed: 'Completed',
    revision: 'In Revision',
    cancelled: 'Cancelled',
    draft: 'Draft',
};

export default function Index({ auth, orders, filters }: Props) {
    const [activeTab, setActiveTab] = useState('all');
    if (!auth?.user) {
        return null;
    }

    const filteredOrders = (() => {
        if (activeTab === 'drafts') {
            return orders.data.filter((order) => order.status === 'draft');
        }
        if (activeTab === 'completed') {
            return orders.data.filter((order) => order.status === 'completed');
        }
        return orders.data;
    })();

    const handleFilterSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);

        router.get(
            '/client/orders',
            {
                status: (formData.get('status') as string) || '',
                search: (formData.get('search') as string) || '',
            },
            {
                preserveState: true,
                preserveScroll: true,
                replace: true,
            },
        );
    };

    return (
        <ClientLayout user={auth.user}>
            <Head title="My Orders" />

            <div className="space-y-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-semibold text-gray-900">My Orders</h1>
                        <p className="mt-1 text-sm text-gray-500">View and manage your orders</p>
                    </div>
                    <Button asChild>
                        <Link href="/client/orders/create">New Order</Link>
                    </Button>
                </div>

                {/* Tabs */}
                <div className="mb-2 flex gap-2 border-b border-gray-200">
                    {ORDER_TABS.map((tab) => (
                        <button
                            key={tab.key}
                            onClick={() => setActiveTab(tab.key)}
                            className={`border-b-2 px-4 py-2 font-medium transition-colors ${
                                activeTab === tab.key
                                    ? 'border-blue-600 bg-blue-50 text-blue-700'
                                    : 'border-transparent text-gray-600 hover:bg-gray-50'
                            }`}
                        >
                            {tab.label}
                        </button>
                    ))}
                </div>

                {/* Filters */}
                {activeTab === 'all' && (
                    <Card className="p-4">
                        <form onSubmit={handleFilterSubmit} className="flex items-center gap-4">
                            <div className="flex-1">
                                <input
                                    type="text"
                                    name="search"
                                    placeholder="Search orders..."
                                    defaultValue={filters.search}
                                    className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                                />
                            </div>
                            <select
                                name="status"
                                defaultValue={filters.status}
                                className="rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                            >
                                <option value="">All Status</option>
                                {ORDER_STATUSES.map((status) => (
                                    <option key={status} value={status}>
                                        {statusLabels[status]}
                                    </option>
                                ))}
                            </select>
                            <Button type="submit">Filter</Button>
                        </form>
                    </Card>
                )}

                {/* Orders List */}
                <Card>
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">Order ID</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">Title</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">Subject</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">Level</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">Pages</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">Deadline</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">Status</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">Amount</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200 bg-white">
                                {filteredOrders.length === 0 ? (
                                    <tr>
                                        <td colSpan={9} className="py-8 text-center text-gray-400">
                                            No orders found in this tab.
                                        </td>
                                    </tr>
                                ) : (
                                    filteredOrders.map((order) => (
                                        <tr key={order.id}>
                                            <td className="px-6 py-4 text-sm font-medium whitespace-nowrap text-gray-900">#{order.id}</td>
                                            <td className="px-6 py-4 text-sm whitespace-nowrap text-gray-500">{order.title}</td>
                                            <td className="px-6 py-4 text-sm whitespace-nowrap text-gray-500">{order.subject_category.name}</td>
                                            <td className="px-6 py-4 text-sm whitespace-nowrap text-gray-500">{order.academic_level.name}</td>
                                            <td className="px-6 py-4 text-sm whitespace-nowrap text-gray-500">{order.pages}</td>
                                            <td className="px-6 py-4 text-sm whitespace-nowrap text-gray-500">
                                                {new Date(order.deadline).toLocaleDateString()}
                                            </td>
                                            <td className="px-6 py-4 text-sm whitespace-nowrap">
                                                <span
                                                    className={`inline-flex rounded-full px-2 text-xs leading-5 font-semibold ${statusColors[order.status as OrderStatus]}`}
                                                >
                                                    {statusLabels[order.status as OrderStatus]}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 text-sm whitespace-nowrap text-gray-500">${order.total_amount.toFixed(2)}</td>
                                            <td className="px-6 py-4 text-sm whitespace-nowrap">
                                                <div className="flex items-center gap-2">
                                                    <Button variant="outline" size="sm" asChild>
                                                        <Link href={`/client/orders/${order.id}`}>View</Link>
                                                    </Button>
                                                    {order.status === 'pending' && (
                                                        <Button variant="outline" size="sm" asChild>
                                                            <Link href={`/client/orders/${order.id}/edit`}>Edit</Link>
                                                        </Button>
                                                    )}
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>

                    {/* Pagination */}
                    {orders.meta.last_page > 1 && activeTab === 'all' && (
                        <div className="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6">
                            <div className="flex flex-1 justify-between sm:hidden">
                                <Link
                                    href={`/client/orders?page=${orders.meta.current_page - 1}`}
                                    className={`relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 ${
                                        orders.meta.current_page === 1 ? 'pointer-events-none opacity-50' : ''
                                    }`}
                                >
                                    Previous
                                </Link>
                                <Link
                                    href={`/client/orders?page=${orders.meta.current_page + 1}`}
                                    className={`relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 ${
                                        orders.meta.current_page === orders.meta.last_page ? 'pointer-events-none opacity-50' : ''
                                    }`}
                                >
                                    Next
                                </Link>
                            </div>
                            <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
                                <div>
                                    <p className="text-sm text-gray-700">
                                        Showing <span className="font-medium">{(orders.meta.current_page - 1) * orders.meta.per_page + 1}</span> to{' '}
                                        <span className="font-medium">
                                            {Math.min(orders.meta.current_page * orders.meta.per_page, orders.meta.total)}
                                        </span>{' '}
                                        of <span className="font-medium">{orders.meta.total}</span> results
                                    </p>
                                </div>
                                <div>
                                    <nav className="isolate inline-flex -space-x-px rounded-md shadow-sm" aria-label="Pagination">
                                        <Link
                                            href={`/client/orders?page=${orders.meta.current_page - 1}`}
                                            className={`relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-gray-300 ring-inset hover:bg-gray-50 focus:z-20 focus:outline-offset-0 ${
                                                orders.meta.current_page === 1 ? 'pointer-events-none opacity-50' : ''
                                            }`}
                                        >
                                            <span className="sr-only">Previous</span>
                                            <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                                <path
                                                    fillRule="evenodd"
                                                    d="M12.79 5.23a.75.75 0 01-.02 1.06L8.832 10l3.938 3.71a.75.75 0 11-1.04 1.08l-4.5-4.25a.75.75 0 010-1.08l4.5-4.25a.75.75 0 011.06.02z"
                                                    clipRule="evenodd"
                                                />
                                            </svg>
                                        </Link>
                                        {Array.from({ length: orders.meta.last_page }, (_, i) => i + 1).map((page) => (
                                            <Link
                                                key={page}
                                                href={`/client/orders?page=${page}`}
                                                className={`relative inline-flex items-center px-4 py-2 text-sm font-semibold ${
                                                    page === orders.meta.current_page
                                                        ? 'z-10 bg-blue-600 text-white focus:z-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600'
                                                        : 'text-gray-900 ring-1 ring-gray-300 ring-inset hover:bg-gray-50 focus:z-20 focus:outline-offset-0'
                                                }`}
                                            >
                                                {page}
                                            </Link>
                                        ))}
                                        <Link
                                            href={`/client/orders?page=${orders.meta.current_page + 1}`}
                                            className={`relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-gray-300 ring-inset hover:bg-gray-50 focus:z-20 focus:outline-offset-0 ${
                                                orders.meta.current_page === orders.meta.last_page ? 'pointer-events-none opacity-50' : ''
                                            }`}
                                        >
                                            <span className="sr-only">Next</span>
                                            <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                                <path
                                                    fillRule="evenodd"
                                                    d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z"
                                                    clipRule="evenodd"
                                                />
                                            </svg>
                                        </Link>
                                    </nav>
                                </div>
                            </div>
                        </div>
                    )}
                </Card>
            </div>
        </ClientLayout>
    );
}
