const getDateSmall = time => {
  var date = new Date(time);
  return date.getTime();
}


const getTime = time => {
  var date = new Date(time);
  return date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate();
}

module.exports = {
  getDateSmall,
  getTime
}

