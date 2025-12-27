<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Laravel\Socialite\Facades\Socialite;
use Exception;
use App\Models\User;

class GoogleAuthController extends Controller
{
    public function redirectToGoogle()
    {
        //redirect to google 
        return Socialite::driver('google')->redirect();
    }

    public function loginWithGoogle(Request $request)
    {
        try {

            $googleUser = Socialite::driver('google')->user();

            // If the user exists, update their record; otherwise, create a new one
            $user = User::where('email', $googleUser->email)->first();

            if ($user) {
                // Update existing user with Google ID
                $user->update([
                    'google_id' => $googleUser->id,
                    'name' => $googleUser->name,
                ]);
            } else {
                // Create new user
                $user = User::create([
                    'name' => $googleUser->name,
                    'email' => $googleUser->email,
                    'google_id' => $googleUser->id,
                    'password' => bcrypt('razorpod.in'),
                ]);
            }
            Auth::login($user);
            return redirect()->route('dashboard');

        } catch (Exception $e) {
            dd($e);
        }
    }
}
