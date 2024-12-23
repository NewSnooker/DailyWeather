import React, { useEffect, useState } from "react";
import { getWeatherByCity, WeatherData } from "./services/weatherApi";
import SearchBar from "./components/SearchBar";
import WeatherCard from "./components/WeatherCard";
import FeaturedCities from "./components/FeaturedCities";
import { Skeleton } from "./components/ui/skeleton";

const App: React.FC = () => {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = (data: WeatherData) => {
    setWeatherData(data);
    setError(null);
  };

  const handleError = (message: string) => {
    setError(message);
    setWeatherData(null);
  };
  useEffect(() => {
    const loadInitialData = async () => {
      setLoading(true);
      try {
        const data = await getWeatherByCity("กรุงเทพมหานคร");
        setWeatherData(data);
      } catch (error) {
        if (error instanceof Error) {
          setError(error.message);
        } else {
          setError("เกิดข้อผิดพลาดที่ไม่ทราบสาเหตุ");
        }
      } finally {
        setLoading(false);
      }
    };

    loadInitialData();
  }, []);

  return (
    <div className="min-h-screen bg-zinc-100 p-4 md:p-16">
      <div className="max-w-md mx-auto">
        <h1 className="scroll-m-20 mb-4 sm:mb-8 text-3xl text-center font-extrabold tracking-tight md:text-5xl">
          DailyWeather
        </h1>
        <SearchBar
          onSearch={handleSearch}
          onError={handleError}
          setLoading={setLoading}
        />
        <FeaturedCities onCitySelect={handleSearch} setLoading={setLoading} />{" "}
        {loading ? (
          <div className="bg-white p-6 rounded-lg shadow-md">
            <Skeleton className="h-8 w-3/4 mb-4" />
            <div className="flex items-center justify-between mb-4">
              <Skeleton className="h-16 w-24" />
              <Skeleton className="h-20 w-20 rounded-full" />
            </div>
            <Skeleton className="h-4 w-full mb-2" />
            <Skeleton className="h-4 w-3/4" />
          </div>
        ) : (
          weatherData && <WeatherCard data={weatherData} />
        )}
        {!loading && error && (
          <p className="text-center text-red-500">{error}</p>
        )}
      </div>
    </div>
  );
};

export default App;
