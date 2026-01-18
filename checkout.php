<?php
require 'vendor/autoload.php';

\Stripe\Stripe::setApiKey(getenv('STRIPE_SECRET_KEY'));

if (!isset($_POST['stripe_amount'])) {
  die("Requête invalide");
}

$amount = (int) $_POST['stripe_amount'];

if ($amount <= 0) {
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
  'success_url' => 'https://mastertriptransfers.com/?payment=success',
  'cancel_url'  => 'https://mastertriptransfers.com/?payment=cancel',
]);

header("Location: " . $session->url);
exit;
