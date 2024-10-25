import React from 'react';

const TodoList = ({ todos, toggleTodo }) => {
  console.log('TodoList component is rendering', todos);
  return (
    <ul className="list-group mt-3">
      {todos.map((todo, index) => (
        <li key={index} className="list-group-item d-flex justify-content-between align-items-center">
          <div>
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() => {
                try {
                  toggleTodo(index);
                } catch (error) {
                  console.error('Error toggling todo:', error.message, error.stack);
                }
              }}
              className="form-check-input me-2"
            />
            <span className={todo.completed ? 'text-decoration-line-through' : ''}>
              {todo.description}
            </span>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default TodoList;