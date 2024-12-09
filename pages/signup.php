<?php
// Database connection
$host = "localhost";
$dbname = "easy_e"; // Update with your database name
$username = "root"; // Update with your database username
$password = ""; // Update with your database password

try {
    // Establish the database connection
    $conn = new PDO("mysql:host=$host;dbname=$dbname", $username, $password);
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
    die("Connection failed: " . $e->getMessage());
}

// Check if the form is submitted
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $name = $_POST["name"];
    $email = $_POST["email"];
    $password = $_POST["password"];

    // Hash the password for security
    $hashedPassword = password_hash($password, PASSWORD_DEFAULT);

    // Insert user data into the database
    try {
        $stmt = $conn->prepare("INSERT INTO users (name, email, password) VALUES (:name, :email, :password)");
        $stmt->bindParam(':name', $name);
        $stmt->bindParam(':email', $email);
        $stmt->bindParam(':password', $hashedPassword);

        if ($stmt->execute()) {
            header("Location: ../index.php");
            exit();
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