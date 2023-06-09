const { nextISSTimesForMyLocation } = require('./iss_promised');


// fetchMyIP()
//   .then((result) => {
//     return fetchCoordsByIP(result);
//   })
//   .then((coords) => {
//     return fetchISSFlyOverTimes(coords)
//   })
//   .then((data)=> {nextISSTimesForMyLocation(data)})

// .then((value) => fetchCoordsByIP(value))
// .then((value) => console.log(value))


nextISSTimesForMyLocation()
  .then((data) => {
    for (let pass of data) {
      const datetime = new Date(0);
      datetime.setUTCSeconds(pass.risetime);
      const duration = pass.duration;
      console.log(`Next pass at ${datetime} for ${duration} seconds!`);
    }
  })
  .catch((error) => {
    console.log("It didn't work: ", error.message);
  })