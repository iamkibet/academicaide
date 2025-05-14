import { Button } from '@/Components/ui/button';
import { Card } from '@/Components/ui/card';
import { Input } from '@/Components/ui/input';
import { Label } from '@/Components/ui/label';
import AdminLayout from '@/Layouts/AdminLayout';
import { PageProps } from '@/types';
import { Head, useForm } from '@inertiajs/react';

interface BasePricing {
    id: number;
    price_per_page: number;
    single_spacing_multiplier: number;
    double_spacing_multiplier: number;
    is_active: boolean;
}

interface Props extends PageProps {
    basePricing: BasePricing;
}

export default function BasePricingForm({ auth, basePricing }: Props) {
    const { data, setData, patch, processing, errors } = useForm({
        price_per_page: basePricing.price_per_page,
        single_spacing_multiplier: basePricing.single_spacing_multiplier,
        double_spacing_multiplier: basePricing.double_spacing_multiplier,
        is_active: basePricing.is_active,
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        patch(route('admin.pricing.base.update', basePricing.id));
    };

    return (
        <AdminLayout user={auth.user}>
            <Head title="Edit Base Pricing" />

            <div className="space-y-6">
                <div>
                    <h1 className="text-2xl font-semibold text-gray-900">Edit Base Pricing</h1>
                    <p className="mt-1 text-sm text-gray-500">Configure the base price per page and spacing multipliers</p>
                </div>

                <Card>
                    <form onSubmit={handleSubmit} className="space-y-6 p-6">
                        <div className="space-y-4">
                            <div>
                                <Label htmlFor="price_per_page">Base Price Per Page ($)</Label>
                                <Input
                                    id="price_per_page"
                                    type="number"
                                    step="0.01"
                                    min="0"
                                    value={data.price_per_page}
                                    onChange={(e) => setData('price_per_page', parseFloat(e.target.value))}
                                    className="mt-1"
                                    required
                                />
                                {errors.price_per_page && <p className="mt-1 text-sm text-red-600">{errors.price_per_page}</p>}
                            </div>

                            <div>
                                <Label htmlFor="single_spacing_multiplier">Single Spacing Multiplier</Label>
                                <Input
                                    id="single_spacing_multiplier"
                                    type="number"
                                    step="0.01"
                                    min="0"
                                    value={data.single_spacing_multiplier}
                                    onChange={(e) => setData('single_spacing_multiplier', parseFloat(e.target.value))}
                                    className="mt-1"
                                    required
                                />
                                {errors.single_spacing_multiplier && <p className="mt-1 text-sm text-red-600">{errors.single_spacing_multiplier}</p>}
                                <p className="mt-1 text-sm text-gray-500">The base price will be multiplied by this value for single spacing</p>
                            </div>

                            <div>
                                <Label htmlFor="double_spacing_multiplier">Double Spacing Multiplier</Label>
                                <Input
                                    id="double_spacing_multiplier"
                                    type="number"
                                    step="0.01"
                                    min="0"
                                    value={data.double_spacing_multiplier}
                                    onChange={(e) => setData('double_spacing_multiplier', parseFloat(e.target.value))}
                                    className="mt-1"
                                    required
                                />
                                {errors.double_spacing_multiplier && <p className="mt-1 text-sm text-red-600">{errors.double_spacing_multiplier}</p>}
                                <p className="mt-1 text-sm text-gray-500">The base price will be multiplied by this value for double spacing</p>
                            </div>

                            <div className="flex items-center space-x-2">
                                <input
                                    type="checkbox"
                                    id="is_active"
                                    checked={data.is_active}
                                    onChange={(e) => setData('is_active', e.target.checked)}
                                    className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                                />
                                <Label htmlFor="is_active">Active</Label>
                            </div>
                        </div>

                        <div className="flex justify-end space-x-4">
                            <Button type="button" variant="outline" onClick={() => window.history.back()}>
                                Cancel
                            </Button>
                            <Button type="submit" disabled={processing}>
                                Save Changes
                            </Button>
                        </div>
                    </form>
                </Card>
            </div>
        </AdminLayout>
    );
}
