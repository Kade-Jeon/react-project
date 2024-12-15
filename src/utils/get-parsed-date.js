const dayInKorea = ["일", "월", "화", "수", "목", "금", "토"];

const getParsedDate = (targetDate) => {
  let dateObject = new Date(Number(targetDate));
  let year = dateObject.getFullYear();
  let month = dateObject.getMonth() + 1;
  let date = dateObject.getDate();
  let day = dayInKorea[dateObject.getDay()];
  let time = dateObject.getHours();
  let minute = dateObject.getMinutes();

  if (month < 10) {
    month = `0${month}`;
  }
  if (date < 10) {
    date = `0${date}`;
  }
  if (time < 10) {
    time = `0${time}`;
  }
  if (minute < 10) {
    minute = `0${minute}`;
  }

  return `${year}-${month}-${date} (${day}) ${time}:${minute}`;
};

export default getParsedDate;
