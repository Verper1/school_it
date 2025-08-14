import { type User, type InsertUser, type Course, type InsertCourse, type Teacher, type InsertTeacher, type Application, type InsertApplication } from "@shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  getCourses(): Promise<Course[]>;
  getCourse(id: string): Promise<Course | undefined>;
  getCoursesByCategory(category: string): Promise<Course[]>;
  getCoursesBySubject(subject: string): Promise<Course[]>;
  createCourse(course: InsertCourse): Promise<Course>;
  getTeachers(): Promise<Teacher[]>;
  getTeacher(id: string): Promise<Teacher | undefined>;
  createTeacher(teacher: InsertTeacher): Promise<Teacher>;
  createApplication(application: InsertApplication): Promise<Application>;
  getApplications(): Promise<Application[]>;
}

export class MemStorage implements IStorage {
  private users: Map<string, User>;
  private courses: Map<string, Course>;
  private teachers: Map<string, Teacher>;
  private applications: Map<string, Application>;

  constructor() {
    this.users = new Map();
    this.courses = new Map();
    this.teachers = new Map();
    this.applications = new Map();
    
    this.initializeData();
  }

  private initializeData() {
    // Initialize courses
    const sampleCourses: Course[] = [
      {
        id: randomUUID(),
        title: "Подготовка к перечневым олимпиадам по физике",
        description: "Углубленная подготовка к профильной математике для технических специальностей",
        subject: "Физика",
        category: "Олимпиады",
        duration: "9 месяцев",
        lessons: 72,
        grades: "9–11 класс",
        features: [
          "Разбор всех заданий",
          "Персональная обратная связь",
          "Домашние задания",
          "Пробные экзамены",
          "Индивидуальные консультации"
        ],
        originalPrice: 14000,
        currentPrice: 3499,
        isPopular: true
      },
      {
        id: randomUUID(),
        title: "ЕГЭ по физике",
        description: "Углубленная подготовка к профильной математике для технических специальностей",
        subject: "Физика",
        category: "ЕГЭ",
        duration: "9 месяцев",
        lessons: 72,
        grades: "9–11 класс",
        features: [
          "Разбор всех заданий",
          "Персональная обратная связь",
          "Домашние задания",
          "Пробные экзамены"
        ],
        originalPrice: 14000,
        currentPrice: 3499,
        isPopular: false
      },
      {
        id: randomUUID(),
        title: "ОГЭ по физике",
        description: "Углубленная подготовка к профильной математике для технических специальностей",
        subject: "Физика",
        category: "ОГЭ",
        duration: "9 месяцев",
        lessons: 72,
        grades: "9–11 класс",
        features: [
          "Разбор всех заданий",
          "Персональная обратная связь",
          "Домашние задания",
          "Пробные экзамены"
        ],
        originalPrice: 14000,
        currentPrice: 3499,
        isPopular: false
      },
      {
        id: randomUUID(),
        title: "ЕГЭ по математике",
        description: "Подготовка к профильной математике с акцентом на сложные задания",
        subject: "Математика",
        category: "ЕГЭ",
        duration: "10 месяцев",
        lessons: 80,
        grades: "10–11 класс",
        features: [
          "Разбор всех заданий",
          "Персональная обратная связь",
          "Домашние задания",
          "Пробные экзамены"
        ],
        originalPrice: 15000,
        currentPrice: 4999,
        isPopular: true
      },
      {
        id: randomUUID(),
        title: "Основы информатики",
        description: "Базовый курс по информатике для начинающих",
        subject: "Информатика",
        category: "Основы",
        duration: "6 месяцев",
        lessons: 48,
        grades: "8–10 класс",
        features: [
          "Основы программирования",
          "Алгоритмы и структуры данных",
          "Практические задания"
        ],
        originalPrice: 12000,
        currentPrice: 2999,
        isPopular: false
      },
      {
        id: randomUUID(),
        title: "Углубленная астрономия",
        description: "Продвинутый курс астрономии для олимпиад",
        subject: "Астрономия",
        category: "Углубление",
        duration: "8 месяцев",
        lessons: 64,
        grades: "9–11 класс",
        features: [
          "Теоретическая астрономия",
          "Практические наблюдения",
          "Подготовка к олимпиадам"
        ],
        originalPrice: 13000,
        currentPrice: 3799,
        isPopular: false
      },
      {
        id: randomUUID(),
        title: "ОГЭ по математике",
        description: "Подготовка к ОГЭ по математике с гарантией результата",
        subject: "Математика",
        category: "ОГЭ",
        duration: "8 месяцев",
        lessons: 64,
        grades: "8–9 класс",
        features: [
          "Разбор всех заданий",
          "Персональная обратная связь",
          "Домашние задания"
        ],
        originalPrice: 12000,
        currentPrice: 2999,
        isPopular: false
      }
    ];

    sampleCourses.forEach(course => {
      this.courses.set(course.id, course);
    });

    // Initialize teachers
    const sampleTeachers: Teacher[] = [
        {
            id: randomUUID(),
            name: "Лёша Иванов",
            subject: "Физика",
            achievements: [
                { icon: "university", text: "Студент ЛФИ МФТИ" },
                { icon: "medal", text: "Обладатель нескольких дипломов олимпиад 1-2 уровня" },
                { icon: "hundred", text: "Получил 100 баллов на ЕГЭ по физике" }
            ],
            quote: "Результаты приходят в то место, которое готово их принять.",
            imageUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=300"
        },
        {
            id: randomUUID(),
            name: "Саша Полетаев",
            subject: "Физика",
            achievements: [
                { icon: "university", text: "Закончил Физтех-лицей имени Капицы" },
                { icon: "medal", text: "Призер перечневых олимпиад по физике, математике и астрономии" },
                { icon: "hundred", text: "Обучается в МГУ на физическом факультете" }
            ],
            quote: "Я умею видеть прошлое.",
            imageUrl: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=300"
        },
        {
            id: randomUUID(),
            name: "Макс Черноус",
            subject: "Физика",
            achievements: [
                { icon: "university", text: "Cтудент ЛФИ, выпускник Физтех-лицея имени Капицы" },
                { icon: "medal", text: "В школе был всероссником и членом сборной России по физике" },
                { icon: "hundred", text: "Тренер нынешних и будущих кандидатов в сборную Московской области и России" }
            ],
            quote: "Люблю соревнования и готовлю к ним других!",
            imageUrl: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=300"
        },
        {
            id: randomUUID(),
            name: "Миша Солодилов",
            subject: "Физика",
            achievements: [
                { icon: "medal", text: "Призер регионального этапа ВсОШ по математике и физике" },
                { icon: "medal", text: "Призёр перечневых олимпиад" },
                { icon: "hundred", text: "Написал ЕГЭ по математике на 100 баллов" }
            ],
            quote: "Понимание — не в заучивании, а в умении задавать себе правильные вопросы.",
            imageUrl: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=300"
        },
        {
            id: randomUUID(),
            name: "Настя Кушлянская",
            subject: "Математика",
            achievements: [
                { icon: "university", text: "Выпускница Физтех-лицея имени Капицы" },
                { icon: "cup", text: "Многократный призёр и победитель регионального этапа ВсОШ по математике" },
                { icon: "student", text: "Студентка ВШЭ факультета «Бизнес-информатика»" }
            ],
            quote: "Результаты приходят в то место, которое готово их принять.",
            imageUrl: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=300"
        },
        {
            id: randomUUID(),
            name: "Сережа Кушлянский",
            subject: "Математика",
            achievements: [
                { icon: "university", text: "Ученик Физтех-лицея имени Капицы" },
                { icon: "medal", text: "Призер регионального этапа ВсОШ по физике и математике" },
                { icon: "student", text: "Принимал участие в образовательных сменах по математике в ОЦ «Сириус»" }
            ],
            quote: "Результаты приходят в то место, которое готово их принять.",
            imageUrl: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=300"
        },
        {
            id: randomUUID(),
            name: "Саша Трофименко",
            subject: "Математика",
            achievements: [
                { icon: "university", text: "Студентка отделения теоретической и прикладной лингвистики МГУ" },
                { icon: "student", text: "Выпускница ФМЛ №31 г. Челябинска, ЕГЭ по математике на 97 баллов" },
                { icon: "medal", text: "Трёхкратный призёр ВсОШ по русскому языку, призёр Традиционной олимпиады по лингвистике" }
            ],
            quote: "Результаты приходят в то место, которое готово их принять.",
            imageUrl: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=300"
        },
        {
            id: randomUUID(),
            name: "Вова Крещик",
            subject: "Математика",
            achievements: [
                { icon: "university", text: "Студент ФПМИ МФТИ" },
                { icon: "cup", text: "Призёр ВсОШ по математике и победитель по экономике" },
                { icon: "student", text: "Преподает олимпиадную математику в Физтех-лицее и кружках ФПМИ. " }
            ],
            quote: "Результаты приходят в то место, которое готово их принять.",
            imageUrl: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=300"
        },
        {
            id: randomUUID(),
            name: "Сережа Богданов",
            subject: "Математика",
            achievements: [
                { icon: "university", text: "Студент физического факультета МГУ" },
                { icon: "medal", text: "Набрал 100 баллов на ЕГЭ по профильной математике" },
                { icon: "hundred", text: "Получил 100 баллов на ЕГЭ по физике" }
            ],
            quote: "Результаты приходят в то место, которое готово их принять.",
            imageUrl: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=300"
        },
        {
            id: randomUUID(),
            name: "Федя Доронин",
            subject: "Информатика",
            achievements: [
                { icon: "university", text: "Выпускник Физтех-лицея имени Капицы" },
                { icon: "cup", text: "Победитель и призёр перечневых олимпиад первого уровня" },
                { icon: "medal", text: "Призёр Международной Жаутыковской олимпиады по информатике" }
            ],
            quote: "Результаты приходят в то место, которое готово их принять.",
            imageUrl: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=300"
        },
        {
            id: randomUUID(),
            name: "Лёня Ожегов",
            subject: "Информатика",
            achievements: [
                { icon: "medal", text: "Призёр заключительного этапа ВсОШ по физике, математике и информатике" },
                { icon: "medal", text: "Призёр полуфинала чемпионата по программированию ICPC" }
            ],
            quote: "Результаты приходят в то место, которое готово их принять.",
            imageUrl: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=300"
        },
        {
            id: randomUUID(),
            name: "Артем Вотяков",
            subject: "Астрономия",
            achievements: [
                { icon: "cup", text: "Дважды победитель ВсОШ по астрономии, призер по физике и астрономии" },
                { icon: "cup", text: "Победитель и призер МАО и СпБАО" },
                { icon: "student", text: "Кандидат в международную сборную России IJSO" }
            ],
            quote: "Результаты приходят в то место, которое готово их принять.",
            imageUrl: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=300"
        },
        {
            id: randomUUID(),
            name: "Юра Гришин",
            subject: "Астрономия",
            achievements: [
                { icon: "cup", text: "Победитель и дважды призёр ВсОШ по астрономии" },
                { icon: "student", text: "Кандидат в международную сборную России с трёхлетним опытом преподавания" }
            ],
            quote: "Результаты приходят в то место, которое готово их принять.",
            imageUrl: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=300"
        },
        {
            id: randomUUID(),
            name: "Саша Жижченко",
            subject: "Астрономия",
            achievements: [
                { icon: "cup", text: "Победитель и призёр МОШ и СПбАО" },
                { icon: "student", text: "Читает лекции для школьников, ведет телеграм-канал Just Science" },
                { icon: "student", text: "Занимается численным моделированием и машинным обучением" }
            ],
            quote: "Результаты приходят в то место, которое готово их принять.",
            imageUrl: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=300"
        },
        {
            id: randomUUID(),
            name: "Оля Карасева",
            subject: "Астрономия",
            achievements: [
                { icon: "cup", text: "Золотая медаль Открытой Международной Астрономической Олимпиады" },
                { icon: "medal", text: "Две серебряные медали Международной Олимпиады по астрономии" },
                { icon: "student", text: "Дважды победитель ВсОШ по астрономии, в разные годы призер ВсОШ по астрономии, физике, математике" }
            ],
            quote: "Результаты приходят в то место, которое готово их принять.",
            imageUrl: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=300"
        },
        {
            id: randomUUID(),
            name: "Святослав Моргунов",
            subject: "Астрономия",
            achievements: [
                { icon: "cup", text: "Дважды победитель ВсОШ по астрономии" },
                { icon: "student", text: "Кандидат в сборную России по астрономии" }
            ],
            quote: "Результаты приходят в то место, которое готово их принять.",
            imageUrl: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=300"
        },
        {
            id: randomUUID(),
            name: "Ваня Тарасенко",
            subject: "Астрономия",
            achievements: [
                { icon: "university", text: "Выпускник Физтех-лицей имени Капицы, абитуриент ГАИШа" },
                { icon: "medal", text: "Многократный призер ВсОШ по астрономии" },
                { icon: "student", text: "Кандидат в сборную России по астрономии" }
            ],
            quote: "Результаты приходят в то место, которое готово их принять.",
            imageUrl: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=300"
        }
    ];

    sampleTeachers.forEach(teacher => {
      this.teachers.set(teacher.id, teacher);
    });
  }

