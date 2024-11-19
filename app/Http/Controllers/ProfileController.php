<?php

namespace App\Http\Controllers;

use App\Http\Requests\ProfileUpdateRequest;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Support\Facades\Log;

class ProfileController extends Controller
{
    public function edit(Request $request): Response
    {
        return Inertia::render('Profile', [
            'mustVerifyEmail' => $request->user() instanceof MustVerifyEmail,
            'status' => session('status'),
        ]);
    }
    public function updateProfileInformation(ProfileUpdateRequest $request): RedirectResponse
    {
        try {
            $user = auth()->user();
            $data = $request->validated();
            $user->update($data);
            return Redirect::route('profile.edit')->with('status', 'Profile information successfully updated.');
        } catch (\Exception $e) {
            Log::error("Error updating profile information: " . $e->getMessage());
            return response()->json(['message' => 'Internal server error'], 500);
        }
    }
    public function updatePhoto(Request $request): RedirectResponse
    {
        try {
            $user = auth()->user();
            $request->validate([
                'photo_url' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
            ]);
            if ($request->hasFile('photo_url')) {
                if ($user->photo_url) {
                    Storage::delete($user->photo_url);
                }
                $user['photo_url'] = $request->file('photo_url')->store('profile_photos', 'public');
            } elseif ($request->photo_url === null && $user->photo_url) {
                Storage::delete($user->photo_url);
                $user['photo_url'] = null;
            }
            $user->save();
            return Redirect::route('profile.edit')->with('status', 'Profile photo successfully updated.');
        } catch (\Exception $e) {
            Log::error("Error updating profile photo: " . $e->getMessage());
            return response()->json(['message' => 'Internal server error'], 500);
        }
    }
    public function destroy(Request $request): RedirectResponse
    {
        $request->validate([
            'password' => ['required', 'current_password'],
        ]);
        $user = $request->user();
        Auth::logout();
        $user->delete();
        $request->session()->invalidate();
        $request->session()->regenerateToken();
        return Redirect::to('/');
    }
}
