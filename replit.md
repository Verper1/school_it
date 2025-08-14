# Overview

This is a modern educational platform called "S2S" (Student to Success) that provides online courses for Russian students preparing for standardized exams (ЕГЭ, ОГЭ) and academic competitions (олимпиады). The platform features a course catalog with filtering capabilities, teacher profiles, and an application system for student enrollment.

The application is built as a full-stack web application with a React frontend using modern UI components and an Express.js backend with PostgreSQL database integration.

# User Preferences

Preferred communication style: Simple, everyday language.

# System Architecture

## Frontend Architecture
- **Framework**: React 18 with TypeScript for type safety
- **Routing**: Wouter for lightweight client-side routing
- **State Management**: TanStack Query (React Query) for server state management and caching
- **UI Library**: Radix UI primitives with shadcn/ui components for consistent design
- **Styling**: Tailwind CSS with CSS custom properties for theming
- **Forms**: React Hook Form with Zod validation for type-safe form handling
- **Build Tool**: Vite for fast development and optimized production builds

## Backend Architecture
- **Runtime**: Node.js with Express.js framework
- **Language**: TypeScript with ES modules
- **API Design**: RESTful API with JSON responses
- **Middleware**: Custom logging middleware for API request tracking
- **Error Handling**: Centralized error handling with proper HTTP status codes
- **Development**: Hot module replacement with Vite integration

## Data Storage
- **Database**: PostgreSQL with Neon Database serverless connection
- **ORM**: Drizzle ORM for type-safe database operations
- **Schema**: Structured tables for users, courses, teachers, and applications
- **Validation**: Drizzle-Zod integration for runtime schema validation
- **Migrations**: Drizzle Kit for database schema management

## Authentication & Authorization
- **Session Management**: Express sessions with PostgreSQL store (connect-pg-simple)
- **Security**: Password hashing and secure session handling
- **User Model**: Simple username/password authentication system

## Component Architecture
- **Design System**: Modular component library with consistent theming
- **Accessibility**: ARIA-compliant components using Radix UI primitives
- **Responsive Design**: Mobile-first approach with responsive breakpoints
- **Reusability**: Shared component patterns across the application

# External Dependencies

## Core Runtime Dependencies
- **@neondatabase/serverless**: Serverless PostgreSQL database connection
- **drizzle-orm**: Type-safe ORM for database operations
- **express**: Web application framework for Node.js
- **react**: Frontend UI library
- **@tanstack/react-query**: Server state management

## UI & Styling Dependencies
- **@radix-ui/***: Headless UI component primitives for accessibility
- **tailwindcss**: Utility-first CSS framework
- **class-variance-authority**: Type-safe variant API for component styling
- **lucide-react**: Icon library for consistent iconography

## Form & Validation Dependencies
- **react-hook-form**: Performance-focused form library
- **@hookform/resolvers**: Validation resolvers for React Hook Form
- **zod**: TypeScript-first schema validation library
- **drizzle-zod**: Integration between Drizzle ORM and Zod validation

## Development Dependencies
- **vite**: Fast build tool and development server
- **typescript**: Static type checking
- **tsx**: TypeScript execution for Node.js
- **esbuild**: Fast JavaScript bundler for production builds

## Third-party Integrations
- **Replit**: Development environment integration with cartographer plugin
- **Google Fonts**: External font loading for typography
- **Unsplash**: Placeholder image service for teacher profiles