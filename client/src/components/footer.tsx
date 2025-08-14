import {Input} from "@/components/ui/input.tsx";
import {Button} from "@/components/ui/button.tsx";

export default function Footer() {
  return (
    <footer className="bg-[#2A2A2C] mt-20 text-white py-12">
        <div className="flex rounded-[40px] mb-10 flex-col w-full text-[#1E1E24] md:flex-row items-center md:items-start justify-between bg-white p-8 shadow-md max-w-7xl mx-auto">
            {/* Left Side */}
            <div className="md:w-1/2 mb-6 md:mb-0">
                <h2 className="font-display text-3xl font-semibold mb-2">Готов двигаться?</h2>
                <p className="font-semibold text-lg">
                    Оставляй заявку, и мы подберём<br /> маршрут под твои цели.
                </p>
            </div>

            {/* Right Side - Form */}
            <form className="md:w-1/2 w-full space-y-4">
                <Input
                    type="text"
                    placeholder="Иван Иванов"
                    className="w-full"
                />
                <Input
                    type="tel"
                    placeholder="+7 900 800 70 60"
                    className="w-full"
                />
                <Input
                    type="email"
                    placeholder="example@email.ru"
                    className="w-full"
                />
                <Button
                    className="w-1/2"
                >
                    Оставить заявку
                </Button>
            </form>
        </div>
      <div className="container mx-auto px-4">
        <div className="max-w-7xl mx-auto">
          {/* Logo and main info */}
          <div className="flex items-left text-left justify-start space-x-2 mb-8">
            <h4 className="text-xl font-semibold">S<sub>2</sub>S</h4>
          </div>
          
          {/* Footer columns */}
          <div className="grid md:grid-cols-5 gap-8 mb-8">
            {/* Subjects column */}
            <div>
              <h4 className="font-semibold mb-4">Предметы</h4>
              <ul className="space-y-2 text-sm">
                <li>Математика</li>
                <li>Физика</li>
                <li>Химия</li>
                <li>История</li>
                <li>Информатика</li>
                <li>Обществознание</li>
              </ul>
            </div>

            {/* About column */}
            <div>
              <h4 className="font-semibold mb-4">О нас</h4>
              <ul className="space-y-2 text-sm">
                <li>О нас</li>
                <li>Отзывы</li>
                <li>Преподавателям</li>
                <li>Контакты</li>
                <li>О платформе</li>
                <li>Договор оферта</li>
              </ul>
            </div>

            {/* Additional column 1 */}
            <div>
              <h4 className="font-semibold mb-4">Ещё столбик</h4>
              <ul className="space-y-2 text-sm">
                <li>О нас</li>
                <li>Отзывы</li>
                <li>Студентам</li>
                <li>Преподавателям</li>
                <li>Контакты</li>
              </ul>
            </div>

            {/* Additional column 2 */}
            <div>
              <h4 className="font-semibold mb-4">Ещё столбик</h4>
              <ul className="space-y-2 text-sm">
                <li>Отзывы</li>
                <li>Преподавателям</li>
                <li>Студентам</li>
                <li>Контакты</li>
                <li>Договор оферта</li>
              </ul>
            </div>

            {/* Additional column 3 */}
            <div>
              <h4 className="font-semibold mb-4">Ещё столбик</h4>
              <ul className="space-y-2 text-sm">
                <li>Отзывы</li>
                <li>Студентам</li>
                <li>Преподавателям</li>
                <li>Контакты</li>
                <li>Договор оферта</li>
              </ul>
            </div>
          </div>

          {/* Contact info and copyright */}
          <div className="border-t border-gray-800 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
              <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-8 text-sm text-gray-400">
                <span>8 900 800 60 70</span>
                <span>Москва, ул Московская 1</span>
                <span>help@s2s.ru</span>
              </div>
              
              <div className="text-sm text-gray-400">
                <p>&copy; S2S (2025)</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
