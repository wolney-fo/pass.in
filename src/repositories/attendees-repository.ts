import { Prisma, Attendee } from "@prisma/client";

export interface AttendeesRepository {
  findById(id: number): Promise<Attendee | null>;
  findByIdBadgeData(
    id: number
  ): Promise<{ name: string; email: string, eventTitle: string } | null>;
  isRegistered(email: string, eventId: string): Promise<boolean>;
  amountOfAttendeesForEvent(eventId: string): Promise<number>;
  create(data: Prisma.AttendeeUncheckedCreateInput): Promise<Attendee>;
}
