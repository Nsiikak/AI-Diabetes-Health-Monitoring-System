from fastapi import FastAPI
import pickle
import numpy as np
from pydantic import BaseModel
import tensorflow as tf

# Load the model
loaded_model = tf.keras.models.load_model("neural_network.keras")

app = FastAPI()

# Define input data model
class InputData(BaseModel):
    features: list[float]

@app.post("/predict")
def predict(data: InputData):
    # Convert input to NumPy array
    input_array = np.array([data.features])
    prediction = model.predict(input_array)
    return {"prediction": prediction.tolist()}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)