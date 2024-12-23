import WeatherSkeleton from "@/components/loading-skeleton";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { useGeoLocation } from "@/hooks/use-geolocation";

import { AlertCircle, MapPin, RefreshCcw } from "lucide-react";

const WeatherDashboard = () => {
  const {
    coordinates,
    error: locationError,
    getLocation,
    isLoading: isLocationLoading,
  } = useGeoLocation();

  const handleRefresh = () => {
    getLocation();
    //reload weather data
  };

  if (isLocationLoading) return <WeatherSkeleton />;

  if (!coordinates) {
    return (
      <Alert variant="destructive">
        <AlertCircle className="w-4 h-4" />
        <AlertTitle>Location required</AlertTitle>
        <AlertDescription className="flex flex-col gap-4">
          <p>Please enable location access to see your local weather</p>
          <Button variant={"outline"} className="w-fit" onClick={getLocation}>
            <MapPin className="mr-2 size-4" />
            Enable Location
          </Button>
        </AlertDescription>
      </Alert>
    );
  }
  return (
    <div>
      {/* favorite cities */}
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-bold tracking-tight">My Location</h1>
        <Button
          variant={"outline"}
          size={"icon"}
          onClick={handleRefresh}
          // disabled={}
        >
          <RefreshCcw className="size-4" />
        </Button>
      </div>
    </div>
  );
};
export default WeatherDashboard;
