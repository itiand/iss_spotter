const { fetchMyIP, fetchCoordsByIP, fetchISSFlyOverTimes, nextISSTimesForMyLocation } = require('./iss');

nextISSTimesForMyLocation(() => {
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
        nextISSTimesForMyLocation(() => {
          if (err) {
            return console.log("It didn't work!", error);
          }
          for(let pass of data) {
            const datetime = new Date(0);
            datetime.setUTCSeconds(pass.risetime);
            const duration = pass.duration;
            console.log(`Next pass at ${datetime} for ${duration} seconds!`);        
          }
        })
      })
    });
  });
});