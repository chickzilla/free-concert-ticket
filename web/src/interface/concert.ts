export interface allTotalOfSeatResponse {
  total_of_seat: number;
}

export interface Concert {
  id: string;
  name: string;
  description: string;
  total_of_reservation: number;
  total_of_seat: number;
  created_at: Date;
  isReserve?: boolean;
}
