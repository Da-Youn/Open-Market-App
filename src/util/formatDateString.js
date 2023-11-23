export function formatDateString(originalDate) {
  const dateObject = new Date(originalDate);
  const year = dateObject.getFullYear();
  const month = dateObject.getMonth() + 1;
  const day = dateObject.getDate();

  const formattedDate = `${year}. ${month}. ${day}`;
  return formattedDate;
}
