<?php
session_start();
if (!isset($_SESSION['user'])) {
    header("Location: login_signup.php");
    exit;
}
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Welcome - Easy-E</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha3/dist/css/bootstrap.min.css" rel="stylesheet">
</head>
<body>
<div class="container mt-5 text-center">
    <h1>Welcome, <?= htmlspecialchars($_SESSION['user']['name']) ?>!</h1>
    <p><a href="logout.php" class="btn btn-danger">Logout</a></p>
</div>
</body>
</html>
