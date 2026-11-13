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

## Autor

* **Imię i Nazwisko:** VitaliiaNychai
* **Grupa / Indeks:** 3TechnikProgramista
