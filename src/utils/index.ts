export const formatPrice = (price: number): string => {
  if (typeof price !== "number") return "";
  const formatter = new Intl.NumberFormat("nl-NL", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
  return `€${formatter.format(price)}`;
};
