import { Badge } from '@/Components/ui/badge';
import { Button } from '@/Components/ui/button';
import { Card } from '@/Components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/Components/ui/tabs';
import AdminLayout from '@/Layouts/AdminLayout';
import { User } from '@/types';
import { Head } from '@inertiajs/react';

interface Order {
    id: number;
    user: {
        name: string;
        email: string;
    };
    assignment_type: string;
    academic_level: string;
    pages: number;
    deadline: string;
    status: string;
    total_price: number;
    created_at: string;
    instructions: string;
    subject: string;
    topic: string;
    format: string;
    references: number;
    addons: {
        name: string;
        price: number;
    }[];
    attachments: {
        name: string;
        url: string;
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
    auth: { user: User };
    order: Order;
}

const statusColors = {
    pending: 'bg-yellow-100 text-yellow-800',
    active: 'bg-blue-100 text-blue-800',
    completed: 'bg-green-100 text-green-800',
    cancelled: 'bg-red-100 text-red-800',
};

export default function OrderShow({ auth, order }: Props) {
    return (
        <AdminLayout user={auth.user}>
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
                        <Button>Update Status</Button>
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
                                    <p className="text-lg font-semibold">${order.total_price.toFixed(2)}</p>
                                </div>
                                <div>
                                    <p className="text-sm font-medium text-gray-500">Assignment Type</p>
                                    <p>{order.assignment_type}</p>
                                </div>
                                <div>
                                    <p className="text-sm font-medium text-gray-500">Academic Level</p>
                                    <p>{order.academic_level}</p>
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
                                <div>
                                    <p className="text-sm font-medium text-gray-500">Topic</p>
                                    <p>{order.topic}</p>
                                </div>
                                <div>
                                    <p className="text-sm font-medium text-gray-500">Format</p>
                                    <p>{order.format}</p>
                                </div>
                                <div>
                                    <p className="text-sm font-medium text-gray-500">References</p>
                                    <p>{order.references}</p>
                                </div>
                            </div>
                        </Card>

                        <Card className="p-6">
                            <h2 className="text-lg font-medium text-gray-900">Instructions</h2>
                            <p className="mt-4 whitespace-pre-wrap text-gray-600">{order.instructions}</p>
                        </Card>

                        <Card className="p-6">
                            <h2 className="text-lg font-medium text-gray-900">Attachments</h2>
                            <div className="mt-4 space-y-2">
                                {order.attachments.map((attachment) => (
                                    <div key={attachment.name} className="flex items-center justify-between rounded-lg border p-4">
                                        <div className="flex items-center space-x-4">
                                            <div className="text-blue-600">
                                                {/* File icon based on type */}
                                                {attachment.type === 'pdf' ? '📄' : '📎'}
                                            </div>
                                            <div>
                                                <p className="font-medium">{attachment.name}</p>
                                                <p className="text-sm text-gray-500">{attachment.type.toUpperCase()}</p>
                                            </div>
                                        </div>
                                        <a href={attachment.url} download className="text-blue-600 hover:text-blue-900">
                                            Download
                                        </a>
                                    </div>
                                ))}
                            </div>
                        </Card>
                    </div>

                    {/* Sidebar */}
                    <div className="space-y-6">
                        <Card className="p-6">
                            <h2 className="text-lg font-medium text-gray-900">Client Information</h2>
                            <div className="mt-4 space-y-4">
                                <div>
                                    <p className="text-sm font-medium text-gray-500">Name</p>
                                    <p>{order.user.name}</p>
                                </div>
                                <div>
                                    <p className="text-sm font-medium text-gray-500">Email</p>
                                    <p>{order.user.email}</p>
                                </div>
                                <Button variant="outline" className="w-full">
                                    Contact Client
                                </Button>
                            </div>
                        </Card>

                        <Card className="p-6">
                            <h2 className="text-lg font-medium text-gray-900">Add-ons</h2>
                            <div className="mt-4 space-y-2">
                                {order.addons.map((addon) => (
                                    <div key={addon.name} className="flex items-center justify-between rounded-lg border p-3">
                                        <span>{addon.name}</span>
                                        <span className="font-medium">${addon.price.toFixed(2)}</span>
                                    </div>
                                ))}
                            </div>
                        </Card>
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
        </AdminLayout>
    );
}
