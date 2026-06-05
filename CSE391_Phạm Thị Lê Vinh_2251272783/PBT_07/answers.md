# CÂU A1

**Đoạn 1**
Dự đoán Output: undefined

Giải thích: Kết quả này xảy ra do cơ chế Hoisting trong JavaScript. Khi dùng var, phần khai báo biến (var x) sẽ được trình duyệt ngầm kéo lên trên cùng của phạm vi (scope), nhưng phần gán giá trị (= 5) thì vẫn giữ nguyên ở dòng cũ. Do đó, khi gọi console.log(x), biến x đã tồn tại trong bộ nhớ nhưng chưa có giá trị, nên trả về undefined.

**Đoạn 2**
Dự đoán Output: Lỗi ReferenceError: Cannot access 'y' before initialization (Trình duyệt sẽ dừng thực thi).

Giải thích (Kết quả bất ngờ): Nhiều người nghĩ let không có Hoisting, nhưng thực tế let và const vẫn được Hoisting. Tuy nhiên, chúng bị đưa vào một vùng gọi là Temporal Dead Zone (TDZ) – Vùng chết tạm thời. Từ đầu phạm vi cho đến dòng code thực sự khai báo let y = 10, bạn không được phép truy cập vào biến này.

**Đoạn 3**
Dự đoán Output: Lỗi TypeError: Assignment to constant variable.

Giải thích: Đặc điểm cốt lõi của const là tạo ra một hằng số. Trình duyệt không cho phép bạn gán lại (reassign) một giá trị mới cho biến z sau khi nó đã được khởi tạo ban đầu.

**Đoạn 4**
Dự đoán Output: [1, 2, 3, 4]

Giải thích (Kết quả bất ngờ): Tại sao dùng const mà mảng vẫn bị thay đổi? Khái niệm const trong JavaScript chỉ bảo vệ địa chỉ ô nhớ (tham chiếu) của biến, chứ không làm cho bản thân dữ liệu trở nên bất biến (immutable). Bạn không thể gán mảng mới (ví dụ: arr = [5, 6]), nhưng hoàn toàn có thể thay đổi thuộc tính bên trong hoặc thêm/bớt phần tử của mảng/object đó bằng các phương thức như .push().

**Đoạn 5**
Dự đoán Output: ```text
Trong block: 2
Ngoài block: 1

Giải thích: Cả let và const đều có phạm vi khối (Block Scope). Bất kỳ cặp ngoặc nhọn { } nào cũng tạo ra một phạm vi mới. Biến let a = 2 khai báo bên trong khối là một biến hoàn toàn độc lập và chỉ sống trong cặp ngoặc nhọn đó. Nó che khuất (shadow) biến a bên ngoài trong lúc đang ở trong khối, nhưng không làm thay đổi giá trị của biến a ban đầu. Do đó, khi thoát ra ngoài khối, a vẫn mang giá trị là 1.

# CÂU A2
console.log(typeof null);        // "object" (Đây là một lỗi lịch sử nổi tiếng của JS)
console.log(typeof undefined);   // "undefined"
console.log(typeof NaN);         // "number" (NaN nghĩa là Not-a-Number, nhưng kiểu dữ liệu của nó lại là number)
console.log("5" + 3);            // "53"
console.log("5" - 3);            // 2
console.log("5" * "3");          // 15
console.log(true + true);        // 2 (true được ép kiểu thành 1, nên 1 + 1 = 2)
console.log([] + []);            // "" (Mảng rỗng ép kiểu thành chuỗi rỗng "")
console.log([] + {});            // "[object Object]" ("" cộng với chuỗi đại diện của object)
console.log({} + []);            // "[object Object]" (Tương tự như trên khi nằm trong biểu thức console.log)


1. Tại sao "5" + 3 ra "53"?
Toán tử + có 2 chức năng: Cộng số học (Math) hoặc Nối chuỗi (String Concatenation).

Quy tắc: Nếu có ít nhất một toán hạng là Chuỗi (String) - ở đây là "5", JavaScript sẽ ưu tiên tính năng Nối chuỗi.

Xử lý: Số 3 tự động bị ép kiểu thành chuỗi "3". Kết quả: "5" + "3" = "53".

2. Tại sao "5" - 3 ra 2?
Toán tử - (cùng với *, /, %) chỉ có 1 chức năng duy nhất: Phép tính toán học (Math).

Quy tắc: JavaScript buộc phải thực hiện phép trừ toán học.

Xử lý: Nó tự động cố gắng ép kiểu chuỗi "5" thành số 5 hợp lệ. Kết quả: 5 - 3 = 2.

# CÂU A3
**Liệt kê TẤT CẢ giá trị Falsy trong JavaScript:**
Trong JS, chỉ có đúng 6 giá trị sau đây được coi là Falsy (khi ép kiểu sang Boolean sẽ thành false):
1, false
2, 0 (số không)
3,"" (chuỗi rỗng)
4, null
5, undefined
6, NaN (Not a Number)
(Tất cả những giá trị không nằm trong danh sách này đều là Truthy).



# CÂU A4

**Dự đoán kết quả in:**
if ("0") console.log("A");    // IN (Chuỗi có chứa ký tự "0" là Truthy)
if ("") console.log("B");     // KHÔNG in (Chuỗi rỗng là Falsy)
if ([]) console.log("C");     // IN (Mảng rỗng là Object, Object luôn là Truthy)
if ({}) console.log("D");     // IN (Object rỗng luôn là Truthy)
if (null) console.log("E");   // KHÔNG in (null là Falsy)
if (0) console.log("F");      // KHÔNG in (Số 0 là Falsy)
if (-1) console.log("G");     // IN (Mọi số khác 0 đều là Truthy, kể cả số âm)
if (" ") console.log("H");    // IN (Chuỗi có chứa dấu cách không phải chuỗi rỗng, là Truthy)

# CÂU A5
// Cách 1: Nối chuỗi cơ bản
var greeting = `Xin chào ${name}! Bạn ${age} tuổi.`;

// Cách 2: Nối URL API
var url = `https://api.example.com/users/${userId}/orders?page=${page}`;

// Cách 3: Nối thẻ HTML (Template Literal hỗ trợ tự động xuống dòng rất tiện lợi)
var html = `
<div class="card">
    <h2>${title}</h2>
    <p>${description}</p>
    <span>Giá: ${price}đ</span>
</div>
;


# CÂU C1

1. if (giaSauGiam = 0): Lỗi dùng dấu gán (=) thay vì so sánh. Sửa: Thay bằng === 0.

2. Lỗi ẩn var trong vòng lặp: var không có block scope (phạm vi khối). Khi setTimeout chạy, vòng lặp đã xong, biến i đều trỏ về giá trị cuối cùng là 5. Sửa: Đổi var thành let để mỗi vòng lặp giữ một bản sao i riêng biệt.

3. "100000": Truyền giá bán dạng chuỗi dễ gây lỗi phép tính. Sửa: Truyền số 100000.

4. return sai kiểu: Báo lỗi trả về Chuỗi, tính toán thành công trả về Số (thiếu đồng nhất). Sửa: Dùng throw new Error(...) để báo lỗi.

5. Thiếu validate giaBan: Code chưa chặn trường hợp giá bán là số âm. Sửa: Thêm điều kiện if (giaBan <= 0).

6. Dùng var giamGia: Cú pháp cũ, dễ lỗi rò rỉ biến. Sửa: Đổi thành const.