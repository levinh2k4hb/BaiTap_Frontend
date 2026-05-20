1. type="email" → Ô nhập text có kiểm tra định dạng email, tự báo lỗi nếu thiếu @ hoặc sai cú pháp → Dùng cho ô email đăng ký, đăng nhập, nhận hóa đơn
2. type="password" → Ô nhập text che ký tự bằng dấu chấm hoặc dấu sao → Dùng cho mật khẩu tài khoản, đổi mật khẩu, tạo tài khoản mới
3. type="tel" → Ô nhập text cho số điện thoại, không tự ép định dạng quá chặt → Dùng cho số điện thoại liên hệ, xác nhận đơn hàng, giao hàng
4. type="number" → Ô nhập số có nút tăng/giảm tùy trình duyệt → Dùng cho số lượng sản phẩm, số lượng vé, số người đặt hàng
5. type="search" → Ô tìm kiếm giống text nhưng tối ưu cho tra cứu → Dùng cho thanh tìm kiếm sản phẩm, thương hiệu, mã đơn hàng
6. type="url" → Ô nhập text kiểm tra có đúng định dạng đường dẫn web → Dùng cho link website cửa hàng, link mạng xã hội, link theo dõi đơn hàng
7. type="date" → Ô chọn ngày bằng lịch của trình duyệt → Dùng cho ngày sinh khách hàng, ngày nhận hàng, ngày đặt lịch giao
8. type="time" → Ô chọn giờ/phút theo giao diện của trình duyệt → Dùng cho chọn khung giờ giao hàng, giờ nhận hàng, lịch hẹn tư vấn
9. type="range" → Thanh trượt kéo để chọn giá trị trong một khoảng → Dùng cho bộ lọc giá sản phẩm, mức đánh giá, khoảng giá khuyến mãi
10. type="checkbox" → Ô chọn/bỏ chọn từng mục, có thể chọn nhiều → Dùng cho chọn phương thức thanh toán, đồng ý điều khoản, lọc thuộc tính sản phẩm

---

### Câu A2 — Validation Attributes (dự đoán)

1. `<input type="text" required value="">` → Khi user để trống và nhấn Submit: Trình duyệt sẽ chặn submit và hiển thị thông báo lỗi rằng trường này là bắt buộc (native required validation). Vì `required` buộc input phải có giá trị nên `checkValidity()` trả về false.

2. `<input type="email" value="abc">` → Khi user gõ "abc" và Submit: Trình duyệt sẽ chặn submit và thông báo lỗi format email không đúng (thiếu `@`/domain). `type="email"` khiến browser kiểm tra cú pháp email cơ bản.

3. `<input type="number" min="1" max="10" value="15">` → Khi user gõ 15 và Submit: Trình duyệt sẽ chặn submit vì giá trị vượt `max` (15 &gt; 10); `checkValidity()` trả về false và `validationMessage` báo giá trị lớn hơn `max`.

4. `<input type="text" pattern="[0-9]{10}" value="abc123">` → Khi user gõ "abc123" và Submit: Trình duyệt sẽ chặn submit vì chuỗi không khớp pattern (pattern yêu cầu đúng 10 chữ số). `pattern` dùng full-match nên bất kỳ ký tự chữ cái sẽ làm fail.

5. `<input type="password" minlength="8" value="123">` → Khi user gõ "123" và Submit: Trình duyệt sẽ chặn submit vì chiều dài nhỏ hơn `minlength`; `validationMessage` sẽ thông báo số ký tự tối thiểu.

Tất cả các trường trên đều sẽ ngăn form submit bởi browser-native validation (trừ khi form có attribute `novalidate` hoặc validation bị bypass bằng JS). Dự đoán: native validation sẽ ngăn submit và hiển thị thông báo tương ứng cho từng trường.

---

### Kế hoạch kiểm tra (thực tế)

Mình tạo file `validation_test.html` chứa 5 input trên trong một form. Khi nhấn Submit, một script sẽ ngăn submit mặc định, thu thập `checkValidity()` và `validationMessage` cho từng input, rồi hiển thị kết quả trên trang — điều này giúp chụp screenshot trạng thái validation dễ đọc và so sánh với dự đoán.

Kết quả kiểm tra thực tế sẽ được thêm dưới đây sau khi chạy test và chụp ảnh.
