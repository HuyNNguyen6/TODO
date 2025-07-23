const todoService = new TodoService();
const todoContainerElement = document.querySelector('#todo-list');
const addItemInput = document.querySelector('#task-label');
const submitButton = document.querySelector('#submit-button');

document.querySelector('#overlay').addEventListener('click', toggleModal);
document.querySelector('#add-button').addEventListener('click', toggleModal);
submitButton.addEventListener('click', createTask);

appendTodoListElement();

function appendTodoListElement() {
  const currentDate = new Date();
  const dateELement = document.querySelector('#date');
  const monthElement = document.querySelector('#month');
  const dayELement = document.createElement('b');
  const todoListElement = document.createElement('ul');

  todoListElement.id = 'todo-items';
  dayELement.append(transformDate(currentDate, 'day'));
  dateELement.append(dayELement, ', ', transformDate(currentDate, 'date'));
  monthElement.append(transformDate(currentDate, 'month'));

  todoService.todos.forEach(item => todoListElement.append(appendTaskElement(item)));
  todoContainerElement.append(todoListElement);
  appendOverdueListElement();
}

function appendTaskElement(item) {
  const todoItem = document.createElement('li');
  const checkBox = document.createElement('input');
  const todoLabel = document.createElement('label');
  const labelTooltip = document.createElement('span');

  checkBox.id = item.id;
  checkBox.type = 'checkbox';
  checkBox.checked = item?.isChecked;
  todoLabel.innerText = item.label;
  todoLabel.htmlFor = item.id;
  labelTooltip.innerText = item.label;
  labelTooltip.classList.add('tooltip');
  labelTooltip.id = `tooltip-${item.id}`;

  checkBox.addEventListener('click', () => todoService.toggleTodoItem(item.id));
  todoLabel.addEventListener('mouseenter', (event) => showTooltip(event, item.id));
  todoLabel.addEventListener('mouseleave', () => hideTooltip(item.id));

  todoLabel.append(labelTooltip);
  todoItem.append(checkBox, todoLabel);
  return todoItem;
}

function appendOverdueListElement() {
  if (todoService.overdueTodos.length == 0) return;
  const overdueLabelElement = document.createElement('h3');
  const overdueListElement = document.createElement('ul');

  overdueListElement.id = 'overdue-items';
  overdueLabelElement.innerText = 'Overdue Tasks';
  todoService.overdueTodos.forEach(item => overdueListElement.append(appendTaskElement(item)));
  todoContainerElement.append(overdueLabelElement, overdueListElement);
}

function createTask() {
  if (!!addItemInput.value.trim()) {
    const todoListElement = document.querySelector('#todo-list #todo-items');
    const newItem = todoService.addTodoItem(addItemInput.value.trim());
    todoListElement.append(appendTaskElement(newItem));
    toggleModal();
  }

  return false;
}

function checkButtonValid() {
  submitButton.disabled = !addItemInput.value.trim();
}

function toggleModal() {
  const dialog = document.querySelector('#create-task-modal');
  dialog.classList.toggle('open');
  addItemInput.value = '';
}

function showTooltip(event, idx) {
  const tooltip = document.querySelector(`#tooltip-${idx}`);
  if (!tooltip) return;
  tooltip.style.visibility = 'visible';
  tooltip.style.left = `${event.clientX + 10}px`;
  tooltip.style.top = `${event.clientY + 10}px`;
}

function hideTooltip(idx) {
  const tooltip = document.querySelector(`#tooltip-${idx}`);
  if (!tooltip) return;
  tooltip.style.visibility = 'hidden';
}

function transformDate(value, format) {
  const date = new Date(value);

  if (isNaN(date.getTime())) return '';

  switch (format) {
    case 'day':
      return date.toLocaleDateString('en-US', { weekday: 'long' });
    case 'month':
      return date.toLocaleDateString('en-US', { month: 'long' });
    case 'date':
      return dateWithSuffix(date.getDate());
    default:
      return '';
  }
}

function dateWithSuffix(day) {
  if (day >= 11 && day <= 13) return `${day}th`;
  switch (day % 10) {
    case 1: return `${day}st`
    case 2: return `${day}nd`
    case 3: return `${day}rd`
    default: return `${day}th`
  }
}