#!/bin/bash

SOURCE="${BASH_SOURCE[0]}"
DIR="$( cd -P "$( dirname "$SOURCE" )" && pwd )"
SRC="$DIR/"

cd $SRC

echo "Sending the appropriate request to load the csv files for the Alpes-Maritimes (06) department..."

curl -H "Content-Type: application/json" -X POST -d '{"filePath":"http://localhost:4000/assets/accidents_06.csv"}' http://localhost:4000/api/accidents/load/csv/gov

echo "Request sent."