(() => {
  "use strict";

  const header = document.getElementById("siteHeader");
  const menuButton = document.getElementById("menuButton");
  const mobileMenu = document.getElementById("mobileMenu");
  const scrollProgress = document.getElementById("scrollProgress");
  const contactForm = document.getElementById("contactForm");
  const formStatus = document.getElementById("formStatus");
  const currentYear = document.getElementById("currentYear");
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  const whatsappNumber = "543525617652";

  const updateScrollUI = () => {
    const scrollTop = window.scrollY;
    const maxScroll = document.documentElement.scrollHeight - window.innerHeight;

    header?.classList.toggle("is-scrolled", scrollTop > 18);

    if (scrollProgress) {
      const percentage = maxScroll > 0 ? (scrollTop / maxScroll) * 100 : 0;
      scrollProgress.style.width = `${percentage}%`;
    }
  };

  let scrollTicking = false;
  window.addEventListener(
    "scroll",
    () => {
      if (scrollTicking) return;

      window.requestAnimationFrame(() => {
        updateScrollUI();
        scrollTicking = false;
      });
      scrollTicking = true;
    },
    { passive: true }
  );

  const closeMenu = () => {
    if (!menuButton || !mobileMenu) return;

    menuButton.setAttribute("aria-expanded", "false");
    menuButton.setAttribute("aria-label", "Abrir menú");
    mobileMenu.setAttribute("aria-hidden", "true");
    mobileMenu.classList.remove("is-open");
    header?.classList.remove("menu-visible");
    document.body.classList.remove("menu-open");
  };

  const openMenu = () => {
    if (!menuButton || !mobileMenu) return;

    menuButton.setAttribute("aria-expanded", "true");
    menuButton.setAttribute("aria-label", "Cerrar menú");
    mobileMenu.setAttribute("aria-hidden", "false");
    mobileMenu.classList.add("is-open");
    header?.classList.add("menu-visible");
    document.body.classList.add("menu-open");
  };

  menuButton?.addEventListener("click", () => {
    const isOpen = menuButton.getAttribute("aria-expanded") === "true";
    isOpen ? closeMenu() : openMenu();
  });

  mobileMenu?.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", closeMenu);
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") closeMenu();
  });

  window.addEventListener(
    "resize",
    () => {
      if (window.innerWidth >= 900) closeMenu();
      updateScrollUI();
    },
    { passive: true }
  );

  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener("click", (event) => {
      const selector = link.getAttribute("href");
      if (!selector || selector === "#") return;

      const target = document.querySelector(selector);
      if (!target) return;

      event.preventDefault();
      target.scrollIntoView({
        behavior: reducedMotion.matches ? "auto" : "smooth",
        block: "start"
      });

      if (history.replaceState) {
        history.replaceState(null, "", selector);
      }
    });
  });

  const buildWhatsAppMessage = (data) => {
    return [
      "Hola Vantix Design Studio, quiero consultar por un proyecto.",
      "",
      `Nombre: ${data.get("nombre")}`,
      `Email: ${data.get("email")}`,
      `Servicio: ${data.get("servicio")}`,
      "",
      "Mensaje:",
      data.get("mensaje")
    ].join("\n");
  };

  contactForm?.addEventListener("submit", (event) => {
    event.preventDefault();

    if (!contactForm.checkValidity()) {
      contactForm.reportValidity();
      return;
    }

    const data = new FormData(contactForm);
    const message = buildWhatsAppMessage(data);
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
    const submitButton = contactForm.querySelector(".form-submit");

    if (submitButton) {
      submitButton.disabled = true;
      submitButton.firstChild.textContent = "Abriendo WhatsApp ";
    }

    if (formStatus) {
      formStatus.textContent = "Tu consulta está lista. Se abrirá WhatsApp en una pestaña nueva.";
    }

    window.open(whatsappUrl, "_blank", "noopener,noreferrer");

    window.setTimeout(() => {
      if (submitButton) {
        submitButton.disabled = false;
        submitButton.firstChild.textContent = "Consultar por WhatsApp ";
      }
    }, 1800);
  });

  if (currentYear) {
    currentYear.textContent = String(new Date().getFullYear());
  }

  updateScrollUI();
})();
