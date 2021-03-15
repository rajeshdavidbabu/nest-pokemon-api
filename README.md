<p align="center">
  <a target="blank"><img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/1.png" width="320" alt="Pokemon Logo" /></a>
</p>


## Description

A Nest.js based node web-server to retrieve pokemon information.

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test:unit

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## API Documentation (Swagger)

```bash
# start the service locally and visit to try out the APIs.
http://localhost:8080/api

```

## Building and running in local docker environment

A local docker installation is required.

```bash
# docker build
$ docker build -t nest-pokemon-api .

# docker run
# 8080 - PORT from your local .env file
# 7889 - Random PORT we use to expose it to public
# Application can be accessed on http://localhost:7889/api

$ docker run -p 7889:8080 --env-file .env -d nest-pokemon-api
```

## License

Nest is [MIT licensed](LICENSE).
