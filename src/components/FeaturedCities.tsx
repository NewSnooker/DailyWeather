import React from "react";
import { getWeatherByCity, WeatherData } from "../services/weatherApi";
import { Button } from "./ui/button";

interface FeaturedCitiesProps {
  onCitySelect: (data: WeatherData) => void;
  setLoading: (loading: boolean) => void;
}

const FeaturedCities: React.FC<FeaturedCitiesProps> = ({
  onCitySelect,
  setLoading,
}) => {
  const cities = ["กรุงเทพมหานคร", "เชียงใหม่", "ภูเก็ต", "พัทยา"];

  const handleCityClick = async (city: string) => {
    setLoading(true);
    try {
      const data = await getWeatherByCity(city);
      onCitySelect(data);
      setLoading(false);
    } catch (error) {
      console.error("Failed to fetch weather for featured city:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mb-4">
      <h3 className="text-lg font-semibold mb-2">เมืองยอดนิยม</h3>
      <div className="grid grid-cols-2 gap-2">
        {cities.map((city) => (
          <Button
            key={city}
            onClick={() => handleCityClick(city)}
            variant={"outline"}
            className=""
          >
            {city}
          </Button>
        ))}
      </div>
    </div>
  );
};

export default FeaturedCities;
