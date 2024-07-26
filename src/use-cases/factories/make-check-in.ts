import { PrismaCheckInsRepository } from "../../repositories/prisma/prisma-check-ins-repository";
import { CheckInUseCase } from "../check-in";

export function makeCheckInUseCase() {
  const checkInsRepository = new PrismaCheckInsRepository();
  const checkInUseCase = new CheckInUseCase(checkInsRepository);

  return checkInUseCase;
}
