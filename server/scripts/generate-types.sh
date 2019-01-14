#!/usr/bin/env bash

# Run this as npm script so that npm binaries are available
graphql-schema-typescript generate-ts src2/schema.graphql \
  --output src2/graphql-types.d.ts \
  --typePrefix '' \
  --strictNulls \
  --smartTResult \
  --smartTParent \
  --asyncResult
  # --contextType Context
  # --importStatements "import {Context} from './context';"
