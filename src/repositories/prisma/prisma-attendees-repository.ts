import { Prisma } from "@prisma/client";
import { prisma } from "../../lib/prisma";
import { AttendeesRepository } from "../attendees-repository";

export class PrismaAttendeesRepository implements AttendeesRepository {
  async create(data: Prisma.AttendeeUncheckedCreateInput) {
    const attendee = await prisma.attendee.create({
      data,
    });

    return attendee;
  }
}
