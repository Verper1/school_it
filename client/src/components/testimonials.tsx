export default function Testimonials() {
  const testimonials = [
    {
      id: 1,
      name: "Анна Петрова",
      result: "96 баллов по математике",
      text: "Благодаря S2S я смогла поступить в МГУ на бюджет. Преподаватели объясняют сложные темы простым языком.",
      subject: "Математика"
    },
    {
      id: 2,
      name: "Михаил Сидоров",
      result: "94 балла по физике",
      text: "Отличная подготовка к олимпиадам! Занял призовое место на Всероссе и поступил в МФТИ.",
      subject: "Физика"
    },
    {
      id: 3,
      name: "Екатерина Иванова",
      result: "89 баллов по русскому",
      text: "Школа помогла не только с ЕГЭ, но и развила навыки критического мышления. Поступила в ВШЭ.",
      subject: "Русский язык"
    },
    {
      id: 4,
      name: "Александр Козлов",
      result: "92 балла по информатике",
      text: "Современная методика и опытные преподаватели. Рекомендую всем, кто хочет высокие баллы!",
      subject: "Информатика"
    }
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 font-display">
              Истории успеха наших учеников
            </h2>
            <p className="text-lg text-gray-600">
              Более 2000 выпускников уже поступили в топовые вузы России
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {testimonials.map((testimonial) => (
              <div key={testimonial.id} className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center">
                    <span className="text-white font-bold text-lg">
                      {testimonial.name.split(' ')[0].charAt(0)}
                    </span>
                  </div>
                  <div className="ml-3">
                    <h3 className="font-semibold text-gray-900">{testimonial.name}</h3>
                    <p className="text-sm text-primary font-medium">{testimonial.result}</p>
                  </div>
                </div>
                
                <p className="text-gray-600 text-sm mb-4 leading-relaxed">
                  "{testimonial.text}"
                </p>
                
                <div className="text-xs text-gray-500 font-medium">
                  {testimonial.subject}
                </div>
              </div>
            ))}
          </div>

          {/* Results Statistics */}
          <div className="mt-16 bg-white rounded-2xl p-8 shadow-lg">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              <div>
                <div className="text-3xl font-bold text-primary mb-2">85+</div>
                <p className="text-gray-600 text-sm">Средний балл ЕГЭ</p>
              </div>
              <div>
                <div className="text-3xl font-bold text-green-500 mb-2">95%</div>
                <p className="text-gray-600 text-sm">Поступления на бюджет</p>
              </div>
              <div>
                <div className="text-3xl font-bold text-purple-500 mb-2">200+</div>
                <p className="text-gray-600 text-sm">Призеров олимпиад</p>
              </div>
              <div>
                <div className="text-3xl font-bold text-orange-500 mb-2">2000+</div>
                <p className="text-gray-600 text-sm">Выпускников</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}