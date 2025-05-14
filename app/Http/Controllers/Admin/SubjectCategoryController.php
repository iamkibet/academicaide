<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\SubjectCategory;
use Illuminate\Http\Request;
use Inertia\Inertia;

class SubjectCategoryController extends Controller
{
    public function index()
    {
        $categories = SubjectCategory::orderBy('display_order')
            ->get()
            ->map(function ($category) {
                return [
                    'id' => $category->id,
                    'name' => $category->name,
                    'description' => $category->description,
                    'display_order' => $category->display_order,
                    'is_active' => $category->is_active,
                    'orders_count' => $category->orders_count,
                ];
            });

        return Inertia::render('Admin/Pricing/SubjectCategories/Index', [
            'categories' => $categories,
        ]);
    }

    public function create()
    {
        return Inertia::render('Admin/Pricing/SubjectCategories/Create');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255|unique:subject_categories',
            'description' => 'required|string',
            'display_order' => 'required|integer|min:0',
            'is_active' => 'boolean',
        ]);

        SubjectCategory::create($validated);

        return redirect()->route('admin.pricing.subject-categories.index')
            ->with('success', 'Subject category created successfully.');
    }

    public function edit(SubjectCategory $category)
    {
        return Inertia::render('Admin/Pricing/SubjectCategories/Edit', [
            'category' => [
                'id' => $category->id,
                'name' => $category->name,
                'description' => $category->description,
                'display_order' => $category->display_order,
                'is_active' => $category->is_active,
            ],
        ]);
    }

    public function update(Request $request, SubjectCategory $category)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255|unique:subject_categories,name,' . $category->id,
            'description' => 'required|string',
            'display_order' => 'required|integer|min:0',
            'is_active' => 'boolean',
        ]);

        $category->update($validated);

        return redirect()->route('admin.pricing.subject-categories.index')
            ->with('success', 'Subject category updated successfully.');
    }

    public function destroy(SubjectCategory $category)
    {
        // Check if the category has any associated orders
        if ($category->orders()->exists()) {
            return back()->with('error', 'Cannot delete subject category with associated orders.');
        }

        $category->delete();

        return back()->with('success', 'Subject category deleted successfully.');
    }
}
