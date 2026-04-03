async function fetchAndRenderTasks() {
  try {
    const response = await fetch('/api/tasks');
    if (!response.ok) throw new Error('Failed to fetch tasks');
    const tasks = await response.json();
    const taskList = document.getElementById('task-list');
    taskList.innerHTML = '';
    tasks.forEach(task => {
      const taskCard = document.createElement('div');
      taskCard.className = 'task-card';
      taskCard.innerHTML = `
        <h3>${task.title}</h3>
        <p>${task.description}</p>
      `;
      taskList.appendChild(taskCard);
    });
  } catch (error) {
    console.error('Error fetching tasks:', error);
    alert('Failed to fetch tasks');
  }
}

async function handleFormSubmit(event) {
  event.preventDefault();
  const title = document.getElementById('title').value;
  const description = document.getElementById('description').value;
  try {
    const response = await fetch('/api/tasks', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ title, description })
    });
    if (!response.ok) throw new Error('Failed to add task');
    document.getElementById('task-form').reset();
    fetchAndRenderTasks();
  } catch (error) {
    console.error('Error adding task:', error);
    alert('Failed to add task');
  }
}

async function deleteTask(taskId) {
  try {
    const response = await fetch(`/api/tasks/${taskId}`, {
      method: 'DELETE'
    });
    if (!response.ok) throw new Error('Failed to delete task');
    fetchAndRenderTasks();
  } catch (error) {
    console.error('Error deleting task:', error);
    alert('Failed to delete task');
  }
}