# Backend Api Documentation

# User API
---
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

# `POST /user/logout` Endpoint

## Description
This endpoint logs out the user by clearing their **accessToken** and **refreshToken** cookies and removing the refresh token from the database.

## Authentication Required
This endpoint requires the user to be authenticated. The user must be logged in, with a valid JWT token provided in the `Authorization` header.

## Response

### Success (200 OK)
- **Status Code**: `200 OK`
- **Response Body**:
  - A message indicating that the user has been successfully logged out.

#### Example:
```json
{
  "status": 200,
  "data": null,
  "message": "User Logout Successfully",
  "errors": []
}
```

# `GET /user/getUserProfile` Endpoint

## Description
This endpoint allows the authenticated user to retrieve their profile information. The response will contain user details excluding sensitive information such as the password.

## Authentication Required
This endpoint requires the user to be authenticated. The user must provide a valid **JWT token** in the `Authorization` header, which will be used to identify the user.

### Request Headers:
- **Authorization**: `Bearer <access_token>`
  - The JWT token of the user. This token must be valid and not expired.

#### Example:
```http
Authorization: Bearer <access_token>
```
