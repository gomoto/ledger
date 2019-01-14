# Ledger Server

## Develop

### Development prerequisites

1. Create file `keyfile.json` in root of server directory by following these instructions:
https://cloud.google.com/docs/authentication/production#obtaining_and_providing_service_account_credentials_manually

2. Create file `auth0.json` in root of server directory:
```json
{
  "audience": "<auth0-audience>",
  "domain": "<auth0-domain>"
}
```

### Development procedure

1. Edit schema or code.

2. `npm run build`

3. `PORT=8081 npm start`

4. Go to http://localhost:8081/graphql to make interactive graphql requests

## Deploy

### Deployment prerequisites

`gcloud app create`

### Deployment procedure

`gcloud app deploy`
