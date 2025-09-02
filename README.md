# fullstack-app - фуллстек приложение на Next и Express

## Установка

**1. Установка пакетов в папках /frontent и /backend:**
```npm install```

**2. Установка PostgreSQL**

**3. Создание файла для подключения к базе /backend/.env со строкой:**
```DATABASE_URL="postgresql://postgres:mysecret123@localhost:5432/mydb"```
postgres — имя пользователя (Login Role)
mysecret123 — пароль
localhost — хост (если на твоём ПК)
5432 — порт
mydb — название базы (можно проверить в Databases)

**4. Создайте таблицы в базе данных в соответствии с миграциями командой:**
```npx prisma migrate up```

**5. Запуск проектов в папках /frontent и /backend:**
```npm run dev```


