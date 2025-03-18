import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import TodoForm from '../TodoForm';

describe('TodoForm', () => {
  test('renders form elements', () => {
    render(<TodoForm onAddTodo={() => {}} />);
    
    expect(screen.getByLabelText(/title/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/description/i)).toBeInTheDocument();
    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  test('submit button is disabled when title is empty', () => {
    render(<TodoForm onAddTodo={() => {}} />);
    
    const submitButton = screen.getByRole('button');
    expect(submitButton).toBeDisabled();
  });

  test('calls onAddTodo when form is submitted', async () => {
    const mockOnAddTodo = jest.fn();
    render(<TodoForm onAddTodo={mockOnAddTodo} />);
    
    fireEvent.change(screen.getByLabelText(/title/i), {
      target: { value: 'Test Todo' },
    });
    
    fireEvent.submit(screen.getByRole('form'));
    
    expect(mockOnAddTodo).toHaveBeenCalledWith({
      title: 'Test Todo',
      description: '',
      status: 'pending'
    });
  });
});