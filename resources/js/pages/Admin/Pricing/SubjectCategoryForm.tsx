import { Button } from '@/Components/ui/button';
import { Card } from '@/Components/ui/card';
import { Input } from '@/Components/ui/input';
import { Label } from '@/Components/ui/label';
import AdminLayout from '@/Layouts/AdminLayout';
import { PageProps } from '@/types';
import { Head, useForm } from '@inertiajs/react';

interface SubjectCategory {
    id?: number;
    name: string;
    description: string;
    is_active: boolean;
    display_order: number;
}

interface Props extends PageProps {
    subjectCategory?: SubjectCategory;
}

export default function SubjectCategoryForm({ auth, subjectCategory }: Props) {
    const { data, setData, post, patch, processing, errors } = useForm<SubjectCategory>({
        name: subjectCategory?.name || '',
        description: subjectCategory?.description || '',
        is_active: subjectCategory?.is_active ?? true,
        display_order: subjectCategory?.display_order || 0,
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (subjectCategory?.id) {
            patch(route('admin.pricing.subjects.update', subjectCategory.id));
        } else {
            post(route('admin.pricing.subjects.store'));
        }
    };

    return (
        <AdminLayout user={auth.user}>
            <Head title={subjectCategory ? 'Edit Subject Category' : 'Add Subject Category'} />

            <div className="space-y-6">
                <div>
                    <h1 className="text-2xl font-semibold text-gray-900">{subjectCategory ? 'Edit Subject Category' : 'Add Subject Category'}</h1>
                    <p className="mt-1 text-sm text-gray-500">
                        {subjectCategory ? 'Update the subject category details' : 'Create a new subject category'}
                    </p>
                </div>

                <Card>
                    <form onSubmit={handleSubmit} className="space-y-6 p-6">
                        <div className="space-y-4">
                            <div>
                                <Label htmlFor="name">Name</Label>
                                <Input id="name" value={data.name} onChange={(e) => setData('name', e.target.value)} className="mt-1" required />
                                {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name}</p>}
                            </div>

                            <div>
                                <Label htmlFor="description">Description</Label>
                                <textarea
                                    id="description"
                                    value={data.description}
                                    onChange={(e) => setData('description', e.target.value)}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                                    rows={3}
                                />
                                {errors.description && <p className="mt-1 text-sm text-red-600">{errors.description}</p>}
                            </div>

                            <div>
                                <Label htmlFor="display_order">Display Order</Label>
                                <Input
                                    id="display_order"
                                    type="number"
                                    min="0"
                                    value={data.display_order}
                                    onChange={(e) => setData('display_order', parseInt(e.target.value))}
                                    className="mt-1"
                                    required
                                />
                                {errors.display_order && <p className="mt-1 text-sm text-red-600">{errors.display_order}</p>}
                                <p className="mt-1 text-sm text-gray-500">Lower numbers will be displayed first</p>
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
                                {subjectCategory ? 'Update Category' : 'Create Category'}
                            </Button>
                        </div>
                    </form>
                </Card>
            </div>
        </AdminLayout>
    );
}
