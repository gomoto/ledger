#!/usr/bin/env bash

source .env

aws appsync start-schema-creation --api-id $APPSYNC_API_ID --definition file://$(pwd)/schema.graphql > /dev/null

while aws appsync get-schema-creation-status --api-id $APPSYNC_API_ID | grep "PROCESSING" > /dev/null;
do
  sleep 1;
done

aws appsync get-schema-creation-status --api-id $APPSYNC_API_ID
