const request = require('request-promise-native');

const fetchMyIP = () => {
  return request('https://api.ipify.org?format=json');
};

const fetchCoordsByIP = function(ip) {
  const parsedIP = JSON.parse(ip).ip;
  return request(`http://ipwho.is/${parsedIP}`);
};

const fetchISSFlyOverTimes = function(coords) {
  const parsedCoords = JSON.parse(coords);
  const { latitude, longitude } = parsedCoords;
  const coordinates = { latitude, longitude };
  return request(`https://iss-flyover.herokuapp.com/json/?lat=${coordinates.latitude}&lon=${coordinates.longitude}`);
};

const nextISSTimesForMyLocation = function() {
  return fetchMyIP()
    .then((ip) => fetchCoordsByIP(ip))
    .then((coords) => fetchISSFlyOverTimes(coords))
    .then((data) => {
      const parsedData = JSON.parse(data).response;
      return parsedData;
    });
};

module.exports = { nextISSTimesForMyLocation };