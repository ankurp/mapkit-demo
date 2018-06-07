const dotenv = require('dotenv');
const fs = require('fs');
const express = require('express');
const jwt = require('jsonwebtoken');

dotenv.config();
const app = express();
const {
  AUTH_KEY_FILE_PATH,
  APPLE_TEAM_ID,
  MAPKIT_KEY_ID,
} = process.env;
const keyFile = fs.readFileSync(AUTH_KEY_FILE_PATH);
const payload = {
  iss: APPLE_TEAM_ID, /* Issuer: Your Apple Developer Team ID */
  iat: Date.now() / 1000, /* Issued at: Current time in seconds */
  exp: (Date.now() / 1000) + 1800,
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
  res.send(jwt.sign(payload, keyFile, { header }));
});

app.listen(4000, () => {
  // eslint-disable-next-line no-console
  console.log('Server started on port 4000');
});
