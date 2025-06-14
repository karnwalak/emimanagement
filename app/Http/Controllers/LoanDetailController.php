<?php

namespace App\Http\Controllers;

use Carbon\Carbon;
use App\Models\User;
use Inertia\Inertia;
use App\Models\EmiDetail;
use App\Models\LoanDetail;
use Illuminate\Support\Str;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Http\Requests\LoanDetailRequest;
use App\Http\Resources\LoanDetailResource;

class LoanDetailController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        // $loanDetail = LoanDetail::get();
        // return Inertia::render('LoanDetail',compact('loanDetail'));

        $query = LoanDetail::where('user_id',Auth::user()->id);
        $sortField = request('sort_field','created_at');
        $sortDirection = request('sort_direction', 'desc');
        if(request('name')){
            $query->where('name','like','%'.request('name').'%');
        }
        if(request('status')){
            $query->where('status',request('status'));
        }
        $LoanDetails = $query->orderBy($sortField,$sortDirection)->paginate(10)->onEachSide(1);
        // dd(LoanDetailResource::collection($LoanDetails));
        return inertia('LoanDetail',[
            'loanDetails'=>LoanDetailResource::collection($LoanDetails),
            'queryParams' => request()->query() ?: null,
            'success' => session('success')
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $users = User::select('id','name')->get();
        return inertia('Create',compact('users'));
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(LoanDetailRequest $request)
    {
        $data = $request->validated();
        // dd($request->all());
        $amount = $request->amount;
        $processingFee = $request->processing_fee;
        $interestRate = $request->interest_rate;
        $date = $request->date;
        $remainingAmount = 0;
        // if($request->loan_type == 'tenure'){
        //     $tenure = $request->tenure;
        //     // Loan Interest Calculation
        //     $interest = ($amount*$interestRate*($tenure/12))/100;
        //     $totalAmount = $amount + $interest;
        //     $emiAmount = $totalAmount/$tenure;
        //     $emiCount = $tenure;
        // }

        if ($request->loan_type == 'tenure') {
            $tenure = $request->tenure; // in months
            $annualInterestRate = $interestRate; // as % e.g. 10.5
            $monthlyRate = $annualInterestRate / 12 / 100; // convert to monthly decimal

            // EMI Formula
            $emiAmount = ($amount * $monthlyRate * pow(1 + $monthlyRate, $tenure)) /
                (pow(1 + $monthlyRate, $tenure) - 1);

            $totalAmount = $emiAmount * $tenure; // Total repayment amount
            $emiCount = $tenure; // Total number of EMIs
        }

        if($request->loan_type == 'emi_amount'){
            $emiAmountPre = $request->emi_amount;
            $interest = 0;
            $totalAmount = $amount + $interest;
            $emiCount = $totalAmount/$emiAmountPre;
            $remainingAmount = $totalAmount % $emiAmountPre;
            $emiAmount = $emiAmountPre;
        }




        // Loan Detail
        $loanDetail = new LoanDetail();
        $loanDetail->user_id = $request->user;
        $loanDetail->provider = $request->provider;
        $loanDetail->amount = $amount;
        $loanDetail->emi_amount = round($emiAmount);
        $loanDetail->processing_fee = $processingFee;
        $loanDetail->loan_type = $request->loan_type;
        $loanDetail->interest_rate = $interestRate;
        $loanDetail->emi_count = $emiCount + ($remainingAmount > 0 ? 1 : 0);
        $loanDetail->disbursed_date = $date;
        $loanDetail->status = 'open';
        if($loanDetail->save()){
            $emiDetails = [];
            for ($i=1; $i <= $emiCount ; $i++) {
                // EMI Detail
                $emiDetails[] = [
                    'loan_detail_id' => $loanDetail->id,
                    'transaction_id' => Str::random(10),
                    'amount' => round($emiAmount),
                    'due_date' => Carbon::parse($date)->addMonth($i),
                    'status' => 'pending',
                ];
            }
            EmiDetail::insert($emiDetails);

            if($remainingAmount>0){
                EmiDetail::insert([
                    'loan_detail_id' => $loanDetail->id,
                    'transaction_id' => Str::random(10),
                    'amount' => round($remainingAmount),
                    'due_date' => Carbon::parse($date)->addMonth($emiCount+1),
                    'status' => 'pending',
                ]);
            }
        }

        return redirect()->route('loan-detail.index');



    }

    /**
     * Display the specified resource.
     */
    public function show(LoanDetail $loanDetail)
    {
        $emiDetail = $loanDetail->emiDetail;
        $user = $loanDetail->user;
        return inertia('Show', compact('user', 'loanDetail', 'emiDetail'));
    }
    
    /**
     * Show the form for editing the specified resource.
     */
    public function edit(LoanDetail $loanDetail)
    {
        $emiDetail = $loanDetail->emiDetail->select('id','loan_detail_id', 'amount', 'due_date','status');
        return inertia('Edit', compact('loanDetail', 'emiDetail'));
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(LoanDetailRequest $request, LoanDetail $loanDetail)
    {
        $validatedData = $request->validated();
        try {
            // Update the loan detail with the validated data
            $loanDetail->update($validatedData);

            // Return a success response
            return redirect()->back()->with('success',
                'Loan details updated successfully!'
            );
        } catch (\Exception $e) {
            // Handle exceptions
            return redirect()->back()->with('error', 'An error occurred while updating loan details.');
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(LoanDetail $loanDetail)
    {
        if($loanDetail){
            $loanDetail->emiDetail()->delete();
            $loanDetail->delete();
        }
        return redirect()->route('loan-detail.index');
    }

    public function forecloseLoan(Request $request)
    {
        $loanDetail = LoanDetail::find($request->loan_id);
        // dd($loanDetail);
        if ($loanDetail) {
            $emiDetails = EmiDetail::where('loan_detail_id', $loanDetail->id)
            ->where('status', 'pending')
            ->update(['status' => 'paid']);

            $loanDetail->status = 'closed';
            $loanDetail->save();
        }

        return response()->json(['status' => true, 'message' => 'Loan is foreclosed!']);
    }
}
