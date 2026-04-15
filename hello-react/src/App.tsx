import { useState } from "react";
import "./App.css";
import TodoItem from "./TodoItem";
import type { Todo } from "./model";

function App() {
  const [newTodo, setNewTodo] = useState("");
  const [todos, setTodos] = useState<Todo[]>([
    { id: "123abc", title: "ABC", completed: true },
    { id: "456def", title: "DEF", completed: false },
    { id: "789xyz", title: "XYZ", completed: true },
  ]);
  const editingId = "789xyz";

  const handleNewTodoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewTodo(event.target.value);
  };

  const handleNewTodoSubmit = (event: React.SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();
    setTodos([
      ...todos,
      { id: Math.random().toString(), title: newTodo, completed: false },
    ]);
    setNewTodo("");
  };

  const handleToggleAll = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTodos(
      todos.map((todo) =>
        todo.completed === event.target.checked
          ? todo
          : { ...todo, completed: event.target.checked },
      ),
    );
  };

  return (
    <>
      <form className="todos-form" onSubmit={handleNewTodoSubmit}>
        <input
          type="checkbox"
          className="todos-toggle-checked"
          onChange={handleToggleAll}
        />
        <input
          type="text"
          className="todos-new-input"
          value={newTodo}
          onChange={handleNewTodoChange}
        />
        <button>+</button>
      </form>
      <div className="todos-container">
        {todos.map((todo) => (
          <TodoItem
            key={todo.id}
            todo={todo}
            isEditing={editingId === todo.id}
          />
        ))}
      </div>
    </>
  );
}

export default App;
