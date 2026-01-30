window.addEventListener('load', fn, false);

function fn() {
    var preloader = document.getElementById('preloader');
    if (preloader) {
        setTimeout(function () {
            preloader.style.visibility = 'hidden';
            preloader.style.opacity = '0';
        }, 350);
    }
}

// Menu sticky + back-to-top visibility (single scroll listener)
function windowScroll() {
    var navbar = document.getElementById('navbar');
    var scrollY = document.body.scrollTop || document.documentElement.scrollTop;
    if (navbar) {
        if (scrollY >= 50) {
            navbar.classList.add('nav-sticky');
        } else {
            navbar.classList.remove('nav-sticky');
        }
    }
    var backToTop = document.getElementById('back-to-top');
    if (backToTop) {
        backToTop.style.display = scrollY > 500 ? 'flex' : 'none';
    }
}

window.addEventListener('scroll', windowScroll, { passive: true });

// Back-to-top click: scroll to top (avoids inline onclick)
function topFunction() {
    document.body.scrollTo({ top: 0, behavior: 'smooth' });
    document.documentElement.scrollTo({ top: 0, behavior: 'smooth' });
}

function attachBackToTop() {
    var backToTop = document.getElementById('back-to-top');
    if (backToTop) {
        backToTop.addEventListener('click', function (e) {
            e.preventDefault();
            topFunction();
        });
    }
}
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', attachBackToTop);
} else {
    attachBackToTop();
}

// Feather icons (guard if script not loaded)
if (typeof feather !== 'undefined') {
    feather.replace();
}