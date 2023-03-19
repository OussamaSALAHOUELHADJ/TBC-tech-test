# TBC-tech-test

- [TBC-tech-test](#tbc-tech-test)
  - [Introduction](#introduction)
  - [Features](#features)
  - [How is it built?](#how-is-it-built)
  - [available routes](#available-routes)
  - [Getting Started](#getting-started)
  - [available scripts](#available-scripts)
  - [Hosting](#hosting)
  - [Scalability](#scalability)
  - [Pros \& Cons](#pros--cons)
    - [Pros:](#pros)
    - [Cons:](#cons)
  - [Created By](#created-by)


## Introduction

Welcome to the TBC-tech-test project! a backend system built using NodeJS + Typescript and is designed to handle web requests efficiently. The primary objective of the project is to retrieve movie listings from the OMDB API (http://www.omdbapi.com/) and provide them to the users. Additional features have been incorporated to enhance the user experience. This project was built to showcase development abilities and serve as a technical test requested by TBC.

## Features

- Retrieve film list from http://www.omdbapi.com/ API.
- Built-in database with some defined movies (part of the request).
- Ability to backup movies to Google Spreadsheet.
- Basic security implementation.

## How is it built?

I used NodeJS with the Typescript language for the backend and application logic. The OMDB API was utilized to retrieve movie listings, which are made available to users through web requests.

The project structure was built to conform to best practices, including file structure, file import/export, and clean code techniques. For development, I used ESLint with Typescript and Airbnb plugins, along with Prettier to help me lint the code and maintain a structured, well-formed design pattern.

I also implemented some well-known packages to establish basic security measures and protect the API data from unauthorized access, including cors, helmet, and express-rate-limit, and kept the secrets and API keys in a .env file.

Additionally, I implemented a feature to backup movies to a Google Spreadsheet for easier data access.

## available routes

- `/`

| Request | Description                        | Returns        | Possible Errors |
| ------- | ---------------------------------- | -------------- | --------------- |
| `GET /` | basic route, general informations. | List of Movies |                 |

- `/films`

| Request                     | Description                                                                                                      | Returns                                             | Possible Errors                                                                     |
| --------------------------- | ---------------------------------------------------------------------------------------------------------------- | --------------------------------------------------- | ----------------------------------------------------------------------------------- |
| `GET /films/filmId`         | This is the main route for available movies. It returns a list of movies.                                        | `200 OK`: List of Movies                            | `404 Not Found`, `301` redirect to `/films?search=filmId` if film is not available. |
| `GET /films?search=filmId`  | This route is used for non-available films. It makes a search in the OMDb directly and returns a list of movies. | `200 OK`: List of Movies                            | `404 Not Found`.                                                                    |
| `POST /films/filmId/backup` | This route is used to backup a film list to a spreadsheet. It returns information about the created sheet.       | `201 Created`: Information about the created sheet. | `405 Method Not Allowed`.                                                           |

## Getting Started

1. Clone the repository to your local machine:

```bash
git clone https://github.com/OussamaSALAHOUELHADJ/TBC-tech-test.git
```

2. Install dependencies:

```bash
cd TBC-tech-test
npm install
```

3. Copy .env.template file to .env.local (for dev env) or .env (for production env) file in the root directory and modify it:

```bash
# Application specific configuration settings
APP_ENV=dev
PORT=3000

#OMDB specific configuration settings
OMDB_API_KEY=

#GoogleApi specific configuration settings
GOOGLE_API_EMAIL=
GOOGLE_API_PRIVATE_KEY=

```

3. Start the server

- for dev env:

```bash
npm run start:dev
```

- for prod env:

```bash
npm run start
```

That's it! You're now ready to use the API.

## available scripts

As defined on `package.json` we have these scripts:

```bash
npm run start:dev #run the project on dev env.
npm run lint #lint code with eslint and format with prettier.
npm run build #build the project, output: ./build folder.
npm run start #run npm run buil and start the project in production.
```

## Hosting

For the hosting part, I suggest the following:

1. Use a cloud hosting service such as Amazon Web Services or Google Cloud. Set up access rules to the instance, such as a load balancer and CDNs. Additionally, use an SSL certificate to ensure secure connections (HTTPS) only.
2. Set up a CI/CD workflow with Github or Jenkins to automate the development, testing, and deployment processes.
3. Set up a monitoring system to manage performance and app status. Implement a logger to track errors, among other metrics.

## Scalability

For scalability, the hosting part is also considered as a suggestion. Load balancers and CDNs will help manage a large amount of requests on the server and prevent mass request attacks by implementing a load balancer, delivering fast content to the majority of users around the world with many instances, and caching around the world with CDNs. Additionally, I suggest these points for scalability:

- Periodic analysis of metrics to find bottlenecks and optimize performance.
- Implement tests at different levels, from unit tests to integration tests to final user tests.
- From a business perspective, implement paid plans for API consumers.
- Provide documentation for both developers and clients and provide SDKs in different programming languages.
- Establish a style guide to make it easy for developers to scale the code app and for final clients to have a logical understanding of the API; this will also minimize bugs and failures
- Integrate a local database to reduce the cost of calling the OMDb API every time and to be independent of it in case of it going down.
- Take user feedback into consideration and reflect that in the development process.
- By providing a range of customization options, users will have more freedom to use the API in the way that best suits their particular use case. This will make it flexible and also help to increase the popularity and usage of the API by making it more versatile and accommodating to a wider range of users.
- impliment pagination for the api and establish an API design in general.

## Pros & Cons

### Pros:

- a structured project following style guides with enforced rules, and clean code (even in git commit messages!).
- abstract reusable middlewares.
- security configuration to prevent a vast range of known attacks.
- documented and orgnised version controlled with git.
- using typescript makes it more reliable and minimized bugs.
- managed access to the google sheet and sendidng notifications to the permitted entities.

### Cons:

- OMDb is not a structured, well designed api (response status are 200 even when not found, attributes naming are not camelCased, not a good search algorithm: you have to be specific to get the best results (diffrent results for fast and furious, fast & furious and fast furious)),not a secure api (uses only one key with no authentication and diffrent key for each request)
- about our API, no authentication protocolos are setted so anyone can send requests.
- there's not specific querry params to optimize requests and search.
- no real implimentation for databases (just simple json files).
- using the response from OMDb directly (should transform it to a local Film object, trimming some properties)
- no logger or metric tools where implimented.
- no tests whatsoever, which is not good if we want scalability.
- more error management and handleling, i18n and API versioning.

## Created By

This API was created by [Oussama SALAHOUELHADJ](https://github.com/OussamaSALAHOUELHADJ) in 03/2023.
