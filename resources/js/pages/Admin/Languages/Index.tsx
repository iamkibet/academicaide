import AppLayout from '@/layouts/app-layout';
import { Head, router, useForm } from '@inertiajs/react';
import { useState } from 'react';

interface Language {
    id: number;
    name: string;
    code: string;
    flag: string | null;
}

interface Props {
    languages: Language[];
    success?: string;
    error?: string;
}

export default function Index({ languages, success, error }: Props) {
    const [editingId, setEditingId] = useState<number | null>(null);
    const [adding, setAdding] = useState(false);
    const [confirmDelete, setConfirmDelete] = useState<number | null>(null);

    // Add form
    const addForm = useForm({ name: '', code: '', flag: '' });
    // Edit form
    const editForm = useForm<{ name: string; code: string; flag: string | null }>({ name: '', code: '', flag: '' });

    const startEdit = (lang: Language) => {
        setEditingId(lang.id);
        editForm.setData({ name: lang.name, code: lang.code, flag: lang.flag || '' });
    };

    const handleEdit = (id: number) => {
        editForm.put(route('admin.languages.update', id), {
            onSuccess: () => setEditingId(null),
        });
    };

    const handleAdd = () => {
        addForm.post(route('admin.languages.store'), {
            onSuccess: () => {
                setAdding(false);
                addForm.reset();
            },
        });
    };

    const handleDelete = (id: number) => {
        router.delete(route('admin.languages.destroy', id), {
            onSuccess: () => setConfirmDelete(null),
        });
    };

    return (
        <AppLayout>
            <div className="mx-auto max-w-3xl py-8">
                <Head title="Languages" />
                <div className="mb-6 flex items-center justify-between">
                    <h1 className="text-2xl font-bold">Languages</h1>
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
                                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Code</th>
                                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Flag</th>
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
                                            placeholder="Code"
                                            value={addForm.data.code}
                                            onChange={(e) => addForm.setData('code', e.target.value)}
                                        />
                                        {addForm.errors.code && <div className="mt-1 text-xs text-red-600">{addForm.errors.code}</div>}
                                    </td>
                                    <td className="px-4 py-2">
                                        <input
                                            type="text"
                                            className="w-full rounded border-gray-300"
                                            placeholder="Flag (emoji)"
                                            value={addForm.data.flag}
                                            onChange={(e) => addForm.setData('flag', e.target.value)}
                                        />
                                        {addForm.errors.flag && <div className="mt-1 text-xs text-red-600">{addForm.errors.flag}</div>}
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
                            {languages.map((lang) => (
                                <tr key={lang.id} className={editingId === lang.id ? 'bg-yellow-50' : ''}>
                                    {editingId === lang.id ? (
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
                                                    value={editForm.data.code}
                                                    onChange={(e) => editForm.setData('code', e.target.value)}
                                                />
                                                {editForm.errors.code && <div className="mt-1 text-xs text-red-600">{editForm.errors.code}</div>}
                                            </td>
                                            <td className="px-4 py-2">
                                                <input
                                                    type="text"
                                                    className="w-full rounded border-gray-300"
                                                    value={editForm.data.flag || ''}
                                                    onChange={(e) => editForm.setData('flag', e.target.value)}
                                                />
                                                {editForm.errors.flag && <div className="mt-1 text-xs text-red-600">{editForm.errors.flag}</div>}
                                            </td>
                                            <td className="flex gap-2 px-4 py-2">
                                                <button
                                                    onClick={() => handleEdit(lang.id)}
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
                                            <td className="px-4 py-2 font-mono">{lang.name}</td>
                                            <td className="px-4 py-2">{lang.code}</td>
                                            <td className="px-4 py-2 text-2xl">{lang.flag}</td>
                                            <td className="flex gap-2 px-4 py-2">
                                                <button onClick={() => startEdit(lang)} className="text-blue-600 hover:underline">
                                                    Edit
                                                </button>
                                                <button onClick={() => setConfirmDelete(lang.id)} className="text-red-600 hover:underline">
                                                    Delete
                                                </button>
                                                {confirmDelete === lang.id && (
                                                    <span className="ml-2">
                                                        <button
                                                            onClick={() => handleDelete(lang.id)}
                                                            className="mr-1 rounded bg-red-600 px-2 py-1 text-xs text-white"
                                                        >
                                                            Confirm
                                                        </button>
                                                        <button
                                                            onClick={() => setConfirmDelete(null)}
                                                            className="text-xs text-gray-500 hover:underline"
                                                        >
                                                            Cancel
                                                        </button>
                                                    </span>
                                                )}
                                            </td>
                                        </>
                                    )}
                                </tr>
                            ))}
                            {languages.length === 0 && !adding && (
                                <tr>
                                    <td colSpan={4} className="py-4 text-center text-gray-400">
                                        No languages found.
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
