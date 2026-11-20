document.addEventListener('DOMContentLoaded', async () => {
    // Завантаження імені користувача та списку дощок
    try {
        const res = await fetch('/api/boards');
        if (res.ok) {
            const boards = await res.json();
            const boardsList = document.getElementById('boardsList');
            boardsList.innerHTML = '';

            boards.forEach(board => {
                const col = document.createElement('div');
                col.className = 'col-md-4 mb-3';
                col.innerHTML = `
                    <div class="card h-100 shadow-sm">
                        <div class="card-body">
                            <h5 class="card-title">${board.name}</h5>
                            <p class="card-text">${board.description || 'Brak opisu'}</p>
                            <a href="board.html?id=${board.id}" class="btn btn-primary btn-sm">Otwórz</a>
                        </div>
                    </div>
                `;
                boardsList.appendChild(col);
            });
        }
    } catch (err) {
        console.error('Błąd podczas ładowania tablic:', err);
    }

    // Обробник створення нової дошки
    const createBoardForm = document.getElementById('createBoardForm');
    if (createBoardForm) {
        createBoardForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const name = document.getElementById('boardName').value;
            const description = document.getElementById('boardDescription').value;

            try {
                const res = await fetch('/api/boards', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ name, description })
                });

                if (res.ok) {
                    location.reload(); // Перезавантажуємо сторінку, щоб побачити нову дошку
                } else {
                    const data = await res.json();
                    alert(data.error || 'Błąd podczas tworzenia tablicy');
                }
            } catch (err) {
                console.error('Błąd:', err);
            }
        });
    }

    // Кнопка виходу (Wyloguj)
    const logoutBtn = document.getElementById('logoutBtn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', async () => {
            await fetch('/api/auth/logout', { method: 'POST' });
            window.location.href = 'login.html';
        });
    }
});