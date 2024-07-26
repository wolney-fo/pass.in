import { Prisma } from "@prisma/client";
import { prisma } from "../../lib/prisma";
import { AttendeesRepository } from "../attendees-repository";

export class PrismaAttendeesRepository implements AttendeesRepository {
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

  async create(data: Prisma.AttendeeUncheckedCreateInput) {
    const attendee = await prisma.attendee.create({
      data,
    });

    return attendee;
  }
}
