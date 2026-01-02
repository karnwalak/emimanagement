<?php

namespace App\Http\Controllers;

use App\Models\ContactForm;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class ContactFormController extends Controller
{
    /**
     * Submit contact form.
     */
    public function submitContactForm(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|max:255',
            'subject' => 'required|string|max:255',
            'message' => 'required|string',
        ]);

        try {
            // Auto-detect priority based on keywords
            $priority = $this->detectPriority($request->subject, $request->message);

            ContactForm::create([
                'name' => $request->name,
                'email' => $request->email,
                'subject' => $request->subject,
                'message' => $request->message,
                'user_id' => auth()->id(), // Capture authenticated user if logged in
                'ip_address' => $request->ip(),
                'user_agent' => $request->userAgent(),
                'priority' => $priority,
                'status' => 'new',
            ]);

            return redirect()->back()->with('success', 'Thank you for contacting us! We have received your message and will get back to you within 24 hours.');
        } catch (\Throwable $th) {
            \Log::error('Contact form submission failed: ' . $th->getMessage());
            return redirect()->back()->with('error', 'Failed to send message. Please try again or contact us directly at support@emipro.com');
        }
    }

    /**
     * Auto-detect priority based on keywords
     */
    private function detectPriority($subject, $message)
    {
        $text = strtolower($subject . ' ' . $message);

        $urgentKeywords = ['urgent', 'emergency', 'critical', 'asap', 'immediately', 'hack', 'breach', 'security'];
        $highKeywords = ['important', 'problem', 'issue', 'error', 'bug', 'broken', 'not working'];

        foreach ($urgentKeywords as $keyword) {
            if (str_contains($text, $keyword)) {
                return 'urgent';
            }
        }

        foreach ($highKeywords as $keyword) {
            if (str_contains($text, $keyword)) {
                return 'high';
            }
        }

        return 'medium';
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
    public function show(ContactForm $contactForm)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(ContactForm $contactForm)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, ContactForm $contactForm)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(ContactForm $contactForm)
    {
        //
    }
}
