import { PrismaEventsRepository } from "../../repositories/prisma/prisma-events-repository";
import { CreateEventUseCase } from "../create-event";

export function makeCreateEventUseCase() {
  const eventsRepository = new PrismaEventsRepository();
  const createEventUseCase = new CreateEventUseCase(eventsRepository);

  return createEventUseCase;
}
