import { Prisma, Attendee } from "@prisma/client";
import { AttendeeWithCheckIn } from "../@types/attendees-with-check-in";

export interface AttendeesRepository {
  findById(id: number): Promise<Attendee | null>;
  findByIdBadgeData(
    id: number
  ): Promise<{ name: string; email: string; eventTitle: string } | null>;
  isRegistered(email: string, eventId: string): Promise<boolean>;
  amountOfAttendeesForEvent(eventId: string): Promise<number>;
  getAttendees(
    eventId: string,
    pageIndex: number
  ): Promise<AttendeeWithCheckIn[] | null>;
  create(data: Prisma.AttendeeUncheckedCreateInput): Promise<Attendee>;
}
