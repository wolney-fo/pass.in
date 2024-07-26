import { PrismaAttendeesRepository } from "../../repositories/prisma/prisma-attendees-repository";
import { GetAttendeeBadgeUseCase } from "../get-attendee-badge";

export function makeGetAttendeeBadgeUseCase() {
  const attendeesRepository = new PrismaAttendeesRepository()
  const getAttendeeBadgeUseCase = new GetAttendeeBadgeUseCase(attendeesRepository);

  return getAttendeeBadgeUseCase;
}
