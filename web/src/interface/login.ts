import { UserRole } from "@/const";

export interface LoginResponse {
  username: string;
  role: UserRole;
}
