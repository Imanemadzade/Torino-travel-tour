const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

export const getImageUrl = (image) => {
  if (!image) return "/placeholder.png";

  if (image.includes("localhost:10000")) {
    return image.replace("http://localhost:10000", BASE_URL);
  }

  if (image.startsWith("http")) return image;

  return `${BASE_URL}${image.startsWith("/") ? "" : "/"}${image}`;
};
