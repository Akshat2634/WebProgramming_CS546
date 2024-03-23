// You can add and export any helper functions you want here - if you aren't using any, then you can just leave this file as is
function isNumber(value) {
  return typeof value === "number" && !isNaN(value);
}

function isValidDate(dateString) {
  const parts = dateString.split("/");
  if (parts.length !== 3) {
    return false;
  }

  const day = parts[1];
  const month = parts[0];
  const year = parseInt(parts[2], 10);

  if (month.length !== 2 || day.length !== 2) {
    return false;
  }

  const dayNum = parseInt(day, 10);
  const monthNum = parseInt(month, 10) - 1;

  if (isNaN(day) || isNaN(month) || isNaN(year)) {
    return false;
  }

  if (year < 1000 || year > 9999 || month === 0 || month > 12) {
    return false;
  }

  const date = new Date(year, monthNum, dayNum);
  const now = new Date();

  if (date > now) {
    return false;
  }

  return date && date.getMonth() === monthNum && date.getDate() === dayNum;
}

export { isNumber, isValidDate };
