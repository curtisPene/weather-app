const express = require("express");
const path = require("path");
const chalk = require("chalk");
const hbs = require("hbs");
const geoCode = require("./utils/geocode");
const forecast = require("./utils/forecast");

const app = express();

app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "../templates/views"));
app.use(express.static(path.join(__dirname, "../public")));

hbs.registerPartials(path.join(__dirname, "../templates/partials"));

app.get("/", (req, res) => {
  res.render("index", {
    title: "Weather",
    name: "Curtis",
  });
});

app.get("/help", (req, res) => {
  console.log(req.params);
  res.render("help", {
    title: "Help Page",
    name: "Curtis Pene",
  });
});

app.get("/weather", async (req, res) => {
  const location = req.query.location;
  if (!location) {
    return res.send({
      error: "No location provided",
    });
  }

  geoCode(location, (error, response) => {
    if (error) {
      return res.send({
        error: "Could not find location",
      });
    } else {
      // res.send(response);
      const { lon, lat } = response;
      forecast(lon, lat, (error, response) => {
        if (error) {
          return res.send({
            error: "Could not find weather data",
          });
        }

        res.send(response);
      });
    }
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About Page",
    name: "Curtis Pene",
  });
});

app.get("*", (req, res) => {
  res.render("error", {
    title: "Error Page",
    name: "Curtis Pene",
    message: "Cant find the page you requested :/",
  });
});

app.listen(3000, () => {
  console.log(chalk.green("Listening on port 3000"));
});
