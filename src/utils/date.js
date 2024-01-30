export const formatDateMonth = (date) => {
  const options = {
    year: "numeric",
    month: "long",
    day: "numeric",
  }
  return Intl.DateTimeFormat('ru', options).format(date);
}

export const formatDateForInput = (date) => {
  let d = new Date(date);
  let month = '' + (d.getMonth() + 1);
  let day = '' + d.getDate();
  let year = d.getFullYear();
  if (month.length < 2) 
    month = '0' + month;
  if (day.length < 2) 
    day = '0' + day;
  return [year, month, day].join('-');
}