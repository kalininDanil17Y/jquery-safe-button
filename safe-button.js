(function () {
  /* ===============================
     SAFE BUTTON (HOLD-TO-CONFIRM)
     =============================== */

  const DEFAULTS = {
    ms: 1000,
    message: "Нужно зажать и удерживать кнопку пару секунд",
    allowMouse: true,
    allowTouch: true,
    allowPen: true,
    okFlashMs: 180,

    // Called on confirm: function($el, options)
    onConfirm: null,

    // Called when user releases BEFORE confirm (hold started but not finished):
    // function($el, options, meta) where meta = { progress, elapsedMs, holdMs, reason }
    onCancel: null,

    // Called on short click (tap/click without holding):
    // function($el, options, meta)
    onHint: null,

    // If true: do NOT trigger "hold:confirmed" event
    silentEvent: false
  };

  function clamp01(x) {
    return Math.max(0, Math.min(1, x));
  }

  $.fn.safeButton = function (options) {
    const cfg = $.extend({}, DEFAULTS, options || {});

    return this.each(function () {
      const el = this;
      const $el = $(el);
      if ($el.data("_safeButtonInit")) return;
      $el.data("_safeButtonInit", true);

      function getState() {
        let st = $el.data("_holdState");
        if (!st) {
          st = {
            raf: 0,
            holding: false,
            start: 0,
            pointerId: null,
            done: false,
            holdMs: cfg.ms
          };
          $el.data("_holdState", st);
        }
        return st;
      }

      function setProgress(p) {
        el.style.setProperty("--hold-progress", String(clamp01(p)));
      }

      function resetVisual() {
        const st = getState();
        if (st.raf) cancelAnimationFrame(st.raf);
        st.raf = 0;
        st.holding = false;
        st.start = 0;
        st.pointerId = null;
        st.done = false;
        $el.removeClass("is-holding");
        setProgress(0);
      }

      function finish() {
        const st = getState();
        st.done = true;
        $el.removeClass("is-holding").addClass("is-hold-ok");
        setProgress(1);

        if (typeof cfg.onConfirm === "function") {
          cfg.onConfirm($el, cfg);
        }
        if (!cfg.silentEvent) {
          $el.trigger("hold:confirmed");
        }

        setTimeout(function () {
          $el.removeClass("is-hold-ok");
          setProgress(0);
        }, cfg.okFlashMs);
      }

      function tick() {
        const st = getState();
        if (!st.holding || st.done) return;

        const holdMs = st.holdMs;
        const elapsed = performance.now() - st.start;
        const p = elapsed / holdMs;
        setProgress(p);

        if (p >= 1) return finish();
        st.raf = requestAnimationFrame(tick);
      }

      function canUsePointerType(type) {
        if (type === "mouse") return cfg.allowMouse;
        if (type === "touch") return cfg.allowTouch;
        if (type === "pen") return cfg.allowPen;
        return true;
      }

      function metaNow(reason) {
        const st = getState();
        const elapsedMs = st.start ? performance.now() - st.start : 0;
        const progress = st.holdMs ? clamp01(elapsedMs / st.holdMs) : 0;
        return {
          reason: reason || "",
          elapsedMs: Math.max(0, Math.round(elapsedMs)),
          holdMs: st.holdMs,
          progress
        };
      }

      // Short click = hint only (NO alert by default; you can handle via onHint)
      $el.on("click.safeButton", function (e) {
        const st = getState();

        // If already confirmed, allow normal click to pass through if you want:
        if (st.done) return;

        e.preventDefault();
        e.stopPropagation();

        if (!st.holding) {
          const msg = $el.data("hold-message") || cfg.message;
          if (typeof cfg.onHint === "function") {
            cfg.onHint($el, cfg, { message: msg });
          }
        }
      });

      // Hold start
      $el.on("pointerdown.safeButton", function (e) {
        if ($el.is(":disabled") || !canUsePointerType(e.pointerType)) return;

        // full reset before new hold
        resetVisual();

        const st = getState();
        st.holding = true;
        st.pointerId = e.pointerId;
        st.start = performance.now();
        st.holdMs = Number($el.data("hold-ms")) || cfg.ms;

        try {
          el.setPointerCapture(e.pointerId);
        } catch (_) {}

        $el.addClass("is-holding");
        tick();
        e.preventDefault();
      });

      // Hold end / cancel
      $el.on(
        "pointerup.safeButton pointercancel.safeButton pointerleave.safeButton",
        function (e) {
          const st = getState();

          // If confirmed, do nothing (finish() already handled visuals)
          if (st.done) return;

          // If we were holding and released early => cancel callback
          if (st.holding) {
            const meta = metaNow(e && e.type ? e.type : "release");
            resetVisual();

            if (typeof cfg.onCancel === "function") {
              cfg.onCancel($el, cfg, meta);
            }
            if (!cfg.silentEvent) {
              $el.trigger("hold:cancelled", meta);
            }
            return;
          }

          // otherwise just reset (safety)
          resetVisual();
        }
      );
    });
  };

  $.safeButton = function (selector, options) {
    return $(selector).safeButton(options);
  };
})();

