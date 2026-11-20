# Przypadki testowe - TaskBoard

Poniżej przedstawiono przypadki testowe dla aplikacji TaskBoard (zarówno API, jak i interfejs użytkownika).

| ID | Scenariusz | Kroki | Oczekiwany wynik | Wynik |
| --- | --- | --- | --- | --- |
| T-01 | Logowanie poprawnymi danymi | Wpisanie poprawnego login i hasła w `login.html`, kliknięcie "Zaloguj" | Przejście do strony `boards.html`, kod 200 | Zgodny |
| T-02 | Logowanie błędnym hasłem | Wpisanie złego hasła w `login.html`, kliknięcie "Zaloguj" | Komunikat o błędzie z API (401 Unauthorized) | Zgodny |
| T-03 | Rejestracja nowego użytkownika | Wypełnienie Formularza w `login.html` (min. 8 znaków hasła) | Utworzenie konta, kod 201 i przekierowanie | Zgodny |
| T-04 | Rejestracja na zajęty login | Próba rejestracji na login, który już istnieje w bazie | Komunikat o konflikcie (kod 409 Conflict) | Zgodny |
| T-05 | Próba dostępu do API bez sesji | Wysłanie żądania `GET /api/boards` bez uprzedniego zalogowania | Odpowiedź serwera z kodem 401 Unauthorized | Zgodny |
| T-06 | Dodanie zadania z poprawnym tytułem | Wpisanie tytułu (np. 5 znaków), wybranie priorytetu i kliknięcie "Zapisz" | Zadanie pojawia się w kolumnie "Do zrobienia" | Zgodny |
| T-07 | Walidacja tytułu zadania (za krótkiego) | Próba dodania zadania z tytułem krótszym niż 3 znaki | Wyświetlenie błędu walidacji (czerwone pole / invalid-feedback) | Zgodny |
| T-08 | Zmiana statusu zadania | Wybranie nowego statusu (np. "W trakcie") z listy rozwijanej przy zadaniu | Zadanie zmienia pozycję i status w bazie danych | Zgodny |
| T-09 | Usuwanie zadania z potwierdzeniem | Kliknięcie "Usuń" przy zadaniu i potwierdzenie w okienku `confirm` | Zadanie zostaje usunięte z interfejsu (soft delete) | Zgodny |
| T-10 | Wylogowanie z systemu | Kliknięcie przycisku "Wyloguj" w nagłówku | Zniszczenie sesji i powrót do strony `login.html` | Zgodny |
