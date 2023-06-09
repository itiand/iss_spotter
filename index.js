const {  nextISSTimesForMyLocation } = require('./iss');

nextISSTimesForMyLocation((error, data) => {
  if (error) {
    return console.log("It didn't work!", error);
  }
  console.log(data);
  for(let pass of data) {
    const datetime = new Date(0);
    datetime.setUTCSeconds(pass.risetime);
    const duration = pass.duration;
    console.log(`Next pass at ${datetime} for ${duration} seconds!`);        
  }
});
