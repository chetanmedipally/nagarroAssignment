import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import errorHandler from './middleware/ErrorMiddleware';
import userRoutes from "./routes/usersRoutes";
import requestRoutes from "./routes/requestsRoutes";
import dotenv from "dotenv";
import fs from 'fs';
import swaggerUi from "swagger-ui-express";
import swaggerDocument from "./swagger.json"
// const swaggerUi = require('swagger-ui-express');
// const swaggerDocument = require('./swagger.json');
const customCss = fs.readFileSync((process.cwd() + "/src/swagger.css"), 'utf8');
dotenv.config({ path: ".env" })

const PORT = process.env.PORT || 3000

const app = express();

app.use(bodyParser.json())
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument, { customCss }));
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Methods',
    'OPTIONS, GET, POST, PUT, PATCH, DELETE'
  );
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});

app.use('/api/users', userRoutes);
app.use('/api/requests', requestRoutes);
app.use(errorHandler);

mongoose
  .connect(process.env.MONGO_URI as string + "/AssignmentDB")
  .then(result => {
    module.exports = app.listen(PORT, () => {
      console.log(`Server listening on port ${PORT}`);
    });
  })
  .catch(err => console.log(err));