#!/bin/bash

SOURCE="${BASH_SOURCE[0]}"
DIR="$( cd -P "$( dirname "$SOURCE" )" && pwd )"
SRC="$DIR/"

echo "Getting the project ready..."
cd $SRC

cd client
echo "Installing node dependencies for the client side..."
npm install
echo "Done."

cd ../server
echo "Installing node dependencies for the server side..."
npm install
echo "Done."

echo "Terminated!"