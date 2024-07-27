import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { z } from "zod";
import { makeCheckInUseCase } from "../../use-cases/factories/make-check-in";

export async function checkInRoute(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().get(
    "/attendees/:attendeeId/check-in",
    {
      schema: {
        summary: "Create a check-in",
        tags: ["Check-ins"],
        params: z.object({
          attendeeId: z.coerce.number().int(),
        }),
        response: {
          201: z.null(),
        },
      },
    },
    async (request, reply) => {
      const { attendeeId } = request.params;

      const checkInUseCase = makeCheckInUseCase();

      await checkInUseCase.execute({
        attendeeId,
      });

      return reply.status(201).send();
    }
  );
}
