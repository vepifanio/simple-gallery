import { FastifyInstance } from 'fastify';
import { client } from '../s3';
import { ListObjectsCommand } from '@aws-sdk/client-s3';

export async function list(app: FastifyInstance) {
  app.get('/', async (request, reply) => {
    const { Contents } = await client.send(
      new ListObjectsCommand({
        Bucket: 'vesp-simple-gallery',
      })
    );

    return reply.send(Contents);
  });
}