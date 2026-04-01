const taskList = document.getElementById('task-list');
const taskCount = document.getElementById('task-count');
const form = document.getElementById('task-form');
const input = document.getElementById('task-title');
const status = document.getElementById('status');

const API_BASE = '/api/tasks';

function setStatus(message, isError = false) {
  status.textContent = message;
  status.classList.toggle('status--error', isError);
}

function renderTasks(tasks) {
  taskList.innerHTML = '';
  taskCount.textContent = `${tasks.length}件`;

  if (tasks.length === 0) {
    const empty = document.createElement('li');
    empty.className = 'task-list__empty';
    empty.textContent = 'タスクがありません。';
    taskList.appendChild(empty);
    return;
  }

  tasks.forEach((task) => {
    const item = document.createElement('li');
    item.className = 'task-item';

    const label = document.createElement('label');
    label.className = 'task-item__label';

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.checked = task.completed;
    checkbox.addEventListener('change', () => toggleTask(task.id, checkbox.checked));

    const title = document.createElement('span');
    title.textContent = task.title;
    if (task.completed) {
      title.classList.add('task-item__title--done');
    }

    label.appendChild(checkbox);
    label.appendChild(title);

    const meta = document.createElement('span');
    meta.className = 'task-item__meta';
    meta.textContent = new Date(task.createdAt).toLocaleString();

    const remove = document.createElement('button');
    remove.type = 'button';
    remove.className = 'task-item__remove';
    remove.textContent = '削除';
    remove.addEventListener('click', () => deleteTask(task.id));

    item.appendChild(label);
    item.appendChild(meta);
    item.appendChild(remove);
    taskList.appendChild(item);
  });
}

async function loadTasks() {
  try {
    const res = await fetch(API_BASE);
    if (!res.ok) {
      throw new Error('一覧の取得に失敗しました。');
    }
    const tasks = await res.json();
    renderTasks(tasks);
    setStatus('');
  } catch (error) {
    setStatus(error.message, true);
  }
}

async function createTask(title) {
  const res = await fetch(API_BASE, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ title })
  });

  if (!res.ok) {
    const data = await res.json().catch(() => ({}));
    throw new Error(data.error?.message || '追加に失敗しました。');
  }
}

async function toggleTask(id, completed) {
  try {
    const res = await fetch(`${API_BASE}/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ completed })
    });

    if (!res.ok) {
      const data = await res.json().catch(() => ({}));
      throw new Error(data.error?.message || '更新に失敗しました。');
    }

    await loadTasks();
  } catch (error) {
    setStatus(error.message, true);
  }
}

async function deleteTask(id) {
  try {
    const res = await fetch(`${API_BASE}/${id}`, {
      method: 'DELETE'
    });

    if (!res.ok) {
      const data = await res.json().catch(() => ({}));
      throw new Error(data.error?.message || '削除に失敗しました。');
    }

    await loadTasks();
  } catch (error) {
    setStatus(error.message, true);
  }
}

form.addEventListener('submit', async (event) => {
  event.preventDefault();
  const title = input.value.trim();
  if (!title) {
    setStatus('タイトルを入力してください。', true);
    return;
  }

  try {
    await createTask(title);
    input.value = '';
    await loadTasks();
  } catch (error) {
    setStatus(error.message, true);
  }
});

loadTasks();
