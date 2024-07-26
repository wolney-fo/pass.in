import { PrismaAttendeesRepository } from "../../repositories/prisma/prisma-attendees-repository";
import { PrismaEventsRepository } from "../../repositories/prisma/prisma-events-repository";
import { RegisterForEventUseCase } from "../register-for-event";

export function makeRegisterForEventUseCase() {
  const attendeesRepository = new PrismaAttendeesRepository();
  const eventsRepository = new PrismaEventsRepository();
  const registerForEventUseCase = new RegisterForEventUseCase(
    attendeesRepository,
    eventsRepository
  );

  return registerForEventUseCase;
}
