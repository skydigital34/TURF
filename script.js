// Register GSAP Plugins
gsap.registerPlugin(ScrollTrigger);

// ==========================================
// LENIS SMOOTH SCROLL
// ==========================================
const lenis = new Lenis({
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    direction: 'vertical',
    gestureDirection: 'vertical',
    smooth: true,
    mouseMultiplier: 1,
    smoothTouch: false,
    touchMultiplier: 2,
    infinite: false,
});

lenis.on('scroll', ScrollTrigger.update);

gsap.ticker.add((time) => {
    lenis.raf(time * 1000);
});
gsap.ticker.lagSmoothing(0);



// ==========================================
// MAGNETIC BUTTONS
// ==========================================
const magneticBtns = document.querySelectorAll('.magnetic-btn');

magneticBtns.forEach(btn => {
    btn.addEventListener('mousemove', (e) => {
        const position = btn.getBoundingClientRect();
        const x = e.clientX - position.left - position.width / 2;
        const y = e.clientY - position.top - position.height / 2;

        btn.style.transform = `translate(${x * 0.3}px, ${y * 0.5}px)`;
    });

    btn.addEventListener('mouseout', () => {
        btn.style.transform = 'translate(0px, 0px)';
    });
});

// ==========================================
// MOBILE MENU TOGGLE
// ==========================================
const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
const nav = document.querySelector('.nav');
const navLinksMobile = document.querySelectorAll('.nav-link');

if (mobileMenuToggle && nav) {
    mobileMenuToggle.addEventListener('click', () => {
        nav.classList.toggle('active');
        const icon = mobileMenuToggle.querySelector('i');
        if (nav.classList.contains('active')) {
            icon.classList.remove('fa-bars');
            icon.classList.add('fa-times');
        } else {
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }
    });

    navLinksMobile.forEach(link => {
        link.addEventListener('click', () => {
            nav.classList.remove('active');
            const icon = mobileMenuToggle.querySelector('i');
            if (icon) {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
    });
}

// ==========================================
// STICKY HEADER
// ==========================================
const header = document.getElementById('header');

window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// Navigation smooth scroll via Lenis
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        lenis.scrollTo(this.getAttribute('href'));
    });
});

// ==========================================
// 3D FOOTBALL MOUSE INTERACTION
// ==========================================
const heroSection = document.querySelector('.hero');
const football = document.querySelector('.football-img');

if (heroSection && football) {
    heroSection.addEventListener('mousemove', (e) => {
        const xAxis = (window.innerWidth / 2 - e.pageX) / 25;
        const yAxis = (window.innerHeight / 2 - e.pageY) / 25;
        football.style.transform = `rotateY(${xAxis}deg) rotateX(${yAxis}deg)`;
    });

    heroSection.addEventListener('mouseleave', () => {
        football.style.transform = `rotateY(0deg) rotateX(0deg)`;
    });
}

// ==========================================
// GALLERY FILTERS
// ==========================================
const filterBtns = document.querySelectorAll('.filter-btn');
const galleryItems = document.querySelectorAll('.gallery-item');

filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        // Remove active class
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const filterValue = btn.getAttribute('data-filter');

        galleryItems.forEach(item => {
            if (filterValue === 'all' || item.classList.contains(filterValue)) {
                item.style.display = 'block';
                gsap.fromTo(item, { scale: 0.8, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.5 });
            } else {
                item.style.display = 'none';
            }
        });
    });
});

// ==========================================
// DATE & SLOT INTERACTION MANAGED IN DOMCONTENTLOADED
// ==========================================


// ==========================================
// ACCORDION (FAQ)
// ==========================================
const accordionItems = document.querySelectorAll('.accordion-item');

accordionItems.forEach(item => {
    const header = item.querySelector('.accordion-header');
    header.addEventListener('click', () => {
        const isActive = item.classList.contains('active');

        // Close all others
        accordionItems.forEach(otherItem => {
            otherItem.classList.remove('active');
            otherItem.querySelector('.accordion-body').style.maxHeight = null;
        });

        if (!isActive) {
            item.classList.add('active');
            const body = item.querySelector('.accordion-body');
            body.style.maxHeight = body.scrollHeight + "px";
        }
    });
});

// ==========================================
// GSAP SCROLL ANIMATIONS
// ==========================================

// Initial Page Load Animation
const tl = gsap.timeline();
tl.from('.text-reveal', { y: 100, opacity: 0, duration: 1, stagger: 0.2, ease: 'power4.out' })
    .from('.hero-subtitle', { y: 20, opacity: 0, duration: 0.8 }, "-=0.5")
    .from('.hero-buttons', { y: 20, opacity: 0, duration: 0.8 }, "-=0.6");

// Hero Parallax Background
gsap.to('.hero-bg img', {
    yPercent: 30,
    ease: "none",
    scrollTrigger: {
        trigger: ".hero",
        start: "top top",
        end: "bottom top",
        scrub: true
    }
});

// Section Titles Fade Up
gsap.utils.toArray('.section-title').forEach(title => {
    gsap.from(title, {
        scrollTrigger: {
            trigger: title,
            start: "top 85%",
        },
        y: 50,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out'
    });
});

// Glass Cards Fade Up Stagger
const sectionGrids = ['.slots-grid', '.facilities-grid', '.pricing-grid', '.masonry-grid', '.membership-grid'];
sectionGrids.forEach(grid => {
    const cards = document.querySelectorAll(`${grid} > div`);
    if (cards.length > 0) {
        gsap.fromTo(cards,
            { y: 50, opacity: 0 },
            {
                scrollTrigger: {
                    trigger: grid,
                    start: "top 85%",
                },
                y: 0,
                opacity: 1,
                duration: 0.6,
                stagger: 0.1,
                ease: 'power2.out'
            }
        );
    }
});

