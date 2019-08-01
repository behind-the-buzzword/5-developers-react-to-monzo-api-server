const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const fetch = require("node-fetch");

const PORT = process.env.PORT || 3000;

const app = express();

app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get("/", (_, res) => {
  res.status(200).json({
    message: "Server is running!",
  });
});

app.post("/oauth/token", async (req, res) => {
  try {
    const { code, redirect_uri } = req.body;
    const params = new URLSearchParams();
    params.append("grant_type", "authorization_code");
    params.append("client_id", process.env.MONZO_CLIENT_ID);
    params.append("client_secret", process.env.MONZO_CLIENT_SECRET);
    params.append("code", code);
    params.append("redirect_uri", redirect_uri);

    const response = await fetch("https://api.monzo.com/oauth2/token", {
      method: "POST",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: params,
    });
    const body = await response.json();

    return res.status(200).json(body);
  }
  catch (err) {
    console.error(err);

    return res.status(400).json({
      message: "An error occurred",
      error: err,
    });
  }
});

app.listen(PORT, () => console.log("Listening on port", PORT));
