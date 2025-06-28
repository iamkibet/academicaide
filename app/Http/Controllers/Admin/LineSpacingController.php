<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\LineSpacing;
use Illuminate\Http\Request;
use Inertia\Inertia;

class LineSpacingController extends Controller
{
    public function index()
    {
        $lineSpacings = LineSpacing::orderBy('name')->get();
        return Inertia::render('Admin/LineSpacings/Index', [
            'lineSpacings' => $lineSpacings,
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|unique:line_spacings',
            'label' => 'required|string',
        ]);
        $lineSpacing = LineSpacing::create($validated);
        return redirect()->route('admin.line-spacings.index')->with('success', 'Line spacing added.');
    }

    public function update(Request $request, LineSpacing $lineSpacing)
    {
        $validated = $request->validate([
            'name' => 'required|string|unique:line_spacings,name,' . $lineSpacing->id,
            'label' => 'required|string',
        ]);
        $lineSpacing->update($validated);
        return redirect()->route('admin.line-spacings.index')->with('success', 'Line spacing updated.');
    }

    public function destroy(LineSpacing $lineSpacing)
    {
        $lineSpacing->delete();
        return back()->with('success', 'Line spacing deleted.');
    }
}
