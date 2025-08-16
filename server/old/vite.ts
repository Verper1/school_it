/**
 * Vite конфигурация для Backend онлайн школы S2S.
 * 
 * Этот файл содержит функции для настройки Vite в режиме разработки
 * и раздачи статических файлов в продакшене.
 */

import express, { type Express } from "express";
import fs from "fs";
import path from "path";
import { createServer as createViteServer, createLogger } from "vite";
import { type Server } from "http";
import viteConfig from "../vite.config";
import { nanoid } from "nanoid";

// Создаем логгер для Vite
const viteLogger = createLogger();

/**
 * Функция для логирования сообщений с временными метками.
 * 
 * @param message - Сообщение для логирования
 * @param source - Источник сообщения (по умолчанию "express")
 */
export function log(message: string, source = "express") {
  const formattedTime = new Date().toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
  });

  console.log(`${formattedTime} [${source}] ${message}`);
}

/**
 * Настраивает Vite для режима разработки.
 * 
 * Создает Vite сервер в middleware режиме и интегрирует его с Express.
 * Обеспечивает горячую перезагрузку и трансформацию HTML.
 * 
 * @param app - Express приложение
 * @param server - HTTP сервер
 */
export async function setupVite(app: Express, server: Server) {
  const serverOptions = {
    middlewareMode: true,
    hmr: { server },
    allowedHosts: true as const,
  };

  // Создаем Vite сервер с настройками
  const vite = await createViteServer({
    ...viteConfig,
    configFile: false,
    customLogger: {
      ...viteLogger,
      error: (msg, options) => {
        viteLogger.error(msg, options);
        process.exit(1);
      },
    },
    server: serverOptions,
    appType: "custom",
  });

  // Подключаем Vite middleware к Express
  app.use(vite.middlewares);
  
  // Catch-all маршрут для SPA (Single Page Application)
  app.use("*", async (req, res, next) => {
    const url = req.originalUrl;

    try {
      const clientTemplate = path.resolve(
        import.meta.dirname,
        "..",
        "client",
        "index.html",
      );

      // Всегда перезагружаем index.html с диска на случай изменений
      let template = await fs.promises.readFile(clientTemplate, "utf-8");
      template = template.replace(
        `src="/src/main.tsx"`,
        `src="/src/main.tsx?v=${nanoid()}"`,
      );
      
      // Трансформируем HTML через Vite
      const page = await vite.transformIndexHtml(url, template);
      res.status(200).set({ "Content-Type": "text/html" }).end(page);
    } catch (e) {
      vite.ssrFixStacktrace(e as Error);
      next(e);
    }
  });
}

/**
 * Настраивает раздачу статических файлов для продакшена.
 * 
 * Раздает собранные файлы из папки public и обеспечивает
 * fallback на index.html для SPA роутинга.
 * 
 * @param app - Express приложение
 * @throws {Error} Если папка сборки не найдена
 */
export function serveStatic(app: Express) {
  const distPath = path.resolve(import.meta.dirname, "public");

  if (!fs.existsSync(distPath)) {
    throw new Error(
      `Could not find the build directory: ${distPath}, make sure to build the client first`,
    );
  }

  // Раздаем статические файлы из папки public
  app.use(express.static(distPath));

  // Fallback на index.html если файл не найден (для SPA роутинга)
  app.use("*", (_req, res) => {
    res.sendFile(path.resolve(distPath, "index.html"));
  });
}
