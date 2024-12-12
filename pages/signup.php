<?php
// Database connection
$host = "sql8.freesqldatabase.com";
$dbname = "sql8751506"; // Update with your database name
$username = "sql8751506"; // Update with your database username
$password = "cMNI2GZdDH"; // Update with your database password

try {
    $conn = new PDO("mysql:host=$host;dbname=$dbname", $username, $password);
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
    die("Connection failed: " . $e->getMessage());
}

// Check if the form is submitted
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $email = $_POST["email"];
    $password = $_POST["password"];

    // Hash the password
    $hashedPassword = password_hash($password, PASSWORD_DEFAULT);

    // Insert user data into the database
    try {
        $stmt = $conn->prepare("INSERT INTO users (email, password) VALUES (:email, :password)");
        $stmt->bindParam(':email', $email);
        $stmt->bindParam(':password', $hashedPassword);

        if ($stmt->execute()) {
            echo "<script>
                alert('Signup successful! Redirecting to homepage.');
                window.location.href = 'homepage.html';
                </script>";
        } else {
            echo "<script>
                alert('Signup failed. Please try again.');
                window.location.href = 'signup.html';
                </script>";
        }
    } catch (PDOException $e) {
        if ($e->getCode() == 23000) { // Duplicate entry error code
            echo "<script>
                alert('Email already exists. Please use another email.');
                window.location.href = 'signup.html';
                </script>";
        } else {
            die("Error: " . $e->getMessage());
        }
    }
}
?>
