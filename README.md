# chain-reaction

Sr. software engineer assignment - chain reaction

### Project Name - Blogging Platform RESTful API

### Description

This project aims to build a RESTful API for a blogging platform using native Node.js, Sequelize (as the ORM for PostgreSQL), and JWT for user authentication and authorization.
The API will provide endpoints to manage blog posts, user registration, login,
including pagination, and sorting.
The application will be dockerized for easy deployment.

### Packages

ESLint:

ESLint is a powerful linting tool that helps maintain consistent code quality and enforces coding standards in our project. It checks our code for common errors, potential bugs, and stylistic issues, ensuring that the codebase remains clean and easy to read. why we use ESLint are:

1- Consistency: ESLint enforces a set of rules and coding conventions that all developers on the project must follow, leading to a consistent codebase.
2- Error Prevention: It catches common errors and coding mistakes early in the development process, reducing the likelihood of bugs.
3- Code Maintainability: ESLint helps keep the codebase clean and readable, making it easier for developers to understand and maintain the code over time.
4- Customization: You can customize ESLint rules to match your project's specific requirements and coding standards.
5- Integration: It seamlessly integrates with code editors and IDEs, providing real-time feedback to developers while they write code.
6- Team Collaboration: ESLint fosters better collaboration among developers, as everyone adheres to the same coding guidelines.
Prettier:

Prettier is a code formatter that automatically formats our code to adhere to a consistent style defined by the Prettier configuration. Unlike ESLint, which focuses on code quality and potential errors, Prettier's primary goal is to ensure consistent code formatting. Here's why we use Prettier:

1- Consistent Code Style: Prettier enforces a consistent code style throughout the project, eliminating debates over formatting choices.
2- Time-Saving: Developers don't need to worry about manual code formatting since Prettier handles it automatically.
3- Readability: Formatted code is more readable, making it easier for team members to understand each other's code.
4- Avoiding "Formatting Wars": Code reviews are more focused on logic and functionality rather than formatting, as Prettier ensures consistent formatting across the board.
5- Integration with ESLint: Prettier can be integrated with ESLint to complement each other. ESLint takes care of code quality, while Prettier handles code formatting.

By using ESLint and Prettier in combination, our project benefits from enhanced code quality, readability, and maintainability. These tools promote a smooth development workflow and foster better collaboration among team members.

### Installation and Running the Application

`git clone https://github.com/al6obasi/chain-reaction.git`

`cd chain-reaction`

`yarn install`

`yarn start`
