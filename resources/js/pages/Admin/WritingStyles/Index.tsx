import AppLayout from '@/layouts/app-layout';
import { Head, Link, router } from '@inertiajs/react';

interface WritingStyle {
    id: number;
    name: string;
    label: string;
    description?: string;
    is_active: boolean;
    display_order: number;
}

interface Props {
    writingStyles: WritingStyle[];
    success?: string;
    error?: string;
}

export default function Index({ writingStyles, success, error }: Props) {
    const handleDelete = (id: number) => {
        if (confirm('Are you sure you want to delete this writing style?')) {
            router.delete(route('admin.writing-styles.destroy', id));
        }
    };

    return (
        <AppLayout>
            <div className="mx-auto max-w-3xl py-8">
                <Head title="Writing Styles" />
                <div className="mb-6 flex items-center justify-between">
                    <h1 className="text-2xl font-bold">Writing Styles</h1>
                    <Link href={route('admin.writing-styles.create')} className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700">
                        Add New
                    </Link>
                </div>
                {success && <div className="mb-4 rounded bg-green-100 p-2 text-green-700">{success}</div>}
                {error && <div className="mb-4 rounded bg-red-100 p-2 text-red-700">{error}</div>}
                <div className="overflow-x-auto rounded bg-white shadow">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead>
                            <tr>
                                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
                                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Label</th>
                                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Active</th>
                                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Order</th>
                                <th className="px-4 py-2"></th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100 bg-white">
                            {writingStyles.map((style) => (
                                <tr key={style.id}>
                                    <td className="px-4 py-2 font-mono">{style.name}</td>
                                    <td className="px-4 py-2">{style.label}</td>
                                    <td className="px-4 py-2">{style.is_active ? 'Yes' : 'No'}</td>
                                    <td className="px-4 py-2">{style.display_order}</td>
                                    <td className="flex gap-2 px-4 py-2">
                                        <Link href={route('admin.writing-styles.edit', style.id)} className="text-blue-600 hover:underline">
                                            Edit
                                        </Link>
                                        <button onClick={() => handleDelete(style.id)} className="text-red-600 hover:underline">
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                            {writingStyles.length === 0 && (
                                <tr>
                                    <td colSpan={5} className="py-4 text-center text-gray-400">
                                        No writing styles found.
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
