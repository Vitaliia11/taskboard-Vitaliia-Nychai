# Opis danych TaskBoard

<!-- Zadanie TB-1, część 2. Skopiuj ten plik jako docs/dane.md i uzupełnij go.
     Opisz słowami, jakie dane przechowuje aplikacja, którą widziałeś na demo.
     Nie musisz znać SQL. Na koniec usuń komentarze z pytaniami. -->

## Co aplikacja przechowuje

### Użytkownik

| Informacja | Przykład |
| --- | --- |
| Login | anna.kowalska |
| Hasło (zapisane jako hash, nie jawnie) | $2b$10$k3J... |
| Imię i nazwisko | Anna Kowalska |
| Data utworzenia konta | 2026-11-02 |

### Tablica

| Informacja | Przykład |
| --- | --- |
| Nazwa | Projekt TaskBoard |
| Opis | Zadania zespołu na demo |
| Właściciel (użytkownik, który ją utworzył) | anna.kowalska |
| Data utworzenia | 2026-11-02 |

### Zadanie

| Informacja | Przykład |
| --- | --- |
| Tytuł | Uzupełnić README |
| Opis | Dodać instrukcję uruchomienia |
| Status | todo / in_progress / done |
| Priorytet | low / medium / high |
| Termin | 2026-11-13 (opcjonalny) |
| Tablica, do której należy | Projekt TaskBoard |
| Przypisana osoba | anna.kowalska (opcjonalna) |
| Usunięte | false |

## Powiązania

<!-- Opisz w co najmniej 3 zdaniach: Ile tablic może utworzyć jeden użytkownik?
     Do ilu tablic należy jedno zadanie? Czy zadanie musi mieć przypisaną osobę? -->

## Przykład zadania w JSON

<!-- Zapisz jedno zadanie tak, jak widziałeś je w DevTools albo w Postmanie podczas demo. -->

```json
{
  "title": ""
}
```
