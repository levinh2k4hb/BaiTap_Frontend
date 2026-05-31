# CÂU A1
** Có 3 cách nhúng CSS vào HTML(inline, internal, external):**
** - Inline CSS — trong attribute style **
<h1 style="color: red; font-size: 50px">Phạm Thị Lê Vinh</h1>
Ưu điểm:
- Viết nhanh, áp dụng trực tiếp cho một phần tử.
- Dễ thử nghiệm hoặc chỉnh sửa nhanh một thuộc tính cụ thể.
Nhược điểm:
- Khó bảo trì khi trang có nhiều phần tử.
- Làm HTML bị lẫn với CSS, khó đọc và khó tái sử dụng.
- Không phù hợp cho dự án lớn vì dễ trùng lặp mã.
Khi nào nên dùng:
- Khi cần chỉnh nhanh một phần tử duy nhất.
- Khi thử nghiệm giao diện hoặc demo ngắn.
- Khi chỉ có một vài style rất nhỏ, không cần tái sử dụng.

** - Internal CSS — trong thẻ <style>: **
<head>
    <style>
        h1 { color: red; font-size: 50px; }
    </style>
</head>
Ưu điểm:
- Dễ quản lý hơn inline CSS vì tách style ra khỏi thuộc tính của từng thẻ.
- Áp dụng được cho nhiều phần tử trong cùng một trang.
- Gọn hơn khi cần dùng chung một nhóm style cho trang hiện tại.
Nhược điểm:
- Chỉ dùng trong một trang, không tái sử dụng tốt cho nhiều trang.
- Làm file HTML dài hơn nếu có nhiều style.
- Khó quản lý khi dự án lớn hơn so với external CSS.
Khi nào nên dùng:
- Khi chỉ cần style cho một trang duy nhất.
- Khi muốn viết CSS ngay trong file HTML để làm bài tập hoặc demo nhanh.
- Khi chưa cần tách riêng CSS thành file ngoài.

** - External CSS — file riêng:

<head>
    <link rel="stylesheet" href="styles.css">
</head>


/* styles.css */
h1 { color: red; font-size: 50px; }

Ưu điểm:
- Dễ tái sử dụng cho nhiều trang.
- Dễ quản lý và bảo trì khi dự án lớn.
- Giúp HTML gọn hơn, tách biệt rõ giữa nội dung và giao diện.
Nhược điểm:
- Cần thêm một file CSS riêng.
- Nếu file CSS bị lỗi hoặc chưa tải xong thì giao diện có thể bị ảnh hưởng.
- Có thể phải tải thêm file ngoài, nên phụ thuộc vào đường dẫn đúng.
Khi nào nên dùng:
- Khi làm dự án có nhiều trang.
- Khi muốn quản lý CSS tập trung và dễ bảo trì.
- Khi cần tái sử dụng style cho toàn bộ website.

# Câu A2

1. h1                           → Chọn: Shop TLU
2. .price                       → Chọn: 25.990.000đ or 45.990.000đ
3. #app header                  → Chọn: Shop TLU, Iphone 16, MACBOOK Pro
4. nav a:first-child            → Chọn: Home
5. .product.featured h2         → Chọn: MACBOOK Pro
6. article > p                  → Chọn: 25.990.000đ or 45.990.000đ , Mô tả sản phẩm
7. a[href="/"]                  → Chọn: Home
8. .top-bar.dark h1             → Chọn: ShopTLU


# CÂU A3
**TH1**
- Chiều rộng hiển thị: 400px + (20px * 2) + (5px * 2) = 450px
- không gian chiếm trên trang: 450px + (10px * 2) = 470px

**TH2**
- Chiều rộng hiển thị = 400px
- Kích thước content thực tế = 400px - (20px * 2) - (5px * 2) = 350px
- Không gian chiếm trên trang = 400px + (10px * 2) = 420px

**TH3**
- Khoảng cách giữa box-a bà box-b = 40px
- Lý do kích thước không phải 65px: Khi margin-bottom của phần tử trên chạm vào margin-top của phần tử dưới, CSS không cộng dồn hai giá trị này lại (25 + 40 = 65). Thay vào đó, chúng sẽ "gộp" vào nhau và khoảng cách cuối cùng được lấy theo giá trị lớn hơn giữa hai margin đó (trong trường hợp này là max(25, 40) = 40px). Cơ chế này giúp khoảng cách giữa các đoạn văn bản (paragraphs) không bị nhân đôi một cách vô lý.

** Câu hỏi nâng cao **
- Khoảng cách = 30px
- Quy tắc: Khi có một margin dương và một margin âm gặp nhau, trình duyệt sẽ tính tổng đại số của chúng. Tính toán: 40px + (-10px) = 30px. (Nếu cả hai đều âm, trình duyệt sẽ lấy giá trị âm lớn nhất - tức là số âm xa mốc 0 nhất).



# CÂU A4
1. Tính specificity score (a, b, c) cho mỗi rule
Rule A: p (Chỉ có 1 Type selector)
→ Điểm: (0, 0, 1)
Rule B: .price (Chỉ có 1 Class selector)
→ Điểm: (0, 1, 0)
Rule C: #main-price (Chỉ có 1 ID selector)
→ Điểm: (1, 0, 0)
Rule D: p.price (Có 1 Type selector và 1 Class selector)
→ Điểm: (0, 1, 1)
2. Element sẽ có màu gì? Giải thích
Đỏ. Trình duyệt sẽ so sánh điểm specificity từ trái sang phải (a -> b -> c).
3. Nếu thêm <p class="price" id="main-price" style="color: orange;">, element có màu gì?
màu Cam. style="..." được gọi là Inline CSS. Trong hệ thống phân cấp của CSS, Inline CSS có độ ưu tiên cao hơn tất cả các CSS Selectors thông thường (ID, Class, Type).
4. Nếu Rule A thêm !important, element có màu gì? Tại sao?
màu đen. Cờ !important là "vũ khí tối thượng" trong CSS.