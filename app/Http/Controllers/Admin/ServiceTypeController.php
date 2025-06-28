<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\ServiceType;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ServiceTypeController extends Controller
{
    public function index()
    {
        $types = ServiceType::orderBy('label')->get();
        return Inertia::render('Admin/ServiceTypes/Index', [
            'serviceTypes' => $types,
        ]);
    }

    public function create()
    {
        return Inertia::render('Admin/ServiceTypes/Create');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|unique:service_types',
            'label' => 'required|string',
        ]);
        ServiceType::create($validated);
        return redirect()->route('admin.service-types.index')->with('success', 'Service type created.');
    }

    public function edit(ServiceType $serviceType)
    {
        return Inertia::render('Admin/ServiceTypes/Edit', [
            'serviceType' => $serviceType,
        ]);
    }

    public function update(Request $request, ServiceType $serviceType)
    {
        $validated = $request->validate([
            'name' => 'required|string|unique:service_types,name,' . $serviceType->id,
            'label' => 'required|string',
        ]);
        $serviceType->update($validated);
        return redirect()->route('admin.service-types.index')->with('success', 'Service type updated.');
    }

    public function destroy(ServiceType $serviceType)
    {
        $serviceType->delete();
        return back()->with('success', 'Service type deleted.');
    }
}
