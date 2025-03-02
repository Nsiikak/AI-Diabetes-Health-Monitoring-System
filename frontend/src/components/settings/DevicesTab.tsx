import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { BluetoothIcon, Settings2Icon } from "lucide-react";

const DevicesTab = () => {
  const handleSaveDevice = () => {
    toast.success("Device settings saved!");
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Connected Devices</CardTitle>
        <CardDescription>
          Manage your glucose meters and other connected devices
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 border rounded-lg">
            <div className="flex items-center">
              <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center mr-4">
                <BluetoothIcon className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="font-medium">Dexcom G6</p>
                <p className="text-sm text-muted-foreground">Connected • Last synced 15 min ago</p>
              </div>
            </div>
            <Button variant="outline" size="sm">Disconnect</Button>
          </div>
          
          <div className="flex items-center justify-between p-4 border rounded-lg">
            <div className="flex items-center">
              <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center mr-4">
                <BluetoothIcon className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="font-medium">Freestyle Libre</p>
                <p className="text-sm text-muted-foreground">Not connected</p>
              </div>
            </div>
            <Button size="sm">Connect</Button>
          </div>
          
          <div className="flex items-center justify-between p-4 border rounded-lg">
            <div className="flex items-center">
              <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center mr-4">
                <BluetoothIcon className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="font-medium">Contour Next One</p>
                <p className="text-sm text-muted-foreground">Not connected</p>
              </div>
            </div>
            <Button size="sm">Connect</Button>
          </div>
        </div>
        
        <Separator />
        
        <div className="space-y-4">
          <h3 className="text-lg font-medium">Device Settings</h3>
          
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Auto-sync readings</p>
              <p className="text-sm text-muted-foreground">Automatically sync readings from connected devices</p>
            </div>
            <Switch defaultChecked />
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Background sync</p>
              <p className="text-sm text-muted-foreground">Allow syncing even when the app is not open</p>
            </div>
            <Switch defaultChecked />
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Sync frequency</p>
              <p className="text-sm text-muted-foreground">How often to check for new readings</p>
            </div>
            <div className="flex items-center space-x-2">
              <Badge>5 minutes</Badge>
              <Settings2Icon className="h-4 w-4 text-muted-foreground" />
            </div>
          </div>
        </div>
        
        <div className="flex justify-end">
          <Button onClick={handleSaveDevice}>Save Changes</Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default DevicesTab;