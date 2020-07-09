import { Router } from 'express';
import multer from 'multer';

// CONFIGS
import multerConfig from './config/multer';

// VALIDATORS
import SessionValidator from './app/validators/SessionValidator';
import UserValidator from './app/validators/UserValidator';

// CONTROLLERS
import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';
import FileController from './app/controllers/FileController';
import ProviderController from './app/controllers/ProviderController';
import AppointmentController from './app/controllers/AppointmentController';
import ScheduleController from './app/controllers/ScheduleController';
import NotificationController from './app/controllers/NotificationController';
import AvailableController from './app/controllers/AvailableController';

// MIDDLEWARES
import auth from './app/middlewares/auth';

const upload = multer(multerConfig);

const routes = Router();

routes.post('/users', UserValidator.store, UserController.store);
routes.post('/sessions', SessionValidator.store, SessionController.store);

routes.use(auth);

routes.put('/users/', UserValidator.update, UserController.update);

routes.get('/providers', ProviderController.index);
routes.get('/providers/:providerId/available', AvailableController.index);

routes.get('/appointments', AppointmentController.index);
routes.post('/appointments', AppointmentController.store);
routes.delete('/appointments/:id', AppointmentController.delete);

routes.get('/schedule', ScheduleController.index);

routes.get('/notifications', NotificationController.index);
routes.put('/notifications/:id', NotificationController.update);

routes.post('/files', upload.single('file'), FileController.store);

export default routes;
