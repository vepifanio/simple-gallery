import { FastifyInstance } from 'fastify';
import { Upload } from '@aws-sdk/lib-storage';
import { client } from '../s3';
import { db } from '../db';
import { images } from '../db/schemas';

export async function uploadRoutes(app: FastifyInstance) {
  app.post('/uploads', async (request, reply) => {
    const dataFile = await request.file();

    if (!dataFile) {
      return reply.status(400).send({
        message: 'A file must be provided.'
      });
    }

    const filename = `${new Date().getTime()}-${dataFile.filename}`;

    const upload = new Upload({
      client,
      params: {
        Bucket: 'vesp-simple-gallery',
        Key: filename,
        Body: dataFile.file,
        ACL: 'public-read',
        ContentType: dataFile.mimetype
      }
    });

    const { Location } = await upload.done();

    if (!Location) {
      return reply.status(400).send({
        message: 'Something went wrong in the image upload.'
      });
    }

    const instertedImages = await db.insert(images).values({
      fileLink: Location,
      fileName: dataFile.filename
    }).returning();

    return reply.status(201).send({ 
      image: instertedImages[0]
    });
  });
}