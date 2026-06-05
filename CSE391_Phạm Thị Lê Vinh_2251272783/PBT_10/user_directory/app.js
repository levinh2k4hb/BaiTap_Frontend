// --- API Layer ---
const api = {
    baseURL: "https://jsonplaceholder.typicode.com",
    async request(endpoint, options = {}) {
        const res = await fetch(`${this.baseURL}${endpoint}`, options);
        if (!res.ok) throw new Error("API request failed");
        return res.json();
    },
    getUsers: () => api.request("/users"),
    getUser: (id) => api.request(`/users/${id}`),
    createUser: (data) => api.request("/users", { method: "POST", body: JSON.stringify(data), headers: { "Content-Type": "application/json" } }),
    updateUser: (id, data) => api.request(`/users/${id}`, { method: "PUT", body: JSON.stringify(data), headers: { "Content-Type": "application/json" } }),
    deleteUser: (id) => api.request(`/users/${id}`, { method: "DELETE" })
};

// --- UI Layer ---
const ui = {
    container: document.getElementById("userList"),
    renderUsers: (users) => {
        ui.container.innerHTML = users.map(u => `
            <div class="user-card" data-id="${u.id}">
                <h3>${u.name}</h3>
                <p>${u.email}</p>
                <button onclick="editUser(${u.id})">Edit</button>
                <button onclick="deleteUser(${u.id})">Delete</button>
            </div>
        `).join("");
    },
    showLoading: () => ui.container.innerHTML = "<div>Loading...</div>",
    showError: (msg) => alert("Error: " + msg),
    showSuccess: (msg) => console.log("Success: " + msg)
};

// --- Controller ---
let users = [];
async function init() {
    try {
        ui.showLoading();
        users = await api.getUsers();
        ui.renderUsers(users);
    } catch (e) { ui.showError(e.message); }
}

async function deleteUser(id) {
    if (!confirm("Xóa user này?")) return;
    try {
        await api.deleteUser(id);
        users = users.filter(u => u.id !== id);
        ui.renderUsers(users);
        ui.showSuccess("Deleted successfully");
    } catch (e) { ui.showError(e.message); }
}

// Search (Client-side)
document.getElementById("searchInput").addEventListener("input", (e) => {
    const term = e.target.value.toLowerCase();
    ui.renderUsers(users.filter(u => u.name.toLowerCase().includes(term) || u.email.toLowerCase().includes(term)));
});

init();