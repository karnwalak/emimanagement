<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class LoanDetail extends Model
{
    use HasFactory;

    public function user()
    {
        return $this->belongsTo(User::class, 'user_id');
    }

    public function emiDetail(){
        return $this->hasMany(EmiDetail::class);
    }

    protected $fillable = [
        'provider',
        'amount',
        'emi_amount',
        'processing_fee',
        'interest_rate',
        'emi_count',
        'disbursed_date',
        'status',
    ];
}
