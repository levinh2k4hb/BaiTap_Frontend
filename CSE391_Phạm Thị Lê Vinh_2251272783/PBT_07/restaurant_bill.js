function inHoaDon(danhSachMon, isWednesday = false, coTip = false) {
    let tongCong = 0;
    let itemsOutput = "";

    // 1. Tính tổng tiền và format từng dòng món ăn
    danhSachMon.forEach((mon, index) => {
        let thanhTien = mon.price * mon.quantity;
        tongCong += thanhTien;

        let sttName = `${index + 1}. ${mon.name}`.padEnd(16, ' ');
        let qty = `x${mon.quantity}`.padEnd(4, ' ');
        let price = `@${mon.price / 1000}k`.padStart(5, ' ');
        let total = `= ${thanhTien / 1000}k`.padStart(6, ' ');

        itemsOutput += `|| ${sttName} ${qty} ${price} ${total} ||\n`;
    });

    // 2. Tính phần trăm giảm giá
    let phanTramGiam = 0;
    if (tongCong > 1000000) {
        phanTramGiam = 15;
    } else if (tongCong > 500000) {
        phanTramGiam = 10;
    }

    // Giảm thêm 5% nếu là thứ 4
    if (isWednesday) {
        phanTramGiam += 5;
    }

    // 3. Tính toán các khoản chi tiết
    let tienGiam = tongCong * (phanTramGiam / 100);
    let sauGiam = tongCong - tienGiam;
    
    // VAT và Tip tính trên số tiền SAU KHI đã giảm giá
    let vat = sauGiam * 0.08;
    let tip = coTip ? (sauGiam * 0.05) : 0;
    
    let thanhToan = sauGiam + vat + tip;

    // Helper function định dạng tiền tệ (VD: 200.000đ)
    const formatTien = (tien) => {
        if (tien === 0) return "0đ";
        return new Intl.NumberFormat('vi-VN').format(tien) + "đ";
    };

    // Helper định dạng layout
    const padLine = (label, value) => {
        return `|| ${label.padEnd(20, ' ')} ${value.padStart(11, ' ')} ||`;
    };

    // 4. In hóa đơn dạng bảng ASCII
    console.log("|====================================|");
    console.log("||" + "HÓA ĐƠN NHÀ HÀNG".padStart(24, ' ').padEnd(36, ' ') + "||");
    console.log("|------------------------------------|");
    console.log(itemsOutput.trimEnd());
    console.log("|------------------------------------|");
    console.log(padLine("Tổng cộng:", formatTien(tongCong)));
    console.log(padLine(`Giảm giá (${phanTramGiam}%):`, formatTien(tienGiam)));
    console.log(padLine("VAT (8%):", formatTien(vat)));
    console.log(padLine(coTip ? "Tip (5%):" : "Tip (0%):", formatTien(tip)));
    console.log("|------------------------------------|");
    console.log(padLine("THANH TOÁN:", formatTien(thanhToan)));
    console.log("|====================================|");
}

// TEST CASE (Dữ liệu giống hệt trong ảnh)
const order = [
    { name: "Phở bò", quantity: 2, price: 65000 },
    { name: "Trà đá", quantity: 3, price: 5000 },
    { name: "Bún chả", quantity: 1, price: 55000 }
];

// Gọi hàm: danhSachMon, thứ 4 (false), có Tip (true)
inHoaDon(order, false, true);