# Gebiedsscan Application
The Gebiedsscan application is divided into 3 components the database, the Geo-Backend application and the Gebiedsscan client.
The database contains all the data about the projects, interested users and other data used in the application.
The Geo-Backend application gets requests from the Gebiedsscan client and fetches the corresponding data from the database.

## Geo-Backend application

To start the server run:
```sh
$ npm install
$ npm start
```

### Configurations
The application configurations can be changed by having the following environmental variables.
| Env. Variable | Description | Mandatory |
| ------ | ------ | ---- |
| DB_HOST | Database host | Yes |
| DB_PORT | Database port | No |
| DB_USER | Database user | Yes |
| DB_PASS | User password | Yes |
| DB_NAME | Name of the database | Yes |
| NODE_PORT | Port where the backend will run | Yes |

## Gebiedsscan-client
To build the client run:
```sh
$ npm install
$ npm run build
```
After building the client the contens on the /dist folder can be served. For correct behavior of the application the index.html file __MUST__ be served if the URL doesn't match any static assets.

### Configurations
The application configurations can be changed by changing the values in config.js

| Field | Description | Mandatory |
| ------ | ------ | ---- |
| baseUrl | Base url for the geo-backend including the protocol | Yes |

## Database
A snapshot of the database can be found in the database folder
