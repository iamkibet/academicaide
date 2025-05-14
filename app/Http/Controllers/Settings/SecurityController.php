<?php

namespace App\Http\Controllers\Settings;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Inertia\Inertia;

class SecurityController extends Controller
{
    public function edit()
    {
        return Inertia::render('Settings/Security/Edit', [
            'hasTwoFactor' => auth()->user()->two_factor_enabled,
        ]);
    }

    public function updatePassword(Request $request)
    {
        $validated = $request->validate([
            'current_password' => 'required|current_password',
            'password' => 'required|string|min:8|confirmed',
        ]);

        auth()->user()->update([
            'password' => Hash::make($validated['password']),
        ]);

        return back()->with('success', 'Password updated successfully.');
    }

    public function updateTwoFactor(Request $request)
    {
        $validated = $request->validate([
            'enabled' => 'required|boolean',
        ]);

        auth()->user()->update([
            'two_factor_enabled' => $validated['enabled'],
        ]);

        return back()->with('success', 'Two-factor authentication settings updated.');
    }
}
