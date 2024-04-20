document.addEventListener('DOMContentLoaded', () => {
    const gallery = document.querySelector('.photo-container');
    let currentFullResImage;
    let modalOpen = false;

    gallery.addEventListener('click', function (e) {
        if (e.target.tagName === 'IMG') {
            currentFullResImage = e.target;
            openModal(currentFullResImage);
        }
    });

    function openModal(img) {
        closeModal(); // Ensure any existing modals are closed
        const fullResUrl = img.getAttribute('data-fullres');

        const modal = document.createElement('div');
        modal.id = 'image-modal';
        modal.classList.add('image-modal-style'); // Use a class for styling instead of inline
        modal.innerHTML = `<img src="${fullResUrl}" class="modal-img-style">`; // Use a class for styling
        modal.onclick = closeModal;
        document.body.appendChild(modal);
        modalOpen = true;
    }

    function closeModal() {
        const modal = document.getElementById('image-modal');
        if (modal) {
            modal.remove();
            modalOpen = false;
        }
    }

    function changeImage(step) {
        if (!modalOpen || !currentFullResImage) return;
        let newImage = currentFullResImage;
        do {
            newImage = (step === 1) ? newImage.nextElementSibling : newImage.previousElementSibling;
        } while (newImage && newImage.tagName !== 'IMG');
        
        if (newImage) {
            currentFullResImage = newImage;
            openModal(newImage);
        }
    }

    document.addEventListener('keydown', function (e) {
        if (!modalOpen) return;
        if (e.key === 'Escape') {
            closeModal();
        } else if (e.key === 'ArrowRight') {
            changeImage(1);
        } else if (e.key === 'ArrowLeft') {
            changeImage(-1);
        }
    });
});
