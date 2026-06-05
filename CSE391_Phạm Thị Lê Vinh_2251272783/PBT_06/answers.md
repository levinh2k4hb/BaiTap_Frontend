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