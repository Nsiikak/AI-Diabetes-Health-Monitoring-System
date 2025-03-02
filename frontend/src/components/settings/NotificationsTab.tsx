import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";

const NotificationsTab = () => {
  const handleSaveNotifications = () => {
    toast.success("Notification preferences saved!");
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Notification Preferences</CardTitle>
        <CardDescription>
          Manage how and when you receive alerts and notifications
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <h3 className="text-lg font-medium">Glucose Alerts</h3>
          
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Low glucose alerts</p>
              <p className="text-sm text-muted-foreground">Alert when glucose falls below target range</p>
            </div>
            <Switch defaultChecked />
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">High glucose alerts</p>
              <p className="text-sm text-muted-foreground">Alert when glucose rises above target range</p>
            </div>
            <Switch defaultChecked />
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Rapid change alerts</p>
              <p className="text-sm text-muted-foreground">Alert when glucose is changing rapidly</p>
            </div>
            <Switch defaultChecked />
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Predictive alerts</p>
              <p className="text-sm text-muted-foreground">Alert when glucose is predicted to go out of range</p>
            </div>
            <Switch />
          </div>
        </div>
        
        <Separator />
        
        <div className="space-y-4">
          <h3 className="text-lg font-medium">Medication Reminders</h3>
          
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Medication reminders</p>
              <p className="text-sm text-muted-foreground">Receive reminders for medication doses</p>
            </div>
            <Switch defaultChecked />
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Missed dose alerts</p>
              <p className="text-sm text-muted-foreground">Alert when a scheduled dose is missed</p>
            </div>
            <Switch defaultChecked />
          </div>
        </div>
        
        <Separator />
        
        <div className="space-y-4">
          <h3 className="text-lg font-medium">Other Notifications</h3>
          
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Device connectivity</p>
              <p className="text-sm text-muted-foreground">Alert when a device disconnects</p>
            </div>
            <Switch defaultChecked />
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Weekly reports</p>
              <p className="text-sm text-muted-foreground">Receive weekly health summary reports</p>
            </div>
            <Switch defaultChecked />
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Tips and insights</p>
              <p className="text-sm text-muted-foreground">Receive personalized health tips</p>
            </div>
            <Switch />
          </div>
        </div>
        
        <div className="flex justify-end">
          <Button onClick={handleSaveNotifications}>Save Changes</Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default NotificationsTab;