export interface AttendeeWithCheckIn {
  id: number;
  name: string;
  email: string;
  createdAt: Date;
  checkIn: {
    createdAt: Date | null;
  } | null;
}
