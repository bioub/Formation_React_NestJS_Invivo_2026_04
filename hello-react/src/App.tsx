import './App.css';
import TodoItem from './TodoItem';

function App() {

  const todos = [
    { id: '123abc', title: 'ABC', completed: true },
    { id: '456def', title: 'DEF', completed: false },
    { id: '789xyz', title: 'XYZ', completed: true },
  ];
  const editingId = '789xyz';

  return (
    <>
      <form className="todos-form">
        <input type="checkbox" className="todos-toggle-checked" />
        <input type="text" className="todos-new-input" />
        <button>+</button>
      </form>
      <div className="todos-container">
        {todos.map((todo) => (
          <TodoItem key={todo.id} todo={todo} isEditing={editingId === todo.id} />
        ))}
      </div>
    </>
  );
}

export default App;
