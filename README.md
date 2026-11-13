# TaskBoard - Aplikacja do zarządzania zadaniami

Aplikacja webowa typu TaskBoard przeznaczona do zarządzania projektami i zadaniami. Umożliwia tworzenie tablic, dodawanie zadań, śledzenie ich statusu oraz przypisywanie ich do użytkowników.

## Technologie

* **Frontend / Backend:** JavaScript / Node.js
* **Dokumentacja:** Markdown
* **Kontrola wersji:** Git & GitHub

## Wymagania środowiskowe

* Node.js v18+
* Menedżer pakietów `npm` lub `yarn`
* Przeglądarka internetowa (Chrome, Firefox, Edge)

## Uruchomienie projektu

1. Sklonuj repozytorium na swój komputer:

   ```bash
   git clone <URL_TWOJEGO_REPOZYTORIUM>

## Testowanie API

* **Postman:** (v2.1)

## Struktura bazy danych

Baza danych nazywa się `taskboard` i zawiera następujące główne tablice:

* `tasks` — przechowuje zadania dla tablicy.
* `boards` — przechowuje informacje o tablicach.
* `users` — przechowuje konta użytkowników systemu.

Dostęp do bazy danych został skonfigurowany za pomocą specjalnego użytkownika `taskboard_app` z odpowiednimi uprawnieniami.

## Endpointy API

* `GET /api/health` — sprawdzenie statusu serwera.
* `GET /api/tasks` — pobieranie listy zadań.
* `GET /api/users` — pobieranie listy użytkowników.

## Dokumentacja Postman

Kolekcja zapytań API (format v2.1) znajduje się w folderze projektu pod ścieżką:
`docs/postman/`

## Baza danych

Aplikacja korzysta z relacyjnej bazy danych **MySQL** (`taskboard`).

### Tabele i relacje
- **`users`** (`id`, `login`, `passwordHash`, `firstName`, `lastName`, `createdAt`) — przechowuje konta użytkowników.
- **`boards`** (`id`, `name`, `description`, `ownerId`, `createdAt`, `isDeleted`, `deletedAt`, `deletedById`) — tablice zadań.
- **`tasks`** (`id`, `title`, `description`, `status`, `priority`, `deadline`, `boardId`, `assigneeId`, `createdAt`, `isDeleted`, `deletedAt`, `deletedById`) — zadania przypisane do tablic.

### Soft delete
Usunięcie rekordu przez API (`DELETE`) nie usuwa go fizycznie z bazy danych. Ustawiana jest flaga `isDeleted = 1` oraz zapisywany znacznik czasu w `deletedAt`. Zapytania `GET` filtrują wyniki warunkiem `WHERE isDeleted = 0`.

## Autor

* **Imię i Nazwisko:** VitaliiaNychai
* **Grupa / Indeks:** 3TechnikProgramista
