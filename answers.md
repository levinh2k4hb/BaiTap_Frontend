# Phiếu bài tập 01

## Phần A

### Câu A1
1. Khi bạn gõ https://shopee.vn vào trình duyệt và nhấn Enter, trình duyệt sẽ thực hiện các bước sau:
    DNS lookup -> TCP handshake -> TLS handshake -> HTTP request -> HTTP response -> Parse HTML/CSS/JS -> Layout -> Paint
2. Trong DevTools của Chrome, tab Network cho thấy thông tin tất cả các request mạng mà trình duyệt gửi đi khi tải trang
![Hình ảnh minh họa về Network ](image/mhvenetwork.png)

### Câu A2
1. Lạm dụng thẻ div nhiều <div class="header">, <div class="footer">, <div class="main"> --> Nên dùng thẻ <header>, <main>, <footer> trong bài
2. Menu dùng thẻ <div> --> Nên dùng thẻ <nav> kết hợp với <ul> và <li> để tạo menu
3. Tiêu đề sản phẩm dùng <div class="title"> --> Nên dùng thẻ <h1> hoặc <h2> để làm tiêu đề sản phẩm
4. Thẻ <img> thiếu thuộc tính alt --> Nên thêm thuộc tính alt để cải thiện khả năng truy cập và SEO

### Câu A3
Hộp 1
Text A Text B
Hộp 2
Text C Text D
Hộp 3

Thẻ <div> chiếm cả dòng
Thẻ <span>, <strong> chỉ chiếm không gian cho nội dung của nó, và thẻ <strong> được in đậm

### Câu A4
1. Điểm khác nhau <theader>, <tbody>, <tfoot> là các thành phần trong bảng lần lượt đai diện cho phần đầu, thân, kết
2. Lý do không nên dùng table làm layout là vì:
- SEO và trợ năng truy cập - Khó bảo trì và mở rộng
- Không thể co giãn hay xếp cột khi xem bằng điện thoại
- Phải lồng ghép nhiều thẻ <td> <tr> ... tạo ra một cấu trúc phức tạp, khó đọc và tải chậm 




---


# Phiếu bài tập 01
## Phần B

### Bài b3

Lỗi 1: Dòng 1 — `<!DOCTYPE>` không đúng cú pháp HTML5 — Sửa thành `<!DOCTYPE html>`.
Lỗi 2: Dòng 2 — Thiếu thuộc tính `lang` cho thẻ `<html>` — Thêm `lang="vi"` hoặc ngôn ngữ phù hợp.
Lỗi 3: Dòng 4 — Thẻ `<title>` chưa được đóng — Thêm `</title>`.
Lỗi 4: Dòng 5 — `meta charset="utf8"` viết sai giá trị — Sửa thành `meta charset="utf-8"`.
Lỗi 5: Dòng 8 — Thẻ `<h1>` không được đóng đúng — Sửa thành `</h1>`.
Lỗi 6: Dòng 12 — Thẻ `<a>` đầu tiên thiếu `</a>` — Đóng đầy đủ thẻ liên kết.
Lỗi 7: Dòng 18 — Thẻ `<img>` thiếu dấu ngoặc kép cho `src` và thiếu `alt` — Sửa thành `src="iphone.jpg"` và thêm `alt` mô tả ảnh.
Lỗi 8: Dòng 20 — Thẻ `<b>` và `</p>` đóng sai thứ tự — Đóng nội dung đậm trước rồi mới đóng đoạn văn, hoặc dùng `<strong>`.
Lỗi 9: Dòng 30 — Dùng thẻ `<main>` lần thứ hai là sai ngữ nghĩa — Chỉ nên có một `<main>`, phần sidebar nên đổi sang `<aside>`.
Lỗi 10: Dòng 34 — Thẻ `<p>` trong footer chưa được đóng — Thêm `</p>`.
Lỗi 11: Dòng 16, 23 — Mức tiêu đề section và bảng chưa tối ưu về ngữ nghĩa — Nên dùng `<h2>` cho tiêu đề section và `<th>` cho hàng tiêu đề bảng.