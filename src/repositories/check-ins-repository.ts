import { Prisma, CheckIn } from "@prisma/client";

export interface CheckInsRepository {
  hasCheckedIn(attendeeId: number): Promise<boolean>;
  create(data: Prisma.CheckInUncheckedCreateInput): Promise<CheckIn>;
}
