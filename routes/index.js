const fetch = require("node-fetch");
var express = require("express");
const { json } = require("express/lib/response");
var router = express.Router();

const { uuid } = require("uuidv4");
const { serverCheckUserIsValid } = require("../utils/validation");

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

router.post("/create-user", (req, res) => {
  try {
    const userData = req.body.userData;
    const userIsValid = serverCheckUserIsValid(userData);
    if (!userIsValid) {
      console.log(req.body);
      console.log("if block");
      res.status(400).json({
        serverMessage:
          "To create a new user you must include First Name, Last Name, and Email.",
      });
      return;
    }

    const firstName = userData;
    const lastName = userData;
    const email = userData;
    const id = uuid();
    const newUser = {
      id,
      firstName,
      lastName,
      email,
    };
    userList.push(newUser);
    console.log(userList);
    res
      .json({ serverMessage: "New user successfully created.", success: true })
      .status(200);
  } catch (error) {
    console.log("error block ", error);
    res.json({ serverMessage: error }).status(400);
  }
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
