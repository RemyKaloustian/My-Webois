# Server side of WebBois

## Docs

* [Accidents API](./docs/accidents.md)
* [Load Files API](./docs/load.md)
* [Comments API](./docs/comments.md)
* [Authentication API](./docs/authentication.md)

## Requirements

You must have **Mongo** and **npm** installed on your computer.
Please keep in mind that, depending on your installation, you might need to pass some commands under a **sudo** user.

## Start the server

The first thing you need to do is an **`npm install`** inside this folder.
Then, start the database thanks to the script:

```
$ > ./scripts/start_db.sh
```

And finally, launch the API with:

```
$ > ./scripts/start_server.sh
```

## About

Server comming from MERN Starter from Joshuaslate.
