// Convert English digits to Persian digits.
const e2p = (value) =>
  value.toString().replace(/\d/g, (digit) => "۰۱۲۳۴۵۶۷۸۹"[digit]);

// Convert Persian digits to English digits.
const p2e = (value) =>
  value.toString().replace(/[۰-۹]/g, (digit) => "۰۱۲۳۴۵۶۷۸۹".indexOf(digit));

// Add thousands separators and then convert the result to Persian digits.
const spNum = (number) => {
  const formattedNumber = number
    .toString()
    .match(/(\d+?)(?=(\d{3})+(?!\d)|$)/g)
    .join(",");

  return e2p(formattedNumber);
};

export { e2p, p2e, spNum };
