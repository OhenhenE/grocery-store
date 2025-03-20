import pandas as pd
import pickle
from sklearn.neighbors import NearestNeighbors
import numpy as np

# Load data
df = pd.read_csv("product_data.csv")

# Convert categorical data (category) into numerical values
df["category"] = df["category"].astype("category").cat.codes

# Select features for recommendation
features = df[["category", "price"]]


# Train the recommendation model
model = NearestNeighbors(n_neighbors=5, algorithm="auto")
model.fit(features)

# Save the model
with open("recommendation_model.pkl", "wb") as f:
    pickle.dump(model, f)

print("Model trained and saved successfully!")