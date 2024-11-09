# API Reference Documentation

## Overview

The Nexus Finance Core API provides endpoints for interacting with the platform's functionalities. The API is RESTful and follows standard conventions.

## Base URL

[https://nexusfinance.com/api](http://nexusfinance.com/api)


## Authentication

All endpoints require authentication via a JSON Web Token (JWT). Users must log in to receive a token, which should be included in the `Authorization` header for subsequent requests.

```
Authorization: Bearer <token>
```

## Endpoints

### 1. User Routes

#### Register User

- **POST** `/users/register`
- **Request Body**:
  ```json
  {
    "name": "string",
    "email": "string",
    "password": "string",
    "address": "string"
  }
  ```

- Response:
  - 201 Created: User registered successfully.
  - 400 Bad Request: Validation errors.

#### Login User
- **POST** /users/login
- **Request Body**:
  ```json
  1 {
  2   "email": "string",
  3   "password": "string"
  4 }
  ```
  
- Response:
  - 200 OK: Returns user data and JWT token.
  - 401 Unauthorized: Invalid credentials.

### 2. Transaction Routes

#### Create Transaction
- **POST** /transactions
- **Request Body**:
  ```json
  1 {
  2   "type": "string", // "loan" or "repayment"
  3   "amount": "number"
  4 }
  ```
  
- Response:
  - 201 Created: Transaction created successfully.
  - 400 Bad Request: Validation errors.
- **Get** Transactions
- **GET** /transactions
- Response:
  - 200 OK: Returns an array of transactions.

### 3. KYC Routes

#### Submit KYC
- **POST** /kyc
- **Request Body**:
  ```json
  1 {
  2   "userAddress": "string",
  3   "documents": ["string"] // Array of document identifiers
  4 }
  ```
  
- Response:
  - 201 Created: KYC submitted successfully.
  - 400 Bad Request: Validation errors.

**Get KYC Status**
- **GET** /kyc/:userAddress
- Response:
  - 200 OK: Returns KYC status for the user.
  - 404 Not Found: User not found.

# Conclusion
This API reference provides a comprehensive overview of the available endpoints in the Nexus Finance Core application. For further details, please refer to the source code or contact the development team.
