# Product Organizer
This is a web application for simply organizing products.
If you want to try it out, here's a guide on how to build and run the application on your local machine.
Start with the backend and then continue with the frontend. 

## Backend
The backend is Spring microservice with an H2 in-memory database

### Build & Run
First you will need to build the microservice running following commands
```
cd product-organizer-backend
./gradlew build
```
Afterwards move to the build folder and execute the built jar file.
```
cd build/libs
java -jar product-organizer-backend-0.0.1.jar
```

## Frontend
The frontend is a simple browser application built with Angular

### Build & Run
As a prerequisite npm and angular have to be installed on your local machine (find instructions [here](https://angular.io/guide/setup-local)).
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
Now you should be able to open the Product Organizer application under the following link [http://localhost:9080](http://localhost:9080).

If you are fine with using the Angular development server instead of doing a production build, you could also run the start command directly after installing the project 
```
npm run start
``` 
The url to the development server is [http://localhost:4200](http://localhost:4200)
