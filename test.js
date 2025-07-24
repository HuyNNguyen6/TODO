//Object
//Task 2
const isEmpty = (obj = {}) => {
  return Object.keys(obj).length === 0;
}

console.log(isEmpty({}))
// Task 3
const sumObj = (obj) => {
  let sum = 0
  for (let key in obj) {
    sum += obj[key]
  }
  return sum
}
// Task 4
const multiple = (obj) => {
  for (let key in obj) {
    if (typeof (obj[key]) === "number") obj[key] = obj[key] * 2
  }
}

//method
//task 2
let calculator = {
  a: 1,
  b: 2,
  read: function () {
    this.a = Number(prompt('a'));
    this.b = Number(prompt('b'));
  },
  sum: function () { return this.a + this.b },
  mul: function () { return this.a * this.b }

}
// task 3
let ladder = {
  step: 0,
  up() {
    this.step++;
    return this;
  },
  down() {
    this.step--;
    return this;
  },
  showStep: function () { // shows the current step
    alert(this.step);
    return this;
  }
};

ladder.up().up().down().showStep().down().showStep();

// new constructor
// task 1
let obj = {}
function A() { return obj }
function B() { return obj }

let a = new A();
let b = new B();

alert(a == b); // true

//task 2
function Calculator() {
  this.read = function () {
    this.a = Number(prompt('a'));
    this.b = Number(prompt('b'));
  };
  this.sum = function () { return this.a + this.b };
  this.mul = function () { return this.a * this.b }

}
let calculator = new Calculator();
calculator.read();

alert(`Sum=${calculator.sum()}`);
alert(`Mul=${calculator.mul()}`);
//task 3
function Accumulator(initialVal) {
  this.value = initialVal;
  this.read = function () {
    this.value += Number(prompt('a'));
  };

}
let accumulator = new Accumulator(1); // initial value 1

accumulator.read(); // adds the user-entered value
accumulator.read(); // adds the user-entered value

alert(accumulator.value); // shows the sum of these values

//Number
//task 1 
const a = Number(prompt("a"))
const b = Number(prompt("b"))

alert(a + b)

//task 2
function loopnum() {
  let a = 'a';
  while (!isFinite(a)) {
    const read = prompt('a');
    if (!isNaN(read)) return Number(read);
    if (read === null) return null
    a = read;
  }
}

//Array
//Task 2
let styles = ["Jazz", "Blues"];
styles.push("Rock-n-Roll");
styles[Math.floor((styles.length - 1) / 2)] = "Classics";
const take = styles.shift()
styles.unshift("Rap", "Reggae");
//Task 3
function suminput() {
  const a = [];
  while (true) {
    const read = prompt('enter number');
    if (isNaN(read) || read === '' || read === null) break;
    a.push(Number(read))
  }
  return a.reduce((prev, curr) => prev + curr, 0);
}

//Task 4
function maxSum(arr) {
  let maxSum = 0;
  let partSum = 0;
  for (let i of arr) {
    partSum += i
    maxSum = Math.max(maxSum, partSum);
    if (partSum < 0) partSum = 0
  }
  return maxSum
}

//Map - Set

//task 1
function unique(arr) {
  return Array.from(new Set(arr));
}
//task 2
function aclean(arr = ['']) {
  let a = new Set();
  let anagram = new Set();

  arr.forEach(item => {
    const anagramItem = item.toLowerCase().split('').sort().toString();
    if (!anagram.has(anagramItem)) a.add(item);
    anagram.add(anagramItem);
  })
  return Array.from(a);
}
//task 3
let map = new Map();
let iterate = map.keys();

map.set("name", "John");

let keys = [...map.keys()];

// Error: keys.push is not a function
keys.push("more");

// weak map-set
// task 1
let messages = [
  { text: "Hello", from: "John" },
  { text: "How goes?", from: "John" },
  { text: "See you soon", from: "Alice" }
];

messages.keys()

const set = new WeakSet(messages[0]);

// task 2
let mapweak = new WeakMap();

mapweak.set(messages[0], new Date());

//Object.keys

//task 1
let salaries = {
  "John": 100,
  "Pete": 300,
  "Mary": 250
};
Object.values(salaries).reduce((prev, res) => prev + res, 0);

// task 2 
function count(obj) {
  return Object.keys(obj).length;
}
// destructing
//task 1
let user = {
  name: "John",
  years: 30
};

const { name, years: age, isAdmin = false } = user

//task 2
let max = 0
let salaries2 = {
  "John": 100,
  "Pete": 300,
  "Mary": 250
};
Object.entries(salaries2).forEach(([key, val]) => {
  max = Math.max(max, val);
})

// Date
//task 4
function getLastDayofMonth(year, month) {
  return new Date(year, month + 1, 0)
}

