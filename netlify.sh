#!/bin/bash

# Install dependencies
npm install --force

# Copy files to public folder
mkdir -p public
cp -r *.html css/ js/ files/ contract/ assets/ public/

loglevel=error