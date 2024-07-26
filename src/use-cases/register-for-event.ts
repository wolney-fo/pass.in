import { AttendeesRepository } from "../repositories/attendees-repository";
import { Attendee } from "@prisma/client";

interface RegisterForEventUseCaseRequest {
  name: string;
  email: string;
  eventId: string;
}

interface RegisterForEventUseCaseResponse {
  attendee: Attendee;
}

export class RegisterForEventUseCase {
  constructor(private attendeesRepository: AttendeesRepository) {}

  async execute({
    name,
    email,
    eventId,
  }: RegisterForEventUseCaseRequest): Promise<RegisterForEventUseCaseResponse> {
    const attendee = await this.attendeesRepository.create({
      name,
      email,
      eventId,
    });

    return { attendee };
  }
}
