<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Auth\Events\Registered;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules;
use Inertia\Inertia;
use Inertia\Response;

class RegisteredUserController extends Controller
{
    /**
     * Display the registration view.
     */
    public function create(): Response
    {
        return Inertia::render('Auth/Register');
    }

    /**
     * Handle an incoming registration request.
     *
     * @throws \Illuminate\Validation\ValidationException
     */
    public function store(Request $request): RedirectResponse
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|lowercase|email|max:255|unique:' . User::class,
            'password' => ['required', 'confirmed', Rules\Password::defaults()],
            'title' => 'nullable|string',
            'office' => 'nullable|string',
            'phone_number' => 'nullable|string',
            'username' => 'nullable|string',
            'bio' => 'nullable|string',
            'photo_url' => 'nullable|string'
        ]);

        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
            'user_role' => 'User',
            'title' => $request->title,
            'office' => $request->office,
            'phone_number' => $request->phone_number,
            'username' => $request->username,
            'bio' => $request->bio,
            'photo_url' => $request->photo_url
        ]);

        event(new Registered($user));

        Auth::login($user);

        return redirect(route('/', absolute: false));
    }
}