### Chain-Reaction - Blogging Platform RESTful API

### Description

Chain-Reaction is a RESTful API for a blogging platform built using native Node.js, Sequelize as the ORM for PostgreSQL, and JWT for user authentication and authorization. The API provides endpoints to manage blog posts, user registration, login, pagination, and sorting. The application is dockerized for easy deployment.

### Documentation & Testing

https://www.postman.com/datazone/workspace/blogging-platform-restful-api/collection/1633351-2e645578-2a46-4d3b-825b-1df4f0e35c64?action=share&creator=1633351

### Features

-   User registration and authentication using JWT
-   CRUD operations for managing blog posts
-   Pagination and sorting of blog posts
-   Dockerized application for easy deployment

### Installation and Running the Application

-   Clone the repository:
    `git clone https://github.com/al6obasi/chain-reaction.git`

-   Change into the project directory:
    `cd chain-reaction`

-   Install the required dependencies:
    `yarn install`

-   Start the application:
    `yarn start`

## Prerequisites

-   Docker & Docker compose
-   Node V18.17.0

### Installation and Running the Application with Docker and docker-compose

-   Clone the repository:
    `git clone https://github.com/al6obasi/chain-reaction.git`

-   Change into the project directory:
    `cd chain-reaction`

-   Update the default enviourment vairable exists on .default.env

-   Make sure the docker service is runing in your machine then run
    `docker-compose up`

-   Navigate to http:localhost:3000 and start testing the CRUD API

    -   / => GET : this is the root route will return Hello world
    -   /register POST: create a new user
    -   /login POST: login user
    -   /posts => GET: retrive the blog posts we have
    -   /post/:ID GET: retrive a single blog post
    -   /post => POST: create a new post
    -   /post => PATCH: update existing post
    -   /post => DELETE: delete existing post

-   There is a file contains our Postman requests called `Blogging Platform RESTful API.postman_collection` in the root directory

## Project Structure (Tree)

project/
|-- node_modules/
|-- src/
|-- |-- constants/
| |-- index.js
| |-- controllers/
| |-- AuthController.js
| |-- PostController.js
| |-- database/
| |-- migrations/
| |-- models/
| |-- seeders/
| |-- helpers/
| |-- middlewares/
| |-- AuthMiddleware.js
| |-- routes/
| |-- index.js
| |-- services/
| |-- AuthService.js
| |-- App.js
| |-- config.js
| |-- server.js
| |-- helpers/
| |-- errorHandler.js
| |-- successHandler.js
| |-- utils.js
|-- Dockerfile
|-- docker-compose.yml
|-- package.json
|-- yarn-lock
|-- .default.env
|-- .nvmrc
|-- .eslintignore
|-- .sequelizerc
|-- .prettierrc
|-- Blogging Platform RESTful API.postman_collection.json
|-- .gitignore
|-- README.md

### Code Quality and Formatting

To maintain code quality and consistency, the project uses ESLint and Prettier.

## ESLint

ESLint is a powerful linting tool that enforces coding standards and checks for common errors and potential bugs. It helps maintain a consistent codebase and ensures code readability. ESLint is integrated with code editors and provides real-time feedback to developers.

## Prettier

Prettier is a code formatter that automatically formats the code to adhere to a consistent style defined by the Prettier configuration. It ensures that the codebase follows a consistent code style, making it more readable and avoiding debates over formatting choices.

By using ESLint and Prettier in combination, the project benefits from enhanced code quality, readability, and maintainability, fostering better collaboration among team members.

### Database Configuration

The project uses Sequelize as the ORM for PostgreSQL. The database configuration is stored in the config.js file, where we can specify the database credentials, host, port, and other options.

### Running Migrations

To create and manage database migrations, we can use the Sequelize CLI. The CLI exposes a way to create migration files easily. For example:

`node src/database/migrator.js create --name my-migration.js --allow-confusing-ordering`

### Dockerization

The application is dockerized, which means it can be easily deployed and run as a container. Docker ensures that the application runs consistently across different environments, making it ideal for production deployment.

# Author

Mohammad Masaid
