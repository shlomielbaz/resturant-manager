import express from 'express';

import MessageResponse from '../interfaces/message.response';
import emojis from './emojis';

const router = express.Router();

router.get<{}, MessageResponse>('/', (req, res) => {
  res.json({
    message: 'API - 👋🌎🌍🌏',
  });
});

router.get<{}, MessageResponse>('/orders', (req, res) => {
  res.json();
});

router.get<{}, MessageResponse>('/kitchen', (req, res) => {
  res.json({
    message: 'API - 👋🌎🌍🌏',
  });
});


router.get<{}, MessageResponse>('/restorant', (req, res) => {
  res.json({
    message: 'API - 👋🌎🌍🌏',
  });
});

router.use('/emojis', emojis);

export default router;
