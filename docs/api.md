# Dokumentacja API - TaskBoard

Poniżej znajduje się tabela tras (endpointów) API dostępnych w aplikacji.

| Metoda | Ścieżka | Wymagane uwierzytelnienie | Opis |
|---|---|---|---|
| POST | `/api/auth/register` | Nie | Rejestracja nowego użytkownika |
| POST | `/api/auth/login` | Nie | Logowanie użytkownika i utworzenie sesji |
| POST | `/api/auth/logout` | Tak | Wylogowanie (zniszczenie sesji) |
| GET | `/api/auth/me` | Tak | Pobranie danych aktualnie zalogowanego użytkownika |
| GET | `/api/boards` | Tak | Pobranie listy wszystkich tablic użytkownika |
| POST | `/api/boards` | Tak | Utworzenie nowej tablicy |
| GET | `/api/boards/:boardId/tasks` | Tak | Pobranie zadań dla danej tablicy (obsługuje filtr `?priority=...`) |
| POST | `/api/tasks` | Tak | Utworzenie nowego zadania |
| PATCH | `/api/tasks/:id` | Tak | Aktualizacja zadania (np. zmiana statusu) |
| DELETE | `/api/tasks/:id` | Tak | Usunięcie zadania (miękkie usunięcie / soft delete) |