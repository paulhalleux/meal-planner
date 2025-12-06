@echo off
setlocal enabledelayedexpansion

echo Cleaning previous generation...
if exist src (
    rmdir /s /q src
)
mkdir src

echo Creating docs folder...
if not exist docs (
    mkdir docs
)

echo Downloading latest swagger.json...
curl -o docs\swagger.json http://localhost:8001/swagger/doc.json

echo Generating new API client...
docker run --rm ^
  -v "%cd%:/local" ^
  openapitools/openapi-generator-cli generate ^
  -i /local/docs/swagger.json ^
  -g typescript-fetch ^
  -o /local/src ^
  --additional-properties=stringEnums=true

echo Cleaning unnecessary files...
if exist src\.openapi-generator (
    rmdir /s /q src\.openapi-generator
)
if exist src\.openapi-generator-ignore (
    del /q src\.openapi-generator-ignore
)
if exist src\docs (
    rmdir /s /q src\docs
)

echo Done!
endlocal