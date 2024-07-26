import { CheckIn } from "@prisma/client";
import { CheckInsRepository } from "../repositories/check-ins-repository";
import { MaximumAvailableResourcesBeenReached } from "./errors/maximum-available-resources-been-reached";

interface CheckInUseCaseRequest {
  attendeeId: number;
}

interface CheckInUseCaseResponse {
  checkIn: CheckIn;
}

export class CheckInUseCase {
  constructor(private checkInsRepository: CheckInsRepository) {}

  async execute({
    attendeeId,
  }: CheckInUseCaseRequest): Promise<CheckInUseCaseResponse> {
    const hasCheckedIn = await this.checkInsRepository.hasCheckedIn(attendeeId);

    if (hasCheckedIn) {
      throw new MaximumAvailableResourcesBeenReached();
    }

    const checkIn = await this.checkInsRepository.create({
      attendeeId,
    });

    return { checkIn };
  }
}
