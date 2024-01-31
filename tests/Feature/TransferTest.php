<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use App\Wallet;
use App\Transfer;
use Tests\TestCase;

class TransferTest extends TestCase
{
    /**
     * A basic feature test example.
     */
    
    public function testPostTransfer(): void
    {
        $wallet = factory(Wallet::class)->create();

        $transfer = factory(Transfer::class)->make();

        $response = $this->post('/api/transfer', [
            'description' => $transfer->description,
            'amount' => $transfer->amount,
            'wallet_id' => $wallet->id
        ]);

        $response->assertStatus(201);

        $this->assertDataBaseHas('transfers', [
            'description' => $transfer->description,
            'amount' => $transfer->amount,
            'wallet_id' => $wallet->id
        ]);

        $this->assertDataBaseHas('wallets', [
            'id' => $wallet->id,
            'money' => $wallet->money + $transfer->amount,
            'wallet_id' => $wallet->id
        ]);
    }
}
