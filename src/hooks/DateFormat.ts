const originalDate = new Date();

const formattedDate = originalDate.toLocaleDateString("en-US", {
  day: "numeric",
  month: "short",
  year: "numeric",
});

const formattedTime = originalDate.toLocaleTimeString("en-US", {
  hour: "2-digit",
  minute: "2-digit",
  second: "2-digit",
  hour12: false,
});

export const formattedDateTime = `${formattedDate} ${formattedTime}`;
