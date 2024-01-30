
# Web-Store-Concept

## Introduction
"Web-Store-Concept" is a business website designed to connect customers with active deals and enable easy online ordering. It's tailored for a seamless experience in viewing deals and placing food orders.

## Table of Contents
1. [Installation](#installation)
2. [Usage](#usage)
3. [Features](#features)
4. [Configuration](#configuration)
   - [Stripe Setup](#stripe-setup)
5. [Examples](#examples)
6. [Contributors](#contributors)
7. [License](#license)

## Configuration
Ensure you obtain the necessary API keys and credentials by creating accounts for the following services:
- MongoDB for database management if using a cloud server such as Mongo Atlas.
- Cloudinary for image storage and management.
- Stripe for payment processing.

## Installation
To set up "Web-Store-Concept" locally, follow these steps...

1. Clone the repository to your local machine. (`git clone https://github.com/AmazeDeus/Web-Store-Concept.git`)
2. Install the necessary dependencies by running `npm install` in the project directory.
3. Configure your environment variables in a `.env` file inside the root directory. This file should include the following keys:
   - `NEXTAUTH_URL` (local setup: http://localhost:3000/)
   - `MONGO_URL` (local setup: eg. 'mongodb://127.0.0.1:27017/database_name' or 'Your Mongo Atlas Database')
   - `SECRET` (eg. in VS Code terminal type the following: 'node' -> 'require("crypto").randomBytes(64).toString("hex")')
   - `NODE_ENV` (local setup: development)
   - `CLOUDINARY_API_SECRET`
   - `CLOUDINARY_API_KEY`
   - `CLOUDINARY_CLOUD_NAME`
   - `STRIPE_PK`
   - `STRIPE_SK`
   - `STRIPE_SIGN_SECRET`
4. Ensure you have the necessary keys and credentials for Cloudinary and Stripe by creating accounts on respective services, and MongoDB if using for example Mongo Atlas.

## Usage
After installing the project, start the development server with:

```bash
npm run dev
```

This will run the application in development mode. Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

### Stripe Setup
To integrate Stripe for payment processing in Test Mode, follow these steps:

1. **Create a Stripe Account**: Sign up for a free Stripe account at [Stripe's website](https://stripe.com).
2. **Access the Dashboard**: Log in and access the Dashboard.
3. **Switch to Test Mode**: Ensure you are in Test Mode (This is typically a toggle switch at the top of the Dashboard).
4. **Retrieve API Keys**: Access 'API keys for developers'. In the API Keys section, find your publishable and secret API keys for Test Mode.
5. **Set Environment Variables**: Set these keys as environment variables in your project.
   ```
   STRIPE_PK=your_test_publishable_key (Starts with: pk_test_)
   STRIPE_SK=your_test_secret_key (Starts with: sk_test_)
   ```
6. **Configure Webhook for Local Testing**:
   - Be sure your development server is up and running: `npm run dev`
   - Install the Stripe CLI using one of the approaches shown here: https://stripe.com/docs/stripe-cli
   - In the Dashboard, access 'webhooks' and choose 'Add local listener' to see how to listen to events in a local environment.
   - Run `stripe login` in any command-line interface, such as Powershell.
   - Run the `stripe listen --forward-to localhost:3000/api/webhook` command (make sure to listen on the correct port: 3000). This will generate the webhook signing secret you use for local testing. This starts with 'whsec_'.
   - In your local environment, set this as an environment variable:
     ```
     STRIPE_SIGN_SECRET=your_webhook_signing_secret (Starts with: whsec_)
     ```
   - After running `stripe listen`, you should be good to go. It should now validate incoming events from Stripe whenever you try to order within the local environment.

For more detailed information on Stripe integration, refer to the [Stripe Documentation](https://stripe.com/docs).

## Features
- **Order Food**: Browse and order from a variety of food options.
- **View Current Deals**: Stay updated with the latest deals offered.
- **User and Admin Creation**: Ability to create user and admin accounts.
- **Admin Dashboard**: Manage the website and view insights from an admin perspective.

## Examples
Visit [https://store-concept-three.vercel.app/](https://store-concept-three.vercel.app/) to see a live example of the application.

## Contributors
This project is developed and maintained by AmazeDeus.

## License
This project is open-sourced under the MIT License.
