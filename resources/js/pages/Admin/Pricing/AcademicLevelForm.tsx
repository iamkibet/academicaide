import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AdminLayout from '@/layouts/AdminLayout';
import { Textarea } from '@headlessui/react';
import { PageProps } from '@inertiajs/core';
import { Head, useForm, usePage } from '@inertiajs/react';

interface Auth {
    user: {
        id: number;
        name: string;
        email: string;
        role: 'admin' | 'client';
        created_at: string;
        updated_at: string;
    };
}

interface Props {
    academicLevel?: {
        id?: number;
        name: string;
        description: string;
        multiplier: number;
    };
}

type FormData = {
    [key: string]: string | number;
    name: string;
    description: string;
    multiplier: number;
};

export default function AcademicLevelForm({ academicLevel }: Props) {
    const { data, setData, post, put, processing, errors } = useForm<FormData>({
        name: academicLevel?.name || '',
        description: academicLevel?.description || '',
        multiplier: academicLevel?.multiplier || 1,
    });
    const { auth } = usePage<PageProps & { auth: Auth }>().props;

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (academicLevel?.id) {
            put(`/admin/pricing/academic-levels/${academicLevel.id}`, data);
        } else {
            post('/admin/pricing/academic-levels', data);
        }
    };

    return (
        <AdminLayout user={auth.user}>
            <Head title={academicLevel ? 'Edit Academic Level' : 'Add Academic Level'} />

            <div className="space-y-6">
                <div>
                    <h1 className="text-2xl font-semibold text-gray-900">{academicLevel ? 'Edit Academic Level' : 'Add Academic Level'}</h1>
                    <p className="mt-1 text-sm text-gray-500">
                        {academicLevel ? 'Update the academic level details' : 'Create a new academic level for pricing'}
                    </p>
                </div>

                <Card>
                    <form onSubmit={handleSubmit} className="space-y-6 p-6">
                        <div className="space-y-4">
                            <div>
                                <Label htmlFor="name">Name</Label>
                                <Input id="name" value={data.name} onChange={(e) => setData('name', e.target.value)} className="mt-1" required />
                                {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name}</p>}
                            </div>

                            <div>
                                <Label htmlFor="description">Description</Label>
                                <Textarea
                                    id="description"
                                    value={data.description}
                                    onChange={(e) => setData('description', e.target.value)}
                                    className="mt-1"
                                    rows={3}
                                    required
                                />
                                {errors.description && <p className="mt-1 text-sm text-red-600">{errors.description}</p>}
                            </div>

                            <div>
                                <Label htmlFor="multiplier">Price Multiplier</Label>
                                <Input
                                    id="multiplier"
                                    type="number"
                                    step="0.1"
                                    min="1"
                                    value={data.multiplier}
                                    onChange={(e) => setData('multiplier', parseFloat(e.target.value))}
                                    className="mt-1"
                                    required
                                />
                                {errors.multiplier && <p className="mt-1 text-sm text-red-600">{errors.multiplier}</p>}
                                <p className="mt-1 text-sm text-gray-500">The base price will be multiplied by this value</p>
                            </div>
                        </div>

                        <div className="flex justify-end space-x-4">
                            <Button type="button" variant="outline" onClick={() => window.history.back()}>
                                Cancel
                            </Button>
                            <Button type="submit" disabled={processing}>
                                {academicLevel ? 'Update Level' : 'Create Level'}
                            </Button>
                        </div>
                    </form>
                </Card>
            </div>
        </AdminLayout>
    );
}
