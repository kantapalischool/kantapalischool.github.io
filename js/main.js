/* Karlajori-Antapali Govt. U.P. School - Scripts */

document.addEventListener('DOMContentLoaded', () => {
  initMobileNav();
  highlightActiveLink();
  initGalleryFilter();
  initLightbox();
  initContactForm();
});

/* -------------------------------------------------------------
   1. MOBILE NAVIGATION TOGGLE
   ------------------------------------------------------------- */
function initMobileNav() {
  const toggleBtn = document.querySelector('.mobile-toggle');
  const navMenu = document.querySelector('.nav-menu');

  if (!toggleBtn || !navMenu) return;

  toggleBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    const isOpen = navMenu.classList.toggle('open');
    toggleBtn.setAttribute('aria-expanded', isOpen);
    
    // Switch icon between hamburger and close
    const icon = toggleBtn.querySelector('i');
    if (icon) {
      if (isOpen) {
        icon.className = 'fa-solid fa-xmark';
      } else {
        icon.className = 'fa-solid fa-bars';
      }
    }
  });

  // Close menu when clicking outside
  document.addEventListener('click', (e) => {
    if (!navMenu.contains(e.target) && !toggleBtn.contains(e.target)) {
      if (navMenu.classList.contains('open')) {
        navMenu.classList.remove('open');
        const icon = toggleBtn.querySelector('i');
        if (icon) icon.className = 'fa-solid fa-bars';
      }
    }
  });
}

/* -------------------------------------------------------------
   2. HIGHLIGHT CURRENT ACTIVE LINK IN MENU
   ------------------------------------------------------------- */
function highlightActiveLink() {
  const currentPath = window.location.pathname.split('/').pop() || 'index.html';
  const navLinks = document.querySelectorAll('.nav-link');

  navLinks.forEach((link) => {
    const linkHref = link.getAttribute('href');
    if (linkHref === currentPath || (currentPath === '' && linkHref === 'index.html')) {
      link.classList.add('active');
    }
  });
}

/* -------------------------------------------------------------
   3. GALLERY CATEGORY FILTER
   ------------------------------------------------------------- */
function initGalleryFilter() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const galleryItems = document.querySelectorAll('.gallery-item');

  if (!filterBtns.length || !galleryItems.length) return;

  filterBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      // Toggle active button
      filterBtns.forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');

      const filterValue = btn.getAttribute('data-filter');

      galleryItems.forEach((item) => {
        const itemCategory = item.getAttribute('data-category');
        if (filterValue === 'all' || itemCategory === filterValue) {
          item.style.display = 'block';
          item.style.opacity = '0';
          setTimeout(() => {
            item.style.opacity = '1';
          }, 50);
        } else {
          item.style.display = 'none';
        }
      });
    });
  });
}

/* -------------------------------------------------------------
   4. LIGHTBOX MODAL FOR GALLERY
   ------------------------------------------------------------- */
function initLightbox() {
  const modal = document.querySelector('.lightbox-modal');
  if (!modal) return;

  const modalImg = modal.querySelector('.lightbox-img');
  const modalCaption = modal.querySelector('.lightbox-caption');
  const closeBtn = modal.querySelector('.lightbox-close');
  const galleryItems = document.querySelectorAll('.gallery-item');

  galleryItems.forEach((item) => {
    item.addEventListener('click', () => {
      const img = item.querySelector('img');
      const title = item.querySelector('h4');
      const desc = item.querySelector('p');

      if (img && modalImg) {
        modalImg.src = img.src;
        modalImg.alt = img.alt || 'School Gallery Photo';
      }

      if (modalCaption) {
        modalCaption.textContent = title ? title.textContent : (desc ? desc.textContent : 'School Photo');
      }

      modal.classList.add('active');
      document.body.style.overflow = 'hidden'; // prevent scroll
    });
  });

  const closeModal = () => {
    modal.classList.remove('active');
    document.body.style.overflow = '';
  };

  if (closeBtn) {
    closeBtn.addEventListener('click', closeModal);
  }

  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      closeModal();
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('active')) {
      closeModal();
    }
  });
}

/* -------------------------------------------------------------
   5. CONTACT FORM INTERACTION
   ------------------------------------------------------------- */
function initContactForm() {
  const form = document.querySelector('#contactForm');
  const notice = document.querySelector('#formNotice');

  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = form.querySelector('[name="name"]').value.trim();
    const phone = form.querySelector('[name="phone"]').value.trim();

    if (!name || !phone) {
      alert('Please fill out all required fields.');
      return;
    }

    // Submit Simulation
    const submitBtn = form.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;
    submitBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Submitting...';
    submitBtn.disabled = true;

    setTimeout(() => {
      submitBtn.innerHTML = originalText;
      submitBtn.disabled = false;
      form.reset();

      if (notice) {
        notice.classList.add('success');
        notice.innerHTML = '<i class="fa-solid fa-circle-check"></i> <strong>Thank you, ' + name + '!</strong> Your message has been sent successfully. School administration will reach out to you shortly.';
        notice.scrollIntoView({ behavior: 'smooth', block: 'nearest' });

        setTimeout(() => {
          notice.classList.remove('success');
          notice.innerHTML = '';
        }, 8000);
      }
    }, 1000);
  });
}
