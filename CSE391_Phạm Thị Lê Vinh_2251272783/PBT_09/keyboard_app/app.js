// 1. DATA & STATE

const images = Array.from({ length: 9 }, (_, i) => `https://placehold.co/800x500/333/FFF?text=Image+${i + 1}`);
const commands = [
    { id: 'theme', name: 'Đổi giao diện Sáng/Tối', action: () => alert('Đã đổi giao diện!') },
    { id: 'settings', name: 'Mở Cài đặt hệ thống', action: () => alert('Đang mở cài đặt...') },
    { id: 'play', name: 'Bật Slideshow ảnh', action: () => { isPlaying = false; toggleSlideshow(); } },
    { id: 'pause', name: 'Tắt Slideshow ảnh', action: () => { isPlaying = true; toggleSlideshow(); } },
    { id: 'reload', name: 'Tải lại trang', action: () => location.reload() }
];

let currentIndex = 0;
let isPlaying = false;
let slideshowInterval;
let previousFocusElement = null; // Lưu phần tử đang focus trước khi mở Modal để trả lại focus khi đóng


// 2. DOM ELEMENTS

const imageGrid = document.getElementById('imageGrid');
const imageModal = document.getElementById('imageModal');
const modalImage = document.getElementById('modalImage');
const imageIndicator = document.getElementById('imageIndicator');
const btnPlayPause = document.getElementById('btnPlayPause');
const slideshowStatus = document.getElementById('slideshowStatus');

const commandPalette = document.getElementById('commandPalette');
const paletteInput = document.getElementById('paletteInput');
const commandList = document.getElementById('commandList');

// 3. GALLERY LOGIC

function renderGallery() {
    images.forEach((src, index) => {
        const btn = document.createElement('button');
        btn.ariaLabel = `Xem ảnh số ${index + 1}`;
        btn.className = 'thumbnail-btn';

        const img = document.createElement('img');
        img.src = src;
        img.className = 'thumbnail';
        img.alt = `Thumbnail ${index + 1}`;

        btn.appendChild(img);
        btn.addEventListener('click', () => openModal(index));
        imageGrid.appendChild(btn);
    });
}

function openModal(index) {
    previousFocusElement = document.activeElement; // Lưu lại focus hiện tại
    currentIndex = index;
    updateModalContent();
    imageModal.hidden = false;
    modalImage.focus(); // Đẩy focus vào ảnh để user dễ dàng dùng phím mũi tên
}

function closeModal() {
    imageModal.hidden = true;
    if (isPlaying) toggleSlideshow(); // Dừng auto-play nếu đang bật
    if (previousFocusElement) previousFocusElement.focus(); // Trả lại focus
}

function updateModalContent() {
    modalImage.src = images[currentIndex];
    imageIndicator.textContent = `${currentIndex + 1} / ${images.length}`;
}

function nextImage() {
    currentIndex = (currentIndex === images.length - 1) ? 0 : currentIndex + 1;
    updateModalContent();
}

function prevImage() {
    currentIndex = (currentIndex === 0) ? images.length - 1 : currentIndex - 1;
    updateModalContent();
}

function toggleSlideshow() {
    isPlaying = !isPlaying;
    if (isPlaying) {
        btnPlayPause.innerHTML = '⏸ Pause Slideshow (Space)';
        slideshowStatus.textContent = '(Đang tự động chuyển ảnh...)';
        slideshowInterval = setInterval(nextImage, 2000);
        if (imageModal.hidden) openModal(currentIndex); // Tự bật modal nếu đang ở ngoài
    } else {
        btnPlayPause.innerHTML = '▶ Play Slideshow (Space)';
        slideshowStatus.textContent = '';
        clearInterval(slideshowInterval);
    }
}

// 4. COMMAND PALETTE LOGIC

function renderCommands(filterText = '') {
    commandList.innerHTML = '';
    const filtered = commands.filter(cmd => cmd.name.toLowerCase().includes(filterText.toLowerCase()));

    if (filtered.length === 0) {
        commandList.innerHTML = '<li style="padding: 15px; color:#777;">Không tìm thấy lệnh nào...</li>';
        return;
    }

    filtered.forEach(cmd => {
        const li = document.createElement('li');
        li.setAttribute('role', 'option');

        const btn = document.createElement('button');
        btn.className = 'command-item';
        btn.textContent = cmd.name;
        // Thực thi lệnh khi Enter (hoặc click)
        btn.addEventListener('click', () => {
            cmd.action();
            closePalette();
        });

        li.appendChild(btn);
        commandList.appendChild(li);
    });
}

function openPalette() {
    if (!commandPalette.hidden) return; // Tránh mở chồng
    previousFocusElement = document.activeElement;
    commandPalette.hidden = false;
    paletteInput.value = '';
    renderCommands();
    paletteInput.focus(); // Tự động focus vào ô search
}

function closePalette() {
    commandPalette.hidden = true;
    if (previousFocusElement) previousFocusElement.focus();
}

paletteInput.addEventListener('input', (e) => renderCommands(e.target.value));

// 5. GLOBAL KEYBOARD NAVIGATION
document.addEventListener('keydown', (e) => {
    const isModalOpen = !imageModal.hidden;
    const isPaletteOpen = !commandPalette.hidden;

    // 1. Ctrl + K (Mở Command Palette)
    if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        openPalette();
        return;
    }

    // 2. Phím Escape (Đóng Modal hoặc Palette)
    if (e.key === 'Escape') {
        if (isPaletteOpen) closePalette();
        else if (isModalOpen) closeModal();
        return;
    }

    // Nếu Palette đang mở, bỏ qua các phím tắt của Gallery (tránh xung đột gõ text)
    if (isPaletteOpen) return;

    // 3. Phím Space (Play/Pause Slideshow)
    // Chặn hành vi cuộn trang mặc định của Space
    if (e.key === ' ' || e.key === 'Spacebar') {
        if (document.activeElement.tagName !== 'BUTTON') {
            e.preventDefault();
            toggleSlideshow();
        }
    }

    // 4. Phím Mũi tên ← → (Chuyển ảnh)
    if (e.key === 'ArrowLeft') prevImage();
    if (e.key === 'ArrowRight') nextImage();

    // 5. Phím Số 1 - 9 (Nhảy đến ảnh)
    if (/^[1-9]$/.test(e.key)) {
        const targetIndex = parseInt(e.key) - 1;
        if (targetIndex < images.length) {
            if (!isModalOpen) openModal(targetIndex);
            else {
                currentIndex = targetIndex;
                updateModalContent();
            }
        }
    }
});

// Gắn sự kiện click cho các nút của Gallery Modal
document.getElementById('btnCloseModal').addEventListener('click', closeModal);
document.getElementById('btnPrev').addEventListener('click', prevImage);
document.getElementById('btnNext').addEventListener('click', nextImage);
btnPlayPause.addEventListener('click', toggleSlideshow);

// Khởi tạo
renderGallery();