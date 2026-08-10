export const convertToCurrency = (currency: number | string): string => {
  if (currency === null || currency === undefined) return "";

  const numericValue =
    typeof currency === "string" ? Number(currency) : currency;

  if (isNaN(numericValue) || !isFinite(numericValue)) return "";
  return new Intl.NumberFormat("en-US").format(Number(currency));
};

/** Normalize pasted/typed amount input to ASCII digits (max 15). */
export const parseAmountInput = (value: string, maxLength = 15): string => {
  const englishDigits = value
    .replace(/[۰-۹]/g, (d) =>
      String(d.charCodeAt(0) - "۰".charCodeAt(0)),
    )
    .replace(/[٠-٩]/g, (d) =>
      String(d.charCodeAt(0) - "٠".charCodeAt(0)),
    );

  return englishDigits.replace(/\D/g, "").slice(0, maxLength);
};
