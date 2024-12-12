# Backend Api Documentation

# `POST /user/register` Endpoint

## Description

This endpoint allows users to register by providing their **email**, **fullname**, and **password**. It validates the input and creates a new user record in the database if the information is correct.

## Data Requirements

### Request Body

The request body should be a JSON object containing the following fields:

-   **fullname** (Object, required):
    -   `firstname`: (String, required, min length: 3 characters)
    -   `lastname`: (String, required, min length: 3 characters)
-   **email** (String, required, must be a valid email format)

-   **password** (String, required, min length: 6 characters)

#### Example:

```json
{
  "fullname": {
    "firstname": "John",
    "lastname": "Doe"
  },
  "email": "johndoe@example.com",
  "password": "strongpassword123"
}
```

# `POST /user/login` Endpoint

## Description
This endpoint allows users to log in by providing their **email** and **password**. It validates the input data, checks the credentials, and returns a pair of access and refresh tokens if the login is successful.

## Data Requirements

### Request Body
The request body should be a JSON object containing the following fields:

- **email** (String, required): Must be a valid email format.
- **password** (String, required, minimum length: 6 characters): The password of the user.

#### Example:
```json
{
  "email": "johndoe@example.com",
  "password": "strongpassword123"
}
```