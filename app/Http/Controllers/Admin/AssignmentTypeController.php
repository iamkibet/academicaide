<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\AssignmentType;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AssignmentTypeController extends Controller
{
    public function index()
    {
        $types = AssignmentType::orderBy('label')->get();
        return Inertia::render('Admin/AssignmentTypes/Index', [
            'assignmentTypes' => $types,
        ]);
    }

    public function create()
    {
        return Inertia::render('Admin/AssignmentTypes/Create');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|unique:assignment_types,name' . ($request->route('assignmentType') ? ',' . $request->route('assignmentType')->id : ''),
            'label' => 'required|string',
            'popular' => 'boolean',
            'inc_type' => 'required|string|in:amount,percent',
            'amount' => 'required|numeric|min:0',
        ]);
        AssignmentType::create($validated);
        return redirect()->route('admin.assignment-types.index')->with('success', 'Assignment type created.');
    }

    public function edit(AssignmentType $assignmentType)
    {
        return Inertia::render('Admin/AssignmentTypes/Edit', [
            'assignmentType' => $assignmentType,
        ]);
    }

    public function update(Request $request, AssignmentType $assignmentType)
    {
        $validated = $request->validate([
            'name' => 'required|string|unique:assignment_types,name,' . $assignmentType->id,
            'label' => 'required|string',
            'popular' => 'boolean',
            'inc_type' => 'required|string|in:amount,percent',
            'amount' => 'required|numeric|min:0',
        ]);
        $assignmentType->update($validated);
        return redirect()->route('admin.assignment-types.index')->with('success', 'Assignment type updated.');
    }

    public function destroy(AssignmentType $assignmentType)
    {
        $assignmentType->delete();
        return back()->with('success', 'Assignment type deleted.');
    }
}
