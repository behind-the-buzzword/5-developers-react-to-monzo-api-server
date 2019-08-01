# #5 - Developers React To Monzo API (Server)

![Behind the Buzzword](behind-the-buzzword-logo.jpeg)

## Overview

The purpose of this server is to enable the React Native mobile app to request an access token by providing an authorization code. This *could* be done on the React Native app, but that would expose the OAuth secret.

## How to deploy

Click the button :point_down:

[![Deploy](https://www.herokucdn.com/deploy/button.svg)](https://heroku.com/deploy)

You will need to have created an OAuth client on the Monzo developer portal, as these credentials are required when deploying to your Heroku account.

Or deploy the mock 👇

[![Deploy](https://www.herokucdn.com/deploy/button.svg)](https://heroku.com/deploy?template=https://github.com/behind-the-buzzword/5-developers-react-to-monzo-api-server/tree/mock-server)

## Running locally

To run this locally you have two options:

1. Run using your locally installed version of node
2. Run using Docker by running `docker-compose run web yarn install` and `docker-compose up`
