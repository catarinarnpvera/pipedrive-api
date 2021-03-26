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

```

## Notes

There's a test class where I added one test "should insert organizations", that was an atempt to test the method. Unfortunately it doesn't perform as I intended it to, therefore, the tests are not effective in this example. However, I decided to leave it because I would like to highlight that these types of tests are important and needed. In a perfect world where that worked, the idea would be to include one test to each method.

## Answer to 3rd question

#A - Could this service perform well even with up to 100K relations per one organization?
The service performance might run slower due to being built based on a recurring method

#B - What would you change in architecture if 1M relations support is needed?
To support that many relations a better structure would be needed, therefore establishing levels would be a way to achieve this. Also a implementation that doesn't use a recurring method.
Finally to boost the performance I would clean the code a bit such as remove as many cycles as possible, for example on sort (sortRelationNames) and pagination (getPaginatedList).

## Done by

- Catarina Vera