import * as express from 'express';
import expressJwt = require('express-jwt');
import {config} from '../config';

export function authenticationRequired(): express.RequestHandler {
  // Middleware that authenticates user based on JWT.
  return (req, res, next) => {
    expressJwt(config.jwt)(req, res, next);
  };
}
