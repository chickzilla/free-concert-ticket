export interface FindAllConcertResponse {
  id: string;
  user_id: string;
  concert_id: string;
}

export interface CountActionResponse {
  reserveCount: number;
  cancelCount: number;
}
