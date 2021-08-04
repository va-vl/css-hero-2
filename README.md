# CSS Hero 2

## Contents

1. [About](#about)
2. [Install](#install)
3. [Launch](#launch)

## #About

Demo:

Beat the game by entering correct CSS selectors. Fun for the whole family!

A clone of [CSS Diner](https://flukeout.github.io).

## #Install

Clone repository or download the zip archive.

## #Launch

### Run in dev mode

There are two ways to tun the app. Open `https://localhost:8080` to see the app running in dev mode.

#### Locally

`yarn run start`

If `cross-env` package is not found, simply run `yarn` and try again.

#### With Docker

`docker-compose up --build`

### Run in production mode

To run the compiled app build:

1. `npm install --global http-server` - install **http-server** globally (unless you have it already);
2. `yarn run build`;
3. `yarn run serve`;

Check the app running on `http://localhost:8080` in your browser.

If `cross-env` package is not found, simply run `yarn` and try again.
