export function getKoreaTime() {
  const currentDate = new Date();
  const koreaOffset = 9 * 60; // UTC+9
  currentDate.setMinutes(currentDate.getMinutes() + koreaOffset);

  const mysqlDateFormat = currentDate.toISOString().slice(0, 10);
  return mysqlDateFormat;
}
