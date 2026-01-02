<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('contact_forms', function (Blueprint $table) {
            // Add status tracking
            $table->enum('status', ['new', 'in_progress', 'resolved', 'closed', 'spam'])
                ->default('new')
                ->after('message');

            // Add priority level
            $table->enum('priority', ['low', 'medium', 'high', 'urgent'])
                ->default('medium')
                ->after('status');

            // Add category/type
            $table->string('category')->nullable()->after('priority');

            // Track if user was authenticated
            $table->foreignId('user_id')->nullable()->constrained()->onDelete('set null')->after('category');

            // Track who is handling this
            $table->foreignId('assigned_to')->nullable()->constrained('users')->onDelete('set null')->after('user_id');

            // IP address for security/spam prevention
            $table->string('ip_address', 45)->nullable()->after('assigned_to');

            // User agent for debugging
            $table->text('user_agent')->nullable()->after('ip_address');

            // Response tracking
            $table->text('admin_response')->nullable()->after('user_agent');
            $table->timestamp('responded_at')->nullable()->after('admin_response');
            $table->timestamp('resolved_at')->nullable()->after('responded_at');

            // Soft deletes for archiving
            $table->softDeletes();

            // Add indexes for better query performance
            $table->index('status');
            $table->index('priority');
            $table->index('email');
            $table->index('created_at');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('contact_forms', function (Blueprint $table) {
            // Drop indexes
            $table->dropIndex(['status']);
            $table->dropIndex(['priority']);
            $table->dropIndex(['email']);
            $table->dropIndex(['created_at']);

            // Drop columns in reverse order
            $table->dropSoftDeletes();
            $table->dropColumn([
                'resolved_at',
                'responded_at',
                'admin_response',
                'user_agent',
                'ip_address',
                'assigned_to',
                'user_id',
                'category',
                'priority',
                'status',
            ]);
        });
    }
};
