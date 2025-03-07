const API_URL = "http://localhost:3000"; // Replace with your NestJS API URL

export interface PredictionData {
  pregnancies: number;
  glucose: number;
  bloodPressure: number;
  skinThickness: number;
  insulin: number;
  bmi: number;
  diabetesPedigreeFunction: number;
  age: number;
}

export interface PredictionResponse {
  outcome: boolean;
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

    const response = await fetch(`${API_URL}/predictions/diabetes`, {
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

  // Get user's prediction history (if your backend supports this)
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
