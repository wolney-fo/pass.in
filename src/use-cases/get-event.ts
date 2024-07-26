import { EventsRepository } from "../repositories/events-repository";
import { ResourceNotFoundError } from "./errors/resource-not-found-error";

interface GetEventUseCaseRequest {
  eventId: string;
}

interface GetEventUseCaseResponse {
  event: {
    id: string;
    title: string;
    details: string | null;
    slug: string;
    maximumAttendees: number | null;
    attendeesAmount: number;
  };
}

export class GetEventUseCase {
  constructor(private eventsRepository: EventsRepository) {}

  async execute({
    eventId,
  }: GetEventUseCaseRequest): Promise<GetEventUseCaseResponse> {
    const event = await this.eventsRepository.findByIdGeneralData(eventId);

    if (!event) {
      throw new ResourceNotFoundError();
    }

    return {
      event: {
        id: event.id,
        title: event.title,
        details: event.details,
        slug: event.slug,
        maximumAttendees: event.maximumAttendees,
        attendeesAmount: event._count.attendees,
      },
    };
  }
}
