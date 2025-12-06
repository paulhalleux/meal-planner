#!/usr/bin/env bash
set -e

# cleanup previous generation
rm -rf ./src/*

# get latest swagger.json
mkdir -p ./docs
curl -O ./docs/swagger.json "http://localhost:8001/swagger/doc.json"

# generate new API client
docker run --rm \
  -v "${PWD}:/local" \
  openapitools/openapi-generator-cli generate \
  -i /local/docs/swagger.json \
  -g typescript-fetch \
  -o /local/src \
  --additional-properties=stringEnums=true

# cleanup unnecessary files
rm -rf ./src/.openapi-generator
rm -f ./src/.openapi-generator-ignore
rm -rf ./src/docs
