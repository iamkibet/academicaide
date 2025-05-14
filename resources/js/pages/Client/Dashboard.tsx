import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import ClientLayout from '@/layouts/ClientLayout';
import { User } from '@/types';
import { Head, Link } from '@inertiajs/react';

interface Order {
    id: number;
    title: string;
    status: 'pending' | 'in_progress' | 'completed' | 'revision' | 'cancelled';
    deadline: string;
    total_amount: number;
    created_at: string;
    subject_category: {
        name: string;
    };
    academic_level: {
        name: string;
    };
}

interface Stats {
    total_orders: number;
    active_orders: number;
    completed_orders: number;
    total_spent: number;
}

interface Props {
    auth: {
        user: User;
    };
    stats: Stats;
    recent_orders: Order[];
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

export default function Dashboard({ auth, stats, recent_orders }: Props) {
    if (!auth?.user) {
        return null; // or redirect to login
    }

    return (
        <ClientLayout user={auth.user}>
            <Head title="Dashboard" />

            <div className="space-y-6">
                <div>
                    <h1 className="text-2xl font-semibold text-gray-900">Dashboard</h1>
                    <p className="mt-1 text-sm text-gray-500">Welcome back, {auth.user.name}</p>
                </div>

                {/* Quick Actions */}
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                    <Card className="relative overflow-hidden p-6">
                        <div className="flex items-center">
                            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-blue-100">
                                <svg className="h-6 w-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                                </svg>
                            </div>
                            <div className="ml-4">
                                <h2 className="text-lg font-medium text-gray-900">New Order</h2>
                                <p className="mt-1 text-sm text-gray-500">Create a new assignment</p>
                            </div>
                        </div>
                        <div className="mt-4">
                            <Button asChild className="w-full">
                                <Link href={route('client.orders.create')}>Start Order</Link>
                            </Button>
                        </div>
                    </Card>

                    <Card className="relative overflow-hidden p-6">
                        <div className="flex items-center">
                            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-green-100">
                                <svg className="h-6 w-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                                    />
                                </svg>
                            </div>
                            <div className="ml-4">
                                <h2 className="text-lg font-medium text-gray-900">Active Orders</h2>
                                <p className="mt-1 text-sm text-gray-500">{stats.active_orders} in progress</p>
                            </div>
                        </div>
                        <div className="mt-4">
                            <Button variant="outline" asChild className="w-full">
                                <Link href="/client/orders?status=active">View Orders</Link>
                            </Button>
                        </div>
                    </Card>

                    <Card className="relative overflow-hidden p-6">
                        <div className="flex items-center">
                            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-purple-100">
                                <svg className="h-6 w-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
                                    />
                                </svg>
                            </div>
                            <div className="ml-4">
                                <h2 className="text-lg font-medium text-gray-900">Messages</h2>
                                <p className="mt-1 text-sm text-gray-500">View conversations</p>
                            </div>
                        </div>
                        <div className="mt-4">
                            <Button variant="outline" asChild className="w-full">
                                <Link href="/client/messages">Open Messages</Link>
                            </Button>
                        </div>
                    </Card>

                    <Card className="relative overflow-hidden p-6">
                        <div className="flex items-center">
                            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-yellow-100">
                                <svg className="h-6 w-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                    />
                                </svg>
                            </div>
                            <div className="ml-4">
                                <h2 className="text-lg font-medium text-gray-900">Total Spent</h2>
                                <p className="mt-1 text-sm text-gray-500">${stats.total_spent.toFixed(2)}</p>
                            </div>
                        </div>
                    </Card>
                </div>

                {/* Statistics */}
                <div className="grid gap-4 md:grid-cols-3">
                    <Card className="p-6">
                        <h3 className="text-base font-medium text-gray-900">Total Orders</h3>
                        <p className="mt-2 text-3xl font-semibold text-gray-900">{stats.total_orders}</p>
                        <div className="mt-4">
                            <div className="text-sm text-gray-500">All time orders</div>
                        </div>
                    </Card>

                    <Card className="p-6">
                        <h3 className="text-base font-medium text-gray-900">Active Orders</h3>
                        <p className="mt-2 text-3xl font-semibold text-gray-900">{stats.active_orders}</p>
                        <div className="mt-4">
                            <div className="text-sm text-gray-500">Orders in progress</div>
                        </div>
                    </Card>

                    <Card className="p-6">
                        <h3 className="text-base font-medium text-gray-900">Completed Orders</h3>
                        <p className="mt-2 text-3xl font-semibold text-gray-900">{stats.completed_orders}</p>
                        <div className="mt-4">
                            <div className="text-sm text-gray-500">Successfully delivered</div>
                        </div>
                    </Card>
                </div>

                {/* Recent Orders */}
                <div className="space-y-4">
                    <div className="flex items-center justify-between">
                        <h2 className="text-lg font-medium text-gray-900">Recent Orders</h2>
                        <Button variant="outline" asChild>
                            <Link href="/client/orders">View All Orders</Link>
                        </Button>
                    </div>

                    <Card>
                        <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">Order ID</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">Title</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">Status</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">Deadline</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">Amount</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200 bg-white">
                                    {recent_orders.map((order) => (
                                        <tr key={order.id}>
                                            <td className="px-6 py-4 text-sm font-medium whitespace-nowrap text-gray-900">#{order.id}</td>
                                            <td className="px-6 py-4 text-sm whitespace-nowrap text-gray-500">{order.title}</td>
                                            <td className="px-6 py-4 text-sm whitespace-nowrap">
                                                <span
                                                    className={`inline-flex rounded-full px-2 text-xs leading-5 font-semibold ${
                                                        statusColors[order.status]
                                                    }`}
                                                >
                                                    {statusLabels[order.status]}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 text-sm whitespace-nowrap text-gray-500">
                                                {new Date(order.deadline).toLocaleDateString()}
                                            </td>
                                            <td className="px-6 py-4 text-sm whitespace-nowrap text-gray-500">
                                                ${(order.total_amount ?? 0).toFixed(2)}
                                            </td>
                                            <td className="px-6 py-4 text-sm whitespace-nowrap">
                                                <Button variant="outline" size="sm" asChild>
                                                    <Link href={`/client/orders/${order.id}`}>View Details</Link>
                                                </Button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </Card>
                </div>
            </div>
        </ClientLayout>
    );
}
