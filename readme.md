# Welcome to CommitSpy! 
[![Build Status](https://travis-ci.com/jarrmill/commit_spy.svg?branch=master)](https://travis-ci.com/jarrmill/commit_spy)

CommitSpy is a service built for programmers who want to monitor the commit history of many git repositories. Specifically, the project is designed to help in technical teaching institutions, where students rapidly commit and add new github repositories.

A live demo is available at https://commitspy.com

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the app on a live system.

### Prerequisites

You will need the following software to install the application:

```
Node version 10 or later
```

### Installing & Setup


```
npm install
```
The build requires a Client_ID and Client_Secret from Github.com to use its authentication. To get your id and secret, follow these instructions.
https://developer.github.com/v3/guides/basics-of-authentication/#registering-your-app
The process should only take a few minutes.

Make a copy of the .example.env file and rename it to .env. From there, enter in your client id & secret, your database information.

For the ***COOKIE_SESSION*** variable, enter a random integer

If the previous steps where executed correctly, you can enter either of the following commands:

```
npm run start
npm run nodemon
```

Then go to localhost:3000


## Running the tests

To run the automated tests for this system

```
npm run test
```

## Deployment

Deploy the database and then launch the app with the above command

## Built With

* [React.js](https://reactjs.org/) - Frontend Library
* [Node.js](https://nodejs.org/en/) - Server
* [PostgreSQL](https://www.postgresql.org/) - RDBMS


## Contributors

* [Jarrod Miller](https://github.com/jarrmill) 


## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details

## Acknowledgments

* Thanks to Nick Miron and Zubair for the support building this project.
* Thanks to all the staff at Hack Reactor @ Galvanize!