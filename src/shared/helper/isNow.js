function nowDate() {
  let dateObj = new Date();
  let month = dateObj.getUTCMonth() + 1; //months from 1-12
  if (month < 10) {
    month = "0" + month;
  }
  let day = dateObj.getUTCDate();
  let year = dateObj.getUTCFullYear();
  let newdate = year + "-" + month + "-" + day;
  return newdate;
}

function NowDateText() {
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const d = new Date();
  let day = d.getUTCDate();
  let year = d.getUTCFullYear();
  return `Joined ${monthNames[d.getMonth()]} ${day}, ${year}`;
}

function nowdataclock() {
  var currentdate = new Date();
  var datetime =
    currentdate.getDate() +
    "/" +
    (currentdate.getMonth() + 1) +
    "/" +
    currentdate.getFullYear() +
    " | " +
    (currentdate.getHours() + 5) +
    ":" +
    currentdate.getMinutes() +
    ":" +
    currentdate.getSeconds();
  return datetime;
}
module.exports = { nowDate, NowDateText, nowdataclock };
