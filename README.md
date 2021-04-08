# Getting Started with HomeEx

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## About

HomeEx is an exercise in scraping various MLS.ca properties using headless Chrome (Puppeteer), and displaying the actual property data in a different way in a React app.

## Technologies Used

#### On Client

- React JS (with hooks, not classes)
- Tailwind CSS for styling and layout

#### On Server

- Express.js
- Puppeteer (headless Chrome for obtaining data)

## To Install

After cloning, follow these steps:

1. Install the server packages

```
$ cd server
$ yarn install
```

2. Install the client packages

```
$ cd ..
$ yarn install
```

## To Run

1. Start dev environment

```
$ yarn start:dev
```

2. Visit one of the following URLs:
   - http://localhost:3000 (for a random, pre-configured property)
   - http://localhost:3000/1 (for property ID 1)
   - http://localhost:3000/2 (for property ID 2)

## Notes

1. Often, the preconfigured properties are taken down (they have sold). There is currently no error handling for this case, so if a property is taking a long time to load, it is likely the property is gone and a new one will need to be configured in _server.js_.
2. Although list price comes from actual data, comparable and sold data are mocked inside _server.js_. In the real world, these could come from an existing API, which would intelligently select comparable properties, both on-the-market and recently sold.
