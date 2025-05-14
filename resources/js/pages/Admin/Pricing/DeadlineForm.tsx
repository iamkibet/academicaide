import { Button } from '@/Components/ui/button';
import { Card } from '@/Components/ui/card';
import { Input } from '@/Components/ui/input';
import { Label } from '@/Components/ui/label';
import AdminLayout from '@/Layouts/AdminLayout';
import { Head, useForm } from '@inertiajs/react';

interface Props {
    deadlineOption?: {
        id?: number;
        name: string;
        hours: number;
        multiplier: number;
    };
}

export default function DeadlineForm({ deadlineOption }: Props) {
    const { data, setData, post, put, processing, errors } = useForm({
        name: deadlineOption?.name || '',
        hours: deadlineOption?.hours || 24,
        multiplier: deadlineOption?.multiplier || 1,
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (deadlineOption?.id) {
            put(`/admin/pricing/deadlines/${deadlineOption.id}`, data);
        } else {
            post('/admin/pricing/deadlines', data);
        }
    };

    return (
        <AdminLayout>
            <Head title={deadlineOption ? 'Edit Deadline Option' : 'Add Deadline Option'} />

            <div className="space-y-6">
                <div>
                    <h1 className="text-2xl font-semibold text-gray-900">{deadlineOption ? 'Edit Deadline Option' : 'Add Deadline Option'}</h1>
                    <p className="mt-1 text-sm text-gray-500">
                        {deadlineOption ? 'Update the deadline option details' : 'Create a new deadline option for pricing'}
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
                                <Label htmlFor="hours">Hours</Label>
                                <Input
                                    id="hours"
                                    type="number"
                                    min="1"
                                    value={data.hours}
                                    onChange={(e) => setData('hours', parseInt(e.target.value))}
                                    className="mt-1"
                                    required
                                />
                                {errors.hours && <p className="mt-1 text-sm text-red-600">{errors.hours}</p>}
                                <p className="mt-1 text-sm text-gray-500">Number of hours until the deadline</p>
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
                                {deadlineOption ? 'Update Deadline' : 'Create Deadline'}
                            </Button>
                        </div>
                    </form>
                </Card>
            </div>
        </AdminLayout>
    );
}
