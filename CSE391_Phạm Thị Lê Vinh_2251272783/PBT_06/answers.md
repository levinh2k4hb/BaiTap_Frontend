# CÂU A1
Kích thước | < 768px (Mobile) | 768px - 991px (Tablet - md) | ≥ 992px (Desktop - lg)
Số cột | 1 cột | 2 cột | 4 cột
Box layout | 4 box xếp chồng lên nhau dọc xuống (mỗi hàng 1 box). | 2 box trên 1 hàng (tạo thành 2 hàng lưới vuông). | Cả 4 box nằm ngang trên cùng 1 hàng.

**Câu trả lời thêm**
col-md-6 nghĩa là gì?
 - col: Đại diện cho cột (column) trong hệ thống lưới 12 cột của Bootstrap.
 - md: Medium breakpoint (dành cho màn hình từ 768px trở lên).
 - 6: Chiếm 6 phần trên tổng số 12 phần (tương đương 50% chiều rộng).
=> Tóm lại: Class này yêu cầu phần tử chiếm một nửa (50%) chiều rộng của hàng (row) khi hiển thị trên các thiết bị có chiều rộng màn hình từ 768px trở lên.

Tại sao không cần viết col-sm-12?
 - Bootstrap sử dụng triết lý Mobile-First (ưu tiên thiết bị di động). Các class CSS được áp dụng từ màn hình nhỏ nhất và sẽ kế thừa (override) lên các màn hình lớn hơn cho đến khi gặp một breakpoint mới.
 - Trong đoạn code đã có class col-12 (áp dụng mặc định từ kích thước nhỏ nhất là 0px). Do đó, ở kích thước sm (≥ 576px), trình duyệt vẫn sẽ tự động kế thừa thuộc tính chiếm 12 cột từ class col-12. Việc viết thêm col-sm-12 là dư thừa và không cần thiết.


# CÂU A2
1. d-none d-md-block
Ẩn: Trên điện thoại (< 768px).
Hiện: Từ máy tính bảng trở lên (≥ 768px).

2. Spacing (m=margin, p=padding, t/b/s/e=trên/dưới/trái/phải, x/y=ngang/dọc)
mt-3: Lề trên (margin-top).
px-4: Đệm 2 bên trái/phải (padding-x).
mb-auto: Lề dưới tự động (thường dùng để đẩy phần tử lên trên).
py-2: Đệm trên/dưới (padding-y).
ms-5: Lề trái (margin-start).

3. Phân biệt Container
.container: Cố định chiều rộng (nhảy size theo từng điểm ngắt), có khoảng trắng 2 bên.
.container-fluid: Tràn viền, luôn rộng 100% ở mọi màn hình.
.container-md: Dưới 768px thì tràn viền (100%), từ 768px trở lên thì cố định có khoảng trắng (như .container). 

# CÂU C1
1. Quy trình đổi màu $primary sang #E63946
 - Công cụ cần thiết: Trình biên dịch SASS và mã nguồn SASS của Bootstrap.
 - Cách làm (File cần modify): Bạn tạo một file SCSS của riêng mình (VD: style.scss). Khai báo biến $primary: #E63946; trước dòng lệnh @import "node_modules/bootstrap/scss/bootstrap";. Sau đó compile file này ra CSS để dùng.

2. Tại sao KHÔNG override trực tiếp mà nên dùng SASS Variables?
 - Tính đồng bộ toàn hệ thống: Khi đổi biến SASS, Bootstrap tự động tính toán và cập nhật màu cho tất cả các thành phần liên quan (nút bấm, viền, chữ, alert) và cả các trạng thái tương tác (:hover, :active, :focus). Nếu override .btn-primary, bạn chỉ đổi được cái nút đó, các trạng thái hover hay các component khác vẫn giữ màu cũ.
 - Tối ưu hiệu suất và dung lượng: Ghi đè CSS bắt trình duyệt tải mã cũ rồi lại tải thêm mã mới để đè lên. Dùng SASS biến dịch sẽ tạo ra một bộ CSS chuẩn, gọn gàng và duy nhất ngay từ đầu.

# CÂU C2
**Số dòng CSS cần viết:**
 - CSS thuần: Rất nhiều (thường >100 dòng cho layout flexbox, thẻ, và hàng tá media queries cho responsive).
 - Bootstrap: Gần như 0 dòng CSS. Layout được dựng hoàn toàn bằng việc nối các class tiện ích có sẵn vào file HTML.

**Thời gian phát triển:**
 - CSS thuần: Lâu hơn, tốn thời gian căn chỉnh và test lỗi responsive trên từng thiết bị.
 - Bootstrap: Cực kỳ nhanh. Giống như trò chơi xếp hình, thuộc tên class là dựng xong giao diện ngay lập tức.

**Khả năng tùy biến:**
 - CSS thuần: Tuyệt đối (100%). Bạn làm chủ từng pixel, dễ dàng phá cách.
 - Bootstrap: Hạn chế và dễ bị "rập khuôn". Giao diện nhìn thường có nét giống nhau. Để tùy biến sâu đòi hỏi phải hiểu rõ cấu trúc SASS của Bootstrap.

**Khi nào NÊN và KHÔNG NÊN dùng Bootstrap:**
 - NÊN DÙNG: Các dự án cần tốc độ ra mắt nhanh (MVP, Prototype), các hệ thống quản trị nội bộ (Admin Dashboard), hoặc các website chú trọng tính năng hơn là thiết kế UI độc quyền.
 - KHÔNG NÊN DÙNG: Các website yêu cầu tính nghệ thuật, sáng tạo hoặc nhận diện thương hiệu cao (Portfolio, Landing Page quảng bá campaign độc lạ), hoặc các dự án khắt khe về tối ưu hiệu suất (vì Bootstrap chứa rất nhiều class CSS thừa không dùng tới).