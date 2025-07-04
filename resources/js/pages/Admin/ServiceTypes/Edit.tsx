import AppLayout from '@/layouts/app-layout';
import { Head, Link, useForm } from '@inertiajs/react';

interface ServiceType {
    id: number;
    name: string;
    label: string;
}

interface Props {
    serviceType: ServiceType;
}

export default function Edit({ serviceType }: Props) {
    const { data, setData, put, processing, errors } = useForm({
        name: serviceType.name || '',
        label: serviceType.label || '',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        put(route('admin.service-types.update', serviceType.id));
    };

    return (
        <AppLayout>
            <div className="mx-auto max-w-lg py-8">
                <Head title="Edit Service Type" />
                <h1 className="mb-6 text-2xl font-bold">Edit Service Type</h1>
                <form onSubmit={handleSubmit} className="space-y-6 rounded bg-white p-6 shadow">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Name</label>
                        <input
                            type="text"
                            className="mt-1 block w-full rounded border-gray-300 shadow-sm"
                            value={data.name}
                            onChange={(e) => setData('name', e.target.value)}
                        />
                        {errors.name && <div className="mt-1 text-sm text-red-600">{errors.name}</div>}
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Label</label>
                        <input
                            type="text"
                            className="mt-1 block w-full rounded border-gray-300 shadow-sm"
                            value={data.label}
                            onChange={(e) => setData('label', e.target.value)}
                        />
                        {errors.label && <div className="mt-1 text-sm text-red-600">{errors.label}</div>}
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
                            href={route('admin.service-types.index')}
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
