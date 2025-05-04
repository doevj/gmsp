import { prisma } from "@/lib/prisma";
import { Course } from "@prisma/client";

export class CourseRepo {
  private prismaClient = prisma;

  public async getCourseById(id: string): Promise<Course | null> {
    return this.prismaClient.course.findUnique({
      where: { id },
    });
  }

  public async getCoursesByUserId(userId: string): Promise<Course[]> {
    return this.prismaClient.course.findMany({
      where: {
        User: {
          some: {
            id: userId,
          },
        },
      },
    });
  }

  public async createCourse(data: { name: string; price: number; duration: number }): Promise<Course> {
    return this.prismaClient.course.create({
      data: { name: data.name, price: data.price, duration: data.duration },
    });
  }

  public async removeCourse(id: string): Promise<void> {
    await this.prismaClient.course.delete({
      where: { id },
    }).catch((error) => {
      if (error.code === "P2025") {
        console.error("Course not found");
        throw new Error("Course not found");
      }
      throw error;
    });
  }
}