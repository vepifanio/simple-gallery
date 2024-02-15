// import util from 'node:util';
// import fs from 'node:fs';
// import { pipeline } from 'node:stream';
import { FastifyInstance } from 'fastify';
import { PutObjectCommand } from '@aws-sdk/client-s3';
import { client } from '../s3';

// const pump = util.promisify(pipeline);

export async function uploadRoutes(app: FastifyInstance) {
  app.post('/uploads', async (request, reply) => {
    const dataFile = await request.file();

    if (!dataFile) {
      return reply.status(400).send({
        message: 'A file must be provided.'
      });
    }
    // await pump(dataFile.file, fs.createWriteStream(`./uploads/${dataFile.filename}`));


    // TODO
    // gerar id
    // gerar nome do arquivo - id + filename

    
    const result = await client.send(
      new PutObjectCommand({
        Bucket: 'vesp-simple-gallery',
        Key: dataFile.filename,
        Body: dataFile.file,
        ACL: 'public-read'
      })
    );

    // salvar no banco de dados - id - original filename - link do S3 - createdAt

    return reply.status(201).send({ result });
  });
}