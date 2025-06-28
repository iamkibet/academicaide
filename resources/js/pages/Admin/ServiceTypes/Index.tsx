import { Head, Link, router } from '@inertiajs/react';

interface ServiceType {
    id: number;
    name: string;
    label: string;
}

interface Props {
    serviceTypes: ServiceType[];
    success?: string;
    error?: string;
}

export default function Index({ serviceTypes, success, error }: Props) {
    const handleDelete = (id: number) => {
        if (confirm('Are you sure you want to delete this service type?')) {
            router.delete(route('admin.service-types.destroy', id));
        }
    };

    return (
        <div className="mx-auto max-w-3xl py-8">
            <Head title="Service Types" />
            <div className="mb-6 flex items-center justify-between">
                <h1 className="text-2xl font-bold">Service Types</h1>
                <Link href={route('admin.service-types.create')} className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700">
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
                            <th className="px-4 py-2"></th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100 bg-white">
                        {serviceTypes.map((type) => (
                            <tr key={type.id}>
                                <td className="px-4 py-2 font-mono">{type.name}</td>
                                <td className="px-4 py-2">{type.label}</td>
                                <td className="flex gap-2 px-4 py-2">
                                    <Link href={route('admin.service-types.edit', type.id)} className="text-blue-600 hover:underline">
                                        Edit
                                    </Link>
                                    <button onClick={() => handleDelete(type.id)} className="text-red-600 hover:underline">
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                        {serviceTypes.length === 0 && (
                            <tr>
                                <td colSpan={3} className="py-4 text-center text-gray-400">
                                    No service types found.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
