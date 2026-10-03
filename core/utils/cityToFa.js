const CITY_NAMES_FA = {
  tehran: "تهران",
  sananndaj: "سنندج",
  madrid: "مادرید",
  isfahan: "اصفهان",
  sulaymaniyah: "سلیمانیه",
  hewler: "هولر",
  mazandaran: "مازندران",
  gilan: "گیلان",
  italy: "ایتالیا",
  offroad: "تهران",
};

export const cityToFa = (city) => {
  if (city === null || city === undefined) return " ";
  const lowerCaseCity = city.toLowerCase();
  if (!CITY_NAMES_FA[lowerCaseCity]) return " ";
  return CITY_NAMES_FA[lowerCaseCity];
};
