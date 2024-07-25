import { EventsRepository } from "../repositories/events-repository";
import { generateSlug } from "../utils/generate-slug";
import { DuplicatedResourceError } from "./errors/duplicated-resource-error";

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
    const slug = generateSlug(title);

    const eventWithSameSlug = this.eventsRepository.findBySlug(slug);

    if (eventWithSameSlug !== null) {
      throw new DuplicatedResourceError();
    }

    const event = await this.eventsRepository.create({
      title,
      details,
      slug,
      maximumAttendees,
    });

    return { eventId: event.id };
  }
}
