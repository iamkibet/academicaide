import { Card } from '@/components/ui/card';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types/index.d';
import { CurrencyDollarIcon, DocumentTextIcon, GlobeAltIcon, UserGroupIcon, ViewColumnsIcon } from '@heroicons/react/24/outline';
import { Head, Link } from '@inertiajs/react';
import {
    ArrowDownIcon,
    ArrowUpIcon,
    CalendarIcon,
    CheckCircleIcon,
    ChevronRightIcon,
    ClockIcon,
    CloudLightning,
    CogIcon,
    InboxIcon,
    ShoppingBagIcon,
} from 'lucide-react';
import { Area, AreaChart, Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

interface Metrics {
    total_orders: number;
    pending_orders: number;
    active_orders: number;
    completed_orders: number;
    total_revenue: number;
    total_clients: number;
}

interface MetricCardProps {
    title: string;
    value: string | number;
    trend?: number;
    icon: React.ReactNode;
    color: 'blue' | 'yellow' | 'orange' | 'green' | 'purple' | 'indigo';
}

const MetricCard = ({ title, value, trend, icon, color }: MetricCardProps) => {
    const colorClasses = {
        blue: 'bg-blue-100 text-blue-600',
        yellow: 'bg-yellow-100 text-yellow-600',
        orange: 'bg-orange-100 text-orange-600',
        green: 'bg-green-100 text-green-600',
        purple: 'bg-purple-100 text-purple-600',
        indigo: 'bg-indigo-100 text-indigo-600',
    };

    return (
        <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm transition-shadow hover:shadow-md">
            <div className="flex items-center justify-between">
                <div>
                    <p className="text-sm font-medium text-gray-600">{title}</p>
                    <p className="mt-1 text-2xl font-bold text-gray-900">{value}</p>
                </div>
                <div className={`rounded-lg p-3 ${colorClasses[color]}`}>{icon}</div>
            </div>

            {trend !== undefined && (
                <div className="mt-4 flex items-center">
                    <span className={`inline-flex items-center text-sm font-medium ${trend >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                        {trend >= 0 ? <ArrowUpIcon className="mr-1 h-4 w-4" /> : <ArrowDownIcon className="mr-1 h-4 w-4" />}
                        {Math.abs(trend)}%
                    </span>
                    <span className="ml-2 text-sm text-gray-500">from last month</span>
                </div>
            )}
        </div>
    );
};

interface ChartCardProps {
    title: string;
    description?: string;
    children: React.ReactNode;
}

const ChartCard = ({ title, description, children }: ChartCardProps) => (
    <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
        <div className="mb-4">
            <h3 className="text-lg font-bold text-gray-900">{title}</h3>
            {description && <p className="text-sm text-gray-500">{description}</p>}
        </div>
        {children}
    </div>
);

interface ManagementCardProps {
    title: string;
    description: string;
    href: string;
    icon: React.ReactNode;
}

const ManagementCard = ({ title, description, href, icon }: ManagementCardProps) => (
    <Link
        href={href}
        className="group rounded-xl border border-gray-200 bg-white p-5 text-center shadow-sm transition-all hover:border-blue-300 hover:shadow-md"
    >
        <div className="mb-3 flex justify-center">
            <div className="rounded-lg bg-gray-100 p-3 group-hover:bg-blue-50 group-hover:text-blue-600">{icon}</div>
        </div>
        <div className="font-medium text-gray-900 group-hover:text-blue-700">{title}</div>
        <div className="text-xs text-gray-500">{description}</div>
    </Link>
);

interface StatusBadgeProps {
    status: string;
}

const StatusBadge = ({ status }: StatusBadgeProps) => {
    const statusConfig = {
        pending: { color: 'bg-yellow-100 text-yellow-800', label: 'Pending' },
        active: { color: 'bg-blue-100 text-blue-800', label: 'Active' },
        completed: { color: 'bg-green-100 text-green-800', label: 'Completed' },
        cancelled: { color: 'bg-red-100 text-red-800', label: 'Cancelled' },
        default: { color: 'bg-gray-100 text-gray-800', label: status },
    };

    const config = statusConfig[status as keyof typeof statusConfig] || statusConfig.default;

    return <span className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-medium ${config.color}`}>{config.label}</span>;
};

const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
    });
};
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

            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                {/* Header */}
                <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">Dashboard Overview</h1>
                        <p className="mt-1 text-gray-500">Monitor your business performance at a glance</p>
                    </div>
                    <div className="flex items-center space-x-3">
                        <button className="rounded-lg bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow transition hover:bg-gray-50">
                            Export Report
                        </button>
                        <div className="relative">
                            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                                <CalendarIcon className="h-5 w-5 text-gray-400" />
                            </div>
                            <select
                                className="block w-full rounded-lg border border-gray-200 bg-white py-2 pr-8 pl-10 text-sm shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
                                defaultValue="Last 30 days"
                            >
                                <option>Last 7 days</option>
                                <option>Last 30 days</option>
                                <option>Last 90 days</option>
                            </select>
                        </div>
                    </div>
                </div>

                {/* Metrics Grid */}
                <div className="grid auto-rows-min gap-4 md:grid-cols-3">
                    <MetricCard
                        title="Total Orders"
                        value={metrics.total_orders}
                        trend={12.5}
                        icon={<ShoppingBagIcon className="h-6 w-6" />}
                        color="blue"
                    />
                    <MetricCard
                        title="Pending Orders"
                        value={metrics.pending_orders}
                        trend={-3.2}
                        icon={<ClockIcon className="h-6 w-6" />}
                        color="yellow"
                    />
                    <MetricCard
                        title="Active Orders"
                        value={metrics.active_orders}
                        trend={8.7}
                        icon={<CloudLightning className="h-6 w-6" />}
                        color="orange"
                    />
                    <MetricCard
                        title="Completed Orders"
                        value={metrics.completed_orders}
                        trend={15.3}
                        icon={<CheckCircleIcon className="h-6 w-6" />}
                        color="green"
                    />
                    <MetricCard
                        title="Total Revenue"
                        value={`$${Number(metrics.total_revenue || 0).toFixed(2)}`}
                        trend={18.2}
                        icon={<CurrencyDollarIcon className="h-6 w-6" />}
                        color="purple"
                    />
                    <MetricCard
                        title="Total Clients"
                        value={metrics.total_clients}
                        trend={5.4}
                        icon={<UserGroupIcon className="h-6 w-6" />}
                        color="indigo"
                    />
                </div>

                {/* Charts Grid */}
                <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                    <ChartCard title="Order Volume (Last 14 Days)" description="Tracking order completion rates">
                        <div className="h-72">
                            <ResponsiveContainer width="100%" height="100%">
                                <AreaChart data={orderTrends}>
                                    <defs>
                                        <linearGradient id="ordersGradient" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.3} />
                                            <stop offset="95%" stopColor="#3B82F6" stopOpacity={0} />
                                        </linearGradient>
                                    </defs>
                                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                                    <XAxis dataKey="date" tickLine={false} axisLine={false} tick={{ fontSize: 12 }} />
                                    <YAxis allowDecimals={false} tickLine={false} axisLine={false} tick={{ fontSize: 12 }} />
                                    <Tooltip
                                        contentStyle={{
                                            borderRadius: '8px',
                                            boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
                                            border: 'none',
                                        }}
                                    />
                                    <Area type="monotone" dataKey="orders" stroke="#3B82F6" strokeWidth={2} fill="url(#ordersGradient)" />
                                </AreaChart>
                            </ResponsiveContainer>
                        </div>
                    </ChartCard>

                    <ChartCard title="Revenue Trend (Last 14 Days)" description="Tracking revenue performance">
                        <div className="h-72">
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={orderTrends}>
                                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                                    <XAxis dataKey="date" tickLine={false} axisLine={false} tick={{ fontSize: 12 }} />
                                    <YAxis tickLine={false} axisLine={false} tick={{ fontSize: 12 }} tickFormatter={(value) => `$${value}`} />
                                    <Tooltip
                                        formatter={(value) => [`$${value}`, 'Revenue']}
                                        contentStyle={{
                                            borderRadius: '8px',
                                            boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
                                            border: 'none',
                                        }}
                                    />
                                    <Bar dataKey="revenue" fill="#8B5CF6" radius={[4, 4, 0, 0]} />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </ChartCard>
                </div>

                {/* Management Tools */}
                <div>
                    <div className="mb-4 flex items-center justify-between">
                        <h2 className="text-xl font-bold text-gray-900">Quick Management</h2>
                        <Link href="/admin/settings" className="text-sm font-medium text-blue-600 hover:text-blue-800">
                            View all settings
                        </Link>
                    </div>
                    <div className="grid auto-rows-min gap-4 md:grid-cols-5">
                        <ManagementCard
                            title="Assignment Types"
                            description="Manage assignment types"
                            href="/admin/assignment-types"
                            icon={<DocumentTextIcon className="h-8 w-8 text-blue-500" />}
                        />
                        <ManagementCard
                            title="Service Types"
                            description="Manage service types"
                            href="/admin/service-types"
                            icon={<CogIcon className="h-8 w-8 text-green-500" />}
                        />
                        <ManagementCard
                            title="Languages"
                            description="Manage languages"
                            href="/admin/languages"
                            icon={<GlobeAltIcon className="h-8 w-8 text-yellow-500" />}
                        />
                        <ManagementCard
                            title="Line Spacing"
                            description="Manage spacing options"
                            href="/admin/line-spacings"
                            icon={<ViewColumnsIcon className="h-8 w-8 text-indigo-500" />}
                        />
                        <ManagementCard
                            title="Pricing Config"
                            description="Manage pricing settings"
                            href="/admin/pricing-config"
                            icon={<CurrencyDollarIcon className="h-8 w-8 text-purple-500" />}
                        />
                    </div>
                </div>

                {/* Recent Orders */}
                <Card className="overflow-hidden">
                    <div className="flex flex-col justify-between gap-4 p-6 sm:flex-row sm:items-center">
                        <div>
                            <h2 className="text-xl font-bold text-gray-900">Recent Orders</h2>
                            <p className="text-gray-500">Latest orders from your clients</p>
                        </div>
                        <Link href="/admin/orders" className="inline-flex items-center text-sm font-medium text-blue-600 hover:text-blue-800">
                            View all orders
                            <ChevronRightIcon className="ml-1 h-4 w-4" />
                        </Link>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    {['ID', 'Client', 'Status', 'Total', 'Created', 'Deadline', ''].map((header) => (
                                        <th key={header} className="px-4 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">
                                            {header}
                                        </th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200 bg-white">
                                {recent_orders.length === 0 ? (
                                    <tr>
                                        <td colSpan={7} className="px-4 py-6 text-center text-gray-500">
                                            <div className="flex flex-col items-center justify-center py-8">
                                                <InboxIcon className="h-12 w-12 text-gray-400" />
                                                <p className="mt-2 text-sm font-medium text-gray-900">No recent orders</p>
                                                <p className="text-sm text-gray-500">New orders will appear here</p>
                                            </div>
                                        </td>
                                    </tr>
                                ) : (
                                    recent_orders.map((order) => (
                                        <tr key={order.id} className="transition-colors hover:bg-gray-50">
                                            <td className="px-4 py-3 font-mono text-sm whitespace-nowrap text-gray-900">#{order.id}</td>
                                            <td className="px-4 py-3">
                                                <div className="flex items-center">
                                                    <div className="h-10 w-10 flex-shrink-0">
                                                        <div className="flex h-full w-full items-center justify-center rounded-full bg-gray-200 text-sm font-medium">
                                                            {order.client?.name?.charAt(0) || '?'}
                                                        </div>
                                                    </div>
                                                    <div className="ml-4">
                                                        <div className="text-sm font-medium text-gray-900">{order.client?.name || 'N/A'}</div>
                                                        <div className="text-sm text-gray-500">{order.client?.email || ''}</div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-4 py-3 whitespace-nowrap">
                                                <StatusBadge status={order.status} />
                                            </td>
                                            <td className="px-4 py-3 text-sm font-medium whitespace-nowrap text-gray-900">
                                                ${Number(order.total_price || 0).toFixed(2)}
                                            </td>
                                            <td className="px-4 py-3 text-sm whitespace-nowrap text-gray-500">{formatDate(order.created_at)}</td>
                                            <td className="px-4 py-3 text-sm whitespace-nowrap text-gray-500">
                                                {order.deadline ? formatDate(order.deadline) : 'N/A'}
                                            </td>
                                            <td className="px-4 py-3 text-right text-sm font-medium whitespace-nowrap">
                                                <Link href={`/admin/orders/${order.id}`} className="text-blue-600 hover:text-blue-900">
                                                    View
                                                </Link>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </Card>
            </div>
        </AppLayout>
    );
}
