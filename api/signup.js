const mysql = require("mysql2/promise");

module.exports = async (req, res) => {
  if (req.method !== "POST") {
    // Only allow POST requests
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  // Parse incoming request data
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ message: "All fields are required." });
  }

  try {
    // Connect to the database
    const connection = await mysql.createConnection({
      host: "sql8.freesqldatabase.com",
      user: "sql8751506", // Update with your database username
      password: "cMNI2GZdDH", // Update with your database password
      database: "sql8751506", // Update with your database name
      port: 3306, // Default MySQL port
    });

    // Hash the password
    const crypto = require("crypto");
    const hashedPassword = crypto.createHash("sha256").update(password).digest("hex");

    // Insert the user into the database
    const [result] = await connection.execute(
      "INSERT INTO users (name, email, password) VALUES (?, ?, ?)",
      [name, email, hashedPassword]
    );

    // Close the database connection
    await connection.end();

    // Redirect to the external index.html on success
    res.writeHead(302, { Location: "../index.html" });
    res.end();
  } catch (error) {
    // Handle specific errors
    if (error.code === "ER_DUP_ENTRY") {
      return res.status(400).json({ message: "Email already exists. Please use another email." });
    }

    // General error handling
    return res.status(500).json({ message: "An error occurred.", error: error.message });
  }
};
