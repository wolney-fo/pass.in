import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import z from "zod";
import { makeCreateEventUseCase } from "../../use-cases/factories/make-create-event";

export async function createEventRoute(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().post(
    "/events",
    {
      schema: {
        body: z.object({
          title: z.string().min(4),
          details: z.string().nullable(),
          maximumAttendees: z.coerce.number().int().positive().nullable(),
        }),
        response: {
          201: z.object({
            eventId: z.string().uuid(),
          }),
        },
      },
    },
    async (request, reply) => {
      const { title, details, maximumAttendees } = request.body;

      const createEventUseCase = makeCreateEventUseCase();

      const { event } = await createEventUseCase.execute({
        title,
        details,
        maximumAttendees,
      });

      return reply.status(201).send({ eventId: event.id });
    }
  );
}
