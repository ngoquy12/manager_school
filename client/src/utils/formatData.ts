export const formatDate = (date: any, format: string): string => {
  const today = new Date(date);

  // Lấy ra ngày hiện tại
  let day: string = today.getDate().toString();
  if (today.getDate() < 10) {
    day = String(`0${day}`);
  }

  // Lấy ra tháng hiện tại
  let month = (today.getMonth() + 1).toString();
  if (today.getMonth() + 1 < 10) {
    month = String(`0${month}`);
  }

  // Lấy ra năm hiện tại
  const year: number = today.getFullYear();

  return format == "yyyy-MM-dd"
    ? `${year}-${month}-${day}`
    : `${day}-${month}-${year}`;
};
