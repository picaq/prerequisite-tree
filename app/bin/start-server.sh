#!/usr/bin/env bash

set -euo pipefail

until curl -sSf http://localhost:${PORT:-4000}/api/ping > /dev/null
do
  sleep 5
done

ESLINT_NO_DEV_ERRORS=false npx react-scripts start
