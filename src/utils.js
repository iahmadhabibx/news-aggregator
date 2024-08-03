export const formatDateString = (dateString) => {
  const date = new Date(dateString);

  const year = date.getUTCFullYear();
  const month = date.toLocaleString("default", { month: "long" });
  const day = date.getUTCDate();
  const hours = date.getUTCHours();
  const minutes = date.getUTCMinutes().toString().padStart(2, "0");
  const seconds = date.getUTCSeconds().toString().padStart(2, "0");
  const ampm = hours >= 12 ? "PM" : "AM";

  const hours12 = hours % 12 || 12; // Convert 0 to 12 for midnight
  return `${month} ${day}, ${year} at ${hours12}:${minutes}:${seconds} ${ampm} UTC`;
};
