import { Router } from 'express';
import { userController } from './controller/user-controller';
import { MiddlewareAuth } from 'middleware/auth-middleware';

// Router
const router = Router();
const baseUrl = '/user';

router.post(`${baseUrl}`, userController.create);

router.use(`${baseUrl}/:id`, MiddlewareAuth.authenticate);
router.get(`${baseUrl}/:id`, userController.read);
router.patch(`${baseUrl}/:id`, userController.update);
router.delete(`${baseUrl}/:id`, userController.delete);

export const userRouter = router;