// About Section Image Fast Slide-in
gsap.fromTo('.about-image-wrapper',
    { x: -100, opacity: 0 },
    {
        scrollTrigger: {
            trigger: '.about-section',
            start: "top 80%",
        },
        x: 0,
        opacity: 1,
        duration: 0.5,
        ease: 'power3.out'
    }
);

// Timeline Animation (Why Choose Us)
gsap.from('.timeline-item', {
    scrollTrigger: {
        trigger: '.timeline',
        start: "top 75%",
    },
    x: (index) => index % 2 === 0 ? -50 : 50,
    opacity: 0,
    duration: 0.8,
    stagger: 0.3,
    ease: 'power3.out'
});

// Number Counter for Stats & Pricing (Autometer/Odometer animation)
const odometerNumbers = document.querySelectorAll('.stat-number, .amount');
odometerNumbers.forEach(el => {
    const targetText = el.innerText;
    const targetNum = parseInt(targetText.replace(/[^0-9]/g, ''));
    if (isNaN(targetNum)) return;

    const hasPlus = targetText.includes('+');

    ScrollTrigger.create({
        trigger: el,
        start: "top 85%",
        onEnter: () => {
            gsap.fromTo(el, { innerText: 0 }, {
                innerText: targetNum,
                duration: 2,
                snap: { innerText: 1 },
                onUpdate: function () {
                    el.innerText = Math.round(this.targets()[0].innerText) + (hasPlus ? "+" : "");
                }
            });
        },
        once: true
    });
});

// VR Banner Parallax
if (document.querySelector('.vr-banner img')) {
    gsap.to('.vr-banner img', {
        scale: 1.2,
        ease: "none",
        scrollTrigger: {
            trigger: ".vr-banner",
            start: "top bottom",
            end: "bottom top",
            scrub: true
        }
    });
}

// ==========================================
// IMAGE POPUP (LIGHTBOX)
// ==========================================
const modal = document.getElementById('imageModal');
const modalImg = document.getElementById('modalImage');
const closeBtn = document.getElementById('modalClose');

const galleryItemsPopup = document.querySelectorAll('.gallery-item');

if (modal && modalImg) {
    galleryItemsPopup.forEach(item => {
        item.style.cursor = 'pointer';
        item.addEventListener('click', () => {
            const img = item.querySelector('img');
            if (img) {
                modal.classList.add('active');
                modalImg.src = img.src;
            }
        });
    });

    if (closeBtn) {
        closeBtn.addEventListener('click', () => {
            modal.classList.remove('active');
        });
    }

    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.classList.remove('active');
        }
    });
}

// ==========================================
// BOOKING MODAL (POPUP FORM)
// ==========================================
const bookingModal = document.getElementById('bookingModal');
const bookingModalClose = document.getElementById('bookingModalClose');
const bookNowBtns = document.querySelectorAll('a[href="#booking"], a[href="index.html#booking"], .pricing-card button, .hero-buttons a[href="#booking"], .tournament-card button, .member-card button');

if (bookingModal && bookingModalClose) {
    bookNowBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            // If the button is explicitly supposed to open booking or says Book
            if (btn.tagName === 'BUTTON' || (btn.tagName === 'A' && btn.getAttribute('href').includes('#booking'))) {
                e.preventDefault();
                bookingModal.classList.add('active');
            }
        });
    });

    bookingModalClose.addEventListener('click', () => {
        bookingModal.classList.remove('active');
    });

    bookingModal.addEventListener('click', (e) => {
        if (e.target === bookingModal) {
            bookingModal.classList.remove('active');
        }
    });
}

// ==========================================
// THANK YOU MODAL & BOOKING CONFIRMATION
// ==========================================
function initThankYouModal() {
    if (!document.getElementById('thankYouModal')) {
        const modalHtml = `
        <div class="thankyou-modal" id="thankYouModal" style="display: none; position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.85); backdrop-filter: blur(12px); z-index: 99999; justify-content: center; align-items: center; padding: 20px;">
            <div class="thankyou-modal-content glass-card text-center" style="max-width: 480px; width: 100%; padding: 2.5rem 2rem; position: relative; border: 1px solid var(--primary); border-radius: 16px; box-shadow: 0 20px 50px rgba(255, 106, 0, 0.3); transform: scale(0.9); opacity: 0; transition: transform 0.4s ease, opacity 0.4s ease;">
                <span class="modal-close" onclick="closeThankYouModal()" style="position: absolute; top: 15px; right: 20px; font-size: 2rem; cursor: pointer; color: var(--gray);">&times;</span>
                
                <div style="width: 75px; height: 75px; background: rgba(255, 106, 0, 0.15); border: 2px solid var(--primary); border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 1.2rem auto; color: var(--primary); font-size: 2.2rem;">
                    <i class="fas fa-check-circle"></i>
                </div>

                <h2 style="font-size: 2rem; margin-bottom: 0.4rem; color: var(--white); font-family: 'Bebas Neue', sans-serif; letter-spacing: 1px;">THANK YOU FOR YOUR BOOKING!</h2>
                <p style="color: var(--gray); font-size: 0.9rem; margin-bottom: 1.2rem; line-height: 1.5;">
                    Your booking request has been processed successfully! We are redirecting you to WhatsApp to confirm your slot with Goodwill Sports Turf X.
                </p>

                <div id="thankYouDetails" style="background: rgba(255, 255, 255, 0.04); border: 1px solid var(--border); border-radius: 10px; padding: 1rem; margin-bottom: 1.5rem; text-align: left; font-size: 0.88rem;">
                </div>

                <div style="display: flex; gap: 0.8rem; flex-direction: column;">
                    <a id="thankYouWaBtn" href="#" target="_blank" class="btn btn-primary magnetic-btn w-100" style="padding: 0.9rem; display: inline-flex; align-items: center; justify-content: center; gap: 10px; background: #25D366; border: none; color: #ffffff; font-weight: 600;">
                        <i class="fab fa-whatsapp" style="font-size: 1.2rem;"></i> Open WhatsApp Now
                    </a>
                    <button type="button" onclick="closeThankYouModal()" class="btn magnetic-btn w-100" style="padding: 0.7rem; background: rgba(255,255,255,0.08); color: var(--white); border: 1px solid var(--border);">
                        Close Window
                    </button>
                </div>
            </div>
        </div>`;
        document.body.insertAdjacentHTML('beforeend', modalHtml);
    }
}

