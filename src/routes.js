import { Router } from 'express';
import multer from 'multer';

// CONFIGS
import multerConfig from './config/multer';

// CONTROLLERS
import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';
import FileController from './app/controllers/FileController';

// MIDDLEWARES
import auth from './app/middlewares/auth';

const upload = multer(multerConfig);

const routes = Router();

routes.post('/users', UserController.store);
routes.post('/sessions', SessionController.store);

routes.use(auth);

routes.put('/users/', UserController.update);

routes.post('/files', upload.single('file'), FileController.store);

export default routes;
