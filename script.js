/* =========================================================
   Luka Talent Architect — script.js
   - Configuración editable (WhatsApp, mensajes)
   - Cableado de CTAs hacia WhatsApp con tracking
   - Tema claro/oscuro: detección automática + toggle manual
   ========================================================= */

(function () {
  "use strict";

  /* ----------------------------------------------------------
     CONFIG · edita estos valores antes de publicar
     ---------------------------------------------------------- */
  const CONFIG = {
    // Número de WhatsApp en formato internacional, sin "+" ni espacios
    whatsappNumber: "573206944290",

    // Mensajes prellenados que se envían al hacer clic en cada CTA
    messages: {
      paqueteImpulso:
        "Hola, Luka. Quiero información del Plan Impulso Inicial para mejorar mi hoja de vida.",
      paqueteÉlite:
        "Hola, Luka. Quiero información del Plan Élite Profesional para mejorar mi CV, LinkedIn y estrategia de búsqueda laboral.",
      paqueteArquitectura:
        "Hola, Luka. Quiero información sobre el Plan Arquitectura Total, que incluye el Plan Élite más la sesión 1 a 1 de coaching ontológico.",
    },
  };

  /* ----------------------------------------------------------
     TRACKING · stub listo para GA4 / Meta Pixel / GTM
     Reemplaza el contenido de dispatch() cuando conectes
     una plataforma real.
     ---------------------------------------------------------- */
  function dispatch(name, params) {
    // Meta Pixel — descomentar cuando esté instalado
    // if (typeof window.fbq === 'function') {
    //   window.fbq('trackCustom', name, params);
    // }

    // Google Analytics 4 / gtag — descomentar cuando esté instalado
    // if (typeof window.gtag === 'function') {
    //   window.gtag('event', name, params);
    // }

    // Log local durante desarrollo
    if (
      window.location.hostname === "localhost" ||
      window.location.protocol === "file:"
    ) {
      // eslint-disable-next-line no-console
      console.debug("[track]", name, params || {});
    }
  }

  const track = {
    pageView: function () {
      dispatch("PageView");
    },
    viewContent: function (section) {
      dispatch("ViewContent", { section: section });
    },
    clickWhatsApp: function (source) {
      if (source === 'paquetes_impulso') dispatch("ClickWhatsAppPlanImpulso");
      else if (source === 'paquetes_élite') dispatch("ClickWhatsAppPlanÉlite");
      else if (source === 'paquetes_arquitectura') dispatch("ClickWhatsAppPlanArquitecturaTotal");
      else dispatch("ClickWhatsApp", { source: source });
    },
    selectPlanImpulso: function () {
      dispatch("SelectPlanImpulso");
    },
    selectPlanÉlite: function () {
      dispatch("SelectPlanÉlite");
    },
    selectPlanArquitecturaTotal: function () {
      dispatch("SelectPlanArquitecturaTotal");
    },
    clickHeroViewPlans: function () { dispatch("ClickHeroViewPlans"); },
    clickSectionViewPlans: function () { dispatch("ClickSectionViewPlans"); },
    clickFinalViewPlans: function () { dispatch("ClickFinalViewPlans"); },
    clickNavPlans: function () { dispatch("ClickNavPlans"); },
    clickNavHowItWorks: function () { dispatch("ClickNavHowItWorks"); },
    showPlanChoiceToast: function (source) { dispatch("ShowPlanChoiceToast", { source: source }); },
  };

  /* ----------------------------------------------------------
     WHATSAPP · genera links a partir de data-attributes
     ---------------------------------------------------------- */
  function buildWhatsAppLink(message) {
    const text = encodeURIComponent(String(message || "").trim());
    return "https://wa.me/" + CONFIG.whatsappNumber + "?text=" + text;
  }

  function wireWhatsAppLinks() {
    const links = document.querySelectorAll(".wa-link");
    links.forEach(function (el) {
      const key = el.getAttribute("data-wa-msg") || "general";
      const message = CONFIG.messages[key] || CONFIG.messages.general;
      el.setAttribute("href", buildWhatsAppLink(message));
      el.setAttribute("target", "_blank");
      el.setAttribute("rel", "noopener noreferrer");

      el.addEventListener("click", function () {
        const source = el.getAttribute("data-wa-source") || "unknown";
        track.clickWhatsApp(source);

        if (el.classList.contains("wa-paquete-impulso")) track.selectPlanImpulso();
        if (el.classList.contains("wa-paquete-élite")) track.selectPlanÉlite();
        if (el.classList.contains("wa-paquete-arquitectura")) track.selectPlanArquitecturaTotal();
      });
    });
  }

  /* ----------------------------------------------------------
     AÑO ACTUAL en el footer
     ---------------------------------------------------------- */
  function wireYear() {
    const yearEl = document.getElementById("year");
    if (yearEl) yearEl.textContent = String(new Date().getFullYear());
  }

  /* ----------------------------------------------------------
     TEMA CLARO / OSCURO
     - Si hay preferencia guardada en localStorage, se usa.
     - Si no, se usa la del sistema (prefers-color-scheme).
     - El botón del header alterna y persiste la preferencia.
     - Si el usuario nunca toca el botón, sigue al sistema.
     ---------------------------------------------------------- */
  const THEME_KEY = "luka-theme";
  const root = document.documentElement;
  const mql = window.matchMedia("(prefers-color-scheme: dark)");

  function getSavedTheme() {
    try {
      const v = localStorage.getItem(THEME_KEY);
      return v === "light" || v === "dark" ? v : null;
    } catch (e) {
      return null;
    }
  }

  function getSystemTheme() {
    return mql.matches ? "dark" : "light";
  }

  function applyTheme(theme) {
    root.setAttribute("data-theme", theme);
    const toggle = document.getElementById("themeToggle");
    if (toggle) {
      const isDark = theme === "dark";
      toggle.setAttribute("aria-pressed", String(isDark));
      toggle.setAttribute(
        "title",
        isDark ? "Cambiar a tema claro" : "Cambiar a tema oscuro",
      );
      toggle.setAttribute(
        "aria-label",
        isDark ? "Cambiar a tema claro" : "Cambiar a tema oscuro",
      );
    }
  }

  function initTheme() {
    const saved = getSavedTheme();
    applyTheme(saved || getSystemTheme());
  }

  function wireThemeToggle() {
    const toggle = document.getElementById("themeToggle");
    if (!toggle) return;

    toggle.addEventListener("click", function () {
      const current =
        root.getAttribute("data-theme") === "dark" ? "dark" : "light";
      const next = current === "dark" ? "light" : "dark";
      applyTheme(next);
      try {
        localStorage.setItem(THEME_KEY, next);
      } catch (e) {
        /* noop */
      }
    });

    // Si el usuario no ha elegido manualmente, sigue cambios del sistema.
    function handleSystemChange(e) {
      if (!getSavedTheme()) applyTheme(e.matches ? "dark" : "light");
    }
    if (typeof mql.addEventListener === "function") {
      mql.addEventListener("change", handleSystemChange);
    } else if (typeof mql.addListener === "function") {
      mql.addListener(handleSystemChange);
    }
  }

  /* ----------------------------------------------------------
     Notificaciones Dinámicas (Apple-like Toast)
     ---------------------------------------------------------- */
  /* ----------------------------------------------------------
     Notificaciones Dinámicas (Toast Premium)
     ---------------------------------------------------------- */
  function wireNotifications() {
    const notif = document.getElementById("planNotification");
    if (!notif) return;

    const titleEl = document.getElementById("planNotifTitle");
    const msgEl = document.getElementById("planNotifMsg");
    const iconEl = document.getElementById("planNotifIcon");
    let hideTimeout;

    const icons = {
      paquetes: `
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
          <path d="M8 6h13M8 12h13M8 18h13M3 6h.01M3 12h.01M3 18h.01"/>
        </svg>`,
      proceso: `
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
          <circle cx="12" cy="12" r="10"/>
          <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76"/>
        </svg>`
    };

    function showNotification(type) {
      // Limpiar timeout previo si existe
      clearTimeout(hideTimeout);

      // Actualizar contenido
      if (type === 'paquetes') {
        if (titleEl) titleEl.innerHTML = "<strong>Elige cómo quieres avanzar</strong>";
        if (msgEl) msgEl.textContent = "Revisa los paquetes y selecciona la opción que mejor se ajusta a tu momento.";
        if (iconEl) {
          iconEl.className = "plan-notification-icon icon-aqua";
          iconEl.innerHTML = icons.paquetes;
        }
      } else if (type === 'proceso') {
        if (titleEl) titleEl.innerHTML = "<strong>Ruta de transformación</strong>";
        if (msgEl) msgEl.textContent = "Conoce nuestro método paso a paso para elevar tu perfil profesional.";
        if (iconEl) {
          iconEl.className = "plan-notification-icon icon-gold";
          iconEl.innerHTML = icons.proceso;
        }
      }

      // Reiniciar animación si ya estaba visible
      notif.classList.remove("is-visible");
      void notif.offsetWidth; // Force reflow
      notif.classList.add("is-visible");

      // Auto-ocultar tras 3.5 segundos
      hideTimeout = setTimeout(function () {
        notif.classList.remove("is-visible");
      }, 3500);
    }

    // Triggers para paquetes
    const planLinks = document.querySelectorAll('a[href="#paquetes"]');
    planLinks.forEach(function (link) {
      if (link.classList.contains("wa-floating") || link.closest('.paquetes-grid')) return;
      link.addEventListener("click", function () {
        showNotification('paquetes');
      });
    });

    // Triggers para proceso
    const processLinks = document.querySelectorAll('a[href="#proceso"]');
    processLinks.forEach(function (link) {
      link.addEventListener("click", function () {
        showNotification('proceso');
      });
    });
  }

  /* ----------------------------------------------------------
     FLOATING CTA DYNAMIC BEHAVIOR
     ---------------------------------------------------------- */
  function wireFloatingCta() {
    const btn = document.querySelector(".wa-floating");
    const targetSection = document.getElementById("paquetes");
    if (!btn || !targetSection) return;

    function onScroll() {
      const rect = targetSection.getBoundingClientRect();
      const isInView = rect.top < window.innerHeight && rect.bottom > 0;
      const isPastSection = rect.bottom <= 0;

      if (isInView) {
        btn.classList.add("is-hidden");
      } else {
        btn.classList.remove("is-hidden");
      }

      if (isPastSection) {
        btn.classList.add("is-up");
      } else {
        btn.classList.remove("is-up");
      }
    }

    window.addEventListener("scroll", onScroll, { passive: true });
    // Trigger once on load
    onScroll();
  }

  /* ----------------------------------------------------------
     FAQ · Comportamiento de acordeón animado
     ---------------------------------------------------------- */
  function wireFaq() {
    const items = document.querySelectorAll(".faq-item");

    items.forEach(function (details) {
      const summary = details.querySelector("summary");
      const content = details.querySelector(".faq-content");

      if (!summary || !content) return;

      summary.addEventListener("click", function (e) {
        e.preventDefault();

        if (details.dataset.animating === "true") return;

        if (details.open) {
          // Animar cierre
          details.dataset.animating = "true";
          const startHeight = details.offsetHeight + "px";
          
          // Medir altura cerrada
          details.removeAttribute("open");
          const endHeight = details.offsetHeight + "px";
          // Restaurar para animar
          details.setAttribute("open", "true");
          
          const animation = details.animate({
            height: [startHeight, endHeight]
          }, {
            duration: 250,
            easing: "cubic-bezier(0.16, 1, 0.3, 1)"
          });
          
          content.animate({
            opacity: [1, 0],
            transform: ["translateY(0)", "translateY(-8px)"]
          }, { duration: 200, easing: "ease" });

          animation.onfinish = function() {
            details.removeAttribute("open");
            details.dataset.animating = "false";
          };
          animation.oncancel = function() {
            details.dataset.animating = "false";
          };
        } else {
          // Animar apertura
          details.dataset.animating = "true";
          const startHeight = details.offsetHeight + "px";
          
          // Medir altura abierta
          details.setAttribute("open", "true");
          const endHeight = details.offsetHeight + "px";
          
          const animation = details.animate({
            height: [startHeight, endHeight]
          }, {
            duration: 300,
            easing: "cubic-bezier(0.16, 1, 0.3, 1)"
          });
          
          content.animate({
            opacity: [0, 1],
            transform: ["translateY(-8px)", "translateY(0)"]
          }, { duration: 300, easing: "ease" });

          animation.onfinish = function() {
            details.dataset.animating = "false";
          };
          animation.oncancel = function() {
            details.dataset.animating = "false";
          };
          
          // Cerrar los demás
          items.forEach(function(other) {
             if (other !== details && other.open) {
               other.querySelector("summary").click();
             }
          });
        }
      });
    });
  }

  /* ----------------------------------------------------------
     PLAN NOTIFICATION TOAST
     Muestra una notificación estilo Apple cuando el usuario
     hace clic en un CTA genérico (que no sea de un paquete
     específico).
     ---------------------------------------------------------- */
  var notifTimer = null;

  function showPlanNotification() {
    var el = document.getElementById("planNotification");
    if (!el) return;

    // Si ya está visible, reiniciamos el timer
    if (el.classList.contains("is-visible")) {
      clearTimeout(notifTimer);
    }

    el.classList.add("is-visible");

    // Auto-dismiss después de 4.5 s
    notifTimer = setTimeout(function () {
      hidePlanNotification();
    }, 4500);
  }

  function hidePlanNotification() {
    var el = document.getElementById("planNotification");
    if (!el) return;
    el.classList.remove("is-visible");
    clearTimeout(notifTimer);
  }

  function wirePlanNotification() {
    var notification = document.getElementById("planNotification");
    if (!notification) return;

    // Close button
    var closeBtn = notification.querySelector(".plan-notification-close");
    if (closeBtn) {
      closeBtn.addEventListener("click", function (e) {
        e.preventDefault();
        hidePlanNotification();
      });
    }

    // Attach to all buttons/links that point to #paquetes
    // BUT exclude buttons that are inside .paquete-cta (the real plan buttons)
    var allBtns = document.querySelectorAll('a.btn[href="#paquetes"], a.wa-floating[href="#paquetes"]');
    allBtns.forEach(function (btn) {
      // Skip if it's inside a paquete-cta div (those are the plan-specific buttons)
      if (btn.closest(".paquete-cta")) return;
      // Skip nav links (they just scroll)
      if (btn.closest(".nav")) return;

      btn.addEventListener("click", function () {
        // Track CTA click that leads to plans
        let source = "unknown";
        if (btn.closest(".hero")) source = "hero";
        else if (btn.closest(".section-how")) source = "how_it_works";
        else if (btn.closest(".section-final-cta")) source = "final_cta";
        else if (btn.classList.contains("wa-floating")) source = "floating_btn";
        
        track.showPlanChoiceToast(source);

        // Pequeño delay para que el scroll empiece primero
        setTimeout(function () {
          showPlanNotification();
        }, 600);
      });
    });
  }

  /* ----------------------------------------------------------
     SCROLL REVEAL ANIMATIONS
     ---------------------------------------------------------- */
  function initScrollReveal() {
    // Autoinyectar animación a elementos clave para mayor movimiento general
    const autoRevealSelectors = [
      '.section-header .eyebrow',
      '.section-header .h-section',
      '.section-header .lede',
      '.paquete-features li',
      '.paquete-includes-label',
      '.final-eyebrow',
      '.final-headline',
      '.final-lede',
      '.hero-content h1',
      '.hero-content p',
      '.hero-actions'
    ];
    
    autoRevealSelectors.forEach(function(selector) {
      document.querySelectorAll(selector).forEach(function(el) {
        el.classList.add('reveal-on-scroll');
      });
    });

    if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      document.querySelectorAll('.reveal-on-scroll').forEach(function(el) {
        el.classList.add('is-revealed');
      });
      return;
    }

    const observer = new IntersectionObserver(function (entries, obs) {
      const intersecting = entries.filter(function(e) { return e.isIntersecting; });
      intersecting.forEach(function (entry, index) {
        setTimeout(function() {
          entry.target.classList.add('is-revealed');
        }, index * 100); // Stagger leve
        obs.unobserve(entry.target);
      });
    }, {
      root: null,
      rootMargin: "0px 0px -50px 0px",
      threshold: 0.1
    });

    document.querySelectorAll('.reveal-on-scroll').forEach(function(el) {
      observer.observe(el);
    });
  }

  /* ----------------------------------------------------------
     INIT
     ---------------------------------------------------------- */
  function init() {
    initTheme();
    wireThemeToggle();
    wireWhatsAppLinks();
    wireYear();
    wireFloatingCta();
    wireFaq();
    wireNotifications();
    initScrollReveal();
    track.pageView();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