// Recursion
//task 1
function SumTo(n) {
  if (n == 1) return n;
  return n + SumTo(n - 1);
}
//task 2
function factorial(n) {
  if (n == 1) return n;
  return n * factorial(n - 1);
}

//task 3

function fib(n) {
  return n <= 1 ? 1 : fib(n - 2) + fib(n - 1)
}

//task 4

let list = {
  value: 1,
  next: {
    value: 2,
    next: {
      value: 3,
      next: {
        value: 4,
        next: null
      }
    }
  }
};

function flaten(list) {
  let arr = list
  const mew = []
  while (true) {
    mew.shift(arr.value)
    arr = arr.next;
    if (!arr.next) break;
  }
  return mew;
}

function flatenCursion(list) {
  if (!list.next) return [list.value];
  return [list.value, ...flatenCursion(list.next)]
}

// closure
// task 4
function sum(a) {

  return function (b) {
    return a + b
  }
}
//task 10
function makeArmy() {
  let shooters = [];
  for (let i = 0; i < 10; i++) {
    let shooter = function () { // create a shooter function,
      alert(i); // that should show its number
    };
    shooters.push(shooter); // and add it to the array
  }

  // ...and return the array of shooters
  return shooters;
}

let army = makeArmy();

// all shooters show 10 instead of their numbers 0, 1, 2, 3...
army[0](); // 10 from the shooter number 0
army[1](); // 10 from the shooter number 1
army[2](); // 10 ...and so on.


//function object

//task 1
function makeCounter() {
  let count = 0;
  function counter() {
    return count++;
  }

  counter.set = value => count = value;
  counter.decrease = () => count--;
  return counter;
}

//task 2

function sum(n) {
  let current = n;
  function next(m) {
    current += m
    return next;
  }

  next.toString = function () {
    return current
  };
  return next;

}

// decorator
let worker = {
  someMethod() {
    return 1;
  },

  slow(x) {
    console.log(`Called with ${x}`);
    return x * this.someMethod(); // (*)
  }
};

function cachingDecorator(func) {
  let cache = new Map();
  return function (x) {
    if (cache.has(x)) {
      return cache.get(x);
    }
    let result = func.call(this, x); // "this" is passed correctly now
    cache.set(x, result);
    return result;
  };
}

worker.slow = cachingDecorator(worker.slow); // now make it caching

console.log(worker.slow(2)); // works
console.log(worker.slow(2));

//task 1
function work(a, b) {
  alert(a + b); // work is an arbitrary function or method
}

work = spy(work);

function spy(fn) {
  function wrapper() {
    fn.apply(this, arguments);
    wrapper.calls.push([...arguments])
    console.log(arguments)
  }
  wrapper.calls = []
  return wrapper;
}

work(1, 2); // 3
work(4, 5); // 9

for (let args of work.calls) {
  alert(`call:${args}`); // "call:1,2", "call:4,5"
}

//task 3
function debounce(fn, ms) {
  let timer;
  return function () {
    clearTimeout(timer);
    timer = setTimeout(() => fn.apply(this, arguments), ms)
  }
}

// Prototype
//task 2
let head = {
  glasses: 1
};

let table = {
  pen: 3,
  __proto__: head
};

let bed = {
  sheet: 1,
  pillow: 2,
  __proto__: table,
};

let pockets = {
  money: 2000,
  __proto__: bed
};

// Prototype method:
//task 1
let dictionary = Object.create(null);

Object.defineProperties(dictionary, {
  toString: {
    value: function () {
      return Object.keys(this).join()
    },
    numerable: false
  }
})

//Promise

//task 2
async function delay(ms) {
  return await new Promise(resolver => setTimeout(resolver, ms));
}

delay(3000).then(() => alert('runs after 3 seconds'));

//async-await

//task 1
function loadJson(url) {
  return fetch(url)
    .then(response => {
      if (response.status == 200) {
        return response.json();
      } else {
        throw new Error(response.status);
      }
    });
}

async function loadJson(url) {
  const response = await fetch(url);
  if (response.status == 200) {
    return response.json();
  } else {
    throw new Error(response.status);
  }
}

loadJson('https://javascript.info/no-such-user.json')
  .catch(alert);

//task 2
async function demoGithubUser() {
  let name = prompt("Enter a name?", "iliakan");

  try {
    const user = await loadJson(`https://api.github.com/users/${name}`)
    alert(`Full name: ${user.name}.`);
    return user;
  }
  catch (err) {
    if (err instanceof HttpError && err.response.status == 404) {
      alert("No such user, please reenter.");
      return await demoGithubUser();
    } else {
      throw err;
    }
  };
}

// DOM

