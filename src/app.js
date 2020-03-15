const express = require("express");
const path = require("path");
const hbs = require("hbs");
const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");

//Setting up the paths
const publicdir = path.join(__dirname, "..//public");
const viewspath = path.join(__dirname, "..//templates//views");
const partialsPath = path.join(__dirname, "..//templates//partials");

const app = express();
app.use(express.static(publicdir));

app.set("view engine", "hbs");
app.set("views", viewspath);
hbs.registerPartials(partialsPath);

app.get("", (req, res) => {
  res.render("index", {
    title: "Weather",
    name: "Sahil"
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    title: "Help",
    name: "Sahil"
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About Page",
    name: "Sahil"
  });
});

app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: " You Must Provide Address to get Weather"
    });
  }

  geocode(
    req.query.address,
    (error, { latitude, longitude, location } = {}) => {
      if (error) {
        return res.send({ error });
      }

      forecast(latitude, longitude, (error, forecastData) => {
        if (error) {
          return res.send({ error });
        }

        res.send({
          forecast: forecastData,
          location,
          address: req.query.address
        });
      });
    }
  );
});

app.get("/help/*", (req, res) => {
  res.render("404", {
    title: "404",
    name: "Sahil",
    errorMessage: "Help article not found."
  });
});

app.get("*", (req, res) => {
  res.render("404", {
    title: "ERROR 404",
    name: "Sahil",
    errorMessage: "Page not found."
  });
});

app.listen(3000, () => {
  console.log("server is set up on port 3000! ");
});
