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
        "Hola, Luca. Quiero información del Plan Impulso Inicial para mejorar mi hoja de vida.",
      paqueteElite:
        "Hola, Luca. Quiero información del Plan Élite Profesional para mejorar mi CV, LinkedIn y estrategia de búsqueda laboral.",
      paqueteArquitectura:
        "Hola, Luca. Quiero información sobre el Plan Arquitectura Total, que incluye el Plan Élite más la sesión 1 a 1 de coaching ontológico.",
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
      else if (source === 'paquetes_elite') dispatch("ClickWhatsAppPlanElite");
      else if (source === 'paquetes_arquitectura') dispatch("ClickWhatsAppPlanArquitecturaTotal");
      else dispatch("ClickWhatsApp", { source: source });
    },
    selectPlanImpulso: function () {
      dispatch("SelectPlanImpulso");
    },
    selectPlanElite: function () {
      dispatch("SelectPlanElite");
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
        if (el.classList.contains("wa-paquete-elite")) track.selectPlanElite();
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
     FAQ · Comportamiento de acordeón (solo uno abierto)
     ---------------------------------------------------------- */
  function wireFaq() {
    const items = document.querySelectorAll(".faq-item");
    items.forEach(function (item) {
      item.addEventListener("toggle", function () {
        if (item.open) {
          items.forEach(function (other) {
            if (other !== item) other.removeAttribute("open");
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
     INIT
     ---------------------------------------------------------- */
  function init() {
    initTheme();
    wireThemeToggle();
    wireWhatsAppLinks();
    wireYear();
    wireFloatingCta();
    wireFaq();
    wirePlanNotification();
    track.pageView();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
