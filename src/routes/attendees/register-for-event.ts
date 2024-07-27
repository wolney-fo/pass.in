import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { z } from "zod";
import { makeRegisterForEventUseCase } from "../../use-cases/factories/make-register-for-event";

export async function registerForEventRoute(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().post(
    "/events/:eventId/attendees",
    {
      schema: {
        summary: "Get attendee for an event",
        tags: ["Attendees"],
        params: z.object({
          eventId: z.string().uuid(),
        }),
        body: z.object({
          name: z.string().min(4),
          email: z.string().email(),
        }),
        response: {
          201: z.object({
            attendeeId: z.number(),
          }),
        },
      },
    },
    async (request, reply) => {
      const { eventId } = request.params;
      const { name, email } = request.body;

      const registerForEventUseCase = makeRegisterForEventUseCase();

      const { attendee } = await registerForEventUseCase.execute({
        name,
        email,
        eventId,
      });

      return reply.status(201).send({ attendeeId: attendee.id });
    }
  );
}
