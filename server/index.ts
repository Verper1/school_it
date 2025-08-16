/**
 * Express.js сервер для Backend онлайн школы S2S.
 * 
 * Этот файл содержит основной Express.js сервер, который:
 * - Обрабатывает API запросы
 * - Настраивает middleware для логирования
 * - Интегрируется с Vite для разработки
 * - Раздает статические файлы в продакшене
 */

import express, { type Request, Response, NextFunction } from "express";
import { setupVite, serveStatic, log } from "./vite";
import {registerRoutes} from "./old/routes.ts";

// Создание Express приложения
const app = express();

// Middleware для парсинга JSON и URL-encoded данных
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Middleware для логирования API запросов
app.use((req, res, next) => {
  const start = Date.now();
  const path = req.path;
  let capturedJsonResponse: Record<string, any> | undefined = undefined;

  // Перехватываем JSON ответы для логирования
  const originalResJson = res.json;
  res.json = function (bodyJson, ...args) {
    capturedJsonResponse = bodyJson;
    return originalResJson.apply(res, [bodyJson, ...args]);
  };

  // Логируем информацию о запросе после завершения
  res.on("finish", () => {
    const duration = Date.now() - start;
    if (path.startsWith("/api")) {
      let logLine = `${req.method} ${path} ${res.statusCode} in ${duration}ms`;
      if (capturedJsonResponse) {
        logLine += ` :: ${JSON.stringify(capturedJsonResponse)}`;
      }

      // Обрезаем длинные логи до 80 символов
      if (logLine.length > 80) {
        logLine = logLine.slice(0, 79) + "…";
      }

      log(logLine);
    }
  });

  next();
});

// Основная функция инициализации сервера
(async () => {
  // Регистрируем маршруты (в текущей версии закомментированы)
  const server = await registerRoutes(app);

  // Глобальный обработчик ошибок
  app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
    const status = err.status || err.statusCode || 500;
    const message = err.message || "Internal Server Error";

    res.status(status).json({ message });
    throw err;
  });

  // Настройка Vite только в режиме разработки
  // Важно: настраиваем Vite после всех остальных маршрутов,
  // чтобы catch-all маршрут не мешал работе API
  if (app.get("env") === "development") {
    await setupVite(app, server);
  } else {
    serveStatic(app);
  }

  // Запуск сервера на порту из переменной окружения PORT
  // Другие порты заблокированы файрволом. По умолчанию 5000.
  // Этот порт обслуживает и API, и клиентское приложение.
  // Это единственный порт, который не заблокирован файрволом.
  const port = parseInt(process.env.PORT || '5000', 10);
  server.listen({
    port
  }, () => {
    log(`serving on port ${port}`);
  });
})();
