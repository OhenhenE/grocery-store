from flask import Flask, request, jsonify
import pickle
import pandas as pd

app = Flask(__name__)

with open('knn_pipeline.pkl', 'rb') as file:
    knn_pipeline = pickle.load(file)

# Load your current database items
database_items = pd.read_csv("current_database.csv")

# Preprocess the database items
database_items_transformed = knn_pipeline.named_steps['preprocessor'].transform(database_items[["category", "sub_category", "description", "price"]])

# Function to recommend items based on shopping cart
def recommend_items(shopping_cart_items):
    # Preprocess shopping cart items
    shopping_cart_transformed = knn_pipeline.named_steps['preprocessor'].transform(shopping_cart_items[["category", "sub_category", "description", "price"]])
    
    # Find nearest neighbors in the database
    distances, indices = knn_pipeline.named_steps['model'].kneighbors(shopping_cart_transformed)
    
    # Get recommended items
    recommended_items = database_items.iloc[indices.flatten()]
    return recommended_items


@app.route('/api/predict', methods=['POST'])
def predict():
    try:
        shopping_cart_data  = request.get_json(force=True)

        if isinstance(shopping_cart_data , list):
            pass
        elif isinstance(shopping_cart_data , dict):
            pass
        else:
            print("Data Type: ", type(shopping_cart_data ))
            print("Data: ", shopping_cart_data )
            raise Exception(f"Incompatible Data Type. Object is of type: {type(shopping_cart_data )}")

        shopping_cart_df = pd.DataFrame(shopping_cart_data)
        recommendations = recommend_items(shopping_cart_df)

        recommendations_json = recommendations.to_dict(orient='records')
    
        return jsonify(recommendations_json)
    except Exception as e:
        print(f"An error occurred making prediction: {e}")
        return e
        
    
    


if __name__ == '__main__':
    app.run(port=5000)