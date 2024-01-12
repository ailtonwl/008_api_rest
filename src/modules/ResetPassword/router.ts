import { Router } from 'express';
import { resetPasswordController } from './controller/reset-password-controller';

// Router
const router = Router();
const baseUrl = '/reset-password';

router.post(`${baseUrl}`, resetPasswordController.validadeUser);
router.patch(`${baseUrl}`, resetPasswordController.resetPassword);
router.post(
  `${baseUrl}/validate`,
  resetPasswordController.validadeSecurityCode,
);

export const resetPasswordRouter = router;
