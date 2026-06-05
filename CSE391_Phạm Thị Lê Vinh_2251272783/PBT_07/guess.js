function playGame() {
    // 1. Máy random số từ 1 đến 100
    const targetNumber = Math.floor(Math.random() * 100) + 1;
    
    const maxTries = 7;
    let attempts = 0;
    let guessedNumbers = []; // Mảng lưu các số đã đoán để kiểm tra trùng lặp

    // 2. Vòng lặp game
    while (attempts < maxTries) {
        let input = prompt(`Lượt ${attempts + 1}/${maxTries}.\nNhập một số từ 1 đến 100:`);

        // Xử lý nếu người dùng bấm nút "Cancel"
        if (input === null) {
            alert("Bạn đã thoát game.");
            return; 
        }

        let guess = parseInt(input);

        // 3. Validate input: Chỉ chấp nhận số từ 1 - 100
        if (isNaN(guess) || guess < 1 || guess > 100) {
            alert("Lỗi: Vui lòng chỉ nhập SỐ từ 1 đến 100!");
            continue; // Bỏ qua, bắt nhập lại, KHÔNG tính là 1 lượt đoán
        }

        // 4. Validate trùng lặp: Kiểm tra số đã đoán chưa
        if (guessedNumbers.includes(guess)) {
            alert("Cảnh báo: Bạn đã đoán số này rồi! Hãy thử số khác.");
            continue; // Bỏ qua, KHÔNG tính là 1 lượt đoán
        }

        // Nếu hợp lệ, ghi nhận lượt đoán
        guessedNumbers.push(guess);
        attempts++;

        // 5. Kiểm tra kết quả
        if (guess === targetNumber) {
            alert(`Đúng rồi! Bạn đoán đúng sau ${attempts} lần!`);
            return; // Kết thúc game ngay lập tức (Thắng)
        } else if (guess < targetNumber) {
            alert("Cao hơn! Số bí mật lớn hơn " + guess);
        } else {
            alert("Thấp hơn! Số bí mật nhỏ hơn " + guess);
        }
    }

    // 6. Hết vòng lặp (đã đủ 7 lần) mà chưa return -> Thua
    alert(`Bạn đã hết ${maxTries} lượt! Game Over.\nĐáp án đúng là: ${targetNumber}`);
}