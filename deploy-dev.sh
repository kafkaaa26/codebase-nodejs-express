#!/bin/bash
#set -e

npm install
serverless deploy
# ret_code=$(curl --write-out "%{http_code}\n" --silent --output /dev/null -X POST -H "Content-Type: application/json" -d '{"key":"Update.Database.And.NHT01062020"}' https://rn9v8wnsc0.execute-api.ap-northeast-1.amazonaws.com/dev/job)
# if [[ "$ret_code" == "OK" ]]; then
#   echo "exit 10"
#   exit 10
# else
#   echo "exit 0"
# fi
