import { ReservationAction } from "@/const";

export interface Histories {
  id: string;
  date: string;
  username: string;
  concert_name: string;
  action: ReservationAction;
}
