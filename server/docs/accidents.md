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

## __`GET`__ /api/accidents?longitude=_long_&latitude=_lat_

Get all the accidents near _long_ & _lat_ __*(1.5km radius)*__.

```json
Output:
[
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
    "latitude": 42.43434,
    "seriousness": 1, // Optionnal
    "type": 2, // Optionnal
}
```

```json
Output:
{
    "_id": "45464590E5sdjsd84384374",
    "location": [ 7.43534, 42.43434 ],
    "seriousness": 1,
    "type": 2,
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