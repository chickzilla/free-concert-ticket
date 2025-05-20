import { ReservationAction } from 'src/const';

export interface viewHistoriesResponseItem {
  id: string;
  concert_name: string;
  username: string;
  action: ReservationAction;
  date: Date;
}
