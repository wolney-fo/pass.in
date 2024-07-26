import { PrismaAttendeesRepository } from "../../repositories/prisma/prisma-attendees-repository";
import { RegisterForEventUseCase } from "../register-for-event";

export function makeRegisterForEventUseCase() {
  const attendeesRepository = new PrismaAttendeesRepository();
  const registerForEventUseCase = new RegisterForEventUseCase(
    attendeesRepository
  );

  return registerForEventUseCase;
}
