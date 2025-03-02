
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { AppleIcon, Coffee, UtensilsCrossed } from "lucide-react";

const DietTracker = () => {
  // Sample data
  const meals = [
    {
      id: 1,
      type: "Breakfast",
      time: "7:30 AM",
      items: ["Oatmeal with berries", "Greek yogurt"],
      carbs: 35,
      impact: "Low"
    },
    {
      id: 2,
      type: "Lunch",
      time: "12:15 PM",
      items: ["Grilled chicken salad", "Whole grain bread"],
      carbs: 45,
      impact: "Medium"
    },
    {
      id: 3,
      type: "Snack",
      time: "3:00 PM",
      items: ["Apple", "Almonds"],
      carbs: 15,
      impact: "Low"
    }
  ];
  
  const getImpactColor = (impact: string) => {
    switch (impact) {
      case "Low":
        return "text-glucose-normal";
      case "Medium":
        return "text-glucose-high/70";
      case "High":
        return "text-glucose-high";
      default:
        return "text-muted-foreground";
    }
  };
  
  const getMealIcon = (type: string) => {
    switch (type) {
      case "Breakfast":
        return <Coffee className="h-4 w-4" />;
      case "Lunch":
      case "Dinner":
        return <UtensilsCrossed className="h-4 w-4" />;
      case "Snack":
        return <AppleIcon className="h-4 w-4" />;
      default:
        return <UtensilsCrossed className="h-4 w-4" />;
    }
  };

  return (
    <div className="p-6 rounded-2xl glass-card">
      <h3 className="heading-3 mb-4">Diet Tracker</h3>
      
      <div className="grid grid-cols-3 gap-3 mb-6">
        <div className="p-3 rounded-xl bg-secondary/50 text-center">
          <p className="text-xs text-muted-foreground mb-1">Carbs</p>
          <p className="text-xl font-light">95g</p>
        </div>
        <div className="p-3 rounded-xl bg-secondary/50 text-center">
          <p className="text-xs text-muted-foreground mb-1">Protein</p>
          <p className="text-xl font-light">78g</p>
        </div>
        <div className="p-3 rounded-xl bg-secondary/50 text-center">
          <p className="text-xs text-muted-foreground mb-1">Fat</p>
          <p className="text-xl font-light">45g</p>
        </div>
      </div>
      
      <div className="mb-2">
        <p className="subtle-heading">Today's Meals</p>
      </div>
      
      <ScrollArea className="h-[200px] pr-4">
        <div className="space-y-3">
          {meals.map((meal) => (
            <div key={meal.id} className="p-4 rounded-xl bg-secondary/50">
              <div className="flex justify-between items-center mb-2">
                <div className="flex items-center">
                  <div className="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center mr-2">
                    {getMealIcon(meal.type)}
                  </div>
                  <p className="font-medium">{meal.type}</p>
                </div>
                <p className="text-sm text-muted-foreground">{meal.time}</p>
              </div>
              
              <div className="pl-8">
                <ul className="text-sm">
                  {meal.items.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
                
                <div className="flex justify-between mt-2 text-sm">
                  <p>Carbs: {meal.carbs}g</p>
                  <p className={getImpactColor(meal.impact)}>
                    {meal.impact} impact
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>
      
      <Button className="w-full mt-6">
        Log Food
      </Button>
    </div>
  );
};

export default DietTracker;