window.showThankYouModal = function(data) {
    initThankYouModal();
    const bookingModal = document.getElementById('bookingModal');
    if (bookingModal) bookingModal.classList.remove('active');

    const modal = document.getElementById('thankYouModal');
    const detailsContainer = document.getElementById('thankYouDetails');
    const waBtn = document.getElementById('thankYouWaBtn');

    if (modal && detailsContainer && waBtn) {
        let detailsHtml = '';
        if (data.name) {
            detailsHtml += `<div style="display: flex; justify-content: space-between; margin-bottom: 6px;">
                <span style="color: var(--gray);">Name:</span>
                <strong style="color: var(--white);">${data.name}</strong>
            </div>`;
        }
        if (data.phone) {
            detailsHtml += `<div style="display: flex; justify-content: space-between; margin-bottom: 6px;">
                <span style="color: var(--gray);">Phone:</span>
                <strong style="color: var(--white);">${data.phone}</strong>
            </div>`;
        }
        if (data.date) {
            detailsHtml += `<div style="display: flex; justify-content: space-between; margin-bottom: 6px;">
                <span style="color: var(--gray);">Date:</span>
                <strong style="color: var(--primary);">${data.date}</strong>
            </div>`;
        }
        if (data.time) {
            detailsHtml += `<div style="display: flex; justify-content: space-between;">
                <span style="color: var(--gray);">Slot Time:</span>
                <strong style="color: var(--primary);">${data.time}</strong>
            </div>`;
        }
        if (!detailsHtml) {
            detailsHtml = `<p style="text-align: center; margin: 0; color: var(--primary);">Booking Request Received</p>`;
        }
        detailsContainer.innerHTML = detailsHtml;

        if (data.waUrl) {
            waBtn.href = data.waUrl;
            waBtn.style.display = 'inline-flex';
        } else {
            waBtn.style.display = 'none';
        }

        modal.style.display = 'flex';
        setTimeout(() => {
            const content = modal.querySelector('.thankyou-modal-content');
            if (content) {
                content.style.transform = 'scale(1)';
                content.style.opacity = '1';
            }
        }, 10);

        if (data.waUrl) {
            setTimeout(() => {
                window.open(data.waUrl, '_blank');
            }, 1000);
        }
    }
};

window.closeThankYouModal = function() {
    const modal = document.getElementById('thankYouModal');
    if (modal) {
        const content = modal.querySelector('.thankyou-modal-content');
        if (content) {
            content.style.transform = 'scale(0.9)';
            content.style.opacity = '0';
        }
        setTimeout(() => {
            modal.style.display = 'none';
        }, 300);
    }
};

document.addEventListener('DOMContentLoaded', () => {
    initThankYouModal();
});

// ==========================================
// VR MODAL & 360 SPIN (SMOOTH CANVAS)
// ==========================================
const vrModal = document.getElementById('vrModal');
const vrModalClose = document.getElementById('vrModalClose');
const vrBtn = document.querySelector('.vr-btn');
const product360Container = document.getElementById('product-360-container');
const canvas = document.getElementById('product-360-canvas');
const loadingText = document.getElementById('loading-360');

let isDragging360 = false;
let startX360 = 0;
let currentFrameIndex = 0;
let targetFrameIndex = 0;
const totalFrames = 11;
const sensitivity = 15; 
const images = [];
let imagesLoaded = 0;

if (vrModal && vrBtn) {
    // Preload images
    for (let i = 1; i <= totalFrames; i++) {
        const img = new Image();
        img.onload = () => {
            imagesLoaded++;
            if(imagesLoaded === totalFrames && loadingText) {
                loadingText.style.display = 'none';
                drawFrame(0);
            }
        };
        img.src = `assets/360/frame-${i}.png`;
        images.push(img);
    }

    let ctx = null;
    if(canvas) {
        ctx = canvas.getContext('2d');
    }

    const drawFrame = (index) => {
        if(!ctx || imagesLoaded < totalFrames) return;
        
        // Wrap index around 0 to totalFrames
        let validIndex = Math.floor(index) % totalFrames;
        if(validIndex < 0) validIndex += totalFrames;
        
        const img = images[validIndex];
        canvas.width = img.width;
        canvas.height = img.height;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(img, 0, 0);
    };

    const renderLoop = () => {
        // Smooth lerp for inertia
        if(Math.abs(targetFrameIndex - currentFrameIndex) > 0.01) {
            currentFrameIndex += (targetFrameIndex - currentFrameIndex) * 0.1;
            drawFrame(currentFrameIndex);
        }
        requestAnimationFrame(renderLoop);
    };
    renderLoop();

    vrBtn.addEventListener('click', (e) => {
        e.preventDefault();
        vrModal.classList.add('active');
        if(imagesLoaded === totalFrames) drawFrame(currentFrameIndex);
    });

    const closeVR = () => {
        vrModal.classList.remove('active');
    };

    if (vrModalClose) {
        vrModalClose.addEventListener('click', closeVR);
    }

    vrModal.addEventListener('click', (e) => {
        if (e.target === vrModal) {
            closeVR();
        }
    });

    if (product360Container && canvas) {
        let lastX = 0;

        const onDragStart = (e) => {
            isDragging360 = true;
            startX360 = e.type.includes('mouse') ? e.pageX : e.touches[0].pageX;
            lastX = startX360;
            product360Container.style.cursor = 'grabbing';
        };

        const onDragMove = (e) => {
            if (!isDragging360) return;
            e.preventDefault(); 
            const currentX = e.type.includes('mouse') ? e.pageX : e.touches[0].pageX;
            const deltaX = currentX - lastX;
            lastX = currentX;
            
            // Adjust target frame based on delta movement (reverse direction if needed)
            targetFrameIndex -= deltaX / sensitivity;
        };

        const onDragEnd = () => {
            isDragging360 = false;
            product360Container.style.cursor = 'grab';
        };

        product360Container.addEventListener('mousedown', onDragStart);
        window.addEventListener('mousemove', onDragMove, {passive: false});
        window.addEventListener('mouseup', onDragEnd);

        product360Container.addEventListener('touchstart', onDragStart, {passive: false});
        window.addEventListener('touchmove', onDragMove, {passive: false});
        window.addEventListener('touchend', onDragEnd);
    }
}

