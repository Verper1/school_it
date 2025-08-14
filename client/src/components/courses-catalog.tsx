import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Search, Clock, BookOpen, Users } from "lucide-react";
import ApplicationModal from "@/components/application-modal";
import type { Course } from "@shared/schema";

import astrImage from "@assets/astr.png";
import mathImage from "@assets/math.png";
import pcImage from "@assets/pc.png";
import reactImage from "@assets/react.png";

import bg0 from "@assets/bg_0.png";

const categories = [
  { name: "Все курсы", key: "all" },
  { name: "ЕГЭ", key: "ЕГЭ" },
  { name: "ОГЭ", key: "ОГЭ" },
  { name: "Олимпиады", key: "Олимпиады" },
  { name: "Основы", key: "Основы" },
  { name: "Углубление", key: "Углубление" }
];

const subjects = [
    { name: "Астроно..", key: "astr" },
    { name: "Информ..", key: "pc" },
    { name: "Математ..", key: "math" },
    { name: "Физика", key: "react" }
];

export default function CoursesCatalog() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [showAllCourses, setShowAllCourses] = useState(false); // Новое состояние для показа всех курсов


  const { data: courses = [], isLoading } = useQuery<Course[]>({
    queryKey: ['/api/courses'],
  });

    const [selectedSubjects, setSelectedSubjects] = useState<string[]>([]);

    const handleSubjectToggle = (subjectKey: string) => {
        setSelectedSubjects(prev =>
            prev.includes(subjectKey)
                ? prev.filter(key => key !== subjectKey)
                : [...prev, subjectKey]
        );
    };

    const filteredCourses = courses.filter(course => {
        const matchesCategory = activeCategory === "all" || course.category === activeCategory;
        const matchesSearch = !searchQuery ||
            course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            course.subject.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesSubject = selectedSubjects.length === 0 || selectedSubjects.includes(course.subject);

        return matchesCategory && matchesSearch && matchesSubject;
    });

    const visibleCourses = showAllCourses ? filteredCourses : filteredCourses.slice(0, 3); // Ограничиваем количество курсов

    const getCategoryCounts = () => {
        const counts: Record<string, number> = { all: courses.length };
        courses.forEach(course => {
            counts[course.category] = (counts[course.category] || 0) + 1;
        });
        return counts;
    };

    const categoryCounts = getCategoryCounts();

    const handleSelectCourse = (course: Course) => {
        setSelectedCourse(course);
        setIsModalOpen(true);
    };

    if (isLoading) {
        return (
            <section>
                <div className="container mx-auto px-4">
                    <div className="text-center">Загрузка курсов...</div>
                </div>
            </section>
        );
    }

  return (
    <>
      <section id="courses">
        <div className="container mx-auto px-4 mt-36">
          <div className="max-w-full mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 font-display">
                Выберите предметы для подготовки
              </h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                Комплексная подготовка к ЕГЭ и ОГЭ по всем предметам с индивидуальным<br />
                подходом и гарантией результата
              </p>
            </div>

            {/* Search and Filters */}
            <div className="mb-8 w-full">
              <div className="flex flex-col gap-4 items-center justify-between mb-6">
                <div className="relative w-full md:max-w-96">
                  <Input
                    type="text"
                    placeholder="Поиск курсов"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-12"
                  />
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                </div>
              </div>

              {/* Filter Tabs */}
              <div className="flex flex-wrap gap-3 mb-8 justify-start sm:justify-center">
                {categories.map((category) => (
                  <button
                    key={category.key}
                    onClick={() => setActiveCategory(category.key)}
                    className={`px-6 py-3 text-center rounded-xl font-medium transition-all ${
                      activeCategory === category.key
                        ? 'bg-primary text-white shadow-lg'
                        : 'bg-white text-gray-700 hover:bg-[#EFF6FF] hover:border-primary hover:text-primary border border-gray-200'
                    }`}
                  >
                    {category.name}
                      <span className={`ml-2 inline-flex items-center justify-center w-6 h-6 rounded-full text-xs ${
                          activeCategory === category.key
                        ? 'bg-white text-primary'
                        : 'text-[#575757] bg-black/5'
                      }`}>
                        {categoryCounts[category.key]}
                      </span>
                  </button>
                ))}
              </div>

              {/* Subject Tags */}
                <div className="flex flex-wrap gap-4 mb-8 justify-center">
                    {subjects.map((subject) => {
                        const isSelected = selectedSubjects.includes(subject.name);
                        return (
                            <div
                                key={subject.key}
                                onClick={() => handleSubjectToggle(subject.name)}
                                className={`relative flex flex-col w-[68px] items-center text-center rounded-xl hover:scale-[105%] transition-all duration-200 cursor-pointer ${
                                    isSelected ? 'transform scale-105' : ''
                                }`}
                            >
                                {/* Кнопка отмены выбора */}
                                {isSelected && (
                                    <button
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            handleSubjectToggle(subject.name);
                                        }}
                                        className="absolute -top-2 -right-2 w-6 h-6 bg-blue-500 hover:bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold z-10 shadow-md transition-colors"
                                        aria-label="Отменить выбор"
                                    >
                                        −
                                    </button>
                                )}

                                <div className="w-16 h-16 mb-3 flex items-center justify-center">
                                    <div className={`transition-all duration-200 rounded-lg flex items-center justify-center ${
                                        isSelected
                                            ? 'bg-blue-50 border-2 border-blue-500 shadow-lg'
                                            : 'bg-[#FAFAFA] border border-b-[3px] hover:border-[#8B8B8B] border-solid border-[#E4E4E4] hover:shadow-sm'
                                    }`}>
                                        {subject.key === 'astr' && (
                                            <img src={astrImage} alt={subject.name} className={isSelected ? 'opacity-90' : ''} />
                                        )}
                                        {subject.key === 'pc' && (
                                            <img src={pcImage} alt={subject.name} className={isSelected ? 'opacity-90' : ''} />
                                        )}
                                        {subject.key === 'math' && (
                                            <img src={mathImage} alt={subject.name} className={isSelected ? 'opacity-90' : ''} />
                                        )}
                                        {subject.key === 'react' && (
                                            <img src={reactImage} alt={subject.name} className={isSelected ? 'opacity-90' : ''} />
                                        )}
                                    </div>
                                </div>

                                <span className={`text-sm font-regular leading-tight transition-colors ${
                                    isSelected ? 'text-blue-600 font-medium' : 'text-gray-700'
                                }`}>
                                  {subject.name}
                                </span>
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* Courses Grid */}
            <div className="mb-8">
              <p className="text-gray-600 mb-6">
                Найдено курсов: <span className="font-medium">{filteredCourses.length}</span>
              </p>

              {visibleCourses.length === 0 ? (
                <div className="text-center py-12">
                  <p className="text-gray-500 text-lg">Курсы не найдены</p>
                  <p className="text-gray-400">Попробуйте изменить критерии поиска</p>
                </div>
              ) : (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {visibleCourses.map((course) => (
                      <Card key={course.id} className="rounded-[40px] border-2 border-b-4 border-solid border-primary transition-all duration-300 transform hover:-translate-y-1">
                          <CardContent className="p-6 flex flex-col h-full">
                              <div className="flex justify-between items-start mb-2">
                                  <h3 className="font-display text-[24px] leading-tight font-[400]">
                                      {course.title}
                                  </h3>
                              </div>

                              <p className="text-[18px] font-regular mb-4">
                                  {course.description}
                              </p>

                              <div className="flex flex-wrap items-center gap-4 text-sm bg-[#F9F9F9] rounded-lg p-1 px-2 text-[#575757] mb-4">
                                  <div className="flex items-center gap-1">
                                      <Clock className="h-4 w-4" />
                                      <span>{course.duration}</span>
                                  </div>
                                  <div className="flex items-center gap-1">
                                      <BookOpen className="h-4 w-4" />
                                      <span>{course.lessons} урока</span>
                                  </div>
                                  <div className="flex items-center gap-1">
                                      <Users className="h-4 w-4" />
                                      <span>{course.grades}</span>
                                  </div>
                              </div>

                              <div className="mb-4 flex-grow">
                                  <p className="text-[18px] font-regular mb-2">Что включено:</p>
                                  <ul className="text-sm space-y-1">
                                      {course.features.slice(0, 4).map((feature, index) => (
                                          <li className="flex flex-wrap items-center gap-2" key={index}><svg width="13" height="14" viewBox="0 0 13 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                              <path d="M5.59 9.99L10.1725 5.4075L9.2625 4.4975L5.59 8.17L3.7375 6.3175L2.8275 7.2275L5.59 9.99ZM6.5 13.5C5.60083 13.5 4.75583 13.3294 3.965 12.9881C3.17417 12.6469 2.48625 12.1838 1.90125 11.5988C1.31625 11.0138 0.853125 10.3258 0.511875 9.535C0.170625 8.74417 0 7.89917 0 7C0 6.10083 0.170625 5.25583 0.511875 4.465C0.853125 3.67417 1.31625 2.98625 1.90125 2.40125C2.48625 1.81625 3.17417 1.35313 3.965 1.01187C4.75583 0.670625 5.60083 0.5 6.5 0.5C7.39917 0.5 8.24417 0.670625 9.035 1.01187C9.82583 1.35313 10.5138 1.81625 11.0988 2.40125C11.6838 2.98625 12.1469 3.67417 12.4881 4.465C12.8294 5.25583 13 6.10083 13 7C13 7.89917 12.8294 8.74417 12.4881 9.535C12.1469 10.3258 11.6838 11.0138 11.0988 11.5988C10.5138 12.1838 9.82583 12.6469 9.035 12.9881C8.24417 13.3294 7.39917 13.5 6.5 13.5ZM6.5 12.2C7.95167 12.2 9.18125 11.6962 10.1888 10.6888C11.1962 9.68125 11.7 8.45167 11.7 7C11.7 5.54833 11.1962 4.31875 10.1888 3.31125C9.18125 2.30375 7.95167 1.8 6.5 1.8C5.04833 1.8 3.81875 2.30375 2.81125 3.31125C1.80375 4.31875 1.3 5.54833 1.3 7C1.3 8.45167 1.80375 9.68125 2.81125 10.6888C3.81875 11.6962 5.04833 12.2 6.5 12.2Z" fill="#55A8FB"/>
                                          </svg> {feature}</li>
                                      ))}
                                  </ul>
                              </div>

                              <div className="flex flex-col md:flex-row items-center justify-between mb-4 gap-4">
                                  <div className="bg-[#F9F9F9] rounded-lg p-2 flex flex-col items-center w-full">
                                      <span className="text-[#878787] text-sm mb-2">помесячно</span>
                                      <h2 className="text-xl font-display font-normal">от {course.currentPrice.toLocaleString()} Р</h2>
                                  </div>
                                  <div className="bg-[#EFF6FF] w-full border border-[#B9DCFF] rounded-lg p-2 flex flex-col items-center">
                                      <span className="text-[#878787] text-sm mb-2">полностью</span>
                                      <h2 className="text-xl font-display font-normal">от {course.originalPrice.toLocaleString()} Р</h2>
                                  </div>
                              </div>

                              <div className="justify-end mt-auto">
                                  <Button
                                      variant="outline"
                                      onClick={() => handleSelectCourse(course)}
                                      className="w-full"
                                  >
                                      Выбрать тариф
                                  </Button>
                                  <Button
                                      variant="link"
                                      className="w-full font-normal"
                                  >
                                      Подробнее о курсе
                                  </Button>
                              </div>
                          </CardContent>
                      </Card>
                  ))}
                </div>
              )}
            </div>

              {filteredCourses.length > 3 && !showAllCourses && (
                  <div className="text-center mt-6">
                      <Button
                          variant="link"
                          onClick={() => setShowAllCourses(true)}
                          size="lg"
                          className="font-normal"
                      >
                          Показать все {filteredCourses.length} курсов <svg width="14" height="8" viewBox="0 0 14 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M7 4.97297L12.3667 -7.13953e-08L14 1.51351L7 8L-6.61578e-08 1.51351L1.63333 -5.40564e-07L7 4.97297Z" fill="#0080FF"/>
                      </svg>
                      </Button>
                  </div>
              )}
          </div>
        </div>
      </section>

        {/* Consultation CTA */}
        <section className="flex flex-col items-center w-full">
            <Card className="relative overflow-hidden rounded-[40px] mt-10 w-full max-w-7xl">
                {/* Фоновое изображение */}
                <div
                    className="absolute inset-0 bg-cover bg-center"
                    style={{ backgroundImage: `url(${bg0})` }}
                />
                <CardContent className="relative z-10 text-center p-8">
                    <h2 className="text-3xl md:text-4xl font-display font-normal mb-4">
                        Не можете определиться с предметами?
                    </h2>
                    <p className="text-normal mb-8 max-w-2xl mx-auto">
                        Наши консультанты помогут составить индивидуальный план подготовки на основе ваших целей и текущего уровня знаний
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Button
                            onClick={() => setIsModalOpen(true)}
                            className="bg-primary text-white hover:bg-blue-600"
                            size="lg"
                        >
                            Получить консультацию
                        </Button>
                        <Button
                            variant="outline"
                            onClick={() => setIsModalOpen(true)}
                            className="bg-white"
                            size="lg"
                        >
                            Получить консультацию 2
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </section>

      <ApplicationModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedCourse(null);
        }}
        courseId={selectedCourse?.id}
      />
    </>
  );
}
