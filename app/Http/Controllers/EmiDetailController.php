<?php

namespace App\Http\Controllers;

use Carbon\Carbon;
use App\Models\EmiDetail;
use App\Models\LoanDetail;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Gate;

class EmiDetailController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(EmiDetail $emiDetail)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(EmiDetail $emiDetail)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request)
    {
        $emiDetail = EmiDetail::with('loanDetail')->find($request->id);
        if($emiDetail){
            // EmiDetail has no owner of its own — ownership is inherited
            // through the loan it belongs to, same as LoanDocument.
            Gate::authorize('update', $emiDetail->loanDetail);

            $emiDetail->status = $request->status;
            $emiDetail->save();

            // Check if all EMIs for this loan are completed
            $pendingEmis = EmiDetail::where('loan_detail_id', $emiDetail->loan_detail_id)
                ->where('status', '!=', 'paid')
                ->count();

            if ($pendingEmis === 0) {
                // All EMIs are completed, close the loan
                $loan = LoanDetail::find($emiDetail->loan_detail_id);
                if ($loan) {
                    $loan->status = 'closed';
                    $loan->save();
                }
            }
        }

        return;
    }

    public function updateEmi(Request $request){
        $loanDetail = LoanDetail::find($request->loan_detail_id);
        abort_if(!$loanDetail, 404);
        Gate::authorize('update', $loanDetail);

        // upsert() matches existing rows on 'id' alone. Without this filter,
        // a submitted id belonging to a different loan — including another
        // user's — would silently have its amount/due_date overwritten,
        // regardless of the loan_detail_id claimed elsewhere in the request.
        $ownedIds = EmiDetail::where('loan_detail_id', $loanDetail->id)->pluck('id')->all();
        $emiDetails = collect($request->emi_details ?? [])
            ->filter(fn ($emi) => in_array($emi['id'] ?? null, $ownedIds, true))
            ->values()
            ->all();

        abort_if(empty($emiDetails), 422, 'No valid EMI rows for this loan.');

        $updateEmi = EmiDetail::upsert($emiDetails,['id'],['amount','due_date']);
        if($updateEmi){
            $updatedEmi = EmiDetail::where('loan_detail_id',$loanDetail->id)->select('id', 'loan_detail_id', 'amount', 'due_date')->get();
            return response()->json(['status'=>true,'message'=>'Emi details are updated!','updatedEmi'=>$updatedEmi]);
        }

    }

    /**
     * Remove the specified resource from storage.
     */
    public function emiSkipped(Request $request)
    {
        $emiId = $request->emi_id;
        $loanId = $request->loan_id;

        $loanDetail = LoanDetail::find($loanId);
        abort_if(!$loanDetail, 404);
        Gate::authorize('update', $loanDetail);

        $restEmis = EmiDetail::where('id','>=',$emiId)->where('loan_detail_id',$loanId)->get();
        foreach($restEmis as $emi){
            $newDate = Carbon::parse($emi->due_date);
            $emi->due_date = $newDate->addMonth(); 
            $emi->save();
        }

        return response()->json(['status' => true, 'message' => 'Emi details are updated!']);
    }
}
