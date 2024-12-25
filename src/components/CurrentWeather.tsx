import type { GeocodingResponse, WeatherData } from "@/api/types";
import { Card, CardContent } from "./ui/card";
import { ArrowDown, ArrowUp, Droplets, Wind } from "lucide-react";

interface CurrentWeatherProps {
  data: WeatherData;
  locationName: GeocodingResponse | undefined;
}

const CurrentWeather = ({ data, locationName }: CurrentWeatherProps) => {
  console.log(data);
  const {
    weather: [currentWeather],
    main: { temp, feels_like, humidity, temp_max, temp_min },
    wind: { speed },
  } = data;

  const formatTemp = (temp: number) => `${Math.round(temp)}°`;

  return (
    <Card className="overflow-hidden">
      <CardContent className="p-6">
        <div className="grid gap-6 md:grid-cols-2">
          <div className="space-y-2">
            <div className="flex items-end gap-1">
              <h2 className="text-2xl font-bold tracking-tighter">
                {locationName?.name}
              </h2>
              {locationName?.state && (
                <span className="text-sm text-muted-foreground">
                  ,{locationName?.state}
                </span>
              )}
            </div>
            <p className="text-sm text-muted-foreground">
              {locationName?.country}
            </p>
            <div className="flex gap-3 space-y-3">
              <p className="font-bold tracking-tighter text-7xl">
                {formatTemp(temp)}
              </p>
              <div className="space-y-1 font-medium">
                <p className="text-sm text-muted-foreground">
                  Feels Like {formatTemp(feels_like)}
                </p>
                <div className="flex gap-2 text-sm ">
                  <span className="flex items-center gap-1 text-blue-500">
                    <ArrowDown className="size-4" />
                    {formatTemp(temp_min)}
                  </span>
                  <span className="flex items-center gap-1 text-red-500">
                    <ArrowUp className=" size-4" />
                    {formatTemp(temp_max)}
                  </span>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center gap-3 text-sm font-medium">
                <Droplets className="text-blue-500 size-4" />
                <div>
                  <p>Humidity</p>
                  <span className="text-muted-foreground">{humidity}%</span>
                </div>
              </div>
              <div className="flex items-center gap-3 text-sm font-medium">
                <Wind className="text-blue-500 size-4" />
                <div>
                  <p>WindSpeed</p>
                  <span className="text-muted-foreground">{speed}m/s</span>
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col items-center justify-center">
            <div className="relative flex items-center justify-center w-full max-w-[200px] aspect-square">
              <img
                className="object-contain w-full h-full"
                src={` https://openweathermap.org/img/wn/${currentWeather.icon}@4x.png`}
                alt={currentWeather.description}
              />
              <div className="absolute text-center bottom-2 ">
                <p className="text-sm font-medium capitalize">
                  {currentWeather.description}
                </p>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
export default CurrentWeather;
