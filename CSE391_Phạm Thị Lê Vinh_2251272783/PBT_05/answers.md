# CÂU A1
1.
<meta name="viewport" content="width=device-width, initial-scale=1.0">
- name="viewport": Khai báo cho trình duyệt biết meta tag này dùng để điều khiển "viewport" (khung nhìn/vùng hiển thị) của trang web
- width=device-width: Chỉ định chiều rộng của viewport bằng đúng với chiều rộng vật lý của màn hình thiết bị đang sử dụng (đơn vị là CSS pixel)
- initial-scale=1.0: Thiết lập mức độ thu phóng (zoom) ban đầu là 100% khi trang web vừa được tải xong, đảm bảo nội dung hiển thị theo đúng kích thước thực tế mà CSS đã định dạng.
2.iPhone sẽ giả định rằng đây là một trang web được thiết kế riêng cho màn hình Desktop
3.
- Mobile-First (Ưu tiên Di động):Bắt đầu từ thiết kế cơ bản nhất cho màn hình nhỏ, sau đó thêm dần các tính năng và layout phức tạp khi màn hình lớn hơn.CSS viết bên ngoài Media Query là dành cho Mobile. Sử dụng @media (min-width: ...) để nhắm vào màn hình lớn hơn.
- Desktop-First (Ưu tiên Máy tính) : Bắt đầu với thiết kế đầy đủ, phức tạp cho Desktop, sau đó "gọt giũa", ẩn bớt hoặc xếp lại layout khi màn hình nhỏ đi. CSS viết bên ngoài Media Query là dành cho Desktop.Sử dụng @media (max-width: ...) để nhắm vào màn hình nhỏ hơn.

# CÂU A2
Breakpoint (Class Prefix),Kích thước Pixel,Thiết bị Đại diện
X-Small (xs),< 576px,"Điện thoại di động (Mobile dọc/ngang) - iPhone, Samsung Galaxy"
Small (sm),>= 576px,"Máy tính bảng nhỏ (Tablet ngang), Điện thoại màn hình lớn ngang"
Medium (md),>= 768px,Máy tính bảng (Tablet dọc/ngang) - iPad
Large (lg),>= 992px,"Laptop nhỏ, Màn hình Desktop cơ bản"
Extra Large (xl),>= 1200px,"Màn hình Desktop lớn, iMac"
Extra Extra Large (xxl),>= 1400px,"Màn hình siêu lớn, TV 4K"

# CÂU A3
Chiều rộng màn hình,.container width
375px (iPhone SE),100%
600px,540px
800px,720px
1000px,960px
1400px,1140px

# CÂU A4
1. Variables (Biến)
- SCSS cho phép bạn lưu trữ các giá trị (như màu sắc, font chữ, kích thước,...) vào một "biến" bắt đầu bằng dấu $. Việc này giúp bạn tái sử dụng các giá trị này ở nhiều nơi và chỉ cần sửa ở một chỗ duy nhất khi muốn thay đổi.
Ví dụ:

SCSS
// Khai báo biến
$primary-color: #007bff;
$font-stack: Helvetica, sans-serif;

// Sử dụng biến
body {
  font-family: $font-stack;
  color: $primary-color;
}
2. Nesting (Viết CSS lồng nhau)
- SCSS cho phép bạn lồng các selector CSS vào bên trong nhau, tương tự như cấu trúc phân cấp của thẻ HTML. Điều này giúp code gọn gàng, dễ đọc và dễ quản lý phạm vi tác động hơn.
Ví dụ:

SCSS
nav {
  background: #333;

  ul {
    margin: 0;
    padding: 0;
    list-style: none;
  }

  li { display: inline-block; }

  a {
    color: white;
    text-decoration: none;
    
    // Dấu & đại diện cho selector cha (a)
    &:hover { color: red; } 
  }
}
3. Mixins (@mixin, @include)
- Mixin cho phép bạn đóng gói một nhóm các thuộc tính CSS lại với nhau để tái sử dụng nhiều lần. Khác với biến chỉ lưu 1 giá trị, Mixin có thể chứa nhiều dòng code và đặc biệt là có thể nhận tham số (như function trong lập trình) để linh hoạt tùy biến.
Ví dụ:

SCSS
// Tạo mixin có tham số
@mixin flex-center($direction) {
  display: flex;
  flex-direction: $direction;
  justify-content: center;
  align-items: center;
}

// Gọi mixin bằng @include
.container {
  @include flex-center(row);
  height: 100vh;
}
4. @extend / Inheritance (Kế thừa)
- @extend cho phép một class kế thừa (chia sẻ) tất cả các thuộc tính CSS của một class khác. Nó giúp giảm thiểu việc lặp lại code (DRY - Don't Repeat Yourself) và nhóm các selector có chung thuộc tính lại với nhau khi biên dịch ra CSS.
Ví dụ:

SCSS
// Class gốc
.btn {
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

// Class kế thừa
.btn-primary {
  @extend .btn; // Kế thừa toàn bộ thuộc tính của .btn
  background-color: blue;
  color: white;
}

.btn-danger {
  @extend .btn; // Kế thừa toàn bộ thuộc tính của .btn
  background-color: red;
  color: white;
}


** câu bổ sung **


Tại sao trình duyệt KHÔNG đọc được file .scss?
Trình duyệt web (như Chrome, Safari, Edge) chỉ được lập trình để hiểu và render 3 ngôn ngữ cơ bản là: HTML, CSS và JavaScript. Trình duyệt không có bộ phân giải (parser) để hiểu cú pháp mở rộng của SCSS (như $, @mixin, hay code lồng nhau). Nếu bạn nhúng trực tiếp file .scss vào HTML, trình duyệt sẽ bỏ qua và không áp dụng style.

Cần bước gì để chuyển SCSS → CSS?
Bạn cần một bước gọi là Biên dịch (Compile/Transpile).
Quá trình này sẽ sử dụng một công cụ (trình biên dịch Sass như Dart Sass, Node Sass, hoặc các extension như Live Sass Compiler trong VS Code) để đọc file .scss, xử lý các biến, mixin, cấu trúc lồng nhau... và cuối cùng xuất (export) ra một file .css tiêu chuẩn. Bạn sẽ link file .css tiêu chuẩn này vào HTML để trình duyệt đọc.