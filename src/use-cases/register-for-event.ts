import { Attendee } from "@prisma/client";
import { AttendeesRepository } from "../repositories/attendees-repository";
import { EventsRepository } from "../repositories/events-repository";
import { DuplicatedResourceError } from "./errors/duplicated-resource-error";
import { MaximumAvailableResourcesBeenReached } from "./errors/maximum-available-resources-been-reached";

interface RegisterForEventUseCaseRequest {
  name: string;
  email: string;
  eventId: string;
}

interface RegisterForEventUseCaseResponse {
  attendee: Attendee;
}

export class RegisterForEventUseCase {
  constructor(
    private attendeesRepository: AttendeesRepository,
    private eventsRepository: EventsRepository
  ) {}

  async execute({
    name,
    email,
    eventId,
  }: RegisterForEventUseCaseRequest): Promise<RegisterForEventUseCaseResponse> {
    const isRegistered = await this.attendeesRepository.isRegistered(
      email,
      eventId
    );

    if (isRegistered) {
      throw new DuplicatedResourceError();
    }

    const [amountOfAttendeesForEvent, eventMaximumAttendees] =
      await Promise.all([
        this.attendeesRepository.amountOfAttendeesForEvent(eventId),
        this.eventsRepository.getMaximumAttendees(eventId),
      ]);

    if (
      eventMaximumAttendees &&
      amountOfAttendeesForEvent >= eventMaximumAttendees
    ) {
      throw new MaximumAvailableResourcesBeenReached();
    }

    const attendee = await this.attendeesRepository.create({
      name,
      email,
      eventId,
    });

    return { attendee };
  }
}
