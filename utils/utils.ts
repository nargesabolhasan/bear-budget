type Parts = (string | false | undefined)[];

export default function twMerge(...parts: Parts) {
  return parts.filter(Boolean).join(" ");
}

export const convertToCurrency = (currency: number | string): string => {
  if (currency === null || currency === undefined) return "";

  const numericValue =
    typeof currency === "string" ? Number(currency) : currency;

  if (isNaN(numericValue) || !isFinite(numericValue)) return "";
  return new Intl.NumberFormat("en-US").format(Number(currency));
};
