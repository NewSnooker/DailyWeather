/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from "react";
import { getWeatherByCity, WeatherData } from "../services/weatherApi";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { MapPinned, SearchIcon } from "lucide-react";

interface SearchBarProps {
  onSearch: (data: WeatherData) => void;
  onError: (message: string) => void;
  setLoading: (loading: boolean) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({
  onSearch,
  onError,
  setLoading,
}) => {
  const [city, setCity] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!city.trim()) return;

    setLoading(true);
    try {
      const data = await getWeatherByCity(city);
      onSearch(data);
    } catch (error) {
      onError("ไม่พบข้อมูลเมืองที่ค้นหา");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4">
      <div className="relative">
        <MapPinned className="absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="ค้นหาเมือง..."
          className="w-full pl-8 "
        />
      </div>
      <Button type="submit" className="mt-2 w-full font-semibold">
        <SearchIcon className=" h-3 w-3" /> ค้นหา
      </Button>
    </form>
  );
};

export default SearchBar;
