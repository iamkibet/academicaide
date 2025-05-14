<?php

namespace App\Http\Controllers;

use App\Models\NotificationSetting;
use Illuminate\Http\Request;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Foundation\Validation\ValidatesRequests;
use Illuminate\Routing\Controller as BaseController;
use Illuminate\Support\Facades\Auth;

class NotificationSettingController extends BaseController
{
    use AuthorizesRequests, ValidatesRequests;

    public function __construct()
    {
        $this->middleware('auth');
    }

    public function edit()
    {
        $settings = Auth::user()->notificationSettings ?? new NotificationSetting();
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

        $settings = Auth::user()->notificationSettings ?? new NotificationSetting();
        $settings->fill($validated);
        $settings->user_id = Auth::id();
        $settings->save();

        return redirect()->route('notification-settings.edit')
            ->with('success', 'Notification settings updated successfully.');
    }
}
