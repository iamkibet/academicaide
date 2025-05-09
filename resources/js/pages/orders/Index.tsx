import { Order } from '@/types';
import { Head, Link } from '@inertiajs/react';
import { useState } from 'react';

interface Props {
    orders: Order[];
}

export default function Index({ orders }: Props) {
    const [filters, setFilters] = useState({
        status: '',
        is_urgent: false,
        overdue: false,
        needs_attention: false,
    });

    const handleFilterChange = (key: string, value: string | boolean) => {
        setFilters((prev) => ({ ...prev, [key]: value }));
    };

    return (
        <>
            <Head title="Orders" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        <div className="p-6">
                            <div className="mb-6 flex items-center justify-between">
                                <h2 className="text-2xl font-semibold text-gray-800">Orders</h2>
                                <Link href={route('orders.create')} className="rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700">
                                    Create New Order
                                </Link>
                            </div>

                            {/* Filters */}
                            <div className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-4">
                                <select
                                    value={filters.status}
                                    onChange={(e) => handleFilterChange('status', e.target.value)}
                                    className="focus:ring-opacity-50 rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200"
                                >
                                    <option value="">All Statuses</option>
                                    <option value="draft">Draft</option>
                                    <option value="active">Active</option>
                                    <option value="completed">Completed</option>
                                </select>

                                <label className="flex items-center space-x-2">
                                    <input
                                        type="checkbox"
                                        checked={filters.is_urgent}
                                        onChange={(e) => handleFilterChange('is_urgent', e.target.checked)}
                                        className="focus:ring-opacity-50 rounded border-gray-300 text-blue-600 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200"
                                    />
                                    <span>Urgent Only</span>
                                </label>

                                <label className="flex items-center space-x-2">
                                    <input
                                        type="checkbox"
                                        checked={filters.overdue}
                                        onChange={(e) => handleFilterChange('overdue', e.target.checked)}
                                        className="focus:ring-opacity-50 rounded border-gray-300 text-blue-600 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200"
                                    />
                                    <span>Overdue</span>
                                </label>

                                <label className="flex items-center space-x-2">
                                    <input
                                        type="checkbox"
                                        checked={filters.needs_attention}
                                        onChange={(e) => handleFilterChange('needs_attention', e.target.checked)}
                                        className="focus:ring-opacity-50 rounded border-gray-300 text-blue-600 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200"
                                    />
                                    <span>Needs Attention</span>
                                </label>
                            </div>

                            {/* Orders Table */}
                            <div className="overflow-x-auto">
                                <table className="min-w-full divide-y divide-gray-200">
                                    <thead className="bg-gray-50">
                                        <tr>
                                            <th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">Title</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">Status</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">
                                                Deadline
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">Price</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">
                                                Actions
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-200 bg-white">
                                        {orders.map((order) => (
                                            <tr key={order.id}>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="text-sm font-medium text-gray-900">{order.title}</div>
                                                    <div className="text-sm text-gray-500">{order.subject}</div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
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
                                                </td>
                                                <td className="px-6 py-4 text-sm whitespace-nowrap text-gray-500">
                                                    {new Date(order.deadline).toLocaleDateString()}
                                                </td>
                                                <td className="px-6 py-4 text-sm whitespace-nowrap text-gray-500">${order.total_price}</td>
                                                <td className="px-6 py-4 text-sm font-medium whitespace-nowrap">
                                                    <Link href={route('orders.show', order.id)} className="mr-4 text-blue-600 hover:text-blue-900">
                                                        View
                                                    </Link>
                                                    {order.status === 'draft' && (
                                                        <Link href={route('orders.edit', order.id)} className="text-indigo-600 hover:text-indigo-900">
                                                            Edit
                                                        </Link>
                                                    )}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
