# Ledger

## Develop

### AWS prerequisites

1. Create AppSync API

2. Create DynamoDB table

### Local prerequisites

1. Install awscli

2. Create file `.env`:

```bash
APPSYNC_API_ID=33ehqlzy35a4jn2xt2wu7jadei
```

### GraphQL Schema

Edit [schema file](./schema.graphql).

Push file to AWS AppSync:

```bash
scripts/update-schema.sh
# Response
{
    "status": "SUCCESS",
    "details": "Successfully created schema with 3 types."
}
```
