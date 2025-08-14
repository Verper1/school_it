import universityLogos from "@assets/Group 142 (1)_1755024712505.png";
import { motion } from "framer-motion";

const fadeInUp = (delay = 0, from = 40) => ({
    hidden: { opacity: 0, y: from },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            type: "spring",
            stiffness: 70,
            damping: 14,
            delay,
        },
    },
});

export default function Features() {
  return (
      <>
          {/* Statistics Section */}
          <section className="bg-white mt-14 max-w-7xl mx-auto">
              {/* Заголовок */}
              <motion.div
                  className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6"
                  variants={fadeInUp(0, 30)}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.2 }}
              >
                  <motion.h1
                      className="font-display md:text-3xl font-bold text-[36px]"
                      variants={fadeInUp(0.1, 20)}
                  >
                      Для тех, кто требует большего <br /> от учёбы, от себя, от мира
                  </motion.h1>

                  <motion.p
                      className="text-[#212225] font-regular text-sm mt-2 md:mt-0 max-w-xl"
                      variants={fadeInUp(0.2, 20)}
                  >
                      Это не просто курсы. <br /> Это путь, где ты растёшь и выходишь на новый
                      уровень
                  </motion.p>
              </motion.div>

              {/* Карточки */}
              <div className="grid grid-cols-12 gap-4 mb-6">
                  {[
                      "Прокачиваем soft skills: как выступать, как мыслить, как общаться",
                      "Готовим к ЕГЭ на 80+ баллов",
                      "Помогаем выигрывать олимпиады",
                      "Помогаем понять не только «что сдавать», но и зачем",
                  ].map((text, i) => (
                      <motion.div
                          key={i}
                          className={`bg-[#FCFCFF] border-solid border border-b-4 border-[#0080FF] text-[20px] font-semibold rounded-[30px] p-6 lg:min-h-[150px] flex items-${
                              i % 2 === 0 ? "start" : "end"
                          } ${
                              i === 0
                                  ? "col-span-12 md:col-span-8"
                                  : i === 1
                                      ? "col-span-12 md:col-span-4"
                                      : i === 2
                                          ? "col-span-12 md:col-span-4"
                                          : "col-span-12 md:col-span-8"
                          }`}
                          initial={{
                              opacity: 0,
                              x: i % 2 === 0 ? -30 : 30,
                              y: 20,
                          }}
                          whileInView={{
                              opacity: 1,
                              x: 0,
                              y: 0,
                              transition: {
                                  type: "spring",
                                  stiffness: 70,
                                  damping: 12,
                                  delay: 0.15 * i,
                              },
                          }}
                          viewport={{ once: true, amount: 0.2 }}
                      >
                          {text}
                      </motion.div>
                  ))}
              </div>

              {/* Нижний блок */}
              <motion.div
                  className="bg-[#0080FF] min-h-[400px] lg:min-h-[150px] flex text-start text-white p-6 items-start lg:items-end justify-between rounded-[30px] relative overflow-hidden"
                  initial={{ opacity: 0, scale: 0.95, y: 30 }}
                  whileInView={{
                      opacity: 1,
                      scale: 1,
                      y: 0,
                      transition: { type: "spring", stiffness: 60, damping: 14, delay: 0.2 },
                  }}
                  viewport={{ once: true, amount: 0.2 }}
              >
                  <div className="relative z-10">
                      <p className="font-medium text-lg">
                          Настраиваем на поступление в топ:
                          <br />
                          МГУ, ВШЭ, МФТИ, СПбГУ — ты выбираешь
                      </p>
                  </div>
                  <motion.div
                      className="absolute right-0 lg:top-0 bottom-0 h-full"
                      initial={{ opacity: 0, x: 50 }}
                      whileInView={{
                          opacity: 1,
                          x: 0,
                          transition: { type: "spring", stiffness: 65, damping: 12, delay: 0.4 },
                      }}
                      viewport={{ once: true, amount: 0.2 }}
                  >
                      <img
                          src={universityLogos}
                          alt="Логотипы университетов"
                          className="h-1/2 lg:h-full w-auto object-cover object-bottom lg:object-right"
                      />
                  </motion.div>
              </motion.div>
          </section>
      </>
  );
}
