// Ćwiczenie z debuggerem (poniedziałek 3).
// Ten skrypt ma 5 błędów. Otwórz index.html w przeglądarce (np. przez Live Server),
// włącz DevTools (F12) i znajdź błędy: zakładka Console pokazuje komunikaty,
// a w zakładce Sources ustawisz breakpoint i podejrzysz wartości zmiennych.
// Przy każdej poprawce dopisz komentarz, co było nie tak.

const zadania = [
    { tytul: 'Struktura repozytorium', status: 'done' },
    { tytul: 'Skrypt bazy danych', status: 'done' },
    { tytul: 'API tablic', status: 'in_progress' },
    { tytul: 'Widok tablicy', status: 'todo' },
    { tytul: 'Raport testów', status: 'todo' }
];

function policzWykonane(lista) {
    let licznik = 0;
    for (let i = 0; i < lista.length; i++) { // Błąd 1: Zmieniono <= na <, aby uniknąć wykroczenia poza zakres tablicy
        if (lista[i].status === 'done') { // Błąd 2: Zmieniono operator przypisania (=) na porównanie (===)
            licznik++;
        }
    }
    return licznik;
}

function pokazPodsumowanie() {
    const wykonane = policzWykonane(zadania); // Błąd 3: Poprawiono nazwę zmiennej z 'zadanie' na 'zadania'
    const procent = Math.round((wykonane / zadania.length) * 100);
    document.getElementById('wynik').textContent = `Wykonane: ${wykonane} z ${zadania.length} (${procent}%)`; // Błąd 4: Uzupełniono nazwę zmiennej zadania.length
}

document.getElementById('policz').addEventListener('click', pokazPodsumowanie); // Błąd 5: Poprawiono literówkę w nazwie zdarzenia 'clik' na 'click'