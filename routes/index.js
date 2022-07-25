var express = require("express");
var router = express.Router();

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

router.get("/get-dog", async (req, res) => {
  try {
    const dogFetch = await fetch("https://dog.ceo/api/breeds/image/random");
    console.log("dogfetch");
    console.log(dogFetch);
    const dogJSON = await dogFetch.parse();
    console.log("dogJSON");
    console.log(dogJSON);
    const dogURL = await dogJSON.message;
    console.log("dogURL");
    console.log(dogURL);
    res.json({ serverMessage: dogURL, myMessage: "cool" }).status(200);
  } catch (error) {
    res.json({ serverMessage: error, myMessage: "what" }).status(400);
  }
});

module.exports = router;
