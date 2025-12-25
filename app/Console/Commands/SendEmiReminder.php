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
            foreach ($emis as $emi) {
                $user = $emi->loanDetail->user;
                $this->sendReminder($user, $emi);
            }
        }

    }

    protected function sendReminder($user, $emi)
    {
        $user->notify(new EmiReminder($user, $emi));
    }
}
