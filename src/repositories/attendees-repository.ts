import { Prisma, Attendee } from "@prisma/client";

export interface AttendeesRepository {
  isRegistered(email: string, eventId: string): Promise<boolean>;
  create(data: Prisma.AttendeeUncheckedCreateInput): Promise<Attendee>;
}
