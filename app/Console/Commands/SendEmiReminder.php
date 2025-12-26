<?php

namespace App\Console\Commands;

use App\Models\EmiDetail;
use App\Models\User;
use App\Notifications\EmiReminder;
use Illuminate\Console\Command;

class SendEmiReminder extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'send:emi-reminder';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Send EMI Reminder';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        // Get all emis which are due in next 7 days
        $emis = EmiDetail::where('due_date', '>=', now()->subDays(7))->where('due_date', '<=', now()->addDays(7))->get();
        if ($emis->count() > 0) {
            // Send reminder to user for each emi with 10 seconds delay 
            foreach ($emis as $emi) {
                $this->info('Sending reminder for EMI to ' . $emi->loanDetail->user->email);
                $user = $emi->loanDetail->user;
                $this->sendReminder($user, $emi);
                sleep(10);
            }
        }

    }

    protected function sendReminder($user, $emi)
    {
        $user->notify(new EmiReminder($user, $emi));
    }
}
