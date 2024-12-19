const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3000;

// Middleware
app.use(express.json());
app.use(express.static('public'));

// Serve homepage
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/homepage.html'));
});

// API Routes
const productsFile = './data/products.json';

// Get all products
app.get('/api/products', (req, res) => {
    fs.readFile(productsFile, (err, data) => {
        if (err) {
            return res.status(500).send({ error: 'Failed to load products' });
        }
        res.json(JSON.parse(data));
    });
});

// Add a new product
app.post('/api/products', (req, res) => {
    const newProduct = req.body;

    fs.readFile(productsFile, (err, data) => {
        if (err) {
            return res.status(500).send({ error: 'Failed to load products' });
        }
        const products = JSON.parse(data);
        products.push(newProduct);

        fs.writeFile(productsFile, JSON.stringify(products, null, 2), (err) => {
            if (err) {
                return res.status(500).send({ error: 'Failed to save product' });
            }
            res.status(201).send({ message: 'Product added successfully' });
        });
    });
});

// Delete a product by ID
app.delete('/api/products/:id', (req, res) => {
    const productId = req.params.id;

    fs.readFile(productsFile, (err, data) => {
        if (err) {
            return res.status(500).send({ error: 'Failed to load products' });
        }
        let products = JSON.parse(data);
        products = products.filter(product => product.id !== productId);

        fs.writeFile(productsFile, JSON.stringify(products, null, 2), (err) => {
            if (err) {
                return res.status(500).send({ error: 'Failed to save products' });
            }
            res.send({ message: 'Product deleted successfully' });
        });
    });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
