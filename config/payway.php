<?php
// config/payway.php
return [
    'api_url' => env('ABA_PAYWAY_API_URL', 'https://checkout-sandbox.payway.com.kh/api/payment-gateway/v1/payments/purchase'),
    'base_api_domain' => env('BASE_API_DOMAIN', 'https://checkout-sandbox.payway.com.kh'),
    // 'api_key' => env('ABA_PAYWAY_API_KEY', 'e72b3ee6918c544f42af460db2ffc9c77d9ca645'),
    // 'merchant_id' => env('ABA_PAYWAY_MERCHANT_ID', 'ec461385'),
    'api_key' => env('ABA_PAYWAY_API_KEY', 'dfdb80b7c2adf6ad2f51e03e0ac29cee440d55e8'),
    'merchant_id' => env('ABA_PAYWAY_MERCHANT_ID', 'ec437721'),
];
