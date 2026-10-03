const vehicelesMap = {
  bus: "اتوبوس",
  ship: "کشتی",
  train: "قطار",
  airplane: "هواپیما",
  suv: "شاسی بلند",
  van: "ون",
};

export const vehicleToFa = (vehicle) => {
  if (vehicle === null || vehicle === undefined) return "_";
  const lowerCaseVehicle = vehicle.toLowerCase();
  if (!vehicelesMap[lowerCaseVehicle]) return vehicle;
  return vehicelesMap[lowerCaseVehicle];
};
