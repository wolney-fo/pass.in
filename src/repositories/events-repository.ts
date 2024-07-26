import { Prisma, Event } from "@prisma/client";

export interface EventsRepository {
  findById(id: string): Promise<Event | null>;
  findByIdGeneralData(
    id: string
  ): Promise<(Event & { _count: { attendees: number } }) | null>;
  findBySlug(slug: string): Promise<Event | null>;
  getMaximumAttendees(id: string): Promise<number | null>;
  create(data: Prisma.EventCreateInput): Promise<Event>;
}
