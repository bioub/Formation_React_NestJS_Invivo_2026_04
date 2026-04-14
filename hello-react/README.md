# Exercices

## Vite

Créer un nouveau projet React avec Vite appelé `todos-react`.

## JSX

Reprendre le HTML suivant et le transformer en JSX dans `App.tsx` :

```
<form class="todos-form">
  <input type="checkbox" class="todos-toggle-checked">
  <input type="text" class="todos-new-input">
  <button>+</button>
</form>
<div class="todos-container"></div>
```

Créer ensuite 3 composants en TypeScript `TodoItem` (remplace `createTodo`), `TodoSpanValue` (remplace `createSpanValue`) et `TodoInputValue` (remplace `createInputValue`) dans les 3 fichiers séparés qui traduit le code suivant (DOM) en JSX :

```
export function createTodo() {
  const rowEl = document.createElement('div');
  rowEl.className = 'todosItem';
  rowEl.dataset.todoId = '123abc';

  const checkboxEl = document.createElement('input');
  checkboxEl.type = 'checkbox';
  checkboxEl.className = 'todosCompleted';
  checkboxEl.checked = true;

  const spanEl = createSpanValue();

  const buttonEl = document.createElement('button');
  buttonEl.className = 'todosDeleteBtn';
  buttonEl.innerText = '-';

  rowEl.append(checkboxEl, ' ', spanEl, ' ', buttonEl);

  return rowEl;
}

export function createSpanValue() {
  const spanEl = document.createElement('span');
  spanEl.className = 'todosSpanValue';
  spanEl.innerText = 'ABC';
  return spanEl;
}

export function createInputValue() {
  const inputEl = document.createElement('input');
  inputEl.className = 'todosInputValue';
  inputEl.value = 'ABC';
  return inputEl;
}
```

Les innerText sont à remplacer en écrivant au milieu d'une balise JSX
ex: `<button>-</button>`

`rowEl.dataset.todoId` s'écrit comme en HTML : `<div data-todo-id="">`

En JSX, on passe une expression autre qu'une constante de type string comme ceci :

```
<input type="text" checked={true}>
<div>{todo.title}</div>
<input type="text" checked={todo.completed}>
```

Enfin utiliser `TodoItem` 3 fois dans `App`

```
<div class="todos-container">
  <TodoItem />
  <TodoItem />
  <TodoItem />
</div>
```

## Props

Déclarer une prop `todo` dans `TodoItem`.

```
<TodoItem todo={} >
```

Cette prop doit être un objet avec 3 clés :
- `id` de type `number`
- `title` de type `string`
- `completed` de type `boolean`

Créer une interface pour la typer, et typer également Props de TodoItem.

Dans `App` passer ensuite un objet d'exemple différent à chaque `<TodoItem />` par exemple :

```
{ id: 123, title: 'ABC', completed: false }
```

Modifier le code de `TodoItem` de façon à :
- affecter `id` à `data-todo-id`
- affecter `completed` à la propriété `checked` de la checkbox
- passer `title` en prop de `<TodoSpanValue />`

Déclarer ensuite la prop `title` dans `TodoSpanValue` et l'afficher dans la balise `<span>`

Faire de même pour `TodoInputValue` qui n'est pas encore utilisé.

## JSX conditionnel et listes

Ajouter une prop `isEditing` au composant `TodoItem`, elle doit être optionnelle, de type boolean et avoir en valeur par défault `false`.

Dans le JSX de `TodoItem` si `isEditing` vaut `false`, continuer d'afficher le composant `TodoSpanValue`, par contre si `isEditing` vaut `true` afficher le composant `TodoInputValue`.

Tester depuis `App` que les composants s'affichent correctement si on passe `isEditing={true}` ou `isEditing={false}` à `TodoItem`

Créer dans `App` les 2 variables suivantes :

```
const todos = [
  { id: 123, title: 'ABC', completed: false },
  { id: 456, title: 'DEF', completed: true },
  { id: 789, title: 'XYZ', completed: false },
];
const editingId = 789;
```

Transformer le JSX de `App` pour qu'il dépende de ces variables