<?php

namespace App\Http\Controllers;

use App\Models\EmiDetail;
use App\Models\LoanDetail;
use App\Http\Resources\LoanDetailResource;
use Illuminate\Support\Facades\Auth;

class DashboardController extends Controller
{
    public function index()
    {
        $userId = Auth::id();
        
        $stats = [
            'total_loan' => LoanDetail::where('user_id', $userId)->count(),
            'total_open_loan' => LoanDetail::where('user_id', $userId)->where('status', 'open')->count(),
            'total_closed_loan' => LoanDetail::where('user_id', $userId)->where('status', 'closed')->count(),
            
            'total_emi' => EmiDetail::whereHas('loanDetail', function ($q) use ($userId) {
                $q->where('user_id', $userId);
            })->count(),
            'paid_emi' => EmiDetail::whereHas('loanDetail', function ($q) use ($userId) {
                $q->where('user_id', $userId);
            })->where('status', 'paid')->count(),
            'pending_emi' => EmiDetail::whereHas('loanDetail', function ($q) use ($userId) {
                $q->where('user_id', $userId);
            })->where('status', 'pending')->count(),
            'overdue_emi' => EmiDetail::whereHas('loanDetail', function ($q) use ($userId) {
                $q->where('user_id', $userId);
            })->where('status', 'pending')->where('due_date', '<', now())->count(),

            'total_amount' => LoanDetail::where('user_id', $userId)->sum('amount'), // Principal Amount
            'paid_amount' => EmiDetail::whereHas('loanDetail', function ($q) use ($userId) {
                $q->where('user_id', $userId);
            })->where('status', 'paid')->sum('amount'),
            'remaining_amount' => EmiDetail::whereHas('loanDetail', function ($q) use ($userId) {
                $q->where('user_id', $userId);
            })->where('status', 'pending')->sum('amount'),

            'total_overdue_loan' => LoanDetail::where('user_id', $userId)->whereHas('emiDetail', function ($q) {
                $q->where('status', 'pending')->where('due_date', '<', now());
            })->count(),
        ];

        return inertia('Dashboard', [
            'stats' => $stats,
        ]);
    }
}
