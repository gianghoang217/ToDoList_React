import React, { useState, useEffect } from 'react';
import { todoService } from '../services/api';
import TodoItem from './TodoItem';
import TodoForm from './TodoForm';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

const TodoList = () => {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();  // <-- useNavigate replaces useHistory

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');  // <-- use navigate instead of history.push
      return;
    }
    
    fetchTodos();
  }, [isAuthenticated, navigate]);

  const fetchTodos = async () => {
    try {
      const data = await todoService.getAllTodos();
      setTodos(data);
      setError(null);
    } catch (err) {
      setError('Failed to fetch todos');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/login');  // <-- use navigate instead of history.push
    } catch (err) {
      console.error('Logout failed:', err);
    }
  };

  const handleAddTodo = async (newTodo) => {
    try {
      const addedTodo = await todoService.createTodo(newTodo);
      setTodos([addedTodo, ...todos]);
    } catch (err) {
      setError('Failed to add todo');
      console.error(err);
    }
  };

  const handleUpdateStatus = async (id, newStatus) => {
    try {
      const updatedTodo = await todoService.changeTodoStatus(id, newStatus);
      setTodos(todos.map(todo => todo.id === id ? updatedTodo : todo));
    } catch (err) {
      setError('Failed to update todo status');
      console.error(err);
    }
  };

  const handleDeleteTodo = async (id) => {
    try {
      await todoService.deleteTodo(id);
      setTodos(todos.filter(todo => todo.id !== id));
    } catch (err) {
      setError('Failed to delete todo');
      console.error(err);
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="todo-container">
      <div className="todo-header">
        <h1>Todo List</h1>
        <button onClick={handleLogout} className="logout-btn">Logout</button>
      </div>
      
      {error && <div className="error-message">{error}</div>}
      
      <TodoForm onAddTodo={handleAddTodo} />
      
      <div className="todo-list">
        {todos.length === 0 ? (
          <p>No todos yet. Add one above!</p>
        ) : (
          todos.map(todo => (
            <TodoItem
              key={todo.id}
              todo={todo}
              onStatusChange={handleUpdateStatus}
              onDelete={handleDeleteTodo}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default TodoList;
