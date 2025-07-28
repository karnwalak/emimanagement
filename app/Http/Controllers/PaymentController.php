<?php

namespace App\Http\Controllers;

use inertia;
use Razorpay\Api\Api;
use Illuminate\Support\Str;
use Illuminate\Http\Request;

class PaymentController extends Controller
{
    public function createRazorpayOrder(Request $request)
    {
        $api = new Api(env('RAZORPAY_KEY_ID'), env('RAZORPAY_KEY_SECRET'));

        $order = $api->order->create([
            'receipt' => Str::random(20),
            'amount' => $request->amount * 100, // Amount in paise
            'currency' => 'INR',
        ]);

        return response()->json([
            'order_id' => $order['id'],
            'razorpay_key' => env('RAZORPAY_KEY_ID'),
            'amount' => $request->amount,
            'currency' => 'INR',
        ]);
    }

    public function verifyPayment(Request $request)
    {
        $attributes = [
            'razorpay_order_id' => $request->razorpay_order_id,
            'razorpay_payment_id' => $request->razorpay_payment_id,
            'razorpay_signature' => $request->razorpay_signature,
        ];

        $api = new Api(env('RAZORPAY_KEY_ID'), env('RAZORPAY_KEY_SECRET'));
        $isVerified = $api->utility->verifyPaymentSignature($attributes);
        dd($isVerified);
    }
}
