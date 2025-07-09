import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import AppLayout from '@/layouts/app-layout';
import { Head, Link } from '@inertiajs/react';

interface Order {
    id: number;
    client: {
        name: string;
        email: string;
    };
    assignment_type: string;
    academic_level: string | Record<string, unknown>;
    pages: number;
    deadline: string;
    status: string;
    total_price: number;
    created_at: string;
}

interface OrdersPagination {
    data: Order[];
    meta: {
        current_page: number;
        last_page: number;
        per_page: number;
        total: number;
    };
    links: {
        first: string | null;
        last: string | null;
        prev: string | null;
        next: string | null;
    };
}

interface Props {
    orders: OrdersPagination;
    filters: {
        status: string;
        search: string;
        date_range: string;
    };
}

const statusColors = {
    pending: 'bg-yellow-100 text-yellow-800',
    active: 'bg-blue-100 text-blue-800',
    completed: 'bg-green-100 text-green-800',
    cancelled: 'bg-red-100 text-red-800',
};

export default function OrdersIndex({ orders, filters }: Props) {
    return (
        <AppLayout>
            <Head title="Orders Management" />

            <div className="space-y-6">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900">Orders</h1>
                        <p className="mt-1 text-base text-gray-500">Manage and track all orders efficiently</p>
                    </div>
                    <Link href="/admin/orders/create">
                        <Button className="bg-blue-600 font-semibold text-white hover:bg-blue-700">Create Order</Button>
                    </Link>
                </div>

                {/* Filters */}
                <Card className="border border-gray-200 p-6 shadow-md">
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                        <div>
                            <label htmlFor="search" className="block text-sm font-medium text-gray-700">
                                Search
                            </label>
                            <Input
                                type="text"
                                id="search"
                                name="search"
                                placeholder="Search orders..."
                                defaultValue={filters.search}
                                className="mt-1"
                            />
                        </div>

                        <div>
                            <label htmlFor="status" className="block text-sm font-medium text-gray-700">
                                Status
                            </label>
                            <select id="status" name="status" defaultValue={filters.status} className="mt-1 w-full rounded-md border-gray-300">
                                <option value="">All Statuses</option>
                                <option value="pending">Pending</option>
                                <option value="active">Active</option>
                                <option value="completed">Completed</option>
                                <option value="cancelled">Cancelled</option>
                            </select>
                        </div>

                        <div>
                            <label htmlFor="date_range" className="block text-sm font-medium text-gray-700">
                                Date Range
                            </label>
                            <select
                                id="date_range"
                                name="date_range"
                                defaultValue={filters.date_range}
                                className="mt-1 w-full rounded-md border-gray-300"
                            >
                                <option value="">All Time</option>
                                <option value="today">Today</option>
                                <option value="week">This Week</option>
                                <option value="month">This Month</option>
                            </select>
                        </div>

                        <div className="flex items-end">
                            <Button type="submit" className="w-full bg-blue-600 font-semibold text-white hover:bg-blue-700">
                                Apply Filters
                            </Button>
                        </div>
                    </div>
                </Card>

                {/* Orders Table */}
                <Card className="border border-gray-200 shadow-md">
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-100">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-bold tracking-wider text-gray-600 uppercase">Order ID</th>
                                    <th className="px-6 py-3 text-left text-xs font-bold tracking-wider text-gray-600 uppercase">Client</th>
                                    <th className="px-6 py-3 text-left text-xs font-bold tracking-wider text-gray-600 uppercase">Type</th>
                                    <th className="px-6 py-3 text-left text-xs font-bold tracking-wider text-gray-600 uppercase">Level</th>
                                    <th className="px-6 py-3 text-left text-xs font-bold tracking-wider text-gray-600 uppercase">Pages</th>
                                    <th className="px-6 py-3 text-left text-xs font-bold tracking-wider text-gray-600 uppercase">Deadline</th>
                                    <th className="px-6 py-3 text-left text-xs font-bold tracking-wider text-gray-600 uppercase">Status</th>
                                    <th className="px-6 py-3 text-left text-xs font-bold tracking-wider text-gray-600 uppercase">Total</th>
                                    <th className="px-6 py-3 text-left text-xs font-bold tracking-wider text-gray-600 uppercase">Created</th>
                                    <th className="relative px-6 py-3">
                                        <span className="sr-only">Actions</span>
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200 bg-white">
                                {orders.data.length === 0 ? (
                                    <tr>
                                        <td colSpan={10} className="px-6 py-8 text-center text-lg text-gray-400">
                                            No orders found.
                                        </td>
                                    </tr>
                                ) : (
                                    orders.data.map((order) => (
                                        <tr key={order.id} className="transition-colors hover:bg-gray-50">
                                            <td className="px-6 py-4 text-sm font-semibold whitespace-nowrap text-gray-900">#{order.id}</td>
                                            <td className="px-6 py-4 text-sm whitespace-nowrap text-gray-700">
                                                <div className="font-medium">{order.client.name}</div>
                                                <div className="text-xs text-gray-400">{order.client.email}</div>
                                            </td>
                                            <td className="px-6 py-4 text-sm whitespace-nowrap text-gray-500">{order.assignment_type}</td>
                                            <td className="px-6 py-4 text-sm whitespace-nowrap text-gray-500">
                                                {typeof order.academic_level === 'object' && order.academic_level !== null
                                                    ? String(
                                                          (order.academic_level as Record<string, unknown>).name ||
                                                              (order.academic_level as Record<string, unknown>).label ||
                                                              (order.academic_level as Record<string, unknown>).slug ||
                                                              '',
                                                      )
                                                    : String(order.academic_level)}
                                            </td>
                                            <td className="px-6 py-4 text-sm whitespace-nowrap text-gray-500">{order.pages}</td>
                                            <td className="px-6 py-4 text-sm whitespace-nowrap text-gray-500">
                                                {new Date(order.deadline).toLocaleDateString()}
                                            </td>
                                            <td className="px-6 py-4 text-sm whitespace-nowrap">
                                                <span
                                                    className={`inline-block rounded-full px-2 py-1 text-xs font-semibold ${statusColors[order.status as keyof typeof statusColors]}`}
                                                >
                                                    {order.status}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 text-sm whitespace-nowrap text-gray-700">
                                                ${Number(order.total_price || 0).toFixed(2)}
                                            </td>
                                            <td className="px-6 py-4 text-sm whitespace-nowrap text-gray-500">
                                                {new Date(order.created_at).toLocaleDateString()}
                                            </td>
                                            <td className="px-6 py-4 text-right text-sm font-medium whitespace-nowrap">
                                                <Link href={`/admin/orders/${order.id}`} className="font-semibold text-blue-600 hover:text-blue-900">
                                                    View
                                                </Link>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                    {/* Pagination Controls */}
                    {orders.meta && orders.meta.last_page > 1 && (
                        <div className="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6">
                            <div className="flex flex-1 justify-between sm:hidden">
                                <Link
                                    href={`?page=${orders.meta.current_page - 1}`}
                                    className={`relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 ${orders.meta.current_page === 1 ? 'pointer-events-none opacity-50' : ''}`}
                                >
                                    Previous
                                </Link>
                                <Link
                                    href={`?page=${orders.meta.current_page + 1}`}
                                    className={`relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 ${orders.meta.current_page === orders.meta.last_page ? 'pointer-events-none opacity-50' : ''}`}
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
                                        {Array.from({ length: orders.meta.last_page }, (_, i) => i + 1).map((page) => (
                                            <Link
                                                key={page}
                                                href={`?page=${page}`}
                                                className={`relative inline-flex items-center px-4 py-2 text-sm font-semibold ${
                                                    page === orders.meta.current_page
                                                        ? 'z-10 bg-blue-600 text-white focus:z-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600'
                                                        : 'text-gray-900 ring-1 ring-gray-300 ring-inset hover:bg-gray-50 focus:z-20 focus:outline-offset-0'
                                                }`}
                                            >
                                                {page}
                                            </Link>
                                        ))}
                                    </nav>
                                </div>
                            </div>
                        </div>
                    )}
                </Card>
            </div>
        </AppLayout>
    );
}
