const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");

const PORT = process.env.PORT || 3000;

const app = express();

const validateToken = (req, res, next) => {
  if (!req.headers.authorization) {
    return res.status(403).json({ error: "Invalid token" });
  }
  if (req.headers.authorization.split(" ")[1] !== "access_token") {
    return res.status(403).json({ error: "Invalid token" });
  }
  return next();
};

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
    console.log(code, redirect_uri);

    const body = {
      access_token: "access_token",
      client_id: "client_id",
      expires_in: 21600,
      refresh_token: "refresh_token",
      token_type: "Bearer",
      user_id: "user_id",
    };

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

app.get("/accounts", validateToken, (_, res) => {
  return res.status(200).json({
    accounts: [
      {
        id: "acc_00009237aqC8c5umZmrRdh",
        description: "Peter Pan's Account",
        created: "2015-11-13T12:17:42Z",
      },
    ],
  });
});

app.listen(PORT, () => console.log("Listening on port", PORT));
