import type { Todo } from "./model";

interface TodoItemProps {
  readonly todo: Todo;
  readonly isEditing: boolean;
}

function TodoItem({ todo, isEditing }: TodoItemProps) {
  return (
    <div className="todosItem" data-todo-id={todo.id}>
      <input
        type="checkbox"
        className="todosCompleted"
        checked={todo.completed}
      />
      {isEditing ? (
        <input type="text" className="todosInputValue" value={todo.title} />
      ) : (
        <span className="todosSpanValue">{todo.title}</span>
      )}
      <button className="todosDeleteBtn">-</button>
    </div>
  );
}

export default TodoItem;
