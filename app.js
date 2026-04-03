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
  }
}