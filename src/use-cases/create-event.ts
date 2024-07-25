import { EventsRepository } from "../repositories/events-repository";

interface CreateEventUseCaseRequest {
  title: string;
  details: string | null;
  maximumAttendees: number | null;
}

interface CreateEventUseCaseResponse {
  eventId: string;
}

export class CreateEventUseCase {
  constructor(private eventsRepository: EventsRepository) {}

  async execute({
    title,
    details,
    maximumAttendees,
  }: CreateEventUseCaseRequest): Promise<CreateEventUseCaseResponse> {
    const event = await this.eventsRepository.create({
      title,
      details,
      slug: new Date().toISOString(), // TODO: Generate slug
      maximumAttendees,
    });

    return { eventId: event.id };
  }
}