//task 1
// div: document.body.firstElementChild
// ul : document.body.lastElementChild
// ul : document.body.lastElementChild.lastElementChild

//task 2
let table = document.body.firstElementChild;

for (let i = 0; i < table.rows.length; i++) {
  table.rows[i].cells[i].style.backgroundColor = 'red';
}


//search
//task 1

document.id('age-table')
document.querySelector('label')
document.id('age-table').firstElementChild
document.querySelector('form[name="search"]')
document.querySelector('form[name="search"]').querySelector('input')
document.querySelector('form[name="search"]').querySelectorAll('input').lastElementChild

//attribute and property

//task 2

// <a name="list">the list</a>
//  <ul>
//   <li><a href="http://google.com">http://google.com</a></li>
//   <li><a href="/tutorial">/tutorial.html</a></li>
//   <li><a href="local/path">local/path</a></li>
//   <li><a href="ftp://ftp.com/my.zip">ftp://ftp.com/my.zip</a></li>
//   <li><a href="http://nodejs.org">http://nodejs.org</a></li>
//   <li><a href="http://internal.com/test">http://internal.com/test</a></li>
// </ul>

let link = document.querySelectorAll('a');

for (let a of link) {
  const href = a.getAttribute('href');
  if (!href) continue;
  if (href.has('://') && !href.startsWith('http://internal.com')) a.style.color = 'orange';

}

link.style.color = 'orange';
// Introduction to Event
//task 1
const button = document.getElementById('something');
button.onclick = function () {
  document.getElementById('text').style.display = 'none'
}
//task 2
const button = document.getElementById('something');
button.onclick = function () {
  this.style.display = 'none'
}
//task 4
field.onclick = function (event) {
  let fieldCoordinate = this.getBoundingClientRect();
  let ballCoordinate = {
    top: event.clientY - fieldCoordinate.top - field.clientTop - ball.clientHeight / 2,
    left: event.clientX - fieldCoordinate.left - field.clientLeft - ball.clientWidth / 2
  };

  if (ballCoordinate.top < 0) ballCoordinate.top = 0;

  if (ballCoordinate.left < 0) ballCoordinate.left = 0;

  if (ballCoordinate.left + ball.clientWidth > field.clientWidth) {
    ballCoordinate.left = field.clientWidth - ball.clientWidth;
  }

  if (ballCoordinate.top + ball.clientHeight > field.clientHeight) {
    ballCoordinate.top = field.clientHeight - ball.clientHeight;
  }

  ball.style.left = `${ballCoordinate.left}px`;
  ball.style.top = `${ballCoordinate.top}px`;
}
// mouse-event
//task 1
ul.onclick = function (event) {
  if (event.target.tagName !== 'LI') return;
  if (event.altKey || event.cmdKey) {
    event.target.classlist.toggle('selected')
  } else {
    let selected = ul.querySelectorAll('.selected');
    for (let elem of selected) {
      elem.classList.remove('selected');
    }
    event.target.classList.add('selected');
  }
}
// mouseover/out-mouseenter/leave
let tooltip;

document.onmouseover = function (event) {

  let anchorElem = event.target.closest('[data-tooltip]');

  if (!anchorElem) return;

  tooltip = showTooltip(anchorElem, anchorElem.dataset.tooltip);
}

document.onmouseout = function () {
  if (tooltip) {
    tooltip.remove();
    tooltip = false;
  }

}


function showTooltip(anchorElem, html) {
  let tooltipElem = document.createElement('div');
  tooltipElem.className = 'tooltip';
  tooltipElem.innerHTML = html;
  document.body.append(tooltipElem);

  let coords = anchorElem.getBoundingClientRect();

  let left = coords.left + (anchorElem.offsetWidth - tooltipElem.offsetWidth) / 2;
  if (left < 0) left = 0;

  let top = coords.top - tooltipElem.offsetHeight - 5;
  if (top < 0) {
    top = coords.top + anchorElem.offsetHeight + 5;
  }

  tooltipElem.style.left = `${left}px`;
  tooltipElem.style.top = `${top}px`;

  return tooltipElem;
}

// Drag and drop
//task 1 
let thumbElement = document.querySelector('#slider .thumb');

thumbElement.onmousedown = function (event) {
  event.preventDefault();

  let thumbSliderPosition = event.clientX - thumbElement.getBoundingClientRect().left;

  document.addEventListener('mousemove', onMouseMove);
  document.addEventListener('mouseup', onMouseUp);

  function onMouseMove(event) {
    let newThumbPosition = event.clientX - thumbSliderPosition - slider.getBoundingClientRect().left;

    if (newThumbPosition < 0) {
      newThumbPosition = 0;
    }
    let rightEdge = slider.offsetWidth - thumbElement.offsetWidth;
    if (newThumbPosition > rightEdge) {
      newThumbPosition = rightEdge;
    }

    thumbElement.style.left = `${newThumbPosition}px`;
  }

  function onMouseUp() {
    document.removeEventListener('mouseup', onMouseUp);
    document.removeEventListener('mousemove', onMouseMove);
  }
};

