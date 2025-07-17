import { TodoService } from "./todo.service.js";

const todoService = new TodoService();
const listE = document.querySelector('#todo-list ul');
const addItemInput = document.getElementById('task-label');
const submitButton = document.getElementById('submit-button');

document.getElementById('overlay').addEventListener('click', toggleModal);
document.getElementById('add-button').addEventListener('click', toggleModal);
submitButton.addEventListener('click', createTask);
addItemInput.addEventListener('input', checkValid);

appendDataToDOM();

function appendDataToDOM() {
  const currentDate = new Date();
  const date = document.getElementById('date');
  const month = document.getElementById('month')
  const b = document.createElement('b');

  b.append(transform(currentDate, 'day'));
  date.append(b, ', ', transform(currentDate, 'date'));
  month.append(transform(currentDate, 'month'))

  todoService.todos.forEach(item => appendTaskElement(item));
}

function appendTaskElement(item) {
  let li = document.createElement('li');
  let input = document.createElement('input');
  let label = document.createElement('label');
  let span = document.createElement('span');

  input.id = item.id;
  input.type = 'checkbox';
  input.checked = item?.marked;
  label.innerText = item.label;
  label.htmlFor = item.id;
  span.innerText = item.label;
  span.classList.add('tooltip');
  span.id = 'tooltip-' + item.id;

  input.addEventListener('click', () => todoService.toggleItem(item.id));
  label.addEventListener('mouseenter', (event) => showTooltip(event, item.id));
  label.addEventListener('mouseleave', () => hideTooltip(item.id))

  label.append(span);
  li.append(input, label);
  listE.append(li);
}

function createTask() {
  if (!addItemInput.value.trim()) return;
  const newItem = todoService.addItem(addItemInput.value.trim());
  appendTaskElement(newItem);
  addItemInput.value = "";
  checkValid();
  toggleModal();
}

function checkValid() {
  if (!addItemInput.value.trim()) {
    submitButton.disabled = true;
  } else {
    submitButton.disabled = false;
  }
}

function toggleModal() {
  const dialog = document.getElementById("create-task-modal");
  dialog.classList.toggle('open');
}

function showTooltip(event, idx) {
  const tooltip = document.getElementById(`tooltip-${idx}`);
  if (!tooltip) return;
  tooltip.style.visibility = 'visible';
  tooltip.style.left = `${event.clientX + 10}px`;
  tooltip.style.top = `${event.clientY + 10}px`;
}

function hideTooltip(idx) {
  const tooltip = document.getElementById(`tooltip-${idx}`);
  if (!tooltip) return;
  tooltip.style.visibility = 'hidden';
}

function transform(value, format) {
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