<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\WalletController;
use App\Http\Controllers\TransferController;
/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!

*/

Route::get('/user', function (Request $request) {
    return $request->user();
});

Route::get('/hola', function(){
    return 'hola desde routes';
});

Route::apiResource('/wallet', App\Http\Controllers\WalletController::class);
Route::apiResource('/transfer', App\Http\Controllers\TransferController::class);
