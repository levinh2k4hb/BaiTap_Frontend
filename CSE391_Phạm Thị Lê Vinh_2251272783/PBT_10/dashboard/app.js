const APIs = [
    "https://api.open-meteo.com/v1/forecast?latitude=21.03&longitude=105.85&current_weather=true", // Weather
    "https://restcountries.com/v3.1/name/vietnam", // Country
    "https://dog.ceo/api/breeds/image/random" // Dog
];

async function loadDashboard() {
    const startTime = Date.now();
    const loadTimeEl = document.getElementById('loadTime');

    // Reset status
    document.querySelectorAll('.content').forEach(el => el.innerHTML = "Đang tải...");

    const results = await Promise.allSettled(APIs.map(url => fetch(url).then(r => r.json())));

    results.forEach((result, index) => {
        const widget = document.getElementById(`widget-${index}`).querySelector('.content');

        if (result.status === "fulfilled") {
            renderWidget(widget, index, result.value);
        } else {
            widget.innerHTML = `<p class="error">Lỗi: ${result.reason.message}</p>`;
        }
    });

    loadTimeEl.textContent = `Data loaded in ${Date.now() - startTime}ms`;
}

function renderWidget(el, index, data) {
    if (index === 0) el.innerHTML = `<p>Nhiệt độ: ${data.current_weather.temperature}°C</p>`;
    if (index === 1) el.innerHTML = `<p>Tên: ${data[0].name.common}</p><p>Thủ đô: ${data[0].capital[0]}</p>`;
    if (index === 2) el.innerHTML = `<img src="${data.message}" width="100%">`;
}

document.getElementById('refreshBtn').addEventListener('click', loadDashboard);
loadDashboard();