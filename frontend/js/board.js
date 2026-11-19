const boardId = new URLSearchParams(window.location.search).get('id') || 1;
const LABELS = { high: 'Wysoki', medium: 'Średni', low: 'Niski' };

// Pobiera zadania (z filtrem) i rysuje karty w trzech kolumnach
async function loadTasks() {
  const priority = document.getElementById('filterPriority').value;
  const query = priority ? `?priority=${priority}` : '';
  const tasks = await api(`/boards/${boardId}/tasks${query}`);

  for (const status of ['todo', 'in_progress', 'done']) {
    const column = document.getElementById(`col-${status}`);
    column.innerHTML = '';
    for (const task of tasks.filter((t) => t.status === status)) {
      const card = document.createElement('div');
      card.className = 'card shadow-sm';
      card.innerHTML = '<div class="card-body p-3"><h3 class="h6"></h3><span class="badge text-bg-light"></span></div>';
      card.querySelector('h3').textContent = task.title; // textContent: bez wstrzykiwania HTML
      card.querySelector('.badge').textContent = 'Priorytet: ' + LABELS[task.priority];
      column.appendChild(card);
    }
  }
}

// Modal Bootstrapa z formularzem nowego zadania
const modal = new bootstrap.Modal('#taskModal');
document.getElementById('newTaskBtn').addEventListener('click', () => modal.show());

document.getElementById('taskForm').addEventListener('submit', async (event) => {
  event.preventDefault();
  const title = document.getElementById('taskTitle');
  if (title.value.trim().length < 3 || title.value.trim().length > 100) {
    title.classList.add('is-invalid'); // czerwone pole + invalid-feedback
    return;
  }
  title.classList.remove('is-invalid');
  await api('/tasks', 'POST', {
    title: title.value.trim(),
    priority: document.getElementById('taskPriority').value,
    boardId: Number(boardId)
  });
  modal.hide();
  event.target.reset();
  loadTasks();
});

document.getElementById('filterPriority').addEventListener('change', loadTasks);

api('/auth/me').then((user) => {
  document.getElementById('userName').textContent = `${user.firstName} ${user.lastName}`;
});
loadTasks();
