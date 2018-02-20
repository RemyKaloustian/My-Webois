# Authentication API

## __`POST`__ /api/auth/register

Create an account with the specified credentials.

```json
Input:
{
  "username": "username",
  "password": "password"
}
```

```json
Output:
{
  "password": "password",
  "username": "username",
  "_id": "mongo_object_id"
}
```

## __`POST` /api/auth/login

Login the account with the specified credentials.
Returns the status of the logging-in in the **`success`** field.

```json
Input:
{
  "username": "username",
  "password": "password"
}
```

```json
Output:
{
  "success": boolean,
  "message": "A status message",
}
```
