<?php
// Enable error reporting for debugging
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

// Set headers to allow cross-origin requests if needed
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');

// Function to sanitize input data
function sanitizeInput($data) {
    $data = trim($data);
    $data = stripslashes($data);
    $data = htmlspecialchars($data);
    return $data;
}

// Initialize response array
$response = [
    'success' => false,
    'message' => '',
    'errors' => []
];

// Check if the form was submitted
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Get and sanitize form data
    $name = isset($_POST['name']) ? sanitizeInput($_POST['name']) : '';
    $email = isset($_POST['email']) ? sanitizeInput($_POST['email']) : '';
    $subject = isset($_POST['subject']) ? sanitizeInput($_POST['subject']) : '';
    $message = isset($_POST['message']) ? sanitizeInput($_POST['message']) : '';
    
    // Validate inputs
    $errors = [];
    
    if (empty($name)) {
        $errors['name'] = 'Name is required';
    }
    
    if (empty($email)) {
        $errors['email'] = 'Email is required';
    } elseif (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        $errors['email'] = 'Invalid email format';
    }
    
    if (empty($subject)) {
        $errors['subject'] = 'Subject is required';
    }
    
    if (empty($message)) {
        $errors['message'] = 'Message is required';
    }
    
    // If no validation errors, proceed to send email
    if (empty($errors)) {
        // Set recipient email (replace with your email)
        $to = 'info@novustudios.co.ke';
        
        // Set email headers
        $headers = "From: $name <$email>\r\n";
        $headers .= "Reply-To: $email\r\n";
        $headers .= "MIME-Version: 1.0\r\n";
        $headers .= "Content-Type: text/html; charset=UTF-8\r\n";
        
        // Create email body
        $email_body = "
        <html>
        <head>
            <title>New Contact Form Submission</title>
            <style>
                body { font-family: Arial, sans-serif; line-height: 1.6; }
                .container { max-width: 600px; margin: 0 auto; padding: 20px; }
                .header { background-color: #6366f1; color: white; padding: 15px; text-align: center; }
                .content { padding: 20px; border: 1px solid #e0e0e0; border-top: none; }
                .field { margin-bottom: 15px; }
                .field-label { font-weight: bold; color: #555; }
            </style>
        </head>
        <body>
            <div class='container'>
                <div class='header'>
                    <h2>New Contact Form Submission</h2>
                </div>
                <div class='content'>
                    <div class='field'><span class='field-label'>Name:</span> $name</div>
                    <div class='field'><span class='field-label'>Email:</span> <a href='mailto:$email'>$email</a></div>
                    <div class='field'><span class='field-label'>Subject:</span> $subject</div>
                    <div class='field'><span class='field-label'>Message:</span><br>" . nl2br($message) . "</div>
                </div>
            </div>
        </body>
        </html>";
        
        // Send email
        $mail_sent = mail($to, $subject, $email_body, $headers);
        
        if ($mail_sent) {
            $response['success'] = true;
            $response['message'] = 'Thank you for your message! We will get back to you soon.';
        } else {
            $response['message'] = 'Failed to send email. Please try again later.';
            $response['mail_error'] = error_get_last()['message'] ?? 'Unknown error';
        }
    } else {
        // Validation errors occurred
        $response['message'] = 'Please correct the following errors:';
        $response['errors'] = $errors;
    }
} else {
    $response['message'] = 'Invalid request method.';
}

// Return JSON response
header('Content-Type: application/json');
echo json_encode($response);
?>
