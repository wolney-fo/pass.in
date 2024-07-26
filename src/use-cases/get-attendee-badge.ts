import { AttendeesRepository } from "../repositories/attendees-repository";
import { ResourceNotFoundError } from "./errors/resource-not-found-error";

interface GetAttendeeBadgeUseCaseRequest {
  attendeeId: number;
  baseUrl: string;
}

interface GetAttendeeBadgeUseCaseResponse {
  name: string;
  email: string;
  eventTitle: string;
  checkInURL: string;
}

export class GetAttendeeBadgeUseCase {
  constructor(private attendeesRepository: AttendeesRepository) {}

  async execute({
    attendeeId,
    baseUrl,
  }: GetAttendeeBadgeUseCaseRequest): Promise<GetAttendeeBadgeUseCaseResponse> {
    const attendee = await this.attendeesRepository.findByIdBadgeData(
      attendeeId
    );

    if (!attendee) {
      throw new ResourceNotFoundError();
    }

    const checkInURL = new URL(`/attendees/${attendeeId}/check-in`, baseUrl);

    return {
      name: attendee.name,
      email: attendee.email,
      eventTitle: attendee.eventTitle,
      checkInURL: checkInURL.toString(),
    };
  }
}
