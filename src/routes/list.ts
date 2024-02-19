import { FastifyInstance } from 'fastify';
import { db } from '../db';
import { images } from '../db/schemas';
import { desc } from 'drizzle-orm';
import z from 'zod';

const ITEMS_PER_PAGE = 10;

export async function list(app: FastifyInstance) {
  app.get('/', async (request, reply) => {
    const listImagesQuerySchema = z.object({
      page: z.coerce.number().min(1).default(1)
    });

    const { page } = listImagesQuerySchema.parse(request.query);

    const result = await db.select()
      .from(images)
      .orderBy(
        desc(images.createdAt)
      )
      .offset((page - 1) * ITEMS_PER_PAGE)
      .limit(ITEMS_PER_PAGE);

    return reply.send({
      images: result
    });
  });
}