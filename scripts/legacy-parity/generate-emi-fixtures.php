<?php

/**
 * Generates ground-truth EMI schedule fixtures from the REAL Laravel code.
 *
 * Run:
 *   php scripts/legacy-parity/generate-emi-fixtures.php
 *
 * Output:
 *   apps/emimanagement-nest/test/fixtures/emi-schedule-parity.json
 *
 * ── Why this exists ──
 *
 * The NestJS rewrite has to reproduce the existing amortization arithmetic
 * exactly before it is allowed to change any of it. Users have real loans with
 * real paid histories; a rounding or date difference silently changes what the
 * app tells them they owe.
 *
 * So the TypeScript engine is tested against these fixtures FIRST, byte for byte.
 * Only once parity is proven do the deliberate fixes get applied — otherwise a
 * fix and a regression look identical.
 *
 * ── Why reflection instead of re-implementing the formula here ──
 *
 * `calculateEmiDetails()` is a private method on LoanDetailController. Copying its
 * body into this script would mean the fixtures encode MY READING of the PHP, and
 * any misreading would be baked into the "ground truth" and faithfully reproduced
 * in TypeScript. Invoking the actual method guarantees the fixtures come from the
 * code that has been running in production.
 */

require __DIR__ . '/../../vendor/autoload.php';

use App\Http\Controllers\LoanDetailController;
use Carbon\Carbon;

// Shortest round-trippable float representation, so a value read back in
// JavaScript is the same double PHP had. Anything else loses precision here
// rather than in the code under test.
ini_set('serialize_precision', '-1');

/**
 * Calls the real private calculateEmiDetails().
 *
 * newInstanceWithoutConstructor() avoids booting the framework — the method
 * touches no container services, only arithmetic.
 */
function callRealCalculator(
    $amount,
    string $loanType,
    $interestRate,
    $tenure = null,
    $emiAmountPre = null
): array {
    static $method = null;
    static $instance = null;

    if ($method === null) {
        $reflection = new ReflectionClass(LoanDetailController::class);
        $instance = $reflection->newInstanceWithoutConstructor();
        $method = $reflection->getMethod('calculateEmiDetails');
        $method->setAccessible(true);
    }

    return $method->invoke($instance, $amount, $loanType, $interestRate, $tenure, $emiAmountPre);
}

/**
 * Reproduces the due-date sequence from createEmiDetails().
 *
 * That method writes to the database, so its date logic is replicated here rather
 * than invoked — it is a single expression: Carbon::parse($date)->addMonth($i)
 * with $i running 1..$emiCount, plus one extra month for a remainder stub.
 *
 * Carbon's addMonth() OVERFLOWS: 31 Jan + 1 month is 3 Mar, not 28 Feb. That is
 * the behaviour being captured, and it is why these fixtures matter.
 */
function realDueDates(string $disbursedDate, int $emiCount, bool $hasRemainder): array
{
    $dates = [];

    for ($i = 1; $i <= $emiCount; $i++) {
        $dates[] = Carbon::parse($disbursedDate)->addMonth($i)->format('Y-m-d');
    }

    if ($hasRemainder) {
        $dates[] = Carbon::parse($disbursedDate)->addMonth($emiCount + 1)->format('Y-m-d');
    }

    return $dates;
}

/**
 * Test inputs.
 *
 * `dates` is set only where the date sequence is the point, or where the schedule
 * is short enough to store — one case generates 100,000 installments.
 */
