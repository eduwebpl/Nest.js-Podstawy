import { Router } from 'express';

export const appController = new Router();

appController.get('/', (req, res) => {
  res.send('Hello form Express');
});

appController.get('/user', (req, res) => {
  res.send({ name: 'Michal' });
});
