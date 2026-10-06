import { toJalaali } from "jalaali-js";

// Maps Jalali month numbers to their Persian names.
const jalaliMonthsMap = {
  1: "فروردین",
  2: "اردیبهشت",
  3: "خرداد",
  4: "تیر",
  5: "مرداد",
  6: "شهریور",
  7: "مهر",
  8: "آبان",
  9: "آذر",
  10: "دی",
  11: "بهمن",
  12: "اسفند",
};

const jalaliWeekdays = [
  "یکشنبه",
  "دوشنبه",
  "سه‌شنبه",
  "چهارشنبه",
  "پنجشنبه",
  "جمعه",
  "شنبه",
];

export const getWeekday = (date) => {
  if (!date) return "";

  return jalaliWeekdays[new Date(date).getDay()];
};

const tourDays = (start, end) => {
  const startTime = new Date(start).getTime();
  const endTime = new Date(end).getTime();

  const millisecondsPerDay = 24 * 60 * 60 * 1000; // Convert the time difference from milliseconds to days.

  return (endTime - startTime) / millisecondsPerDay;
};

const padNumber = (value) => String(value).padStart(2, "0");

const getJalaliDateParts = (date) => {
  if (!date) return "";

  const parsedDate = new Date(date);

  return toJalaali(
    parsedDate.getFullYear(),
    parsedDate.getMonth() + 1,
    parsedDate.getDate()
  );
};

// toJalaliDateString("2026-07-30")
// "1405/05/08"
const toJalaliDateString = (date) => {
  if (!date) return "";
  const jalaliDate = getJalaliDateParts(date);
  if (!jalaliDate) return " ";

  const { jy, jm, jd } = jalaliDate;

  return `${jy}/${padNumber(jm)}/${padNumber(jd)}`;
};

const toJalaliDate = (date) => {
  const jalaliDate = getJalaliDateParts(date);

  if (!jalaliDate) return "";

  const { jy, jm, jd } = jalaliDate;
  const monthName = jalaliMonthsMap[jm];

  return `${jd} ${monthName} ${jy}`;
};

const extractDateParts = (date) => {
  if (!date) return "";

  return {
    day: padNumber(date.getDate()),
    month: padNumber(date.getMonth() + 1),
    year: String(date.getFullYear()),
  };
};

// Convert the date to the API's YYYY-MM-DD format.
const convertDateForApi = (date) => {
  if (!date) return "";

  const { day, month, year } = extractDateParts(date);

  return `${year}-${month}-${day}`;
};

// Convert Time

const toTime = (date) => {
  if (!date) return "";
  const toJsDate = new Date(date);
  const formatter = new Intl.DateTimeFormat("fa-IR", {
    timeZone: "Asia/Tehran",
    hour: "2-digit",
    minute: "2-digit",
  });
  return formatter.format(toJsDate);
};

export {
  tourDays,
  toJalaliDate,
  convertDateForApi,
  extractDateParts,
  toJalaliDateString,
  toTime,
};
