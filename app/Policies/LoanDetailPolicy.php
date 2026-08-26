<?php

namespace App\Policies;

use App\Models\LoanDetail;
use App\Models\User;

class LoanDetailPolicy
{
    /**
     * There is no admin/staff role in this app — a loan detail belongs to
     * exactly one user, and only that user may view, change, or remove it.
     * Every method here is the same rule; they exist separately so
     * controllers can express intent (view vs. update vs. delete) and so a
     * future role split doesn't have to touch every call site at once.
     */
    public function view(User $user, LoanDetail $loanDetail): bool
    {
        return $user->id === $loanDetail->user_id;
    }

    public function update(User $user, LoanDetail $loanDetail): bool
    {
        return $user->id === $loanDetail->user_id;
    }

    public function delete(User $user, LoanDetail $loanDetail): bool
    {
        return $user->id === $loanDetail->user_id;
    }
}
