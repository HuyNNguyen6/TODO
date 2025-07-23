const DEFAULT_ITEM = [{
  id: Date.now(),
  created: Date.now(),
  label: 'Buy Pizza on the way to work'
},
{
  id: Date.now() + 1,
  created: Date.now(),
  label: 'Contrary to popular belief, Lorem Ipsum is not simply just a way to create new desert, and many more'
}, {
  id: Date.now() + 2,
  created: Date.now(),
  label: 'Buy Pizza on the way to work'
},
]

class TodoService {
  #todoList;
  #currentTime;

  constructor() {
    const todos = getFromStorage();
    const currentDate = new Date();
    this.#currentTime = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate()).getTime();
    if (isTodayListEmpty(todos, this.#currentTime)) todos.push(...DEFAULT_ITEM);
    this.#todoList = todos;
  }

  get todos() {
    return this.#todoList.filter(todo => todo.created >= this.#currentTime);
  }

  get overdueTodos() {
    return this.#todoList.filter(todo => isTaskOverDue(todo, this.#currentTime));
  }

  toggleTodoItem(id) {
    const todoIndex = this.#todoList.findIndex(todo => todo.id === id);
    this.#todoList[todoIndex].isChecked = !this.#todoList[todoIndex].isChecked;
    this.#todoList[todoIndex].updated = Date.now();
    saveToStorage(this.#todoList);
  }

  addTodoItem(newItemLabel) {
    const newTodoItem = {
      id: Date.now(),
      created: Date.now(),
      label: newItemLabel,
    };
    this.#todoList.push(newTodoItem);
    saveToStorage(this.#todoList);

    return newTodoItem;
  }
}

function isTodayListEmpty(todo, currentTime) {
  return todo.every(item => item.created < currentTime);
}

function isTaskOverDue(todo, currentTime) {
  return todo.created < currentTime && (!todo.isChecked || todo.updated >= currentTime);
}

function getFromStorage() {
  const storageTodoList = localStorage.getItem('todo');
  return storageTodoList ? JSON.parse(storageTodoList) : [];
}

function saveToStorage(todos) {
  localStorage.setItem('todo', JSON.stringify(todos));
}