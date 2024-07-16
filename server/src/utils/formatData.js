module.exports.formatDate = (date) => {
  const today = new Date(date);

  let day = today.getDate();
  if (day > 0 && day < 10) {
    day = `0${day}`;
  }

  let month = today.getMonth() + 1;
  if (month > 0 && month < 10) {
    month = `0${month}`;
  }

  const year = today.getFullYear();

  return `${year}-${month}-${year}`;
};
