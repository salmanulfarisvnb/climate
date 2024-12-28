import WeatherSkeleton from "@/components/loading-skeleton";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { useGeoLocation } from "@/hooks/use-geolocation";
import {
  useForecastQuery,
  useReverseGeocodeQuery,
  useWeatherQuery,
} from "@/hooks/useWeatherQuery";
import { AlertCircle, MapPin, RefreshCcw } from "lucide-react";
import CurrentWeather from "@/components/CurrentWeather";
import HourlyTemperature from "@/components/HourlyTemperature";
import WeatherDetails from "@/components/WeatherDetails";

const WeatherDashboard = () => {
  const {
    coordinates,
    error: locationError,
    getLocation,
    isLoading: isLocationLoading,
  } = useGeoLocation();

  const locationQuery = useReverseGeocodeQuery(coordinates);
  const weatherQuery = useWeatherQuery(coordinates);
  const forecastQuery = useForecastQuery(coordinates);

  const handleRefresh = () => {
    getLocation();
    locationQuery.refetch();
    weatherQuery.refetch();
    forecastQuery.refetch();
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

  if (locationError) {
    return (
      <Alert variant="destructive">
        <AlertCircle className="w-4 h-4" />
        <AlertTitle>Location required</AlertTitle>
        <AlertDescription className="flex flex-col gap-4">
          <p>
            please add enable your location access to see your local weather
          </p>
          <Button variant={"outline"} className="w-fit" onClick={getLocation}>
            <MapPin className="mr-2 size-4" />
            Enable Location
          </Button>
        </AlertDescription>
      </Alert>
    );
  }

  const locationName = locationQuery.data?.[0];

  if (weatherQuery.error || forecastQuery.error) {
    return (
      <Alert variant="destructive">
        <AlertCircle className="w-4 h-4" />
        <AlertTitle>Error</AlertTitle>
        <AlertDescription className="flex flex-col gap-4">
          <p>failed to fetch data . please try again</p>
          <Button variant={"outline"} className="w-fit" onClick={handleRefresh}>
            <RefreshCcw className="size-4" />
            retry
          </Button>
        </AlertDescription>
      </Alert>
    );
  }

  if (!weatherQuery.data || !forecastQuery.data) {
    return <WeatherSkeleton />;
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
          disabled={weatherQuery.isFetching || forecastQuery.isFetching}
        >
          <RefreshCcw
            className={`size-4 ${
              weatherQuery.isFetching ? "animate-spin" : ""
            }`}
          />
        </Button>
      </div>

      <div className="grid gap-4">
        <div className="flex flex-col gap-4 lg:flex-row">
          <CurrentWeather
            data={weatherQuery.data}
            locationName={locationName}
          />
          <HourlyTemperature data={forecastQuery.data} />
        </div>
        <div>
          <WeatherDetails data={weatherQuery.data} />
          {/* forecast */}
        </div>
      </div>
    </div>
  );
};
export default WeatherDashboard;
