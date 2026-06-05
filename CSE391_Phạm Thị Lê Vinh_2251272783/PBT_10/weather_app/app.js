const form = document.getElementById('weatherForm');
const input = document.getElementById('cityInput');
const displayArea = document.getElementById('displayArea');
const historyList = document.getElementById('historyList');

// 1. Load lịch sử từ LocalStorage
let history = JSON.parse(localStorage.getItem('weatherHistory')) || [];

const updateHistoryUI = () => {
    historyList.innerHTML = history.map(c => `<li onclick="fetchWeather('${c}')">${c}</li>`).join('');
};

// 2. Fetch API với 3 States
const fetchWeather = async (city) => {
    displayArea.innerHTML = '<div class="spinner">Đang tải...</div>'; // State: Loading

    try {
        const res = await fetch(`https://wttr.in/${city}?format=j1`);
        if (!res.ok) throw new Error('Không tìm thấy');

        const data = await res.json();
        const current = data.current_condition[0];

        // State: Success
        displayArea.innerHTML = `
            <h2>${city.toUpperCase()}</h2>
            <p>Nhiệt độ: ${current.temp_C}°C</p>
            <p>Độ ẩm: ${current.humidity}%</p>
            <p>Thời tiết: ${current.weatherDesc[0].value}</p>
        `;

        // Lưu lịch sử
        if (!history.includes(city)) {
            history = [city, ...history].slice(0, 5);
            localStorage.setItem('weatherHistory', JSON.stringify(history));
            updateHistoryUI();
        }
    } catch (err) {
        // State: Error
        displayArea.innerHTML = '<div class="error">Thành phố không tồn tại hoặc lỗi mạng!</div>';
    }
};

form.addEventListener('submit', (e) => {
    e.preventDefault();
    fetchWeather(input.value.trim());
});

updateHistoryUI();