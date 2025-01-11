import { parse } from "date-fns";
import { StorageService } from "./StorageService";

export interface Achievement {
  achievement: string;
  date?: Date;
}

export const fetchAchievements = async (): Promise<Achievement[]> => {
  const googleSheetsLink = StorageService.getGoogleSheetsLink();
  if (!googleSheetsLink) throw new Error("Google Sheets link not set");

  const response = await fetch(googleSheetsLink);
  if (!response.ok) throw new Error("Failed to fetch achievements");
  const text = await response.text();
  return text
    .split("\n") // Split by line
    .slice(1) // Skip header
    .map((line) => {
      // Parse each line
      const [achievement, date] = line.split(",");
      return {
        achievement,
        date: date.trim()
          ? parse(date.trim(), "dd-MM-yyyy", new Date())
          : undefined,
      };
    });
};
