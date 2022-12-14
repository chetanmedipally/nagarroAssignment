# Nagarro Assignment

The main purpose of this repository is to show a working Node.js API Server which follows best coding practices along with Swagger Integration.

# Pre-reqs

To build and run this app locally you will need a few things:

- Install [Node.js](https://nodejs.org/en/)
- Install [MongoDB](https://docs.mongodb.com/manual/installation/)
- Install [VS Code](https://code.visualstudio.com/)

Create a .env file and add following contents into the file and save it

- NODE_ENV = development
- PORT = 3000
- MONGO_URI = mongodb://localhost:27017
- JWT_SECRET = abcd123

# Getting started

- Clone the repository

```
git clone --depth=1 https://github.com/chetanmedipally/nagarroAssignment.git <project_name>
```

- Install dependencies

```
cd <project_name>
npm install
```

- Start your mongoDB server (you'll probably want another command prompt)

```bash
mongod
```

- Installing global dependencies

```
npm i typescript nyc -g

```

- Build and run the project

```
npm run build
npm start
```

- Run the test cases for the project

```
npm test
```

The test cases results will be displayed in the console.

- Generate the coverage reports for the project

```
nyc node dist/src/app.js
```

Open another terminal and run the tests

```
npm test
```

Stop the server to see the coverage reports in the console.

# Swagger API Implementation

URL for the Swagger API's (Once server is up and running)

```
http://localhost:3000/api-docs


```

# API Response Times

When an API is hit, the reponse time of the api is shown in the console with the name of the API.
You can also fine the Postman collection for the APIs in the repository.
