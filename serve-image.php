<?php
/**
 * TUT STONES - Image Proxy / Server
 *
 * Serves uploaded images from the persistent storage folder located
 * OUTSIDE the git-deployed public_html directory.
 *
 * Usage: serve-image.php?f=img_abc123.jpg
 *
 * This file IS tracked by git and lives inside public_html.
 * The images it serves live in /home/u??????/tutstones_uploads/ (outside git).
 */

// Persistent storage dir - same sibling path used by upload.php
$PERSISTENT_DIR = dirname(__DIR__) . '/tutstones_uploads/';
// Fallback for local development
$LOCAL_DIR      = __DIR__ . '/assets/images/uploads/';

$f = isset($_GET['f']) ? basename($_GET['f']) : '';

// Basic security: only allow safe filenames
if (!$f || !preg_match('/^[a-zA-Z0-9_\-\.]+$/', $f) || strpos($f, '..') !== false) {
    http_response_code(400);
    exit('Invalid filename.');
}

// Find the file in persistent dir first, then local fallback
$filePath = null;
foreach ([$PERSISTENT_DIR . $f, $LOCAL_DIR . $f] as $candidate) {
    if (file_exists($candidate) && is_file($candidate)) {
        $filePath = $candidate;
        break;
    }
}

if (!$filePath) {
    http_response_code(404);
    exit('Image not found.');
}

// Detect MIME type
$ext  = strtolower(pathinfo($filePath, PATHINFO_EXTENSION));
$mime = [
    'jpg'  => 'image/jpeg',
    'jpeg' => 'image/jpeg',
    'png'  => 'image/png',
    'webp' => 'image/webp',
    'gif'  => 'image/gif',
][$ext] ?? 'application/octet-stream';

// Cache headers - images are immutable (unique filenames), cache for 1 year
header('Content-Type: ' . $mime);
header('Content-Length: ' . filesize($filePath));
header('Cache-Control: public, max-age=31536000, immutable');
header('Vary: Accept');

readfile($filePath);
exit;
