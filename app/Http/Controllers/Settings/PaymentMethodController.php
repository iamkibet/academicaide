<?php

namespace App\Http\Controllers\Settings;

use App\Http\Controllers\Controller;
use App\Models\PaymentMethod;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PaymentMethodController extends Controller
{
    public function index()
    {
        return Inertia::render('Settings/PaymentMethods/Index', [
            'paymentMethods' => auth()->user()->paymentMethods()->get(),
            'defaultMethod' => auth()->user()->defaultPaymentMethod(),
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'token' => 'required|string',
            'type' => 'required|string',
            'last_four' => 'required|string|size:4',
        ]);

        auth()->user()->paymentMethods()->create($validated);

        return back()->with('success', 'Payment method added successfully.');
    }

    public function destroy(PaymentMethod $method)
    {
        if ($method->user_id !== auth()->id()) {
            abort(403);
        }

        $method->delete();

        return back()->with('success', 'Payment method removed successfully.');
    }

    public function setDefault(PaymentMethod $method)
    {
        if ($method->user_id !== auth()->id()) {
            abort(403);
        }

        auth()->user()->update(['default_payment_method_id' => $method->id]);

        return back()->with('success', 'Default payment method updated.');
    }
}
