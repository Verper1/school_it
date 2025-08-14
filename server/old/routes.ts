import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertApplicationSchema } from "@shared/schema";
import { z } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  // Get all courses
  app.get("/api/courses", async (req, res) => {
    try {
      const courses = await storage.getCourses();
      res.json(courses);
    } catch (error) {
      console.error("Error fetching courses:", error);
      res.status(500).json({ message: "Failed to fetch courses" });
    }
  });

  // Get courses by category
  app.get("/api/courses/category/:category", async (req, res) => {
    try {
      const { category } = req.params;
      const courses = await storage.getCoursesByCategory(category);
      res.json(courses);
    } catch (error) {
      console.error("Error fetching courses by category:", error);
      res.status(500).json({ message: "Failed to fetch courses" });
    }
  });

  // Get courses by subject
  app.get("/api/courses/subject/:subject", async (req, res) => {
    try {
      const { subject } = req.params;
      const courses = await storage.getCoursesBySubject(subject);
      res.json(courses);
    } catch (error) {
      console.error("Error fetching courses by subject:", error);
      res.status(500).json({ message: "Failed to fetch courses" });
    }
  });

  // Get all teachers
  app.get("/api/teachers", async (req, res) => {
    try {
      const teachers = await storage.getTeachers();
      res.json(teachers);
    } catch (error) {
      console.error("Error fetching teachers:", error);
      res.status(500).json({ message: "Failed to fetch teachers" });
    }
  });

  // Create application
  app.post("/api/applications", async (req, res) => {
    try {
      const validatedData = insertApplicationSchema.parse(req.body);
      const application = await storage.createApplication(validatedData);
      res.status(201).json(application);
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ message: "Invalid data", errors: error.errors });
        return;
      }
      console.error("Error creating application:", error);
      res.status(500).json({ message: "Failed to create application" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
