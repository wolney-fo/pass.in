import { AttendeesRepository } from "../repositories/attendees-repository";
import { ResourceNotFoundError } from "./errors/resource-not-found-error";

interface GetAttendeeBadgeUseCaseRequest {
  attendeeId: number;
}

interface GetAttendeeBadgeUseCaseResponse {
  name: string;
  email: string;
  eventTitle: string;
}

export class GetAttendeeBadgeUseCase {
  constructor(private attendeesRepository: AttendeesRepository) {}

  async execute({
    attendeeId,
  }: GetAttendeeBadgeUseCaseRequest): Promise<GetAttendeeBadgeUseCaseResponse> {
    const attendee = await this.attendeesRepository.findByIdBadgeData(
      attendeeId
    );

    if (!attendee) {
      throw new ResourceNotFoundError();
    }

    return {
      name: attendee.name,
      email: attendee.email,
      eventTitle: attendee.eventTitle,
    };
  }
}
