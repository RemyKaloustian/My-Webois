# Accidents API

## __`GET`__ /api/accidents

Get all the accidents

```json
Output:
[
    {
        "_id": "45464590E5sdjsd84384374",
        "location": [ 7.313131, 42.434343 ],
        "comments": []
    },

    {
        "_id": "4546hshd0E5sdjsd84384374",
        "location": [ 7.313117, 42.432343 ],
        "comments": [
            {
                "name": "Bernard",
                "comment": "Not present anymore."
            },
            {
                "name": "Patrick",
                "comment": "Not present!"
            },
        ]
    },
]
```

## __`GET`__ /api/accidents/:id

Get an accident with the given id.

```json
Output:
{
    "_id": "45464590E5sdjsd84384374",
    "location": [ 7.313117, 42.432343 ],
    "comments": [
        {
            "name": "Bernard",
            "comment": "Not present anymore."
        },
        {
            "name": "Patrick",
            "comment": "Not present!"
        },
    ]
}
```

## __`POST`__ /api/accidents

Create a new accident.

```json
Input:
{
    "longitude": 7.43534,
    "latitude": 42.43434
}
```

```json
Output:
{
    "_id": "45464590E5sdjsd84384374",
    "location": [ 7.43534, 42.43434 ],
    "comments": []
}
```

## __`PUT`__ /api/accidents/:id/remove

Update the counter of "asked deletion" of an accident.

```json
Output:
{
    "message": "Accident updated."
}
```

## __`DELETE`__ /api/accidents/:id

Delete an existing accident.

```json
Output:
{
    "message": "Accident deleted successfully."
}
```