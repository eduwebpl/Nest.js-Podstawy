import express from 'express';
import { appController } from './app.controller.js';

async function bootstrap() {
  const app = express();
  app.use(appController);
  await app.listen(3031);
  console.log('My server is running on port 3031');
}

bootstrap();
