// 1. DATA (Dữ liệu tĩnh)
const products = [
    { id: 1, name: "iPhone 16", price: 25990000, category: "phone", image: "https://placehold.co/200x200?text=iPhone+16", rating: 4.5, inStock: true },
    { id: 2, name: "MacBook Pro M3", price: 45990000, category: "laptop", image: "https://placehold.co/200x200?text=MacBook+Pro", rating: 4.9, inStock: true },
    { id: 3, name: "AirPods Pro 2", price: 6590000, category: "accessory", image: "https://placehold.co/200x200?text=AirPods", rating: 4.6, inStock: false },
    { id: 4, name: "iPad Air 5", price: 15990000, category: "tablet", image: "https://placehold.co/200x200?text=iPad+Air", rating: 4.7, inStock: true },
    { id: 5, name: "Samsung S24 Ultra", price: 31990000, category: "phone", image: "https://placehold.co/200x200?text=S24+Ultra", rating: 4.8, inStock: true },
    { id: 6, name: "Dell XPS 15", price: 42000000, category: "laptop", image: "https://placehold.co/200x200?text=Dell+XPS", rating: 4.4, inStock: true },
    { id: 7, name: "Apple Watch S9", price: 10990000, category: "accessory", image: "https://placehold.co/200x200?text=Apple+Watch", rating: 4.5, inStock: true },
    { id: 8, name: "Xiaomi Pad 6", price: 7990000, category: "tablet", image: "https://placehold.co/200x200?text=Xiaomi+Pad", rating: 4.3, inStock: true },
    { id: 9, name: "Google Pixel 8", price: 18990000, category: "phone", image: "https://placehold.co/200x200?text=Pixel+8", rating: 4.6, inStock: false },
    { id: 10, name: "Asus ROG Zephyrus", price: 55000000, category: "laptop", image: "https://placehold.co/200x200?text=Asus+ROG", rating: 4.8, inStock: true },
    { id: 11, name: "Sony WH-1000XM5", price: 8490000, category: "accessory", image: "https://placehold.co/200x200?text=Sony+XM5", rating: 4.9, inStock: true },
    { id: 12, name: "Galaxy Tab S9", price: 19990000, category: "tablet", image: "https://placehold.co/200x200?text=Galaxy+Tab", rating: 4.7, inStock: true }
];

// Trạng thái (State) của App
let currentProducts = [...products];
let cartCount = 0;

// 2. DOM ELEMENTS
const productGrid = document.getElementById('productGrid');
const searchInput = document.getElementById('searchInput');
const sortSelect = document.getElementById('sortSelect');
const categoryButtonsContainer = document.getElementById('categoryButtons');
const cartBadge = document.getElementById('cartBadge');
const themeToggle = document.getElementById('themeToggle');
const modal = document.getElementById('productModal');
const closeModalBtn = document.querySelector('.close-btn');

// 3. CORE FUNCTIONS

// Helper format tiền tệ VNĐ
const formatMoney = (val) => new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(val);

// --- RENDER SẢN PHẨM ---
function renderProducts(productList) {
    productGrid.innerHTML = ''; // Clear lưới cũ

    if (productList.length === 0) {
        productGrid.innerHTML = '<p style="grid-column: 1/-1; text-align: center;">Không tìm thấy sản phẩm nào.</p>';
        return;
    }

    productList.forEach(product => {
        // Tạo DOM element cho Card
        const card = document.createElement('div');
        card.className = 'product-card';
        // Gắn ID vào card để phục vụ click event bật Modal
        card.dataset.id = product.id;

        const img = document.createElement('img');
        img.src = product.image;
        img.alt = product.name;

        const title = document.createElement('h3');
        title.textContent = product.name;

        const price = document.createElement('div');
        price.className = 'price';
        price.textContent = formatMoney(product.price);

        const stockInfo = document.createElement('div');
        stockInfo.className = product.inStock ? 'stock' : 'stock out-of-stock';
        stockInfo.textContent = product.inStock ? 'Còn hàng' : 'Hết hàng';

        // Tạo nút Thêm giỏ (Ngăn bong bóng sự kiện để không bật Modal khi click nút)
        const btnAdd = document.createElement('button');
        btnAdd.className = 'add-btn';
        btnAdd.textContent = 'Thêm vào giỏ';
        btnAdd.disabled = !product.inStock;
        if (!product.inStock) btnAdd.style.background = '#ccc';

        btnAdd.addEventListener('click', (e) => {
            e.stopPropagation();
            addToCart();
        });

        // Gắn vào Card
        card.append(img, title, price, stockInfo, btnAdd);

        // Gắn sự kiện mở Modal cho toàn bộ Card
        card.addEventListener('click', () => showModal(product));

        // Gắn vào Grid
        productGrid.appendChild(card);
    });
}

