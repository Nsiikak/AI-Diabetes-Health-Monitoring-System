import { useState } from "react";
import Layout from "@/components/layout/Layout";
import PageTransition from "@/components/common/PageTransition";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { Separator } from "@/components/ui/separator";
import { AlertCircle, Calculator, Database, ChartBar, Percent } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { predictionApi, PredictionData, PredictionResponse } from "@/utils/predictionApi";

interface PredictionForm {
  pregnancies: number;
  glucose: number;
  bloodPressure: number;
  skinThickness: number;
  insulin: number;
  bmi: number;
  diabetesPedigreeFunction: number;
  age: number;
}

interface PredictionResult {
  message: string;
  probability: number;
}

const Predictions = () => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [formValues, setFormValues] = useState<PredictionForm>({
    pregnancies: 0,
    glucose: 120,
    bloodPressure: 70,
    skinThickness: 20,
    insulin: 80,
    bmi: 25,
    diabetesPedigreeFunction: 0.47, // Default value between non-diabetic and diabetic averages
    age: 30,
  });
  const [result, setResult] = useState<PredictionResult | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormValues((prev) => ({
      ...prev,
      [name]: parseFloat(value) || 0,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Map form values to match the FastAPI expected schema
      const predictionData: PredictionData = {
        Pregnancies: formValues.pregnancies,
        Glucose: formValues.glucose,
        BloodPressure: formValues.bloodPressure,
        SkinThickness: formValues.skinThickness,
        Insulin: formValues.insulin,
        BMI: formValues.bmi,
        DiabetesPedigreeFunction: formValues.diabetesPedigreeFunction,
        Age: formValues.age,
      };

      // Call the updated predictionApi
      const response = await predictionApi.predictDiabetes(predictionData);
      
      setResult({
        message: response.prediction,
        probability: response.probability * 100, // Convert probability to percentage
      });

      toast({
        title: "Prediction completed",
        description: "Your diabetes risk assessment is ready.",
      });
    } catch (error) {
      console.error("Prediction error:", error);
      toast({
        variant: "destructive",
        title: "Prediction failed",
        description: "Could not get a prediction at this time. Please try again later.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <PageTransition>
        <div className="space-y-8">
          <div>
            <h1 className="heading-1">Diabetes Prediction</h1>
            <p className="text-muted-foreground mt-1">
              Enter your health metrics to get a diabetes risk assessment
            </p>
          </div>

          <Alert>
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Medical Disclaimer</AlertTitle>
            <AlertDescription>
              This prediction is based on a machine learning model and should not replace professional medical advice.
              Always consult with a healthcare provider for proper diagnosis and treatment.
            </AlertDescription>
          </Alert>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calculator className="h-5 w-5 text-primary" />
                  Health Parameters
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form id="prediction-form" onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="pregnancies">Pregnancies</Label>
                      <Input
                        id="pregnancies"
                        name="pregnancies"
                        type="number"
                        min="0"
                        max="20"
                        step="1"
                        value={formValues.pregnancies}
                        onChange={handleChange}
                      />
                      <p className="text-xs text-muted-foreground">Number of times pregnant</p>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="glucose">Glucose Level (mg/dL)</Label>
                      <Input
                        id="glucose"
                        name="glucose"
                        type="number"
                        min="0"
                        max="300"
                        value={formValues.glucose}
                        onChange={handleChange}
                      />
                      <p className="text-xs text-muted-foreground">Plasma glucose concentration (2 hours after glucose tolerance test)</p>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="bloodPressure">Blood Pressure (mm Hg)</Label>
                      <Input
                        id="bloodPressure"
                        name="bloodPressure"
                        type="number"
                        min="0"
                        max="200"
                        value={formValues.bloodPressure}
                        onChange={handleChange}
                      />
                      <p className="text-xs text-muted-foreground">Diastolic blood pressure</p>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="skinThickness">Skin Thickness (mm)</Label>
                      <Input
                        id="skinThickness"
                        name="skinThickness"
                        type="number"
                        min="0"
                        max="100"
                        value={formValues.skinThickness}
                        onChange={handleChange}
                      />
                      <p className="text-xs text-muted-foreground">Triceps skin fold thickness</p>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="insulin">Insulin (μU/ml)</Label>
                      <Input
                        id="insulin"
                        name="insulin"
                        type="number"
                        min="0"
                        max="1000"
                        value={formValues.insulin}
                        onChange={handleChange}
                      />
                      <p className="text-xs text-muted-foreground">2-Hour serum insulin</p>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="bmi">BMI (kg/m²)</Label>
                      <Input
                        id="bmi"
                        name="bmi"
                        type="number"
                        min="10"
                        max="70"
                        step="0.1"
                        value={formValues.bmi}
                        onChange={handleChange}
                      />
                      <p className="text-xs text-muted-foreground">Body mass index</p>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="diabetesPedigreeFunction" className="flex items-center">
                        Diabetes Pedigree Function
                        <Percent className="h-4 w-4 ml-1 text-muted-foreground" />
                      </Label>
                      <Input
                        id="diabetesPedigreeFunction"
                        name="diabetesPedigreeFunction"
                        type="number"
                        min="0.078"
                        max="2.42"
                        step="0.001"
                        value={formValues.diabetesPedigreeFunction}
                        onChange={handleChange}
                      />
                      <p className="text-xs text-muted-foreground">
                        Diabetes pedigree function (genetic influence)
                      </p>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="age">Age (years)</Label>
                      <Input
                        id="age"
                        name="age"
                        type="number"
                        min="21"
                        max="100"
                        value={formValues.age}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                </form>
              </CardContent>
              <CardFooter>
                <Button
                  type="submit"
                  form="prediction-form"
                  disabled={loading}
                  className="w-full"
                >
                  {loading ? "Processing..." : "Get Prediction"}
                </Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <ChartBar className="h-5 w-5 text-primary" />
                  Prediction Result
                </CardTitle>
              </CardHeader>
              <CardContent>
  {result ? (
    <div className="space-y-4">
      <div className="flex flex-col items-center justify-center p-6">
        <div className={`text-2xl font-bold ${
          result.probability > 50 ? "text-glucose-high" : "text-glucose-normal"
        }`}>
          {result.probability > 50 ? "High Risk" : "Low Risk"}
        </div>
        <div className="text-4xl font-bold mt-2">{result.probability.toFixed(1)}%</div>
        <p className="text-sm text-muted-foreground text-center mt-2">
          Probability of diabetes based on your parameters
        </p>
      </div>

      <Separator />

      <div className="space-y-2 text-sm">
        <p className="font-medium">What does this mean?</p>
        {result.probability > 50 ? (
          <p>
            Your parameters indicate a higher risk of diabetes. This is not a diagnosis,
            but we recommend consulting with a healthcare provider for proper evaluation.
          </p>
        ) : (
          <p>
            Your parameters indicate a lower risk of diabetes. Continue maintaining a
            healthy lifestyle and regular check-ups with your healthcare provider.
          </p>
        )}
      </div>
    </div>
  ) : (
    <div className="flex flex-col items-center justify-center p-6 h-64">
      <Database className="h-12 w-12 text-muted-foreground mb-4 opacity-50" />
      <p className="text-muted-foreground text-center">
        Enter your health parameters and click "Get Prediction" to see your results.
      </p>
    </div>
  )}
</CardContent>

            </Card>
          </div>
        </div>
      </PageTransition>
    </Layout>
  );
};

export default Predictions;
