import { Button } from '@/Components/ui/button';
import { Card } from '@/Components/ui/card';
import AdminLayout from '@/Layouts/AdminLayout';
import { PageProps } from '@/types';
import { Head, Link } from '@inertiajs/react';

interface PricingData {
    basePricing: {
        price_per_page: number;
        single_spacing_multiplier: number;
        double_spacing_multiplier: number;
    };
    academicLevels: Array<{
        id: number;
        name: string;
        price_multiplier: number;
        is_active: boolean;
    }>;
    deadlineOptions: Array<{
        id: number;
        name: string;
        hours: number;
        price_multiplier: number;
        is_active: boolean;
    }>;
    addons: Array<{
        id: number;
        name: string;
        price: number;
        is_free: boolean;
        is_active: boolean;
    }>;
    subjectCategories: Array<{
        id: number;
        name: string;
        is_active: boolean;
    }>;
}

interface Props extends PageProps {
    pricingData: PricingData;
}

export default function Index({ auth, pricingData }: Props) {
    return (
        <AdminLayout user={auth.user}>
            <Head title="Pricing Management" />

            <div className="space-y-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-semibold text-gray-900">Pricing Management</h1>
                        <p className="mt-1 text-sm text-gray-500">Manage all pricing components for the platform</p>
                    </div>
                </div>

                <div className="grid gap-6 md:grid-cols-2">
                    {/* Base Pricing */}
                    <Card className="p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <h2 className="text-lg font-medium text-gray-900">Base Pricing</h2>
                                <p className="mt-1 text-sm text-gray-500">Configure the base price per page and spacing multipliers</p>
                            </div>
                            <Button asChild>
                                <Link href={route('admin.pricing.base.edit')}>Edit</Link>
                            </Button>
                        </div>
                        <div className="mt-4 space-y-2">
                            <div className="flex justify-between text-sm">
                                <span className="text-gray-500">Base Price Per Page:</span>
                                <span className="font-medium text-gray-900">${pricingData.basePricing.price_per_page}</span>
                            </div>
                            <div className="flex justify-between text-sm">
                                <span className="text-gray-500">Single Spacing Multiplier:</span>
                                <span className="font-medium text-gray-900">{pricingData.basePricing.single_spacing_multiplier}x</span>
                            </div>
                            <div className="flex justify-between text-sm">
                                <span className="text-gray-500">Double Spacing Multiplier:</span>
                                <span className="font-medium text-gray-900">{pricingData.basePricing.double_spacing_multiplier}x</span>
                            </div>
                        </div>
                    </Card>

                    {/* Academic Levels */}
                    <Card className="p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <h2 className="text-lg font-medium text-gray-900">Academic Levels</h2>
                                <p className="mt-1 text-sm text-gray-500">Manage academic level pricing multipliers</p>
                            </div>
                            <div className="space-x-2">
                                <Button variant="outline" asChild>
                                    <Link href={route('admin.pricing.academic-levels.index')}>View All</Link>
                                </Button>
                                <Button asChild>
                                    <Link href={route('admin.pricing.academic-levels.create')}>Add New</Link>
                                </Button>
                            </div>
                        </div>
                        <div className="mt-4">
                            <div className="space-y-2">
                                {pricingData.academicLevels.slice(0, 3).map((level) => (
                                    <div key={level.id} className="flex items-center justify-between text-sm">
                                        <div className="flex items-center gap-2">
                                            <span className="font-medium text-gray-900">{level.name}</span>
                                            {!level.is_active && <span className="text-xs text-gray-500">(Inactive)</span>}
                                        </div>
                                        <span className="text-gray-900">{level.price_multiplier}x</span>
                                    </div>
                                ))}
                                {pricingData.academicLevels.length > 3 && (
                                    <div className="text-center text-sm text-gray-500">+{pricingData.academicLevels.length - 3} more levels</div>
                                )}
                            </div>
                        </div>
                    </Card>

                    {/* Deadlines */}
                    <Card className="p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <h2 className="text-lg font-medium text-gray-900">Deadlines</h2>
                                <p className="mt-1 text-sm text-gray-500">Manage deadline options and urgency pricing</p>
                            </div>
                            <div className="space-x-2">
                                <Button variant="outline" asChild>
                                    <Link href={route('admin.pricing.deadlines.index')}>View All</Link>
                                </Button>
                                <Button asChild>
                                    <Link href={route('admin.pricing.deadlines.create')}>Add New</Link>
                                </Button>
                            </div>
                        </div>
                        <div className="mt-4">
                            <div className="space-y-2">
                                {pricingData.deadlineOptions.slice(0, 3).map((deadline) => (
                                    <div key={deadline.id} className="flex items-center justify-between text-sm">
                                        <div className="flex items-center gap-2">
                                            <span className="font-medium text-gray-900">{deadline.name}</span>
                                            {!deadline.is_active && <span className="text-xs text-gray-500">(Inactive)</span>}
                                        </div>
                                        <span className="text-gray-900">{deadline.price_multiplier}x</span>
                                    </div>
                                ))}
                                {pricingData.deadlineOptions.length > 3 && (
                                    <div className="text-center text-sm text-gray-500">+{pricingData.deadlineOptions.length - 3} more deadlines</div>
                                )}
                            </div>
                        </div>
                    </Card>

                    {/* Add-ons */}
                    <Card className="p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <h2 className="text-lg font-medium text-gray-900">Add-ons</h2>
                                <p className="mt-1 text-sm text-gray-500">Manage additional services and features</p>
                            </div>
                            <div className="space-x-2">
                                <Button variant="outline" asChild>
                                    <Link href={route('admin.pricing.addons.index')}>View All</Link>
                                </Button>
                                <Button asChild>
                                    <Link href={route('admin.pricing.addons.create')}>Add New</Link>
                                </Button>
                            </div>
                        </div>
                        <div className="mt-4">
                            <div className="space-y-2">
                                {pricingData.addons.slice(0, 3).map((addon) => (
                                    <div key={addon.id} className="flex items-center justify-between text-sm">
                                        <div className="flex items-center gap-2">
                                            <span className="font-medium text-gray-900">{addon.name}</span>
                                            {addon.is_free && <span className="text-xs text-green-600">Free</span>}
                                            {!addon.is_active && <span className="text-xs text-gray-500">(Inactive)</span>}
                                        </div>
                                        {!addon.is_free && <span className="text-gray-900">${addon.price}</span>}
                                    </div>
                                ))}
                                {pricingData.addons.length > 3 && (
                                    <div className="text-center text-sm text-gray-500">+{pricingData.addons.length - 3} more add-ons</div>
                                )}
                            </div>
                        </div>
                    </Card>

                    {/* Subject Categories */}
                    <Card className="p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <h2 className="text-lg font-medium text-gray-900">Subject Categories</h2>
                                <p className="mt-1 text-sm text-gray-500">Manage available subjects and categories</p>
                            </div>
                            <div className="space-x-2">
                                <Button variant="outline" asChild>
                                    <Link href={route('admin.pricing.subjects.index')}>View All</Link>
                                </Button>
                                <Button asChild>
                                    <Link href={route('admin.pricing.subjects.create')}>Add New</Link>
                                </Button>
                            </div>
                        </div>
                        <div className="mt-4">
                            <div className="space-y-2">
                                {pricingData.subjectCategories.slice(0, 3).map((subject) => (
                                    <div key={subject.id} className="flex items-center justify-between text-sm">
                                        <div className="flex items-center gap-2">
                                            <span className="font-medium text-gray-900">{subject.name}</span>
                                            {!subject.is_active && <span className="text-xs text-gray-500">(Inactive)</span>}
                                        </div>
                                    </div>
                                ))}
                                {pricingData.subjectCategories.length > 3 && (
                                    <div className="text-center text-sm text-gray-500">+{pricingData.subjectCategories.length - 3} more subjects</div>
                                )}
                            </div>
                        </div>
                    </Card>
                </div>
            </div>
        </AdminLayout>
    );
}