// ==========================================
// THEME TOGGLE
// ==========================================
const themeToggleBtn = document.getElementById('theme-toggle');
if (themeToggleBtn) {
    const icon = themeToggleBtn.querySelector('i');

    // Check saved theme
    const currentTheme = localStorage.getItem('theme');
    if (currentTheme === 'light') {
        document.body.classList.add('light-theme');
        icon.classList.remove('fa-sun');
        icon.classList.add('fa-moon');
    }

    themeToggleBtn.addEventListener('click', () => {
        document.body.classList.toggle('light-theme');
        if (document.body.classList.contains('light-theme')) {
            localStorage.setItem('theme', 'light');
            icon.classList.remove('fa-sun');
            icon.classList.add('fa-moon');
        } else {
            localStorage.setItem('theme', 'dark');
            icon.classList.remove('fa-moon');
            icon.classList.add('fa-sun');
        }
    });
}

// ==========================================
// PWA SERVICE WORKER REGISTRATION
// ==========================================
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js').then(registration => {
            console.log('ServiceWorker registration successful with scope: ', registration.scope);
        }).catch(error => {
            console.log('ServiceWorker registration failed: ', error);
        });
    });
}

// ==========================================
// MOBILE BOTTOM NAVIGATION ACTIVE STATE
// ==========================================
const bottomNavItems = document.querySelectorAll('.bottom-nav-item');
if (bottomNavItems.length > 0) {
    bottomNavItems.forEach(item => {
        item.addEventListener('click', function(e) {
            bottomNavItems.forEach(nav => nav.classList.remove('active'));
            this.classList.add('active');
            
            // Allow Lenis to handle the smooth scroll
            const href = this.getAttribute('href');
            if (href.startsWith('#')) {
                e.preventDefault();
                lenis.scrollTo(href);
            }
        });
    });
}

