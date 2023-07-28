### Chain-Reaction - Blogging Platform RESTful API

### Description

Chain-Reaction is a RESTful API for a blogging platform built using native Node.js, Sequelize as the ORM for PostgreSQL, and JWT for user authentication and authorization. The API provides endpoints to manage blog posts, user registration, login, pagination, and sorting. The application is dockerized for easy deployment.

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

### Code Quality and Formatting

To maintain code quality and consistency, the project uses ESLint and Prettier.

## ESLint

ESLint is a powerful linting tool that enforces coding standards and checks for common errors and potential bugs. It helps maintain a consistent codebase and ensures code readability. ESLint is integrated with code editors and provides real-time feedback to developers.

## Prettier

Prettier is a code formatter that automatically formats the code to adhere to a consistent style defined by the Prettier configuration. It ensures that the codebase follows a consistent code style, making it more readable and avoiding debates over formatting choices.

By using ESLint and Prettier in combination, the project benefits from enhanced code quality, readability, and maintainability, fostering better collaboration among team members.

### Database Configuration

The project uses Sequelize as the ORM for PostgreSQL. The database configuration is stored in the config.js file, where you can specify the database credentials, host, port, and other options.

### Running Migrations

To create and manage database migrations, use the Sequelize CLI. The CLI exposes a way to create migration files easily. For example:

`node src/database/migrator.js create --name my-migration.js --allow-confusing-ordering`

### Dockerization

The application is dockerized, which means it can be easily deployed and run as a container. Docker ensures that the application runs consistently across different environments, making it ideal for production deployment.

## Author

Mohammad Masaid
