import jwksRsa = require('jwks-rsa');
const auth0 = require('../auth0.json');

const jwt = {
  // Dynamically provide a signing key based on
  // the kid in the header and the signing keys
  // provided by the JWKS endpoint.
  secret: jwksRsa.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: `https://${auth0.domain}/.well-known/jwks.json`
  }),

  // Validate the audience and the issuer.
  audience: auth0.audience,
  issuer: `https://${auth0.domain}/`,
  algorithms: ['RS256']
};

export const config = {
  jwt,
  port: process.env.PORT || 8080,
};