// --- RENDER NÚT CATEGORY ---
function renderCategories() {
    // Tìm các category độc nhất bằng Set
    const categories = ['all', ...new Set(products.map(p => p.category))];

    categories.forEach(cat => {
        const btn = document.createElement('button');
        btn.className = 'filter-btn';
        btn.textContent = cat === 'all' ? 'Tất cả' : cat.toUpperCase();
        if (cat === 'all') btn.classList.add('active'); // Mặc định chọn All

        btn.addEventListener('click', () => {
            // Cập nhật giao diện nút
            document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            // Xử lý logic lọc
            filterByCategory(cat);
        });

        categoryButtonsContainer.appendChild(btn);
    });
}

// 4. ACTION FUNCTIONS (Search, Filter, Sort, Cart)

function filterByCategory(category) {
    if (category === 'all') {
        currentProducts = [...products];
    } else {
        currentProducts = products.filter(p => p.category === category);
    }
    // Sau khi lọc xong thì áp dụng luôn từ khóa search hiện tại và logic sort
    applyFiltersAndSort();
}

function searchProducts() {
    applyFiltersAndSort();
}

function sortProducts() {
    applyFiltersAndSort();
}

// Hàm gộp chung logic để tránh xung đột giữa Search, Filter và Sort
function applyFiltersAndSort() {
    const keyword = searchInput.value.toLowerCase();
    const sortType = sortSelect.value;

    // 1. Lấy base từ currentProducts (Đã được filter category)
    let finalProducts = currentProducts.filter(p => p.name.toLowerCase().includes(keyword));

    // 2. Sắp xếp
    if (sortType === 'priceAsc') finalProducts.sort((a, b) => a.price - b.price);
    if (sortType === 'priceDesc') finalProducts.sort((a, b) => b.price - a.price);
    if (sortType === 'nameAsc') finalProducts.sort((a, b) => a.name.localeCompare(b.name));
    if (sortType === 'ratingDesc') finalProducts.sort((a, b) => b.rating - a.rating);

    // 3. Render
    renderProducts(finalProducts);
}

function addToCart() {
    cartCount++;
    cartBadge.textContent = cartCount;
    cartBadge.classList.remove('hidden');
}

// 5. MODAL & THEME LOGIC

function showModal(product) {
    const modalBody = document.getElementById('modalBody');
    modalBody.innerHTML = `
        <div style="display:flex; gap: 20px; flex-wrap: wrap;">
            <img src="${product.image}" alt="${product.name}" style="width: 200px;">
            <div class="info">
                <h2>${product.name}</h2>
                <p style="color: var(--primary-color); font-size: 1.5rem; font-weight: bold; margin: 10px 0;">${formatMoney(product.price)}</p>
                <p>Danh mục: <strong>${product.category}</strong></p>
                <p>Đánh giá: <strong>${product.rating}</strong> ⭐</p>
                <p style="margin-top: 15px;">Mô tả chi tiết: Sản phẩm chính hãng bảo hành 12 tháng tại các cửa hàng trên toàn quốc.</p>
            </div>
        </div>
    `;
    modal.classList.remove('hidden');
}

// Đóng Modal (click dấu X hoặc click ra ngoài đen mờ)
closeModalBtn.addEventListener('click', () => modal.classList.add('hidden'));
modal.addEventListener('click', (e) => {
    if (e.target === modal) modal.classList.add('hidden');
});

// Toggle Dark Mode
themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    const icon = themeToggle.querySelector('i');
    if (document.body.classList.contains('dark-mode')) {
        icon.classList.replace('fa-moon', 'fa-sun');
    } else {
        icon.classList.replace('fa-sun', 'fa-moon');
    }
});

// 6. EVENT LISTENERS GẮN CHO SEARCH & SORT
searchInput.addEventListener('input', searchProducts);
sortSelect.addEventListener('change', sortProducts);

// 7. KHỞI TẠO BAN ĐẦU (INIT)
renderCategories();
renderProducts(currentProducts);