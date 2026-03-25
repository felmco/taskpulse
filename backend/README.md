# TaskPulse Backend

Express REST API for managing tasks. Data is stored in-memory (resets on restart).

## Setup

```bash
npm install
npm start
```

Server runs on `http://localhost:3001` by default. Set `PORT` env var to override.

## Endpoints

### `GET /tasks`
Returns all tasks.

**Response** `200`
```json
[{ "id": 1, "title": "Buy milk", "completed": false }]
```

---

### `POST /tasks`
Creates a new task.

**Body**
```json
{ "title": "Buy milk" }
```

**Response** `201`
```json
{ "id": 1, "title": "Buy milk", "completed": false }
```

---

### `PATCH /tasks/:id`
Toggles the `completed` field of a task.

**Response** `200`
```json
{ "id": 1, "title": "Buy milk", "completed": true }
```

---

### `DELETE /tasks/:id`
Deletes a task.

**Response** `204 No Content`
