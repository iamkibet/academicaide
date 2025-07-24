import MaxWidthWrapper from '@/components/MaxWidthWrapper';
import OrderCard from '@/components/OrderCard';
import ClientLayout from '@/layouts/ClientLayout';
import { User } from '@/types';
import { Link } from '@inertiajs/react';
import { CheckCircle, Clock, FileText, XCircle } from 'lucide-react';
import { useEffect, useState } from 'react';

interface Order {
    id: number;
    title: string;
    status: string;
    deadline: string;
    subject?: string;
    pages?: number;
    academic_level?: string;
    total_price?: number;
    writer_name?: string;
}

interface Props {
    auth: {
        user: User;
    };
    recent_orders: Order[];
}

const TABS = [
    { key: 'recent', label: 'Recent Orders', icon: <Clock className="h-5 w-5" /> },
    { key: 'finished', label: 'Completed', icon: <CheckCircle className="h-5 w-5" /> },
    { key: 'canceled', label: 'Cancelled', icon: <XCircle className="h-5 w-5" /> },
];

function EmptyState({ title, description, icon }: { title: string; description: string; icon: React.ReactNode }) {
    return (
        <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-gray-200 bg-white p-8 text-center">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-gray-50">{icon}</div>
            <h3 className="mt-4 text-lg font-semibold text-gray-900">{title}</h3>
            <p className="mt-2 max-w-md text-sm text-gray-500">{description}</p>
        </div>
    );
}

// Helper function to map your status to the progress steps
function mapStatusToStep(status: string): string {
    const statusMap: Record<string, string> = {
        pending_payment: 'payment',
        writer_pending: 'writer',
        in_progress: 'progress',
        review: 'review',
        completed: 'approval',
        cancelled: 'payment', // fallback for cancelled
    };
    return statusMap[status] || 'payment';
}

export default function Dashboard({ auth, recent_orders }: Props) {
    const searchParams = new URLSearchParams(typeof window !== 'undefined' ? window.location.search : '');
    const tabParam = searchParams.get('tab') || 'recent';
    const [activeTab, setActiveTab] = useState(tabParam);

    useEffect(() => {
        setActiveTab(tabParam);
    }, [tabParam]);

    // Filter orders by tab
    let filteredOrders = recent_orders;
    if (activeTab === 'finished') {
        filteredOrders = recent_orders.filter((order) => order.status === 'completed');
    } else if (activeTab === 'canceled') {
        filteredOrders = recent_orders.filter((order) => order.status === 'cancelled');
    }

    return (
        <ClientLayout user={auth.user}>
            <div className="bg-gray-50 py-8">
                <MaxWidthWrapper>
                    <div className="mb-8">
                       

                        {/* Tabs */}
                        <div className="mt-8">
                            <div className="border-b border-gray-200">
                                <nav className="-mb-px flex space-x-4 overflow-x-auto pb-px sm:space-x-8" aria-label="Tabs">
                                    {TABS.map((tab) => (
                                        <Link
                                            key={tab.key}
                                            href={`/client/dashboard/orders?tab=${tab.key}`}
                                            className={`flex items-center gap-2 border-b-2 px-1 py-3 text-sm font-medium whitespace-nowrap ${
                                                activeTab === tab.key
                                                    ? 'border-blue-500 text-blue-600'
                                                    : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
                                            } `}
                                        >
                                            {tab.icon}
                                            {tab.label}
                                        </Link>
                                    ))}
                                </nav>
                            </div>
                        </div>
                    </div>

                    {/* Orders List */}
                    <div className="mt-6">
                        {filteredOrders.length > 0 ? (
                            <div className="grid grid-cols-1 gap-6">
                                {filteredOrders.map((order) => (
                                    <OrderCard
                                        key={order.id}
                                        order={{
                                            ...order,
                                            status: mapStatusToStep(order.status),
                                            subject: order.subject || '',
                                            pages: order.pages ?? 0,
                                            academic_level: order.academic_level || '',
                                            total_price: order.total_price ?? 0,
                                        }}
                                    />
                                ))}
                            </div>
                        ) : (
                            <div className="mt-8">
                                {activeTab === 'recent' && (
                                    <EmptyState
                                        title="No active orders"
                                        description="Get started by creating your first academic writing order. Our expert writers are ready to help you succeed."
                                        icon={<FileText className="h-6 w-6 text-gray-400" />}
                                    />
                                )}
                                {activeTab === 'finished' && (
                                    <EmptyState
                                        title="No completed orders"
                                        description="Completed orders will appear here once your assignments are finished."
                                        icon={<CheckCircle className="h-6 w-6 text-gray-400" />}
                                    />
                                )}
                                {activeTab === 'canceled' && (
                                    <EmptyState
                                        title="No canceled orders"
                                        description="Cancelled orders will appear here if you choose to cancel any assignments."
                                        icon={<XCircle className="h-6 w-6 text-gray-400" />}
                                    />
                                )}
                            </div>
                        )}
                    </div>
                </MaxWidthWrapper>
            </div>
        </ClientLayout>
    );
}
