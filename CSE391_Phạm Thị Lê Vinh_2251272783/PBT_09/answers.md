# CÂU 1

div#app
├── header
│   ├── h1
│   │   └── "Todo App" (Text Node)
│   └── nav
│       ├── a.active
│       │   └── "All" (Text Node)
│       ├── a
│       │   └── "Active" (Text Node)
│       └── a
│           └── "Completed" (Text Node)
└── main
    ├── form#todoForm
    │   ├── input#todoInput[type="text"]
    │   └── button[type="submit"]
    │       └── "Add" (Text Node)
    └── ul#todoList
        ├── li.todo-item
        │   └── "Learn HTML" (Text Node)
        └── li.todo-item.completed
            └── "Learn CSS" (Text Node)


Chọn thẻ <h1>:

JavaScript
document.querySelector('h1');
Chọn input trong form:

JavaScript
document.querySelector('#todoInput'); // Hoặc: document.querySelector('#todoForm input')
Chọn tất cả .todo-item:

JavaScript
document.querySelectorAll('.todo-item');
Chọn link đang active:

JavaScript
document.querySelector('a.active'); // Hoặc: document.querySelector('nav .active')
Chọn <li> đầu tiên trong #todoList:

JavaScript
document.querySelector('#todoList li'); 
// Mặc định querySelector luôn chỉ lấy phần tử ĐẦU TIÊN khớp với điều kiện.
Chọn tất cả <a> bên trong <nav>:

JavaScript
document.querySelectorAll('nav a');


# CÂU A2

1. Sự khác nhau giữa innerHTML và textContent
innerHTML: Đọc và ghi nội dung dưới dạng mã HTML. Trình duyệt sẽ phân tích cú pháp (parse) và render các thẻ HTML có trong chuỗi.

Khi nào dùng: Khi bạn thực sự muốn tạo ra giao diện mới, chèn cấu trúc DOM (VD: đổ dữ liệu ra bảng <table>, danh sách <li>, hoặc thêm thẻ in đậm <strong>).

textContent: Đọc và ghi nội dung dưới dạng chuỗi văn bản thô (raw text). Trình duyệt sẽ phớt lờ mọi thẻ HTML và in chúng ra như những ký tự bình thường.

Khi nào dùng: Khi chỉ cần hiển thị văn bản thuần túy, đặc biệt là khi in dữ liệu do người dùng nhập vào ra màn hình.

2. Câu hỏi bảo mật (Lỗ hổng XSS)
Tại sao innerHTML gây lỗi XSS (Cross-Site Scripting)? Vì innerHTML ép trình duyệt phải "dịch" chuỗi đầu vào thành mã thực thi. Nếu người dùng cố tình nhập các đoạn script độc hại (như thẻ <img> chứa sự kiện onerror trong đề bài), trình duyệt sẽ chạy đoạn mã JS đó ngay lập tức. Đây là một lỗ hổng bảo mật kinh điển (thường gặp trong các báo cáo rà quét chuẩn OWASP Top 10) cho phép hacker đánh cắp phiên đăng nhập hoặc thao túng giao diện.

Cách sửa đoạn code trong ảnh:
Để "tước vũ khí" của đoạn mã độc, bạn chỉ cần thay đổi thuộc tính ghi dữ liệu thành textContent. Trình duyệt sẽ coi đoạn <img src=x...> kia chỉ là một đoạn văn bản vô hại.

JavaScript
// Giả sử user nhập vào input: <img src=x onerror="alert('Hacked!')">
const userInput = document.querySelector("#search").value;

// SỬA LẠI (An toàn 100%):
document.querySelector("#result").textContent = userInput;


# CÂU A3

1. Khi click vào button (Code hiện tại):
Output sẽ in ra theo thứ tự từ trong ra ngoài (do cơ chế mặc định là Event Bubbling):
- BUTTON
- INNER
- OUTER

2. Nếu bỏ comment e.stopPropagation():
Output sẽ chỉ in ra duy nhất 1 dòng:
- BUTTON


# CÂU C1

Dưới đây là danh sách chi tiết 7 lỗi trong đoạn code của bạn và cách khắc phục triệt để.

Danh sách 7 lỗi cần sửa:
Sai tên sự kiện trong addEventListener: * Lỗi: addEventListener("onclick", ...) ở nút #decrementBtn.

Sửa: Tên sự kiện phải là "click".

Cố gắng gán đè một Hằng số (const) DOM:

Lỗi: Ở nút Reset có lệnh countDisplay = count;. Biến countDisplay là một phần tử HTML khai báo bằng const, không thể gán bằng số nguyên được.

Sửa: Phải là countDisplay.textContent = count;.

Lỗi gọi hàm remove:

Lỗi: Ở #clearHistory, vòng lặp ghi là item.remove;. Đây là hàm nên nếu thiếu dấu ngoặc đơn () thì lệnh sẽ không được thực thi.

Sửa: item.remove();

Xóa innerHTML sai cách:

Lỗi: Nút Reset dùng historyList.innerHTML = null;. Trình duyệt sẽ ép kiểu null thành chuỗi và in ra chữ "null" trên màn hình.

Sửa: Dùng chuỗi rỗng historyList.innerHTML = "";.

Thiếu lấy dữ liệu (Load) History:

Lỗi: Ở sự kiện beforeunload có lưu historyList.innerHTML, nhưng khi load lại quên không lấy ra.

Sửa: Thêm dòng historyList.innerHTML = localStorage.getItem("history") || "";.

Lỗi kiểu dữ liệu khi lấy từ LocalStorage:

Lỗi: localStorage.getItem("count") trả về chuỗi String hoặc null. Nếu không ép về kiểu số (Number), khi click cộng/trừ sẽ sinh ra lỗi nối chuỗi (VD: "5" + 1 thành "51").

Sửa: Dùng parseInt(localStorage.getItem("count")) || 0.

Lỗi mất sự kiện (Event Listener) khi nạp từ LocalStorage:

Lỗi: Đoạn code cũ gắn thẻ li.addEventListener("click", ...) lúc mới tạo. Tuy nhiên, nếu nạp lại trang, chuỗi HTML lấy từ LocalStorage đem ném vào innerHTML sẽ không hề có bất kỳ sự kiện nào đi kèm (Click vào li cũ sẽ không xóa được).

Sửa: Phải dùng kỹ thuật Event Delegation, gắn một sự kiện lắng nghe duy nhất lên container #history thay vì gắn cho từng thẻ <li>.


# CÂU C2

