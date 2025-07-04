import AppLayout from '@/layouts/app-layout';
import { Head, Link, router } from '@inertiajs/react';

interface PricingConfig {
    id: number;
    base_price_per_page: number;
    multipliers: Record<string, any>;
    created_at: string;
    updated_at: string;
}

interface Props {
    configs: PricingConfig[];
    success?: string;
    error?: string;
}

export default function Index({ configs, success, error }: Props) {
    const handleDelete = (id: number) => {
        if (confirm('Are you sure you want to delete this pricing config?')) {
            router.delete(route('admin.pricing-configs.destroy', id));
        }
    };

    return (
        <AppLayout>
            <div className="mx-auto max-w-3xl py-8">
                <Head title="Pricing Configs" />
                <div className="mb-6 flex items-center justify-between">
                    <h1 className="text-2xl font-bold">Pricing Configs</h1>
                    <Link href={route('admin.pricing-configs.create')} className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700">
                        Add New
                    </Link>
                </div>
                {success && <div className="mb-4 rounded bg-green-100 p-2 text-green-700">{success}</div>}
                {error && <div className="mb-4 rounded bg-red-100 p-2 text-red-700">{error}</div>}
                <div className="overflow-x-auto rounded bg-white shadow">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead>
                            <tr>
                                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Base Price/Page</th>
                                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Multipliers</th>
                                <th className="px-4 py-2"></th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100 bg-white">
                            {configs.map((config) => (
                                <tr key={config.id}>
                                    <td className="px-4 py-2 font-mono">{config.base_price_per_page}</td>
                                    <td className="px-4 py-2 text-xs">
                                        <pre className="break-all whitespace-pre-wrap">{JSON.stringify(config.multipliers, null, 2)}</pre>
                                    </td>
                                    <td className="flex gap-2 px-4 py-2">
                                        <Link href={route('admin.pricing-configs.edit', config.id)} className="text-blue-600 hover:underline">
                                            Edit
                                        </Link>
                                        <button onClick={() => handleDelete(config.id)} className="text-red-600 hover:underline">
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                            {configs.length === 0 && (
                                <tr>
                                    <td colSpan={3} className="py-4 text-center text-gray-400">
                                        No pricing configs found.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </AppLayout>
    );
}
