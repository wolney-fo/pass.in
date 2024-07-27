import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { z } from "zod";
import { makeGetEventUseCase } from "../../use-cases/factories/make-get-event";

export async function getEventRoute(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().get(
    "/events/:eventId",
    {
      schema: {
        summary: "Get an event",
        tags: ["Events"],
        params: z.object({
          eventId: z.string().uuid(),
        }),
        response: {
          200: z.object({
            event: z.object({
              id: z.string().uuid(),
              title: z.string(),
              details: z.string().nullable(),
              slug: z.string(),
              maximumAttendees: z.number().nullable(),
              attendeesAmount: z.number().int(),
            }),
          }),
        },
      },
    },
    async (request, reply) => {
      const { eventId } = request.params;

      const getEventUseCase = makeGetEventUseCase();

      const { event } = await getEventUseCase.execute({
        eventId,
      });

      return reply.status(200).send({ event });
    }
  );
}
