import React from "react";
import { WeatherData } from "../services/weatherApi";
import { Droplet, Wind } from "lucide-react";

interface WeatherCardProps {
  data: WeatherData | null;
}

const WeatherCard: React.FC<WeatherCardProps> = ({ data }) => {
  if (!data) {
    return null;
  }

  const getTemperatureColor = (temp: number) => {
    if (temp <= 20) return "text-blue-500";
    if (temp <= 26) return "text-green-500";
    if (temp <= 30) return "text-yellow-500";
    return "text-red-500";
  };

  const getHumidityColor = (humidity: number) => {
    if (humidity <= 30) return "text-yellow-500";
    if (humidity <= 60) return "text-green-500";
    return "text-blue-500";
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4 text-zinc-800">{data.name}</h2>
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
        <p className="text-lg mb-2 text-zinc-600">
          {data.weather[0].description}
        </p>
      )}
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <Droplet
            className={`w-5 h-5 mr-2 ${getHumidityColor(data.main.humidity)}`}
          />
          <p className="text-zinc-600">ความชื้น: {data.main.humidity}%</p>
        </div>
        <div className="flex items-center">
          <Wind className="w-5 h-5 mr-2 text-zinc-600" />
          <p className="text-zinc-600">ความเร็วลม: {data.wind.speed} (m/s)</p>
        </div>
      </div>
    </div>
  );
};

export default WeatherCard;
