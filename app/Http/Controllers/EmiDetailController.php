<?php

namespace App\Http\Controllers;

use Carbon\Carbon;
use App\Models\EmiDetail;
use Illuminate\Http\Request;

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
        $emiDetail = EmiDetail::find($request->id);
        if($emiDetail){
            $emiDetail->status = $request->status;
            $emiDetail->save();
        }

        return;
    }

    public function updateEmi(Request $request){
        $updateEmi = EmiDetail::upsert($request->emi_details,['id'],['amount','due_date']);
        if($updateEmi){
            $updatedEmi = EmiDetail::where('loan_detail_id',$request->loan_detail_id)->select('id', 'loan_detail_id', 'amount', 'due_date')->get();
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
        $restEmis = EmiDetail::where('id','>=',$emiId)->where('loan_detail_id',$loanId)->get();
        foreach($restEmis as $emi){
            $newDate = Carbon::parse($emi->due_date);
            $emi->due_date = $newDate->addMonth(); 
            $emi->save();
        }

        return response()->json(['status' => true, 'message' => 'Emi details are updated!']);
    }
}
