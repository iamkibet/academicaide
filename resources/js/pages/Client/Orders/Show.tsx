import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import ClientLayout from '@/layouts/ClientLayout';
import { User } from '@/types';
import { router } from '@inertiajs/core';
import { Head, Link } from '@inertiajs/react';
import { BarChart2, CreditCard, File, FileBarChart2, Info, MessageSquare, Plus, Timer, UserCog } from 'lucide-react';
import React from 'react';

interface OrderFile {
    id: number;
    name: string;
    url: string;
    size: number;
    created_at: string;
}

interface OrderMessage {
    id: number;
    sender: {
        name: string;
        role: 'client' | 'admin' | 'writer';
    };
    message: string;
    created_at: string;
    attachments: Array<{
        id: number;
        name: string;
        url: string;
    }>;
}

interface Order {
    id: number;
    title?: string;
    description?: string;
    status?: string;
    payment_status?: string;
    assignment_type?: string;
    service_type?: string;
    academic_level?: string;
    subject?: string;
    language?: string;
    pages?: number;
    words?: number;
    size_unit?: string;
    line_spacing?: string;
    citation_style?: string;
    source_count?: string;
    price_per_page?: number;
    total_price?: number;
    is_urgent?: boolean;
    deadline?: string;
    instructions?: string;
    client_notes?: string;
    created_at?: string;
    updated_at?: string;
    client?: User;
    files?: OrderFile[];
    messages?: OrderMessage[];
    can_be_edited?: boolean;
    is_overdue?: boolean;
    needs_attention?: boolean;
    addons?: Addon[];
    academicLevel?: {
        id: number;
        name: string;
    };
}

interface Props {
    auth: { user: User };
    order: Order;
    availableAddons: Addon[];
}

interface Addon {
    id: number;
    name: string;
    slug: string;
    price: number;
    is_free: boolean;
}

// ServiceCard component
function ServiceCard({
    icon: Icon,
    title,
    price,
    onClick,
}: {
    icon: React.ComponentType<{ className?: string }>;
    title: string;
    price: string;
    onClick: () => void;
}) {
    const [hovered, setHovered] = React.useState(false);
    return (
        <div
            className="group relative flex cursor-pointer flex-col items-center justify-center rounded-lg border bg-white p-4 transition-shadow hover:shadow-lg"
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            onClick={onClick}
        >
            <Icon className="mb-2 h-8 w-8 text-blue-500" />
            <div className="text-center font-semibold text-gray-800">{title}</div>
            <div
                className={`bg-opacity-90 absolute inset-0 flex items-center justify-center bg-white transition-opacity duration-200 ${hovered ? 'opacity-100' : 'pointer-events-none opacity-0'}`}
            >
                <span className="text-lg font-bold text-blue-700">{price}</span>
            </div>
        </div>
    );
}

// Reusable ServiceModal
function ServiceModal({
    open,
    onClose,
    icon: Icon,
    title,
    description,
    unitLabel,
    pricePerUnit,
    min = 1,
    defaultQty = 1,
    onConfirm,
}: {
    open: boolean;
    onClose: () => void;
    icon: React.ComponentType<{ className?: string }>;
    title: string;
    description: string;
    unitLabel: string;
    pricePerUnit: number;
    min?: number;
    defaultQty?: number;
    onConfirm: (qty: number) => void;
}) {
    const [qty, setQty] = React.useState(defaultQty);
    React.useEffect(() => {
        if (open) setQty(defaultQty);
    }, [open, defaultQty]);
    const total = qty * pricePerUnit;
    if (!open) return null;
    return (
        <div className="bg-opacity-40 fixed inset-0 z-50 flex items-center justify-center bg-black">
            <div className="relative w-full max-w-md rounded-lg bg-white p-8 shadow-lg">
                <button className="absolute top-2 right-2 text-gray-400 hover:text-gray-600" onClick={onClose}>
                    &times;
                </button>
                <div className="mb-4 flex items-center gap-3">
                    <Icon className="h-7 w-7 text-blue-500" />
                    <h2 className="text-xl font-semibold text-gray-800">{title}</h2>
                </div>
                <p className="mb-4 text-gray-600">{description}</p>
                <div className="mb-4 flex items-center gap-2">
                    <span className="text-gray-700">I need</span>
                    <input
                        type="number"
                        min={min}
                        value={qty}
                        onChange={(e) => setQty(Math.max(min, Number(e.target.value)))}
                        className="w-16 rounded border px-2 py-1 text-center font-semibold"
                    />
                    <span className="text-gray-700">{unitLabel}</span>
                </div>
                <div className="mb-6 font-medium text-gray-700">
                    Price: <span className="font-bold text-blue-700">${total.toFixed(2)}</span>
                </div>
                <Button
                    className="w-full"
                    onClick={() => {
                        onConfirm(qty);
                        onClose();
                    }}
                >
                    Add to order
                </Button>
            </div>
        </div>
    );
}

