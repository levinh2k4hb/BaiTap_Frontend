function createCart() {
    // Private data (Chỉ tồn tại bên trong Closure)
    let items = [];
    let currentDiscount = null;

    // Hàm helper private để format tiền tệ chuẩn Việt Nam
    const formatMoney = (val) => new Intl.NumberFormat('vi-VN').format(val);

    return {
        // 1. Thêm sản phẩm (Nếu trùng ID thì tăng số lượng)
        addItem(product, quantity = 1) {
            const existingItem = items.find(item => item.id === product.id);
            if (existingItem) {
                existingItem.quantity += quantity;
            } else {
                // Dùng spread operator để copy thuộc tính và gán thêm quantity
                items.push({ ...product, quantity });
            }
        },
        
        // 2. Xóa sản phẩm theo id
        removeItem(productId) {
            items = items.filter(item => item.id !== productId);
        },
        
        // 3. Cập nhật số lượng
        updateQuantity(productId, newQuantity) {
            const existingItem = items.find(item => item.id === productId);
            if (existingItem) {
                if (newQuantity <= 0) {
                    this.removeItem(productId); // Xóa luôn nếu SL <= 0
                } else {
                    existingItem.quantity = newQuantity;
                }
            }
        },
        
        // 4. Áp dụng mã giảm giá
        applyDiscount(code) {
            const discountRules = {
                "SALE10": { type: "percent", value: 10, label: "giảm 10%" },
                "SALE20": { type: "percent", value: 20, label: "giảm 20%" },
                "FREESHIP": { type: "amount", value: 30000, label: "-30k phí ship" }
            };
            
            if (discountRules[code]) {
                currentDiscount = discountRules[code];
            } else {
                currentDiscount = null; // Hủy mã nếu nhập sai
            }
        },

        // 5. Tính tổng tiền (Đã bao gồm giảm giá)
        getTotal() {
            let subTotal = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
            
            if (!currentDiscount) return subTotal;

            if (currentDiscount.type === "percent") {
                return subTotal * (1 - currentDiscount.value / 100);
            } else if (currentDiscount.type === "amount") {
                return Math.max(0, subTotal - currentDiscount.value); // Tránh tổng tiền bị âm
            }
        },
        
        // 6. Lấy tổng số sản phẩm (tổng quantity)
        getItemCount() {
            return items.reduce((sum, item) => sum + item.quantity, 0);
        },
        
        // 7. Xóa toàn bộ giỏ
        clearCart() {
            items = [];
            currentDiscount = null;
        },

        // 8. In giỏ hàng dạng bảng ASCII
        printCart() {
            // Helper căn lề chuỗi (Cực kỳ hữu ích để vẽ bảng tự động)
            const pad = (str, len, align = 'left') => {
                str = String(str);
                return align === 'right' ? str.padStart(len, ' ') : str.padEnd(len, ' ');
            };

            const line = '─'.repeat(53); // Chiều dài cố định của bảng
            
            console.log(`┌${line}┐`);
            console.log(`│ ${pad('#', 1)} │ ${pad('Sản phẩm', 13)} │ ${pad('SL', 2, 'right')} │ ${pad('Đơn giá', 11, 'right')} │ ${pad('Tổng', 12, 'right')} │`);

            items.forEach((item, index) => {
                let stt = pad(index + 1, 1);
                let name = pad(item.name, 13);
                let qty = pad(item.quantity, 2, 'right');
                let price = pad(formatMoney(item.price), 11, 'right');
                let total = pad(formatMoney(item.price * item.quantity), 12, 'right');
                
                console.log(`│ ${stt} │ ${name} │ ${qty} │ ${price} │ ${total} │`);
            });

            console.log(`├${line}┤`);

            let totalVal = this.getTotal();
            let label = currentDiscount ? `Tổng cộng (${currentDiscount.label}):` : "Tổng cộng:";
            let valStr = formatMoney(totalVal) + "đ";
            
            // Tự động tính toán khoảng trắng giữa label và giá trị để bảng không bị xô lệch
            let spaceCount = 53 - label.length - valStr.length;
            let spaces = ' '.repeat(Math.max(0, spaceCount));
            
            console.log(`│ ${label}${spaces}${valStr} │`);
            console.log(`└${line}┘\n`); // \n để cách dòng cho các lần in sau
        }
    };
}

// ==========================================
// TEST THEO YÊU CẦU ĐỀ BÀI
// ==========================================

const cart = createCart();

// Test: Thêm sản phẩm
cart.addItem({ id: 1, name: "iPhone 16", price: 25990000 }, 1);
cart.addItem({ id: 3, name: "AirPods Pro", price: 6990000 }, 2);
cart.addItem({ id: 1, name: "iPhone 16", price: 25990000 }, 1); // Tăng lên 2

// Test: In giỏ hàng lần 1 (Chưa giảm giá)
cart.printCart();

// Test: Áp dụng mã giảm giá và in lại
cart.applyDiscount("SALE10");
cart.printCart(); // Kỳ vọng: Tổng: 59.364.000đ (giảm 10%)

// Test: Đếm số lượng sản phẩm
console.log("Số SP hiện tại:", cart.getItemCount()); // → 4

// Test: Xóa sản phẩm
cart.removeItem(3);
console.log("Số SP sau khi xóa AirPods:", cart.getItemCount()); // → 2