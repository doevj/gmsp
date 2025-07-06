import { prisma } from "@/lib/prisma";
import { User } from "@prisma/client";

export class UserRepo {
  private prismaClient = prisma;

  public async getUserById(id: string): Promise<User | null> {
    return this.prismaClient.user.findUnique({
      where: { id },
    });
  }

  public async getUserByEmail(email: string): Promise<User | null> {
    return this.prismaClient.user.findUnique({
      where: { email },
    });
  }

  public async createUser(data: { email: string; password: string; name: string }): Promise<User> {
    return this.prismaClient
      .user
      .create({ data: { name: data.name, email: data.email, password: data.password } })
      .catch((error) => {
        if (error.code === "P2002") {
          console.error("User already exists");
          throw new Error("User already exists");
        }
        throw error;
      });
  }

  public async removeUser(id: string): Promise<void> {
    await this.prismaClient.user.delete({
      where: { id },
    }).catch((error) => {
      if (error.code === "P2025") {
        console.error("User not found");
        throw new Error("User not found");
      }
      throw error;
    });
  }
}