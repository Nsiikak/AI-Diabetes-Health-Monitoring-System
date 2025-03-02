
import ActivityTracker from "@/components/dashboard/ActivityTracker";
import DietTracker from "@/components/dashboard/DietTracker";
import GlucoseChart from "@/components/dashboard/GlucoseChart";
import GlucoseInput from "@/components/dashboard/GlucoseInput";
import MedicationTracker from "@/components/dashboard/MedicationTracker";
import StatCard from "@/components/dashboard/StatCard";
import Layout from "@/components/layout/Layout";
import PageTransition from "@/components/common/PageTransition";
import { Activity, Droplet, Pill, UtensilsCrossed } from "lucide-react";

const Index = () => {
  return (
    <Layout>
      <PageTransition>
        <div className="space-y-8">
          <div>
            <h1 className="heading-1">Hello, John</h1>
            <p className="text-muted-foreground mt-1">
              Here's an overview of your health today
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <StatCard
              title="Current Glucose"
              value="112 mg/dL"
              icon={<Droplet className="h-5 w-5" />}
              description="Last reading 35 min ago"
              trend={{ value: 4, isPositive: false }}
            />
            <StatCard
              title="Average Glucose"
              value="118 mg/dL"
              icon={<Droplet className="h-5 w-5" />}
              description="Last 7 days"
              trend={{ value: 2, isPositive: true }}
            />
            <StatCard
              title="Medications"
              value="1/3 Taken"
              icon={<Pill className="h-5 w-5" />}
              description="Next: Insulin at 12:30 PM"
            />
            <StatCard
              title="Activity"
              value="25 min"
              icon={<Activity className="h-5 w-5" />}
              description="83% of daily goal"
              trend={{ value: 5, isPositive: true }}
            />
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 glass-card p-6 rounded-2xl">
              <GlucoseChart />
            </div>
            <div>
              <GlucoseInput />
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <ActivityTracker />
            <MedicationTracker />
            <DietTracker />
          </div>
        </div>
      </PageTransition>
    </Layout>
  );
};

export default Index;
