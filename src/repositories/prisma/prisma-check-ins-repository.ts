import { Prisma } from "@prisma/client";
import { CheckInsRepository } from "../check-ins-repository";
import { prisma } from "../../lib/prisma";

export class PrismaCheckInsRepository implements CheckInsRepository {
  async hasCheckedIn(attendeeId: number) {
    const attendeeCheckIn = await prisma.checkIn.findUnique({
      where: {
        attendeeId,
      },
    });

    return attendeeCheckIn !== null;
  }

  async create(data: Prisma.CheckInUncheckedCreateInput) {
    const checkIn = await prisma.checkIn.create({
      data,
    });

    return checkIn;
  }
}
