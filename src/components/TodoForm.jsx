// src/components/TodoForm.js

import React, { useState } from 'react';

const TodoForm = ({ onAddTodo }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim()) return;
    
    setIsSubmitting(true);
    
    try {
      await onAddTodo({
        title,
        description,
        status: 'pending'
      });
      // Reset form
      setTitle('');
      setDescription('');
    } catch (err) {
      console.error('Error adding todo:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="todo-form">
      <h2>Add New Todo</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="title">Title:</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="What needs to be done?"
            required
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="description">Description (optional):</label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Add details..."
            rows="3"
          />
        </div>
        
        <button 
          type="submit" 
          disabled={isSubmitting || !title.trim()}
        >
          {isSubmitting ? 'Adding...' : 'Add Todo'}
        </button>
      </form>
    </div>
  );
};

export default TodoForm;