// ==========================================
// DYNAMIC SLOTS (24 HOURS) & PRICING
// ==========================================
document.addEventListener('DOMContentLoaded', () => {
    // 1. Set default date inputs to today's date if not set
    const todayStr = new Date().toISOString().split('T')[0];
    const dateInput = document.getElementById('booking-date');
    const modalDateInput = document.getElementById('modal-date');
    if (dateInput && (!dateInput.value || dateInput.value === '2024-05-20')) {
        dateInput.value = todayStr;
    }
    if (modalDateInput && (!modalDateInput.value || modalDateInput.value === '2024-05-20')) {
        modalDateInput.value = todayStr;
    }

    // 2. Render Pricing
    const pricing = JSON.parse(localStorage.getItem('turfx_pricing'));
    if (pricing) {
        const weekdayEl = document.getElementById('price-weekday');
        const weekendEl = document.getElementById('price-weekend');
        if (weekdayEl) weekdayEl.textContent = pricing.weekdays;
        if (weekendEl) weekendEl.textContent = pricing.weekends;
    }

    // 3. Complete 24-Hour Slots Data
    const defaultTurfSlots = [
        { id: 1,  time: "05:00 AM - 06:00 AM", status: "available", sport: "football" },
        { id: 2,  time: "06:00 AM - 07:00 AM", status: "available", sport: "football" },
        { id: 3,  time: "07:00 AM - 08:00 AM", status: "limited",   sport: "cricket" },
        { id: 4,  time: "08:00 AM - 09:00 AM", status: "booked",    sport: "football" },
        { id: 5,  time: "09:00 AM - 10:00 AM", status: "available", sport: "football" },
        { id: 6,  time: "10:00 AM - 11:00 AM", status: "available", sport: "cricket" },
        { id: 7,  time: "11:00 AM - 12:00 PM", status: "available", sport: "football" },
        { id: 8,  time: "12:00 PM - 01:00 PM", status: "available", sport: "cricket" },
        { id: 9,  time: "01:00 PM - 02:00 PM", status: "available", sport: "football" },
        { id: 10, time: "02:00 PM - 03:00 PM", status: "available", sport: "cricket" },
        { id: 11, time: "03:00 PM - 04:00 PM", status: "available", sport: "football" },
        { id: 12, time: "04:00 PM - 05:00 PM", status: "limited",   sport: "football" },
        { id: 13, time: "05:00 PM - 06:00 PM", status: "available", sport: "football" },
        { id: 14, time: "06:00 PM - 07:00 PM", status: "available", sport: "football" },
        { id: 15, time: "07:00 PM - 08:00 PM", status: "available", sport: "cricket" },
        { id: 16, time: "08:00 PM - 09:00 PM", status: "booked",    sport: "cricket" },
        { id: 17, time: "09:00 PM - 10:00 PM", status: "available", sport: "football" },
        { id: 18, time: "10:00 PM - 11:00 PM", status: "available", sport: "cricket" },
        { id: 19, time: "11:00 PM - 12:00 AM", status: "available", sport: "football" },
        { id: 20, time: "12:00 AM - 01:00 AM", status: "available", sport: "football" },
        { id: 21, time: "01:00 AM - 02:00 AM", status: "available", sport: "cricket" },
        { id: 22, time: "02:00 AM - 03:00 AM", status: "available", sport: "football" },
        { id: 23, time: "03:00 AM - 04:00 AM", status: "available", sport: "football" },
        { id: 24, time: "04:00 AM - 05:00 AM", status: "available", sport: "cricket" }
    ];

    const slotsGrid = document.getElementById('slots-grid');
    let currentSportFilter = 'all';
    let currentTimeFilter = 'all';
    let selectedSlot = null;

    const savedSlots = JSON.parse(localStorage.getItem('turfx_slots'));
    let slotsData = (savedSlots && savedSlots.length >= 6) ? savedSlots : defaultTurfSlots;

    // Helper: Time of day categorizer
    function getTimeCategory(timeStr) {
        if (timeStr.includes("05:00 AM") || timeStr.includes("06:00 AM") || timeStr.includes("07:00 AM") || 
            timeStr.includes("08:00 AM") || timeStr.includes("09:00 AM") || timeStr.includes("10:00 AM") || 
            timeStr.includes("11:00 AM")) {
            return "morning";
        }
        if (timeStr.includes("12:00 PM") || timeStr.includes("01:00 PM") || timeStr.includes("02:00 PM") || 
            timeStr.includes("03:00 PM") || timeStr.includes("04:00 PM")) {
            return "afternoon";
        }
        if (timeStr.includes("05:00 PM") || timeStr.includes("06:00 PM") || timeStr.includes("07:00 PM") || 
            timeStr.includes("08:00 PM")) {
            return "evening";
        }
        return "night";
    }

    const sportIcons = {
        football: 'fa-futbol',
        cricket: 'fa-baseball-ball'
    };

    const statusLabels = {
        available: 'Available',
        limited: 'Limited',
        booked: 'Booked'
    };



    // Function to Render Slots Grid
    function renderSlots() {
        if (!slotsGrid) return;

        let filteredSlots = slotsData.filter(slot => {
            const matchSport = (currentSportFilter === 'all' || slot.sport === currentSportFilter);
            const matchTime = (currentTimeFilter === 'all' || getTimeCategory(slot.time) === currentTimeFilter);
            return matchSport && matchTime;
        });

        if (filteredSlots.length === 0) {
            slotsGrid.innerHTML = `<div style="grid-column: 1/-1; text-align:center; padding: 2.5rem 1rem; color: var(--gray); font-size: 1rem; width: 100%;">
                <i class="fas fa-calendar-times" style="font-size: 2rem; color: var(--primary); margin-bottom: 0.5rem; display: block;"></i>
                No slots match the selected filters. Please choose "All Timings" or "All Sports".
            </div>`;
            return;
        }

        let html = '';
        filteredSlots.forEach(slot => {
            const icon = sportIcons[slot.sport] || 'fa-futbol';
            const opacity = slot.status === 'booked' ? '0.5' : '0.85';
            const isSelected = selectedSlot && selectedSlot.id === slot.id;
            const selectedClass = isSelected ? 'selected' : '';

            html += `
                <div class="slot ${slot.status} ${selectedClass}" data-id="${slot.id}" data-time="${slot.time}" data-sport="${slot.sport}" data-status="${slot.status}">
                    <span class="time">${slot.time}</span>
                    <span class="status-text">${statusLabels[slot.status]}</span>
                    <span class="game-detail" style="display:block; margin-top:5px; font-size:0.85rem; opacity:${opacity};">
                        <i class="fas ${icon}"></i> ${slot.sport.charAt(0).toUpperCase() + slot.sport.slice(1)}
                    </span>
                </div>
            `;
        });
        slotsGrid.innerHTML = html;

        // Attach Slot Selection Click Listener
        const slotEls = slotsGrid.querySelectorAll('.slot');
        slotEls.forEach(el => {
            el.addEventListener('click', () => {
                const status = el.getAttribute('data-status');
                if (status === 'booked') {
                    alert("This slot is already booked. Please select an available or limited slot.");
                    return;
                }

                const slotId = parseInt(el.getAttribute('data-id'));
                const matched = slotsData.find(s => s.id === slotId);
                if (matched) {
                    selectedSlot = matched;
                    renderSlots();
                    updateSelectedSlotBanner();
                }
            });
        });
    }

    function updateSelectedSlotBanner() {
        const banner = document.getElementById('selected-slot-banner');
        const textEl = document.getElementById('selected-slot-text');
        const timingInput = document.getElementById('b-timing');
        
        if (selectedSlot) {
            const formatted = `${selectedSlot.time} (${selectedSlot.sport.toUpperCase()})`;
            if (banner && textEl) {
                banner.style.display = 'flex';
                textEl.textContent = formatted;
            }
            if (timingInput) {
                timingInput.value = formatted;
            }
        } else {
            if (banner) banner.style.display = 'none';
        }
    }

    // Attach Sport Filter Buttons
    const sportBtns = document.querySelectorAll('.sport-btn');
    sportBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            sportBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            currentSportFilter = btn.getAttribute('data-sport') || 'all';
            
            // GSAP pulse animation on slot grid
            if (slotsGrid && typeof gsap !== 'undefined') {
                gsap.fromTo(slotsGrid, { opacity: 0.4, y: 5 }, { opacity: 1, y: 0, duration: 0.3 });
            }
            renderSlots();
        });
    });

    // Attach Time Filter Buttons
    const timeFilterBtns = document.querySelectorAll('.time-filter-btn');
    timeFilterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            timeFilterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            currentTimeFilter = btn.getAttribute('data-time') || 'all';

            if (slotsGrid && typeof gsap !== 'undefined') {
                gsap.fromTo(slotsGrid, { opacity: 0.4, y: 5 }, { opacity: 1, y: 0, duration: 0.3 });
            }
            renderSlots();
        });
    });

    // Initial render
    renderSlots();

    // Form Submission Handler for main Live Booking Widget
    window.handleBookingFormSubmit = function(e) {
        e.preventDefault();
        const name = document.getElementById('b-name').value.trim();
        const phone = document.getElementById('b-phone').value.trim();
        const dateVal = document.getElementById('booking-date') ? document.getElementById('booking-date').value : '';
        const timingInput = document.getElementById('b-timing');

        let slotTiming = '';
        if (timingInput && timingInput.value.trim()) {
            slotTiming = timingInput.value.trim();
        } else if (selectedSlot) {
            slotTiming = `${selectedSlot.time} (${selectedSlot.sport.toUpperCase()})`;
        }

        let message = `Hi, I would like to book a slot on Goodwill Sports Turf X.`;
        if (dateVal) message += `\nDate: ${dateVal}`;
        if (slotTiming) message += `\nSlot Timing: ${slotTiming}`;
        message += `\nName: ${name}\nPhone: ${phone}`;

        const waUrl = `https://wa.me/919994157721?text=` + encodeURIComponent(message);
        showThankYouModal({ name: name, phone: phone, date: dateVal, time: slotTiming, waUrl: waUrl });
    };
});

