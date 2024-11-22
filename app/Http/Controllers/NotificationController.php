<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class NotificationController extends Controller
{
    public function getNotifications()
    {
        try {
            return auth()->user()->notifications()->latest()->limit(10)->where('read_at', null)->get();
        } catch (\Exception $e) {
            Log::error("Error sending notifications: " . $e->getMessage());
            return response()->json(['message' => 'Internal server error'], 500);
        }
    }
    public function markNotificationAsRead($id)
    {
        try {
            $notification = auth()->user()->notifications()->findOrFail($id);
            $notification->markAsRead();
            return response()->json(['message' => 'Notification marked as read.']);
        } catch (\Exception $e) {
            Log::error("Error marking notification as read: " . $e->getMessage());
            return response()->json(['message' => 'Internal server error'], 500);
        }
    }
    public function markAllAsRead()
    {
        try {
            auth()->user()->unreadNotifications->markAsRead();
            return response()->json(['message' => 'All notifications marked as read.']);
        } catch (\Exception $e) {
            Log::error("Error marking all notifications as read: " . $e->getMessage());
            return response()->json(['message' => 'Internal server error'], 500);
        }
    }
}
