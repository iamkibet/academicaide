import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import AppLayout from '@/layouts/app-layout';
import { Head, useForm } from '@inertiajs/react';

interface Order {
    id: number;
    client: {
        name: string;
        email: string;
    };
    assignment_type: string;
    academic_level: string | Record<string, unknown>;
    pages: number;
    deadline: string;
    status: string;
    total_price: number | string;
    created_at: string;
    instructions: string;
    subject: string;
    topic?: string;
    format?: string;
    references?: number;
    selectedAddons?: {
        id: number;
        name: string;
        price: number;
    }[];
    files?: {
        id: number;
        name: string;
        path: string;
        type: string;
    }[];
    messages: {
        id: number;
        user: {
            name: string;
            role: string;
        };
        message: string;
        created_at: string;
    }[];
}

interface Props {
    order: Order;
}

const statusColors = {
    pending: 'bg-yellow-100 text-yellow-800',
    active: 'bg-blue-100 text-blue-800',
    completed: 'bg-green-100 text-green-800',
    cancelled: 'bg-red-100 text-red-800',
};

export default function OrderShow({ order }: Props) {
    const statusOptions = [
        { value: 'draft', label: 'Draft' },
        { value: 'active', label: 'Active' },
        { value: 'completed', label: 'Completed' },
        { value: 'cancelled', label: 'Cancelled' },
        { value: 'pending', label: 'Pending' },
        { value: 'revision', label: 'Revision' },
    ];
    const { data, setData, processing, patch } = useForm({
        status: order.status,
    });
    const handleStatusUpdate = (e: React.FormEvent) => {
        e.preventDefault();
        patch(`/admin/orders/${order.id}/status`, {
            preserveScroll: true,
            onSuccess: () => {},
        });
    };

    return (
        <AppLayout>
            <Head title={`Order #${order.id}`} />

            <div className="space-y-6">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-semibold text-gray-900">Order #{order.id}</h1>
                        <p className="mt-1 text-sm text-gray-500">Created on {new Date(order.created_at).toLocaleDateString()}</p>
                    </div>
                    <div className="flex space-x-4">
                        <Button variant="outline">Download Files</Button>
                        <form onSubmit={handleStatusUpdate} className="flex items-center gap-2">
                            <select
                                className="rounded border-gray-300 px-2 py-1 text-sm"
                                value={data.status}
                                onChange={(e) => setData('status', e.target.value)}
                                disabled={processing}
                            >
                                {statusOptions.map((opt) => (
                                    <option key={opt.value} value={opt.value}>
                                        {opt.label}
                                    </option>
                                ))}
                            </select>
                            <Button type="submit" disabled={processing || data.status === order.status}>
                                {processing ? 'Updating...' : 'Update Status'}
                            </Button>
                        </form>
                    </div>
                </div>

                {/* Main Content */}
                <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
                    {/* Order Details */}
                    <div className="space-y-6 lg:col-span-2">
                        <Card className="p-6">
                            <h2 className="text-lg font-medium text-gray-900">Order Details</h2>
                            <div className="mt-4 grid grid-cols-2 gap-4">
                                <div>
                                    <p className="text-sm font-medium text-gray-500">Status</p>
                                    <Badge className={statusColors[order.status as keyof typeof statusColors]}>{order.status}</Badge>
                                </div>
                                <div>
                                    <p className="text-sm font-medium text-gray-500">Total Price</p>
                                    <p className="text-lg font-semibold">${Number(order.total_price).toFixed(2)}</p>
                                </div>
                                <div>
                                    <p className="text-sm font-medium text-gray-500">Assignment Type</p>
                                    <p>{order.assignment_type}</p>
                                </div>
                                <div>
                                    <p className="text-sm font-medium text-gray-500">Academic Level</p>
                                    <p>
                                        {typeof order.academic_level === 'object' && order.academic_level !== null
                                            ? String(
                                                  (order.academic_level as Record<string, unknown>).name ||
                                                      (order.academic_level as Record<string, unknown>).label ||
                                                      (order.academic_level as Record<string, unknown>).slug ||
                                                      '',
                                              )
                                            : String(order.academic_level)}
                                    </p>
                                </div>
                                <div>
                                    <p className="text-sm font-medium text-gray-500">Pages</p>
                                    <p>{order.pages}</p>
                                </div>
                                <div>
                                    <p className="text-sm font-medium text-gray-500">Deadline</p>
                                    <p>{new Date(order.deadline).toLocaleDateString()}</p>
                                </div>
                                <div>
                                    <p className="text-sm font-medium text-gray-500">Subject</p>
                                    <p>{order.subject}</p>
                                </div>
                                {order.topic && (
                                    <div>
                                        <p className="text-sm font-medium text-gray-500">Topic</p>
                                        <p>{order.topic}</p>
                                    </div>
                                )}
                                {order.format && (
                                    <div>
                                        <p className="text-sm font-medium text-gray-500">Format</p>
                                        <p>{order.format}</p>
                                    </div>
                                )}
                                {order.references !== undefined && (
                                    <div>
                                        <p className="text-sm font-medium text-gray-500">References</p>
                                        <p>{order.references}</p>
                                    </div>
                                )}
                            </div>
                        </Card>

                        <Card className="p-6">
                            <h2 className="text-lg font-medium text-gray-900">Instructions</h2>
                            <p className="mt-4 whitespace-pre-wrap text-gray-600">{order.instructions}</p>
                        </Card>

                        {order.files && (
                            <Card className="p-6">
                                <h2 className="text-lg font-medium text-gray-900">Attachments</h2>
                                <div className="mt-4 space-y-2">
                                    {order.files.map((file) => (
                                        <div key={file.id} className="flex items-center justify-between rounded-lg border p-4">
                                            <div className="flex items-center space-x-4">
                                                <div className="text-blue-600">
                                                    {/* File icon based on type */}
                                                    {file.type === 'pdf' ? '📄' : '📎'}
                                                </div>
                                                <div>
                                                    <p className="font-medium">{file.name}</p>
                                                    <p className="text-sm text-gray-500">{file.type?.toUpperCase()}</p>
                                                </div>
                                            </div>
                                            <a href={file.path} download className="text-blue-600 hover:text-blue-900">
                                                Download
                                            </a>
                                        </div>
                                    ))}
                                </div>
                            </Card>
                        )}
                    </div>

                    {/* Sidebar */}
                    <div className="space-y-6">
                        <Card className="p-6">
                            <h2 className="text-lg font-medium text-gray-900">Client Information</h2>
                            <div className="mt-4 space-y-4">
                                <div>
                                    <p className="text-sm font-medium text-gray-500">Name</p>
                                    <p>{order.client?.name}</p>
                                </div>
                                <div>
                                    <p className="text-sm font-medium text-gray-500">Email</p>
                                    <p>{order.client?.email}</p>
                                </div>
                                <Button variant="outline" className="w-full">
                                    Contact Client
                                </Button>
                            </div>
                        </Card>

                        {order.selectedAddons && (
                            <Card className="p-6">
                                <h2 className="text-lg font-medium text-gray-900">Add-ons</h2>
                                <div className="mt-4 space-y-2">
                                    {order.selectedAddons.map((addon) => (
                                        <div key={addon.id} className="flex items-center justify-between rounded-lg border p-3">
                                            <span>{addon.name}</span>
                                            <span className="font-medium">${Number(addon.price).toFixed(2)}</span>
                                        </div>
                                    ))}
                                </div>
                            </Card>
                        )}
                    </div>
                </div>

                {/* Messages */}
                <Card className="p-6">
                    <Tabs defaultValue="messages">
                        <TabsList>
                            <TabsTrigger value="messages">Messages</TabsTrigger>
                            <TabsTrigger value="history">Order History</TabsTrigger>
                        </TabsList>
                        <TabsContent value="messages" className="mt-4">
                            <div className="space-y-4">
                                {order.messages.map((message) => (
                                    <div key={message.id} className={`rounded-lg p-4 ${message.user.role === 'admin' ? 'bg-blue-50' : 'bg-gray-50'}`}>
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center space-x-2">
                                                <span className="font-medium">{message.user.name}</span>
                                                <Badge variant="outline">{message.user.role}</Badge>
                                            </div>
                                            <span className="text-sm text-gray-500">{new Date(message.created_at).toLocaleString()}</span>
                                        </div>
                                        <p className="mt-2 text-gray-600">{message.message}</p>
                                    </div>
                                ))}
                            </div>
                            <div className="mt-4">
                                <textarea className="w-full rounded-lg border p-3" rows={3} placeholder="Type your message..." />
                                <Button className="mt-2">Send Message</Button>
                            </div>
                        </TabsContent>
                        <TabsContent value="history" className="mt-4">
                            {/* Order history timeline will go here */}
                            <p className="text-gray-500">Order history timeline coming soon...</p>
                        </TabsContent>
                    </Tabs>
                </Card>
            </div>
        </AppLayout>
    );
}
