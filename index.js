const dotenv = require('dotenv');
const express = require('express');
const jwt = require('jsonwebtoken');

dotenv.config();
const app = express();
const {
  AUTH_KEY,
  APPLE_TEAM_ID,
  MAPKIT_KEY_ID,
  PORT,
} = process.env;
const payload = {
  iss: APPLE_TEAM_ID, /* Issuer: Your Apple Developer Team ID */
  iat: Date.now() / 1000, /* Issued at: Current time in seconds */
  exp: (Date.now() / 1000) + 1800, /* Expire at: Time to expire the token */
};
const header = {
  kid: MAPKIT_KEY_ID, /* Key Id: Your MapKit JS Key ID */
  typ: 'JWT', /* Type of token */
  alg: 'ES256', /* The hashing algorithm being used */
};

app.use(express.static('public'));

app.get('/token', (req, res, next) => {
  res.header('Cache-Control', 'no-cache, no-store, must-revalidate');
  next();
}, (req, res) => {
  res.send(jwt.sign(payload, AUTH_KEY, { header }));
});

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Server started on port ${PORT}`);
});
