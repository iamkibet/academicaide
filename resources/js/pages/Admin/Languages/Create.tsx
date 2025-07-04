import AppLayout from '@/layouts/app-layout';
import { Head, Link, useForm } from '@inertiajs/react';

export default function Create() {
    const { data, setData, post, processing, errors } = useForm<{
        name: string;
        code: string;
        flag: string;
    }>({
        name: '',
        code: '',
        flag: '',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route('admin.languages.store'));
    };

    return (
        <AppLayout>
            <div className="mx-auto max-w-lg py-8">
                <Head title="Add Language" />
                <h1 className="mb-6 text-2xl font-bold">Add Language</h1>
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
                        <label className="block text-sm font-medium text-gray-700">Code</label>
                        <input
                            type="text"
                            className="mt-1 block w-full rounded border-gray-300 shadow-sm"
                            value={data.code}
                            onChange={(e) => setData('code', e.target.value)}
                        />
                        {errors.code && <div className="mt-1 text-sm text-red-600">{errors.code}</div>}
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Flag (Emoji)</label>
                        <input
                            type="text"
                            className="mt-1 block w-full rounded border-gray-300 shadow-sm"
                            value={data.flag}
                            onChange={(e) => setData('flag', e.target.value)}
                            placeholder="🇺🇸"
                        />
                        {errors.flag && <div className="mt-1 text-sm text-red-600">{errors.flag}</div>}
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
                            href={route('admin.languages.index')}
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
