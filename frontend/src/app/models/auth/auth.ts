import { User } from "../user";

export class AuthResponse {
  jwt!: string;
  user!: User;
}

