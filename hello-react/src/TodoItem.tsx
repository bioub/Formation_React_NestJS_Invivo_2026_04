import type { Todo } from "./model";

interface TodoItemProps {
  readonly todo: Todo;
  readonly isEditing: boolean;
  readonly onDelete: (todo: Todo) => void;
  readonly onEdit: (todo: Todo) => void;
  readonly onEditing: (id: string | null) => void;
}

function TodoItem({ todo, isEditing, onDelete, onEdit, onEditing }: TodoItemProps) {
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      onEditing(null);
    }
  };

  return (
    <div className="todosItem" data-todo-id={todo.id}>
      <input
        type="checkbox"
        className="todosCompleted"
        checked={todo.completed}
        onChange={() => onEdit({...todo, completed: !todo.completed})}
      />
      {isEditing ? (
        <input type="text" className="todosInputValue" value={todo.title} onChange={(e) => onEdit({...todo, title: e.target.value})} onKeyDown={handleKeyDown} />
      ) : (
        <span className="todosSpanValue" onDoubleClick={() => onEditing(todo.id)}>{todo.title}</span>
      )}
      <button className="todosDeleteBtn" onClick={() => onDelete(todo)}>-</button>
    </div>
  );
}

export default TodoItem;