// ==========================================
// ADMIN LOGIN
// ==========================================
window.promptAdmin = function(e) {
    e.preventDefault();
    const pwd = prompt("Enter Admin Password:");
    if (pwd === "admin123") {
        sessionStorage.setItem("adminAuth", "true");
        window.location.href = "admin.html";
    } else if (pwd !== null) {
        alert("Incorrect password!");
    }
};

// ==========================================
// POLICY MODAL HANDLER
// ==========================================
const policyData = {
    cancellation: {
        title: "Cancellation & Refund Policy",
        content: `
            <p style="font-size: 0.85rem; color: var(--primary); margin-bottom: 1rem; font-weight: 600;">Last updated: 09 July 2026</p>
            
            <h4 style="color: var(--primary); margin-top: 1rem; margin-bottom: 0.5rem;">3.1 Cancellation by the customer</h4>
            <ul style="padding-left: 1.2rem; margin-bottom: 1rem; list-style-type: disc;">
                <li style="margin-bottom: 0.4rem;"><strong>More than 24 hours before the slot:</strong> Full refund of any amount paid, or a free reschedule to another available slot.</li>
                <li style="margin-bottom: 0.4rem;"><strong>Within 24 hours of the slot:</strong> No refund. The customer may, at our discretion, reschedule once to another available slot within 30 days.</li>
                <li style="margin-bottom: 0.4rem;"><strong>Failure to attend without notice (no-show):</strong> No refund and no reschedule.</li>
            </ul>
            <p style="margin-bottom: 1rem;">Cancellations must be communicated by WhatsApp or telephone on <strong>+91 99941 57721</strong>. A cancellation is effective only when we acknowledge it.</p>

            <h4 style="color: var(--primary); margin-top: 1rem; margin-bottom: 0.5rem;">3.2 Late arrival</h4>
            <p style="margin-bottom: 1rem;">Slots begin and end at the booked times. If a customer arrives late, play ends at the originally scheduled time and no reduction in charge is made.</p>

            <h4 style="color: var(--primary); margin-top: 1rem; margin-bottom: 0.5rem;">3.3 Cancellation by Goodwill Turf</h4>
            <p style="margin-bottom: 1rem;">If we cancel or curtail a booking — whether because of adverse weather, power failure, maintenance, statutory direction, or any other cause — the customer may choose either a full refund of the affected portion or a free reschedule to another available slot.</p>

            <h4 style="color: var(--primary); margin-top: 1rem; margin-bottom: 0.5rem;">3.4 Rain and weather</h4>
            <p style="margin-bottom: 1rem;">The playing surface drains and remains usable in light rain. The decision to close the Turf in heavy rain rests with our staff on site. Where we close the Turf, clause 3.3 applies. Where the Turf remains open and the customer chooses not to play, clause 3.1 applies.</p>

            <h4 style="color: var(--primary); margin-top: 1rem; margin-bottom: 0.5rem;">3.5 Refund processing</h4>
            <ul style="padding-left: 1.2rem; margin-bottom: 1rem; list-style-type: disc;">
                <li style="margin-bottom: 0.4rem;">Approved refunds are processed to the original method of payment, or by bank transfer where payment was made in cash.</li>
                <li style="margin-bottom: 0.4rem;">Refunds are processed within 7 working days of approval.</li>
                <li style="margin-bottom: 0.4rem;">No cancellation or processing fee is deducted.</li>
            </ul>

            <h4 style="color: var(--primary); margin-top: 1rem; margin-bottom: 0.5rem;">3.6 Contact</h4>
            <p style="margin-bottom: 0.5rem;">For any cancellation, reschedule or refund query, contact us on <strong>+91 99941 57721</strong> or at <strong>goodwillsportsturfx@gmail.com</strong>.</p>
            <p style="font-size: 0.85rem; color: var(--gray); margin-top: 1rem; border-top: 1px solid var(--border); padding-top: 0.8rem;">Goodwill Sports · 33/2, Tank Street, Mettu Thottam, Chinnavedampatti, Coimbatore 641049 · goodwillsportscbe@gmail.com</p>
        `
    },
    terms: {
        title: "Terms & Conditions",
        content: `
            <p style="font-size: 0.85rem; color: var(--primary); margin-bottom: 1rem; font-weight: 600;">Last updated: 09 July 2026</p>
            <p style="margin-bottom: 1rem;">These Terms & Conditions govern your use of the Goodwill Turf website and your booking and use of the Goodwill Turf facility at <a href="https://maps.app.goo.gl/K6QErELRhYeAwSpU6" target="_blank" style="color: var(--primary); text-decoration: underline;">A1, Geethanjali Street, Phase 2, Vellakinar Pirivu, Coimbatore 641029, Tamil Nadu</a> ("the Turf"), operated by Goodwill Sports ("we", "us", "our"). By booking a slot or entering the premises, you ("the customer") agree to these terms.</p>

            <h4 style="color: var(--primary); margin-top: 1rem; margin-bottom: 0.5rem;">1.1 Bookings</h4>
            <ul style="padding-left: 1.2rem; margin-bottom: 1rem; list-style-type: disc;">
                <li style="margin-bottom: 0.4rem;">The Turf is available for booking 24 hours a day, 7 days a week, subject to slot availability.</li>
                <li style="margin-bottom: 0.4rem;">The charge is ₹800 per hour, applicable to all slots on all days. This rate is inclusive of use of the playing surface, floodlights, washroom and parking.</li>
                <li style="margin-bottom: 0.4rem;">A booking is confirmed only when we acknowledge it in writing by WhatsApp, email or telephone. Submitting a form on the website is a request, not a confirmed booking.</li>
                <li style="margin-bottom: 0.4rem;">Availability shown on the website is indicative. In the event of a conflict, our records govern.</li>
                <li style="margin-bottom: 0.4rem;">A booking is for the stated duration only. Play must stop at the end of the booked slot to allow the next booking to begin on time.</li>
                <li style="margin-bottom: 0.4rem;">An advance is payable at the time of booking; the balance is payable before play begins.</li>
            </ul>

            <h4 style="color: var(--primary); margin-top: 1rem; margin-bottom: 0.5rem;">1.2 Conduct on the premises</h4>
            <ul style="padding-left: 1.2rem; margin-bottom: 1rem; list-style-type: disc;">
                <li style="margin-bottom: 0.4rem;">Only non-marking sports footwear is permitted on the playing surface. Metal studs, spikes and street footwear are not allowed.</li>
                <li style="margin-bottom: 0.4rem;">Food, chewing gum, glass containers, alcohol, tobacco products and any intoxicating substances are strictly prohibited on the playing surface and within the premises.</li>
                <li style="margin-bottom: 0.4rem;">Customers must not damage the turf, nets, fencing, lighting or any other equipment or fixture.</li>
                <li style="margin-bottom: 0.4rem;">Abusive language, physical violence, and any behaviour that endangers or disturbs other users or neighbouring residents is prohibited.</li>
                <li style="margin-bottom: 0.4rem;">Customers under the age of 18 must be supervised by an accompanying adult, who accepts responsibility for them.</li>
                <li style="margin-bottom: 0.4rem;">We reserve the right to refuse entry to, or remove from the premises, any person who breaches these terms. No refund is payable in such cases.</li>
            </ul>

            <h4 style="color: var(--primary); margin-top: 1rem; margin-bottom: 0.5rem;">1.3 Liability</h4>
            <ul style="padding-left: 1.2rem; margin-bottom: 1rem; list-style-type: disc;">
                <li style="margin-bottom: 0.4rem;">Sport carries an inherent risk of injury. Customers use the Turf entirely at their own risk and are responsible for ensuring they are medically fit to play.</li>
                <li style="margin-bottom: 0.4rem;">We do not accept liability for injury, illness or death sustained on the premises, except where caused by our proven negligence.</li>
                <li style="margin-bottom: 0.4rem;">We do not accept responsibility for loss of, or damage to, personal property brought onto the premises, including items left in the parking area.</li>
                <li style="margin-bottom: 0.4rem;">Customers are liable for the cost of repairing or replacing any damage they cause to the Turf or its facilities.</li>
                <li style="margin-bottom: 0.4rem;">We recommend that customers and teams arrange their own accident and medical insurance.</li>
            </ul>

            <h4 style="color: var(--primary); margin-top: 1rem; margin-bottom: 0.5rem;">1.4 Closure and interruption</h4>
            <p style="margin-bottom: 1rem;">We may close the Turf, or curtail a booking, on account of adverse weather, power failure, maintenance, statutory direction, or any other cause beyond our reasonable control. Where a booking is affected, we will offer a rescheduled slot or a refund of the affected portion, at the customer's option.</p>

            <h4 style="color: var(--primary); margin-top: 1rem; margin-bottom: 0.5rem;">1.5 Photography and recordings</h4>
            <p style="margin-bottom: 1rem;">We may photograph or record activity at the Turf for promotional purposes. If you do not wish to appear in such material, please inform our staff before your slot begins and we will accommodate the request.</p>

            <h4 style="color: var(--primary); margin-top: 1rem; margin-bottom: 0.5rem;">1.6 General</h4>
            <ul style="padding-left: 1.2rem; margin-bottom: 1rem; list-style-type: disc;">
                <li style="margin-bottom: 0.4rem;">We may revise these terms at any time. The version published on this website at the time of your booking applies.</li>
                <li style="margin-bottom: 0.4rem;">These terms are governed by the laws of India. The courts at Coimbatore, Tamil Nadu have exclusive jurisdiction over any dispute.</li>
                <li style="margin-bottom: 0.4rem;">Questions may be directed to <strong>+91 99941 57721</strong> or <strong>goodwillsportsturfx@gmail.com</strong>.</li>
            </ul>
        `
    },
    privacy: {
        title: "Privacy Policy",
        content: `
            <p style="font-size: 0.85rem; color: var(--primary); margin-bottom: 1rem; font-weight: 600;">Last updated: 09 July 2026</p>
            <p style="margin-bottom: 1rem;">Goodwill Sports operates the Goodwill Turf website. This policy explains what personal information we collect, why we collect it, and how we handle it.</p>

            <h4 style="color: var(--primary); margin-top: 1rem; margin-bottom: 0.5rem;">2.1 Information we collect</h4>
            <ul style="padding-left: 1.2rem; margin-bottom: 1rem; list-style-type: disc;">
                <li style="margin-bottom: 0.4rem;"><strong>Booking information:</strong> your name, mobile number, and the date and time of the slot you request.</li>
                <li style="margin-bottom: 0.4rem;"><strong>Enquiry information:</strong> your name, email address and the contents of any message you send us through the contact form or by WhatsApp.</li>
                <li style="margin-bottom: 0.4rem;"><strong>Technical information:</strong> basic, non-identifying data collected automatically by our website host, such as browser type and pages visited.</li>
                <li style="margin-bottom: 0.4rem;">We do not collect or store payment card details. Payment is made in cash or by direct transfer.</li>
            </ul>

            <h4 style="color: var(--primary); margin-top: 1rem; margin-bottom: 0.5rem;">2.2 How we use your information</h4>
            <ul style="padding-left: 1.2rem; margin-bottom: 1rem; list-style-type: disc;">
                <li style="margin-bottom: 0.4rem;">To confirm, manage and reschedule your booking.</li>
                <li style="margin-bottom: 0.4rem;">To contact you regarding your booking or enquiry.</li>
                <li style="margin-bottom: 0.4rem;">To maintain our internal booking records.</li>
                <li style="margin-bottom: 0.4rem;">To send you occasional information about offers, tournaments and events at the Turf, where you have consented to receive it. You may opt out at any time by replying to any message or contacting us.</li>
            </ul>

            <h4 style="color: var(--primary); margin-top: 1rem; margin-bottom: 0.5rem;">2.3 Sharing your information</h4>
            <p style="margin-bottom: 0.5rem;">We do not sell, rent or trade your personal information. We share it only:</p>
            <ul style="padding-left: 1.2rem; margin-bottom: 1rem; list-style-type: disc;">
                <li style="margin-bottom: 0.4rem;">With service providers who help us operate the website and communicate with customers, and who are bound to protect it;</li>
                <li style="margin-bottom: 0.4rem;">Where required by law, court order, or a lawful request from a government authority.</li>
            </ul>

            <h4 style="color: var(--primary); margin-top: 1rem; margin-bottom: 0.5rem;">2.4 WhatsApp and third-party services</h4>
            <p style="margin-bottom: 1rem;">Bookings and enquiries made through WhatsApp are also subject to WhatsApp's own privacy policy. Our website may embed Google Maps, which is subject to Google's privacy policy. We are not responsible for the privacy practices of these third parties.</p>

            <h4 style="color: var(--primary); margin-top: 1rem; margin-bottom: 0.5rem;">2.5 Retention and security</h4>
            <p style="margin-bottom: 1rem;">We retain booking and enquiry records for as long as is necessary for our business and accounting purposes. We take reasonable measures to protect the information we hold, but no method of transmission or storage is completely secure.</p>

            <h4 style="color: var(--primary); margin-top: 1rem; margin-bottom: 0.5rem;">2.6 Your rights</h4>
            <p style="margin-bottom: 1rem;">You may ask us to provide a copy of the information we hold about you, to correct it if it is inaccurate, or to delete it. Write to <strong>goodwillsportsturfx@gmail.com</strong> or call <strong>+91 99941 57721</strong>. We will respond within a reasonable period.</p>

            <h4 style="color: var(--primary); margin-top: 1rem; margin-bottom: 0.5rem;">2.7 Children</h4>
            <p style="margin-bottom: 1rem;">Our website is not directed at children under 18. We do not knowingly collect information from children. Bookings for minors must be made by a parent or guardian.</p>

            <h4 style="color: var(--primary); margin-top: 1rem; margin-bottom: 0.5rem;">2.8 Changes and contact</h4>
            <p style="margin-bottom: 1rem;">We may update this policy from time to time; the revised version will be posted on this page with a new date. For any privacy question, contact Goodwill Sports at <a href="https://maps.app.goo.gl/K6QErELRhYeAwSpU6" target="_blank" style="color: var(--primary); text-decoration: underline;">A1, Geethanjali Street, Phase 2, Vellakinar Pirivu, Coimbatore 641029</a>, by phone on <strong>+91 99941 57721</strong>, or by email at <strong>goodwillsportsturfx@gmail.com</strong>.</p>
        `
    }
};

window.openPolicyModal = function(type, e) {
    if (e) e.preventDefault();
    const modal = document.getElementById('policyModal');
    const titleEl = document.getElementById('policyTitle');
    const bodyEl = document.getElementById('policyBody');
    if (modal && titleEl && bodyEl && policyData[type]) {
        titleEl.textContent = policyData[type].title;
        bodyEl.innerHTML = policyData[type].content;
        modal.style.display = 'flex';
    }
};

window.closePolicyModal = function() {
    const modal = document.getElementById('policyModal');
    if (modal) modal.style.display = 'none';
};

