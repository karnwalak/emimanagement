<?php

namespace Database\Seeders;

use App\Models\LoanDetail;
use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {

        User::create([
            'name' => 'Akshay Kumar Karnwal',
            'email' => 'karnwalakshay7@gmail.com',
            'password' => Hash::make('razorpod.in')
        ]);

        User::create([
            'name' => 'Akshay Kumar',
            'email' => 'akshay.k@razorpod.in',
            'password' => Hash::make('razorpod.in')
        ]);

        // User::factory(10)->create();

        // User::factory()->create([
        //     'name' => 'Test User',
        //     'email' => 'test@example.com',
        // ]);
        // LoanDetail::factory()->count(100)->create();
    }
}
