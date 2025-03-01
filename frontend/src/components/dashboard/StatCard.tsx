
import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface StatCardProps {
  title: string;
  value: string | number;
  icon?: ReactNode;
  description?: string;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  className?: string;
  onClick?: () => void;
}

const StatCard = ({
  title,
  value,
  icon,
  description,
  trend,
  className,
  onClick,
}: StatCardProps) => {
  return (
    <div 
      className={cn(
        "p-6 rounded-2xl glass-card transition-all duration-300 hover:shadow-md",
        onClick && "cursor-pointer hover:translate-y-[-2px]",
        className
      )}
      onClick={onClick}
    >
      <div className="flex justify-between items-start mb-2">
        <h3 className="subtle-heading">{title}</h3>
        {icon && <span className="text-muted-foreground">{icon}</span>}
      </div>
      
      <div className="mt-2">
        <p className="text-3xl font-light">{value}</p>
        
        {trend && (
          <p className={cn(
            "text-sm mt-1",
            trend.isPositive ? "text-glucose-normal" : "text-glucose-low"
          )}>
            {trend.isPositive ? "↑" : "↓"} {trend.value}% from average
          </p>
        )}
        
        {description && (
          <p className="text-sm text-muted-foreground mt-1">{description}</p>
        )}
      </div>
    </div>
  );
};

export default StatCard;
