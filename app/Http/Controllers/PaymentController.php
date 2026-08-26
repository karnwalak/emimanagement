<?php

namespace App\Http\Controllers;

use inertia;
use Razorpay\Api\Api;
use Illuminate\Support\Str;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Razorpay\Api\Errors\SignatureVerificationError;

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

        try {
            $api->utility->verifyPaymentSignature($attributes);
        } catch (SignatureVerificationError $e) {
            // A forged or tampered signature throws here — this is the
            // expected outcome for a bad/faked payment, not a server error,
            // so it must not surface as an unhandled 500.
            Log::warning('Razorpay signature verification failed', [
                'razorpay_order_id' => $attributes['razorpay_order_id'],
                'razorpay_payment_id' => $attributes['razorpay_payment_id'],
                'error' => $e->getMessage(),
            ]);

            return response()->json([
                'status' => false,
                'message' => 'Payment verification failed.',
            ], 400);
        }

        return response()->json([
            'status' => true,
            'message' => 'Payment verified successfully.',
        ]);
    }
}
