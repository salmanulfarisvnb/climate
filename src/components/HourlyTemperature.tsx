import { ForecastData } from "@/api/types";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { format } from "date-fns";
import { BorderTrail } from "./ui/border-trail";

interface HourlyTemperatureProps {
  data: ForecastData;
}

const HourlyTemperature = ({ data }: HourlyTemperatureProps) => {
  const chartData = data.list.slice(0, 8).map((item) => ({
    time: format(new Date(item.dt * 1000), "ha"),
    temp: Math.round(item.main.temp),
    feels_like: Math.round(item.main.feels_like),
  }));

  return (
    <div className="relative w-full">
      <BorderTrail
        style={{
          boxShadow:
            "0px 0px 60px 30px rgb(255 255 255 / 50%), 0 0 100px 60px rgb(0 0 0 / 50%), 0 0 140px 90px rgb(0 0 0 / 50%)",
        }}
      />
      <Card className="flex-1">
        <CardHeader>
          <CardTitle>Today Temperature</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[200] w-full">
            <ResponsiveContainer width="100%" height={200}>
              <LineChart data={chartData}>
                <XAxis
                  dataKey="time"
                  stroke="#888888"
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                />
                <YAxis
                  stroke="#888888"
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                  tickFormatter={(value) => `${value}°`}
                />
                <Tooltip
                  content={({ active, payload }) => {
                    if (active && payload && payload.length) {
                      return (
                        <div className="p-2 rounded-lg shadow-sm bg-background">
                          <div className="grid grid-cols-2 gap-2">
                            <div className="flex flex-col gap-2">
                              <span className="uppercase tex=[0.70rem] text-muted-foreground">
                                Temperature
                              </span>
                              <span className="font-bold">
                                {payload[0].value}°
                              </span>
                            </div>
                            <div className="flex flex-col gap-2">
                              <span className="uppercase tex=[0.70rem] text-muted-foreground">
                                feels Like
                              </span>
                              <span className="font-bold">
                                {payload[1].value}°
                              </span>
                            </div>
                          </div>
                        </div>
                      );
                    }
                    return null;
                  }}
                />
                f
                <Line
                  type="monotone"
                  dataKey="temp"
                  stroke="#2563eb"
                  activeDot={{ r: 8 }}
                  dot={false}
                  strokeWidth={2}
                />
                <Line
                  type="monotone"
                  dataKey="feels_like"
                  stroke="#64748b"
                  activeDot={{ r: 8 }}
                  dot={false}
                  strokeWidth={2}
                  strokeDasharray="5 5"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
export default HourlyTemperature;
