import { Prisma, Attendee } from "@prisma/client";

export interface AttendeesRepository {
  create(data: Prisma.AttendeeUncheckedCreateInput): Promise<Attendee>;
}
