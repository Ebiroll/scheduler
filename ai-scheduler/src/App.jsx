import React, { useState, useEffect } from 'react';
import './App.css';
import DraggableTodoList from './components/DraggableTodoList';
import AddTodo from './components/AddTodo';
import SmsComponent from './components/SmsComponent'; // P6e84

function App() {
  console.log('App component is rendering');
  // To clear old.  localStorage.removeItem('todos');
  const [todos, setTodos] = useState(() => {
    const savedTodos = JSON.parse(localStorage.getItem('todos')) || [];
    console.log('Initial todos state:', savedTodos);
    return savedTodos;
  });

  // Migration step: Ensure all todos have an `id` field
  useEffect(() => {
    const updatedTodos = todos.map(todo => {
      if (!todo.id) {
        return { ...todo, id: Date.now().toString() + Math.random().toString(36).substr(2, 9) };
      }
      return todo;
    });
    setTodos(updatedTodos);
  }, []);

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
    console.log('Todos updated in localStorage');
  }, [todos]);

  const addTodo = (description) => {
    const newTodo = { id: Date.now().toString(), description, completed: false };
    setTodos([...todos, newTodo]);
    console.log(`Todo added: ${description}`);
  };

  const toggleTodo = (index) => {
    const newTodos = [...todos];
    newTodos[index].completed = !newTodos[index].completed;
    setTodos(newTodos);
    console.log(`Todo toggled: ${newTodos[index].description}`);
  };

  const onDragEnd = (result) => {
    console.log('handleDragEnd called with:', result);
    if (!result.destination) {
      console.log('No destination found');
      return;
    }

    const newTodos = Array.from(todos);
    const [reorderedTodo] = newTodos.splice(result.source.index, 1);
    newTodos.splice(result.destination.index, 0, reorderedTodo);

    setTodos(newTodos);
    console.log('Todos reordered');
  };

  return (
    <div className="container">
      <h1 className="mt-4 mb-4">AI Scheduler</h1>
      <AddTodo addTodo={addTodo} />
      <DraggableTodoList todos={todos} toggleTodo={toggleTodo} onDragEnd={onDragEnd} />
      <SmsComponent /> {/* P6e84 */}
    </div>
  );
}

export default App;