thumbElement.ondragstart = function () {
  return false;
};

//keyboard events
//task 1
function runOnKeys(func, ...keys) {
  document.addEventListener('keydown', onKeyPress);
  const pressedKeys = []
  function onKeyPress(event) {
    pressedKeys.push(event.code);
    for (let key of pressedKeys) {
      if (keys.includes(key)) return;
    }

    func();
    pressedKeys = [];
  }
}

//scrolling
//task 1
function infiniteScroll() {
  while (true) {
    let windowRelativeBottom = document.documentElement.getBoundingClientRect().bottom;
    if (windowRelativeBottom > document.documentElement.clientHeight + 100) break;
    document.body.insertAdjacentHTML("beforeend", `<p>Date: ${new Date()}</p>`);
  }
}

//task 2
const scrollTop = document.querySelector('#scroll-top');
scrollTop.onclick = () => window.scrollTo(pageXOffset, 0)
document.addEventListener('scroll', () => {
  scrollTop.hidden = (document.documentElement.clientHeight < pageYOffset)
})

//Form-elements
//task 1
const option = new Option('Classic', 'classic', true, true);
genres.append(option)

//focus-blur
//task 1
let textArea = null;
view.onclick = () => {
  textArea = document.createElement('textarea');
  textArea.classList.add('edit');
  textArea.onblur = () => {
    view.innerHTML = textArea.value;
    textArea.replaceWith(view);
  };
  textArea.onkeydown = function (e) {
    if (e.key == 'Enter') this.blur();
  };
  view.replaceWith(textArea);
  textArea.focus();
};

//task 2
const tableElement = document.getElementById('bagua-table');
let editingRow;

tableElement.onclick = (event) => {

  let target = event.target.closest('.edit-cancel,.edit-ok,td');
  if (!tableElement.contains(target)) return;

  if (target.className == 'edit-cancel') {
    finishTdEdit(editingRow, false);
  } else if (target.className == 'edit-ok') {
    finishTdEdit(editingRow, true);
  } else if (target.nodeName == 'TD') {
    if (editingRow) return;

    editingRow = td;

    td.classList.add('edit-td');

    let textArea = document.createElement('textarea');
    textArea.style.width = `${td.clientHeight}px`;
    textArea.style.height = `${td.clientHeight}px`;
    textArea.className = 'edit-area';

    textArea.value = td.innerHTML;
    td.innerHTML = '';
    td.appendChild(textArea);
    textArea.focus();

    td.insertAdjacentHTML("beforeEnd",
      '<div class="edit-controls"><button class="edit-ok">OK</button><button class="edit-cancel">CANCEL</button></div>'
    );
  }

};

function finishTdEdit(td, confirmChange) {
  if (confirmChange) {
    td.innerHTML = td.querySelector('textarea').value;
  } else {
    td.innerHTML = editingRow.innerHTML;
  }
  td.classList.remove('edit-td');
  editingRow = null;
}

// events change input
    const form = document.forms.calculator;

    form.money.oninput = calculate;
    form.interest.oninput = calculate;
    form.months.onchange = calculate;

    function calculate() {
      const initial = Number(form.money.value);
      const interest = form.interest.value * 0.01;
      const years = form.months.value / 12;
      if (!initial || !interest || !years) return;
      const result = Math.round(initial * (1 + interest) ** years);
      const height = `${result / form.money.value * 100 }px`;
      
      document.querySelector('#height-after').style.height = height;
      document.querySelector('#money-before').innerHTML = form.money.value;
      document.querySelector('#money-after').innerHTML = result;
    }
// onload onerror resource loading
function loaded() {
  alert("Images loaded")
}

function preloadImages(imgs, callback) {
  let index = 0
  for( let imageSrc of imgs){
    let img = document.createElement('img');
    img.onload = onLoad;
    img.onerror = onLoad;
    img.src = imageSrc;

    index++;
    if (index === imgs.length) callback();
  }
}

preloadImages(["1.jpg", "2.jpg", "3.jpg"], loaded);

// micro and macrotask
console.log(1); //1

setTimeout(() => console.log(2)); //5

Promise.resolve().then(() => console.log(3)); //3

Promise.resolve().then(() => setTimeout(() => console.log(4))); //7

Promise.resolve().then(() => console.log(5)); //4

setTimeout(() => console.log(6)); //6

console.log(7); //2