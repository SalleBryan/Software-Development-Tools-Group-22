<?php
include 'db_config.php';

$error = "";
$success = "";

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    if (isset($_POST['signup'])) {
        // Sign-Up Logic
        $name = $_POST['name'];
        $email = $_POST['email'];
        $password = password_hash($_POST['password'], PASSWORD_DEFAULT);

        $sql = "INSERT INTO users (name, email, password) VALUES (?, ?, ?)";
        $stmt = $conn->prepare($sql);
        $stmt->bind_param("sss", $name, $email, $password);

        if ($stmt->execute()) {
            $success = "Account created successfully. Please log in.";
        } else {
            $error = "Email already exists.";
        }

        $stmt->close();
    } elseif (isset($_POST['login'])) {
        // Login Logic
        $email = $_POST['email'];
        $password = $_POST['password'];

        $sql = "SELECT * FROM users WHERE email = ?";
        $stmt = $conn->prepare($sql);
        $stmt->bind_param("s", $email);
        $stmt->execute();
        $result = $stmt->get_result();

        if ($result->num_rows > 0) {
            $user = $result->fetch_assoc();
            if (password_verify($password, $user['password'])) {
                session_start();
                $_SESSION['user'] = $user;
                header("Location: index.php");
                exit;
            } else {
                $error = "Incorrect password.";
            }
        } else {
            $error = "No account found with this email.";
        }

        $stmt->close();
    }
}
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Login/Sign Up - Easy-E</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha3/dist/css/bootstrap.min.css" rel="stylesheet">
    <link rel="stylesheet" href="styles.css">
</head>
<body>
<div class="container mt-5">
    <div class="row">
        <div class="col-md-6 offset-md-3">
            <div class="card">
                <div class="card-header text-center bg-dark text-white">
                    <h4>Welcome to Easy-E</h4>
                </div>
                <div class="card-body">
                    <?php if ($error): ?>
                        <div class="alert alert-danger"><?= $error ?></div>
                    <?php elseif ($success): ?>
                        <div class="alert alert-success"><?= $success ?></div>
                    <?php endif; ?>

                    <ul class="nav nav-tabs mb-3" id="auth-tabs" role="tablist">
                        <li class="nav-item">
                            <button class="nav-link active" id="login-tab" data-bs-toggle="tab" data-bs-target="#login-form" type="button">Login</button>
                        </li>
                        <li class="nav-item">
                            <button class="nav-link" id="signup-tab" data-bs-toggle="tab" data-bs-target="#signup-form" type="button">Sign Up</button>
                        </li>
                    </ul>

                    <div class="tab-content">
                        <!-- Login Form -->
                        <div class="tab-pane fade show active" id="login-form">
                            <form method="POST">
                                <div class="mb-3">
                                    <label for="login-email" class="form-label">Email</label>
                                    <input type="email" class="form-control" id="login-email" name="email" required>
                                </div>
                                <div class="mb-3">
                                    <label for="login-password" class="form-label">Password</label>
                                    <input type="password" class="form-control" id="login-password" name="password" required>
                                </div>
                                <button type="submit" name="login" class="btn btn-primary w-100">Login</button>
                            </form>
                        </div>

                        <!-- Sign-Up Form -->
                        <div class="tab-pane fade" id="signup-form">
                            <form method="POST">
                                <div class="mb-3">
                                    <label for="signup-name" class="form-label">Name</label>
                                    <input type="text" class="form-control" id="signup-name" name="name" required>
                                </div>
                                <div class="mb-3">
                                    <label for="signup-email" class="form-label">Email</label>
                                    <input type="email" class="form-control" id="signup-email" name="email" required>
                                </div>
                                <div class="mb-3">
                                    <label for="signup-password" class="form-label">Password</label>
                                    <input type="password" class="form-control" id="signup-password" name="password" required>
                                </div>
                                <button type="submit" name="signup" class="btn btn-success w-100">Sign Up</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>

<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha3/dist/js/bootstrap.bundle.min.js"></script>
</body>
</html>
