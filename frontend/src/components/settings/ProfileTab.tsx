import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";

const ProfileTab = () => {
  const handleSaveProfile = () => {
    toast.success("Profile settings saved!");
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Profile Settings</CardTitle>
        <CardDescription>
          Manage your personal information and preferences
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Full Name</Label>
            <Input id="name" defaultValue="John Doe" />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" defaultValue="john.doe@example.com" />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="phone">Phone Number</Label>
            <Input id="phone" defaultValue="+1 (555) 123-4567" />
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="age">Age</Label>
              <Input id="age" type="number" defaultValue="42" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="weight">Weight (kg)</Label>
              <Input id="weight" type="number" defaultValue="75" />
            </div>
          </div>
        </div>
        
        <Separator />
        
        <div className="space-y-4">
          <h3 className="text-lg font-medium">Medical Information</h3>
          
          <div className="space-y-2">
            <Label htmlFor="diabetes-type">Diabetes Type</Label>
            <div className="flex space-x-2">
              <Badge variant="outline" className="px-3 py-1.5 text-sm font-normal">Type 1</Badge>
              <Badge variant="secondary" className="px-3 py-1.5 text-sm font-normal">Type 2</Badge>
              <Badge variant="outline" className="px-3 py-1.5 text-sm font-normal">Gestational</Badge>
              <Badge variant="outline" className="px-3 py-1.5 text-sm font-normal">Other</Badge>
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="diagnosis-year">Year of Diagnosis</Label>
            <Input id="diagnosis-year" type="number" defaultValue="2015" />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="doctor">Primary Doctor</Label>
            <Input id="doctor" defaultValue="Dr. Sarah Johnson" />
          </div>
        </div>
        
        <Separator />
        
        <div className="space-y-4">
          <h3 className="text-lg font-medium">Target Ranges</h3>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="low-threshold">Low Threshold (mg/dL)</Label>
              <Input id="low-threshold" type="number" defaultValue="70" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="high-threshold">High Threshold (mg/dL)</Label>
              <Input id="high-threshold" type="number" defaultValue="180" />
            </div>
          </div>
        </div>
        
        <div className="flex justify-end">
          <Button onClick={handleSaveProfile}>Save Changes</Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProfileTab;