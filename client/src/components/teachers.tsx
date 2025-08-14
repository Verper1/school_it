import { useQuery } from "@tanstack/react-query";
import { Card, CardContent } from "@/components/ui/card";
import type { Teacher } from "@shared/schema";

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import cupImg from "@assets/cup.png";
import hundredImg from "@assets/100.png";
import medalImg from "@assets/medal.png";
import studentImg from "@assets/student.png";
import universityImg from "@assets/university.png";

const iconMap: Record<string, string> = {
    student: studentImg,
    medal: medalImg,
    cup: cupImg,
    hundred: hundredImg,
    university: universityImg
};

import artemVotyakovImg from "@assets/teachers/Артем Вотяков.png";
import vanyaTarasenkoImg from "@assets/teachers/Ваня Тарасенко.png";
import vovaKrechikImg from "@assets/teachers/Вова Крещик.png";
import lenyaOzogovImg from "@assets/teachers/Лёня Ожегов.png";
import leshaIvanovImg from "@assets/teachers/Лёша Иванов.png";
import maxChernousImg from "@assets/teachers/Макс Черноус.png";
import mishaSolodilovImg from "@assets/teachers/Миша Солодилов.png";
import nastyaKushlyanskayaImg from "@assets/teachers/Настя Кушлянская.png";
import olyaKarasevaImg from "@assets/teachers/Оля Карасева.png";
import sashaZizchenkoImg from "@assets/teachers/Саша Жижченко.png";
import sashaPoletaevImg from "@assets/teachers/Саша Полетаев.png";
import sashaTrophimenkoImg from "@assets/teachers/Саша Трофименко.png";
import svyatoslavMorgunovImg from "@assets/teachers/Святослав Моргунов.png";
import serezhaBogdanovImg from "@assets/teachers/Сережа Богданов.png";
import serezhaKushlyanskyImg from "@assets/teachers/Сережа Кушлянский.png";
import fedyaDoroninImg from "@assets/teachers/Федя Доронин.png";
import uraGrishinImg from "@assets/teachers/Юра Гришин.png";

import {Accordion, AccordionItem} from "@/components/ui/accordion.tsx";

import bg0 from "@assets/bg_0.png";
import {Button} from "@/components/ui/button.tsx";

const teachersAvatarsMap: Record<string, string> = {
    "Артем Вотяков": artemVotyakovImg,
    "Ваня Тарасенко": vanyaTarasenkoImg,
    "Вова Крещик": vovaKrechikImg,
    "Лёня Ожегов": lenyaOzogovImg,
    "Лёша Иванов": leshaIvanovImg,
    "Макс Черноус": maxChernousImg,
    "Миша Солодилов": mishaSolodilovImg,
    "Настя Кушлянская": nastyaKushlyanskayaImg,
    "Оля Карасева": olyaKarasevaImg,
    "Саша Жижченко": sashaZizchenkoImg,
    "Саша Полетаев": sashaPoletaevImg,
    "Саша Трофименко": sashaTrophimenkoImg,
    "Святослав Моргунов": svyatoslavMorgunovImg,
    "Сережа Богданов": serezhaBogdanovImg,
    "Сережа Кушлянский": serezhaKushlyanskyImg,
    "Федя Доронин": fedyaDoroninImg,
    "Юра Гришин": uraGrishinImg
};

// Стили для слайдера
const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    responsive: [
        {
            breakpoint: 1024,
            settings: {
                slidesToShow: 3,
                slidesToScroll: 1,
            },
        },
        {
            breakpoint: 600,
            settings: {
                slidesToShow: 2,
                slidesToScroll: 1,
            },
        },
        {
            breakpoint: 480,
            settings: {
                slidesToShow: 1,
                slidesToScroll: 1,
            },
        },
    ],
};

