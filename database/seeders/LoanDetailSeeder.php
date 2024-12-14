<?php

namespace Database\Seeders;

use App\Models\LoanDetail;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class LoanDetailSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): array
    {
        return [
            'user_id' => 1,
            'provider' => fake()->text(10),
            'amount' => fake()->number(),
            'emi_amount' => fake()->number(),
            'processing_fee' => fake()->number(),
            'interest_rate' => fake()->number(),
            'emi_count' => 5,
            'disbursed_date' => fake()->date(),
        ];
    }
}
