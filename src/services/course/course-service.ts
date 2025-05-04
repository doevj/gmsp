import { Course } from "@prisma/client";

export class CourseService {
  constructor(private readonly courseRepository: CourseRepository) {
    this.courseRepository = courseRepository;
  }

  public async getCourseById(id: string): Promise<Course | null> {
    const course = await this.courseRepository.findById(id);
    if (!course) {
      throw new Error(`Course with id ${id} not found`);
    }
    return course;
  }

  public async getUserCourses(userId: string): Promise<Course[]> {
    const courses = await this.courseRepository.findByUserId(userId);
    if (!courses || courses.length === 0) {
      throw new Error(`No courses found for user with id ${userId}`);
    }
    return courses;
  }
}

interface CourseRepository {
  findById(id: string): Promise<Course | null>;
  findByUserId(userId: string): Promise<Course[]>;
}