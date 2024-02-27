# Проект: Guitar Shop


✨ **GuitarShop итоговый проект курса «Фулстек-разработчик #4»  ** ✨
* Студент: [Эдуард Маликов](https://up.htmlacademy.ru/nodejs-2/4/user/2201533).
* Время затраченное на проект: 86:25:18.
 
## Запуск проекта

### 1. Запуск бэка:

1. Перейти в директорию:
   1. `./guitar-shop.backend/project` 

2. Поднять четыре докер контейнера:
   1. `docker compose --file ./apps/uploader/docker-compose.dev.yml`
   2. `docker compose --file ./apps/products/docker-compose.dev.yml`
   3. `docker compose --file ./apps/notify/docker-compose.dev.yml`
   4. `docker compose --file ./apps/users/docker-compose.dev.yml`
 
3. Инициировать Prisma-client:
   1. `nx run products:db:generate` 

4. Запустить пять сервисов:
   1. `nx run bff:serve`
   2. `nx run users:serve`
   3. `nx run products:serve`
   4. `nx run uploader:serve`
   5. `nx run notify:serve`

### 2. Если нужны фальшивые данные

1. В файле `./mocks/generate.config.json` надо подправить опции для генератора
   1. Файл выглядит так: 
   ```  "count": 200,
        "usersUri": "mongodb://admin:test@localhost:27017/guitar-shop-users-mongo?authSource=admin",
        "uploaderUri": "mongodb://admin:test@localhost:27018/guitar-shop-uploader?authSource=admin",
        "mockDataPath": "./mocks/mock-data.json",
        "imagesPath": "./mocks/images/",
        "uploadPath": "E:/HTML_academy/guitar-shop/guitar-shop.backend/project/apps/uploader/uploads"
    ```
    2. краткое содержание: 
       
       1. userUri - URI к Mongo базе users
       2. uploaderUri - URI к Mongo базе картинок
       3. mockDataPath - файл откуда черпается весь фальшак
       4. imagesPath - фотки
       4. uploadPath - путь по которому генератор накидает картинки 
     
2. Генератор запускается: `npm run ts ./cli/main.cli.ts -- --generate`    

### 3. Запуск фронта:

1. Фронт запускается из директории `./guitar-shop.backend/project` командой `npm start`
2. Искать бэк будет на [http://localhost:3333](). 
   
   зашито в коде в файле `./src/utils/get-base-url.ts`
 
   ```typescript 
        const DEFAULT_BASE_URL = 'http://localhost:3333';
   ```
    поднять из `.env` пробовал - не вышло    

## Переменные окружения
1. `project/apps/bff/.bff.env`:
    
```dotenv
    PORT=3333
    HTTP_CLIENT_MAX_REDIRECTS=5
    HTTP_CLIENT_TIMEOUT=5000
    APP_USERS=http://localhost:3111/users
    APP_PRODUCTS=http://localhost:3444/products
    APP_FILES=http://localhost:3222/file
```
2.  `project/apps/notify/.env`

```dotenv
    COMPOSE_PROJECT_NAME=Guitar-shop-notify
    PORT=3004
    RABBIT_HOST=localhost
    RABBIT_PASSWORD=test
    RABBIT_PORT=5672
    RABBIT_USER=admin
    MAIL_SMTP_HOST=localhost
    MAIL_SMTP_PORT=8025
    MAIL_USER_NAME=r
    MAIL_USER_PASSWORD=1
    MAIL_FROM=rimich@fake.ru
    RABBIT_BINDING_KEYS=REGISTER_USER
    REGISTER_USER=notify.register|guitarShop.notify|register
```
3.  `project/apps/products/.products.env`:

```dotenv
    COMPOSE_PROJECT_NAME=Guitar-shop-products
```
4.  `project/libs/models/product-models/prisma/.env`:    

```dotenv
    DATABASE_URL=postgres://admin:test@localhost:5433/guitar-shop-products
```

5.  `project/apps/uploader/.env`:

```dotenv
    COMPOSE_PROJECT_NAME=Guitar-shop-uploader
```

6.  `project/apps/uploader/.uploader.env`:

```dotenv
    UPLOAD_DIRECTORY_PATH=E:/HTML_academy/guitar-shop/guitar-shop.backend/project/apps/uploader/uploads
    PORT=3222
    MONGO_DB_HOST=127.0.0.1
    MONGO_DB_PORT=27018
    MONGO_DB_NAME=guitar-shop-uploader
    MONGO_DB_USER=admin
    MONGO_DB_PASSWORD=test
    MONGO_DB_AUTH_BASE=admin
    HOST=localhost
    SERVE_ROOT=/static
```

7.  `project/apps/users/.env`:

```dotenv
    COMPOSE_PROJECT_NAME=Guitar-shop-users
```

8.  `project/apps/users/.users.env`:

```dotenv
    PORT=3111
    SALT=TooMuchAllSalted
    MONGO_DB_HOST=127.0.0.1
    MONGO_DB_PORT=27017
    MONGO_DB_NAME=guitar-shop-users-mongo
    MONGO_DB_USER=admin
    MONGO_DB_PASSWORD=test
    MONGO_DB_AUTH_BASE=admin
    JWT_SECRET=jwt_secret
    JWT_EXPIRES_IN=30d
    HOST=localhost
    RABBIT_HOST=localhost
    RABBIT_PASSWORD=test
    RABBIT_PORT=5672
    RABBIT_USER=admin
    RABBIT_BINDING_KEYS=REGISTER_USER
    REGISTER_USER=notify.register|guitarShop.notify|register
```

порт запуска сервиса: `PORT=3111` 

настройки HTTP соединений :

`HTTP_CLIENT_MAX_REDIRECTS=5` - количество попыток соединения
`HTTP_CLIENT_TIMEOUT=5000` - таймаут

URL-ы сервисов:

`APP_USERS=http://localhost:3111/users`
`APP_PRODUCTS=http://localhost:3444/products`
`APP_FILES=http://localhost:3222/file`

Название проекта для докера:

`COMPOSE_PROJECT_NAME=Guitar-shop-notify`

Общие настройки Rabbit:

`RABBIT_HOST=localhost`
`RABBIT_PASSWORD=test`
`RABBIT_PORT=5672`
`RABBIT_USER=admin`

Опции Rabbit очередей:

`RABBIT_BINDING_KEYS=REGISTER_USER`
`REGISTER_USER=notify.register|guitarShop.notify|register`

Настройки FakeSMTP для отправки ~~фальшивых~~ тестовых e-mail:

`MAIL_SMTP_HOST=localhost`
`MAIL_SMTP_PORT=8025`
`MAIL_USER_NAME=r`
`MAIL_USER_PASSWORD=1`
`MAIL_FROM=rimich@fake.ru`

URI к Postgres:

`DATABASE_URL=postgres://admin:test@localhost:5433/guitar-shop-products`

Директория куда будут складываться фотографии продукта:

`UPLOAD_DIRECTORY_PATH=E:/HTML_academy/guitar-shop/guitar-shop.backend/project/apps/uploader/uploads`

Опции для Mongo URI:

`MONGO_DB_HOST=127.0.0.1`
`MONGO_DB_PORT=27018`
`MONGO_DB_NAME=guitar-shop-uploader`
`MONGO_DB_USER=admin`
`MONGO_DB_PASSWORD=test`
`MONGO_DB_AUTH_BASE=admin`

Опции для раздачи статики, в этом проекте не нужны но config их ждёт, можете кинуть в меня помидор

`HOST=localhost`
`SERVE_ROOT=/static`

Это просто соль для хэша пароля:

`SALT=TooMuchAllSalted`

Опции для JWT токена:

`JWT_SECRET=jwt_secret`
`JWT_EXPIRES_IN=30d`

За сим всё, три часа осталось!