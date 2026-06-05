const products = [
    { id: 1, name: "iPhone 16", price: 25990000, category: "phone", stock: 15, rating: 4.5 },
    { id: 2, name: "MacBook Pro", price: 45990000, category: "laptop", stock: 8, rating: 4.8 },
    { id: 3, name: "AirPods Pro", price: 6990000, category: "accessory", stock: 50, rating: 4.3 },
    { id: 4, name: "iPad Air", price: 16990000, category: "tablet", stock: 0, rating: 4.6 },
    { id: 5, name: "Samsung S24", price: 22990000, category: "phone", stock: 20, rating: 4.4 },
    { id: 6, name: "Dell XPS 15", price: 35990000, category: "laptop", stock: 5, rating: 4.7 },
    { id: 7, name: "Galaxy Buds", price: 3490000, category: "accessory", stock: 100, rating: 4.1 },
    { id: 8, name: "Xiaomi Pad 6", price: 7990000, category: "tablet", stock: 25, rating: 4.2 },
    { id: 9, name: "Pixel 9", price: 19990000, category: "phone", stock: 12, rating: 4.6 },
    { id: 10, name: "ThinkPad X1", price: 32990000, category: "laptop", stock: 3, rating: 4.5 }
];

// 1. Lọc sản phẩm còn hàng (Dùng filter)
function getInStock(products) {
    return products.filter(p => p.stock > 0);
}

// 2. Lọc theo category VÀ khoảng giá (Dùng filter)
function filterProducts(products, category, minPrice, maxPrice) {
    return products.filter(p => p.category === category && p.price >= minPrice && p.price <= maxPrice);
}

// 3. Sắp xếp theo giá (Dùng sort, kết hợp spread syntax [...] để không làm đổi mảng gốc)
function sortByPrice(products, order = "asc") {
    return [...products].sort((a, b) => order === "asc" ? a.price - b.price : b.price - a.price);
}

// 4. Tìm sản phẩm rẻ nhất mỗi category (Dùng reduce để nhóm dữ liệu thành Object)
function cheapestByCategory(products) {
    return products.reduce((acc, product) => {
        const cat = product.category;
        // Nếu category chưa có trong biến tích lũy (acc), hoặc giá SP hiện tại rẻ hơn giá SP đã lưu
        if (!acc[cat] || product.price < acc[cat].price) {
            acc[cat] = product;
        }
        return acc;
    }, {});
}

// 5. Tính tổng giá trị kho (Dùng reduce)
function totalInventoryValue(products) {
    return products.reduce((sum, p) => sum + (p.price * p.stock), 0);
}

// 6. Tạo mảng chỉ chứa { name, formattedPrice } (Dùng map)
function formatProductList(products) {
    return products.map(p => ({
        name: p.name,
        formattedPrice: new Intl.NumberFormat('vi-VN').format(p.price) + "đ"
    }));
}

// 7. Tính rating trung bình toàn bộ (Dùng reduce)
function averageRating(products) {
    if (products.length === 0) return 0;
    const total = products.reduce((sum, p) => sum + p.rating, 0);
    return Math.round((total / products.length) * 10) / 10; // Làm tròn 1 chữ số thập phân
}

// 8. Tìm sản phẩm theo keyword (Dùng filter kết hợp string methods)
function searchProducts(products, keyword) {
    const lowerKey = keyword.toLowerCase();
    return products.filter(p => p.name.toLowerCase().includes(lowerKey));
}

// KẾT QUẢ TEST

console.log("=== IN-STOCK PRODUCTS ===");
console.log(getInStock(products));

console.log("\n=== PHONES 15-25 TRIỆU ===");
console.log(filterProducts(products, "phone", 15000000, 25000000));

console.log("\n=== CHEAPEST BY CATEGORY ===");
console.log(cheapestByCategory(products));

console.log("\n=== TOTAL INVENTORY VALUE ===");
console.log(totalInventoryValue(products).toLocaleString('vi-VN') + "đ");

/* TEST THÊM CHO CÁC HÀM CÒN LẠI ĐỂ KIỂM TRA */
// console.log("\n=== SORT BY PRICE (DESC) ===");
// console.log(sortByPrice(products, "desc"));

// console.log("\n=== FORMATTED PRODUCT LIST ===");
// console.log(formatProductList(products));

// console.log("\n=== AVERAGE RATING ===");
// console.log(averageRating(products));

// console.log("\n=== SEARCH 'pro' ===");
// console.log(searchProducts(products, "pro"));