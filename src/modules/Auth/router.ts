import { Router } from 'express';

// Controller
import { authController } from './controller/auth-controller';

// Router
const router = Router();
const baseUrl = '/auth';

router.post(`${baseUrl}/login`, authController.login);
router.post(`${baseUrl}/token`, authController.token);

export const authRouter = router;
