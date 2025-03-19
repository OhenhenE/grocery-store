import pg from 'pg';

import dotenv from 'dotenv';
import cors from 'cors';
import express from 'express';
import { promises as fs } from 'fs';

dotenv.config();

const app = express();
app.use(cors()); // Enable CORS for all routes
const PORT = 3000;

app.use(express.json());

const { Pool } = pg;
// PostgreSQL pool configuration
const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'grocery_store',
    password: 'postgres',
    port: 5432,
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});



// Endpoint to send all items in groceries table in JSON
app.get('/groceries/all', async(req, res) => {
    try {
        const result = await pool.query('SELECT * FROM grocery_items');
        const groceries = result.rows;
        res.json(groceries);
    } catch (err) {
        console.error("Error: ", err);
        res.status(500).send("Unable to Recieve All Groceries");
    }
});

// Endpoint to get item in groceries table by id
app.get('/groceries/index/:id', async(req, res) => {
    try {
        const {id} = req.params;
        const result = await pool.query('SELECT * FROM grocery_items WHERE grocery_id = $1', [id]);
        const grocery_item = result.rows[0];
        res.json(grocery_item);
    } catch (err) {
        const {id} = req.params;
        console.error("Error: ", err);
        res.status(500).send(`Unable to Recieve Grocery Item with ID: ${id}`);
    }
});

// Endpoint to get groceries in groceries table by category
app.get('/groceries/:category', async(req, res) => {
    try {
        const {category} = req.params;
        const result = await pool.query('SELECT * FROM grocery_items WHERE LOWER(category) = LOWER($1)', [category]);
        const groceries = result.rows;
        res.json(groceries);
    } catch (err) {
        const {category} = req.params;
        console.error("Error: ", err);
        res.status(500).send(`Unable to Recieve Grocery Items with category: ${category}`);
    }
});


// Endpoint to get groceries in groceries table by category
app.post('/groceries/search/', async(req, res) => {
    try {
        const {searchTerm} = req.body;
        const query = `
            SELECT * 
            FROM grocery_items 
            WHERE category ILIKE $1 
            OR sub_category ILIKE $1
            OR name ILIKE $1 
            OR description ILIKE $1;
        `;
        const values = [`%${searchTerm}%`];
        const result = await pool.query(query, values);
        const groceries = result.rows;
        res.json(groceries);
    } catch (err) {
        console.error("Error: ", err);
        res.status(500).send(`Error searching for groceries`);
    }
});


// Authentication Endpoint
app.post('/user/login', async (req, res) => {
    const { username, password } = req.body;
    try {
        const result = await pool.query('SELECT uid FROM users WHERE username = $1 AND password = $2', [username, password]);
        if (result.rows.length > 0) {
            res.status(200).json({ uid: result.rows[0].uid });
        } else {
            res.status(401).json({ message: 'Authentication failed' });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal server error' });
    }
});