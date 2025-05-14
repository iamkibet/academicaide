
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import AdminLayout from '@/layouts/AdminLayout';
import { Head, Link } from '@inertiajs/react';

interface Order {
    id: number;
    user: {
        name: string;
        email: string;
    };
    assignment_type: string;
    academic_level: string;
    pages: number;
    deadline: string;
    status: string;
    total_price: number;
    created_at: string;
}

interface Props {
    orders: Order[];
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
        <AdminLayout>
            <Head title="Orders Management" />

            <div className="space-y-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-semibold text-gray-900">Orders</h1>
                        <p className="mt-1 text-sm text-gray-500">Manage and track all orders</p>
                    </div>
                    <Link href="/admin/orders/create">
                        <Button>Create Order</Button>
                    </Link>
                </div>

                {/* Filters */}
                <Card className="p-4">
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
                            <Select id="status" name="status" defaultValue={filters.status} className="mt-1">
                                <option value="">All Statuses</option>
                                <option value="pending">Pending</option>
                                <option value="active">Active</option>
                                <option value="completed">Completed</option>
                                <option value="cancelled">Cancelled</option>
                            </Select>
                        </div>

                        <div>
                            <label htmlFor="date_range" className="block text-sm font-medium text-gray-700">
                                Date Range
                            </label>
                            <Select id="date_range" name="date_range" defaultValue={filters.date_range} className="mt-1">
                                <option value="">All Time</option>
                                <option value="today">Today</option>
                                <option value="week">This Week</option>
                                <option value="month">This Month</option>
                            </Select>
                        </div>

                        <div className="flex items-end">
                            <Button type="submit" className="w-full">
                                Apply Filters
                            </Button>
                        </div>
                    </div>
                </Card>

                {/* Orders Table */}
                <Card>
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">Order ID</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">Client</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">Type</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">Level</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">Pages</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">Deadline</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">Status</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">Total</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">Created</th>
                                    <th className="relative px-6 py-3">
                                        <span className="sr-only">Actions</span>
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200 bg-white">
                                {orders.map((order) => (
                                    <tr key={order.id}>
                                        <td className="px-6 py-4 text-sm font-medium whitespace-nowrap text-gray-900">#{order.id}</td>
                                        <td className="px-6 py-4 text-sm whitespace-nowrap text-gray-500">
                                            <div>{order.user.name}</div>
                                            <div className="text-xs text-gray-400">{order.user.email}</div>
                                        </td>
                                        <td className="px-6 py-4 text-sm whitespace-nowrap text-gray-500">{order.assignment_type}</td>
                                        <td className="px-6 py-4 text-sm whitespace-nowrap text-gray-500">{order.academic_level}</td>
                                        <td className="px-6 py-4 text-sm whitespace-nowrap text-gray-500">{order.pages}</td>
                                        <td className="px-6 py-4 text-sm whitespace-nowrap text-gray-500">
                                            {new Date(order.deadline).toLocaleDateString()}
                                        </td>
                                        <td className="px-6 py-4 text-sm whitespace-nowrap">
                                            <Badge className={statusColors[order.status as keyof typeof statusColors]}>{order.status}</Badge>
                                        </td>
                                        <td className="px-6 py-4 text-sm whitespace-nowrap text-gray-500">${order.total_price.toFixed(2)}</td>
                                        <td className="px-6 py-4 text-sm whitespace-nowrap text-gray-500">
                                            {new Date(order.created_at).toLocaleDateString()}
                                        </td>
                                        <td className="px-6 py-4 text-right text-sm font-medium whitespace-nowrap">
                                            <Link href={`/admin/orders/${order.id}`} className="text-blue-600 hover:text-blue-900">
                                                View
                                            </Link>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </Card>
            </div>
        </AdminLayout>
    );
}
