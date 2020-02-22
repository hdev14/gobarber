import { Router } from 'express';

// CONTROLLERS
import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';

// MIDDLEWARES
import auth from './app/middlewares/auth';

const routes = Router();

routes.post('/users', UserController.store);
routes.post('/sessions', SessionController.store);

routes.use(auth);

routes.put('/users', UserController.update);

export default routes;
