#!/usr/bin/env bash

# Run this as npm script so that npm binaries are available
graphql-schema-typescript generate-ts src/schema.graphql \
  --output src/graphql-types.d.ts \
  --typePrefix '' \
  --strictNulls \
  --smartTResult \
  --smartTParent \
  --asyncResult
  # --contextType Context
  # --importStatements "import {Context} from './context';"
