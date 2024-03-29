# Prerequisite Tree

Prerequisite Tree is an app to plan and visualize complex goals and tasks.
Tasks that have multiple sub tasks or prerequisites can seem overwhelming and make people put off big projects. It is a tool to organize and visualize the needed steps can help chart what needs to be done and what can be done next.

This is an end-to-end React app backed by an Express API server, persisting data to
PostgreSQL database. The project fetches data
from a single table in the database, and allows you to add rows to that table when a graph is saved.

~~[See the app in action][live].~~ [no longer hosted by heroku]

[![Deploy to Heroku][deploy-badge]][deploy-workflow]
[![Reset Heroku DB][reset-badge]][reset-workflow]

## Interface
There are three main option buttons: [Show Load Screen], [Edit Graph], and [New Graph]. The persistent (?) button in the top right corner provides introductory information about the app as well as explicit instructions on how to build a graph, save it, and load it with the interface buttons. All buttons visible here toggle a component to render or hide.
[![Image from Gyazo](https://i.gyazo.com/1240cb08092bdff7302b9405d54a995c.gif)](https://gyazo.com/1240cb08092bdff7302b9405d54a995c)

## Load Screen
The default graph displayed is “Birthday Party”. The Load Screen loads a list of all saved graphs from the database. Clicking any button will load the graph data into the client, and d3 will generate an SVG force-directed graph out of this data. If a graph is saved, it will show up on the Load Screen.

## Edit Graph
Editing an existing graph will display a form of options to allow linking existing tasks with an arrow with [Add Link] or adding new tasks with [Add Task] in order to link them to existing or new tasks.

### New Graph
The [New Graph] button opens the Edit Graph interface, only with a completely clear-ed out screen to start from scratch. A Task must be added before any linkages are made.

### [NASA APOD API](https://github.com/nasa/apod-api)
This app utilizes the NASA Astonomy Picture of the Day (APOD) API to load a new intriguing, inspiring imagery on a daily basis. Information about the imagery is persistently on the footer of the app alongside a [link to the site](https://apod.nasa.gov/apod/astropix.html) of the current image of the day. 

Media types are typically photographs, but on rare occasion, a video is loaded. When a video is loaded, a pause/play button will appear in the footer. Media is loaded as a background element. 

Info on [all NASA APIs](https://api.nasa.gov/), as well as how to use them, can be found here.

## Set-up Prerequisites

### Docker

This project relies on Docker to run the PostgreSQL server. You must install
Docker first before continuing.

Use one of these methods:

- Use [Homebrew][] on macOS: `brew install --cask docker`
  - Open Docker in Applications
  - Skip tutorial
- [Follow the instructions on the Docker website][docker-www]

### Node

You'll need to install Node v14 or above. [`nvm`][nvm] is highly recommended.

## Set Up the Development Environment

### Install NPM Packages

```sh
npm install
```

### Install d3.js in the app directory

```sh
npm install d3 --save
```

### Set Up `postgres` User Password and Database Name

We need to set up couple pieces of information in order to start a new
PostgreSQL server instance, as well as to connect to it later from the Express
server.

1. Copy the example environment file

   ```sh
   cp .env.example .env
   ```

2. You can choose to edit `.env` or just use as-is.

[See the PostgreSQL Docker image documentation for more
information][dh-postgres].

### Initialize the Database

Let's set up the database server, create the application database, and seed it
with some data. You only need to do this the first time you set up your
development environment. The database will contain no rows, but you can save Birthday Party as your first entry!

```sh
npm run db:init
```

ℹ️ If you ever need to start over with the database, you can run this command
again which will delete your existing data and start from scratch.

## Start the Development Environment

```sh
npm start
```

Visit <http://localhost:3000>.

## Shut Down the Development Environment

1. `Ctrl-C` to stop the Express and React development servers.
1. `npm run db:stop` to stop and destroy the PostgreSQL Docker container. Don't
   worry, your data is safe.

## Need to Start a `psql` Session?

```sh
npm run psql
```

## Want More Details?

- [Read about the application stack](docs/application-stack.md).
- [Read about the Express server](server/README.md).
- [Read about the React app](app/README.md).

## Deployment

[Read about setting up and deploying to Heroku](docs/deployment.md).

[deploy-badge]: https://github.com/picaq/prerequisite-tree/actions/workflows/deploy.yaml/badge.svg
[deploy-workflow]: https://github.com/picaq/prerequisite-tree/actions/workflows/deploy.yaml
[dh-postgres]: https://hub.docker.com/_/postgres
[docker-www]: https://docs.docker.com/get-docker/
[homebrew]: https://brew.sh
[live]: https://prerequisite.herokuapp.com
[nvm]: https://github.com/nvm-sh/nvm
[reset-badge]: https://github.com/picaq/prerequisite-tree/actions/workflows/reset-db.yml/badge.svg
[reset-workflow]: https://github.com/picaq/prerequisite-tree/actions/workflows/reset-db.yml
