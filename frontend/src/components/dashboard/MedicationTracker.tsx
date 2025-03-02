
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Check, Pill } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

const MedicationTracker = () => {
  // Sample data
  const [medications, setMedications] = useState([
    { id: 1, name: "Metformin", dosage: "500mg", time: "8:00 AM", taken: true },
    { id: 2, name: "Insulin", dosage: "10 units", time: "12:30 PM", taken: false },
    { id: 3, name: "Glipizide", dosage: "5mg", time: "8:00 PM", taken: false },
  ]);

  const handleToggleTaken = (id: number) => {
    setMedications(
      medications.map((med) => {
        if (med.id === id) {
          const newState = { ...med, taken: !med.taken };
          if (newState.taken) {
            toast.success(`Marked ${med.name} as taken!`);
          }
          return newState;
        }
        return med;
      })
    );
  };

  // Calculate completion percentage
  const completionPercentage = Math.round(
    (medications.filter((med) => med.taken).length / medications.length) * 100
  );

  return (
    <div className="p-6 rounded-2xl glass-card">
      <div className="flex justify-between items-center mb-6">
        <h3 className="heading-3">Medications</h3>
        <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
          <Pill className="h-5 w-5 text-primary" />
        </div>
      </div>
      
      <div className="flex items-center justify-between mb-4">
        <p className="subtle-heading">Today's Progress</p>
        <p className="text-sm font-medium">
          {medications.filter((med) => med.taken).length} of {medications.length} taken
        </p>
      </div>
      
      <div className="relative h-2 bg-secondary rounded-full mb-6 overflow-hidden">
        <div 
          className="absolute top-0 left-0 h-full bg-primary transition-all duration-500 ease-in-out"
          style={{ width: `${completionPercentage}%` }}
        />
      </div>
      
      <div className="space-y-3 mt-4">
        {medications.map((medication) => (
          <div 
            key={medication.id}
            className={`p-4 rounded-xl ${
              medication.taken ? "bg-primary/10" : "bg-secondary/50"
            } flex items-center justify-between transition-all duration-300`}
          >
            <div className="flex items-center">
              <Checkbox 
                checked={medication.taken}
                onCheckedChange={() => handleToggleTaken(medication.id)}
                className="mr-3"
              />
              <div>
                <p className="font-medium">{medication.name}</p>
                <p className="text-sm text-muted-foreground">{medication.dosage} • {medication.time}</p>
              </div>
            </div>
            {medication.taken && (
              <div className="h-6 w-6 rounded-full bg-primary flex items-center justify-center">
                <Check className="h-3 w-3 text-primary-foreground" />
              </div>
            )}
          </div>
        ))}
      </div>
      
      <Button variant="outline" className="w-full mt-6">
        Medication Schedule
      </Button>
    </div>
  );
};

export default MedicationTracker;
