import { makeCreateEventUseCase } from "../../../use-cases/factories/make-create-event";
import { FastifyRequest, FastifyReply } from "fastify";
import z from "zod";

export async function create(request: FastifyRequest, reply: FastifyReply) {
  const createEventBodySchema = z.object({
    title: z.string().min(4),
    details: z.string().nullable(),
    maximumAttendees: z.coerce.number().int().positive().nullable(),
  });

  const { title, details, maximumAttendees } = createEventBodySchema.parse(
    request.body
  );

  const createEventUseCase = makeCreateEventUseCase();

  const eventId = await createEventUseCase.execute({
    title,
    details,
    maximumAttendees,
  });

  return reply.status(201).send({ eventId });
}
