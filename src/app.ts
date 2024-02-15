import fastifyMultipart from '@fastify/multipart';
import Fastify from 'fastify';
import { uploadRoutes } from './routes/uploads';
import { list } from './routes/list';

const app = Fastify({
  logger: true
});

app.register(fastifyMultipart);

app.register(list);
app.register(uploadRoutes);

export { app };