export const ISOtoTime = (iso: string) => {
  return new Date(iso).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });
};

export const ISOtoDay = (iso: string) => {
  return new Date(iso).getUTCDate();
};

export const ISOtoWeekday = (iso: string) => {
  return new Date(iso).toLocaleDateString("en-US", {
    weekday: "short",
  });
};

export const capitalize = (str: string) =>
  str.charAt(0).toUpperCase() + str.slice(1);
