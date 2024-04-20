function filterSelection(category) {
    const gallery = document.getElementById('gallery');
    const images = gallery.querySelectorAll('.photo');
    images.forEach(img => {
        if (category === 'all' || img.dataset.category === category) {
            img.style.display = 'block';
        } else {
            img.style.display = 'none';
        }
    });
}
document.addEventListener('DOMContentLoaded', function () {
    const gallery = document.querySelector('.photo-container');
    gallery.addEventListener('click', function (e) {
        if (e.target.tagName === 'IMG') {
            const fullResUrl = e.target.getAttribute('data-fullres');
            if (fullResUrl) {
                const modal = document.createElement('div');
                modal.style.position = 'fixed';
                modal.style.top = 0;
                modal.style.left = 0;
                modal.style.width = '100%';
                modal.style.height = '100%';
                modal.style.backgroundColor = 'rgba(0, 0, 0, 0.8)';
                modal.style.display = 'flex';
                modal.style.justifyContent = 'center';
                modal.style.alignItems = 'center';
                modal.innerHTML = `<img src="${fullResUrl}" style="max-width:80%; max-height:80%;">`;
                modal.onclick = () => modal.remove();
                document.body.appendChild(modal);
            }
        }
    });
});


