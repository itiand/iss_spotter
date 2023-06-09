//logic for fetching data

const request = require('request');



/**
 * Makes a single API request to retrieve the user's IP address.
 * Input:
 *   - A callback (to pass back an error or the IP string)
 * Returns (via Callback):
 *   - An error, if any (nullable)
 *   - The IP address as a string (null if error). Example: "162.245.144.188"
 */

const fetchMyIP = function(callback) {
  const url = 'https://api.ipify.org?format=json';
  request(url, (error, response, ipInfo) => {
    if (error) {
      callback(error, null);
      return;
    }

    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching IP. Response: ${body}`;
      callback(Error(msg), null);
      return;
    }

    const myIp = JSON.parse(ipInfo).ip;
    callback(null, myIp);
  });
};



const fetchCoordsByIP = function(ip, callback) {
  const url = `http://ipwho.is/${ip}`;
  request(url, (error, response, coordinates) => {

    if (error) {
      callback(error, null);
      return;
    }

    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching Latitude. Response: ${coordinates}`;
      callback(Error(msg), null);
      return;
    }

    const jsonCoords = JSON.parse(coordinates);
    if (jsonCoords.success === false) {
      const message = `Success status was ${jsonCoords.success}. Server message says: ${jsonCoords.message} when fetching for IP ${jsonCoords.ip}`;
      callback(message, null);
      return;
    }

    const { latitude, longitude } = jsonCoords;
    callback(null, { latitude, longitude });
  });

};


/**
 * Makes a single API request to retrieve upcoming ISS fly over times the for the given lat/lng coordinates.
 * Input:
 *   - An object with keys `latitude` and `longitude`
 *   - A callback (to pass back an error or the array of resulting data)
 * Returns (via Callback):
 *   - An error, if any (nullable)
 *   - The fly over times as an array of objects (null if error). Example:
 *     [ { risetime: 134564234, duration: 600 }, ... ]
 */
//LATITUDE LONGITUDE PAIR
const fetchISSFlyOverTimes = function(latNlong, callback) {
  const url = `https://iss-flyover.herokuapp.com/json/?lat=${latNlong.latitude}&lon=${latNlong.longitude}`;
  request(url, (error, response, data) => {
    if (error) {
      callback(error, null);
      return;
    }

    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching ISS data. Response: ${data}`;
      callback(Error(msg), null);
      return;
    }

    const parsedData = JSON.parse(data).response;
    callback(error, parsedData);
  });
};

const nextISSTimesForMyLocation = function(callback) {
  fetchMyIP((error, ip) => {
    if (error) {
      return callback(error, null);
    }

    fetchCoordsByIP(ip, (error, loc) => {
      if (error) {
        return callback(error, null);
      }

      fetchISSFlyOverTimes(loc, (error, nextPasses) => {
        if (error) {
          return callback(error, null);
        }

        callback(null, nextPasses);
      });
    });
  });
};

module.exports = {
  nextISSTimesForMyLocation
};