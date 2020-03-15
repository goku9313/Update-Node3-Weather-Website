const request = require("request");

const url =
  "https://api.darksky.net/forecast/d780a383ad4dec3b71e0542944d9bfb6/28.7,77.2?units=si";

const forecast = (latitude, longitude, callback) => {
  const url =
    "https://api.darksky.net/forecast/d780a383ad4dec3b71e0542944d9bfb6/" +
    latitude +
    "," +
    longitude +
    "?units=si";

  request({ url: url, json: true }, (error, { body }) => {
    if (error) {
      callback("Unable to connect to the server!", undefined);
    } else if (body.error) {
      callback("The given location is invalid...", undefined);
    } else {
      callback(
        undefined,
        "Todays Temperature is " +
          body.currently.temperature +
          " degrees out here . " +
          "There is " +
          body.currently.precipProbability +
          "% chances of rain . " +
          body.daily.data[0].summary
      );
    }
  });
};

module.exports = forecast;
