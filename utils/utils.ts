type Parts = (string | false | undefined)[];

export default function twMerge(...parts: Parts) {
  return parts.filter(Boolean).join(" ");
}

export const currencyFormater = (currency: number | string): string => {
  if (currency === "" || currency === null || currency === undefined) return "";
  return new Intl.NumberFormat("en-US").format(Number(currency));
};
