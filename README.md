# My Vibe

## ❓ Description

**My Vibe** — це персональний вебзастосунок для збереження улюблених зображень, мемів та цитат. Проєкт реалізовано з авторизацією через HTTPOnly cookies, персональним сховищем користувача та підтримкою документації, Storybook та GDPR-вимог.

---

🔨 Technologies

- **Backend:** ASP.NET Core, Entity Framework Core, AutoMapper, JWT
- **Frontend:** React, TypeScript, Zustand, Vite, Material UI
- **Database:** SQLite / MSSQL
- **State manager:** Zustand
- **Validation:** react-hook-form + yup
- **API Documentation:** Swagger
- **Docs generator:** Docusaurus / Markdown

---

🔎 **Functionality**

- Реєстрація, логін та авторизація через HTTPOnly Cookies
- Збереження "улюбленого" контенту за типом (Image / Meme / Quote)
- Виведення у вигляді галереї (зображення або цитати)
- Видалення своїх елементів
- Захист приватності через JWT
- Cookie banner відповідно до GDPR
- Storybook з описом компонентів

---

## ❗ Project setup

### 1. Cloning repository

```bash
git clone https://github.com/HoltsevKostia/MyVibeApp.git
```

### 2. Backend onfiguration

```bash
cd MyVibe.Server

# Налаштуй connection string у appsettings.json
# Створи базу даних
dotnet ef database update

# Запуск сервера
dotnet run
```

### 3. Frontend onfiguration
```bash
cd myvibe.client
npm install
npm run dev
```

## ✒️ API Documentation

Swagger доступний після запуску за адресою: https://localhost:7180/swagger/index.html

## 🧪 Storybook

```bash
cd myvibe.client
npm run storybook
```
