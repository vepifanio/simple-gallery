import util from 'node:util';
import fs from 'node:fs';
import { pipeline } from 'node:stream';
import { FastifyInstance } from 'fastify';

const pump = util.promisify(pipeline);

export async function uploadRoutes(app: FastifyInstance) {
  app.post('/uploads', async (request, reply) => {
    const dataFile = await request.file();

    if (!dataFile) {
      return reply.status(400).send({
        message: 'A file must be provided.'
      });
    }

    await pump(dataFile.file, fs.createWriteStream(`./uploads/${dataFile.filename}`));

    return reply.status(201).send();
  });
}