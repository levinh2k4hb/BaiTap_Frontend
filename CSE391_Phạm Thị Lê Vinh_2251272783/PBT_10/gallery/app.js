let page = 1;
const gallery = document.getElementById('gallery');
const loader = document.getElementById('loading');
const lightbox = document.getElementById('lightbox');

// IntersectionObserver cho Infinite Scroll
const observer = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting) loadMorePhotos();
});
observer.observe(document.querySelector("#load-trigger"));

// Lazy Loading cho ảnh (IntersectionObserver thứ 2)
const imgObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const img = entry.target;
            img.src = img.dataset.src; // Gán src thực tế
            imgObserver.unobserve(img);
        }
    });
});

async function loadMorePhotos() {
    loader.classList.remove('hidden');
    try {
        const res = await fetch(`https://jsonplaceholder.typicode.com/photos?_page=${page}&_limit=20`);
        const photos = await res.json();

        photos.forEach(photo => {
            const img = document.createElement('img');
            img.className = 'photo-item';
            img.dataset.src = photo.url; // Lazy load
            img.addEventListener('click', () => {
                document.getElementById('lightbox-img').src = photo.url;
                lightbox.classList.remove('hidden');
            });
            gallery.appendChild(img);
            imgObserver.observe(img); // Quan sát ảnh để load lazy
        });
        page++;
    } catch (e) { console.error(e); }
    loader.classList.add('hidden');
}

lightbox.addEventListener('click', () => lightbox.classList.add('hidden'));