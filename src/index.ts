import axios from "axios";
import * as cheerio from "cheerio";
import { AFAD_URL } from "./consts";

type EarthquakeData = {
  date: string;
  latitude: number;
  longitude: number;
  depth: number;
  type: "ML" | "MW";
  size: number;
  place: string;
};

const getAllEarthquakes = async (): Promise<{
  type: "SUCCESS" | "ERROR";
  data: EarthquakeData[];
}> => {
  try {
    const { data } = await axios.get(AFAD_URL);
    const $ = cheerio.load(data);
    const earthquakes: EarthquakeData[] = [];

    const rows = $("table tbody tr");
    for (let i = 0; i < rows.length; i++) {
      const columns = $(rows[i]).find("td");
      if (columns.length < 7) continue;

      const date = $(columns[0]).text().trim();
      const latitude = parseFloat($(columns[1]).text().trim());
      const longitude = parseFloat($(columns[2]).text().trim());
      const depth = parseFloat($(columns[3]).text().trim());
      const typeText = $(columns[4]).text().trim().toUpperCase();
      const type = typeText === "ML" || typeText === "MW" ? typeText : "ML";
      const size = parseFloat($(columns[5]).text().trim());
      const place = $(columns[6]).text().trim();

      if (
        !isNaN(latitude) &&
        !isNaN(longitude) &&
        !isNaN(depth) &&
        !isNaN(size)
      ) {
        earthquakes.push({
          date,
          latitude,
          longitude,
          depth,
          type,
          size,
          place,
        });
      }
    }

    return { type: "SUCCESS", data: earthquakes };
  } catch (error) {
    return { type: "ERROR", data: [] };
  }
};

export default {
  getAllEarthquakes,
};
