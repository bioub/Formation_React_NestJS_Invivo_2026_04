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

## Event et State

Modifier `App` de sorte à ce que `todos` soit défini dans un state (avec `useState`)

Ajouter un nouveau state `newTodo` (avec en valeur par défaut `'ABC'`) et passer `newTodo` à la propriété `value` de `<input type="text" className="todos-new-input" />`

Ecouter ensuite avec `onChange` le changement de valeur dans le champ et stocker dans le state `newTodo` (avec `setNewTodo`) la valeur venant de `event.target.value` (cf slide 143)

Au submit du formulaire (`onSubmit`), appeler `event.preventDefault()` pour désactiver le comportement par défaut du navigateur (qui nous emmènerait vers la page de résultat).

Puis utiliser `setTodos` dans le `handleSubmit` pour ajouter un nouvel élement au tableau en s'inspirant du code suivant :

```
setTodos(
  [
    ...todos,
    { /*  un object avec 3 clés : id (Math.random()), title (la valeur qui venait du champ) et completed (false)  */ }
  ]
)
```

Bonus :

Ecouter le click ou le change de la checkbox :
`<input type="checkbox" className="todos-toggle-checked" />`

Au click cocher/décocher toutes les checkboxes de `TodoItem`.

## Effects

Créer la fonction suivante dans App :

```
async function fetchTodos() {
  const res = await fetch('https://jsonplaceholder.typicode.com/todos');
  const data = await res.json();
  return data
    .slice(0, 20);
}
```

Appeler cette fonction dans un effet au chargement du composant et stocker
les résultats dans le state `todos`

```
fetchTodos().then((todos) => {
  
})
```

## Communication inter-composant

### Exercice 1

Dans `TodoItem`, lorsqu'on clique sur le bouton moins, on doit supprimer la todo
du state todos de `App`

Pour celà on va descendre un fonction déclarée dans `App` via les props de `TodoItem`

Au click du bouton moins, appeler cette fonction avec la todo reçue des props

Déclarer une fonction `handleTodoDelete` dans `App`, qui va supprimer du tableau (de manière immuable) la todo reçue en paramètre

Indice: pour supprimer un ou plusieurs élément en immuable vous pouvez utiliser filter du type Array (slides 168, 169, 170)

### Exercice 2

Au double-click de la balise span, remonter jusqu'à App l'id de la todo dans `editingId` (qui doit être transformé en un state)

### Exercice 3 (Bonus)

Lorsqu'on saisi dans un champ remonter la valeur saisie avec `onTodoEdit`

### Exercice 4 (Bonus)

Ecouter l'événement keydown de l'input, s'il correspond à la touche Entrée, repasser `editingId` à `0` ou `-1`

### Exercice 5 (Bonus)

Transformer le code pour faire en sorte d'appeler `onTodoEdit` lorsqu'on clique sur une checkbox de la liste (doit mettre à jour completed)

### Exercice 6 (Bonus)

Dans App écouter le click de window dans un Effet et remettre editingId à `0` ou `-1`