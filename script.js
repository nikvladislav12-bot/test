let notes = [];
let todos = [];
let timerInterval;
let timeLeft = 0;
let calcValue = '0';

// Система табів
function switchTab(tabName) {
    document.querySelectorAll('.content-area').forEach(area => {
        area.classList.remove('active');
    });
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    document.getElementById(tabName).classList.add('active');
    event.target.classList.add('active');
}

// ====== НОТАТКИ ======
function addNote() {
    const input = document.getElementById('noteInput');
    if (input.value.trim()) {
        notes.push(input.value);
        input.value = '';
        renderNotes();
    }
}

function deleteNote(index) {
    notes.splice(index, 1);
    renderNotes();
}

function renderNotes() {
    const list = document.getElementById('noteList');
    list.innerHTML = notes.map((note, i) => 
        `<li class="note-item">
            <span>${note}</span>
            <button class="delete-btn" onclick="deleteNote(${i})">Видалити</button>
        </li>`
    ).join('');
}

// ====== СПИСОК СПРАВ ======
function addTodo() {
    const input = document.getElementById('todoInput');
    if (input.value.trim()) {
        todos.push({ text: input.value, completed: false });
        input.value = '';
        renderTodos();
    }
}

function toggleTodo(index) {
    todos[index].completed = !todos[index].completed;
    renderTodos();
}

function deleteTodo(index) {
    todos.splice(index, 1);
    renderTodos();
}

function renderTodos() {
    const list = document.getElementById('todoList');
    list.innerHTML = todos.map((todo, i) => 
        `<div class="todo-item ${todo.completed ? 'completed' : ''}">
            <input type="checkbox" ${todo.completed ? 'checked' : ''} 
                   onchange="toggleTodo(${i})">
            <span style="flex: 1">${todo.text}</span>
            <button class="delete-btn" onclick="deleteTodo(${i})">Видалити</button>
        </div>`
    ).join('');
}

// ====== ТАЙМЕР ======
function startTimer() {
    const mins = parseInt(document.getElementById('timerMinutes').value) || 0;
    const secs = parseInt(document.getElementById('timerSeconds').value) || 0;
    
    if (timeLeft === 0) {
        timeLeft = mins * 60 + secs;
    }
    
    if (timeLeft > 0) {
        clearInterval(timerInterval);
        timerInterval = setInterval(() => {
            if (timeLeft > 0) {
                timeLeft--;
                updateTimerDisplay();
            } else {
                clearInterval(timerInterval);
                alert('Час вийшов!');
            }
        }, 1000);
    }
}

function pauseTimer() {
    clearInterval(timerInterval);
}

function resetTimer() {
    clearInterval(timerInterval);
    timeLeft = 0;
    updateTimerDisplay();
}

function updateTimerDisplay() {
    const mins = Math.floor(timeLeft / 60);
    const secs = timeLeft % 60;
    document.getElementById('timerDisplay').textContent = 
        `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
}

// ====== КАЛЬКУЛЯТОР ======
function appendCalc(val) {
    if (calcValue === '0') {
        calcValue = val;
    } else {
        calcValue += val;
    }
    document.getElementById('calcDisplay').textContent = calcValue;
}

function clearCalc() {
    calcValue = '0';
    document.getElementById('calcDisplay').textContent = calcValue;
}

function calculateResult() {
    try {
        calcValue = String(eval(calcValue));
        document.getElementById('calcDisplay').textContent = calcValue;
    } catch (e) {
        document.getElementById('calcDisplay').textContent = 'Помилка';
        calcValue = '0';
    }
}

// ====== EVENT LISTENERS ======
document.addEventListener('DOMContentLoaded', function() {
    // Підтримка Enter для нотаток
    document.getElementById('noteInput').addEventListener('keypress', e => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            addNote();
        }
    });

    // Підтримка Enter для списку справ
    document.getElementById('todoInput').addEventListener('keypress', e => {
        if (e.key === 'Enter') addTodo();
    });
});