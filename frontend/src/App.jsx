import { useState, useEffect } from 'react'

const API = 'http://localhost:3000'

export default function App() {
  const [tasks, setTasks] = useState([])
  const [input, setInput] = useState('')
  const [error, setError] = useState(null)

  useEffect(() => {
    fetchTasks()
  }, [])

  async function fetchTasks() {
    try {
      const res = await fetch(`${API}/tasks`)
      if (!res.ok) throw new Error('Failed to fetch tasks')
      const data = await res.json()
      setTasks(data)
      setError(null)
    } catch (e) {
      setError(e.message)
    }
  }

  async function addTask() {
    const title = input.trim()
    if (!title) return
    try {
      const res = await fetch(`${API}/tasks`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title }),
      })
      if (!res.ok) throw new Error('Failed to add task')
      const task = await res.json()
      setTasks(prev => [...prev, task])
      setInput('')
      setError(null)
    } catch (e) {
      setError(e.message)
    }
  }

  async function toggleTask(id, completed) {
    try {
      const res = await fetch(`${API}/tasks/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ completed: !completed }),
      })
      if (!res.ok) throw new Error('Failed to update task')
      const updated = await res.json()
      setTasks(prev => prev.map(t => t.id === id ? updated : t))
      setError(null)
    } catch (e) {
      setError(e.message)
    }
  }

  async function deleteTask(id) {
    try {
      const res = await fetch(`${API}/tasks/${id}`, { method: 'DELETE' })
      if (!res.ok) throw new Error('Failed to delete task')
      setTasks(prev => prev.filter(t => t.id !== id))
      setError(null)
    } catch (e) {
      setError(e.message)
    }
  }

  function handleKeyDown(e) {
    if (e.key === 'Enter') addTask()
  }

  const s = {
    container: { maxWidth: 600, margin: '40px auto', fontFamily: 'sans-serif', padding: '0 16px' },
    heading: { fontSize: 28, fontWeight: 700, marginBottom: 24 },
    row: { display: 'flex', gap: 8, marginBottom: 24 },
    input: { flex: 1, padding: '8px 12px', fontSize: 16, border: '1px solid #ccc', borderRadius: 6, outline: 'none' },
    addBtn: { padding: '8px 16px', fontSize: 16, background: '#2563eb', color: '#fff', border: 'none', borderRadius: 6, cursor: 'pointer' },
    error: { color: '#dc2626', marginBottom: 16 },
    empty: { color: '#6b7280' },
    list: { listStyle: 'none', padding: 0, margin: 0 },
    item: { display: 'flex', alignItems: 'center', gap: 12, padding: '12px 0', borderBottom: '1px solid #e5e7eb' },
    title: done => ({ flex: 1, fontSize: 16, textDecoration: done ? 'line-through' : 'none', color: done ? '#9ca3af' : '#111827' }),
    completeBtn: done => ({ padding: '4px 10px', fontSize: 13, border: '1px solid', borderColor: done ? '#9ca3af' : '#2563eb', color: done ? '#9ca3af' : '#2563eb', background: 'transparent', borderRadius: 4, cursor: 'pointer' }),
    deleteBtn: { padding: '4px 10px', fontSize: 13, border: '1px solid #dc2626', color: '#dc2626', background: 'transparent', borderRadius: 4, cursor: 'pointer' },
  }

  return (
    <div style={s.container}>
      <h1 style={s.heading}>TaskPulse</h1>

      <div style={s.row}>
        <input
          style={s.input}
          type="text"
          placeholder="Add a new task..."
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <button style={s.addBtn} onClick={addTask}>Add</button>
      </div>

      {error && <p style={s.error}>{error}</p>}

      {tasks.length === 0 ? (
        <p style={s.empty}>No tasks yet. Add one above!</p>
      ) : (
        <ul style={s.list}>
          {tasks.map(task => (
            <li key={task.id} style={s.item}>
              <span style={s.title(task.completed)}>{task.title}</span>
              <button style={s.completeBtn(task.completed)} onClick={() => toggleTask(task.id, task.completed)}>
                {task.completed ? 'Undo' : 'Done'}
              </button>
              <button style={s.deleteBtn} onClick={() => deleteTask(task.id)}>Delete</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
