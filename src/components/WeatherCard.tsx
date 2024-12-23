import React from "react";
import { WeatherData } from "../services/weatherApi";
import { Building2, Droplet, Wind } from "lucide-react";

interface WeatherCardProps {
  data: WeatherData | null;
}

const WeatherCard: React.FC<WeatherCardProps> = ({ data }) => {
  if (!data) {
    return null;
  }

  const getTemperatureColor = (temp: number) => {
    if (temp <= 20) return "text-blue-300";
    if (temp <= 26) return "text-blue-500";
    if (temp <= 30) return "text-yellow-500";
    return "text-red-500";
  };

  const getHumidityColor = (humidity: number) => {
    if (humidity <= 30) return "text-yellow-500";
    if (humidity <= 60) return "text-green-500";
    return "text-blue-500";
  };

  const formatDate = (timestamp: number) => {
    const date = new Date(timestamp * 1000);
    return date.toLocaleDateString("th-TH", {
      weekday: "short",
      year: "numeric",
      month: "narrow",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md ">
      <div className="flex items-center justify-between md:mb-2">
        <div className="flex items-center text-2xl font-bold text-zinc-800">
          <Building2 className="w-5 h-5 mr-2" />
          <h2>{data.name}</h2>
        </div>
        <div className=" hidden md:flex items-center text-sm text-zinc-600  ">
          <p>{formatDate(data.dt)}</p>
        </div>
      </div>
      <div className="md:hidden flex items-center text-sm text-zinc-600  ">
        <p>{formatDate(data.dt)}</p>
      </div>
      <div className="flex items-center justify-between mb-4">
        <p
          className={`text-5xl font-bold ${getTemperatureColor(
            data.main.temp
          )}`}
        >
          {Math.round(data.main.temp)}°C
        </p>
        {data.weather[0] && (
          <img
            src={`http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`}
            alt={data.weather[0].description}
            className="w-20 h-20"
          />
        )}
      </div>
      {data.weather[0] && (
        <p className="text-lg mb-4 text-zinc-600">
          {data.weather[0].description}
        </p>
      )}
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <Droplet
            className={`w-5 h-5 mr-2 ${getHumidityColor(data.main.humidity)}`}
          />
          <span className="text-zinc-600">
            {" "}
            <span className="hidden sm:inline">ความชื้น:</span>{" "}
            {data.main.humidity}%
          </span>
        </div>
        <div className="flex items-center">
          <Wind className="w-5 h-5 mr-2 text-zinc-600" />
          <span className="text-zinc-600">
            <span className="hidden sm:inline"> ความเร็วลม:</span>{" "}
            {data.wind.speed} (m/s)
          </span>
        </div>
      </div>
    </div>
  );
};

export default WeatherCard;
