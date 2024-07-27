import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { z } from "zod";
import { makeGetEventAttendeesUseCase } from "../../use-cases/factories/make-get-event-attendees";

export async function getEventAttendeesRoute(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().get(
    "/events/:eventId/attendees",
    {
      schema: {
        params: z.object({
          eventId: z.string().uuid(),
        }),
        querystring: z.object({
          pageIndex: z.string().nullable().default("0").transform(Number),
        }),
        response: {},
      },
    },
    async (request, reply) => {
      const { eventId } = request.params;
      const { pageIndex } = request.query;

      const getEventAttendeesUseCase = makeGetEventAttendeesUseCase();

      const attendees = await getEventAttendeesUseCase.execute({
        eventId,
        pageIndex,
      });

      console.log(attendees);

      return reply.status(200).send({
        attendees: attendees.map((attendee) => {
          return {
            id: attendee.id,
            name: attendee.name,
            email: attendee.email,
            createdAt: attendee.createdAt,
            checkedInAt: attendee.checkIn?.createdAt,
          };
        }),
      });
    }
  );
}
