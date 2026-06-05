// 1. pipe() — Nối chuỗi functions (Chạy từ trái qua phải)

function pipe(...fns) {
    // Trả về một hàm mới nhận vào giá trị khởi tạo (initialValue)
    // Dùng reduce để đưa kết quả của hàm trước làm input cho hàm sau
    return (initialValue) => fns.reduce((acc, fn) => fn(acc), initialValue);
}

const process = pipe(
    x => x * 2,        // 5 → 10
    x => x + 10,       // 10 → 20
    x => x.toString(), // 20 → "20"
    x => "Kết quả: " + x
);
console.log(process(5)); // → "Kết quả: 20"


// 2. memoize() — Caching kết quả để tăng tốc

function memoize(fn) {
    const cache = {}; // Object đóng vai trò như bộ nhớ tạm (Closure)
    
    return function(...args) {
        // Biến mảng arguments thành chuỗi để làm key lưu trữ
        const key = JSON.stringify(args); 
        
        // Nếu đã tính rồi thì lấy luôn từ cache
        if (cache[key] !== undefined) {
            return cache[key]; 
        }
        
        // Nếu chưa tính thì gọi hàm fn, tính xong thì lưu vào cache
        const result = fn(...args);
        cache[key] = result;
        return result;
    };
}

const expensiveCalc = memoize((n) => {
    console.log("Đang tính...");
    let result = 0;
    for (let i = 0; i < n; i++) result += i;
    return result;
});

console.log(expensiveCalc(1000000)); // Lần 1: In "Đang tính..." → 499999500000
console.log(expensiveCalc(1000000)); // Lần 2: Lấy thẳng từ cache, không in "Đang tính..."


// 3. debounce() — Trì hoãn thực thi (Chống spam click/gõ phím)

function debounce(fn, delay) {
    let timeoutId; // Lưu ID của timer để có thể hủy
    
    return function(...args) {
        // Hủy bộ đếm giờ cũ nếu user tiếp tục gõ/click
        clearTimeout(timeoutId);
        
        // Thiết lập bộ đếm giờ mới
        timeoutId = setTimeout(() => {
            fn.apply(this, args); // Chạy hàm thực sự sau khoảng thời gian delay
        }, delay);
    };
}

const search = debounce((query) => {
    console.log("Searching:", query);
}, 500);

// Giả lập user gõ phím liên tục
search("a");
search("ap");
search("app");
search("appl");
search("apple"); // Chỉ lần cuối cùng này mới được in ra sau khi ngưng 500ms

// 4. retry() — Tự động thử lại khi gọi API lỗi
async function retry(fn, maxAttempts = 3) {
    for (let i = 1; i <= maxAttempts; i++) {
        try {
            // Cố gắng thực thi hàm (thường là gọi API)
            return await fn(); 
        } catch (error) {
            // Nếu là lần thử cuối cùng mà vẫn lỗi thì ném lỗi ra ngoài
            if (i === maxAttempts) {
                throw new Error(`Đã thử ${maxAttempts} lần nhưng vẫn thất bại: ${error.message}`);
            }
            console.log(`Lần ${i} thất bại. Đang thử lại...`);
        }
    }
}

// Giả lập hàm gọi API có tỷ lệ lỗi cao
let attemptCount = 0;
const unstableAPI = async () => {
    attemptCount++;
    if (attemptCount < 3) throw new Error("Mạng chập chờn!");
    return "Lấy dữ liệu thành công!";
};

// Test retry
retry(unstableAPI, 3)
    .then(res => console.log(res))
    .catch(err => console.error(err.message));