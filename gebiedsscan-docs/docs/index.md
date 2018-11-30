# Gebiedsscan applicatie

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

### Prerequisites

What things you need to install the software and how to install them

* Node js installed

### Installing

A step by step series of examples that tell you have to get a development env running

Install npm dependencies

```
npm install
```

Serve the application locally (live reload).

```
npm run dev
```
The app will be served on [http://127.0.0.1:8000/](http://127.0.0.1:8000/)

## Deployment

To build distribuition version run:

```
npm run build
```

## Built With

* [Vue JS](https://vuejs.org/) - Javascript single page application framework.
* [Leaflet](https://leafletjs.com/) - Interactive maps framework.
* [ES6](https://www.ecma-international.org/ecma-262/6.0/) - Built Using ES6 standards.


## Project layout

    src/
        /assets
            /img - images
            /sass - stylesheets
            /data - data files
        /components - reusable VUE components
        /GeoDataManager - Vanilla JS set of classes that handle the different data sources and map logic
        /views - pages of the application per url route
        app.js - main setup of the application, register reusable components here
        routes.js - routes file with all frontend routes
