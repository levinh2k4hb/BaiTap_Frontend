// Trạng thái hợp lệ của toàn bộ form
const validity = {
    name: false,
    email: false,
    password: false,
    confirm: false,
    phone: false
};

// Elements
const form = document.getElementById('registerForm');
const submitBtn = document.getElementById('submitBtn');

const nameInput = document.getElementById('name');
const nameIcon = document.getElementById('nameIcon');

const emailInput = document.getElementById('email');
const emailError = document.getElementById('emailError');

const passInput = document.getElementById('password');
const passProgress = document.getElementById('passProgress');
const passText = document.getElementById('passText');

const confirmInput = document.getElementById('confirmPass');
const confirmError = document.getElementById('confirmError');

const phoneInput = document.getElementById('phone');
const phoneError = document.getElementById('phoneError');

// Hàm kiểm tra tổng thể để mở khóa Submit
const checkFormValidity = () => {
    const isAllValid = Object.values(validity).every(val => val === true);
    submitBtn.disabled = !isAllValid;
};

// 1. Validate Tên (Real-time Icon)
nameInput.addEventListener('input', (e) => {
    const val = e.target.value.trim();
    if (val.length >= 2 && val.length <= 50) {
        nameIcon.textContent = '✅';
        validity.name = true;
    } else {
        nameIcon.textContent = val.length > 0 ? '❌' : '';
        validity.name = false;
    }
    checkFormValidity();
});

// 2. Validate Email (Regex)
emailInput.addEventListener('input', (e) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const isValid = emailRegex.test(e.target.value);

    if (e.target.value === '') {
        emailError.classList.remove('show');
        emailInput.classList.remove('is-invalid');
        validity.email = false;
    } else if (!isValid) {
        emailError.classList.add('show');
        emailInput.classList.add('is-invalid');
        validity.email = false;
    } else {
        emailError.classList.remove('show');
        emailInput.classList.remove('is-invalid');
        validity.email = true;
    }
    checkFormValidity();
});

// 3. Password Strength Meter
passInput.addEventListener('input', (e) => {
    const val = e.target.value;
    let strength = 0;

    const hasLower = /[a-z]/.test(val);
    const hasUpper = /[A-Z]/.test(val);
    const hasNumber = /\d/.test(val);
    const hasSpecial = /[!@#$%^&*(),.?":{}|<>]/.test(val);

    // Tính điểm
    if (val.length >= 8) strength++;
    if (hasLower || hasUpper) strength++;
    if (hasNumber) strength++;
    if (hasSpecial) strength++;

    // Reset UI
    passProgress.style.width = '0%';
    passText.textContent = '';
    validity.password = false;

    if (val.length > 0) {
        if (val.length < 8) {
            passProgress.style.width = '33%';
            passProgress.style.backgroundColor = '#dc3545'; // Đỏ
            passText.textContent = 'Yếu';
            passText.style.color = '#dc3545';
            validity.password = true; // Vẫn cho pass hợp lệ nhưng cảnh báo yếu
        } else if (hasLower && hasUpper && hasNumber && hasSpecial) {
            passProgress.style.width = '100%';
            passProgress.style.backgroundColor = '#28a745'; // Xanh
            passText.textContent = 'Mạnh';
            passText.style.color = '#28a745';
            validity.password = true;
        } else if ((hasLower || hasUpper) && hasNumber) {
            passProgress.style.width = '66%';
            passProgress.style.backgroundColor = '#ffc107'; // Vàng
            passText.textContent = 'Trung bình';
            passText.style.color = '#ffc107';
            validity.password = true;
        } else {
            passProgress.style.width = '33%';
            passProgress.style.backgroundColor = '#dc3545';
            passText.textContent = 'Yếu';
            passText.style.color = '#dc3545';
            validity.password = true;
        }
    }

    // Trigger confirm check again if confirm password already has value
    if (confirmInput.value) confirmInput.dispatchEvent(new Event('input'));
    checkFormValidity();
});

// 4. Confirm Password Match
confirmInput.addEventListener('input', (e) => {
    const passVal = passInput.value;
    const confirmVal = e.target.value;

    if (confirmVal === '') {
        confirmError.classList.remove('show');
        confirmInput.classList.remove('is-invalid');
        validity.confirm = false;
    } else if (confirmVal !== passVal) {
        confirmError.classList.add('show');
        confirmInput.classList.add('is-invalid');
        validity.confirm = false;
    } else {
        confirmError.classList.remove('show');
        confirmInput.classList.remove('is-invalid');
        validity.confirm = true;
    }
    checkFormValidity();
});

// 5. Phone Auto-Format (0901-234-567)
phoneInput.addEventListener('input', (e) => {
    // Xóa tất cả ký tự không phải số
    let numbers = e.target.value.replace(/\D/g, '').substring(0, 10);
    let formatted = '';

    // Format theo mốc (4 chữ số - 3 chữ số - 3 chữ số)
    if (numbers.length > 7) {
        formatted = `${numbers.slice(0, 4)}-${numbers.slice(4, 7)}-${numbers.slice(7)}`;
    } else if (numbers.length > 4) {
        formatted = `${numbers.slice(0, 4)}-${numbers.slice(4)}`;
    } else {
        formatted = numbers;
    }

    e.target.value = formatted;

    // Validate phải đủ 10 số
    if (numbers.length === 10) {
        phoneError.classList.remove('show');
        phoneInput.classList.remove('is-invalid');
        validity.phone = true;
    } else {
        if (numbers.length > 0) {
            phoneError.classList.add('show');
            phoneInput.classList.add('is-invalid');
        } else {
            phoneError.classList.remove('show');
            phoneInput.classList.remove('is-invalid');
        }
        validity.phone = false;
    }
    checkFormValidity();
});

// 6. Submit Form & Hiện Modal
const modal = document.getElementById('successModal');
const modalInfo = document.getElementById('modalInfo');
const closeBtn = document.getElementById('closeModalBtn');

form.addEventListener('submit', (e) => {
    e.preventDefault(); // Chặn hành vi load lại trang

    // Đổ dữ liệu vào Modal
    modalInfo.innerHTML = `
        <strong>Tên:</strong> ${nameInput.value} <br>
        <strong>Email:</strong> ${emailInput.value} <br>
        <strong>SĐT:</strong> ${phoneInput.value}
    `;
    modal.classList.add('show');
});

// Đóng Modal
closeBtn.addEventListener('click', () => {
    modal.classList.remove('show');
    form.reset(); // Xóa trắng form
    Object.keys(validity).forEach(v => validity[v] = false); // Reset state
    checkFormValidity();
    nameIcon.textContent = '';
    passProgress.style.width = '0%';
    passText.textContent = '';
});