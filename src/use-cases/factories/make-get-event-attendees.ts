import { PrismaAttendeesRepository } from "../../repositories/prisma/prisma-attendees-repository";
import { GetEventAttendeesUseCase } from "../get-event-attendees";

export function makeGetEventAttendeesUseCase() {
  const attendeesRepository = new PrismaAttendeesRepository();
  const getEventAttendeesUseCase = new GetEventAttendeesUseCase(
    attendeesRepository
  );

  return getEventAttendeesUseCase;
}
