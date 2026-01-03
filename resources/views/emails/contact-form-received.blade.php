<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Message Received - EMIPro</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
            line-height: 1.6;
            color: #374151;
            background-color: #f9fafb;
            padding: 20px;
        }

        .email-container {
            max-width: 600px;
            margin: 0 auto;
            background-color: #ffffff;
            border-radius: 16px;
            overflow: hidden;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        }

        .header {
            background: linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%);
            padding: 40px 30px;
            text-align: center;
        }

        .logo {
            display: inline-flex;
            align-items: center;
            gap: 8px;
            margin-bottom: 20px;
        }

        .logo-icon {
            width: 40px;
            height: 40px;
            background-color: rgba(255, 255, 255, 0.2);
            border-radius: 12px;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 20px;
        }

        .logo-text {
            font-size: 24px;
            font-weight: 900;
            color: #ffffff;
            text-transform: uppercase;
            letter-spacing: -0.5px;
        }

        .header-title {
            font-size: 28px;
            font-weight: 800;
            color: #ffffff;
            margin-bottom: 10px;
        }

        .header-subtitle {
            font-size: 16px;
            color: rgba(255, 255, 255, 0.9);
        }

        .content {
            padding: 40px 30px;
        }

        .greeting {
            font-size: 18px;
            font-weight: 600;
            color: #111827;
            margin-bottom: 20px;
        }

        .message-box {
            background-color: #f3f4f6;
            border-left: 4px solid #4f46e5;
            padding: 20px;
            border-radius: 8px;
            margin: 25px 0;
        }

        .message-box p {
            margin-bottom: 12px;
            color: #6b7280;
            font-size: 14px;
        }

        .message-box strong {
            color: #111827;
            font-weight: 600;
        }

        .ticket-badge {
            display: inline-block;
            background: linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%);
            color: #ffffff;
            padding: 8px 16px;
            border-radius: 20px;
            font-size: 14px;
            font-weight: 700;
            margin: 20px 0;
        }

        .info-section {
            background-color: #eff6ff;
            border: 1px solid #dbeafe;
            border-radius: 12px;
            padding: 20px;
            margin: 25px 0;
        }

        .info-section h3 {
            font-size: 16px;
            font-weight: 700;
            color: #1e40af;
            margin-bottom: 12px;
        }

        .info-section ul {
            list-style: none;
            padding: 0;
        }

        .info-section li {
            padding: 8px 0;
            color: #1e40af;
            font-size: 14px;
        }

        .info-section li:before {
            content: "✓ ";
            color: #10b981;
            font-weight: bold;
            margin-right: 8px;
        }

        .cta-section {
            text-align: center;
            margin: 30px 0;
        }

        .cta-button {
            display: inline-block;
            background: linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%);
            color: #ffffff;
            text-decoration: none;
            padding: 14px 32px;
            border-radius: 12px;
            font-weight: 700;
            font-size: 16px;
            transition: transform 0.2s;
        }

        .cta-button:hover {
            transform: translateY(-2px);
        }

        .footer {
            background-color: #f9fafb;
            padding: 30px;
            text-align: center;
            border-top: 1px solid #e5e7eb;
        }

        .footer-text {
            font-size: 14px;
            color: #6b7280;
            margin-bottom: 15px;
        }

        .social-links {
            margin: 20px 0;
        }

        .social-links a {
            display: inline-block;
            margin: 0 8px;
            color: #6b7280;
            text-decoration: none;
            font-size: 14px;
        }

        .divider {
            height: 1px;
            background-color: #e5e7eb;
            margin: 25px 0;
        }

        .note {
            background-color: #fef3c7;
            border-left: 4px solid #f59e0b;
            padding: 15px;
            border-radius: 8px;
            margin: 20px 0;
        }

        .note p {
            color: #92400e;
            font-size: 14px;
            margin: 0;
        }

        @media only screen and (max-width: 600px) {
            .email-container {
                border-radius: 0;
            }

            .header,
            .content,
            .footer {
                padding: 25px 20px;
            }

            .header-title {
                font-size: 24px;
            }
        }
    </style>
</head>

<body>
    <div class="email-container">
        <!-- Header -->
        <div class="header">
            <div class="logo" style="justify-content: center;">
                <img src="{{ asset('logo/emipro_logo.png') }}" alt="EMIPro Logo"
                    style="height: 48px; width: auto; border-radius: 8px; box-shadow: 0 4px 12px rgba(0,0,0,0.15); background-color: rgba(255,255,255,0.15); padding: 6px;" />
                <span class="logo-text">EMI<span style="color: #c4b5fd;">Pro</span></span>
            </div>
            <h1 class="header-title">Message Received!</h1>
            <p class="header-subtitle">We'll get back to you soon</p>
        </div>

        <!-- Content -->
        <div class="content">
            <p class="greeting">Hi {{ $contact->name }},</p>

            <p>Thank you for reaching out to EMIPro Support! We've successfully received your message and our team will
                review it shortly.</p>

            <div class="ticket-badge">
                🎫 Ticket ID: #{{ $contact->id }}
            </div>

            <div class="message-box">
                <p><strong>Your Message Summary:</strong></p>
                <p><strong>Subject:</strong> {{ $contact->subject }}</p>
                <p><strong>Message:</strong></p>
                <p style="white-space: pre-wrap;">{{$contact->message}}</p>
            </div>

            <div class="info-section">
                <h3>📋 What Happens Next?</h3>
                <ul>
                    <li>Our support team will review your message within 24 hours</li>
                    <li>You'll receive a response at the email address you provided</li>
                    <li>For urgent matters, we prioritize high-priority tickets</li>
                    <li>You can track your ticket status using the ID above</li>
                </ul>
            </div>

            <div class="note">
                <p><strong>⚠️ Important:</strong> This is an automated message from a no-reply email address. Please do
                    not reply to this email. Our team will respond to your original message directly.</p>
            </div>

            <div class="divider"></div>

            <p style="color: #6b7280; font-size: 14px; margin-top: 20px;">
                In the meantime, you can explore our help center or check out frequently asked questions on our support
                page.
            </p>

            <div class="cta-section">
                <a href="{{ url('/support') }}" class="cta-button">Visit Support Center</a>
            </div>
        </div>

        <!-- Footer -->
        <div class="footer">
            <img src="{{ asset('logo/emipro_logo.png') }}" alt="EMIPro Logo"
                style="height:28px; width:auto; opacity:0.9; margin-bottom:12px;" />
            <p class="footer-text">
                <strong>EMIPro Finance Tracking</strong><br>
                123 Finance Street, Suite 100<br>
                New York, NY 10001
            </p>

            <div class="social-links">
                <a href="#">Privacy Policy</a> •
                <a href="#">Terms of Service</a> •
                <a href="#">Contact Us</a>
            </div>

            <p style="font-size: 12px; color: #9ca3af; margin-top: 15px;">
                © {{ date('Y') }} EMIPro. All rights reserved.<br>
                You're receiving this email because you contacted our support team.
            </p>
        </div>
    </div>
</body>

</html>