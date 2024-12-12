<?php
// Database connection
$host = "localhost";
$dbname = "easy_e"; 
$username = "root";
$password = "";

try {
    $conn = new PDO("mysql:host=$host;dbname=$dbname", $username, $password);
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
    die("Connection failed: " . $e->getMessage());
}

if ($_SERVER["REQUEST_METHOD"] === "POST") {
    $email = $_POST["email"];
    $password = $_POST["password"];

    try {
        $stmt = $conn->prepare("SELECT * FROM users WHERE email = :email LIMIT 1");
        $stmt->bindParam(":email", $email);
        $stmt->execute();
        $user = $stmt->fetch(PDO::FETCH_ASSOC);

        if ($user && password_verify($password, $user["password"])) {
            // Redirect on successful login
            header("Location: ../index.php");
            exit();
        } else {
            echo "<script>
                alert('Invalid email or password.');
                window.location.href = 'login.html';
                </script>";
        }
    } catch (PDOException $e) {
        echo "Error: " . $e->getMessage();
    }
}
?>
