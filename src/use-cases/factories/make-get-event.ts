import { PrismaEventsRepository } from "../../repositories/prisma/prisma-events-repository";
import { GetEventUseCase } from "../get-event";

export function makeGetEventUseCase() {
  const eventsRepository = new PrismaEventsRepository();
  const getEventUseCase = new GetEventUseCase(eventsRepository);

  return getEventUseCase;
}
