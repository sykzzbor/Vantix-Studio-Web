// VANTIX DIGITAL — Main JS

// ── Smooth mouse-wheel scroll (cross-browser) ──────────────────────────────
// Uses a LERP loop so the page glides to where you're scrolling instead of
// jumping. Works on Chrome, Firefox, Safari, Edge — both mouse wheel and
// trackpad. Touch devices are excluded (they already have native momentum).
(function () {
    if ('ontouchstart' in window && !window.matchMedia('(pointer:fine)').matches) return;

    var target  = window.scrollY;
    var current = window.scrollY;
    var raf     = null;

    function clamp(v, lo, hi) { return Math.min(Math.max(v, lo), hi); }
    function maxScroll()      { return document.documentElement.scrollHeight - window.innerHeight; }

    function tick() {
        var dist = target - current;
        if (Math.abs(dist) < 0.5) {
            current = target;
            window.scrollTo(0, current);
            raf = null;
            return;
        }
        current += dist * 0.11;
        window.scrollTo(0, current);
        raf = requestAnimationFrame(tick);
    }

    window.addEventListener('wheel', function (e) {
        e.preventDefault();
        // Normalise delta across deltaMode values (pixel / line / page)
        var px = e.deltaMode === 1 ? e.deltaY * 24
               : e.deltaMode === 2 ? e.deltaY * window.innerHeight
               : e.deltaY;
        target = clamp(target + px, 0, maxScroll());
        if (!raf) {
            current = window.scrollY;
            raf = requestAnimationFrame(tick);
        }
    }, { passive: false });

    // Keep internal state in sync when scroll comes from other sources
    // (keyboard, anchor clicks, programmatic scrollTo)
    window.addEventListener('scroll', function () {
        if (!raf) {
            current = window.scrollY;
            target  = window.scrollY;
        }
    }, { passive: true });

    window.addEventListener('resize', function () {
        target = clamp(target, 0, maxScroll());
    }, { passive: true });
})();

// ── Premium smooth scroll for anchor links ────────────────────────────────
(function () {
    var DURATION = 900;
    var OFFSET   = 88;

    function easeOutQuart(t) { return 1 - Math.pow(1 - t, 4); }

    function smoothScrollTo(y) {
        var start     = window.scrollY;
        var dist      = y - start;
        var startTime = null;
        function step(ts) {
            if (!startTime) startTime = ts;
            var progress = Math.min((ts - startTime) / DURATION, 1);
            window.scrollTo(0, start + dist * easeOutQuart(progress));
            if (progress < 1) requestAnimationFrame(step);
        }
        requestAnimationFrame(step);
    }

    document.addEventListener('click', function (e) {
        var link = e.target.closest('a[href^="#"]');
        if (!link) return;
        var hash = link.getAttribute('href');
        if (!hash || hash === '#') return;
        var target = document.querySelector(hash);
        if (!target) return;
        e.preventDefault();
        var y = target.getBoundingClientRect().top + window.scrollY - OFFSET;
        smoothScrollTo(Math.max(0, y));
        if (history.pushState) history.pushState(null, null, hash);
    });
})();

// ── Navbar scroll state ───────────────────────────────────────────────────
(function () {
    var navbar = document.getElementById('navbar');
    if (!navbar) return;
    function onScroll() {
        navbar.classList.toggle('scrolled', window.scrollY > 30);
    }
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
})();

// ── Mobile menu ───────────────────────────────────────────────────────────
(function () {
    var btn  = document.getElementById('navMenuBtn');
    var menu = document.getElementById('navMobile');
    if (!btn || !menu) return;

    function openMenu() {
        btn.classList.add('open');
        menu.classList.add('open');
        menu.setAttribute('aria-hidden', 'false');
        btn.setAttribute('aria-expanded', 'true');
        btn.setAttribute('aria-label', 'Cerrar menú');
        document.body.style.overflow = 'hidden';
    }

    function closeMenu() {
        btn.classList.remove('open');
        menu.classList.remove('open');
        menu.setAttribute('aria-hidden', 'true');
        btn.setAttribute('aria-expanded', 'false');
        btn.setAttribute('aria-label', 'Abrir menú');
        document.body.style.overflow = '';
    }

    btn.addEventListener('click', function () {
        menu.classList.contains('open') ? closeMenu() : openMenu();
    });

    // Close when a link is tapped
    menu.querySelectorAll('a').forEach(function (link) {
        link.addEventListener('click', closeMenu);
    });

    // Close with Escape key
    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape' && menu.classList.contains('open')) closeMenu();
    });

    // Close when viewport grows past breakpoint (orientation change, etc.)
    window.addEventListener('resize', function () {
        if (window.innerWidth > 768 && menu.classList.contains('open')) closeMenu();
    }, { passive: true });
})();

