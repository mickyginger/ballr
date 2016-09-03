function padNumber(num) {
  if(num < 10) return "0" + num;
  return num;
}

module.exports = {
  time: {
    format: function(timestamp) {
      
      var date = [
        padNumber(timestamp.getDate()),
        padNumber(timestamp.getMonth()+1),
        timestamp.getFullYear()
      ].join('/');

      var time = [
        padNumber(timestamp.getHours()),
        padNumber(timestamp.getMinutes())
      ].join(':');

      return date + " " + time;
    }
  }
}