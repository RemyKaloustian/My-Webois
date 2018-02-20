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
(Can be skipped if you used the **`install.sh`** that is in the parent directory.)
Then, start the database thanks to the script:

```
$ > ./scripts/start_db.sh
```

And finally, launch the API with:

```
$ > ./scripts/start_server.sh
```

## Manipulate the database

You can go to [http://localhost:4000/](http://localhost:4000) when the server is started to manipulate the database. We use [mongo-express](https://github.com/mongo-express/mongo-express).

## Default data

By default, we load "only" two accidents and one user _(admin, password: admin)_ in the database.

If you want to load the CSV Government file for the 06 department, you can check the script [here](./scripts/load_csv_06.sh). This script needs the server to be started, because it works this way: the server hosts a route, and the script sends a request through curl to trigger the process. Please note that this is __really heavy__ on Google’s side, so please use with caution.

## Tests

In order to run the tests for the API, you need to cast the command “npm test” from within the server directory.
It is important to take into account that the database needs to be started with the associated script start_server.sh.

## About

Server comming from MERN Starter from Joshuaslate.
