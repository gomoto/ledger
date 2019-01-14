# Ledger Server

## Local prerequisites

1. Create file `keyfile.json` in root of server directory by following these instructions:
https://cloud.google.com/docs/authentication/production#obtaining_and_providing_service_account_credentials_manually

## Develop

1. Edit schema or code.

2. `npm run build`

3. `PORT=8081 npm start`

4. Go to http://localhost:8081/graphql to make interactive graphql requests
