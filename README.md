# Ledger

## Develop

### AWS prerequisites

1. Create AppSync API

2. Create DynamoDB table

### Local prerequisites

1. Install awscli

2. Create file `.env`:

```bash
APPSYNC_API_ID=xxx
APPSYNC_API_KEY=xxx
APPSYNC_API_URL=https://xxx.appsync-api.<region>.amazonaws.com/graphql
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

### Make sample queries

env $(cat .env | xargs) node_modules/.bin/ts-node src/getLedgerEntries/query.ts
