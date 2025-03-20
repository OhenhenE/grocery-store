from flask import Flask, request, jsonify
import psycopg2
import pandas as pd
import pickle
import numpy as np

from sqlalchemy import create_engine

app = Flask(__name__)
@app.route("/", methods=["GET"])
def home():
    return "Hello, Flask is running!"

@app.route("/routes", methods=["GET"])
def show_routes():
    return jsonify([str(rule) for rule in app.url_map.iter_rules()])

@app.route("/recommend", methods=["POST"])  
def recommend():
    # Ensure request has JSON data
    data = request.get_json()
    if not data or "name" not in data:
        return jsonify({"error": "Product name is required"}), 400

    product_name = data["name"]
    print("Input Product:", product_name)

    df = fetch_products()

    # Find the selected product
    product = df[df["name"].str.lower() == product_name.lower()]
    if product.empty:
        return jsonify({"error": "Product not found"}), 404

    product_index = product.index[0]
    features = df[["category", "price"]]

    print("Selected product features:", features.iloc[product_index])
    
    # Ensure model is trained on correct columns
    try:
        distances, indices = model.kneighbors([features.iloc[product_index]])
        recommended_products = df.iloc[indices[0]]["name"].tolist()
    except Exception as e:
        return jsonify({"error": f"Model error: {str(e)}"}), 500

    print(f"Recommended Products: {recommended_products}")

    return jsonify({"recommended_products": recommended_products})

DB_CONFIG = {
    "dbname": "grocery_store",
    "user": "postgres",
    "password": "postgres",
    "host": "localhost", 
    "port": "5432"
}

# Load trained model
with open("recommendation_model.pkl", "rb") as f:
    model = pickle.load(f)

# Fetch data from PostgreSQL
def fetch_products():
    conn = psycopg2.connect(**DB_CONFIG)
    try:
        query = "SELECT name, category, price FROM grocery_items;"
        df = pd.read_sql_query(query, conn)  # Use read_sql_query
        df["category"] = df["category"].astype("category").cat.codes
        return df
    finally:
        conn.close()  # Ensure DB closes properly


if __name__ == "__main__":
    app.run(debug=True)