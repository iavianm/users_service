# Запуск приложения

Для запуска приложения выполните следующие шаги:

1. Запустите приложение с помощью команды `docker-compose up`.

2. После успешного запуска, приложение будет доступно по следующему URL:
   [http://localhost:3001](http://localhost:3001)

Все приложения работают в режиме разработки (dev mode).

## Эндпоинты "users"
POST http://localhost:4001/users/

PATCH http://localhost:4001/users/:id

GET http://localhost:4001/users/

## Эндпоинты "users_history"
POST http://localhost:4002/history/

GET http://localhost:4002/history/:userId

GET http://localhost:4002/history/
