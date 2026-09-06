$port = 8080
$listener = New-Object System.Net.HttpListener
$listener.Prefixes.Add("http://localhost:$port/")
$listener.Start()
Write-Host "Server running at http://localhost:$port/"

$root = (Get-Location).Path
$dataFile = [System.IO.Path]::Combine($root, "data.json")

while ($listener.IsListening) {
    try {
        $context = $listener.GetContext()
        $request = $context.Request
        $response = $context.Response

        # CORS headers for local dev
        $response.Headers.Add("Access-Control-Allow-Origin", "*")
        $response.Headers.Add("Access-Control-Allow-Methods", "GET, POST, OPTIONS")
        $response.Headers.Add("Access-Control-Allow-Headers", "Content-Type")

        $rawPath = [System.Uri]::UnescapeDataString($request.Url.LocalPath)

        # --- API: OPTIONS preflight ---
        if ($request.HttpMethod -eq "OPTIONS") {
            $response.StatusCode = 204
            $response.Close()
            continue
        }

        # --- API: POST /api/save-data ---
        if ($rawPath -eq "/api/save-data" -and $request.HttpMethod -eq "POST") {
            try {
                $reader = New-Object System.IO.StreamReader($request.InputStream, [System.Text.Encoding]::UTF8)
                $body = $reader.ReadToEnd()
                $reader.Close()

                # Basic validation: must start with { and end with } (JSON object)
                $trimmed = $body.Trim()
                if (-not ($trimmed.StartsWith('{') -and $trimmed.EndsWith('}'))) {
                    throw "Invalid JSON: body must be a JSON object"
                }

                # Write to data.json
                [System.IO.File]::WriteAllText($dataFile, $trimmed, [System.Text.Encoding]::UTF8)

                $responseJson = '{"success":true,"message":"Data saved successfully."}'
                $buffer = [System.Text.Encoding]::UTF8.GetBytes($responseJson)
                $response.ContentType = "application/json; charset=utf-8"
                $response.StatusCode = 200
                $response.ContentLength64 = $buffer.Length
                $response.OutputStream.Write($buffer, 0, $buffer.Length)
            } catch {
                $errMsg = $_.Exception.Message -replace '"', '\"'
                $errJson = "{`"success`":false,`"message`":`"$errMsg`"}"
                $buffer = [System.Text.Encoding]::UTF8.GetBytes($errJson)
                $response.ContentType = "application/json; charset=utf-8"
                $response.StatusCode = 500
                $response.ContentLength64 = $buffer.Length
                $response.OutputStream.Write($buffer, 0, $buffer.Length)
            }
            $response.Close()
            continue
        }


        # --- API: GET /api/load-data ---
        if ($rawPath -eq "/api/load-data" -and $request.HttpMethod -eq "GET") {
            if (Test-Path $dataFile -PathType Leaf) {
                $json = [System.IO.File]::ReadAllText($dataFile, [System.Text.Encoding]::UTF8)
                $buffer = [System.Text.Encoding]::UTF8.GetBytes($json)
                $response.ContentType = "application/json; charset=utf-8"
                $response.StatusCode = 200
                $response.ContentLength64 = $buffer.Length
                $response.OutputStream.Write($buffer, 0, $buffer.Length)
            } else {
                $buffer = [System.Text.Encoding]::UTF8.GetBytes("{}")
                $response.ContentType = "application/json; charset=utf-8"
                $response.StatusCode = 404
                $response.ContentLength64 = $buffer.Length
                $response.OutputStream.Write($buffer, 0, $buffer.Length)
            }
            $response.Close()
            continue
        }

        # --- Static File Serving ---
        if ($rawPath -eq "/") { $rawPath = "/index.html" }

        $filePath = [System.IO.Path]::Combine($root, $rawPath.TrimStart('/').Replace('/', '\'))

        if (Test-Path $filePath -PathType Leaf) {
            $ext = [System.IO.Path]::GetExtension($filePath).ToLower()
            $mime = switch ($ext) {
                ".html" { "text/html; charset=utf-8" }
                ".css"  { "text/css; charset=utf-8" }
                ".js"   { "application/javascript; charset=utf-8" }
                ".png"  { "image/png" }
                ".jpg"  { "image/jpeg" }
                ".jpeg" { "image/jpeg" }
                ".webp" { "image/webp" }
                ".svg"  { "image/svg+xml" }
                ".json" { "application/json; charset=utf-8" }
                default { "application/octet-stream" }
            }
            $response.ContentType = $mime

            $fileStream = [System.IO.File]::OpenRead($filePath)
            $response.ContentLength64 = $fileStream.Length
            $fileStream.CopyTo($response.OutputStream)
            $fileStream.Close()
        } else {
            $response.StatusCode = 404
            $buffer = [System.Text.Encoding]::UTF8.GetBytes("404 Not Found")
            $response.ContentLength64 = $buffer.Length
            $response.OutputStream.Write($buffer, 0, $buffer.Length)
        }
        $response.Close()
    } catch {
        # ignore broken pipe or stream closed errors and keep serving
    }
}
