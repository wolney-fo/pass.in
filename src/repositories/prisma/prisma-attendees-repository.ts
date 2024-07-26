import { Prisma } from "@prisma/client";
import { prisma } from "../../lib/prisma";
import { AttendeesRepository } from "../attendees-repository";

export class PrismaAttendeesRepository implements AttendeesRepository {
  async findById(id: number) {
    const attendee = await prisma.attendee.findUnique({
      where: {
        id,
      },
    });

    return attendee;
  }

  async findByIdBadgeData(id: number) {
    const attendee = await prisma.attendee.findUnique({
      select: {
        name: true,
        email: true,
        event: {
          select: {
            title: true,
          },
        },
      },
      where: {
        id,
      },
    });

    if (!attendee) {
      return null;
    }

    return {
      name: attendee.name,
      email: attendee.email,
      eventTitle: attendee.event.title,
    };
  }

  async isRegistered(email: string, eventId: string) {
    const attendeeFromEmail = await prisma.attendee.findUnique({
      where: {
        eventId_email: {
          email,
          eventId,
        },
      },
    });

    return attendeeFromEmail !== null;
  }

  async amountOfAttendeesForEvent(eventId: string) {
    const amountOfAttendeesForEvent = await prisma.attendee.count({
      where: {
        eventId,
      },
    });

    return amountOfAttendeesForEvent;
  }

  async create(data: Prisma.AttendeeUncheckedCreateInput) {
    const attendee = await prisma.attendee.create({
      data,
    });

    return attendee;
  }
}
