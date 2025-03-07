import PageTransition from "@/components/common/PageTransition";
import Layout from "@/components/layout/Layout";
import SettingsTabs from "@/components/settings/SettingsTabs";

const Settings = () => {
  return (
    <Layout>
      <PageTransition>
        <div className="space-y-8">
          <div>
            <h1 className="heading-1">Settings</h1>
            <p className="text-muted-foreground mt-1">
              Manage your account settings and preferences
            </p>
          </div>
          
          <SettingsTabs />
        </div>
      </PageTransition>
    </Layout>
  );
};

export default Settings;
