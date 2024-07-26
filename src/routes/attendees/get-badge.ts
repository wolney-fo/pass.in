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
      },
    },
    async (request, reply) => {
      const { attendeeId } = request.params;

      const getAttendeeBadgeUseCase = makeGetAttendeeBadgeUseCase();

      const attendee = await getAttendeeBadgeUseCase.execute({
        attendeeId,
      });

      return reply.status(200).send({ attendee });
    }
  );
}
