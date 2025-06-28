import MaxWidthWrapper from '@/components/MaxWidthWrapper';
import ClientLayout from '@/layouts/ClientLayout';
import { User } from '@/types';
import { Link } from '@inertiajs/react';
import { FileText, Plus } from 'lucide-react';
import { useState } from 'react';

interface Props {
    auth: {
        user: User;
    };
}

const TABS = [
    { key: 'recent', label: 'Recent' },
    { key: 'finished', label: 'Finished' },
    { key: 'canceled', label: 'Canceled' },
];

function Spinner() {
    return (
        <div className="flex items-center justify-center py-12">
            <svg className="h-8 w-8 animate-spin text-blue-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"></path>
            </svg>
        </div>
    );
}

function NoOrdersEmptyState() {
    return (
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
                            <Plus className="h-5 w-5" />
                            Create Order
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default function Dashboard({ auth }: Props) {
    const [activeTab, setActiveTab] = useState('recent');
    const [loading, setLoading] = useState(false);

    const handleTabClick = (tab: string) => {
        if (tab !== activeTab) {
            setLoading(true);
            setActiveTab(tab);
            setTimeout(() => setLoading(false), 700); // Simulate loading
        }
    };

    return (
        <ClientLayout user={auth.user}>
            {/* Orders Tabs */}
            <section className="flex w-full flex-1 flex-col">
                <MaxWidthWrapper className="relative mt-2 mb-8 flex w-full flex-col">
                    <div className="flex justify-start gap-2">
                        {TABS.map((tab) => (
                            <button
                                key={tab.key}
                                onClick={() => handleTabClick(tab.key)}
                                className={`relative z-10 bg-transparent py-2 font-semibold transition-all duration-200 focus:outline-none ${
                                    activeTab === tab.key ? 'text-blue-700' : 'text-gray-700 hover:bg-blue-50 hover:text-blue-700'
                                } `}
                                style={{ minWidth: 110 }}
                            >
                                <span className="relative">
                                    {tab.label}
                                    <span
                                        className={`absolute right-0 -bottom-3 left-0 block transition-all duration-200 ${
                                            activeTab === tab.key ? 'h-1  bg-blue-600' : ''
                                        } `}
                                    />
                                </span>
                            </button>
                        ))}
                    </div>
                    <div className="absolute right-0 bottom-0 left-0 z-0 h-0.5 w-full bg-gray-200" />
                </MaxWidthWrapper>
                <MaxWidthWrapper className="flex min-h-[240px] w-full items-center justify-center">
                    {loading ? <Spinner /> : <NoOrdersEmptyState />}
                </MaxWidthWrapper>
            </section>
        </ClientLayout>
    );
}
