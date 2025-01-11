import { differenceInDays, format, startOfDay } from "date-fns";

export const formatDate = (date: Date): string => {
  const todayStartOfDay = startOfDay(new Date());
  const diffDays = differenceInDays(todayStartOfDay, date);

  if (diffDays === 0) {
    return "today";
  } else if (diffDays === 1) {
    return "yesterday";
  } else if (diffDays < 7) {
    return `${diffDays} days ago`;
  } else if (diffDays < 14) {
    return "a week ago";
  } else {
    return format(date, "MMMM yyyy");
  }
};
