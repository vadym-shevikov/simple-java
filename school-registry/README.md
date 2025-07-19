# Реєстр шкільних закладів

Система обліку шкільних закладів з можливістю фільтрації та управління.

## Технології

### Backend
- Java 17
- Spring Boot 3.2.0
- PostgreSQL 15
- Liquibase
- Maven 3.9

### Frontend
- React 19.1.0
- TypeScript 4.9.5
- React Bootstrap 2.10.10
- Bootstrap 5.3.7
- Axios 1.10.0

## Структура бази даних

Таблиця `schools`:
- `id` (BIGINT, PRIMARY KEY, AUTO_INCREMENT) - унікальний ідентифікатор
- `name` (VARCHAR 255, NOT NULL) - назва закладу
- `edrpou` (VARCHAR 8, NOT NULL, UNIQUE) - код ЄДРПОУ
- `region` (VARCHAR 100, NOT NULL) - область
- `type` (VARCHAR 50, NOT NULL) - тип закладу (GYMNASIUM, LYCEUM, GENERAL_SECONDARY)
- `is_active` (BOOLEAN, NOT NULL, DEFAULT true) - статус активності

Індекси:
- `idx_schools_region` - індекс по полю region
- `idx_schools_type` - індекс по полю type
- `idx_schools_is_active` - індекс по полю is_active

### ERD Схеми
- 🌐 [ERD.md](docs/ERD.md) - Mermaid діаграма (GitHub/Markdown)

## API Endpoints

- `GET /schools` - отримати список шкіл з фільтрами
  - Query параметри: 
    - `region` (string, optional) - фільтр по області
    - `type` (enum, optional) - фільтр по типу закладу
    - `isActive` (boolean, optional) - фільтр по статусу активності
- `POST /schools` - створити нову школу
  - Request body: `{ name, edrpou, region, type }`
- `PATCH /schools/{id}/deactivate` - деактивувати школу

## Запуск проекту

### З використанням Docker Compose

```bash
cd school-registry
docker compose up --build
```

Сервіси будуть доступні:
- Frontend: http://localhost:3000
- Backend API: http://localhost:8080
- PostgreSQL: localhost:5432 (database: school_registry, user: school_user, password: school_password)

### Локальний запуск

#### Backend
```bash
cd school-registry/backend
mvn spring-boot:run
```

#### Frontend
```bash
cd school-registry/frontend
npm install
npm start
```

## Структура проекту

```
school-registry/
├── backend/                    # Spring Boot backend
│   ├── src/
│   ├── pom.xml
│   └── Dockerfile
├── frontend/                   # React frontend
│   ├── src/
│   ├── package.json
│   ├── nginx.conf
│   └── Dockerfile
├── docs/                      # Документація
│   ├── ERD.md                 # Mermaid ERD схема
│   ├── ERD.html               # HTML ERD схема
│   └── ERD.txt                # ASCII ERD схема
├── docker-compose.yml         # Docker Compose конфігурація
└── README.md                  # Основна документація
``` 