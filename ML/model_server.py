import os
import pickle as pkl
import pandas as pd
import numpy as np
import tensorflow as tf
from fastapi import FastAPI
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
import uvicorn

# Initialize FastAPI app
app = FastAPI()

# Enable CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Get script directory
script_dir = os.path.dirname(os.path.abspath(__file__))

# Load the scaler
scaler_path = os.path.join(script_dir, 'scaler.pkl')
with open(scaler_path, 'rb') as f:
    scaler = pkl.load(f)

# Load the trained neural network model
model_path = os.path.join(script_dir, 'best_model.keras')
loaded_model = tf.keras.models.load_model(model_path)

# Define input data schema using Pydantic
class DiabetesInput(BaseModel):
    Pregnancies: int
    Glucose: int
    BloodPressure: int
    SkinThickness: int
    Insulin: int
    BMI: float
    DiabetesPedigreeFunction: float
    Age: int

# Prediction function
def predict_diabetes(data: DiabetesInput):
    try:
        # Convert input to DataFrame
        input_data = pd.DataFrame([[data.Pregnancies, data.Glucose, data.BloodPressure, 
                                    data.SkinThickness, data.Insulin, data.BMI, data.DiabetesPedigreeFunction, data.Age]])

        # Scale input data
        scaled_data = scaler.transform(input_data)

        # Make prediction (get probability score)
        prediction_prob = loaded_model.predict(scaled_data)[0][0]  # Assuming binary classification

        # Define response based on threshold
        if prediction_prob >= 0.5:
            result = {
                'prediction': "You have high chances of Diabetes! Please consult a Doctor",
                'probability': float(prediction_prob),  
            }
        else:
            result = {
                'prediction': "You have low chances of Diabetes. Please maintain a healthy lifestyle",
                'probability': float(prediction_prob),
            }

        return result
    except Exception as e:
        return {'error': f"Prediction error: {e}"}

# Define FastAPI route for prediction
@app.post("/predict")
def predict(data: DiabetesInput):
    return predict_diabetes(data)

# Run FastAPI using uvicorn
if __name__ == "__main__":
    
    uvicorn.run(app, host="0.0.0.0", port=8000, reload=True)
