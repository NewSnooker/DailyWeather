import axios from "axios";

const API_KEY = import.meta.env.VITE_OPENWEATHERMAP_API_KEY;
const BASE_URL = "https://api.openweathermap.org/data/2.5";

export interface WeatherData {
  main: {
    temp: number;
    humidity: number;
  };
  weather: Array<{
    description: string;
    icon: string;
  }>;
  name: string;
  wind: { speed: number };
}

export const getWeatherByCity = async (city: string): Promise<WeatherData> => {
  try {
    const response = await axios.get(`${BASE_URL}/weather`, {
      params: {
        q: city,
        units: "metric",
        appid: API_KEY,
        lang: "th",
      },
    });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.error("API Error:", error.response.data);
        throw new Error(
          `API Error: ${error.response.status} - ${error.response.data.message}`
        );
      } else if (error.request) {
        // The request was made but no response was received
        console.error("No response received:", error.request);
        throw new Error(
          "ไม่ได้รับการตอบกลับจากเซิร์ฟเวอร์ กรุณาลองใหม่อีกครั้ง"
        );
      } else {
        // Something happened in setting up the request that triggered an Error
        console.error("Error setting up request:", error.message);
        throw new Error("เกิดข้อผิดพลาดในการตั้งค่าคำขอ กรุณาลองใหม่อีกครั้ง");
      }
    } else {
      console.error("Unexpected error:", error);
      throw new Error("เกิดข้อผิดพลาดที่ไม่คาดคิด กรุณาลองใหม่อีกครั้ง");
    }
  }
};
