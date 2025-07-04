import AppLayout from '@/layouts/app-layout';
import { Head, Link, useForm } from '@inertiajs/react';
import { useState } from 'react';

interface PricingConfig {
    id: number;
    base_price_per_page: number;
    multipliers: Record<string, any>;
}

interface Props {
    pricingConfig: PricingConfig;
}

export default function Edit({ pricingConfig }: Props) {
    const { data, setData, patch, processing, errors } = useForm<{
        base_price_per_page: string;
        multipliers: string;
    }>({
        base_price_per_page: pricingConfig.base_price_per_page.toString(),
        multipliers: JSON.stringify(pricingConfig.multipliers, null, 2),
    });
    const [jsonError, setJsonError] = useState<string | null>(null);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setJsonError(null);
        try {
            const parsed = JSON.parse(data.multipliers);
            patch(route('admin.pricing-configs.update', pricingConfig.id), {
                data: {
                    base_price_per_page: data.base_price_per_page,
                    multipliers: parsed,
                },
            });
        } catch (err) {
            setJsonError('Multipliers must be valid JSON.');
        }
    };

    return (
        <AppLayout>
            <div className="mx-auto max-w-lg py-8">
                <Head title="Edit Pricing Config" />
                <h1 className="mb-6 text-2xl font-bold">Edit Pricing Config</h1>
                <form onSubmit={handleSubmit} className="space-y-6 rounded bg-white p-6 shadow">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Base Price Per Page</label>
                        <input
                            type="number"
                            step="0.01"
                            className="mt-1 block w-full rounded border-gray-300 shadow-sm"
                            value={data.base_price_per_page}
                            onChange={(e) => setData('base_price_per_page', e.target.value)}
                        />
                        {errors.base_price_per_page && <div className="mt-1 text-sm text-red-600">{errors.base_price_per_page}</div>}
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Multipliers (JSON)</label>
                        <textarea
                            className="mt-1 block w-full rounded border-gray-300 font-mono shadow-sm"
                            rows={8}
                            value={data.multipliers}
                            onChange={(e) => setData('multipliers', e.target.value)}
                        />
                        {jsonError && <div className="mt-1 text-sm text-red-600">{jsonError}</div>}
                        {errors.multipliers && <div className="mt-1 text-sm text-red-600">{errors.multipliers}</div>}
                    </div>
                    <div className="flex gap-2">
                        <button
                            type="submit"
                            disabled={processing}
                            className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 disabled:opacity-50"
                        >
                            Update
                        </button>
                        <Link
                            href={route('admin.pricing-configs.index')}
                            className="rounded border border-gray-300 px-4 py-2 text-gray-700 hover:bg-gray-100"
                        >
                            Back
                        </Link>
                    </div>
                </form>
            </div>
        </AppLayout>
    );
}
