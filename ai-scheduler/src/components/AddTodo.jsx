import React from 'react';

const AddTodo = ({ addTodo }) => {
  console.log('AddTodo component is rendering');

  const handleAddTodo = () => {
    const description = prompt('Enter a new todo:');
    if (description) {
      try {
        addTodo(description);
        console.log(`Todo added: ${description}`);
      } catch (error) {
        console.error('Error adding todo:', error.message, error.stack);
      }
    }
  };

  return (
    <button onClick={handleAddTodo} className="btn btn-primary mt-3">
      Add New Todo
    </button>
  );
};

export default AddTodo;