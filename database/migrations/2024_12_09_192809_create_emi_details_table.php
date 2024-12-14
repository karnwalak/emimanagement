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
        Schema::create('emi_details', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('loan_detail_id');
            $table->foreign('loan_detail_id')->references('id')->on('loan_details')->onDelete('cascade');
            $table->string('transaction_id')->nullable();
            $table->decimal('amount', 10,2)->nullable();
            $table->date('due_date')->nullable();
            $table->string('status')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('emi_details');
    }
};
