import { ErrorRequestHandler } from "express";

const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
  const errorCode = err.statusCode ? err.statusCode : 500
  res.status(errorCode)
  res.json({
    message: err.message,
    stack: process.env.NODE_ENV === 'production' ? null : err.stack
  })
}
export default errorHandler;