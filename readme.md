# The Library

## How to do

1. `npm i -g babel-cli babel webpack webpack-dev-server mocha istanbul`
1. `npm i`

## How

1. `npm start` - for dev (server at [localhost:8080](http://localhost:8080))
1. `npm run build` - for prod

## test

with *mocha* and *chai*

1. `npm test` - once
1. `npm run test:watch` - guess what

## Tools

1. [React Developer
Tools](https://chrome.google.com/webstore/detail/react-developer-tools/fmkadmapgofadopljbjfkapdkoienihi) extension for chrome

## Server
To run the server use one of the lines below:
```bash
node server/app.js  # Option 1
npm run server      # Option 2
```
The server is being started on port `9090` and it's `cors` safe (can be accessed from any host).
Locally it runs like `http://localhost:9090`, and on staging `http://h25-hack.wixpress.com:9090`.

Verb      | Url | Description
----------|-----|------------
GET       | [http://localhost:9090/api/texts](http://localhost:9090/api/texts) | Get all the texts
POST      | [http://localhost:9090/api/texts](http://localhost:9090/api/texts) | Create a new text
GET, POST | [http://localhost:9090/api/texts/:id](http://localhost:9090/api/texts/:id) | Get, update a single text
DELETE    | [http://localhost:9090/api/texts/:id](http://localhost:9090/api/texts/:id) | Delete a single text
GET       | [http://localhost:9090/api/texts/:id/suggestions](http://localhost:9090/api/texts/:id/suggestions) | Gets the suggestions for a single text
GET       | [http://localhost:9090/api/tags](http://localhost:9090/api/tags) | Get all the tags
GET       | [http://localhost:9090/api/categories](http://localhost:9090/api/categories) | Get all the categories
GET       | [http://localhost:9090/api/sections](http://localhost:9090/api/categories) | Get all the sections
GET       | [http://localhost:9090/api/intents](http://localhost:9090/api/categories) | Get all the intents
GET       | [http://localhost:9090/api/styles](http://localhost:9090/api/categories) | Get all the styles
GET       | [http://localhost:9090/api/assistant/sites](http://localhost:9090/api/assistant/sites) | Get all sites
GET       | [http://localhost:9090/api/assistant/words](http://localhost:9090/api/assistant/words) | Get all words

