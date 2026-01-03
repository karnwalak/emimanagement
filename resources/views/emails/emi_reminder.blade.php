<!DOCTYPE html>
<html>

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>EMI Payment Reminder</title>
    <style>
        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            background-color: #f4f7ff;
            margin: 0;
            padding: 0;
            color: #333;
        }

        .container {
            max-width: 600px;
            margin: 20px auto;
            background: #ffffff;
            border-radius: 16px;
            overflow: hidden;
            box-shadow: 0 10px 25px rgba(0, 0, 0, 0.05);
        }

        .header {
            background: linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%);
            padding: 40px 20px;
            text-align: center;
            color: #ffffff;
        }

        .header h1 {
            margin: 0;
            font-size: 24px;
            font-weight: 800;
            letter-spacing: -0.5px;
        }

        .header p {
            margin-top: 10px;
            opacity: 0.9;
            font-size: 16px;
        }

        .content {
            padding: 40px 30px;
        }

        .greeting {
            font-size: 18px;
            font-weight: 600;
            margin-bottom: 20px;
        }

        .remind-text {
            line-height: 1.6;
            color: #4b5563;
            margin-bottom: 30px;
        }

        .summary-card {
            background-color: #f9fafb;
            border: 1px solid #e5e7eb;
            border-radius: 12px;
            padding: 25px;
            margin-bottom: 30px;
        }

        .summary-row {
            display: flex;
            justify-content: space-between;
            margin-bottom: 12px;
            border-bottom: 1px solid #f3f4f6;
            padding-bottom: 12px;
        }

        .summary-row:last-child {
            margin-bottom: 0;
            border-bottom: none;
            padding-bottom: 0;
        }

        .label {
            color: #6b7280;
            font-size: 14px;
            font-weight: 500;
        }

        .value {
            color: #111827;
            font-size: 14px;
            font-weight: 700;
        }

        .amount-value {
            color: #4f46e5;
            font-size: 18px;
            font-weight: 800;
        }

        .button-container {
            text-align: center;
            margin-top: 30px;
        }

        .button {
            background: #4f46e5;
            color: #ffffff !important;
            padding: 14px 35px;
            border-radius: 10px;
            text-decoration: none;
            font-weight: 700;
            display: inline-block;
            transition: transform 0.2s;
            box-shadow: 0 4px 15px rgba(79, 70, 229, 0.3);
        }

        .footer {
            background-color: #f9fafb;
            padding: 25px;
            text-align: center;
            font-size: 12px;
            color: #9ca3af;
        }

        .footer p {
            margin: 5px 0;
        }
    </style>
</head>

<body>
    <div class="container">
        <div class="header">
            <div style="display:flex; align-items:center; justify-content:center; gap:12px; margin-bottom:10px;">
                <img src="{{ asset('logo/emipro_logo.png') }}" alt="EMIPro Logo"
                    style="height:42px; width:auto; border-radius:8px; box-shadow: 0 4px 12px rgba(0,0,0,0.15); background-color: rgba(255,255,255,0.15); padding:5px;" />
                <h1 style="margin:0;">EMI Reminder</h1>
            </div>
            <p>Don't miss your upcoming payment!</p>
        </div>
        <div class="content">
            <div class="greeting">Hello {{ $user->name }},</div>
            <div class="remind-text">
                Your monthly installment for your <strong>{{ $emi->loanDetail->provider }}</strong> loan is due soon.
                Maintaining timely payments helps keep your credit score healthy!
            </div>

            <div class="summary-card">
                <div class="summary-row">
                    <span class="label">Provider</span>
                    <span class="value">{{ $emi->loanDetail->provider }}</span>
                </div>
                <div class="summary-row">
                    <span class="label">Due Date</span>
                    <span class="value">{{ \Carbon\Carbon::parse($emi->due_date)->format('M d, Y') }}</span>
                </div>
                <div class="summary-row">
                    <span class="label">Loan Amount</span>
                    <span class="value">₹{{ number_format($emi->loanDetail->amount, 2) }}</span>
                </div>
                <div class="summary-row" style="border-top: 2px solid #e5e7eb; padding-top: 15px; margin-top: 5px;">
                    <span class="label" style="font-size: 16px; color: #111827;">EMI Amount Due</span>
                    <span class="amount-value">₹{{ number_format($emi->amount, 2) }}</span>
                </div>
            </div>

            <div class="button-container">
                <a href="{{ url('/loan-detail/' . $emi->loanDetail->id) }}" class="button">Pay Now</a>
            </div>
        </div>
        <div class="footer">
            <img src="{{ asset('logo/emipro_logo.png') }}" alt="EMIPro Logo"
                style="height:26px; width:auto; opacity:0.9; margin-bottom:10px;" />
            <p>&copy; {{ date('Y') }} EMI Management System. All rights reserved.</p>
            <p>If you have already paid, please ignore this message.</p>
        </div>
    </div>
</body>

</html>