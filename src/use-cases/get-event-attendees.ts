import { AttendeesRepository } from "../repositories/attendees-repository";
import { ResourceNotFoundError } from "./errors/resource-not-found-error";
import { AttendeeWithCheckIn } from "../@types/attendees-with-check-in";

interface GetEventAttendeesUseCaseRequest {
  eventId: string;
  query?: string | null;
  pageIndex: number;
}

export class GetEventAttendeesUseCase {
  constructor(private attendeesRepository: AttendeesRepository) {}

  async execute({
    eventId,
    query,
    pageIndex,
  }: GetEventAttendeesUseCaseRequest): Promise<AttendeeWithCheckIn[]> {
    const attendees = await this.attendeesRepository.getAttendees(
      eventId,
      pageIndex,
      query ?? undefined
    );

    if (!attendees) {
      throw new ResourceNotFoundError();
    }

    return attendees;
  }
}
