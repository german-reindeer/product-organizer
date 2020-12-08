# Product Organizer
Web application for simply organizing products

## Backend
The backend is Spring microservice with an H2 in-memory database

## Build & Run

## Frontend
The frontend is a simple browser application built with Angular

### Build & Run
As a prerequisite npm has to be installed on your local machine.
If this is done, you can install the Angular project.
```
cd product-organizer-frontend
npm install
```
Afterwards you build the application with following command
```
npm run build:prod
```
When this is done, navigate to the build folder a start a server of your choice (I like [static-server](https://www.npmjs.com/package/static-server))
```
cd dist/apps/product-organizer-frontend
static-server
```
Now you should be able to open the Product Organizer application under the following link [http://localhost:9080]().

If you are fine with using the Angular development server instead of doing a production build, you could also run the start command directly after installing the project 
```
npm run start
``` 
The url to the development server is [http://localhost:4200]()
