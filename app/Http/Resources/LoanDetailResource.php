<?php

namespace App\Http\Resources;

use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class LoanDetailResource extends JsonResource
{
    public static $wrap = false;
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'provider' => $this->provider,
            'amount' => $this->amount,
            'emi_amount' => $this->emi_amount,
            'processing_fee' => $this->processing_fee,
            'interest_rate' => $this->interest_rate,
            'emi_count' => $this->emi_count,
            'disbursed_date' => (new Carbon($this->disbursed_date))->format('Y-m-d'),
            'created_at' => (new Carbon($this->created_at))->format('Y-m-d'),
            'status' => $this->status,
            'user' => new UserResource($this->user),
            'emi_details' => $this->emiDetail,
        ];
    }
}
