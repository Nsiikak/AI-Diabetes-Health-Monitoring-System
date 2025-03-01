
import { useState } from "react";
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

// Sample data
const todayData = [
  { time: "12 AM", glucose: 110 },
  { time: "3 AM", glucose: 95 },
  { time: "6 AM", glucose: 105 },
  { time: "9 AM", glucose: 140 },
  { time: "12 PM", glucose: 130 },
  { time: "3 PM", glucose: 115 },
  { time: "6 PM", glucose: 120 },
  { time: "9 PM", glucose: 105 },
  { time: "11 PM", glucose: 100 },
];

const weekData = [
  { time: "Mon", glucose: 110 },
  { time: "Tue", glucose: 125 },
  { time: "Wed", glucose: 115 },
  { time: "Thu", glucose: 130 },
  { time: "Fri", glucose: 105 },
  { time: "Sat", glucose: 120 },
  { time: "Sun", glucose: 110 },
];

const monthData = [
  { time: "Week 1", glucose: 115 },
  { time: "Week 2", glucose: 110 },
  { time: "Week 3", glucose: 120 },
  { time: "Week 4", glucose: 105 },
];

type TimeRange = "today" | "week" | "month";

const GlucoseChart = () => {
  const [timeRange, setTimeRange] = useState<TimeRange>("today");

  const data = 
    timeRange === "today" ? todayData : 
    timeRange === "week" ? weekData : 
    monthData;

  const getGradientOffset = () => {
    const dataMax = Math.max(...data.map((d) => d.glucose));
    const dataMin = Math.min(...data.map((d) => d.glucose));
    
    if (dataMax <= 0) {
      return 0;
    }
    if (dataMin >= 0) {
      return 1;
    }
    
    return dataMax / (dataMax - dataMin);
  };

  const gradientOffset = getGradientOffset();

  // Custom tooltip
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const glucose = payload[0].value;
      let status = "Normal";
      let statusColor = "text-glucose-normal";
      
      if (glucose < 80) {
        status = "Low";
        statusColor = "text-glucose-low";
      } else if (glucose > 130) {
        status = "High";
        statusColor = "text-glucose-high";
      }
      
      return (
        <div className="glass-card p-3 border border-border shadow-sm">
          <p className="font-medium">{label}</p>
          <p className="text-xl font-light mt-1">{glucose} mg/dL</p>
          <p className={`text-sm font-medium ${statusColor} mt-1`}>{status}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="w-full h-full">
      <div className="flex justify-between items-center mb-6">
        <h3 className="heading-2">Glucose Levels</h3>
        <div className="flex space-x-2">
          <button 
            onClick={() => setTimeRange("today")}
            className={`px-4 py-1.5 text-sm rounded-full transition-all duration-300 ${
              timeRange === "today" 
                ? "bg-primary text-primary-foreground" 
                : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
            }`}
          >
            Today
          </button>
          <button 
            onClick={() => setTimeRange("week")}
            className={`px-4 py-1.5 text-sm rounded-full transition-all duration-300 ${
              timeRange === "week" 
                ? "bg-primary text-primary-foreground" 
                : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
            }`}
          >
            Week
          </button>
          <button 
            onClick={() => setTimeRange("month")}
            className={`px-4 py-1.5 text-sm rounded-full transition-all duration-300 ${
              timeRange === "month" 
                ? "bg-primary text-primary-foreground" 
                : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
            }`}
          >
            Month
          </button>
        </div>
      </div>

      <div className="h-[350px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={data}
            margin={{ top: 20, right: 20, left: 0, bottom: 20 }}
          >
            <defs>
              <linearGradient id="splitColor" x1="0" y1="0" x2="0" y2="1">
                <stop offset={gradientOffset} stopColor="hsl(var(--glucose-high))" stopOpacity={0.3} />
                <stop offset={gradientOffset} stopColor="hsl(var(--glucose-normal))" stopOpacity={0.3} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" vertical={false} />
            <XAxis 
              dataKey="time" 
              stroke="hsl(var(--muted-foreground))" 
              tick={{ fontSize: 12 }}
              tickLine={false}
            />
            <YAxis 
              stroke="hsl(var(--muted-foreground))" 
              tick={{ fontSize: 12 }}
              tickLine={false}
              domain={[60, 200]}
              ticks={[70, 100, 130, 160, 190]}
            />
            <Tooltip content={<CustomTooltip />} />
            <Area 
              type="monotone" 
              dataKey="glucose" 
              stroke="hsl(var(--primary))" 
              strokeWidth={2}
              fill="url(#splitColor)" 
              activeDot={{ 
                r: 6, 
                strokeWidth: 1, 
                stroke: "hsl(var(--background))"
              }} 
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default GlucoseChart;
