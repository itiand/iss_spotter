const { fetchMyIP, fetchCoordsByIP, fetchISSFlyOverTimes } = require('./iss');

fetchMyIP((err, ip) => {
  if (err) {
    console.log("It didn't work!", err);
    return;
  }
  fetchCoordsByIP(ip, (error, coordinates) => {
    if (error) {
      console.log("It didn't work!" , error);
      return;
    }
    console.log('It worked! Returned coordinates:' , coordinates);
    fetchISSFlyOverTimes(coordinates, (err, data) => {
      if (err) {
        console.log("It didn't work!" , error);
        return;
      }
      console.log('It worked! Returned flyover times:' , data);
    })
  });
});


