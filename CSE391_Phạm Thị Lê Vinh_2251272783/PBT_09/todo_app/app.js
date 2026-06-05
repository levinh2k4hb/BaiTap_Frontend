// 1. KHỞI TẠO STATE & DOM ELEMENTS
let todos = JSON.parse(localStorage.getItem('todos')) || [];
let currentFilter = 'all';

const todoForm = document.querySelector('#todoForm');
const todoInput = document.querySelector('#todoInput');
const todoList = document.querySelector('#todoList');
const todoCount = document.querySelector('#todoCount');
const filters = document.querySelector('#filters');
const clearCompletedBtn = document.querySelector('#clearCompleted');

// 2. CORE FUNCTIONS

const saveToLocal = () => localStorage.setItem('todos', JSON.stringify(todos));

// Hàm RENDER tạo element 100% bằng createElement (Không dùng innerHTML)
const render = () => {
    todoList.innerHTML = ''; // Chỉ dùng để dọn sạch container trước khi render lại

    let filteredTodos = todos;
    if (currentFilter === 'active') filteredTodos = todos.filter(t => !t.completed);
    if (currentFilter === 'completed') filteredTodos = todos.filter(t => t.completed);

    filteredTodos.forEach(todo => {
        // Tạo thẻ li
        const li = document.createElement('li');
        li.className = `todo-item ${todo.completed ? 'completed' : ''}`;
        li.dataset.id = todo.id; // Lưu ID vào data-attribute để dễ query

        // Tạo checkbox
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.className = 'toggle';
        checkbox.checked = todo.completed;

        // Tạo thẻ span chứa text
        const span = document.createElement('span');
        span.className = 'text';
        span.textContent = todo.text;

        // Tạo nút Xóa
        const btnDelete = document.createElement('button');
        btnDelete.className = 'destroy';
        btnDelete.textContent = '❌';

        // Tạo input ẩn để Edit
        const editInput = document.createElement('input');
        editInput.className = 'edit';
        editInput.type = 'text';
        editInput.value = todo.text;

        // Lắp ghép DOM Tree
        li.append(checkbox, span, btnDelete, editInput);
        todoList.appendChild(li);
    });

    // Cập nhật Footer (Đếm số lượng & Ẩn/hiện nút Clear)
    const activeCount = todos.filter(t => !t.completed).length;
    todoCount.textContent = `${activeCount} item${activeCount !== 1 ? 's' : ''} left`;

    const hasCompleted = todos.some(t => t.completed);
    clearCompletedBtn.style.display = hasCompleted ? 'block' : 'none';

    // Cập nhật class 'active' cho bộ lọc
    document.querySelectorAll('#filters a').forEach(a => {
        a.classList.toggle('active', a.dataset.filter === currentFilter);
    });
};

// 3. EVENT LISTENERS

// Add Todo
todoForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const text = todoInput.value.trim();
    if (text) {
        todos.push({ id: Date.now().toString(), text, completed: false });
        todoInput.value = '';
        saveToLocal();
        render();
    }
});

// EVENT DELEGATION cho phần tử bên trong #todoList (Toggle, Delete)
todoList.addEventListener('click', (e) => {
    const li = e.target.closest('li');
    if (!li) return;

    const id = li.dataset.id;
    const todo = todos.find(t => t.id === id);

    // Xử lý nút Toggle (hoàn thành)
    if (e.target.classList.contains('toggle')) {
        todo.completed = !todo.completed;
        saveToLocal();
        render();
    }

    // Xử lý nút Delete (❌)
    if (e.target.classList.contains('destroy')) {
        todos = todos.filter(t => t.id !== id);
        saveToLocal();
        render();
    }
});

// EVENT DELEGATION cho tính năng Edit (Double Click)
todoList.addEventListener('dblclick', (e) => {
    if (e.target.classList.contains('text')) {
        const li = e.target.closest('li');
        li.classList.add('editing');
        const editInput = li.querySelector('.edit');
        editInput.focus();
        editInput.setSelectionRange(editInput.value.length, editInput.value.length); // Nhảy con trỏ xuống cuối
    }
});

// Lưu Edit khi gõ Enter hoặc click ra ngoài (focusout)
todoList.addEventListener('keydown', (e) => {
    if (e.target.classList.contains('edit') && e.key === 'Enter') {
        e.target.blur(); // Mượn sự kiện blur để kích hoạt save
    }
});

todoList.addEventListener('focusout', (e) => {
    if (e.target.classList.contains('edit')) {
        const id = e.target.closest('li').dataset.id;
        const newText = e.target.value.trim();

        if (newText) {
            todos.find(t => t.id === id).text = newText;
        } else {
            todos = todos.filter(t => t.id !== id); // Xóa luôn nếu user xóa sạch chữ
        }
        saveToLocal();
        render();
    }
});

// Chuyển Filter (All / Active / Completed)
filters.addEventListener('click', (e) => {
    e.preventDefault();
    if (e.target.tagName === 'A') {
        currentFilter = e.target.dataset.filter;
        render();
    }
});

// Clear Completed
clearCompletedBtn.addEventListener('click', () => {
    todos = todos.filter(t => !t.completed);
    saveToLocal();
    render();
});

// Chạy lần đầu tiên khi load trang
render();