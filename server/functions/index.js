// ATTENZIONE IO NON AVEVO LA STESSA COSA LEZIONE 19
// const {onRequest} = require("firebase-functions/v2/https");
// const logger = require("firebase-functions/logger");

const functions = require("firebase-functions");
const admin = require('firebase-admin');
require('dotenv').config()

const serviceAccountKey = require('./serviceAccountKey.json');

const express = require('express');
const app = express();

// Body Parser for our JSON data
app.use(express.json());

// Cross Origin
const cors = require("cors");
app.use(cors({origin: true}));
app.use((req, res, next) => {
    res.set("Access-Control-Allow-Origin", "*");
    next();
});

// Firebase Credential
admin.initializeApp({
    credential: admin.credential.cert(serviceAccountKey),
  });

// Api Endpoint
app.get("/", (req, res) => {
    return res.send("hello world");
});

const userRoute = require('./routes/user')
app.use("/api/users", userRoute)

exports.app = functions.https.onRequest(app);