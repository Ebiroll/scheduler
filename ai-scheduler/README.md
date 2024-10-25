```markdown
# AI Scheduler

AI Scheduler is a simple ToDo application built using React. Its primary function is to allow users to manage a list of tasks (todos). Each task has a description and a state (open or completed, with the default state being open). The application provides a straightforward and user-friendly interface for task management.

## Overview

AI Scheduler is a frontend-only web application developed using React. It leverages local storage for data persistence, ensuring that todos are saved between sessions. The application features a responsive and mobile-first interface styled with Bootstrap 5. The project is structured to facilitate easy development and maintenance, with a focus on simplicity and usability.

### Architecture and Technologies

- **React**: A JavaScript library for building user interfaces.
- **Vite**: A fast development server and bundler for modern web applications.
- **Bootstrap 5**: A frontend framework for developing responsive and mobile-first websites.
- **Local Storage**: Used for persisting todos between sessions.
- **React Beautiful DnD**: A library for implementing drag-and-drop functionality to reorder todos.

### Project Structure

- `.eslintrc.cjs`: Configuration for ESLint, a static code analysis tool.
- `.gitignore`: Specifies patterns to exclude files and directories from being tracked by Git.
- `index.html`: Main entry point for the project with a root div element and script tag for `main.jsx`.
- `package.json`: Metadata file specifying dependencies and start scripts.
- `public/.gitkeep`: Empty file to keep the directory in version control.
- `src/App.css`: Styling rules for the root element of the application.
- `src/App.jsx`: Root component of the application, managing the state and rendering the main interface.
- `src/assets/.gitkeep`: Empty file to keep the directory in version control.
- `src/components/AddTodo.jsx`: Component providing the interface for adding new todo items.
- `src/components/DraggableTodoList.jsx`: Component rendering a list of draggable todo items.
- `src/components/TodoList.jsx`: Component rendering a list of todo items.
- `src/index.css`: Global styling rules for the application.
- `src/main.jsx`: Main entry point for the React application, rendering the `App` component.
- `vite.config.js`: Configuration file for Vite.

## Features

- **Display of Todos**: A list that displays all todo items with their description and state (open or completed).
- **Add New Todo**: A button to add a new todo item, prompting the user to enter a description.
- **Toggle State**: Each todo item includes a checkbox to toggle its state between open and completed.
- **Local Storage**: Uses the browser's local storage to persist todos between sessions.
- **Change Order of Todos**: Users can reorder todos via drag-and-drop, with the new order saved to local storage.

## Getting started

### Requirements

To run AI Scheduler, you will need to have the following installed on your computer:

- **Node.js**: JavaScript runtime needed to run the React development tools and build the project.

### Quickstart

1. **Clone the repository**:
    ```sh
    git clone <repository-url>
    cd ai-scheduler
    ```

2. **Install dependencies**:
    ```sh
    npm install
    ```

3. **Run the development server**:
    ```sh
    npm run dev
    ```

4. **Open your browser** and navigate to:
    ```
    http://localhost:3000
    ```

### License

The project is licensed under Apache License v 2.0. 

```
Copyright (c) 2024.
```
```