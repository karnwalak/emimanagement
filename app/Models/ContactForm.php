<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class ContactForm extends Model
{
    use SoftDeletes;

    protected $fillable = [
        'name',
        'email',
        'subject',
        'message',
        'status',
        'priority',
        'category',
        'user_id',
        'assigned_to',
        'ip_address',
        'user_agent',
        'admin_response',
        'responded_at',
        'resolved_at',
    ];

    protected $casts = [
        'responded_at' => 'datetime',
        'resolved_at' => 'datetime',
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
        'deleted_at' => 'datetime',
    ];

    /**
     * Get the user who submitted the form (if authenticated)
     */
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class, 'user_id');
    }

    /**
     * Get the admin assigned to handle this form
     */
    public function assignedAdmin(): BelongsTo
    {
        return $this->belongsTo(User::class, 'assigned_to');
    }

    /**
     * Scope for new/unread messages
     */
    public function scopeNew($query)
    {
        return $query->where('status', 'new');
    }

    /**
     * Scope for pending messages
     */
    public function scopePending($query)
    {
        return $query->whereIn('status', ['new', 'in_progress']);
    }

    /**
     * Scope for resolved messages
     */
    public function scopeResolved($query)
    {
        return $query->where('status', 'resolved');
    }

    /**
     * Scope for high priority messages
     */
    public function scopeHighPriority($query)
    {
        return $query->whereIn('priority', ['high', 'urgent']);
    }

    /**
     * Mark as resolved
     */
    public function markAsResolved()
    {
        $this->update([
            'status' => 'resolved',
            'resolved_at' => now(),
        ]);
    }

    /**
     * Mark as spam
     */
    public function markAsSpam()
    {
        $this->update(['status' => 'spam']);
    }
}