// ── Scroll reveals with stagger ───────────────────────────────────────────
(function () {
    document.querySelectorAll('[data-stagger]').forEach(function (parent) {
        parent.querySelectorAll('.reveal').forEach(function (el, i) {
            el.style.transitionDelay = (i * 80) + 'ms';
        });
    });

    var reveals = document.querySelectorAll('.reveal');

    if (!('IntersectionObserver' in window)) {
        reveals.forEach(function (el) { el.classList.add('visible'); });
        return;
    }

    var observer = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -6% 0px' });

    reveals.forEach(function (el) { observer.observe(el); });
})();

// ── Showcase video playback ───────────────────────────────────────────────
// Forces muted playback (required by autoplay policies), plays each video
// while it is on screen and pauses it off screen. Falls back to a first
// user gesture when the browser blocks autoplay. Honours reduced-motion.
(function () {
    var videos = document.querySelectorAll('video[data-inview]');
    if (!videos.length) return;

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        videos.forEach(function (v) {
            v.removeAttribute('autoplay');
            v.pause();
        });
        return;
    }

    function play(v) {
        v.muted = true;
        v.defaultMuted = true;
        var p = v.play();
        if (p && p.catch) p.catch(function () {});
    }

    if ('IntersectionObserver' in window) {
        var observer = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) play(entry.target);
                else entry.target.pause();
            });
        }, { threshold: 0.2 });
        videos.forEach(function (v) { observer.observe(v); });
    } else {
        videos.forEach(play);
    }

    function resume() {
        videos.forEach(function (v) {
            if (v.paused) play(v);
        });
    }
    ['pointerdown', 'touchstart', 'keydown'].forEach(function (evt) {
        window.addEventListener(evt, resume, { once: true, passive: true });
    });
})();

// ── Contact form → WhatsApp ───────────────────────────────────────────────
// Al enviar, arma un mensaje con los datos del formulario y abre WhatsApp
// con el texto prellenado hacia el número de Vantix Digital.
(function () {
    var form    = document.getElementById('contactForm');
    var success = document.getElementById('formSuccess');
    if (!form || !success) return;

    var PHONE = '5493525642125';

    function buildMessage(nombre, email, mensaje) {
        return [
            '¡Hola Vantix Digital! Quiero hacer una consulta.',
            '',
            'Nombre: ' + nombre,
            'Email: ' + email,
            '',
            'Mensaje:',
            mensaje
        ].join('\n');
    }

    form.addEventListener('submit', function (e) {
        e.preventDefault();

        if (!form.checkValidity()) {
            form.reportValidity();
            return;
        }

        var nombre  = form.nombre.value.trim();
        var email   = form.email.value.trim();
        var mensaje = form.mensaje.value.trim();
        if (!nombre || !email || !mensaje) {
            form.reportValidity();
            return;
        }

        var url = 'https://wa.me/' + PHONE + '?text=' + encodeURIComponent(buildMessage(nombre, email, mensaje));

        var btn          = form.querySelector('.form-submit');
        var originalHTML = btn.innerHTML;
        btn.textContent  = 'Abriendo WhatsApp...';
        btn.disabled     = true;

        window.open(url, '_blank', 'noopener');

        success.classList.add('visible');
        form.reset();

        setTimeout(function () {
            btn.innerHTML = originalHTML;
            btn.disabled  = false;
            success.classList.remove('visible');
        }, 5000);
    });
})();

// ── Cursor glow (LERP follow) ─────────────────────────────────────────────
(function () {
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;

    var glow = document.createElement('div');
    glow.className = 'cursor-glow';
    document.body.appendChild(glow);

    var mx = -250, my = -250;
    var cx = -250, cy = -250;
    var raf = null;

    window.addEventListener('mousemove', function (e) {
        mx = e.clientX;
        my = e.clientY;
        if (!raf) raf = requestAnimationFrame(tick);
    }, { passive: true });

    function tick() {
        cx += (mx - cx) * 0.085;
        cy += (my - cy) * 0.085;
        glow.style.transform = 'translate(' + (cx - 250) + 'px, ' + (cy - 250) + 'px)';
        if (Math.abs(mx - cx) > 0.3 || Math.abs(my - cy) > 0.3) {
            raf = requestAnimationFrame(tick);
        } else {
            raf = null;
        }
    }
})();

// ── Scroll progress bar ───────────────────────────────────────────────────
(function () {
    var bar = document.createElement('div');
    bar.className = 'scroll-progress';
    document.body.prepend(bar);

    function update() {
        var max = document.documentElement.scrollHeight - window.innerHeight;
        if (max <= 0) return;
        bar.style.width = ((window.scrollY / max) * 100) + '%';
    }

    window.addEventListener('scroll', update, { passive: true });
    update();
})();
