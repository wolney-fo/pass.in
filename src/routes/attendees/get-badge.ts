import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { z } from "zod";
import { makeGetAttendeeBadgeUseCase } from "../../use-cases/factories/make-get-attendee-badge";

export async function getAttendeeBadgeRoute(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().get(
    "/attendees/:attendeeId/badge",
    {
      schema: {
        params: z.object({
          attendeeId: z.coerce.number().int(),
        }),
        response: {
          200: z.object({
            badge: z.object({
              name: z.string(),
              email: z.string().email(),
              eventTitle: z.string(),
              checkInURL: z.string().url(),
            }),
          }),
        },
      },
    },
    async (request, reply) => {
      const { attendeeId } = request.params;

      const baseUrl = `${request.protocol}://${request.hostname}`;

      const getAttendeeBadgeUseCase = makeGetAttendeeBadgeUseCase();

      const attendee = await getAttendeeBadgeUseCase.execute({
        attendeeId,
        baseUrl,
      });

      return reply.status(200).send({ badge: attendee });
    }
  );
}
