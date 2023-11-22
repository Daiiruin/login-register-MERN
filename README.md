# React User Management App (MongoDB, Nodejs, ExpressJS)

Hello ! Here is a simple MERN (MongoDB, ExpressJS, ReactJS, NodeJS) stack application for user registration, login, and authentication using JSON Web Tokens (JWT).

## Table of Contents

- [Features](#features)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Configuration](#configuration)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Technologies Used](#technologies-used)

## Features

- Register a new user with a username, email, and password.
- Login with email and password.
- Authenticate users using JSON Web Tokens (JWT).
- Secure password storage using encryption. (Will be added soon)
- User logout.

## Prerequisites

Before you begin, ensure you have met the following requirements:

- Node.js installed
- npm (Node Package Manager) installed
- MongoDB installed and running

## Installation

1. Clone the repository.

2. Install dependencies in client folder:

   ```bash
   cd client
   npm install
   ```

3. Install dependencies in server folder:

   ```bash
   cd server
   npm i -y
   ```

## Configuration

1. Create a .env file in the client directory and configure the following variables:

   ```bash
   PORT=3001
   MONGO_URI=mongodb://localhost:27017/your-database-name
   ```

   Adjust the values according to your preferences and MongoDB setup.

## Usage

1. Start the server:

   ```bash
   cd client
   npm run dev

   cd server
   npm start
   ```

2. Visit http://localhost:???? in your web browser to use the React User Management App.

## API Endpoints

- POST /register: Create a new user.
- POST /login: Login.
- GET /user: Retrieves and sends the details of a user based on their authenticated token.

## Technologies Used

- React
- ExpressJS
- NodeJS
- MongoDB
