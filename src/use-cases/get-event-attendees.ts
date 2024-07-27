import { AttendeesRepository } from "../repositories/attendees-repository";
import { ResourceNotFoundError } from "./errors/resource-not-found-error";
import { AttendeeWithCheckIn } from "../@types/attendees-with-check-in";

interface GetEventAttendeesUseCaseRequest {
  eventId: string;
  pageIndex: number;
}

export class GetEventAttendeesUseCase {
  constructor(private attendeesRepository: AttendeesRepository) {}

  async execute({
    eventId,
    pageIndex,
  }: GetEventAttendeesUseCaseRequest): Promise<AttendeeWithCheckIn[]> {
    const attendees = await this.attendeesRepository.getAttendees(
      eventId,
      pageIndex
    );

    if (!attendees) {
      throw new ResourceNotFoundError();
    }

    console.log(attendees);

    return attendees;
  }
}
