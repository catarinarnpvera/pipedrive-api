# Pipedrive 

## Prerequisites

* Node
* Docker

## How to run the project

### Database

1. Cd to the project folder
2. Create the database with `docker-compose up -d`
3. Once the database is running on a docker container run `npm install`
4. Check .env file to see if the ports and database host are ok

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```


## Done by

- Catarina Vera