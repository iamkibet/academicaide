import { Card } from '@/components/ui/card';
import AdminLayout from '@/layouts/AdminLayout';
import { User } from '@/types';
import { Head } from '@inertiajs/react';
import { CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

interface Props {
    metrics: {
        totalOrders: number;
        pendingOrders: number;
        completedOrders: number;
        totalRevenue: number;
    };
    orderTrends: {
        date: string;
        orders: number;
        revenue: number;
    }[];
    user: User;
}

export default function Dashboard({ metrics, orderTrends, user }: Props) {
    return (
        <AdminLayout user={user}>
            <Head title="Admin Dashboard" />

            <div className="space-y-6">
                <div>
                    <h1 className="text-2xl font-semibold text-gray-900">Dashboard</h1>
                    <p className="mt-1 text-sm text-gray-500">Overview of your business performance</p>
                </div>

                {/* Metrics */}
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
                    <Card className="p-6">
                        <div className="flex items-center">
                            <div className="flex-shrink-0 rounded-md bg-blue-500 p-3">
                                <svg className="h-6 w-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                                    />
                                </svg>
                            </div>
                            <div className="ml-5 w-0 flex-1">
                                <dl>
                                    <dt className="truncate text-sm font-medium text-gray-500">Total Orders</dt>
                                    <dd className="text-2xl font-semibold text-gray-900">{metrics.totalOrders}</dd>
                                </dl>
                            </div>
                        </div>
                    </Card>

                    <Card className="p-6">
                        <div className="flex items-center">
                            <div className="flex-shrink-0 rounded-md bg-yellow-500 p-3">
                                <svg className="h-6 w-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                                    />
                                </svg>
                            </div>
                            <div className="ml-5 w-0 flex-1">
                                <dl>
                                    <dt className="truncate text-sm font-medium text-gray-500">Pending Orders</dt>
                                    <dd className="text-2xl font-semibold text-gray-900">{metrics.pendingOrders}</dd>
                                </dl>
                            </div>
                        </div>
                    </Card>

                    <Card className="p-6">
                        <div className="flex items-center">
                            <div className="flex-shrink-0 rounded-md bg-green-500 p-3">
                                <svg className="h-6 w-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                                    />
                                </svg>
                            </div>
                            <div className="ml-5 w-0 flex-1">
                                <dl>
                                    <dt className="truncate text-sm font-medium text-gray-500">Completed Orders</dt>
                                    <dd className="text-2xl font-semibold text-gray-900">{metrics.completedOrders}</dd>
                                </dl>
                            </div>
                        </div>
                    </Card>

                    <Card className="p-6">
                        <div className="flex items-center">
                            <div className="flex-shrink-0 rounded-md bg-purple-500 p-3">
                                <svg className="h-6 w-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                    />
                                </svg>
                            </div>
                            <div className="ml-5 w-0 flex-1">
                                <dl>
                                    <dt className="truncate text-sm font-medium text-gray-500">Total Revenue</dt>
                                    <dd className="text-2xl font-semibold text-gray-900">${metrics.totalRevenue.toFixed(2)}</dd>
                                </dl>
                            </div>
                        </div>
                    </Card>
                </div>

                {/* Charts */}
                <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
                    <Card className="p-6">
                        <h3 className="text-lg font-medium text-gray-900">Orders Trend</h3>
                        <div className="mt-4 h-80">
                            <ResponsiveContainer width="100%" height="100%">
                                <LineChart data={orderTrends}>
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="date" />
                                    <YAxis />
                                    <Tooltip />
                                    <Line type="monotone" dataKey="orders" stroke="#3B82F6" />
                                </LineChart>
                            </ResponsiveContainer>
                        </div>
                    </Card>

                    <Card className="p-6">
                        <h3 className="text-lg font-medium text-gray-900">Revenue Trend</h3>
                        <div className="mt-4 h-80">
                            <ResponsiveContainer width="100%" height="100%">
                                <LineChart data={orderTrends}>
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="date" />
                                    <YAxis />
                                    <Tooltip />
                                    <Line type="monotone" dataKey="revenue" stroke="#8B5CF6" />
                                </LineChart>
                            </ResponsiveContainer>
                        </div>
                    </Card>
                </div>
            </div>
        </AdminLayout>
    );
}