const accordionData: AccordionItem[] = [
    {
        id: '1',
        title: 'Как проходит подготовка к ЕГЭ?',
        content: 'Наши консультанты помогут составить индивидуальный план подготовки на основе ваших целей и текущего уровня знаний. Мы используем проверенные методики и современные образовательные технологии для максимально эффективного обучения.',
        icon: <svg width="36" height="29" viewBox="0 0 36 29" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M3.6 29C2.61 29 1.7625 28.6451 1.0575 27.9352C0.3525 27.2253 0 26.3719 0 25.375V3.625C0 2.62812 0.3525 1.77474 1.0575 1.06484C1.7625 0.354948 2.61 0 3.6 0H32.4C33.39 0 34.2375 0.354948 34.9425 1.06484C35.6475 1.77474 36 2.62812 36 3.625V25.375C36 26.3719 35.6475 27.2253 34.9425 27.9352C34.2375 28.6451 33.39 29 32.4 29H3.6ZM3.6 25.375H16.2V3.625H3.6V25.375ZM19.8 25.375H32.4V3.625H19.8V25.375ZM5.4 21.75H14.4V18.125H5.4V21.75ZM5.4 16.3125H14.4V12.6875H5.4V16.3125ZM5.4 10.875H14.4V7.25H5.4V10.875ZM21.6 21.75H30.6V18.125H21.6V21.75ZM21.6 16.3125H30.6V12.6875H21.6V16.3125ZM21.6 10.875H30.6V7.25H21.6V10.875Z" fill="#0080FF" fill-opacity="0.65"/>
        </svg>
    },
    {
        id: '2',
        title: 'Какие предметы можно изучать?',
        content: 'Мы предлагаем подготовку по всем основным предметам ЕГЭ: математика, русский язык, физика, химия, биология, история, обществознание, английский язык, литература, география и информатика.',
        icon: <svg width="36" height="29" viewBox="0 0 36 29" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M3.6 29C2.61 29 1.7625 28.6451 1.0575 27.9352C0.3525 27.2253 0 26.3719 0 25.375V3.625C0 2.62812 0.3525 1.77474 1.0575 1.06484C1.7625 0.354948 2.61 0 3.6 0H32.4C33.39 0 34.2375 0.354948 34.9425 1.06484C35.6475 1.77474 36 2.62812 36 3.625V25.375C36 26.3719 35.6475 27.2253 34.9425 27.9352C34.2375 28.6451 33.39 29 32.4 29H3.6ZM3.6 25.375H16.2V3.625H3.6V25.375ZM19.8 25.375H32.4V3.625H19.8V25.375ZM5.4 21.75H14.4V18.125H5.4V21.75ZM5.4 16.3125H14.4V12.6875H5.4V16.3125ZM5.4 10.875H14.4V7.25H5.4V10.875ZM21.6 21.75H30.6V18.125H21.6V21.75ZM21.6 16.3125H30.6V12.6875H21.6V16.3125ZM21.6 10.875H30.6V7.25H21.6V10.875Z" fill="#0080FF" fill-opacity="0.65"/>
        </svg>
    },
    {
        id: '3',
        title: 'Сколько длится курс подготовки?',
        content: 'Длительность курса зависит от ваших целей и текущего уровня подготовки. Стандартный курс длится 8-9 месяцев, но мы также предлагаем интенсивные программы и долгосрочную подготовку.',
        icon: <svg width="36" height="29" viewBox="0 0 36 29" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M3.6 29C2.61 29 1.7625 28.6451 1.0575 27.9352C0.3525 27.2253 0 26.3719 0 25.375V3.625C0 2.62812 0.3525 1.77474 1.0575 1.06484C1.7625 0.354948 2.61 0 3.6 0H32.4C33.39 0 34.2375 0.354948 34.9425 1.06484C35.6475 1.77474 36 2.62812 36 3.625V25.375C36 26.3719 35.6475 27.2253 34.9425 27.9352C34.2375 28.6451 33.39 29 32.4 29H3.6ZM3.6 25.375H16.2V3.625H3.6V25.375ZM19.8 25.375H32.4V3.625H19.8V25.375ZM5.4 21.75H14.4V18.125H5.4V21.75ZM5.4 16.3125H14.4V12.6875H5.4V16.3125ZM5.4 10.875H14.4V7.25H5.4V10.875ZM21.6 21.75H30.6V18.125H21.6V21.75ZM21.6 16.3125H30.6V12.6875H21.6V16.3125ZM21.6 10.875H30.6V7.25H21.6V10.875Z" fill="#0080FF" fill-opacity="0.65"/>
        </svg>
    },
    {
        id: '4',
        title: 'Какой формат обучения доступен?',
        content: 'Мы предлагаем различные форматы: индивидуальные занятия, групповые курсы, онлайн-обучение и комбинированные программы. Вы можете выбрать наиболее подходящий для вас вариант.',
        icon: <svg width="36" height="29" viewBox="0 0 36 29" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M3.6 29C2.61 29 1.7625 28.6451 1.0575 27.9352C0.3525 27.2253 0 26.3719 0 25.375V3.625C0 2.62812 0.3525 1.77474 1.0575 1.06484C1.7625 0.354948 2.61 0 3.6 0H32.4C33.39 0 34.2375 0.354948 34.9425 1.06484C35.6475 1.77474 36 2.62812 36 3.625V25.375C36 26.3719 35.6475 27.2253 34.9425 27.9352C34.2375 28.6451 33.39 29 32.4 29H3.6ZM3.6 25.375H16.2V3.625H3.6V25.375ZM19.8 25.375H32.4V3.625H19.8V25.375ZM5.4 21.75H14.4V18.125H5.4V21.75ZM5.4 16.3125H14.4V12.6875H5.4V16.3125ZM5.4 10.875H14.4V7.25H5.4V10.875ZM21.6 21.75H30.6V18.125H21.6V21.75ZM21.6 16.3125H30.6V12.6875H21.6V16.3125ZM21.6 10.875H30.6V7.25H21.6V10.875Z" fill="#0080FF" fill-opacity="0.65"/>
        </svg>
    }
];

