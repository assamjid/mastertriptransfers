<?php
require 'vendor/autoload.php';

\Stripe\Stripe::setApiKey('sk_live_TA_CLE_SECRETE');

// Montant reçu depuis le formulaire
$amount = (int) $_POST['stripe_amount'];

if($amount <= 0){
  die("Montant invalide");
}

$session = \Stripe\Checkout\Session::create([
  'mode' => 'payment',
  'line_items' => [[
    'price_data' => [
      'currency' => 'eur',
      'product_data' => [
        'name' => 'MasterTripTransfers – Réservation',
      ],
      'unit_amount' => $amount,
    ],
    'quantity' => 1,
  ]],
  'success_url' => 'https://tonsite.com/success.html',
  'cancel_url' => 'https://tonsite.com/cancel.html',
]);

header("Location: ".$session->url);
exit;