$cases = [
    // ── tenure mode: ordinary ────────────────────────────────────────────
    ['id' => 'tenure-standard-24m',        'loan_type' => 'tenure', 'amount' => 500000,     'interest_rate' => 10.5,  'tenure' => 24,  'dates' => true],
    ['id' => 'tenure-standard-12m',        'loan_type' => 'tenure', 'amount' => 120000,     'interest_rate' => 11.25, 'tenure' => 12,  'dates' => true],
    ['id' => 'tenure-long-360m',           'loan_type' => 'tenure', 'amount' => 5000000,    'interest_rate' => 8.5,   'tenure' => 360, 'dates' => false],
    ['id' => 'tenure-single-month',        'loan_type' => 'tenure', 'amount' => 10000,      'interest_rate' => 12,    'tenure' => 1,   'dates' => true],
    ['id' => 'tenure-two-months',          'loan_type' => 'tenure', 'amount' => 10000,      'interest_rate' => 12,    'tenure' => 2,   'dates' => true],

    // ── tenure mode: zero and near-zero interest ─────────────────────────
    ['id' => 'tenure-zero-interest',       'loan_type' => 'tenure', 'amount' => 100000,     'interest_rate' => 0,     'tenure' => 12,  'dates' => true],
    ['id' => 'tenure-zero-interest-string','loan_type' => 'tenure', 'amount' => '100000',   'interest_rate' => '0',   'tenure' => '12','dates' => true],
    ['id' => 'tenure-tiny-interest',       'loan_type' => 'tenure', 'amount' => 100000,     'interest_rate' => 0.01,  'tenure' => 12,  'dates' => false],

    // ── tenure mode: awkward numbers ─────────────────────────────────────
    ['id' => 'tenure-repeating-decimal',   'loan_type' => 'tenure', 'amount' => 33333,      'interest_rate' => 7.77,  'tenure' => 17,  'dates' => false],
    ['id' => 'tenure-max-rate-100',        'loan_type' => 'tenure', 'amount' => 50000,      'interest_rate' => 100,   'tenure' => 12,  'dates' => false],
    ['id' => 'tenure-fractional-amount',   'loan_type' => 'tenure', 'amount' => 12345.67,   'interest_rate' => 9.99,  'tenure' => 7,   'dates' => false],
    ['id' => 'tenure-large-amount',        'loan_type' => 'tenure', 'amount' => 9999999.99, 'interest_rate' => 15,    'tenure' => 60,  'dates' => false],
    ['id' => 'tenure-small-amount',        'loan_type' => 'tenure', 'amount' => 1000,       'interest_rate' => 12,    'tenure' => 6,   'dates' => true],

    // ── tenure mode: guard paths (invalid tenure) ────────────────────────
    ['id' => 'tenure-zero',                'loan_type' => 'tenure', 'amount' => 100000,     'interest_rate' => 10,    'tenure' => 0,   'dates' => false],
    ['id' => 'tenure-negative',            'loan_type' => 'tenure', 'amount' => 100000,     'interest_rate' => 10,    'tenure' => -5,  'dates' => false],
    ['id' => 'tenure-null',                'loan_type' => 'tenure', 'amount' => 100000,     'interest_rate' => 10,    'tenure' => null,'dates' => false],

    // ── emi_amount mode ─────────────────────────────────────────────────
    // NOTE: this branch hardcodes $interest = 0, so interest_rate is ignored.
    // The fixtures prove that, rather than assuming it.
    ['id' => 'emi-exact-division',         'loan_type' => 'emi_amount', 'amount' => 100000, 'interest_rate' => 0,  'emi_amount' => 10000,   'dates' => true],
    ['id' => 'emi-with-remainder',         'loan_type' => 'emi_amount', 'amount' => 100000, 'interest_rate' => 0,  'emi_amount' => 7000,    'dates' => true],
    ['id' => 'emi-rate-is-ignored',        'loan_type' => 'emi_amount', 'amount' => 100000, 'interest_rate' => 15, 'emi_amount' => 10000,   'dates' => false],
    ['id' => 'emi-greater-than-principal', 'loan_type' => 'emi_amount', 'amount' => 5000,   'interest_rate' => 0,  'emi_amount' => 10000,   'dates' => false],
    ['id' => 'emi-equals-principal',       'loan_type' => 'emi_amount', 'amount' => 10000,  'interest_rate' => 0,  'emi_amount' => 10000,   'dates' => true],
    ['id' => 'emi-fractional',             'loan_type' => 'emi_amount', 'amount' => 100000, 'interest_rate' => 0,  'emi_amount' => 3333.33, 'dates' => false],
    ['id' => 'emi-tiny-many-installments', 'loan_type' => 'emi_amount', 'amount' => 100000, 'interest_rate' => 0,  'emi_amount' => 1,       'dates' => false],
    ['id' => 'emi-zero-guard',             'loan_type' => 'emi_amount', 'amount' => 100000, 'interest_rate' => 0,  'emi_amount' => 0,       'dates' => false],
    ['id' => 'emi-null-guard',             'loan_type' => 'emi_amount', 'amount' => 100000, 'interest_rate' => 0,  'emi_amount' => null,    'dates' => false],
    ['id' => 'emi-fractional-remainder',   'loan_type' => 'emi_amount', 'amount' => 12345,  'interest_rate' => 0,  'emi_amount' => 1000,    'dates' => true],
];

/**
 * Disbursal dates chosen to expose Carbon's month-overflow behaviour.
 *
 * Existing production loans were all disbursed on day 1, 3 or 6, so none of them
 * hit this — but the engine still has to make a defined choice, and these pin down
 * what the old choice was.
 */
