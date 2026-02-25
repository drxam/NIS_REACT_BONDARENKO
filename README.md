# Бондаренко Дмитрий Алексеевич 

# Admin Panel (E-commerce SPA)

SPA административная панель для e-commerce: аутентификация, каталог продуктов, настройки, i18n. Стек: React, TypeScript, Redux Toolkit, RTK Query, React Router, i18n. Backend: [DummyJSON](https://dummyjson.com).

## Технологии сверх ТЗ

Использованы дополнительные библиотеки, не указанные явно в задании:

- **redux-persist** — сохранение состояния Redux (auth, настройки) в localStorage по требованию ТЗ (раздел 1.5 «Persist (localStorage)»).
- **CRACO** — замена скриптов сборки (`craco start`, `craco build`) для совместимости с текущей конфигурацией; при необходимости можно вернуть `react-scripts` и собирать через `npx react-scripts build` (импорты в проекте относительные, сборка без CRACO поддерживается).
- **i18next** и **react-i18next** — реализация интернационализации (i18n) из ТЗ.

## Запуск

```bash
npm install --legacy-peer-deps
npm start
```

Сборка:

```bash
npm run build
```

## Архитектура (Feature Sliced Design)

```
src/
├── app/                 # Инициализация приложения
│   ├── api/             # RTK Query: baseApi, authApi, productsApi
│   ├── providers/       # AppProviders, ThemeProvider, SyncI18n
│   ├── router/          # Маршруты (createBrowserRouter), lazy loading
│   └── store/           # Redux store, auth/settings slices, selectors, hooks
├── pages/               # Страницы (роуты)
│   ├── LoginPage, RegisterPage, DashboardPage
│   ├── ProductsPage, ProductDetailPage
│   ├── ProfilePage, SettingsPage, LogoutPage, NotFoundPage
├── widgets/             # Композитные блоки
│   ├── layout/          # Header, Sidebar, MainLayout
│   ├── products/        # ProductsList, ProductDetail
│   └── settings/        # SettingsPanel
├── features/            # Действия пользователя
│   └── auth/            # LoginForm, LogoutButton, ProtectedRoute, PublicOnlyRoute, initAuth
├── entities/            # Бизнес-сущности
│   ├── user/            # Типы User, AuthUser
│   └── product/         # Типы Product, ProductsResponse
└── shared/              # Переиспользуемое
    ├── config/          # API_BASE_URL, i18n
    ├── locales/         # en.json, ru.json
    └── ui/              # ErrorBoundary
```

- **Публичные маршруты:** `/login`, `/register`.
- **Приватные:** `/`, `/products`, `/products/:id`, `/profile`, `/settings`, `/logout`, `*` (404).
- **API:** авторизация (POST `/auth/login`, GET `/auth/me`), продукты (GET `/products`, `/products/:id`, `/products/search`).
- **Настройки** (Redux + persist): язык (ru/en), тема (light/dark), размер страницы каталога.

## Тестовые данные для входа (DummyJSON)

Можно использовать любого пользователя с [dummyjson.com/users](https://dummyjson.com/users), например:

- **Username:** `emilys`  
- **Password:** `emilyspass`

Регистрация - заглушка
