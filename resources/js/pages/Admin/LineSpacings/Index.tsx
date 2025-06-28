import { Head, router, useForm } from '@inertiajs/react';
import { useState } from 'react';

interface LineSpacing {
    id: number;
    name: string;
    label: string;
}

interface Props {
    lineSpacings: LineSpacing[];
    success?: string;
    error?: string;
}

export default function Index({ lineSpacings, success, error }: Props) {
    const [editingId, setEditingId] = useState<number | null>(null);
    const [adding, setAdding] = useState(false);
    const [confirmDelete, setConfirmDelete] = useState<number | null>(null);

    // Add form
    const addForm = useForm({ name: '', label: '' });
    // Edit form
    const editForm = useForm<{ name: string; label: string }>({ name: '', label: '' });

    const startEdit = (item: LineSpacing) => {
        setEditingId(item.id);
        editForm.setData({ name: item.name, label: item.label });
    };

    const handleEdit = (id: number) => {
        editForm.put(route('admin.line-spacings.update', id), {
            onSuccess: () => setEditingId(null),
        });
    };

    const handleAdd = () => {
        addForm.post(route('admin.line-spacings.store'), {
            onSuccess: () => {
                setAdding(false);
                addForm.reset();
            },
        });
    };

    const handleDelete = (id: number) => {
        router.delete(route('admin.line-spacings.destroy', id), {
            onSuccess: () => setConfirmDelete(null),
        });
    };

    return (
        <div className="mx-auto max-w-3xl py-8">
            <Head title="Line Spacing" />
            <div className="mb-6 flex items-center justify-between">
                <h1 className="text-2xl font-bold">Line Spacing</h1>
                <button onClick={() => setAdding(!adding)} className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700">
                    {adding ? 'Cancel' : 'Add New'}
                </button>
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
                        {adding && (
                            <tr className="bg-blue-50">
                                <td className="px-4 py-2">
                                    <input
                                        type="text"
                                        className="w-full rounded border-gray-300"
                                        placeholder="Name"
                                        value={addForm.data.name}
                                        onChange={(e) => addForm.setData('name', e.target.value)}
                                    />
                                    {addForm.errors.name && <div className="mt-1 text-xs text-red-600">{addForm.errors.name}</div>}
                                </td>
                                <td className="px-4 py-2">
                                    <input
                                        type="text"
                                        className="w-full rounded border-gray-300"
                                        placeholder="Label"
                                        value={addForm.data.label}
                                        onChange={(e) => addForm.setData('label', e.target.value)}
                                    />
                                    {addForm.errors.label && <div className="mt-1 text-xs text-red-600">{addForm.errors.label}</div>}
                                </td>
                                <td className="flex gap-2 px-4 py-2">
                                    <button
                                        onClick={handleAdd}
                                        disabled={addForm.processing}
                                        className="rounded bg-green-600 px-3 py-1 text-white hover:bg-green-700 disabled:opacity-50"
                                    >
                                        Save
                                    </button>
                                    <button
                                        onClick={() => {
                                            setAdding(false);
                                            addForm.reset();
                                        }}
                                        className="text-gray-500 hover:underline"
                                    >
                                        Cancel
                                    </button>
                                </td>
                            </tr>
                        )}
                        {lineSpacings.map((item) => (
                            <tr key={item.id} className={editingId === item.id ? 'bg-yellow-50' : ''}>
                                {editingId === item.id ? (
                                    <>
                                        <td className="px-4 py-2">
                                            <input
                                                type="text"
                                                className="w-full rounded border-gray-300"
                                                value={editForm.data.name}
                                                onChange={(e) => editForm.setData('name', e.target.value)}
                                            />
                                            {editForm.errors.name && <div className="mt-1 text-xs text-red-600">{editForm.errors.name}</div>}
                                        </td>
                                        <td className="px-4 py-2">
                                            <input
                                                type="text"
                                                className="w-full rounded border-gray-300"
                                                value={editForm.data.label}
                                                onChange={(e) => editForm.setData('label', e.target.value)}
                                            />
                                            {editForm.errors.label && <div className="mt-1 text-xs text-red-600">{editForm.errors.label}</div>}
                                        </td>
                                        <td className="flex gap-2 px-4 py-2">
                                            <button
                                                onClick={() => handleEdit(item.id)}
                                                disabled={editForm.processing}
                                                className="rounded bg-blue-600 px-3 py-1 text-white hover:bg-blue-700 disabled:opacity-50"
                                            >
                                                Update
                                            </button>
                                            <button onClick={() => setEditingId(null)} className="text-gray-500 hover:underline">
                                                Cancel
                                            </button>
                                        </td>
                                    </>
                                ) : (
                                    <>
                                        <td className="px-4 py-2 font-mono">{item.name}</td>
                                        <td className="px-4 py-2">{item.label}</td>
                                        <td className="flex gap-2 px-4 py-2">
                                            <button onClick={() => startEdit(item)} className="text-blue-600 hover:underline">
                                                Edit
                                            </button>
                                            <button onClick={() => setConfirmDelete(item.id)} className="text-red-600 hover:underline">
                                                Delete
                                            </button>
                                            {confirmDelete === item.id && (
                                                <span className="ml-2">
                                                    <button
                                                        onClick={() => handleDelete(item.id)}
                                                        className="mr-1 rounded bg-red-600 px-2 py-1 text-xs text-white"
                                                    >
                                                        Confirm
                                                    </button>
                                                    <button onClick={() => setConfirmDelete(null)} className="text-xs text-gray-500 hover:underline">
                                                        Cancel
                                                    </button>
                                                </span>
                                            )}
                                        </td>
                                    </>
                                )}
                            </tr>
                        ))}
                        {lineSpacings.length === 0 && !adding && (
                            <tr>
                                <td colSpan={3} className="py-4 text-center text-gray-400">
                                    No line spacings found.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
