import mentorImage from "@assets/Mask group (1)_1755025858652.png";
import gameElementsImage from "@assets/Frame 479_1755025307481.png";
import megaphoneImage from "@assets/Group 229_1755028130652.png";
import teamImage from "@assets/Frame 501_1755025340599.png";

import { motion } from "framer-motion";

const fadeIn = (delay = 0, fromX = 0, fromY = 30) => ({
    hidden: { opacity: 0, x: fromX, y: fromY },
    visible: {
        opacity: 1,
        x: 0,
        y: 0,
        transition: { type: "spring", stiffness: 70, damping: 14, delay },
    },
});

export default function EmotionalHeader() {
  return (
      <section className="mt-36">
          <div className="max-w-7xl mx-auto">
              {/* Заголовок */}
              <motion.h2
                  className="text-3xl text-left md:text-5xl font-bold lg:text-center mb-16 font-display"
                  variants={fadeIn(0)}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.2 }}
              >
                  Эмоциональный заголовок
              </motion.h2>

              {/* Первый блок - Наставники */}
              <motion.div
                  className="mb-8 bg-transperent border-solid border-2 border-b-4 border-[#B5F43F] rounded-[30px] p-8 flex flex-col lg:flex-row items-center gap-8 relative overflow-hidden"
                  variants={fadeIn(0.1, -40, 0)}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.2 }}
              >
                  <div className="flex-1 z-10">
                      <motion.h2
                          className="text-2xl font-semibold font-display mb-4 text-[36px]"
                          variants={fadeIn(0.2)}
                      >
                          Наставники, которые недавно были на твоём месте
                      </motion.h2>
                      <motion.p className="font-regular" variants={fadeIn(0.3)}>
                          У нас преподы — студенты топовых вузов, не «дядьки из прошлого». Они
                          знают, как сдать сейчас, объясняют простым языком и реально понимают,
                          через что ты проходишь.
                      </motion.p>
                  </div>
                  <motion.div
                      className="flex-1"
                      whileHover={{ scale: 1.05 }}
                      transition={{ type: "spring", stiffness: 100, damping: 12 }}
                  >
                      <img
                          src={mentorImage}
                          alt="Студент-наставник с книгами"
                          className="w-full h-auto mx-auto scale-[240%] ml-[35%]"
                      />
                  </motion.div>
              </motion.div>

              {/* Второй ряд */}
              <div className="grid lg:grid-cols-2 gap-8 mb-8">
                  {/* Учёба с элементами игры */}
                  <motion.div
                      className="bg-transperent border-solid border-2 border-b-4 border-[#B5F43F] rounded-[30px] relative overflow-hidden"
                      variants={fadeIn(0.1, -30, 0)}
                      initial="hidden"
                      whileInView="visible"
                      viewport={{ once: true, amount: 0.2 }}
                  >
                      <div className="p-8">
                          <motion.h3
                              className="font-semibold font-display mb-4 text-[26px]"
                              variants={fadeIn(0.2)}
                          >
                              Учёба с элементами игры
                          </motion.h3>
                          <motion.p className="font-semibold mb-4" variants={fadeIn(0.3)}>
                              Челленджи, рейтинги, уровни, аватары, награды — скучно не будет.
                          </motion.p>
                          <motion.p className="text-sm font-regular" variants={fadeIn(0.4)}>
                              Мы встроили геймификацию в учебный процесс, чтобы ты оставался в
                              тонусе и видел свой рост каждую неделю.
                          </motion.p>
                      </div>
                      <motion.div
                          className="mt-4"
                          whileHover={{ scale: 1.05 }}
                          transition={{ type: "spring", stiffness: 100, damping: 12 }}
                      >
                          <img
                              src={gameElementsImage}
                              alt="Игровые элементы с прогрессом"
                              className="w-full h-auto"
                          />
                      </motion.div>
                  </motion.div>

                  {/* Закрытое комьюнити */}
                  <motion.div
                      className="bg-transperent border-solid border-2 border-b-4 border-[#B5F43F] rounded-[30px] relative overflow-hidden"
                      variants={fadeIn(0.1, 30, 0)}
                      initial="hidden"
                      whileInView="visible"
                      viewport={{ once: true, amount: 0.2 }}
                  >
                      <div className="p-8">
                          <motion.h3
                              className="font-semibold font-display mb-4 text-[26px]"
                              variants={fadeIn(0.2)}
                          >
                              Закрытое комьюнити
                          </motion.h3>
                          <motion.p className="font-semibold mb-4" variants={fadeIn(0.3)}>
                              Ты попадаешь в тусовку сильных и целеустремлённых.
                          </motion.p>
                          <motion.p className="text-sm font-regular" variants={fadeIn(0.4)}>
                              Здесь поддерживают, прокачивают и делятся возможностями. Через год —
                              это уже не просто клуб выпускников, а твоя сеть полезных связей.
                          </motion.p>
                      </div>
                      <motion.div
                          className="mt-4"
                          whileHover={{ scale: 1.05 }}
                          transition={{ type: "spring", stiffness: 100, damping: 12 }}
                      >
                          <img
                              src={teamImage}
                              alt="Команда"
                              className="w-full h-auto"
                          />
                      </motion.div>
                  </motion.div>
              </div>

              {/* Третий блок - Навыки для жизни */}
              <motion.div
                  className="bg-transperent border-solid border-2 border-b-4 border-[#B5F43F] rounded-[30px] p-8 flex flex-col lg:flex-row items-center gap-8 relative overflow-hidden"
                  variants={fadeIn(0.1, 0, 30)}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.2 }}
              >
                  <motion.div
                      className="flex-1 hidden lg:block"
                      whileHover={{ scale: 1.05 }}
                      transition={{ type: "spring", stiffness: 100, damping: 12 }}
                  >
                      <img
                          src={megaphoneImage}
                          alt="Мегафон с задачами"
                          className="w-full h-auto scale-[250%] ml-[-50%]"
                      />
                  </motion.div>
                  <div className="flex-1 z-10">
                      <motion.h3
                          className="text-2xl font-semibold text-[36px] font-display mb-6"
                          variants={fadeIn(0.2)}
                      >
                          Навыки, которые пригодятся в жизни
                      </motion.h3>
                      <motion.p
                          className="mb-4 text-[24px] font-semibold"
                          variants={fadeIn(0.3)}
                      >
                          Здесь не только тесты и задачи.
                      </motion.p>
                      <motion.p className="mb-4 text-regular" variants={fadeIn(0.4)}>
                          Ты научишься:
                      </motion.p>
                      <motion.ul className="text-regular" variants={fadeIn(0.5)}>
                          <li>• Ты учишься красиво выступать перед людьми</li>
                          <li>• Презентовать свои идеи</li>
                          <li>• Мотивировать команду и учить с детьми работать</li>
                          <li>• А значит, быть лидером во всех сферах жизни</li>
                      </motion.ul>
                  </div>
                  <motion.div
                      className="flex-1 lg:hidden"
                      whileHover={{ scale: 1.05 }}
                      transition={{ type: "spring", stiffness: 100, damping: 12 }}
                  >
                      <img
                          src={megaphoneImage}
                          alt="Мегафон с задачами"
                          className="w-full h-auto scale-[250%] ml-[-50%]"
                      />
                  </motion.div>
              </motion.div>
          </div>
      </section>
  );
}
