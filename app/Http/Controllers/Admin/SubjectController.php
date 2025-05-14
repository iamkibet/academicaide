<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\SubjectCategory;
use Illuminate\Http\Request;
use Inertia\Inertia;

class SubjectController extends Controller
{
    public function index()
    {
        $subjects = SubjectCategory::orderBy('name')
            ->get()
            ->map(function ($subject) {
                return [
                    'id' => $subject->id,
                    'name' => $subject->name,
                    'description' => $subject->description,
                ];
            });

        return Inertia::render('Admin/Pricing/Subjects/Index', [
            'subjects' => $subjects,
        ]);
    }

    public function create()
    {
        return Inertia::render('Admin/Pricing/Subjects/Create');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255|unique:subject_categories',
            'description' => 'required|string',
        ]);

        SubjectCategory::create($validated);

        return redirect()->route('admin.pricing.subjects.index')
            ->with('success', 'Subject category created successfully.');
    }

    public function edit(SubjectCategory $subject)
    {
        return Inertia::render('Admin/Pricing/Subjects/Edit', [
            'subject' => [
                'id' => $subject->id,
                'name' => $subject->name,
                'description' => $subject->description,
            ],
        ]);
    }

    public function update(Request $request, SubjectCategory $subject)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255|unique:subject_categories,name,' . $subject->id,
            'description' => 'required|string',
        ]);

        $subject->update($validated);

        return redirect()->route('admin.pricing.subjects.index')
            ->with('success', 'Subject category updated successfully.');
    }

    public function destroy(SubjectCategory $subject)
    {
        if ($subject->orders()->exists()) {
            return back()->with('error', 'Cannot delete subject category with associated orders.');
        }

        $subject->delete();

        return back()->with('success', 'Subject category deleted successfully.');
    }
}
