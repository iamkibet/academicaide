import AppLayout from '@/layouts/app-layout';
import { Head, Link, useForm } from '@inertiajs/react';

export default function Create() {
    const { data, setData, post, processing, errors } = useForm<{
        name: string;
        label: string;
        description: string;
        is_active: boolean;
        display_order: number;
    }>({
        name: '',
        label: '',
        description: '',
        is_active: true,
        display_order: 0,
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route('admin.writing-styles.store'));
    };

    return (
        <AppLayout>
            <div className="mx-auto max-w-lg py-8">
                <Head title="Add Writing Style" />
                <h1 className="mb-6 text-2xl font-bold">Add Writing Style</h1>
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
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Description</label>
                        <textarea
                            className="mt-1 block w-full rounded border-gray-300 shadow-sm"
                            value={data.description}
                            onChange={(e) => setData('description', e.target.value)}
                        />
                        {errors.description && <div className="mt-1 text-sm text-red-600">{errors.description}</div>}
                    </div>
                    <div className="flex items-center">
                        <input
                            id="is_active"
                            type="checkbox"
                            checked={data.is_active}
                            onChange={(e) => setData('is_active', Boolean(e.target.checked))}
                            className="h-4 w-4 rounded border-gray-300 text-blue-600"
                        />
                        <label htmlFor="is_active" className="ml-2 block text-sm text-gray-700">
                            Active
                        </label>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Display Order</label>
                        <input
                            type="number"
                            className="mt-1 block w-full rounded border-gray-300 shadow-sm"
                            value={data.display_order}
                            onChange={(e) => setData('display_order', Number(e.target.value))}
                        />
                        {errors.display_order && <div className="mt-1 text-sm text-red-600">{errors.display_order}</div>}
                    </div>
                    <div className="flex gap-2">
                        <button
                            type="submit"
                            disabled={processing}
                            className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 disabled:opacity-50"
                        >
                            Save
                        </button>
                        <Link
                            href={route('admin.writing-styles.index')}
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
