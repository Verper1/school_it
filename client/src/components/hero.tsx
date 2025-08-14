import { useState } from "react";
import { Button } from "@/components/ui/button";
import ApplicationModal from "@/components/application-modal";
import heroImage from "@assets/Group 140_1755012473337.png";
import { motion } from "framer-motion";

export default function Hero() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const scrollToCourses = () => {
    const element = document.getElementById("courses");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

    const fadeInUp = (delay = 0, fromY = 40) => ({
        hidden: { opacity: 0, y: fromY },
        visible: {
            opacity: 1,
            y: 0,
            transition: { type: "spring", stiffness: 70, damping: 14, delay },
        },
    });

  return (
    <>
        <section className="relative mt-10 bg-transparent overflow-hidden">
            <div className="container bg-[#FCFCFF] mx-auto rounded-3xl border-solid border-2 border-b-4 border-[#0080FF]">
                <div className="grid lg:grid-cols-2 gap-0 items-center">
                    {/* Left side - Content */}
                    <motion.div
                        className="max-w-xl h-full px-8 py-8 flex justify-between flex-col"
                        variants={fadeInUp(0, 40)}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.2 }}
                    >
                        <div>
                            <motion.h1
                                className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight font-display"
                                variants={fadeInUp(0.1, 20)}
                            >
                                Здесь учатся
                                <br />
                                выигрывать
                            </motion.h1>

                            <motion.p
                                className="text-xl text-[#1E1E24] mb-8 font-semibold"
                                variants={fadeInUp(0.2, 20)}
                            >
                                Школа, где не просто готовятся <br /> к ЕГЭ, а играют в долгую
                            </motion.p>
                        </div>

                        <motion.div
                            className="flex flex-col sm:flex-row gap-4"
                            variants={fadeInUp(0.3, 20)}
                        >
                            <Button onClick={() => setIsModalOpen(true)} size="lg">
                                Оставить заявку
                            </Button>
                            <Button variant="outline" onClick={scrollToCourses} size="lg">
                                Выбрать курс
                            </Button>
                        </motion.div>
                    </motion.div>

                    {/* Right side - Illustration */}
                    <motion.div
                        className="relative flex justify-end lg:pr-0 pr-0 border-primary lg:border-0 border-t-2 border-solid overflow-hidden rounded-3xl"
                        initial={{ opacity: 0, x: 25 }}
                        whileInView={{
                            opacity: 1,
                            x: 0,
                            transition: { type: "spring", stiffness: 70, damping: 14, delay: 0.4 },
                        }}
                        viewport={{ once: true, amount: 0.2 }}
                    >
                        <img
                            src={heroImage}
                            alt="Студент с ноутбуком и кубком - образовательная платформа S2S"
                            className="w-full h-auto max-w-lg ml-auto overflow-hidden"
                        />
                    </motion.div>
                </div>
            </div>
        </section>
        <ApplicationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
}
