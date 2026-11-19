// Отримуємо ID дошки з URL (наприклад: board.html?id=1)
const urlParams = new URLSearchParams(window.location.search);
const boardId = urlParams.get('id') || 1;

document.addEventListener('DOMContentLoaded', () => {
    loadBoardDetails();
    loadTasks();

    // Обробка форми створення завдання з валідацією
    const taskForm = document.getElementById('taskForm');
    if (taskForm) {
        taskForm.addEventListener('submit', async (event) => {
            event.preventDefault();
            const titleInput = document.getElementById('taskTitle');
            const title = titleInput.value.trim();

            // Перевірка довжини назви за вимогою інструкції (від 3 до 100 знаків)
            if (title.length < 3 || title.length > 100) {
                titleInput.classList.add('is-invalid');
                return;
            }
            titleInput.classList.remove('is-invalid');

            const priority = document.getElementById('taskPriority').value;

            try {
                await api('/tasks', 'POST', {
                    title: title,
                    priority: priority,
                    boardId: Number(boardId),
                    status: 'todo'
                });

                // Закриваємо модальне вікно та очищуємо форму
                const modalElement = document.getElementById('taskModal');
                const modal = bootstrap.Modal.getInstance(modalElement);
                if (modal) modal.hide();
                
                event.target.reset();
                loadTasks(); // Перезавантажуємо список завдань
            } catch (err) {
                console.error('Błąd podczas tworzenia zadania:', err);
                alert(err.message);
            }
        });
    }

    // Фільтрація за пріоритетом
    const filterPriority = document.getElementById('filterPriority');
    if (filterPriority) {
        filterPriority.addEventListener('change', loadTasks);
    }

    // Вихід з системи
    const logoutBtn = document.getElementById('logoutBtn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', async () => {
            await fetch('/api/auth/logout', { method: 'POST' });
            window.location.href = 'login.html';
        });
    }
});

// Функція завантаження інформації про дошку
async function loadBoardDetails() {
    try {
        const boards = await api('/boards');
        const currentBoard = boards.find(b => b.id == boardId);
        if (currentBoard) {
            document.getElementById('boardTitle').textContent = `Tablica: ${currentBoard.name}`;
        }
    } catch (err) {
        console.error('Nie udało się pobrać nazwy tablicy', err);
    }
}

// Функція завантаження та виведення завдань у колонки
async function loadTasks() {
    const priority = document.getElementById('filterPriority').value;
    const query = priority ? `?priority=${priority}` : '';
    
    try {
        const tasks = await api(`/boards/${boardId}/tasks${query}`);

        // Очищуємо всі колонки перед завантаженням
        for (const status of ['todo', 'in_progress', 'done']) {
            document.getElementById(`col-${status}`).innerHTML = '';
        }

        // Розподіляємо завдання по колонках
        for (const task of tasks) {
            const column = document.getElementById(`col-${task.status}`);
            if (!column) continue;

            const card = document.createElement('div');
            card.className = 'card shadow-sm mb-2';
            card.innerHTML = `
                <div class="card-body p-3">
                    <h4 class="h6 card-title text-dark"></h4>
                    <span class="badge text-bg-secondary mb-2"></span>
                    <div class="d-flex justify-content-between align-items-center mt-2">
                        <select class="form-select form-select-sm status-select" style="width: auto;">
                            <option value="todo" ${task.status === 'todo' ? 'selected' : ''}>Do zrobienia</option>
                            <option value="in_progress" ${task.status === 'in_progress' ? 'selected' : ''}>W trakcie</option>
                            <option value="done" ${task.status === 'done' ? 'selected' : ''}>Gotowe</option>
                        </select>
                        <button class="btn btn-outline-danger btn-sm delete-btn">Usuń</button>
                    </div>
                </div>
            `;

            // Безпечне додавання тексту (захист від XSS-атак)
            card.querySelector('.card-title').textContent = task.title;
            card.querySelector('.badge').textContent = `Priorytet: ${task.priority}`;

            // Подія зміни статусу завдання
            card.querySelector('.status-select').addEventListener('change', async (e) => {
                const newStatus = e.target.value;
                try {
                    await api(`/tasks/${task.id}`, 'PATCH', { status: newStatus });
                    loadTasks();
                } catch (err) {
                    alert('Nie udało się zmienić statusu');
                }
            });

            // Подія видалення завдання з підтвердженням
            card.querySelector('.delete-btn').addEventListener('click', async () => {
                if (confirm('Czy na pewno chcesz usunąć to zadanie?')) {
                    try {
                        await api(`/tasks/${task.id}`, 'DELETE');
                        loadTasks();
                    } catch (err) {
                        alert('Nie udało się usunąć zadania');
                    }
                }
            });

            column.appendChild(card);
        }
    } catch (err) {
        console.error('Błąd podczas ładowania zadań:', err);
    }
}
