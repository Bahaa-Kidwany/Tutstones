<?php
/**
 * TUT STONES - Server-Side Image Upload & Delete API
 *
 * POST   /upload.php -> Uploads an image to a persistent folder OUTSIDE the git deploy directory.
 * DELETE /upload.php -> Deletes an image from the persistent uploads folder.
 *
 * WHY OUTSIDE GIT DIRECTORY:
 *   Hostinger's auto-deploy syncs the git repo to public_html and removes any file
 *   not tracked in git. By storing uploads one level above public_html (in a
 *   sibling folder), they survive every git push forever.
 *
 * FOLDER STRUCTURE ON HOSTINGER:
 *   /home/u??????/public_html/          <- git-deployed (this file lives here)
 *   /home/u??????/tutstones_uploads/    <- persistent uploads (never touched by git)
 *
 * URLs returned to the browser use serve-image.php as a proxy:
 *   serve-image.php?f=filename.jpg
 *   (serve-image.php reads from tutstones_uploads/ and streams the file)
 * 
 */

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, X-Api-Key');
header('Content-Type: application/json; charset=utf-8');

$API_KEY = 'tutstones_api_key_2026';

// Try sibling-folder strategy first (outside public_html), fall back to local uploads/
// This ensures the site works both on Hostinger and on local development
$PERSISTENT_DIR = dirname(__DIR__) . '/tutstones_uploads/';
$LOCAL_DIR      = __DIR__ . '/assets/images/uploads/';

// Use persistent dir if we can write to it (or create it), otherwise fall back to local
if (!is_dir($PERSISTENT_DIR)) {
    @mkdir($PERSISTENT_DIR, 0755, true);
}
$USE_PERSISTENT = is_dir($PERSISTENT_DIR) && is_writable($PERSISTENT_DIR);
$UPLOAD_DIR     = $USE_PERSISTENT ? $PERSISTENT_DIR : $LOCAL_DIR;

// URL prefix that clients use to access the file.
// serve-image.php proxies persistent files; local files use the direct path.
$URL_PREFIX = $USE_PERSISTENT ? 'serve-image.php?f=' : 'assets/images/uploads/';

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(204);
    exit;
}

// Verify API Key
$receivedKey = isset($_SERVER['HTTP_X_API_KEY']) ? trim($_SERVER['HTTP_X_API_KEY']) : '';
if ($receivedKey !== $API_KEY) {
    http_response_code(403);
    echo json_encode(['success' => false, 'message' => 'Unauthorized: Invalid API key.']);
    exit;
}

// Ensure upload directory exists
if (!is_dir($UPLOAD_DIR)) {
    mkdir($UPLOAD_DIR, 0755, true);
}

// --- POST: Handle File Upload ---
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    if (!isset($_FILES['image']) || $_FILES['image']['error'] !== UPLOAD_ERR_OK) {
        http_response_code(400);
        echo json_encode(['success' => false, 'message' => 'No file uploaded or upload error.']);
        exit;
    }

    $fileTmpPath   = $_FILES['image']['tmp_name'];
    $fileName      = $_FILES['image']['name'];
    $fileExtension = strtolower(pathinfo($fileName, PATHINFO_EXTENSION));

    $allowedExtensions = ['jpg', 'jpeg', 'png', 'webp', 'gif'];
    if (!in_array($fileExtension, $allowedExtensions)) {
        http_response_code(400);
        echo json_encode(['success' => false, 'message' => 'Invalid file type.']);
        exit;
    }

    $newFileName = uniqid('img_', true) . '.' . $fileExtension;
    $destPath    = $UPLOAD_DIR . $newFileName;

    if (move_uploaded_file($fileTmpPath, $destPath)) {
        echo json_encode([
            'success' => true,
            'url'     => $URL_PREFIX . $newFileName
        ]);
    } else {
        http_response_code(500);
        echo json_encode(['success' => false, 'message' => 'Failed to move uploaded file. Check server permissions for: ' . $UPLOAD_DIR]);
    }
    exit;
}

// --- DELETE: Handle File Removal ---
if ($_SERVER['REQUEST_METHOD'] === 'DELETE') {
    $data = json_decode(file_get_contents('php://input'), true);
    if (!isset($data['url'])) {
        http_response_code(400);
        echo json_encode(['success' => false, 'message' => 'Missing url parameter.']);
        exit;
    }

    $urlToDelete = $data['url'];
    $fileName    = null;

    if (strpos($urlToDelete, 'serve-image.php?f=') !== false) {
        parse_str(parse_url($urlToDelete, PHP_URL_QUERY), $qs);
        $fileName = isset($qs['f']) ? basename($qs['f']) : null;
    } elseif (strpos($urlToDelete, 'assets/images/uploads/') !== false) {
        $fileName = basename($urlToDelete);
    }

    if (!$fileName || strpos($fileName, '..') !== false) {
        http_response_code(400);
        echo json_encode(['success' => false, 'message' => 'Invalid file reference.']);
        exit;
    }

    // Try both locations
    $deleted = false;
    foreach ([$PERSISTENT_DIR . $fileName, $LOCAL_DIR . $fileName] as $filePath) {
        if (file_exists($filePath)) {
            $deleted = @unlink($filePath);
            break;
        }
    }

    echo json_encode(['success' => true, 'message' => $deleted ? 'File deleted.' : 'File not found (already deleted).']);
    exit;
}

http_response_code(405);
echo json_encode(['error' => 'Method not allowed.']);
