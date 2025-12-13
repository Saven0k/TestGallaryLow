Сделать moderate для aritist и ainting для проверки модерации и запрета использования функций аккаунта ( поле + сервис + сонтролер отдельный endpoInt внешний ключ на добавление свойств)

Придумать таблицу для сообщей - форму ( веб сокеты отдельный api)




# 🎨 Art Gallery Backend API

<div align="center">

![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white)
![Prisma](https://img.shields.io/badge/Prisma-3982CE?style=for-the-badge&logo=Prisma&logoColor=white)
![Express.js](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)

**Современный REST API для управления художественной галереей**

[📚 Документация API](#-документация-api) • [🚀 Быстрый старт](#-быстрый-старт) • [🏗 Архитектура](#-архитектура) • [📊 База данных](#-база-данных)

</div>

## 📖 О проекте

Backend система для управления цифровой художественной галереей. Позволяет управлять художниками, их работами, жанрами и предоставляет полнофункциональное API для фронтенд приложений.

### 🌟 Основные возможности

- **🎨 Управление художниками** - полный CRUD для артистов
- **🖼 Управление картинами** - каталог художественных работ
- **📚 Система жанров** - категоризация произведений искусства
- **🔍 Поиск и фильтрация** - интеллектуальный поиск по всем данным
- **📊 Аналитика просмотров** - отслеживание популярности картин
- **🔐 Безопасность** - валидация и обработка ошибок

## 🏗 Архитектура
src/
├── 📁 controllers/ # Обработчики запросов API
├── 📁 services/ # Бизнес-логика приложения
├── 📁 models/ # TypeScript интерфейсы
├── 📁 middleware/ # Промежуточное ПО
├── 📁 routes/ # Маршрутизация API
├── 📁 utils/ # Вспомогательные функции
└── 🚀 app.ts # Точка входа приложения

## 🚀 Быстрый старт

### Предварительные требования

- **Node.js** 18.0.0 или выше
- **PostgreSQL** 12.0 или выше
- **npm** или **yarn**

### Установка и настройка

1. **Клонируйте и установите зависимости**
```bash
git clone <your-repo-url>
cd backend
npm install

## 🛠 Технологический стек

### 🔧 Основные технологии

| Категория      | Технология                                                                         | Описание                             |
| -------------- | ---------------------------------------------------------------------------------- | ------------------------------------ |
| **Runtime**    | ![Node.js](https://img.shields.io/badge/Node.js-20.x-339933?logo=nodedotjs)        | Среда выполнения JavaScript          |
| **Language**   | ![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?logo=typescript)  | Статически типизированный JavaScript |
| **Framework**  | ![Express.js](https://img.shields.io/badge/Express.js-4.x-000000?logo=express)     | Минималистичный веб-фреймворк        |
| **ORM**        | ![Prisma](https://img.shields.io/badge/Prisma-5.x-2D3748?logo=prisma)              | Современный Type-safe ORM            |
| **Database**   | ![PostgreSQL](https://img.shields.io/badge/PostgreSQL-15.x-4169E1?logo=postgresql) | Реляционная база данных              |
| **Validation** | ![Express Validator](https://img.shields.io/badge/Express_Validator-7.x-000000)    | Валидация входящих данных            |

### 📦 Зависимости разработки

| Пакет                                                             | Версия    | Назначение                       |
| ----------------------------------------------------------------- | --------- | -------------------------------- |
| ![ts-node](https://img.shields.io/badge/ts_node-10.x-3178C6)      | `^10.9.0` | Запуск TypeScript без компиляции |
| ![nodemon](https://img.shields.io/badge/nodemon-3.x-76D04B)       | `^3.0.0`  | Hot reload в режиме разработки   |
| ![@types/*](https://img.shields.io/badge/@types/*-latest-3178C6)  | `latest`  | TypeScript типы для зависимостей |
| ![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6) | `^5.0.0`  | Компилятор TypeScript            |

### 🏗 Архитектурные паттерны

| Паттерн        | Реализация                      | Преимущества                        |
| -------------- | ------------------------------- | ----------------------------------- |
| **MVC**        | Controllers + Services + Models | Четкое разделение ответственности   |
| **Repository** | Prisma Client                   | Абстракция доступа к данным         |
| **Middleware** | Express middleware              | Централизованная обработка запросов |
| **REST**       | RESTful API endpoints           | Стандартизированное API             |

### 🔄 Рабочий процесс

```mermaid
graph TD
    A[Запрос API] --> B[Middleware]
    B --> C[Validation]
    C --> D[Controller]
    D --> E[Service]
    E --> F[Prisma ORM]
    F --> G[PostgreSQL]
    G --> F
    F --> E
    E --> D
    D --> H[Response]



# Artists
GET    /api/artists
GET    /api/artists/:id
POST   /api/artists
PUT    /api/artists/:id
DELETE /api/artists/:id
POST   /api/artists/:id/genres

# Paintings
GET    /api/paintings
GET    /api/paintings/:id
GET    /api/paintings/artist/:artistId
POST   /api/paintings
PUT    /api/paintings/:id
DELETE /api/paintings/:id
POST   /api/paintings/:id/like

# Genres
GET    /api/genres
GET    /api/genres/:id
POST   /api/genres
PUT    /api/genres/:id
DELETE /api/genres/:id

# Exhibitions
GET    /api/exhibitions
GET    /api/exhibitions/:id
POST   /api/exhibitions
PUT    /api/exhibitions/:id
DELETE /api/exhibitions/:id
POST   /api/exhibitions/:id/paintings
POST   /api/exhibitions/:id/guests

# Guests
GET    /api/guests
GET    /api/guests/:id
POST   /api/guests
PUT    /api/guests/:id
DELETE /api/guests/:id