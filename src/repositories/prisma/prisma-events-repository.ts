import { Prisma } from "@prisma/client";
import { prisma } from "../../lib/prisma";
import { EventsRepository } from "../events-repository";

export class PrismaEventsRepository implements EventsRepository {
  async findBySlug(slug: string) {
    const event = await prisma.event.findUnique({
      where: {
        slug,
      },
    });

    return event;
  }

  async getMaximumAttendees(id: string) {
    const event = await prisma.event.findUnique({
      select: {
        maximumAttendees: true,
      },
      where: {
        id,
      },
    });

    if (!event) {
      return null;
    }

    return event?.maximumAttendees;
  }

  async create(data: Prisma.EventCreateInput) {
    const event = await prisma.event.create({
      data,
    });

    return event;
  }
}