export default function Show({ auth, order, availableAddons }: Props) {
    // Fallback for undefined availableAddons
    const safeAvailableAddons = Array.isArray(availableAddons) ? availableAddons : [];
    if (!availableAddons || !Array.isArray(availableAddons) || availableAddons.length === 0) {
        // eslint-disable-next-line no-console
        console.warn('No availableAddons provided to Show page. Service cards may not work as expected.');
    }
    const [tab, setTab] = React.useState('info');
    const [modal, setModal] = React.useState<null | { type: string }>(null);
    // Helper to get addon by slug
    const getAddon = (slug: string) => safeAvailableAddons.find((a) => a.slug === slug);
    // PATCH order to add addon/service
    const addService = (slug: string, qty: number) => {
        const addon = getAddon(slug);
        if (!addon) return;
        const patchData: Record<string, unknown> = { addon_ids: [...(order.addons?.map((a) => a.id) || []), addon.id] };
        if (slug === 'additional-pages') patchData.pages = (order.pages || 0) + qty;
        if (slug === 'powerpoint-slides') patchData.slides = qty; // adjust as needed
        if (slug === 'charts') patchData.charts = qty; // adjust as needed
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        router.patch(`/client/orders/${order.id}`, patchData as any, { preserveScroll: true });
    };
    if (!auth?.user) return null;
    const formatDeadline = (date?: string) => (date ? new Date(date).toLocaleString(undefined, { dateStyle: 'medium', timeStyle: 'short' }) : '-');

    return (
        <ClientLayout user={auth.user}>
            <Head title={`Order #${order.id}`} />
            <div className="mx-auto max-w-5xl py-8">
                {/* Header & Tabs */}
                <div className="mb-6 flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
                    <div>
                        <div className="text-sm text-gray-500">Writer's choice</div>
                        <div className="text-2xl font-bold text-gray-900">#{order.id}</div>
                        <span className="inline-flex rounded-full bg-yellow-100 px-2 text-xs font-semibold text-yellow-800">Waiting for payment</span>
                        <div className="mt-2 rounded border-l-4 border-yellow-400 bg-yellow-50 p-3 text-sm text-yellow-800">
                            Your order is unpaid. Please check your email and follow the tips to complete the payment procedure.
                        </div>
                        <div className="mt-2 text-xs text-gray-500">Deadline: {formatDeadline(order.deadline)} (if you pay right now)</div>
                    </div>
                    <div className="mt-4 flex flex-wrap gap-2 md:mt-0">
                        <Link
                            href={`/client/orders/${order.id}/pay`}
                            className="flex items-center gap-1 rounded bg-green-600 px-3 py-2 text-sm font-medium text-white hover:bg-green-700"
                        >
                            <CreditCard className="h-4 w-4" /> Pay Now
                        </Link>
                        <Link
                            href={`/client/orders/${order.id}/review-pay`}
                            className="flex items-center gap-1 rounded bg-blue-600 px-3 py-2 text-sm font-medium text-white hover:bg-blue-700"
                        >
                            Review & Pay
                        </Link>
                    </div>
                </div>
                <Tabs value={tab} onValueChange={setTab} className="w-full">
                    <TabsList className="mb-4">
                        <TabsTrigger value="info">
                            <Info className="mr-1 h-4 w-4" /> Info
                        </TabsTrigger>
                        <TabsTrigger value="messages">
                            <MessageSquare className="mr-1 h-4 w-4" /> Messages
                        </TabsTrigger>
                        <TabsTrigger value="files">
                            <File className="mr-1 h-4 w-4" /> Files
                        </TabsTrigger>
                    </TabsList>
                    <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                        {/* Info Tab */}
                        <TabsContent value="info" className="col-span-2">
                            <div className="rounded-lg border bg-white p-6 shadow-sm">
                                <h2 className="mb-4 text-lg font-semibold text-gray-800">Order Details</h2>
                                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                                    <div>
                                        <div className="mb-2 text-xs text-gray-500">Academic level</div>
                                        <div className="font-medium text-gray-900">{order?.academicLevel?.name ?? order?.academic_level ?? '-'}</div>
                                    </div>
                                    <div>
                                        <div className="mb-2 text-xs text-gray-500">Service type</div>
                                        <div className="font-medium text-gray-900">{order?.service_type ?? '-'}</div>
                                    </div>
                                    <div>
                                        <div className="mb-2 text-xs text-gray-500">Type of paper</div>
                                        <div className="font-medium text-gray-900">{order?.assignment_type ?? '-'}</div>
                                    </div>
                                    <div>
                                        <div className="mb-2 text-xs text-gray-500">Discipline</div>
                                        <div className="font-medium text-gray-900">{order?.subject ?? '-'}</div>
                                    </div>
                                    <div>
                                        <div className="mb-2 text-xs text-gray-500">Language</div>
                                        <div className="font-medium text-gray-900">{order?.language ?? '-'}</div>
                                    </div>
                                    <div>
                                        <div className="mb-2 text-xs text-gray-500">Topic</div>
                                        <div className="font-medium text-gray-900">{order?.title ?? "Writer's choice"}</div>
                                    </div>
                                    <div>
                                        <div className="mb-2 text-xs text-gray-500">Paper details</div>
                                        <div className="font-medium whitespace-pre-line text-gray-900">{order?.instructions ?? '-'}</div>
                                    </div>
                                    <div>
                                        <div className="mb-2 text-xs text-gray-500">Paper format</div>
                                        <div className="font-medium text-gray-900">{order?.citation_style?.toUpperCase() ?? '-'}</div>
                                    </div>
                                    <div>
                                        <div className="mb-2 text-xs text-gray-500">Line spacing</div>
                                        <div className="font-medium text-gray-900">{order?.line_spacing ?? '-'}</div>
                                    </div>
                                    <div>
                                        <div className="mb-2 text-xs text-gray-500">Size unit</div>
                                        <div className="font-medium text-gray-900">{order?.size_unit ?? '-'}</div>
                                    </div>
                                    <div>
                                        <div className="mb-2 text-xs text-gray-500">Pages</div>
                                        <div className="font-medium text-gray-900">
                                            {order?.pages ?? '-'} {order?.size_unit ?? 'pages'}
                                        </div>
                                    </div>
                                    <div>
                                        <div className="mb-2 text-xs text-gray-500">Words</div>
                                        <div className="font-medium text-gray-900">{order?.words ?? '-'}</div>
                                    </div>
                                    <div>
                                        <div className="mb-2 text-xs text-gray-500">First draft deadline</div>
                                        <div className="font-medium text-gray-900">{formatDeadline(order?.deadline)}</div>
                                    </div>
                                    <div>
                                        <div className="mb-2 text-xs text-gray-500">Number of sources</div>
                                        <div className="font-medium text-gray-900">{order?.source_count ?? '-'}</div>
                                    </div>
                                    <div>
                                        <div className="mb-2 text-xs text-gray-500">Client notes</div>
                                        <div className="font-medium whitespace-pre-line text-gray-900">{order?.client_notes ?? '-'}</div>
                                    </div>
                                    <div>
                                        <div className="mb-2 text-xs text-gray-500">Urgent?</div>
                                        <div className="font-medium text-gray-900">{order?.is_urgent ? 'Yes' : 'No'}</div>
                                    </div>
                                </div>
                                <div className="mt-8">
                                    <h2 className="mb-4 text-lg font-semibold text-gray-800">Price Breakdown</h2>
                                    <div className="flex flex-col gap-2">
                                        <div className="flex justify-between text-sm">
                                            <span className="text-gray-500">
                                                {order?.pages ?? 0} pages × ${order?.price_per_page?.toFixed(2) ?? '0.00'}
                                            </span>
                                            <span className="text-gray-900">${((order?.pages ?? 0) * (order?.price_per_page ?? 0)).toFixed(2)}</span>
                                        </div>
                                        {order.addons && order.addons.length > 0 && (
                                            <>
                                                <div className="border-t border-gray-200 pt-4">
                                                    <h3 className="text-sm font-medium text-gray-900">Add-ons</h3>
                                                    {order.addons.map((addon: Addon) => (
                                                        <div key={addon.id} className="mt-2 flex justify-between text-sm">
                                                            <span className="text-gray-500">{addon.name}</span>
                                                            <span className="text-gray-900">
                                                                {addon.is_free ? 'Free' : `$${addon.price?.toFixed(2)}`}
                                                            </span>
                                                        </div>
                                                    ))}
                                                </div>
                                            </>
                                        )}
                                        <div className="flex justify-between border-t pt-2 text-base font-semibold">
                                            <span>Grand total price</span>
                                            <span>${order?.total_price?.toFixed(2) ?? '0.00'}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </TabsContent>
                        {/* Messages Tab */}
                        <TabsContent value="messages" className="col-span-2">
                            <div className="rounded-lg border bg-white p-6 shadow-sm">
                                <h2 className="mb-4 text-lg font-semibold text-gray-800">Messages</h2>
                                <div className="space-y-4">
                                    {order.messages && order.messages.length > 0 ? (
                                        order.messages.map((message: OrderMessage) => (
                                            <div key={message.id} className="flex space-x-3">
                                                <div
                                                    className={`flex h-8 w-8 items-center justify-center rounded-full ${message.sender.role === 'client' ? 'bg-blue-100' : message.sender.role === 'admin' ? 'bg-purple-100' : 'bg-green-100'}`}
                                                >
                                                    <span className="text-sm font-medium">{message.sender.name.charAt(0).toUpperCase()}</span>
                                                </div>
                                                <div className="flex-1">
                                                    <div className="flex items-center justify-between">
                                                        <h3 className="text-sm font-medium text-gray-900">
                                                            {message.sender.name}{' '}
                                                            <span className="text-sm text-gray-500">
                                                                • {new Date(message.created_at).toLocaleString()}
                                                            </span>
                                                        </h3>
                                                    </div>
                                                    <p className="mt-1 text-sm whitespace-pre-wrap text-gray-700">{message.message}</p>
                                                    {message.attachments && message.attachments.length > 0 && (
                                                        <div className="mt-2">
                                                            <h4 className="text-xs font-medium text-gray-500">Attachments:</h4>
                                                            <div className="mt-1 flex items-center gap-2">
                                                                {message.attachments.map((attachment: { id: number; name: string; url: string }) => (
                                                                    <Button key={attachment.id} variant="outline" size="sm" asChild>
                                                                        <a href={attachment.url} download>
                                                                            {attachment.name}
                                                                        </a>
                                                                    </Button>
                                                                ))}
                                                            </div>
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        ))
                                    ) : (
                                        <div className="text-gray-500">No messages yet.</div>
                                    )}
                                </div>
                            </div>
                        </TabsContent>
                        {/* Files Tab */}
                        <TabsContent value="files" className="col-span-2">
                            <div className="rounded-lg border bg-white p-6 shadow-sm">
                                <h2 className="mb-4 text-lg font-semibold text-gray-800">Files</h2>
                                <div>
                                    {order.files && order.files.length > 0 ? (
                                        <ul className="divide-y divide-gray-200">
                                            {order.files.map((file: OrderFile) => (
                                                <li key={file.id} className="flex items-center justify-between py-3">
                                                    <div className="flex items-center">
                                                        <File className="h-5 w-5 text-gray-400" />
                                                        <div className="ml-3">
                                                            <p className="text-sm font-medium text-gray-900">{file.name}</p>
                                                            <p className="text-sm text-gray-500">
                                                                {(file.size / 1024 / 1024).toFixed(2)} MB •{' '}
                                                                {new Date(file.created_at).toLocaleDateString()}
                                                            </p>
                                                        </div>
                                                    </div>
                                                    <Button variant="outline" size="sm" asChild>
                                                        <a href={file.url} download>
                                                            Download
                                                        </a>
                                                    </Button>
                                                </li>
                                            ))}
                                        </ul>
                                    ) : (
                                        <div className="text-gray-500">No files attached to this order.</div>
                                    )}
                                </div>
                            </div>
                        </TabsContent>
                        {/* Add Services Sidebar (only in Info tab) */}
                        {tab === 'info' && (
                            <div className="col-span-1">
                                <div className="rounded-lg border bg-white p-6 shadow-sm">
                                    <h2 className="mb-4 text-lg font-semibold text-gray-800">Add services to your order</h2>
                                    <div className="grid grid-cols-1 gap-4">
                                        <ServiceCard
                                            icon={Plus}
                                            title="Additional pages"
                                            price={`$${getAddon('additional-pages')?.price?.toFixed(2) ?? '15.00'} per page`}
                                            onClick={() => setModal({ type: 'additional-pages' })}
                                        />
                                        <ServiceCard
                                            icon={FileBarChart2}
                                            title="Power Point slides"
                                            price={`$${getAddon('powerpoint-slides')?.price?.toFixed(2) ?? '7.50'} per slide`}
                                            onClick={() => setModal({ type: 'powerpoint-slides' })}
                                        />
                                        <ServiceCard
                                            icon={BarChart2}
                                            title="Charts"
                                            price={`$${getAddon('charts')?.price?.toFixed(2) ?? '7.50'} per chart`}
                                            onClick={() => setModal({ type: 'charts' })}
                                        />
                                        <ServiceCard
                                            icon={Timer}
                                            title="Shorten deadline"
                                            price="Custom"
                                            onClick={() => setModal({ type: 'shorten-deadline' })}
                                        />
                                        <ServiceCard
                                            icon={UserCog}
                                            title="Boost writer’s category"
                                            price="+25% Advanced, +30% EN"
                                            onClick={() => setModal({ type: 'boost-writer' })}
                                        />
                                    </div>
                                </div>
                                {/* Modals for each service */}
                                <ServiceModal
                                    open={modal?.type === 'additional-pages'}
                                    onClose={() => setModal(null)}
                                    icon={Plus}
                                    title="Add “Additional pages” service"
                                    description="Choose the number of additional pages needed to complete your order."
                                    unitLabel="pages"
                                    pricePerUnit={getAddon('additional-pages')?.price ?? 15}
                                    defaultQty={2}
                                    onConfirm={(qty) => addService('additional-pages', qty)}
                                />
                                <ServiceModal
                                    open={modal?.type === 'powerpoint-slides'}
                                    onClose={() => setModal(null)}
                                    icon={FileBarChart2}
                                    title="Add “Power Point slides” service"
                                    description="Choose the number of slides you need."
                                    unitLabel="slides"
                                    pricePerUnit={getAddon('powerpoint-slides')?.price ?? 7.5}
                                    defaultQty={1}
                                    onConfirm={(qty) => addService('powerpoint-slides', qty)}
                                />
                                <ServiceModal
                                    open={modal?.type === 'charts'}
                                    onClose={() => setModal(null)}
                                    icon={BarChart2}
                                    title="Add “Charts” service"
                                    description="Choose the number of charts you need."
                                    unitLabel="charts"
                                    pricePerUnit={getAddon('charts')?.price ?? 7.5}
                                    defaultQty={1}
                                    onConfirm={(qty) => addService('charts', qty)}
                                />
                                {/* You can add more modals for other services as needed */}
                            </div>
                        )}
                    </div>
                </Tabs>
            </div>
        </ClientLayout>
    );
}
