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
app.get('/groceries/all', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM grocery_items LIMIT 20');
        const groceries = result.rows;
        res.json(groceries);
    } catch (err) {
        console.error("Error: ", err);
        res.status(500).send("Unable to Recieve All Groceries");
    }
});

// Endpoint to get item in groceries table by id
app.get('/groceries/index/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const result = await pool.query('SELECT * FROM grocery_items WHERE grocery_id = $1', [id]);
        const grocery_item = result.rows[0];
        res.json(grocery_item);
    } catch (err) {
        const { id } = req.params;
        console.error("Error: ", err);
        res.status(500).send(`Unable to Recieve Grocery Item with ID: ${id}`);
    }
});

// Endpoint to get groceries in groceries table by category
app.get('/groceries/:category', async (req, res) => {
    try {
        const { category } = req.params;
        const result = await pool.query('SELECT * FROM grocery_items WHERE LOWER(category) = LOWER($1)', [category]);
        const groceries = result.rows;
        res.json(groceries);
    } catch (err) {
        const { category } = req.params;
        console.error("Error: ", err);
        res.status(500).send(`Unable to Recieve Grocery Items with category: ${category}`);
    }
});


// Endpoint to get groceries in groceries table by category
app.post('/groceries/search/', async (req, res) => {
    try {
        const { searchTerm } = req.body;
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

//Endpoint to (post) add item to shopping cart
app.post("/cartpage/add/", async (req, res) => {
    try {
        const { user_id, name, grocery_id, quantity, item_cost } = req.body;

        // Validate the input data (you can add more validation if needed)
        // if (!user_id || !grocery_id || !quantity || !item_cost) {
        //     return res.status(400).json({
        //         message:
        //             "All fields are required: user_id, grocery_id, quantity, item_cost.",
        //     });
        // }
        const query = `
          INSERT INTO shopping_cart (user_id, name, grocery_id, quantity, item_cost)
          VALUES ($1, $2, $3, $4, $5)
          RETURNING *;
      `;
        const values = [user_id, name, grocery_id, quantity, item_cost];
        const result = await pool.query(query, values);

        res
            .status(201)
            .json({ message: "Item added to cart", item: result.rows[0] });
    } catch (err) {
        console.error("Error adding item to cart: ", err);
        res.status(500).send("Unable to add item to cart");
    }
});

//Endpoint to get shopping cart with user id
app.get("/cartpage/:id", async (req, res) => {
    try {
      const { id } = req.params;
      // const query = `SELECT * FROM shopping_cart WHERE user_id = $1`;
      const query = `SELECT *
          FROM shopping_cart 
          WHERE user_id = $1`;
      const values = [id];
      const result = await pool.query(query, values);
  
      if (result.rows.length === 0) {
        return res
          .status(404)
          .json({ message: "No cart items found for this user" });
      }
      res.json(result.rows);
    } catch (err) {
      console.error("Error: ", err);
      res
        .status(500)
        .send(`Unable to Recieve cart Items with user id: ${req.params.id}`);
    }
  });

// Endpoint to add a new order
app.post("/orders/add_new_order", async (req, res) => {
    try {
        const { user_id, name, order_summary, order_cost } =
            req.body;

        // Validate required fields
        if (
            !user_id ||
            !name ||
            !order_summary ||
            !order_cost
        ) {
            return res.status(400).json({
                message:
                    "All fields are required: user_id, name, items_purchased, order_cost",
            });
        }

        // Get current date and time and add 3 hours
        const currentDate = new Date();
        currentDate.setHours(currentDate.getHours() + 3);  // Adds 3 hours

        const pickupTime = currentDate.toISOString(); // Formats the date to ISO string

        // Query to insert a new order
        const query = `
            INSERT INTO orders (user_id, order_summary, name, order_cost, date_ordered, pickup_time)
            VALUES ($1, $2, $3, $4, $5, $6)
            RETURNING *;
        `;

        // Convert items_purchased array to a string (or another format, like JSON)
        const items = JSON.stringify(items_purchased); // This assumes 'items' is an array of item IDs or details

        const values = [user_id, order_summary, name, order_cost, date_ordered, pickup_time];
        const result = await pool.query(query, values);

        // Respond with the newly created order
        res.status(201).json({
            message: "New order successfully added.",
            newOrder: result.rows[0],
        });
    } catch (err) {
        console.error("Error: ", err);
        res.status(500).json({ message: "Unable to add new order." });
    }
});

// End point to delete an item from the cart
app.delete("/cartpage/delete/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const user_id = 1;

        if (!user_id || !id) {
            return res.status(400).json({
                message: "All fields are required: user_id, id.",
            });
        }
        const query = `
          DELETE FROM shopping_cart
          WHERE user_id = $1 AND id = $2
          RETURNING *;
      `;
        const values = [user_id, id];
        const result = await pool.query(query, values);

        if (result.rows.length === 0) {
            return res.status(404).json({ message: "Item not found in the cart." });
        }
        res.status(200).json({
            message: "Item successfully deleted from the cart.",
            deletedItem: result.rows[0],
        });
    } catch (err) {
        console.error("Error: ", err);
        res.status(500).json({ message: "Unable to delete item from the cart." });
    }
});

// Endpoint to delete all items from the shopping cart for a specific user
app.delete("/cartpage/delete_all/:id", async (req, res) => {
    try {
        const { user_id } = req.params;

        if (!user_id) {
            return res.status(400).json({
                message: "user_id is required.",
            });
        }

        const query = `
            DELETE FROM shopping_cart
            WHERE user_id = $1
            RETURNING *;
        `;
        const values = [user_id];
        const result = await pool.query(query, values);

        if (result.rowCount === 0) {
            return res.status(404).json({ message: "No items found for this user." });
        }

        res.status(200).json({
            message: "All items successfully deleted from the cart.",
            deletedItems: result.rows,
        });
    } catch (err) {
        console.error("Error: ", err);
        res.status(500).json({ message: "Unable to delete items from the cart." });
    }
});

//Endpoint to get all orders for user id
app.get("/orders/:id", async (req, res) => {
    try {
        const { id } = req.params;
        if (isNaN(id)) {
            return res.status(400).json({ message: "Invalid user ID format" });
        }
        const query = `
          SELECT * 
          FROM orders
          WHERE user_id = $1
          `;
        const result = await pool.query(query, [id]);

        if (result.rows.length === 0) {
            return res.status(404).json({ message: "No orders found for this user" });
        }
        res.json(result.rows);
    } catch (err) {
        console.error("Error: ", err);
        res
            .status(500)
            .send(`Unable to receive order Items with user id: ${req.params.id}`);
    }
});

// Endpoint to update item quantity in the shopping cart
app.patch("/cartpage/update", async (req, res) => {
    try {
        const { user_id, id, new_quantity } = req.body;

        // Check if all required fields are provided
        if (!user_id || !id || !new_quantity) {
            return res.status(400).json({
                message: "All fields are required: user_id, cart_id, new_quantity.",
            });
        }

        // Validate if the quantity is a positive integer
        if (new_quantity <= 0 || !Number.isInteger(new_quantity)) {
            return res.status(400).json({
                message: "Quantity must be a positive integer.",
            });
        }

        // Query to update the quantity for the specific item in the cart
        const query = `
          UPDATE shopping_cart
          SET quantity = $1
          WHERE user_id = $2 AND id = $3
          RETURNING *;
        `;
        const values = [new_quantity, user_id, id];
        const result = await pool.query(query, values);

        if (result.rows.length === 0) {
            return res.status(404).json({ message: "Item not found in the cart." });
        }

        res.status(200).json({
            message: "Item quantity successfully updated.",
            updatedItem: result.rows[0],
        });
    } catch (err) {
        console.error("Error: ", err);
        res.status(500).json({ message: "Unable to update item in the cart." });
    }
});

// // Endpoint to get all orders for user id, with item names
// app.get("/orders/:id", async (req, res) => {
//     try {
//       const { id } = req.params;
//       if (isNaN(id)) {
//         return res.status(400).json({ message: "Invalid user ID format" });
//       }

//       // Modified query to join orders with grocery_items based on grocery_id
//       const query = `
//         SELECT o.user_id, 
//        o.name AS order_name,
//        o.shipping_address,
//        o.order_cost,
//        gi.name AS item_name,
//        gi.category,
//        gi.sub_category,
//        gi.description,
//        gi.price
// FROM orders o
// JOIN LATERAL jsonb_array_elements_text(o.items) AS item_id ON true
// JOIN grocery_items gi ON gi.id = item_id::int;
//       `;
//       const result = await pool.query(query, [id]);

//       if (result.rows.length === 0) {
//         return res.status(404).json({ message: "No orders found for this user" });
//       }

//       res.json(result.rows);
//     } catch (err) {
//       console.error("Error: ", err);
//       res.status(500).send(`Unable to receive order Items with user id: ${req.params.id}`);
//     }
//   });

// Authentication Endpoint
app.post("/user/login", async (req, res) => {
    const { username, password } = req.body;
    try {
        const result = await pool.query(
            "SELECT uid FROM users WHERE username = $1 AND password = $2",
            [username, password]
        );
        if (result.rows.length > 0) {
            res.status(200).json({ uid: result.rows[0].uid });
        } else {
            res.status(401).json({ message: "Authentication failed" });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Internal server error" });
    }
});