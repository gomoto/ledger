# Ledger

## Develop

### AWS prerequisites

1. Create AppSync API

2. Create DynamoDB table

### Local prerequisites

1. Create file `.env`:

```bash
AWS_ACCESS_KEY_ID=xxx
AWS_SECRET_ACCESS_KEY=xxx
AWS_REGION=us-west-2
APPSYNC_API_ID=xxx
APPSYNC_API_KEY=xxx
APPSYNC_API_URL=https://xxx.appsync-api.<region>.amazonaws.com/graphql
```

### Working with the GraphQL Schema

1. Edit [schema file](./src/schema.graphql).

2. Push file to AWS AppSync:

```bash
env $(cat .env | xargs) node_modules/.bin/ts-node scripts/save-schema.ts
# Response
{
    "status": "SUCCESS",
    "details": "Successfully created schema with 4 types."
}
```

### Make sample queries

env $(cat .env | xargs) node_modules/.bin/ts-node src/getLedgerEntries/query.ts
