
import PageTransition from "@/components/common/PageTransition";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DownloadIcon, PrinterIcon, Share2 } from "lucide-react";
import { Area, AreaChart, CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

// Sample data for charts
const glucoseData = [
  { day: "Mon", average: 110, min: 95, max: 130 },
  { day: "Tue", average: 125, min: 110, max: 150 },
  { day: "Wed", average: 115, min: 90, max: 140 },
  { day: "Thu", average: 135, min: 120, max: 160 },
  { day: "Fri", average: 120, min: 105, max: 145 },
  { day: "Sat", average: 105, min: 90, max: 125 },
  { day: "Sun", average: 115, min: 100, max: 135 },
];

const combinedData = [
  { date: "Jun 10", glucose: 115, activity: 25, carbs: 80 },
  { date: "Jun 11", glucose: 125, activity: 30, carbs: 75 },
  { date: "Jun 12", glucose: 105, activity: 40, carbs: 65 },
  { date: "Jun 13", glucose: 130, activity: 15, carbs: 90 },
  { date: "Jun 14", glucose: 115, activity: 35, carbs: 70 },
  { date: "Jun 15", glucose: 110, activity: 20, carbs: 85 },
  { date: "Jun 16", glucose: 120, activity: 40, carbs: 60 },
];

const Reports = () => {
  return (
    <Layout>
      <PageTransition>
        <div className="space-y-8">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
            <div>
              <h1 className="heading-1">Health Reports</h1>
              <p className="text-muted-foreground mt-1">
                Comprehensive view of your health data
              </p>
            </div>
            
            <div className="flex space-x-2 mt-4 sm:mt-0">
              <Button variant="outline" size="sm" className="flex items-center">
                <PrinterIcon className="h-4 w-4 mr-2" />
                Print
              </Button>
              <Button variant="outline" size="sm" className="flex items-center">
                <DownloadIcon className="h-4 w-4 mr-2" />
                Export
              </Button>
              <Button variant="outline" size="sm" className="flex items-center">
                <Share2 className="h-4 w-4 mr-2" />
                Share
              </Button>
            </div>
          </div>
          
          <Tabs defaultValue="weekly">
            <div className="flex justify-between items-center mb-6">
              <TabsList>
                <TabsTrigger value="weekly">Weekly</TabsTrigger>
                <TabsTrigger value="monthly">Monthly</TabsTrigger>
                <TabsTrigger value="quarterly">Quarterly</TabsTrigger>
              </TabsList>
              
              <div className="flex items-center text-sm text-muted-foreground">
                <p>June 10 - June 16, 2023</p>
              </div>
            </div>
            
            <TabsContent value="weekly" className="space-y-6">
              <Card>
                <CardContent className="pt-6">
                  <h3 className="heading-3 mb-6">Glucose Levels</h3>
                  <div className="h-[350px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart
                        data={glucoseData}
                        margin={{ top: 10, right: 30, left: 0, bottom: 20 }}
                      >
                        <defs>
                          <linearGradient id="colorMax" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="hsl(var(--glucose-high))" stopOpacity={0.1} />
                            <stop offset="95%" stopColor="hsl(var(--glucose-high))" stopOpacity={0.01} />
                          </linearGradient>
                          <linearGradient id="colorMin" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="hsl(var(--glucose-low))" stopOpacity={0.1} />
                            <stop offset="95%" stopColor="hsl(var(--glucose-low))" stopOpacity={0.01} />
                          </linearGradient>
                          <linearGradient id="colorAvg" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3} />
                            <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0.05} />
                          </linearGradient>
                        </defs>
                        <XAxis 
                          dataKey="day" 
                          stroke="hsl(var(--muted-foreground))" 
                          tick={{ fontSize: 12 }}
                          tickLine={false}
                        />
                        <YAxis 
                          stroke="hsl(var(--muted-foreground))" 
                          tick={{ fontSize: 12 }}
                          tickLine={false}
                          domain={[80, 170]}
                        />
                        <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" vertical={false} />
                        <Tooltip 
                          contentStyle={{
                            backgroundColor: 'hsl(var(--card))',
                            borderColor: 'hsl(var(--border))',
                            borderRadius: '8px',
                          }}
                        />
                        <Legend />
                        <Area 
                          type="monotone" 
                          dataKey="max" 
                          stroke="hsl(var(--glucose-high))" 
                          fillOpacity={1}
                          fill="url(#colorMax)"
                          activeDot={{ r: 4 }}
                          name="Max"
                        />
                        <Area 
                          type="monotone" 
                          dataKey="min" 
                          stroke="hsl(var(--glucose-low))" 
                          fillOpacity={1}
                          fill="url(#colorMin)"
                          activeDot={{ r: 4 }}
                          name="Min"
                        />
                        <Area 
                          type="monotone" 
                          dataKey="average" 
                          stroke="hsl(var(--primary))" 
                          fillOpacity={1}
                          fill="url(#colorAvg)"
                          strokeWidth={2}
                          activeDot={{ r: 6 }}
                          name="Average"
                        />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="pt-6">
                  <h3 className="heading-3 mb-6">Combined Health Metrics</h3>
                  <div className="h-[350px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart
                        data={combinedData}
                        margin={{ top: 10, right: 30, left: 0, bottom: 20 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" vertical={false} />
                        <XAxis 
                          dataKey="date" 
                          stroke="hsl(var(--muted-foreground))" 
                          tick={{ fontSize: 12 }}
                          tickLine={false}
                        />
                        <YAxis 
                          yAxisId="left"
                          stroke="hsl(var(--muted-foreground))" 
                          tick={{ fontSize: 12 }}
                          tickLine={false}
                          domain={[0, 200]}
                        />
                        <YAxis 
                          yAxisId="right"
                          orientation="right"
                          stroke="hsl(var(--muted-foreground))" 
                          tick={{ fontSize: 12 }}
                          tickLine={false}
                          domain={[0, 60]}
                        />
                        <Tooltip 
                          contentStyle={{
                            backgroundColor: 'hsl(var(--card))',
                            borderColor: 'hsl(var(--border))',
                            borderRadius: '8px',
                          }}
                        />
                        <Legend />
                        <Line 
                          yAxisId="left"
                          type="monotone" 
                          dataKey="glucose" 
                          stroke="hsl(var(--primary))" 
                          strokeWidth={2}
                          dot={{ r: 4 }}
                          activeDot={{ r: 6 }}
                          name="Glucose (mg/dL)"
                        />
                        <Line 
                          yAxisId="left"
                          type="monotone" 
                          dataKey="carbs" 
                          stroke="hsl(var(--glucose-high))" 
                          strokeWidth={2}
                          dot={{ r: 4 }}
                          activeDot={{ r: 6 }}
                          name="Carbs (g)"
                        />
                        <Line 
                          yAxisId="right"
                          type="monotone" 
                          dataKey="activity" 
                          stroke="hsl(var(--glucose-normal))" 
                          strokeWidth={2}
                          dot={{ r: 4 }}
                          activeDot={{ r: 6 }}
                          name="Activity (min)"
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardContent className="pt-6">
                    <h3 className="heading-3 mb-4">Summary Statistics</h3>
                    
                    <div className="space-y-4">
                      <div className="flex justify-between py-2 border-b">
                        <p>Average Glucose</p>
                        <p className="font-medium">118 mg/dL</p>
                      </div>
                      <div className="flex justify-between py-2 border-b">
                        <p>Glucose Variability</p>
                        <p className="font-medium">22%</p>
                      </div>
                      <div className="flex justify-between py-2 border-b">
                        <p>Time in Range</p>
                        <p className="font-medium">78%</p>
                      </div>
                      <div className="flex justify-between py-2 border-b">
                        <p>High Readings</p>
                        <p className="font-medium">14%</p>
                      </div>
                      <div className="flex justify-between py-2">
                        <p>Low Readings</p>
                        <p className="font-medium">8%</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardContent className="pt-6">
                    <h3 className="heading-3 mb-4">Lifestyle Impact</h3>
                    
                    <div className="space-y-4">
                      <div className="flex justify-between py-2 border-b">
                        <p>Total Activity</p>
                        <p className="font-medium">205 minutes</p>
                      </div>
                      <div className="flex justify-between py-2 border-b">
                        <p>Average Daily Carbs</p>
                        <p className="font-medium">75g</p>
                      </div>
                      <div className="flex justify-between py-2 border-b">
                        <p>Medication Adherence</p>
                        <p className="font-medium">92%</p>
                      </div>
                      <div className="flex justify-between py-2 border-b">
                        <p>Sleep Average</p>
                        <p className="font-medium">7.2 hours</p>
                      </div>
                      <div className="flex justify-between py-2">
                        <p>Stress Level</p>
                        <p className="font-medium">Moderate</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
            
            <TabsContent value="monthly">
              <div className="flex items-center justify-center h-[400px] border rounded-lg">
                <p className="text-muted-foreground">Monthly reports will be available here</p>
              </div>
            </TabsContent>
            
            <TabsContent value="quarterly">
              <div className="flex items-center justify-center h-[400px] border rounded-lg">
                <p className="text-muted-foreground">Quarterly reports will be available here</p>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </PageTransition>
    </Layout>
  );
};

export default Reports;
