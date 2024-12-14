<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('loan_details', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('user_id');
            $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade');
            $table->string('provider')->nullable();
            $table->decimal('amount', 10, 2)->nullable();
            $table->decimal('emi_amount', 10, 2)->nullable();
            $table->decimal('processing_fee', 10, 2)->nullable();
            $table->decimal('interest_rate', 10, 2)->nullable();
            $table->integer('emi_count')->nullable();
            $table->date('disbursed_date')->nullable();
            $table->string('status')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('loan_details');
    }
};
