export interface Earthquake {
  date: Date;
  latitude: number;
  longitude: number;
  depth: number;
  type: "ML" | "MW";
  size: number;
  place: string;
}
