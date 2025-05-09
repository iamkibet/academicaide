import { Order } from '@/types';
import { Head, useForm } from '@inertiajs/react';
import { FormEvent } from 'react';

interface Props {
    order: Order;
}

export default function Edit({ order }: Props) {
    const { data, setData, put, processing, errors } = useForm({
        title: order.title,
        subject: order.subject,
        academic_level: order.academic_level,
        citation_style: order.citation_style || '',
        pages: order.pages,
        word_count: order.word_count || 0,
        deadline: order.deadline,
        instructions: order.instructions,
        client_notes: order.client_notes || '',
        is_urgent: order.is_urgent,
    });

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        put(route('orders.update', order.id));
    };

    return (
        <>
            <Head title={`Edit Order: ${order.title}`} />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        <div className="p-6">
                            <h2 className="mb-6 text-2xl font-semibold text-gray-800">Edit Order</h2>

                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">Title</label>
                                        <input
                                            type="text"
                                            value={data.title}
                                            onChange={(e) => setData('title', e.target.value)}
                                            className="focus:ring-opacity-50 mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200"
                                            required
                                        />
                                        {errors.title && <div className="mt-1 text-sm text-red-500">{errors.title}</div>}
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">Subject</label>
                                        <input
                                            type="text"
                                            value={data.subject}
                                            onChange={(e) => setData('subject', e.target.value)}
                                            className="focus:ring-opacity-50 mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200"
                                            required
                                        />
                                        {errors.subject && <div className="mt-1 text-sm text-red-500">{errors.subject}</div>}
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">Academic Level</label>
                                        <select
                                            value={data.academic_level}
                                            onChange={(e) => setData('academic_level', e.target.value)}
                                            className="focus:ring-opacity-50 mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200"
                                            required
                                        >
                                            <option value="">Select Level</option>
                                            <option value="high_school">High School</option>
                                            <option value="undergraduate">Undergraduate</option>
                                            <option value="masters">Masters</option>
                                            <option value="phd">PhD</option>
                                        </select>
                                        {errors.academic_level && <div className="mt-1 text-sm text-red-500">{errors.academic_level}</div>}
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">Citation Style</label>
                                        <select
                                            value={data.citation_style}
                                            onChange={(e) => setData('citation_style', e.target.value)}
                                            className="focus:ring-opacity-50 mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200"
                                        >
                                            <option value="">Select Style</option>
                                            <option value="apa">APA</option>
                                            <option value="mla">MLA</option>
                                            <option value="chicago">Chicago</option>
                                            <option value="harvard">Harvard</option>
                                        </select>
                                        {errors.citation_style && <div className="mt-1 text-sm text-red-500">{errors.citation_style}</div>}
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">Number of Pages</label>
                                        <input
                                            type="number"
                                            min="1"
                                            value={data.pages}
                                            onChange={(e) => setData('pages', parseInt(e.target.value))}
                                            className="focus:ring-opacity-50 mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200"
                                            required
                                        />
                                        {errors.pages && <div className="mt-1 text-sm text-red-500">{errors.pages}</div>}
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">Word Count</label>
                                        <input
                                            type="number"
                                            min="0"
                                            value={data.word_count}
                                            onChange={(e) => setData('word_count', parseInt(e.target.value))}
                                            className="focus:ring-opacity-50 mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200"
                                        />
                                        {errors.word_count && <div className="mt-1 text-sm text-red-500">{errors.word_count}</div>}
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">Deadline</label>
                                        <input
                                            type="datetime-local"
                                            value={data.deadline}
                                            onChange={(e) => setData('deadline', e.target.value)}
                                            className="focus:ring-opacity-50 mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200"
                                            required
                                        />
                                        {errors.deadline && <div className="mt-1 text-sm text-red-500">{errors.deadline}</div>}
                                    </div>

                                    <div className="md:col-span-2">
                                        <label className="block text-sm font-medium text-gray-700">Instructions</label>
                                        <textarea
                                            value={data.instructions}
                                            onChange={(e) => setData('instructions', e.target.value)}
                                            rows={4}
                                            className="focus:ring-opacity-50 mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200"
                                            required
                                        />
                                        {errors.instructions && <div className="mt-1 text-sm text-red-500">{errors.instructions}</div>}
                                    </div>

                                    <div className="md:col-span-2">
                                        <label className="block text-sm font-medium text-gray-700">Additional Notes</label>
                                        <textarea
                                            value={data.client_notes}
                                            onChange={(e) => setData('client_notes', e.target.value)}
                                            rows={2}
                                            className="focus:ring-opacity-50 mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200"
                                        />
                                        {errors.client_notes && <div className="mt-1 text-sm text-red-500">{errors.client_notes}</div>}
                                    </div>

                                    <div className="md:col-span-2">
                                        <label className="flex items-center">
                                            <input
                                                type="checkbox"
                                                checked={data.is_urgent}
                                                onChange={(e) => setData('is_urgent', e.target.checked)}
                                                className="focus:ring-opacity-50 rounded border-gray-300 text-blue-600 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200"
                                            />
                                            <span className="ml-2 text-sm text-gray-600">Mark as Urgent (1.5x base price)</span>
                                        </label>
                                    </div>
                                </div>

                                <div className="flex justify-end">
                                    <button
                                        type="submit"
                                        disabled={processing}
                                        className="focus:shadow-outline rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700 focus:outline-none disabled:opacity-50"
                                    >
                                        Update Order
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
