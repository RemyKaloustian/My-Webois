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

## Default data

By default, we load two accidents and one user (admin, admin) in the database.

If you want to load the CSV Government file for the 06 department, you can check the script [here](./scripts/load_csv_06.sh). This script needs the server to be started, because it works this way: the server hosts a route, and the script sends a request through curl to trigger the process. Please note that this is __really heavy__ on Google’s side, so please use with caution.

## About

Server comming from MERN Starter from Joshuaslate.
