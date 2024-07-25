import { Prisma, Event } from "@prisma/client";

export interface EventsRepository {
  findBySlug(slug: string): Promise<Event | null>;
  create(data: Prisma.EventCreateInput): Promise<Event>;
}
