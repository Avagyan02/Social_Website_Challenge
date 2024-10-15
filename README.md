# Social Website Challenge

This project is a social networking web application built using the **NestJS** framework.

## Project Overview

The **Social Website Challenge** is designed to allow users to:
- Register, login, and manage accounts.
- Send and accept friend requests.
- View and manage their friend list.
- Search on users.

The project integrates with a PostgreSQL database and uses **TypeORM** for database operations.

## Features

- **User Registration & Login**: Users can create accounts and log in securely using JWT-based authentication.
- **Friend Requests**: Users can send, accept, and reject friend requests.
- **Friend List Management**: Users can view their friends and check mutual connections.
- **Advanced Search**: Search functionality to find users by specific criteria.

## Technology Stack

- **Backend Framework**: NestJS
- **Database**: PostgreSQL
- **ORM**: TypeORM
- **Authentication**: JWT
- **Languages**: TypeScript
- **Build Tool**: npm

## Getting Started

### Installation

1. Clone the repository:

    ```bash
    git clone https://github.com/Avagyan02/Social_Website_Challenge.git
    ```

2. Navigate to the project directory:

    ```bash
    cd social_website_challenge
    ```

3. Install dependencies:

    ```bash
    npm install
    ```

4. Set up your environment variables in the `.env` file (use `.env.example` as a template).
   Example .env setup:
   ```
   DB_HOST=localhost
   DB_PORT=5432
   DB_PASSWORD=root
   DB_USER=root
   DB_NAME=db
   JWT_SECRET=secret
   JWT_MAX_AGE=86400000
   JWT_SALT=10
   ```

### Running the Application

To start the application in development mode:

```bash
npm run start:dev
