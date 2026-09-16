<?php
// send_mail.php

header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['error' => 'Method not allowed']);
    exit;
}

// Get JSON data
$data = json_decode(file_get_contents('php://input'), true);

$name = trim($data['name'] ?? '');
$email = filter_var($data['email'] ?? '', FILTER_VALIDATE_EMAIL);
$phone = trim($data['phone'] ?? '');
$country = trim($data['country'] ?? '');
$material = trim($data['material'] ?? '');
$message = trim($data['message'] ?? '');

if (!$name || !$email || !$message) {
    http_response_code(400);
    echo json_encode(['error' => 'Name, valid email, and message are required.']);
    exit;
}

$to = 'sales@tutstones.com';
$subject = 'New Export Inquiry from ' . $name;

$emailBody = "You have received a new export inquiry from your website.\n\n";
$emailBody .= "Name: $name\n";
$emailBody .= "Email: $email\n";
$emailBody .= "Phone/WhatsApp: $phone\n";
$emailBody .= "Destination Country: $country\n";
$emailBody .= "Material Interest: $material\n\n";
$emailBody .= "Message / Project Details:\n$message\n";

// Use a generic server email for From to avoid spam filters, and use the user's email for Reply-To
$headers = "From: noreply@tutstones.com\r\n";
$headers .= "Reply-To: $email\r\n";
$headers .= "X-Mailer: PHP/" . phpversion();

if (mail($to, $subject, $emailBody, $headers)) {
    echo json_encode(['success' => true]);
} else {
    http_response_code(500);
    echo json_encode(['error' => 'Failed to send email. Please check server configuration.']);
}
