document.addEventListener('DOMContentLoaded', () => {

    const images = document.getElementsByTagName('img');
    for (let img of images) {
        // Disable context menu on right-click
        img.addEventListener('contextmenu', (e) => {
            e.preventDefault();
        });
        // Disable dragging of images
        img.addEventListener('dragstart', (e) => {
            e.preventDefault();
        });
    }

    // Function to filter the gallery based on the category selected
    window.filterSelection = function (category) {
        const images = document.querySelectorAll('.photo-container img');
        images.forEach(img => {
            img.style.display = img.getAttribute('data-category') === category || category === 'all' ? '' : 'none';
        });
    };

    const gallery = document.querySelector('.photo-container');
    let currentFullResImage;
    let modalOpen = false;

    const filters = document.querySelectorAll('.filter-item');
    filters.forEach(filter => {
        filter.addEventListener('click', function() {
            document.querySelector('.filter-item.active')?.classList.remove('active');
            filter.classList.add('active');
        });
    });

    // Function to open the image in a modal view
    function openModal(img) {
        closeModal(); // Ensure any existing modals are closed
        const fullResUrl = img.getAttribute('data-fullres');
        currentFullResImage = img;
    
        const modal = document.createElement('div');
        modal.id = 'image-modal';
        modal.classList.add('image-modal-style');
        const modalImg = document.createElement('img');
        modalImg.src = fullResUrl;
        modalImg.classList.add('modal-img-style');
    
        // Disable context menu and dragging on the modal image
        modalImg.addEventListener('contextmenu', e => e.preventDefault());
        modalImg.addEventListener('mousedown', e => e.preventDefault()); // Disables dragging

        const leftArrow = document.createElement('div');
        leftArrow.innerHTML = '&#9664;'; // HTML entity for left-pointing triangle
        leftArrow.classList.add('modal-arrow', 'modal-arrow-left');
        leftArrow.onclick = () => changeImage(-1);
    
        // Create right arrow
        const rightArrow = document.createElement('div');
        rightArrow.innerHTML = '&#9654;'; // HTML entity for right-pointing triangle
        rightArrow.classList.add('modal-arrow', 'modal-arrow-right');
        rightArrow.onclick = () => changeImage(1);


    
        modal.appendChild(modalImg);
        modal.appendChild(leftArrow);
        modal.appendChild(rightArrow);
        modal.onclick = closeModal;
        document.body.appendChild(modal);
        modalOpen = true;
    }

    // Function to close the modal view
    function closeModal() {
        const modal = document.getElementById('image-modal');
        if (modal) {
            modal.remove();
            modalOpen = false;
        }
    }

    // Function to change the currently displayed image in the modal view
    function changeImage(step) {
        if (!modalOpen || !currentFullResImage) return;
        let newImage = currentFullResImage;
        do {
            newImage = (step === 1) ? newImage.nextElementSibling : newImage.previousElementSibling;
        } while (newImage && newImage.tagName !== 'IMG');
        
        if (newImage && newImage.style.display !== 'none') {
            currentFullResImage = newImage;
            openModal(newImage);
        }
    }

    // Event listener for opening modal on image click
    gallery.addEventListener('click', function (e) {
        if (e.target.tagName === 'IMG') {
            openModal(e.target);
        }
    });

    // Keyboard event listeners for navigation and closing modal
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

    leftArrow.onclick = (e) => {
        e.stopPropagation();
        changeImage(-1);
    };
    
    rightArrow.onclick = (e) => {
        e.stopPropagation();
        changeImage(1);
    };
    
});

// Call this function with `filterSelection('all', this)` etc.
window.filterSelection = function (category, element) {
    const images = document.querySelectorAll('.photo-container img');
    images.forEach(img => {
        img.style.display = img.getAttribute('data-category') === category || category === 'all' ? '' : 'none';
    });

    // Update the active filter element
    document.querySelector('.filter-item.active')?.classList.remove('active');
    element.classList.add('active');
};

