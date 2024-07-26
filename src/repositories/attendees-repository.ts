import { Prisma, Attendee } from "@prisma/client";

export interface AttendeesRepository {
  isRegistered(email: string, eventId: string): Promise<boolean>;
  amountOfAttendeesForEvent(eventId: string): Promise<number>;
  create(data: Prisma.AttendeeUncheckedCreateInput): Promise<Attendee>;
}
