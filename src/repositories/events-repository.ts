import { Prisma, Event } from "@prisma/client";

export interface EventsRepository {
  findBySlug(slug: string): Promise<Event | null>;
  getMaximumAttendees(id: string): Promise<number | null>;
  create(data: Prisma.EventCreateInput): Promise<Event>;
}
