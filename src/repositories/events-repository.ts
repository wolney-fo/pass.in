import { Prisma, Event } from "@prisma/client";

export interface EventsRepository {
  create(data: Prisma.EventCreateInput): Promise<Event>;
}
