const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const PORT = 3000;

// Middleware
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Load products
const productsFile = path.join(__dirname, 'data', 'products.json');

// Get all products
app.get('/api/products', (req, res) => {
  fs.readFile(productsFile, 'utf-8', (err, data) => {
    if (err) {
      console.error('Error reading products file:', err);
      return res.status(500).json({ message: 'Failed to load products' });
    }
    res.json(JSON.parse(data));
  });
});

// Add a product
app.post('/api/products', (req, res) => {
  const newProduct = req.body;
  fs.readFile(productsFile, 'utf-8', (err, data) => {
    if (err) {
      console.error('Error reading products file:', err);
      return res.status(500).json({ message: 'Failed to add product' });
    }
    const products = JSON.parse(data);
    products.push(newProduct);
    fs.writeFile(productsFile, JSON.stringify(products, null, 2), err => {
      if (err) {
        console.error('Error writing to products file:', err);
        return res.status(500).json({ message: 'Failed to save product' });
      }
      res.status(201).json({ message: 'Product added successfully', product: newProduct });
    });
  });
});

// Delete a product by ID
app.delete('/api/products/:id', (req, res) => {
  const productId = req.params.id;
  fs.readFile(productsFile, 'utf-8', (err, data) => {
    if (err) {
      console.error('Error reading products file:', err);
      return res.status(500).json({ message: 'Failed to delete product' });
    }
    let products = JSON.parse(data);
    products = products.filter(product => product.id !== productId);
    fs.writeFile(productsFile, JSON.stringify(products, null, 2), err => {
      if (err) {
        console.error('Error writing to products file:', err);
        return res.status(500).json({ message: 'Failed to delete product' });
      }
      res.json({ message: 'Product deleted successfully' });
    });
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
