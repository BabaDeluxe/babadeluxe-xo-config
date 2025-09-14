#!/bin/sh
rm -rf ./package
rm -rf ./babadeluxe-xo-config-*.tgz
npm pack @babadeluxe/xo-config
tar -xvf ./babadeluxe-xo-config-*.tgz
rm -rf ./babadeluxe-xo-config-*.tgz
rm -rf node_modules
echo Please run npm i from batch now
