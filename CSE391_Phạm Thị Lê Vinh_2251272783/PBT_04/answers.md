# CÂU A1        

| Position | Vẫn chiếm chỗ trong flow? | Tham chiếu vị trí | Cuộn theo trang? | Use case |
| :--- | :--- | :--- | :--- | :--- |
| `static` | **Có** | Theo luồng tài liệu mặc định (Normal flow) | **Có** | Là giá trị mặc định. Dùng cho các phần tử sắp xếp tuần tự bình thường. |
| `relative` | **Có** | Vị trí ban đầu của chính nó | **Có** | Dịch chuyển nhẹ phần tử; làm "điểm neo" (container) để định vị phần tử con `absolute`. |
| `absolute` | **Không**  | Phần tử cha/tổ tiên gần nhất có `position` khác `static` | **Có** (Cuộn cùng nội dung chứa nó) | Popup, Tooltip, Dropdown menu, hoặc nút "X" (close) góc thẻ. |
| `fixed` | **Không** | Viewport (Khung nhìn của cửa sổ trình duyệt) | **Không** (Ghim cố định trên màn hình) | Thanh điều hướng (Navbar) luôn nổi, nút "Back to top", Chatbox góc dưới. |
| `sticky` | **Có** | Ban đầu như `relative`, khi cuộn đến ngưỡng sẽ đổi thành hệ quy chiếu Viewport (như `fixed`) | **Vừa có vừa không** (Cuộn theo trang cho đến khi chạm ngưỡng thì "dính" lại) | Tiêu đề các nhóm danh bạ, thanh menu cuộn theo nhưng dính lại ở mép trên màn hình. |

Khi thẻ cha trực tiếp của nó được cài đặt position là relative, absolute, fixed, hoặc sticky.

