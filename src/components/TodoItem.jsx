// src/components/TodoItem.js
import React from 'react';


const TodoItem = ({ todo, onStatusChange, onDelete }) => {
  const statusOptions = [
    { value: 'pending', label: 'Pending' },
    { value: 'in_progress', label: 'In Progress' },
    { value: 'completed', label: 'Completed' },
  ];

  const handleStatusChange = (e) => {
    onStatusChange(todo.id, e.target.value);
  };

  return (
    <div className={`todo-item todo-${todo.status}`}>
      <div className="todo-content">
        <h3>{todo.title}</h3>
        {todo.description && <p>{todo.description}</p>}
        <div className="todo-meta">
          <span className="todo-date">
            Created: {new Date(todo.created_at).toLocaleDateString()}
          </span>
        </div>
      </div>
      
      <div className="todo-actions">
        <select 
          value={todo.status} 
          onChange={handleStatusChange}
          className="status-select"
        >
          {statusOptions.map(option => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        
        <button 
          onClick={() => onDelete(todo.id)} 
          className="delete-btn"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default TodoItem;