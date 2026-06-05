# CÂU A1

Thứ tự Output:
1 - Start

4 - End

3 - Promise

6 - Promise 2

2 - Timeout 0ms

7 - Nested timeout

5 - Timeout 100ms



**Giải thích cơ chế:**

Sync Code (Đồng bộ): Chạy đầu tiên, từ trên xuống dưới (1 và 4).

Event Loop: Cơ chế liên tục kiểm tra Call Stack (nơi thực thi code). Khi Call Stack rỗng, nó sẽ ưu tiên lấy code từ Microtask Queue chạy trước, sau đó mới đến Macrotask Queue.

Microtask Queue (Ưu tiên cao): Chứa callback của Promise. Event Loop sẽ chạy toàn bộ các task trong hàng đợi này ngay sau khi Sync code kết thúc (3 và 6).

Macrotask Queue (Ưu tiên thấp): Chứa callback của setTimeout. Chỉ chạy khi Call Stack và Microtask Queue đã hoàn toàn rỗng.

(2) xếp hàng từ đầu với delay 0ms nên chạy trước.

(7) được đưa vào hàng đợi trong lúc chạy Promise (6), nên chạy ngay sau (2).

(5) bị delay 100ms nên chạy cuối cùng.

# CÂU A2

1. await fetch(...)

fetch trả về gì? Trả về một Promise.

Tại sao cần await? Để tạm dừng thực thi code, chờ trình duyệt gọi mạng xong và biến Promise đó thành kết quả thực tế (đối tượng Response).

2. response.ok

Khi nào false? Khi mã trạng thái HTTP (status code) nằm ngoài khoảng thành công 200 - 299.

3 status codes tương ứng: 404 (Not Found), 500 (Internal Server Error), 401 (Unauthorized) hoặc 403 (Forbidden).

3. response.json()

Tại sao cần await lần nữa? Vì quá trình đọc luồng dữ liệu (body stream) tải về từ server và phân tích cú pháp (parse) thành Object JSON cũng cần thời gian chờ, nên hàm này tiếp tục trả về một Promise khác.

4. try...catch catch những lỗi gì?
Bắt được cả 3 loại lỗi bạn nêu, nhưng theo các cơ chế khác nhau:

Network error (mất mạng, server sập): Bị catch tóm ngay lập tức vì bản thân hàm fetch() sẽ reject.

JSON parse error (định dạng sai, server trả về HTML thay vì JSON): Hàm response.json() sẽ reject và văng xuống catch.

Lỗi 404/500: Theo mặc định của Fetch API, nó KHÔNG coi 404/500 là lỗi mạng (Promise vẫn resolve). Nhưng vì trong code có dòng if (!response.ok) throw new Error(...), nên lỗi này đã bị chủ động ném ra và rơi vào catch.

# CÂU A3

1. Sơ đồ 3 trạng thái của Promise
Pending: Trạng thái chờ, chưa xong.

Fulfilled: Xong rồi, ngon lành, chạy .then().

Rejected: Lỗi rồi, tèo, chạy .catch().

2. Callback Hell là gì?
Là tình trạng lồng quá nhiều callback vào nhau ("Pyramid of Doom").

Hậu quả: Code bị thụt lùi vào trong nhìn như hình tam giác, cực kỳ rối, khó debug và khó quản lý lỗi.

3. Ví dụ Callback Hell (4 cấp)
JavaScript
// Cảnh báo: code kiểu này dễ bị "trầm cảm"
getUser(userId, (user) => {
    getPosts(user.id, (posts) => {
        getComments(posts[0].id, (comments) => {
            getAuthorDetails(comments[0].authorId, (author) => {
                console.log(author);
            });
        });
    });
});
4. Refactor thành Async/Await
Dùng async/await giúp code chạy tuần tự, sạch sẽ như code đồng bộ, dễ bắt lỗi bằng try...catch.

JavaScript
async function getData(userId) {
    try {
        const user = await getUser(userId);
        const posts = await getPosts(user.id);
        const comments = await getComments(posts[0].id);
        const author = await getAuthorDetails(comments[0].authorId);
        
        console.log(author);
    } catch (err) {
        // Gom hết lỗi vào đây, cực tiện
        console.error("Lỗi rồi:", err);
    }
}

# CÂU C1

**Error Handling Strategy**
1. Network Errors: Thông báo cho user "Mất kết nối", hiển thị nút "Thử lại", kiểm tra trạng thái mạng bằng navigator.onLine.
2. API Errors:
- 404: Hiện "Không tìm thấy dữ liệu".
- 429: Hiện "Quá nhiều yêu cầu", khuyên user chờ vài giây (Rate Limiting).
- 500: Hiện "Server đang bận", báo lỗi cho admin.Timeout (10s):JavaScriptasync function fetchWith


3. Timeout(url, ms = 10000) {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), ms);
    const response = await fetch(url, { signal: controller.signal });
    clearTimeout(timer);
    return response;
}


4. Retry logic (3 lần):JavaScriptasync function fetchWithRetry(url, maxRetries = 3) {
    for (let i = 0; i < maxRetries; i++) {
        try { return await fetch(url); } 
        catch (err) { if (i === maxRetries - 1) throw err; }
    }
}


# CÂU C2
**Promise Methods Comparison**
.all()

Resolve khi nào? Tất cả đều xong
Reject khi nào? Chỉ cần 1 cái lỗi
Ví dụ thực tế: Load 3 cái API bắt buộc (thiếu 1 là vỡ trang).

.allSettled()

Resolve khi nào? Luôn xong hết
Reject khi nào? Không bao giờ
Ví dụ thực tế: Load widget Dashboard (cái nào lỗi kệ nó, cái nào xong thì hiện).

.race()

Resolve khi nào? Cái nào nhanh nhất
Reject khi nào? Cái nào lỗi trước
Ví dụ thực tế: Gọi tới 2 server, ai nhanh hơn thì lấy kết quả đó.

.any()

Resolve khi nào? Cái nào xong trước
Reject khi nào? Tất cả đều lỗi
Ví dụ thực tế: Lấy data từ 3 nguồn, chỉ cần 1 nguồn sống là được.
