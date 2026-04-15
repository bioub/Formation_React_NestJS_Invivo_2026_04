import { useEffect, useRef, useState } from "react";
import "./App.css";
import TodoItem from "./TodoItem";
import type { Todo } from "./model";
import { fetchTodos } from "./api";
import Select, { type MenuRef } from "./Select";

const FILTER_OPTIONS = ['all', 'completed', 'incomplete'];
type Filter = 'all' | 'completed' | 'incomplete';

function App() {
  console.log('App rendered');
  const [newTodo, setNewTodo] = useState("");
  const [todos, setTodos] = useState<Todo[]>([
    // { id: "123abc", title: "ABC", completed: true },
    // { id: "456def", title: "DEF", completed: false },
    // { id: "789xyz", title: "XYZ", completed: true },
  ]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [filter, setFilter] = useState<'all' | 'completed' | 'incomplete'>("all");

  const secondSelectRef = useRef<MenuRef | null>(null);

  useEffect(() => {
    fetchTodos().then((todos) => {
      setTodos(todos);
    });
  }, []);

  useEffect(() => {
    const handleWindowClick = (event: MouseEvent) => {
      console.log('window click', editingId);
      const target = event.target as HTMLElement;
      if (editingId && !target.classList.contains('todosInputValue')) {
        setEditingId(null);
      }
    };
    window.addEventListener("click", handleWindowClick);
    return () => {
      window.removeEventListener("click", handleWindowClick);
    };
  }, [editingId]);

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

  const handleTodoDelete = (todo: Todo) => {
    setTodos(todos.filter((t) => t.id !== todo.id));
  };

  const handleTodoEdit = (todo: Todo) => {
    setTodos(todos.map((t) => t.id === todo.id ? todo : t));
  };

  const handleTodoEditing = (id: string | null) => {
    setEditingId(id);
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
            onDelete={handleTodoDelete}
            onEdit={handleTodoEdit}
            onEditing={handleTodoEditing}
          />
        ))}
      </div>
      <footer>
        <Select options={FILTER_OPTIONS} value={filter} onChange={(v) => {
          setFilter(v as Filter);
          secondSelectRef.current?.open();
        }}/>
        <Select options={FILTER_OPTIONS} value={filter} onChange={(v) => setFilter(v as Filter)} ref={secondSelectRef} />

      </footer>
    </>
  );
}

export default App;
