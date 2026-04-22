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
