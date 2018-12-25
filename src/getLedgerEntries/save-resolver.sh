#!/usr/bin/env bash

# Create or update resolver

source .env

# First, does resolver already exist?
aws appsync get-resolver  \
  --api-id $APPSYNC_API_ID \
  --type-name Query \
  --field-name getLedgerEntries > /dev/null 2>&1

if [ $? -eq 0 ]; then
  # resolver exists
  echo "Updating resolver..."
  create_or_update=update-resolver
else
  # resolver does not exist
  echo "Creating resolver..."
  create_or_update=create-resolver
fi

aws appsync $create_or_update \
  --api-id $APPSYNC_API_ID \
  --type-name Query \
  --field-name getLedgerEntries \
  --data-source-name LedgerEntryTable \
  --request-mapping-template "$(cat src/getLedgerEntries/request-mapping.vm)" \
  --response-mapping-template "$(cat src/getLedgerEntries/response-mapping.vm)" \
  --kind UNIT
