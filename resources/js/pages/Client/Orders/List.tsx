import ClientLayout from '@/layouts/ClientLayout';
import { Link } from '@inertiajs/react';
import { FileText } from 'lucide-react';
import { useEffect, useState } from 'react';

const TABS = [
    { key: 'recent', label: 'Recent' },
    { key: 'finished', label: 'Finished' },
    { key: 'canceled', label: 'Canceled' },
];

function EmptyTabState({ type }: { type: 'finished' | 'canceled' }) {
    return (
        <div className="flex flex-col items-center justify-center rounded-lg p-6">
            <div className="mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-white shadow-sm">
                <FileText className="h-12 w-12 text-blue-500" />
            </div>
            <div className="max-w-md text-center">
                <h2 className="mb-3 text-xl font-semibold text-gray-800">{type === 'finished' ? 'No Finished Orders' : 'No Cancelled Orders'}</h2>
                <p className="mb-6 text-gray-600">
                    {type === 'finished' ? 'Finished orders will be shown here.' : 'Cancelled orders will be shown here.'}
                </p>
            </div>
        </div>
    );
}

export default function OrdersList({ auth, orders, tab }: any) {
    const [activeTab, setActiveTab] = useState(tab || 'recent');
    const [searchParams, setSearchParams] = useState<{ tab: string }>({ tab: tab || 'recent' });

    useEffect(() => {
        window.history.replaceState(null, '', `/dashboard/orders?tab=${activeTab}`);
    }, [activeTab]);

    let filteredOrders = orders;
    if (activeTab === 'finished') {
        filteredOrders = orders.filter((order: any) => order.status === 'completed');
    } else if (activeTab === 'canceled') {
        filteredOrders = orders.filter((order: any) => order.status === 'cancelled');
    }

    return (
        <ClientLayout user={auth.user}>
            <section className="flex w-full flex-1 flex-col">
                <div className="relative mt-2 mb-8 flex w-full flex-col">
                    <div className="flex justify-start gap-2">
                        {TABS.map((tab) => (
                            <button
                                key={tab.key}
                                onClick={() => setActiveTab(tab.key)}
                                className={`relative z-10 bg-transparent py-2 font-semibold transition-all duration-200 focus:outline-none ${
                                    activeTab === tab.key ? 'text-blue-700' : 'text-gray-700 hover:bg-blue-50 hover:text-blue-700'
                                } `}
                                style={{ minWidth: 110 }}
                            >
                                <span className="relative">
                                    {tab.label}
                                    <span
                                        className={`absolute right-0 -bottom-3 left-0 block transition-all duration-200 ${
                                            activeTab === tab.key ? 'h-1 bg-blue-600' : ''
                                        } `}
                                    />
                                </span>
                            </button>
                        ))}
                    </div>
                    <div className="absolute right-0 bottom-0 left-0 z-0 h-0.5 w-full bg-gray-200" />
                </div>
                <div className="flex min-h-[240px] w-full items-center justify-center">
                    {filteredOrders && filteredOrders.length > 0 ? (
                        <div className="w-full">
                            {filteredOrders.map((order: any) => (
                                <Link
                                    key={order.id}
                                    href={`/dashboard/order/${order.id}/info`}
                                    className="mb-6 block rounded-lg border bg-white p-6 shadow-sm transition hover:shadow-md"
                                >
                                    <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
                                        <div>
                                            <div className="text-sm text-gray-500">{order.subjectCategory?.name || "Writer's choice"}</div>
                                            <div className="text-lg font-semibold text-gray-800">
                                                #{order.id} {order.pages} pages <span className="mx-1">|</span> {order.subjectCategory?.name || ''}{' '}
                                                <span className="mx-1">|</span> {order.academicLevel?.name || ''}
                                            </div>
                                            <div className="mt-1 text-xs text-gray-500">
                                                Deadline:{' '}
                                                {order.deadline &&
                                                    new Date(order.deadline).toLocaleString(undefined, { dateStyle: 'medium', timeStyle: 'short' })}
                                            </div>
                                        </div>
                                        <div className="flex flex-col items-end gap-1">
                                            <span
                                                className={`rounded px-2 py-1 text-xs font-semibold ${order.status === 'pending_payment' ? 'bg-yellow-100 text-yellow-800' : 'bg-blue-100 text-blue-800'}`}
                                            >
                                                {order.status}
                                            </span>
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    ) : activeTab === 'finished' ? (
                        <EmptyTabState type="finished" />
                    ) : activeTab === 'canceled' ? (
                        <EmptyTabState type="canceled" />
                    ) : (
                        <div className="flex flex-col items-center justify-center rounded-lg p-6">
                            <div className="mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-white shadow-sm">
                                <FileText className="h-12 w-12 text-blue-500" />
                            </div>
                            <div className="max-w-md text-center">
                                <h2 className="mb-3 text-xl font-semibold text-gray-800">No Orders Yet</h2>
                                <p className="mb-6 text-gray-600">Create your first order to get started</p>
                                <div className="flex justify-center">
                                    <Link href="/client/orders/create">
                                        <button className="flex items-center gap-2 rounded-md bg-blue-600 px-6 py-3 font-medium text-white hover:bg-blue-700">
                                            Create Order
                                        </button>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </section>
        </ClientLayout>
    );
}
