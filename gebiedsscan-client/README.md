# Gebiedsscan

## Installation
``` 
npm install
```

## Develop locally on port 8080 with live reload
``` 
npm run dev
``` 

## build for production
``` 
npm run build
``` 



## Structure
All project files are stored in the src folder:

* /assets
  * /img - images
  * /sass - stylesheets
* /components - (fully) reusable veu components
* /views - pages of the application per url route
* /store - the datastore (not sure if we are going to use this)
* app.js - main setup of the application, register reusable components here
* routes.js - routes file with all frontend routes

Other files & folders:

*  /build - contains boilerplate build scripts that npm runs to create the app
*  /config - contains config files that allow you to do some environment specific configuration
*  index.html - actual html page that loads the entire application
