import axios from "axios";
import * as cheerio from "cheerio";
import { AFAD_URL } from "./consts";
import type { Earthquake } from "./types/earthquake";

const getAllEarthquakes = async (): Promise<Earthquake[]> => {
  try {
    const { data } = await axios.get(AFAD_URL);
    const $ = cheerio.load(data);

    const earthquakes: Earthquake[] = [];

    const rows = $("table tbody tr");

    rows.each((i, row) => {
      const columns = $(row).find("td");
      if (columns.length < 7) return;

      const extractColumnText = (idx: number) => $(columns[idx]).text().trim();

      const date = new Date(extractColumnText(0));
      const latitude = parseFloat(extractColumnText(1));
      const longitude = parseFloat(extractColumnText(2));
      const depth = parseFloat(extractColumnText(3));
      const type = extractColumnText(4) as Earthquake["type"];
      const size = parseFloat(extractColumnText(5));
      const place = extractColumnText(6);

      if (
        !isNaN(latitude) &&
        !isNaN(longitude) &&
        !isNaN(depth) &&
        !isNaN(size)
      )
        earthquakes.push({
          date,
          latitude,
          longitude,
          depth,
          type,
          size,
          place,
        });
    });

    return earthquakes;
  } catch (err: any) {
    throw new Error(
      "An error occurred while fetching earthquakes :" + err.toString()
    );
  }
};

export default {
  getAllEarthquakes,
};
export type { Earthquake };
