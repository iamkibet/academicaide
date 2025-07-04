<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\WritingStyle;
use Illuminate\Http\Request;
use Inertia\Inertia;

class WritingStyleController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $writingStyles = WritingStyle::ordered()->get();
        return Inertia::render('Admin/WritingStyles/Index', [
            'writingStyles' => $writingStyles,
            'success' => session('success'),
            'error' => session('error'),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Admin/WritingStyles/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255|unique:writing_styles',
            'label' => 'required|string|max:255',
            'description' => 'nullable|string',
            'is_active' => 'boolean',
            'display_order' => 'integer',
        ]);
        WritingStyle::create($validated);
        return redirect()->route('admin.writing-styles.index')->with('success', 'Writing style created successfully.');
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(WritingStyle $writingStyle)
    {
        return Inertia::render('Admin/WritingStyles/Edit', [
            'writingStyle' => $writingStyle,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, WritingStyle $writingStyle)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255|unique:writing_styles,name,' . $writingStyle->id,
            'label' => 'required|string|max:255',
            'description' => 'nullable|string',
            'is_active' => 'boolean',
            'display_order' => 'integer',
        ]);
        $writingStyle->update($validated);
        return redirect()->route('admin.writing-styles.index')->with('success', 'Writing style updated successfully.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(WritingStyle $writingStyle)
    {
        $writingStyle->delete();
        return redirect()->route('admin.writing-styles.index')->with('success', 'Writing style deleted successfully.');
    }
}
