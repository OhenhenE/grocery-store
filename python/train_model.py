import pandas as pd
import pickle
from sklearn.neighbors import NearestNeighbors
import numpy as np
from sklearn.preprocessing import StandardScaler, OneHotEncoder
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.compose import ColumnTransformer
from sklearn.pipeline import Pipeline

# Load data
training_data  = pd.read_csv("product_data.csv")

features = ["category", "sub_category", "description", "price"]

# Define preprocessing steps
numeric_features = ["price"]
numeric_transformer = Pipeline(steps=[("scaler", StandardScaler())])

categorical_features = ["category", "sub_category"]
categorical_transformer = Pipeline(steps=[("encoder", OneHotEncoder(drop="first"))])

text_features = "description"
text_transformer = Pipeline(steps=[("tfidf", TfidfVectorizer())])

preprocessor = ColumnTransformer(
    transformers=[
        ("num", numeric_transformer, numeric_features),
        ("cat", categorical_transformer, categorical_features),
        ("text", text_transformer, text_features)
    ]
)

# Create pipeline
knn_pipeline = Pipeline(
    steps=[
        ("preprocessor", preprocessor),
        ("model", NearestNeighbors(n_neighbors=10, algorithm="auto"))
    ]
)

# Fit the model
knn_pipeline.fit(x)

# Save the model
with open("new_recommendation_model.pkl", "wb") as f:
    pickle.dump(knn_pipeline, f)

print("Model trained and saved successfully!")