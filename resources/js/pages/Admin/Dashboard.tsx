import { Card } from '@/components/ui/card';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types/index.d';
import { Head, Link } from '@inertiajs/react';
import { CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

interface Metrics {
    total_orders: number;
    pending_orders: number;
    active_orders: number;
    completed_orders: number;
    total_revenue: number;
    total_clients: number;
}
const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
];

interface RecentOrder {
    id: number;
    client: { id: number; name: string; email: string } | null;
    status: string;
    total_price: number;
    created_at: string;
    deadline: string;
}

interface OrderTrend {
    date: string;
    orders: number;
    revenue: number;
}

interface Props {
    metrics: Metrics;
    recent_orders: RecentOrder[];
    orderTrends: OrderTrend[];
}

export default function Dashboard({ metrics, recent_orders, orderTrends }: Props) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Admin Dashboard" />

            <div className="space-y-8">
                <div>
                    <h1 className="text-2xl font-semibold text-gray-900">Dashboard</h1>
                    <p className="mt-1 text-sm text-gray-500">Overview of your business performance</p>
                </div>

                {/* Metrics */}
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
                    <Card className="p-6">
                        <div className="flex flex-col items-center">
                            <span className="text-sm text-gray-500">Total Orders</span>
                            <span className="text-3xl font-bold text-blue-600">{metrics.total_orders}</span>
                        </div>
                    </Card>
                    <Card className="p-6">
                        <div className="flex flex-col items-center">
                            <span className="text-sm text-gray-500">Pending Orders</span>
                            <span className="text-3xl font-bold text-yellow-500">{metrics.pending_orders}</span>
                        </div>
                    </Card>
                    <Card className="p-6">
                        <div className="flex flex-col items-center">
                            <span className="text-sm text-gray-500">Active Orders</span>
                            <span className="text-3xl font-bold text-orange-500">{metrics.active_orders}</span>
                        </div>
                    </Card>
                    <Card className="p-6">
                        <div className="flex flex-col items-center">
                            <span className="text-sm text-gray-500">Completed Orders</span>
                            <span className="text-3xl font-bold text-green-600">{metrics.completed_orders}</span>
                        </div>
                    </Card>
                    <Card className="p-6">
                        <div className="flex flex-col items-center">
                            <span className="text-sm text-gray-500">Total Revenue</span>
                            <span className="text-3xl font-bold text-purple-600">${metrics.total_revenue.toFixed(2)}</span>
                        </div>
                    </Card>
                    <Card className="p-6">
                        <div className="flex flex-col items-center">
                            <span className="text-sm text-gray-500">Total Clients</span>
                            <span className="text-3xl font-bold text-indigo-600">{metrics.total_clients}</span>
                        </div>
                    </Card>
                </div>

                {/* Quick Admin Management Links */}
                <div className="my-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
                    <Link
                        href="/admin/assignment-types"
                        className="block rounded-lg border border-gray-100 bg-white p-6 text-center shadow transition hover:border-blue-400 hover:shadow-lg"
                    >
                        <div className="mb-2 flex justify-center">
                            <svg className="h-8 w-8 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M9 17v-6h13v6M9 5v6h13V5M5 17h.01M5 11h.01M5 5h.01"
                                />
                            </svg>
                        </div>
                        <div className="font-semibold text-gray-800">Assignment Types</div>
                        <div className="text-xs text-gray-500">Manage assignment types</div>
                    </Link>
                    <Link
                        href="/admin/service-types"
                        className="block rounded-lg border border-gray-100 bg-white p-6 text-center shadow transition hover:border-blue-400 hover:shadow-lg"
                    >
                        <div className="mb-2 flex justify-center">
                            <svg className="h-8 w-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"
                                />
                            </svg>
                        </div>
                        <div className="font-semibold text-gray-800">Service Types</div>
                        <div className="text-xs text-gray-500">Manage service types</div>
                    </Link>
                    <Link
                        href="/admin/languages"
                        className="block rounded-lg border border-gray-100 bg-white p-6 text-center shadow transition hover:border-blue-400 hover:shadow-lg"
                    >
                        <div className="mb-2 flex justify-center">
                            <svg className="h-8 w-8 text-yellow-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                            </svg>
                        </div>
                        <div className="font-semibold text-gray-800">Languages</div>
                        <div className="text-xs text-gray-500">Manage languages</div>
                    </Link>
                    <Link
                        href="/admin/line-spacings"
                        className="block rounded-lg border border-gray-100 bg-white p-6 text-center shadow transition hover:border-blue-400 hover:shadow-lg"
                    >
                        <div className="mb-2 flex justify-center">
                            <svg className="h-8 w-8 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                            </svg>
                        </div>
                        <div className="font-semibold text-gray-800">Line Spacing</div>
                        <div className="text-xs text-gray-500">Manage line spacing options</div>
                    </Link>
                    <Link
                        href="/admin/pricing-config"
                        className="block rounded-lg border border-gray-100 bg-white p-6 text-center shadow transition hover:border-blue-400 hover:shadow-lg"
                    >
                        <div className="mb-2 flex justify-center">
                            <svg className="h-8 w-8 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        </div>
                        <div className="font-semibold text-gray-800">Pricing Config</div>
                        <div className="text-xs text-gray-500">Manage pricing settings</div>
                    </Link>
                </div>

                {/* Trends */}
                <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
                    <Card className="p-6">
                        <h3 className="mb-2 text-lg font-medium text-gray-900">Orders Trend (Last 14 Days)</h3>
                        <div className="h-72">
                            <ResponsiveContainer width="100%" height="100%">
                                <LineChart data={orderTrends} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="date" />
                                    <YAxis allowDecimals={false} />
                                    <Tooltip />
                                    <Line type="monotone" dataKey="orders" stroke="#3B82F6" strokeWidth={2} />
                                </LineChart>
                            </ResponsiveContainer>
                        </div>
                    </Card>
                    <Card className="p-6">
                        <h3 className="mb-2 text-lg font-medium text-gray-900">Revenue Trend (Last 14 Days)</h3>
                        <div className="h-72">
                            <ResponsiveContainer width="100%" height="100%">
                                <LineChart data={orderTrends} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="date" />
                                    <YAxis />
                                    <Tooltip />
                                    <Line type="monotone" dataKey="revenue" stroke="#8B5CF6" strokeWidth={2} />
                                </LineChart>
                            </ResponsiveContainer>
                        </div>
                    </Card>
                </div>

                {/* Recent Orders Table */}
                <Card className="p-6">
                    <h3 className="mb-4 text-lg font-medium text-gray-900">Recent Orders</h3>
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead>
                                <tr>
                                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">ID</th>
                                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Client</th>
                                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Total</th>
                                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Created</th>
                                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Deadline</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100 bg-white">
                                {recent_orders.length === 0 && (
                                    <tr>
                                        <td colSpan={6} className="py-4 text-center text-gray-400">
                                            No recent orders.
                                        </td>
                                    </tr>
                                )}
                                {recent_orders.map((order) => (
                                    <tr key={order.id} className="hover:bg-gray-50">
                                        <td className="px-4 py-2 font-mono">#{order.id}</td>
                                        <td className="px-4 py-2">{order.client ? order.client.name : 'N/A'}</td>
                                        <td className="px-4 py-2">
                                            <span
                                                className={`rounded px-2 py-1 text-xs font-semibold ${order.status === 'completed' ? 'bg-green-100 text-green-700' : order.status === 'pending' ? 'bg-yellow-100 text-yellow-700' : 'bg-gray-100 text-gray-700'}`}
                                            >
                                                {order.status}
                                            </span>
                                        </td>
                                        <td className="px-4 py-2">${order.total_price.toFixed(2)}</td>
                                        <td className="px-4 py-2">{new Date(order.created_at).toLocaleDateString()}</td>
                                        <td className="px-4 py-2">{order.deadline ? new Date(order.deadline).toLocaleDateString() : 'N/A'}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </Card>
            </div>
        </AppLayout>
    );
}
