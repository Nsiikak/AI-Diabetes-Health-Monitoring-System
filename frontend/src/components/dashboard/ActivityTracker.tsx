
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Activity, Footprints, Heart } from "lucide-react";

const ActivityTracker = () => {
  // Sample data
  const activities = [
    { id: 1, type: "Walking", duration: 30, calories: 120, date: "Today, 9:30 AM" },
    { id: 2, type: "Cycling", duration: 45, calories: 250, date: "Yesterday, 5:15 PM" },
    { id: 3, type: "Swimming", duration: 20, calories: 180, date: "Jun 15, 10:00 AM" },
  ];

  return (
    <div className="p-6 rounded-2xl glass-card">
      <h3 className="heading-3 mb-6">Physical Activity</h3>
      
      <Tabs defaultValue="summary">
        <TabsList className="w-full mb-4">
          <TabsTrigger value="summary" className="flex-1">Summary</TabsTrigger>
          <TabsTrigger value="history" className="flex-1">History</TabsTrigger>
        </TabsList>
        
        <TabsContent value="summary">
          <div className="space-y-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="subtle-heading">Daily Goal</p>
                <p className="text-2xl font-light mt-1">30 min</p>
              </div>
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                <Activity className="h-6 w-6 text-primary" />
              </div>
            </div>
            
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span>Progress</span>
                <span>83%</span>
              </div>
              <Progress value={83} className="h-2" />
            </div>
            
            <div className="grid grid-cols-2 gap-4 mt-6">
              <div className="p-4 rounded-xl bg-secondary/50">
                <div className="flex justify-between items-start">
                  <span className="subtle-heading">Steps</span>
                  <Footprints className="h-4 w-4 text-primary" />
                </div>
                <p className="text-xl font-light mt-1">8,234</p>
              </div>
              
              <div className="p-4 rounded-xl bg-secondary/50">
                <div className="flex justify-between items-start">
                  <span className="subtle-heading">Heart Rate</span>
                  <Heart className="h-4 w-4 text-glucose-low" />
                </div>
                <p className="text-xl font-light mt-1">78 BPM</p>
              </div>
            </div>
            
            <Button className="w-full mt-4">Log Activity</Button>
          </div>
        </TabsContent>
        
        <TabsContent value="history">
          <div className="space-y-4">
            {activities.map((activity) => (
              <div key={activity.id} className="p-4 rounded-xl bg-secondary/50 flex justify-between">
                <div>
                  <p className="font-medium">{activity.type}</p>
                  <p className="text-sm text-muted-foreground">{activity.date}</p>
                </div>
                <div className="text-right">
                  <p>{activity.duration} min</p>
                  <p className="text-sm text-muted-foreground">{activity.calories} cal</p>
                </div>
              </div>
            ))}
            
            <Button variant="outline" className="w-full">View All Activities</Button>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ActivityTracker;
