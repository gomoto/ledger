#!/usr/bin/env bash

source .env

aws appsync start-schema-creation --api-id $APPSYNC_API_ID --definition file://$(pwd)/src/schema/schema.graphql > /dev/null

if [ $? -ne 0 ]; then
  echo "Failed to save schema"
  exit 1
fi

while aws appsync get-schema-creation-status --api-id $APPSYNC_API_ID | grep "PROCESSING" > /dev/null;
do
  sleep 1;
done

aws appsync get-schema-creation-status --api-id $APPSYNC_API_ID
