<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\LoanDetail>
 */
class LoanDetailFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'user_id' => 1,
            'provider' => fake()->text(10),
            'amount' => rand(50000,100000),
            'emi_amount' => 5000,
            'processing_fee' => 5000,
            'interest_rate' => rand(12,20),
            'emi_count' => 5,
            'disbursed_date' => "2024-12-31",
        ];
    }
}
