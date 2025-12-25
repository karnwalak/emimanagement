<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class EmiDetail extends Model
{
    public function loanDetail()
    {
        return $this->belongsTo(LoanDetail::class);
    }
}
