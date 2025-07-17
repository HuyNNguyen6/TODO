const DEFAULT_ITEM = [{
  id: 1,
  label: 'Buy Pizza on the way to work'
},
{
  id: 2,
  label: 'Contrary to popular belief, Lorem Ipsum is not simply just a way to create new desert, and many more'
}, {
  id: 3,
  label: 'Buy Pizza on the way to work'
},
]

export class TodoService {
  #todoList;
  #currentDate;

  constructor() {
    const initialData = this.#getFromStorage() ?? [];
    this.#currentDate = new Date().toLocaleString().split(",")[0];
    if (!initialData.some(item => item.date === this.#currentDate)) initialData.push({
      date: this.#currentDate,
      items: DEFAULT_ITEM
    })
    this.#todoList = initialData;
  }

  get todos() {
    return this.#todoList.find(item => item.date === this.#currentDate)?.items ?? DEFAULT_ITEM;
  }

  #getFromStorage() {
    const raw = localStorage.getItem('todo');
    return raw ? JSON.parse(raw) : [];
  }

  #saveToStorage(todos) {
    localStorage.setItem('todo', JSON.stringify(todos));
    this.#todoList = todos;
  }

  toggleItem(id) {
    const updated = this.#todoList.map(item => {
      if (item.date === this.#currentDate) {
        item.items = item.items.map(task => {
          if (task.id === id) task.marked = !task.marked;
          return task;
        });
      }
      return item;
    });

    this.#saveToStorage(updated);
  }

  addItem(addItem) {
    let newItem;
    const updateList = this.#todoList.map(item => {
      if (item.date === this.#currentDate) {
        newItem = {
          id: Math.random().toString(36).substring(2, 2 + 8),
          label: addItem,
        }
        item.items.push(newItem);
      }
      return item;
    })

    this.#saveToStorage(updateList);
    return newItem;
  }
}