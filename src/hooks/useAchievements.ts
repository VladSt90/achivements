import { useEffect, useState } from "react";
import { fetchAchievements } from "../services/apiService";
import { useFetchData } from "./useFetchData";

const ACHIEVEMENT_SWITCH_INTERVAL = 40000;

export const useAchievements = () => {
  const {
    data: achievements,
    loading,
    error,
    refetch,
  } = useFetchData(fetchAchievements);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (achievements && achievements.length > 0) {
      const interval = setInterval(() => {
        setCurrentIndex((prev) => {
          if (prev < 19) {
            return prev + 1;
          } else {
            const remainingAchievements = achievements.slice(20);
            const randomIndex = Math.floor(
              Math.random() * remainingAchievements.length
            );
            return 20 + randomIndex;
          }
        });
      }, ACHIEVEMENT_SWITCH_INTERVAL);

      return () => clearInterval(interval);
    }
  }, [achievements]);

  const currentAchievement = achievements ? achievements[currentIndex] : null;

  return { currentAchievement, loading, error, refetch };
};
