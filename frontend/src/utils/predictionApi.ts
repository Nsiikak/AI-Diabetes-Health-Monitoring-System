const API_URL = "http://localhost:8001"; // Updated to match FastAPI server port

export interface PredictionData {
  Pregnancies: number;
  Glucose: number;
  BloodPressure: number;
  SkinThickness: number;
  Insulin: number;
  BMI: number;
  DiabetesPedigreeFunction: number;
  Age: number;
}

export interface PredictionResponse {
  prediction: string;
  probability: number;
}

export const predictionApi = {
  // Predict diabetes based on user parameters
  predictDiabetes: async (
    data: PredictionData,
    token?: string
  ): Promise<PredictionResponse> => {
    const headers: HeadersInit = {
      "Content-Type": "application/json",
    };

    // Add authorization token if provided
    if (token) {
      headers["Authorization"] = `Bearer ${token}`;
    }

    const response = await fetch(`${API_URL}/predict`, {
      method: "POST",
      headers,
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || "Failed to get prediction");
    }

    return response.json();
  },

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  getPredictionHistory: async (token: string): Promise<any[]> => {
    const response = await fetch(`${API_URL}/predictions/history`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Failed to get prediction history");
    }

    return response.json();
  },
};
