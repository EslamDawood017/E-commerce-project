# E-Commerce Project

## Overview

This E-Commerce Project is a full-stack online store application with a .NET Core backend and an Angular frontend. It includes product management, categories, shopping cart, orders, user authentication, and payment processing.

## Project Structure

- `Back End/Store/` - ASP.NET Core backend
- `Front End/Store/` - Angular frontend

## Features

- User authentication and role-based admin access
- Product listing and category management
- Shopping cart and order checkout
- Image upload support for products
- Payment processing test support

## Admin Accounts

Use these accounts to log in as an administrator:

- **Admin 1**
  - Username: `user1`
  - Password: `Qwerty12**`

- **Admin 2**
  - Username: `user2`
  - Password: `Qwerty12**`

## Test Payment Card

Use this test card information for payment flow testing:

- Cardholder Name: Any test name
- Card Number: `4242 4242 4242 4242`
- Expiry Date: Any future date (for example `12/35`)
- CVC: `123`
- Zip Code: `12345`

## Getting Started

1. Open the solution file in `Back End/Store/Store.sln`.
2. Restore NuGet packages and build the backend project.
3. Configure any local settings in `Back End/Store/appsettings.Development.json` if needed.
4. Open the Angular project in `Front End/Store/`.
5. Run `npm install` and then `ng serve` to launch the frontend.

## Notes

- This README is intended as a quick introduction for testers and developers.
- Use the provided admin credentials and test payment card details during development and QA.
