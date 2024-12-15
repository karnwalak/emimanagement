<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class LoanDetailRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            "provider" =>['required'],
            "amount" =>['required'],
            "processing_fee" =>['required'],
            "interest_rate" =>['required','numeric','min:0','max:100'],
            "tenure" => ['nullable', 'integer', 'required_without:emi_amount'],
            "emi_amount" => ['nullable', 'required_without:tenure'],
            "date" =>['required','date'],
        ];
    }
}
