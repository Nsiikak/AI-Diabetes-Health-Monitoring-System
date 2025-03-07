import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BellIcon, TabletIcon, UserIcon } from "lucide-react";
import ProfileSettings from "./ProfileSettings";
import DevicesSettings from "./DevicesSettings";
import NotificationsSettings from "./NotificationsSettings";

const SettingsTabs = () => {
  return (
    <Tabs defaultValue="profile" className="space-y-6">
      <TabsList className="grid w-full grid-cols-3 max-w-md">
        <TabsTrigger value="profile" className="flex items-center">
          <UserIcon className="h-4 w-4 mr-2" />
          Profile
        </TabsTrigger>
        <TabsTrigger value="devices" className="flex items-center">
          <TabletIcon className="h-4 w-4 mr-2" />
          Devices
        </TabsTrigger>
        <TabsTrigger value="notifications" className="flex items-center">
          <BellIcon className="h-4 w-4 mr-2" />
          Notifications
        </TabsTrigger>
      </TabsList>
      
      <TabsContent value="profile">
        <ProfileSettings />
      </TabsContent>
      
      <TabsContent value="devices">
        <DevicesSettings />
      </TabsContent>
      
      <TabsContent value="notifications">
        <NotificationsSettings />
      </TabsContent>
    </Tabs>
  );
};

export default SettingsTabs;
