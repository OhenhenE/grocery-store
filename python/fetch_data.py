# import psycopg2
# import pandas as pd

# DB_CONFIG = {
#     "dbname": "grocery_store",
#     "user": "postgres",
#     "password": "postgres",
#     "host": "localhost", 
#     "port": "5432"
# }

# conn = psycopg2.connect(**DB_CONFIG)
# cursor = conn.cursor()

# query = "SELECT  grocery_id, name, category, sub_category, description, price FROM grocery_items;"
# df = pd.read_sql(query, conn)

# cursor.close()
# conn.close()


# df.to_csv("product_data.csv", index=False)
# print("Data fetched and saved successfully!")

import csv
import random
from faker import Faker

# Initialize Faker for random description generation
fake = Faker()

# List of categories, subcategories, and product names
categories = ['Produce', 'Dairy', 'Bakery', 'Meat', 'Frozen', 'Beverages', 'Snacks', 'Canned Goods']
sub_categories = {
    'Produce': ['Fruit', 'Vegetable'],
    'Dairy': ['Milk', 'Cheese', 'Yogurt'],
    'Bakery': ['Bread', 'Pastries', 'Cakes'],
    'Meat': ['Beef', 'Poultry', 'Pork', 'Lamb'],
    'Frozen': ['Frozen Vegetables', 'Frozen Meals', 'Ice Cream'],
    'Beverages': ['Soda', 'Juice', 'Water'],
    'Snacks': ['Chips', 'Cookies', 'Candy'],
    'Canned Goods': ['Canned Vegetables', 'Canned Fruits', 'Canned Meat']
}

# Sample product names for random selection
product_names = [
    'Granny Smith Apples', 'Red Delicious Apples', 'Bananas', 'Carrots', 'Broccoli', 
    'Skim Milk', 'Whole Milk', 'Eggs', 'Cheddar Cheese', 'Bread', 
    'Chicken Breast', 'Ground Beef', 'Ice Cream', 'Orange Juice', 'Potato Chips',
    'Tomatoes', 'Lettuce', 'Spinach', 'Onions', 'Cucumbers'
]

# Function to generate random price
def generate_random_price():
    return round(random.uniform(1.0, 20.0), 2)

# Function to generate a random grocery entry
def generate_random_grocery_entry(grocery_id):
    name = random.choice(product_names)
    category = random.choice(categories)
    sub_category = random.choice(sub_categories[category])
    description = f"{random.randint(1, 10)} {name} from a Local Farmer"
    price = generate_random_price()

    return [grocery_id, name, category, sub_category, description, price]

# Create the CSV file and write headers and data
with open('product_data.csv', 'w', newline='') as csvfile:
    writer = csv.writer(csvfile)
    
    # Write the header
    writer.writerow(['grocery_id', 'name', 'category', 'sub_category', 'description', 'price'])
    
    # Write 1000 random entries
    for grocery_id in range(1, 1001):
        row = generate_random_grocery_entry(grocery_id)
        writer.writerow(row)

print("CSV file 'product_data.csv' with 1000 entries has been created.")
