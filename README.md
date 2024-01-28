
# Food Order

## Introduction
"Web-Store-Concept" is a business website designed to connect customers with active deals and enable easy online ordering. It's tailored for a seamless experience in viewing deals and placing food orders.

## Table of Contents
1. [Installation](#installation)
2. [Usage](#usage)
3. [Features](#features)
4. [Configuration](#configuration)
5. [Examples](#examples)
6. [Contributors](#contributors)
7. [License](#license)

## Installation
To set up "Web-Store-Concept" locally, follow these steps:

1. Clone the repository to your local machine.
2. Install the necessary dependencies by running `npm install` in the project directory.
3. Configure your environment variables in a `.env` file. This file should include the following keys:
   - `NEXTAUTH_URL` (local setup: http://localhost:3000/)
   - `MONGO_URL` (local setup: eg. mongodb://127.0.0.1:27017/database_name)
   - `SECRET` (eg. in VS Code terminal type the following: 'node' -> 'require("crypto").randomBytes(64).toString("hex")')
   - `NODE_ENV` (local setup: development)
   - `CLOUDINARY_API_SECRET`
   - `CLOUDINARY_API_KEY`
   - `CLOUDINARY_CLOUD_NAME`
   - `STRIPE_PK`
   - `STRIPE_SK`
   - `STRIPE_SIGN_SECRET`
4. Ensure you have the necessary keys and credentials for Cloudinary, Stripe services, and MongoDB if using for example Mongo Atlas.

## Usage
After installing the project, start the development server with:

```bash
npm run dev
```

This will run the application in development mode. Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

## Features
- **Order Food**: Browse and order from a variety of food options.
- **View Current Deals**: Stay updated with the latest deals offered.
- **User and Admin Creation**: Ability to create user and admin accounts.
- **Admin Dashboard**: Manage the website and view insights from an admin perspective.

## Configuration
Ensure you obtain the necessary API keys and credentials for the following services:
- MongoDB for database management if using A cloud server such as Mongo Atlas.
- Cloudinary for image storage and management.
- Stripe for payment processing.

## Examples
Visit [https://store-concept.vercel.app](https://store-concept.vercel.app) to see a live example of the application.

## Contributors
This project is developed and maintained by [AmazeDeus].

## License
This project is open-sourced under the MIT License.
