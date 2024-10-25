import React from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

const DraggableTodoList = ({ todos, toggleTodo, onDragEnd }) => {
  console.log('DraggableTodoList props:', { todos });

  if (!Array.isArray(todos) || todos.length === 0) {
    return <p>No todos available</p>;
  }

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="todos">
        {(provided, snapshot) => (
          <ul
            {...provided.droppableProps}
            ref={provided.innerRef}
            className="list-group mt-3"
          >
            {todos.map((todo, index) => (
              <Draggable key={todo.id} draggableId={todo.id.toString()} index={index}>
                {(provided) => {
                  console.log(`Draggable for todo ${todo.id} provided:`, provided);
                  return (
                    <li
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      className="list-group-item d-flex justify-content-between align-items-center"
                    >
                      <div>
                        <input
                          type="checkbox"
                          checked={todo.completed}
                          onChange={() => {
                            try {
                              toggleTodo(index);
                              console.log(`Todo toggled at index: ${index}`);
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
                  );
                }}
              </Draggable>
            ))}
            {provided.placeholder}
          </ul>
        )}
      </Droppable>
    </DragDropContext>
  );
};

export default DraggableTodoList;