<?php
/**
 * TUT STONES - Server-Side Data Persistence API
 *
 * GET  /api.php  → Returns the saved data.json content (public read)
 * POST /api.php  → Saves JSON body to data.json (requires X-Api-Key header)
 *
 * Deploy this file to the root of your Hostinger site alongside index.html.
 */

// --- CORS & Response Headers ---
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, X-Api-Key');
header('Content-Type: application/json; charset=utf-8');
header('Cache-Control: no-cache, no-store, must-revalidate');

// --- Config ---
$DATA_FILE = __DIR__ . '/data.json';
$API_KEY   = 'tutstones_api_key_2026';   // Change this to something secret after first deploy

// --- OPTIONS preflight (CORS) ---
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(204);
    exit;
}

// --- GET: Load stored data ---
if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    if (file_exists($DATA_FILE)) {
        echo file_get_contents($DATA_FILE);
    } else {
        http_response_code(404);
        echo json_encode(['error' => 'No saved data found. Admin has not saved yet.']);
    }
    exit;
}

// --- POST: Save new data ---
if ($_SERVER['REQUEST_METHOD'] === 'POST') {

    // Verify API key
    $receivedKey = isset($_SERVER['HTTP_X_API_KEY']) ? trim($_SERVER['HTTP_X_API_KEY']) : '';
    if ($receivedKey !== $API_KEY) {
        http_response_code(403);
        echo json_encode(['success' => false, 'message' => 'Unauthorized: Invalid API key.']);
        exit;
    }

    // Read body
    $body    = file_get_contents('php://input');
    $trimmed = trim($body);

    // Basic JSON object validation
    if (empty($trimmed) || $trimmed[0] !== '{' || $trimmed[strlen($trimmed) - 1] !== '}') {
        http_response_code(400);
        echo json_encode(['success' => false, 'message' => 'Invalid request: body must be a JSON object.']);
        exit;
    }

    // Write to data.json
    $written = file_put_contents($DATA_FILE, $trimmed, LOCK_EX);

    if ($written !== false) {
        echo json_encode([
            'success' => true,
            'message' => 'Data saved successfully.',
            'bytes'   => $written
        ]);
    } else {
        http_response_code(500);
        echo json_encode([
            'success' => false,
            'message' => 'Server error: Could not write data.json. Check file permissions on Hostinger.'
        ]);
    }
    exit;
}

// --- Method not allowed ---
http_response_code(405);
echo json_encode(['error' => 'Method not allowed.']);
