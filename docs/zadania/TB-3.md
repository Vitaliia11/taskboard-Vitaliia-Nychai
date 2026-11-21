# TB-3: Dokumentacja API oraz testy

## Opis wykonania

- Zaimplementowano brakujące endpointy oraz walidację danych wejściowych.
- Uzupełniono kolekcję Postman o testy z kodami 400 oraz 404.
- Zaktualizowano dokumentację oraz procedury testowe.

## Część 2 (środa): Rozbudowa, testy i oddanie projektu

**Termin:** piątek 18:00, zmiany scalone do `main` i tag `v1.0`.

### Plan dni

- Czwartek: filtry, walidacja, telefon, Lighthouse, W3C.
- Piątek: testy, `api.md`, README, czysty klon, tag `v1.0`; oddanie do 18:00.

### Do zrobienia

- Nowy branch `feature/tb-3-oddanie`.
- Filtry w API: `assigneeId` (liczba, inaczej 400) i `q` (fragment tytułu, `LIKE`), łączone z `priority`.
- Pasek filtrów we frontendzie: lista osób, pole wyszukiwania, „Wyczyść filtry”; zapytanie przy każdej zmianie.
- Walidacja wszystkich formularzy (`is-invalid`, `invalid-feedback`) i komunikaty błędów z API.
- Telefon i dostępność: kolumny jedna pod drugą, Lighthouse co najmniej 90, W3C bez błędów.
- `docs/testy.md`: co najmniej 10 przypadków testowych z wynikami.
- `docs/api.md`: tabela wszystkich tras i przykład JSON.
- Końcowe README z instrukcją uruchomienia sprawdzoną na czystym klonie.
- Dopisz tę część do `docs/zadania/TB-3.md`.
- Tag `v1.0` na `main`: `git tag v1.0`, potem `git push origin v1.0`.

### Gotowe, gdy

- [ ] Filtry działają razem, błędna wartość daje 400.
- [ ] Dokumentacja i raport testów są w `docs/`.
- [ ] Projekt uruchamia się na czystym komputerze według README.
- [ ] Wszystko jest na `main` z tagiem `v1.0` do piątku 18:00.
