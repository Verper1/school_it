import { sql } from "drizzle-orm";
import { pgTable, text, varchar, integer, boolean } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const courses = pgTable("courses", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  title: text("title").notNull(),
  description: text("description").notNull(),
  subject: text("subject").notNull(),
  category: text("category").notNull(), // EGE, OGE, Olympiads, etc.
  duration: text("duration").notNull(),
  lessons: integer("lessons").notNull(),
  grades: text("grades").notNull(),
  features: text("features").array().notNull(),
  originalPrice: integer("original_price").notNull(),
  currentPrice: integer("current_price").notNull(),
  isPopular: boolean("is_popular").default(false),
});

export const teachers = pgTable("teachers", {
    id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
    name: text("name").notNull(),
    subject: text("subject").notNull(),
    quote: text("quote"),
    imageUrl: text("image_url"),
});

export type TeacherAchievement = {
    icon: string;
    text: string;
};

// Добавим новую таблицу для достижений преподавателей
export const teacherAchievements = pgTable("teacher_achievements", {
    id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
    teacherId: varchar("teacher_id").notNull().references(() => teachers.id),
    icon: text("icon").notNull(),
    text: text("text").notNull(),
});

export const applications = pgTable("applications", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  phone: text("phone").notNull(),
  email: text("email").notNull(),
  agreedToTerms: boolean("agreed_to_terms").notNull(),
  courseId: varchar("course_id"),
  createdAt: text("created_at").notNull().default(sql`CURRENT_TIMESTAMP`),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export const insertCourseSchema = createInsertSchema(courses).omit({
  id: true,
});

export const insertTeacherSchema = createInsertSchema(teachers).omit({
  id: true,
});

export const insertApplicationSchema = createInsertSchema(applications).omit({
  id: true,
  createdAt: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;
export type Course = typeof courses.$inferSelect;
export type InsertCourse = z.infer<typeof insertCourseSchema>;
export type Teacher = typeof teachers.$inferSelect & {
    achievements: TeacherAchievement[];
};
export type InsertTeacher = z.infer<typeof insertTeacherSchema>;
export type Application = typeof applications.$inferSelect;
export type InsertApplication = z.infer<typeof insertApplicationSchema>;
