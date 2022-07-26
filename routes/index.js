const fetch = require("node-fetch");
var express = require("express");
var router = express.Router();
const userList = [
  {
    id: 1,
    firstName: "John",
    lastName: "Doe",
    email: "jd@gmail.com",
  },
];

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
});

router.post("/post-message", (req, res) => {
  try {
    const clientMessage = req.body.clientMessage;
    const dateTime = new Date();
    const response = `Recieved client message: ${clientMessage}. Responded at ${dateTime.toString()}`;
    res.json({ serverMessage: response }).status(200);
  } catch (error) {
    res.json({ serverMessage: error }).status(400);
  }
});

router.get("/get-users", async (req, res) => {
  try {
    res.json({ serverMessage: userList }).status(200);
  } catch (error) {
    res.json({ serverMessage: error }).status(400);
  }
});

router.get("/get-dog", async (req, res) => {
  try {
    const response = await fetch("https://random.dog/woof.json");
    console.log("response: " + response);

    const dogJSON = await response.json();
    console.log("dogJSON: " + dogJSON);

    const dogURL = await dogJSON.url;
    console.log("dogURL: " + dogURL);

    res.status(200).json({ serverMessage: dogURL });
  } catch (error) {
    res.status(400).json({ serverMessage: "Error fetching doggo " + error });
  }
});

module.exports = router;
