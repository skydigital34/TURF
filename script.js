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
// DATE PICKER ANIMATION (REALISTIC DATA FETCH)
// ==========================================
const datePicker = document.getElementById('booking-date');
const slots = document.querySelectorAll('.slot');

if (datePicker && slots.length > 0) {
    const animateSlots = () => {
        // Animate slots out
        gsap.to(slots, {
            scale: 0.9,
            opacity: 0,
            y: 20,
            duration: 0.3,
            stagger: 0.05,
            ease: 'power2.in',
            onComplete: () => {

                // Randomize slot data to simulate backend fetch
                const statuses = ['available', 'limited', 'booked'];

                slots.forEach(slot => {
                    // Remove old status classes
                    slot.classList.remove('available', 'limited', 'booked');

                    // Pick a new random status
                    const newStatus = statuses[Math.floor(Math.random() * statuses.length)];
                    slot.classList.add(newStatus);

                    // Update text inside based on status
                    const secondSpan = slot.querySelector('.price') || slot.querySelector('.status-text');

                    secondSpan.className = 'status-text';
                    if (newStatus === 'booked') {
                        secondSpan.textContent = 'Booked';
                    } else if (newStatus === 'limited') {
                        secondSpan.textContent = 'Limited';
                    } else {
                        secondSpan.textContent = 'Available';
                    }
                });

                // Simulate loading time and animate back in
                setTimeout(() => {
                    gsap.to(slots, {
                        scale: 1,
                        opacity: 1,
                        y: 0,
                        duration: 0.4,
                        stagger: 0.05,
                        ease: 'back.out(1.5)'
                    });
                }, 300);
            }
        });
    };

    datePicker.addEventListener('change', animateSlots);

    // Sport Selection Animation
    const sportBtns = document.querySelectorAll('.sport-btn');
    sportBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            sportBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            animateSlots();
        });
    });
}

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
// DYNAMIC SLOTS & PRICING
// ==========================================
document.addEventListener('DOMContentLoaded', () => {
    // Render Pricing
    const pricing = JSON.parse(localStorage.getItem('turfx_pricing'));
    if (pricing) {
        const weekdayEl = document.getElementById('price-weekday');
        const weekendEl = document.getElementById('price-weekend');
        if (weekdayEl) weekdayEl.textContent = pricing.weekdays;
        if (weekendEl) weekendEl.textContent = pricing.weekends;
    }

    // Render Slots
    const slotsGrid = document.getElementById('slots-grid');
    if (slotsGrid) {
        const slots = JSON.parse(localStorage.getItem('turfx_slots')) || [
            { id: 1, time: "06:00 AM - 07:00 AM", status: "available", sport: "football" },
            { id: 2, time: "07:00 AM - 08:00 AM", status: "limited", sport: "cricket" },
            { id: 3, time: "08:00 AM - 09:00 AM", status: "booked", sport: "volleyball" },
            { id: 4, time: "06:00 PM - 07:00 PM", status: "available", sport: "football" },
            { id: 5, time: "07:00 PM - 08:00 PM", status: "available", sport: "cricket" },
            { id: 6, time: "08:00 PM - 09:00 PM", status: "booked", sport: "volleyball" }
        ];

        const sportIcons = {
            football: 'fa-futbol',
            cricket: 'fa-baseball-ball',
            volleyball: 'fa-volleyball-ball'
        };

        const statusLabels = {
            available: 'Available',
            limited: 'Limited',
            booked: 'Booked'
        };

        let html = '';
        slots.forEach(slot => {
            const icon = sportIcons[slot.sport] || 'fa-futbol';
            const opacity = slot.status === 'booked' ? '0.6' : '0.8';
            html += `
                <div class="slot ${slot.status}">
                    <span class="time">${slot.time}</span>
                    <span class="status-text">${statusLabels[slot.status]}</span>
                    <span class="game-detail" style="display:block; margin-top:5px; font-size:0.9rem; opacity:${opacity};">
                        <i class="fas ${icon}"></i> ${slot.sport.charAt(0).toUpperCase() + slot.sport.slice(1)}
                    </span>
                </div>
            `;
        });
        slotsGrid.innerHTML = html;
        
        // Re-attach hover events to new dynamic slots
        const newSlots = document.querySelectorAll('.slot');
        newSlots.forEach(el => {
            el.addEventListener('mouseenter', () => {
                if(typeof cursorOutline !== 'undefined' && cursorOutline) {
                    cursorOutline.style.transform = 'translate(-50%, -50%) scale(1.5)';
                    cursorOutline.style.backgroundColor = 'rgba(255, 106, 0, 0.1)';
                }
                if(typeof cursorDot !== 'undefined' && cursorDot) cursorDot.style.transform = 'translate(-50%, -50%) scale(0.5)';
            });
            el.addEventListener('mouseleave', () => {
                if(typeof cursorOutline !== 'undefined' && cursorOutline) {
                    cursorOutline.style.transform = 'translate(-50%, -50%) scale(1)';
                    cursorOutline.style.backgroundColor = 'transparent';
                }
                if(typeof cursorDot !== 'undefined' && cursorDot) cursorDot.style.transform = 'translate(-50%, -50%) scale(1)';
            });
        });
    }
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
