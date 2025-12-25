<?php

namespace App\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class EmiReminder extends Notification
{
    use Queueable;

    public $user;
    public $emi;

    /**
     * Create a new notification instance.
     */
    public function __construct($user, $emi)
    {
        $this->user = $user;
        $this->emi = $emi;
    }

    /**
     * Get the notification's delivery channels.
     *
     * @return array<int, string>
     */
    public function via(object $notifiable): array
    {
        return ['mail'];
    }

    /**
     * Get the mail representation of the notification.
     */
    public function toMail(object $notifiable): MailMessage
    {
        return (new MailMessage)
            ->subject('EMI Payment Reminder: ' . $this->emi->loanDetail->provider)
            ->view('emails.emi_reminder', [
                'user' => $this->user,
                'emi' => $this->emi,
            ]);
    }

    /**
     * Get the array representation of the notification.
     *
     * @return array<string, mixed>
     */
    public function toArray(object $notifiable): array
    {
        return [
            //
        ];
    }
}
