<?php
/**
 * TUT STONES - Server-Side Image Upload & Delete API
 *
 * POST /upload.php   → Uploads an image file to assets/images/uploads/
 * DELETE /upload.php → Deletes an image file from assets/images/uploads/
 */

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, X-Api-Key');
header('Content-Type: application/json; charset=utf-8');

$API_KEY = 'tutstones_api_key_2026'; // Must match admin.js and api.php
$UPLOAD_DIR = __DIR__ . '/assets/images/uploads/';
$RELATIVE_PATH = 'assets/images/uploads/';

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

    $fileTmpPath = $_FILES['image']['tmp_name'];
    $fileName = $_FILES['image']['name'];
    $fileExtension = strtolower(pathinfo($fileName, PATHINFO_EXTENSION));

    $allowedExtensions = ['jpg', 'jpeg', 'png', 'webp', 'gif'];
    if (!in_array($fileExtension, $allowedExtensions)) {
        http_response_code(400);
        echo json_encode(['success' => false, 'message' => 'Invalid file type.']);
        exit;
    }

    // Generate unique filename to avoid collisions
    $newFileName = uniqid('img_', true) . '.' . $fileExtension;
    $destPath = $UPLOAD_DIR . $newFileName;

    if (move_uploaded_file($fileTmpPath, $destPath)) {
        echo json_encode([
            'success' => true,
            'url' => $RELATIVE_PATH . $newFileName
        ]);
    } else {
        http_response_code(500);
        echo json_encode(['success' => false, 'message' => 'Failed to move uploaded file.']);
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
    
    // Safety check: Only allow deleting files inside our uploads folder
    if (strpos($urlToDelete, $RELATIVE_PATH) !== 0) {
        http_response_code(400);
        echo json_encode(['success' => false, 'message' => 'Cannot delete files outside of uploads directory.']);
        exit;
    }

    $fileName = basename($urlToDelete);
    $filePath = $UPLOAD_DIR . $fileName;

    if (file_exists($filePath)) {
        if (unlink($filePath)) {
            echo json_encode(['success' => true, 'message' => 'File deleted successfully.']);
        } else {
            http_response_code(500);
            echo json_encode(['success' => false, 'message' => 'Failed to delete file. Check permissions.']);
        }
    } else {
        echo json_encode(['success' => true, 'message' => 'File already deleted or not found.']);
    }
    exit;
}

http_response_code(405);
echo json_encode(['error' => 'Method not allowed.']);