  async getUser(id: string): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = randomUUID();
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  async getCourses(): Promise<Course[]> {
    return Array.from(this.courses.values());
  }

  async getCourse(id: string): Promise<Course | undefined> {
    return this.courses.get(id);
  }

  async getCoursesByCategory(category: string): Promise<Course[]> {
    return Array.from(this.courses.values()).filter(course => course.category === category);
  }

  async getCoursesBySubject(subject: string): Promise<Course[]> {
    return Array.from(this.courses.values()).filter(course => course.subject === subject);
  }

  async createCourse(insertCourse: InsertCourse): Promise<Course> {
    const id = randomUUID();
    // @ts-ignore
      const course: Course = { ...insertCourse, id };
    this.courses.set(id, course);
    return course;
  }

  async getTeachers(): Promise<Teacher[]> {
    return Array.from(this.teachers.values());
  }

  async getTeacher(id: string): Promise<Teacher | undefined> {
    return this.teachers.get(id);
  }

  async createTeacher(insertTeacher: InsertTeacher): Promise<Teacher> {
    const id = randomUUID();
    // @ts-ignore
      const teacher: Teacher = { ...insertTeacher, id };
    this.teachers.set(id, teacher);
    return teacher;
  }

  async createApplication(insertApplication: InsertApplication): Promise<Application> {
    const id = randomUUID();
    // @ts-ignore
      const application: Application = {
      ...insertApplication,
      id,
      createdAt: new Date().toISOString()
    };
    this.applications.set(id, application);
    return application;
  }

  async getApplications(): Promise<Application[]> {
    return Array.from(this.applications.values());
  }
}

export const storage = new MemStorage();
