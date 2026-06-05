# CÂU A1

Cách 1: Function Declaration

JavaScript
function tinhThueBaoHiem(luong) {
    const thue = luong > 11000000 ? luong * 0.1 : 0;
    return { thue, thuc_nhan: luong - thue };
}
Cách 2: Function Expression

JavaScript
const tinhThueBaoHiem = function(luong) {
    const thue = luong > 11000000 ? luong * 0.1 : 0;
    return { thue, thuc_nhan: luong - thue };
};
Cách 3: Arrow Function

JavaScript
const tinhThueBaoHiem = (luong) => {
    const thue = luong > 11000000 ? luong * 0.1 : 0;
    return { thue, thuc_nhan: luong - thue };
};


2. Sự khác nhau về Hoisting
CÓ khác biệt.

Function Declaration: Được Hoisting toàn bộ (cả tên hàm và nội dung). Bạn có thể gọi hàm trước khi viết code định nghĩa nó.

Function Expression & Arrow Function (dùng let/const): KHÔNG thể gọi trước khi định nghĩa. Chúng bị đưa vào vùng TDZ (Temporal Dead Zone), nếu gọi trước sẽ báo lỗi ngay lập tức.

Ví dụ chứng minh:

JavaScript
// 1. Function Declaration -> CHẠY THÀNH CÔNG
console.log(hamKhaiBao(12000000)); 
function hamKhaiBao(luong) { return luong; }

// 2. Arrow Function (hoặc Expression) -> BÁO LỖI
console.log(hamMuiTen(12000000)); // Lỗi: Cannot access 'hamMuiTen' before initialization
const hamMuiTen = (luong) => { return luong; };


# CÂU A2

1. Dự đoán Output Đoạn 1 (Closure)
JavaScript
console.log(c.increment()); // 1
console.log(c.increment()); // 2
console.log(c.increment()); // 3
console.log(c.decrement()); // 2
console.log(c.getCount());  // 2
2. Dự đoán Output Đoạn 2 (Scope & setTimeout)
Sau 100ms in ra:

Plaintext
var: 3
var: 3
var: 3
Sau 200ms in ra tiếp:

Plaintext
let: 0
let: 1
let: 2
3. Giải thích chi tiết: Tại sao var và let cho kết quả khác nhau?
var (Function Scope / Toàn cục): Chỉ có một biến i duy nhất được tạo ra và dùng chung cho toàn bộ vòng lặp. Hàm setTimeout chạy bất đồng bộ (chạy sau khi vòng lặp đã kết thúc). Lúc này, vòng lặp đã đẩy i lên giá trị cuối cùng là 3, nên cả 3 lần in đều ra 3.

let (Block Scope / Phạm vi khối): Cứ mỗi lần vòng lặp chạy, một biến j mới tinh và độc lập được sinh ra trong bộ nhớ. Mỗi hàm setTimeout sẽ "ghi nhớ" (closure) chính xác giá trị riêng biệt của j tại đúng vòng lặp của nó, nên in ra lần lượt 0, 1, 2.



# CÂU A3

1. Lấy các số chẵn
nums.filter(n => n % 2 === 0);

2. Nhân mỗi số với 3
nums.map(n => n * 3);

3. Tính tổng tất cả
nums.reduce((sum, n) => sum + n, 0);

4. Tìm số đầu tiên > 7
nums.find(n => n > 7);

5. Kiểm tra CÓ số > 10 không
nums.some(n => n > 10);

6. Kiểm tra TẤT CẢ đều > 0
nums.every(n => n > 0);

7. Tạo mảng "Số X là [chẵn/lẻ]"
nums.map(n => `Số ${n} là ${n % 2 === 0 ? 'chẵn' : 'lẻ'}`);

8. Đảo ngược mảng (không mutate mảng gốc)
[...nums].reverse(); // hoặc dùng nums.slice().reverse()


# CÂU A4

1. Destructuring
console.log(name, price, ram, color);
In ra: "iPhone 16" 25990000 8 "Titan"

console.log(specs);
In ra: Lỗi (ReferenceError: specs is not defined).
Giải thích: Cú pháp specs: { ram, color } chỉ dùng để đi sâu vào trong và lấy ra ram, color. Nó KHÔNG tạo ra một biến tên là specs.

2. Spread
console.log(updated.price);
In ra: 23990000 (Giá trị price khai báo sau đã ghi đè price của object cũ).

console.log(updated.sale);
In ra: true (Thuộc tính mới được thêm vào thành công).

console.log(product.price);
In ra: 25990000 (Gốc không đổi. updated là một object hoàn toàn mới).

3. Spread gotcha
console.log(product.specs.ram);
In ra: 16


# CÂU C1
const processOrders = (orders) => orders
    .filter(({ status, total }) => status === "completed" && total > 100000)
    .map(({ id, customer, total }) => ({
        id, customer, total,
        discount: total * 0.1,
        finalTotal: total * 0.9 // total - (total * 0.1)
    }))
    .sort((a, b) => b.finalTotal - a.finalTotal);


1. filter() kết hợp Destructuring: Thay vì dùng 2 lệnh if lồng nhau, ta "bóc tách" luôn status và total ở tham số đầu vào và gộp điều kiện trên 1 dòng.

2. map(): Dùng để cấu trúc lại object. Trích xuất thẳng { id, customer, total } để trả về một object mới, gọn gàng hơn kiểu gán từng dòng item.thuoc_tinh = ... như trước.

3. sort(): Xóa sổ hoàn toàn thuật toán sắp xếp (2 vòng lặp for lồng nhau) dài dòng cũ. Hàm sort có sẵn chỉ cần b - a là tự hiểu sắp xếp giảm dần.

4. Arrow Functions (=>) Chaining: Các hàm được nối đuôi nhau (chaining) liền mạch. Vì dùng arrow function một dòng, hệ thống sẽ tự động hiểu là return kết quả mà không cần gõ hẳn chữ return ra.


# CÂU C2

const miniArray = {
    map(arr, fn) {
        const result = [];
        for (let i = 0; i < arr.length; i++) {
            result.push(fn(arr[i], i, arr));
        }
        return result;
    },

    filter(arr, fn) {
        const result = [];
        for (let i = 0; i < arr.length; i++) {
            if (fn(arr[i], i, arr)) {
                result.push(arr[i]);
            }
        }
        return result;
    },

    reduce(arr, fn, initialValue) {
        // Xử lý cả trường hợp người dùng không truyền initialValue
        let hasInitial = initialValue !== undefined;
        let accumulator = hasInitial ? initialValue : arr[0];
        let startIndex = hasInitial ? 0 : 1;

        for (let i = startIndex; i < arr.length; i++) {
            accumulator = fn(accumulator, arr[i], i, arr);
        }
        return accumulator;
    }
};

// TEST KẾT QUẢ
console.log(miniArray.map([1, 2, 3], x => x * 2));        // → [2, 4, 6]
console.log(miniArray.filter([1, 2, 3, 4], x => x > 2));    // → [3, 4]
console.log(miniArray.reduce([1, 2, 3, 4], (a, b) => a + b, 0)); // → 10