# Ledger

## Develop

### Prerequisites

1. awscli

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
