export const getUniqueByKey = (arr, key) => {
  if (!Array.isArray(arr) || !key) return [];
  
  const seen = new Set();

  return arr.filter((item) => {
    const value = item[key];

    if (seen.has(value)) {
      return false;
    }

    seen.add(value);
    return true;
  });
};
