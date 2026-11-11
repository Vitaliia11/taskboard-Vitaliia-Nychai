# Opis danych TaskBoard

## Co aplikacja przechowuje

### Użytkownik

| Informacja | Przykład |
| --- | --- |
| Identyfikator (ID) | `1` |
| Adres e-mail / Login | `jan.kowalski@example.com` |
| Imię i nazwisko w nagłówku | `Jan Kowalski` |

### Tablica

| Informacja | Przykład |
| --- | --- |
| Identyfikator (ID) tablicy | `10` |
| Nazwa tablicy | `Projekt Zaliczeniowy` |
| Twórca / Właściciel | `Jan Kowalski (ID: 1)` |

### Zadanie

| Informacja | Przykład |
| --- | --- |
| Tytuł zadania | `Naprawić błąd w formularzu` |
| Opis | `Sprawdzić walidację pól email` |
| Status | `To Do`, `In Progress`, `Done` |
| Priorytet | `Low`, `Medium`, `High` |
| Przypisana osoba (Assignee) | `Anna Nowak` |

## Powiązania

1. Jeden użytkownik może utworzyć wiele różnych tablic (relacja jeden-do-wielu pomiędzy użytkownikiem a tablicami).
2. Jedno konkretne zadanie należy zawsze tylko do jednej określonej tablicy.
3. Zadanie nie musi mieć przypisanej osoby — może pozostać nieprzydzielone (pole assignee może mieć wartość `null`).

## Przykład zadania w JSON

{
  "id": 101,
  "boardId": 10,
  "title": "Naprawić błąd w formularzu",
  "description": "Sprawdzić walidację pól email",
  "status": "In Progress",
  "priority": "High",
  "assignee": "Anna Nowak"
}

## Diagram ERD

```mermaid
erDiagram
    UZYTKOWNIK ||--o{ TABLICA : tworzy
    TABLICA ||--|{ ZADANIE : zawiera
    UZYTKOWNIK ||--o{ ZADANIE : przypisany
