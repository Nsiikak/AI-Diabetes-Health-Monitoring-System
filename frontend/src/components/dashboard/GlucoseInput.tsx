
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { useState } from "react";
import { toast } from "sonner";

const GlucoseInput = () => {
  const [glucoseValue, setGlucoseValue] = useState<number>(100);
  const [notes, setNotes] = useState<string>("");
  const [mealState, setMealState] = useState<string>("before");

  const handleSliderChange = (value: number[]) => {
    setGlucoseValue(value[0]);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    if (!isNaN(value) && value >= 40 && value <= 400) {
      setGlucoseValue(value);
    }
  };

  const getGlucoseStatus = () => {
    if (glucoseValue < 70) return "Low";
    if (glucoseValue > 180) return "High";
    return "Normal";
  };

  const getStatusColor = () => {
    if (glucoseValue < 70) return "text-glucose-low";
    if (glucoseValue > 180) return "text-glucose-high";
    return "text-glucose-normal";
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Glucose reading saved successfully!");
    // Here you would typically save this to your database
    setNotes("");
  };

  return (
    <div className="p-6 rounded-2xl glass-card">
      <h3 className="heading-3 mb-6">Record Glucose Level</h3>
      
      <form onSubmit={handleSubmit}>
        <div className="space-y-6">
          <div className="text-center">
            <div className="flex justify-center mb-2">
              <div className="glucose-value-display">{glucoseValue}</div>
              <span className="text-xl text-muted-foreground self-end ml-2 mb-1">mg/dL</span>
            </div>
            <p className={`text-sm font-medium ${getStatusColor()}`}>
              {getGlucoseStatus()}
            </p>
          </div>
          
          <div className="pt-2">
            <Slider
              value={[glucoseValue]}
              min={40}
              max={400}
              step={1}
              onValueChange={handleSliderChange}
              className="mt-6"
            />
            <div className="flex justify-between mt-2 text-xs text-muted-foreground">
              <span>40</span>
              <span>120</span>
              <span>200</span>
              <span>300</span>
              <span>400</span>
            </div>
          </div>
          
          <div className="mt-6">
            <Label htmlFor="glucose-input">Enter manually:</Label>
            <Input
              id="glucose-input"
              type="number"
              min={40}
              max={400}
              value={glucoseValue}
              onChange={handleInputChange}
              className="mt-2"
            />
          </div>
          
          <div className="space-y-2">
            <Label>Meal state:</Label>
            <div className="flex space-x-2">
              <Button
                type="button"
                variant={mealState === "before" ? "default" : "outline"}
                onClick={() => setMealState("before")}
                className="flex-1"
              >
                Before meal
              </Button>
              <Button
                type="button"
                variant={mealState === "after" ? "default" : "outline"}
                onClick={() => setMealState("after")}
                className="flex-1"
              >
                After meal
              </Button>
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="notes">Notes (optional):</Label>
            <Input
              id="notes"
              placeholder="Add any relevant details..."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
            />
          </div>
          
          <Button type="submit" className="w-full">
            Save Reading
          </Button>
        </div>
      </form>
    </div>
  );
};

export default GlucoseInput;
