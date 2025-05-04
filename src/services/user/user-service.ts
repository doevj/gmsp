import { User } from "@prisma/client";

export class UserService {
  constructor(private readonly userRepository: UserRepository, private readonly authCredentials: AuthCredentials) {
    this.userRepository = userRepository;
    this.authCredentials = authCredentials;
  }

  public async getCurrentUser(): Promise<User | null> {
    if (!this.authCredentials.authenticated) {
      throw new Error("User is not authenticated");
    }
    const user = await this.userRepository.findById(this.authCredentials.id);
    if (!user) {
      throw new Error(`User with id ${this.authCredentials.id} not found`);
    }
    return user;
  }

  public async confirmUser(): Promise<void> {
    if (!this.authCredentials.authenticated) {
      throw new Error("User is not authenticated");
    }
    await this.userRepository.confirmUser(this.authCredentials.id);
  }
}

interface UserRepository {
  findById(id: string): Promise<User | null>;
  findByEmail(email: string): Promise<User | null>;
  createUser(userData: UserData): Promise<User>;
  updateUser(id: string, userData: Partial<UserData>): Promise<User>;
  deleteUser(id: string): Promise<void>;
  confirmUser(id: string): Promise<User>;
}

interface AuthCredentials {
  email: string;
  id: string;
  authenticated: boolean;
  name?: string;
}

type UserData = Pick<User, 'email' | 'password' | 'name'>