export default function Teachers() {
  const { data: teachers = [], isLoading } = useQuery<Teacher[]>({
    queryKey: ['/api/teachers'],
  });

  if (isLoading) {
    return (
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center">Загрузка преподавателей...</div>
        </div>
      </section>
    );
  }

  return (
    <section id="teachers" className="mt-10">
        <style>{`
        .teachers-slider .slick-slide > div {
          margin: 0 2px;
        }
        .teachers-slider .slick-list {
          margin: 0 -2px;
        }
        .teachers-slider .slick-track {
          padding: 10px 0;
        }
        .teachers-slider .slick-slide {
          transition: transform 0.3s ease;
        }
        .teachers-slider .slick-slide:hover {
          transform: translateY(-5px);
        }
        .teachers-slider .slick-dots li button:before {
          font-size: 10px;
        }

        /* Изменения для точек слайдера */
        .teachers-slider .slick-dots {
          margin: 0px 0px -5px;
        }
        .teachers-slider .slick-dots li {
          margin: 0 4px;
        }
        .teachers-slider .slick-dots li button:before {
          color: #ccc;
        }
        .teachers-slider .slick-dots li.slick-active button:before {
          color: #007bff;
        }
      `}</style>
      <div className="container mx-auto">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 font-display">
              Наши преподаватели
            </h2>
            <p className="text-lg font-normal">
              Опытные наставники и выпускники ведущих вузов России
            </p>
          </div>

          {/* Слайдер с преподавателями */}
          <Slider className="w-full teachers-slider" {...settings}>
            {teachers.map((teacher) => (
              <div key={teacher.id} className="px-2">
                <Card className="border-primary border-solid border-2 border-b-4 rounded-[40px] p-6 text-left h-full">
                  <img
                    src={teachersAvatarsMap[teacher.name]}
                    alt={teacher.name}
                    className="w-[124px] h-[124px] rounded-2xl mx-auto mb-4"
                  />
                  <h3 className="font-normal mb-1">
                    {teacher.name}
                  </h3>
                  <p className="text-primary font-semibold text-sm">
                    {teacher.subject}
                  </p>
                  <div className="text-xs space-y-1 my-4">
                    {teacher.achievements.map((achievement, index) => (
                        <div className="flex items-gap gap-2 items-center" key={index}>
                            <div className="bg-[#F4F4F4] rounded-xl max-w-[40px] border-2 border-solid border-[#F8F8F8]">
                                <img className="w-full" src={iconMap[achievement.icon]} alt={achievement.text} />
                            </div>
                            <p>{achievement.text}</p>
                        </div>
                    ))}
                  </div>
                    <p className="font-regular text-primary">
                        {teacher.quote}
                    </p>
                </Card>
              </div>
            ))}
          </Slider>

          {/* FAQ Section */}
          <div className="text-center mt-36">
            <h3 className="text-[36px] font-display font-semibold mb-8">
              Часто задаваемые вопросы
            </h3>
            
            <div className="max-w-4xl mx-auto w-full space-y-4">
                <Accordion items={accordionData} allowMultiple={false} />
            </div>

            <div className="mt-8 max-w-4xl w-full mx-auto">
                <Card className="relative overflow-hidden rounded-[40px] mt-10 w-full max-w-7xl">
                    {/* Фоновое изображение */}
                    <div
                        className="absolute inset-0 bg-cover bg-center"
                        style={{ backgroundImage: `url(${bg0})` }}
                    />
                    <CardContent className="relative z-10 text-center p-8">
                        <h2 className="text-3xl md:text-4xl font-display font-normal mb-4">
                            На нашли ответ на свой вопрос?
                        </h2>
                        <p className="text-normal mb-8 max-w-2xl mx-auto">
                            Наши консультанты готовы помочь вам с любыми вопросами о подготовке к ЕГЭ
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Button
                                className="bg-primary text-white hover:bg-blue-600"
                                size="lg"
                            >
                                Задать вопрос
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}