#!/usr/bin/env bash

# Delete resolver

source .env

aws appsync delete-resolver  \
  --api-id $APPSYNC_API_ID \
  --type-name Mutation \
  --field-name createLedgerEntry
