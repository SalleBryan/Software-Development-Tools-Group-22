<?php
session_start();
session_destroy(); // Destroy all session data
header("Location: index.php"); // Redirect to homepage
exit;
?>
