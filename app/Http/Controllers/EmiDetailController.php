<?php

namespace App\Http\Controllers;

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

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(EmiDetail $emiDetail)
    {
        //
    }
}
