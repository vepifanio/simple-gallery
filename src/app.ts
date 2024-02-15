import fastifyMultipart from '@fastify/multipart';
import Fastify from 'fastify';
import { uploadRoutes } from './routes/uploads';

const app = Fastify({
  logger: true
});

app.register(fastifyMultipart);

app.register(uploadRoutes);

export { app };