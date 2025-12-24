import { Router } from 'express';
import multer from 'multer';
import * as telegramController from '../controllers/teleController';

const router = Router();

const upload = multer({
  storage: multer.memoryStorage(),
});

router.post(
  '/send',
  upload.single('data'),
  telegramController.sendMessage
);

export default router;
