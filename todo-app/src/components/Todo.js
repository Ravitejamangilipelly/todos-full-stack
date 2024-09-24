import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Todo = () => {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const fetchTasks = async () => {
    const token = localStorage.getItem('token');
    const { data } = await axios.get('http://localhost:5000/tasks', {
      headers: { Authorization: token }
    });
    setTasks(data);
  };

  const handleCreateTask = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    await axios.post('http://localhost:5000/tasks/create', { title, description, status: 'pending' }, {
      headers: { Authorization: token }
    });
    setTitle('');
    setDescription('');
    fetchTasks();
  };

  const handleDeleteTask = async (taskId) => {
    const token = localStorage.getItem('token');
    await axios.delete(`http://localhost:5000/tasks/${taskId}/delete`, {
      headers: { Authorization: token }
    });
    fetchTasks();
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <div>
      <h2>Todo List</h2>
      <form onSubmit={handleCreateTask}>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Task Title"
          required
        />
        <input
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Task Description"
          required
        />
        <button type="submit">Add Task</button>
      </form>

      <ul>
        {tasks.map(task => (
          <li key={task.id}>
            {task.title} - {task.status}
            <button onClick={() => handleDeleteTask(task.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Todo;
