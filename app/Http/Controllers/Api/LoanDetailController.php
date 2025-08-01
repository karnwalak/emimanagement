<?php

namespace App\Http\Controllers\Api;

use App\Models\LoanDetail;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;

class LoanDetailController extends Controller
{
    public function index(Request $request){
        /*get the limit of inputs*/
        $limit = $request->input('length');

        /*get the starts from length*/
        $start = $request->input('start') ?? 0;
        /*get the search value*/
        $searchValue = $request->input('search.value');

        $totalData = 0;
        $totalFiltered = 0;

        $LoanDetailQuery = LoanDetail::with('emiDetail')
        ->when($searchValue, function ($query, $searchValue) {
            return $query->where(function ($q) use ($searchValue) {
                $q->where('provider', 'like', '%' . $searchValue . '%')
                    ->orWhere('amount', 'like', '%' . $searchValue . '%')
                    ->orWhere('emi_amount', 'like', '%' . $searchValue . '%')
                    ->orWhere('processing_fee', 'like', '%' . $searchValue . '%')
                    ->orWhere('interest_rate', 'like', '%' . $searchValue . '%')
                    ->orWhere('emi_count', 'like', '%' . $searchValue . '%')
                    ->orWhere('disbursed_date', 'like', '%' . $searchValue . '%')
                    ->orWhere('status', 'like', '%' . $searchValue . '%');
            });
        })
        ->where('user_id',Auth::user()->id);
        $sortField = request('sort_field','created_at');
        $sortDirection = request('sort_direction', 'desc');
        if(request('name')){
            $LoanDetailQuery->where('name','like','%'.request('name').'%');
        }
        if(request('status')){
            $LoanDetailQuery->where('status',request('status'));
        }
        $LoanDetails = $LoanDetailQuery->orderBy($sortField,$sortDirection);

        $totalFiltered = $LoanDetailQuery->get()->count();

        if ($limit) {
            $loanDetailsData = $LoanDetails->offset($start)->limit($limit)->get();
        } else {
            $loanDetailsData = $LoanDetails->get();
        }

        $totalData = $LoanDetails->count();
        $list = [
            "draw" => intval($request->input('draw')),
            "recordsTotal" => $totalData,
            "recordsFiltered" => $totalFiltered,
            "success" => true,
            'data' =>  $loanDetailsData,
        ];

        return response()->json($list, 200);
    }
}
