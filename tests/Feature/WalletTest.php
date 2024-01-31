<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use App\Wallet;
use App\Transfer;
use Tests\TestCase;

class WalletTest extends TestCase
{
    /**
     * A basic feature test example.
     */
    public function testGetWallet(): void
    {
        $wallet = factory(Wallet::class)->create();
        $transfers = factory(Transfer::class, 3)->create([
            'wallet_id' => $wallet->id
        ]);
        $response = $this->get('/api/wallet');
        $response->assertStatus(200);

        $this->assertCount(3, $response->json()['transfers']);
    }
}
