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

 # PHẦN B, TAILWINDCSS

 # CÂU A1
 1. Thẻ bao ngoài cùng (<div class="flex...">)
flex → display: flex
items-center → align-items: center (Căn giữa các phần tử theo trục dọc)
justify-between → justify-content: space-between (Đẩy các phần tử ra xa nhau sát 2 mép)
p-4 → padding: 1rem (16px)
bg-white → background-color: white
shadow-md → Tạo hiệu ứng bóng đổ (box-shadow) cỡ vừa
rounded-lg → border-radius: 0.5rem (8px) (Bo góc lớn)
hover:shadow-xl → Tăng kích thước bóng đổ (extra large shadow) khi di chuột qua
transition-shadow → Bật hiệu ứng chuyển động mượt (transition) cho thuộc tính shadow
duration-300 → transition-duration: 300ms (Thời gian chuyển động 0.3s)

2. Thẻ Avatar (<img ...>)
w-16 → width: 4rem (64px)
h-16 → height: 4rem (64px)
rounded-full → border-radius: 9999px (Bo tròn hoàn toàn thành hình tròn)
object-cover → object-fit: cover (Giữ tỷ lệ ảnh, cắt bớt phần thừa để lấp đầy khung)

3. Thẻ bọc nội dung chữ (<div class="ml-4 flex-1">)
ml-4 → margin-left: 1rem (16px)
flex-1 → flex: 1 1 0% (Tự động phình to để chiếm toàn bộ không gian còn trống)

4. Thẻ Tên (<h3 ...>)
text-lg → font-size: 1.125rem (18px)
font-semibold → font-weight: 600 (In đậm vừa)
text-gray-800 → color: #1f2937 (Màu chữ xám đậm)
truncate → Ngăn xuống dòng và thêm dấu ... nếu chữ quá dài (white-space: nowrap; overflow: hidden; text-overflow: ellipsis;)

5. Thẻ Chức danh (<p ...>)
text-sm → font-size: 0.875rem (14px)
text-gray-500 → color: #6b7280 (Màu chữ xám nhạt)

6. Thẻ Nút bấm (<button ...>)
px-4 → padding-left: 1rem; padding-right: 1rem; (Đệm ngang 16px)
py-2 → padding-top: 0.5rem; padding-bottom: 0.5rem; (Đệm dọc 8px)
bg-blue-500 → background-color: #3b82f6 (Nền xanh dương)
text-white → color: white
rounded-md → border-radius: 0.375rem (6px) (Bo góc vừa)
hover:bg-blue-600 → Đổi nền sang xanh dương đậm hơn khi di chuột
focus:ring-2 → Tạo viền ngoài (outline/box-shadow) 2px khi bấm/focus vào nút
focus:ring-blue-300 → Đổi màu viền focus đó sang xanh dương nhạt    


# CÂU A2
1. Responsive Prefixes (md:, lg:, xl:)
Tailwind sử dụng triết lý Mobile-First. Các class không có prefix sẽ áp dụng cho màn hình nhỏ nhất (mobile), các prefix sẽ ghi đè thuộc tính khi màn hình đạt đến một kích thước nhất định (breakpoint).
 - md: (Medium): Từ Tablet trở lên (thường $\ge$ 768px).
 - lg: (Large): Từ Desktop/Laptop trở lên (thường $\ge$ 1024px).
 - xl: (Extra Large): Từ màn hình lớn trở lên (thường $\ge$ 1280px).
**Ví dụ: md:grid-cols-2 lg:grid-cols-4 nghĩa là:**
Mobile (mặc định): Không chia cột (trừ khi bạn khai báo trước đó).
Tablet (từ md đến dưới lg): Giao diện chuyển thành lưới 2 cột.
Desktop (từ lg trở lên): Giao diện mở rộng thành lưới 4 cột.

2. State Modifiers (Trạng thái)
Đây là các tiền tố dùng để kích hoạt class CSS khi người dùng tương tác với phần tử:
 - hover:: Áp dụng khi người dùng di chuột (con trỏ) lên phần tử.
 - focus:: Áp dụng khi phần tử đang được chọn (VD: click vào ô input để gõ phím, hoặc dùng phím Tab di chuyển tới nút bấm).
 - active:: Áp dụng trong khoảnh khắc người dùng đang nhấn và giữ chuột trái vào phần tử (thường dùng làm hiệu ứng nút lún xuống).
 - group-hover:: Áp dụng hiệu ứng cho phần tử con khi người dùng hover vào phần tử cha (Yêu cầu: phần tử cha phải được gắn class group).
 
 3. Chuyển đổi class từ Bootstrap sang Tailwind
 Để "Ẩn trên mobile, hiện dạng flex trên tablet trở lên" (tương đương d-none d-md-flex của Bootstrap), bạn viết 2 class Tailwind sau:
  **hidden md:flex**
  Giải thích:
  - hidden: Ẩn phần tử (tương đương display: none;) áp dụng mặc định từ mobile.md:
  - flex: Ghi đè thành display: flex; khi màn hình đạt kích thước Tablet (md) trở lên.


# CÂU C1
**Tailwind vs CSS thuần**
HTML file size: CSS thuần giúp file HTML rất nhẹ. Tailwind làm file HTML nặng và dài hơn (do chứa hàng tá utility classes), nhưng bù lại file CSS tổng xuất ra cuối cùng lại cực nhẹ.

Maintainability: CSS thuần dễ đọc hơn do HTML gọn gàng. Tuy nhiên, Tailwind lại dễ sửa hơn vì khoanh vùng style trực tiếp trên từng thẻ, không sợ lỗi side-effect (sửa class chỗ này làm vỡ layout chỗ khác như CSS thuần).

Reusability: CSS thuần tái sử dụng bằng cách gắn chung một tên class (VD: .btn). Tailwind tái sử dụng hiệu quả nhất qua các Component Framework (React, Vue) hoặc dùng directive @apply để gom nhóm các utility class vào 1 class CSS truyền thống.


# CÂU C2
**Performance**
Tại sao file CSS nhỏ hơn Bootstrap? Bootstrap tải toàn bộ mã CSS của thư viện (kể cả những UI bạn không dùng tới). Tailwind chỉ sinh ra CSS cho những class mà bạn thực sự gõ trong file HTML.

PurgeCSS (Tailwind JIT) loại bỏ gì? Nó quét toàn bộ file HTML/JS và loại bỏ 100% dead code (các class CSS không được sử dụng) trước khi xuất ra file CSS cuối cùng.

Khi nào KHÔNG nên dùng Tailwind? (2 tình huống):
 - Làm web thuần HTML nhiều trang (không dùng React/Vue/Blade): Việc copy-paste mã HTML chứa quá nhiều class đi khắp nơi sẽ gây khó khăn cực lớn khi cần bảo trì, đổi màu đồng loạt.
 - Cần dựng nhanh MVP / Admin Dashboard có UI chuẩn mực: Sử dụng các thư viện có sẵn component như Bootstrap hay Ant Design sẽ tiết kiệm thời gian hơn nhiều so với việc tự "lắp ghép" từng nút bấm bằng Tailwind.