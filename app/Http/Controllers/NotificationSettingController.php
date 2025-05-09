<?php

namespace App\Http\Controllers;

use App\Models\NotificationSetting;
use Illuminate\Http\Request;

class NotificationSettingController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth');
    }

    public function edit()
    {
        $settings = auth()->user()->notificationSettings ?? new NotificationSetting();
        return view('notification-settings.edit', compact('settings'));
    }

    public function update(Request $request)
    {
        $validated = $request->validate([
            'email_notifications' => 'boolean',
            'in_app_notifications' => 'boolean',
            'notification_types' => 'array',
            'notification_types.*' => 'string|in:new_order,order_update,new_message',
        ]);

        $settings = auth()->user()->notificationSettings ?? new NotificationSetting();
        $settings->fill($validated);
        $settings->user_id = auth()->id();
        $settings->save();

        return redirect()->route('notification-settings.edit')
            ->with('success', 'Notification settings updated successfully.');
    }
}
