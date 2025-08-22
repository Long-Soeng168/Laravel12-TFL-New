<?php

use App\Http\Controllers\ABAPaymentController;
use App\Http\Controllers\StreamFileController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

// Default Homepage
Route::get('/', function () {
   // return Inertia::render('LaravelDefaultPage');
   return redirect('/dashboard');
})->name('home');

// Switch Language
Route::get('/lang/{locale}', function ($locale) {
   if (!in_array($locale, ['en', 'kh'])) {
      abort(404);
   }
   session(['locale' => $locale]);
   return redirect()->back();
});

// Stream File
Route::get('show_pdf_file/{path}', [StreamFileController::class, 'streamPdf'])->where('path', '.*');

// ========= Client =========
require __DIR__ . '/nokor_tech.php';



// ========= Admin =========
require __DIR__ . '/settings.php';
require __DIR__ . '/auth.php';

require __DIR__ . '/user-dashboard.php';
require __DIR__ . '/admin.php';

require __DIR__ . '/file_manager.php';
require __DIR__ . '/order.php';


// ========= Telegram Testing Route =========
require __DIR__ . '/telegram.php';




// ========= Pay Pal Route =========
Route::get('/paypal_payment', '\App\Http\Controllers\PayPalController@index')->middleware('auth');
Route::get('/create/{amount}', '\App\Http\Controllers\PayPalController@create');
Route::post('/complete', '\App\Http\Controllers\PayPalController@complete');

// Stripe Payment Route
Route::get('/test_stripe', 'App\Http\Controllers\StripeController@checkout')->name('checkout');
Route::get('/test', 'App\Http\Controllers\StripeController@test');
Route::post('/live', 'App\Http\Controllers\StripeController@live');
Route::get('/success/{id}', 'App\Http\Controllers\StripeController@success')->name('success');

// ABA Payemnt Route
Route::get('/normal_blade', function () {
   return view('normalblade');
});

Route::get('/pdf_viewer', function () {
   return view('pdf_viewer');
});
Route::get('/payment', function () {
   return Inertia::render('ABAPaymentPage');
});
Route::get('/bakong', function () {
   return view('bakong', [
      'order_number' => '7777', // dynamic or from session/cart
   ]);
});
Route::get('/paymentBakong/success', function () {
   return view('bakong_success');
});
