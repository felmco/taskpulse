const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors({ origin: 'http://localhost:5173' }));
app.use(express.json());

let tasks = [];
let nextId = 1;

// GET /tasks — list all tasks
app.get('/tasks', (req, res) => {
  res.json(tasks);
});

// POST /tasks — create a new task
app.post('/tasks', (req, res) => {
  const { title } = req.body;
  if (!title || typeof title !== 'string' || !title.trim()) {
    return res.status(400).json({ error: 'title is required' });
  }
  const task = { id: nextId++, title: title.trim(), completed: false };
  tasks.push(task);
  res.status(201).json(task);
});

// PATCH /tasks/:id — toggle completed
app.patch('/tasks/:id', (req, res) => {
  const id = parseInt(req.params.id, 10);
  const task = tasks.find((t) => t.id === id);
  if (!task) {
    return res.status(404).json({ error: 'task not found' });
  }
  task.completed = !task.completed;
  res.json(task);
});

// DELETE /tasks/:id — remove a task
app.delete('/tasks/:id', (req, res) => {
  const id = parseInt(req.params.id, 10);
  const index = tasks.findIndex((t) => t.id === id);
  if (index === -1) {
    return res.status(404).json({ error: 'task not found' });
  }
  tasks.splice(index, 1);
  res.status(204).send();
});

app.listen(PORT, () => {
  console.log(`TaskPulse API listening on http://localhost:${PORT}`);
});
