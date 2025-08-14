import Header from "@/components/header";
import Hero from "@/components/hero";
import Features from "@/components/features";
import EmotionalHeader from "@/components/emotional-header";
import CoursesCatalog from "@/components/courses-catalog";
import Teachers from "@/components/teachers";
import Testimonials from "@/components/testimonials";
import ContactForm from "@/components/contact-form";
import Footer from "@/components/footer";
import YourChoise from "@/components/yourchoise.tsx";

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
        <Header />
        <div className="px-4">
            <Hero />
            <Features />
            <EmotionalHeader />
            <YourChoise />
            <CoursesCatalog />
            <Teachers />
        </div>
        <Footer />
    </div>
  );
}