$dateCases = [
    ['id' => 'date-mid-month',        'disbursed' => '2026-01-15', 'count' => 6],
    ['id' => 'date-jan-31',           'disbursed' => '2026-01-31', 'count' => 6],
    ['id' => 'date-jan-30',           'disbursed' => '2026-01-30', 'count' => 4],
    ['id' => 'date-jan-29',           'disbursed' => '2026-01-29', 'count' => 4],
    ['id' => 'date-feb-29-leap',      'disbursed' => '2024-02-29', 'count' => 13],
    ['id' => 'date-feb-28-nonleap',   'disbursed' => '2026-02-28', 'count' => 4],
    ['id' => 'date-dec-31-year-roll', 'disbursed' => '2025-12-31', 'count' => 5],
    ['id' => 'date-mar-31',           'disbursed' => '2026-03-31', 'count' => 4],
    ['id' => 'date-day-1',            'disbursed' => '2026-01-01', 'count' => 4],
];

$fixtures = [
    'generatedBy' => 'scripts/legacy-parity/generate-emi-fixtures.php',
    'source' => [
        'method' => 'App\\Http\\Controllers\\LoanDetailController::calculateEmiDetails (via reflection)',
        'dateLogic' => 'Carbon::parse($date)->addMonth($i), replicated from createEmiDetails()',
        'phpVersion' => PHP_VERSION,
        'carbonVersion' => defined('Carbon\Carbon::VERSION') ? Carbon::VERSION : 'unknown',
    ],
    'calculations' => [],
    'dateSequences' => [],
];

foreach ($cases as $case) {
    $result = callRealCalculator(
        $case['amount'],
        $case['loan_type'],
        $case['interest_rate'],
        $case['tenure'] ?? null,
        $case['emi_amount'] ?? null
    );

    $remaining = $result['remaining_amount'];
    $hasRemainder = $remaining > 0;

    $entry = [
        'id' => $case['id'],
        'input' => [
            'amount' => $case['amount'],
            'loanType' => $case['loan_type'],
            'interestRate' => $case['interest_rate'],
            'tenure' => $case['tenure'] ?? null,
            'emiAmount' => $case['emi_amount'] ?? null,
        ],
        // Raw floats exactly as PHP produced them.
        'raw' => [
            'emiAmount' => $result['emi_amount'],
            'totalAmount' => $result['total_amount'],
            'emiCount' => $result['emi_count'],
            'remainingAmount' => $result['remaining_amount'],
        ],
        // What actually reaches the database: store() does round() on the loan's
        // emi_amount, and emi_count gains 1 when there is a remainder stub.
        'persisted' => [
            'loanEmiAmount' => round($result['emi_amount']),
            'loanEmiCount' => $result['emi_count'] + ($hasRemainder ? 1 : 0),
            'installmentAmount' => round($result['emi_amount']),
            'remainderInstallmentAmount' => $hasRemainder ? round($remaining) : null,
        ],
    ];

    if ($case['dates'] && $result['emi_count'] > 0 && $result['emi_count'] <= 40) {
        $entry['dueDates'] = realDueDates('2026-01-15', (int) $result['emi_count'], $hasRemainder);
        $entry['dueDatesFrom'] = '2026-01-15';
    }

    $fixtures['calculations'][] = $entry;
}

foreach ($dateCases as $case) {
    $fixtures['dateSequences'][] = [
        'id' => $case['id'],
        'disbursedDate' => $case['disbursed'],
        'count' => $case['count'],
        'dueDates' => realDueDates($case['disbursed'], $case['count'], false),
    ];
}

$outputPath = __DIR__ . '/../../apps/emimanagement-nest/test/fixtures/emi-schedule-parity.json';
$outputDir = dirname($outputPath);

if (!is_dir($outputDir)) {
    mkdir($outputDir, 0775, true);
}

file_put_contents(
    $outputPath,
    json_encode($fixtures, JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES | JSON_PRESERVE_ZERO_FRACTION) . "\n"
);

printf(
    "wrote %d calculation fixtures and %d date sequences to:\n  %s\n",
    count($fixtures['calculations']),
    count($fixtures['dateSequences']),
    realpath($outputPath) ?: $outputPath
);

// A short summary so the numbers are visible without opening the JSON.
echo "\nsample:\n";
foreach (array_slice($fixtures['calculations'], 0, 6) as $c) {
    printf(
        "  %-28s emi=%-20s count=%-6s remainder=%s\n",
        $c['id'],
        var_export($c['raw']['emiAmount'], true),
        var_export($c['raw']['emiCount'], true),
        var_export($c['raw']['remainingAmount'], true)
    );
}
