import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { 
  BluetoothIcon, 
  Settings2Icon, 
  Smartphone, 
  HeartPulse, 
  Activity, 
  Droplet
} from "lucide-react";

interface Device {
  id: string;
  name: string;
  type: string;
  connected: boolean;
  lastSynced: string | null;
  metrics: string[];
}

const DevicesSettings = () => {
  const [isScanning, setIsScanning] = useState(false);
  const [devices, setDevices] = useState<Device[]>([
    {
      id: "dexcom-g6",
      name: "Dexcom G6",
      type: "CGM",
      connected: true,
      lastSynced: "15 min ago",
      metrics: ["Glucose"]
    },
    {
      id: "freestyle-libre",
      name: "Freestyle Libre",
      type: "CGM",
      connected: false,
      lastSynced: null,
      metrics: ["Glucose"]
    },
    {
      id: "contour-next",
      name: "Contour Next One",
      type: "Glucose Meter",
      connected: false,
      lastSynced: null,
      metrics: ["Glucose"]
    }
  ]);
  
  const [availableDevices, setAvailableDevices] = useState<Device[]>([
    {
      id: "apple-watch",
      name: "Apple Watch",
      type: "Smartwatch",
      connected: false,
      lastSynced: null,
      metrics: ["Heart Rate", "Steps", "Activity"]
    },
    {
      id: "fitbit-versa",
      name: "Fitbit Versa",
      type: "Fitness Tracker",
      connected: false,
      lastSynced: null,
      metrics: ["Heart Rate", "Steps", "Sleep"]
    }
  ]);

  const handleScanForDevices = () => {
    setIsScanning(true);
    
    // Simulate Bluetooth scanning
    toast.info("Scanning for Bluetooth devices...");
    
    setTimeout(() => {
      setIsScanning(false);
      toast.success("Scanning complete");
    }, 3000);
  };

  const handleConnectDevice = (deviceId: string) => {
    // Find the device in available devices
    const deviceToConnect = availableDevices.find(d => d.id === deviceId);
    
    if (deviceToConnect) {
      toast.info(`Connecting to ${deviceToConnect.name}...`);
      
      // Simulate connection delay
      setTimeout(() => {
        // Update available devices
        setAvailableDevices(prev => 
          prev.filter(d => d.id !== deviceId)
        );
        
        // Add to connected devices
        setDevices(prev => [
          ...prev, 
          {
            ...deviceToConnect,
            connected: true,
            lastSynced: "Just now"
          }
        ]);
        
        toast.success(`Connected to ${deviceToConnect.name}`);
      }, 2000);
    }
  };

  const handleDisconnectDevice = (deviceId: string) => {
    // Find the device
    const deviceToDisconnect = devices.find(d => d.id === deviceId);
    
    if (deviceToDisconnect) {
      toast.info(`Disconnecting from ${deviceToDisconnect.name}...`);
      
      // Simulate disconnect delay
      setTimeout(() => {
        // Remove from connected devices
        setDevices(prev => 
          prev.map(d => d.id === deviceId ? { ...d, connected: false, lastSynced: null } : d)
        );
        
        toast.success(`Disconnected from ${deviceToDisconnect.name}`);
      }, 1000);
    }
  };
  
  const handleSaveSettings = () => {
    toast.success("Device settings saved!");
  };

  const getDeviceIcon = (type: string) => {
    switch (type) {
      case "Smartwatch":
      case "Fitness Tracker":
        return <Activity className="h-5 w-5 text-primary" />;
      case "CGM":
      case "Glucose Meter":
        return <Droplet className="h-5 w-5 text-primary" />;
      default:
        return <BluetoothIcon className="h-5 w-5 text-primary" />;
    }
  };

  const getMetricIcon = (metric: string) => {
    switch (metric) {
      case "Heart Rate":
        return <HeartPulse className="h-4 w-4" />;
      case "Steps":
      case "Activity":
        return <Activity className="h-4 w-4" />;
      case "Glucose":
        return <Droplet className="h-4 w-4" />;
      default:
        return null;
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Connected Devices</CardTitle>
        <CardDescription>
          Manage your glucose meters and other connected health devices
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex justify-between">
          <h3 className="text-lg font-medium">Your Devices</h3>
          <Button 
            onClick={handleScanForDevices} 
            variant="outline" 
            size="sm"
            disabled={isScanning}
          >
            <BluetoothIcon className="h-4 w-4 mr-2" />
            {isScanning ? "Scanning..." : "Scan for Devices"}
          </Button>
        </div>
        
        <div className="space-y-4">
          {devices.map((device) => (
            <div key={device.id} className="flex items-center justify-between p-4 border rounded-lg bg-card">
              <div className="flex items-center">
                <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center mr-4">
                  {getDeviceIcon(device.type)}
                </div>
                <div>
                  <p className="font-medium">{device.name}</p>
                  <p className="text-sm text-muted-foreground">
                    {device.connected 
                      ? `Connected • Last synced ${device.lastSynced}` 
                      : "Not connected"}
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <div className="hidden md:flex space-x-1">
                  {device.metrics.map((metric, idx) => (
                    <Badge key={idx} variant="outline" className="flex items-center space-x-1">
                      {getMetricIcon(metric)}
                      <span>{metric}</span>
                    </Badge>
                  ))}
                </div>
                {device.connected ? (
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => handleDisconnectDevice(device.id)}
                  >
                    Disconnect
                  </Button>
                ) : (
                  <Button 
                    size="sm"
                    onClick={() => handleConnectDevice(device.id)}
                  >
                    Connect
                  </Button>
                )}
              </div>
            </div>
          ))}
          
          {availableDevices.length > 0 && (
            <>
              <Separator />
              <h3 className="text-lg font-medium">Available Devices</h3>
              
              {availableDevices.map((device) => (
                <div key={device.id} className="flex items-center justify-between p-4 border rounded-lg border-dashed">
                  <div className="flex items-center">
                    <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center mr-4">
                      {getDeviceIcon(device.type)}
                    </div>
                    <div>
                      <p className="font-medium">{device.name}</p>
                      <p className="text-sm text-muted-foreground">{device.type}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="hidden md:flex space-x-1">
                      {device.metrics.map((metric, idx) => (
                        <Badge key={idx} variant="outline" className="flex items-center space-x-1">
                          {getMetricIcon(metric)}
                          <span>{metric}</span>
                        </Badge>
                      ))}
                    </div>
                    <Button 
                      size="sm"
                      onClick={() => handleConnectDevice(device.id)}
                    >
                      Connect
                    </Button>
                  </div>
                </div>
              ))}
            </>
          )}
          
          {devices.length === 0 && availableDevices.length === 0 && (
            <div className="flex flex-col items-center justify-center py-6 text-center text-muted-foreground">
              <BluetoothIcon className="h-10 w-10 mb-2 opacity-50" />
              <p>No devices found. Click "Scan for Devices" to discover nearby Bluetooth devices.</p>
            </div>
          )}
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

          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Health data analytics</p>
              <p className="text-sm text-muted-foreground">Process health data for insights and trends</p>
            </div>
            <Switch defaultChecked />
          </div>
        </div>
        
        <div className="flex justify-end">
          <Button onClick={handleSaveSettings}>Save Changes</Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default DevicesSettings;
