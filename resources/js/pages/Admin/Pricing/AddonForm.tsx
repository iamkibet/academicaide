import { Button } from '@/Components/ui/button';
import { Card } from '@/Components/ui/card';
import { Input } from '@/Components/ui/input';
import { Label } from '@/Components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/Components/ui/select';
import { Textarea } from '@/Components/ui/textarea';
import AdminLayout from '@/Layouts/AdminLayout';
import { Head, useForm } from '@inertiajs/react';

interface Props {
    addon?: {
        id?: number;
        name: string;
        description: string;
        price: number;
        type: 'fixed' | 'percentage';
    };
}

export default function AddonForm({ addon }: Props) {
    const { data, setData, post, put, processing, errors } = useForm({
        name: addon?.name || '',
        description: addon?.description || '',
        price: addon?.price || 0,
        type: addon?.type || 'fixed',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (addon?.id) {
            put(`/admin/pricing/addons/${addon.id}`, data);
        } else {
            post('/admin/pricing/addons', data);
        }
    };

    return (
        <AdminLayout>
            <Head title={addon ? 'Edit Add-on' : 'Add Add-on'} />

            <div className="space-y-6">
                <div>
                    <h1 className="text-2xl font-semibold text-gray-900">{addon ? 'Edit Add-on' : 'Add Add-on'}</h1>
                    <p className="mt-1 text-sm text-gray-500">{addon ? 'Update the add-on details' : 'Create a new add-on for pricing'}</p>
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
                                <Label htmlFor="type">Price Type</Label>
                                <Select value={data.type} onValueChange={(value) => setData('type', value as 'fixed' | 'percentage')}>
                                    <SelectTrigger className="mt-1">
                                        <SelectValue placeholder="Select price type" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="fixed">Fixed Amount</SelectItem>
                                        <SelectItem value="percentage">Percentage</SelectItem>
                                    </SelectContent>
                                </Select>
                                {errors.type && <p className="mt-1 text-sm text-red-600">{errors.type}</p>}
                            </div>

                            <div>
                                <Label htmlFor="price">{data.type === 'fixed' ? 'Price Amount' : 'Percentage'}</Label>
                                <Input
                                    id="price"
                                    type="number"
                                    step={data.type === 'fixed' ? '0.01' : '1'}
                                    min="0"
                                    value={data.price}
                                    onChange={(e) => setData('price', parseFloat(e.target.value))}
                                    className="mt-1"
                                    required
                                />
                                {errors.price && <p className="mt-1 text-sm text-red-600">{errors.price}</p>}
                                <p className="mt-1 text-sm text-gray-500">
                                    {data.type === 'fixed' ? 'Fixed amount to add to the total price' : 'Percentage to add to the total price'}
                                </p>
                            </div>
                        </div>

                        <div className="flex justify-end space-x-4">
                            <Button type="button" variant="outline" onClick={() => window.history.back()}>
                                Cancel
                            </Button>
                            <Button type="submit" disabled={processing}>
                                {addon ? 'Update Add-on' : 'Create Add-on'}
                            </Button>
                        </div>
                    </form>
                </Card>
            </div>
        </AdminLayout>
    );
}
