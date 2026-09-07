
(function () {
  "use strict";

  /* =====================================================
     CONFIG — the 5MinQuote worker's API base. Every visit to this
     shared landing page (any lead source — Website, NextDoor,
     Google, Facebook/IG, TikTok...) talks to the same worker.
  ===================================================== */
  var WORKER_BASE = "https://guttermaxx-5minquote-worker.vercel.app";
  var LEAD_CAPTURE_URL   = WORKER_BASE + "/api/lead-capture";
  var ADDRESS_LOOKUP_URL = WORKER_BASE + "/api/address-lookup";
  var OTP_SEND_URL       = WORKER_BASE + "/api/otp-send";
  var OTP_VERIFY_URL     = WORKER_BASE + "/api/otp-verify";

  // Cloudflare Turnstile — invisible bot check. Site key is public by
  // design (safe to ship in client code); the paired secret key lives only
  // in the worker's server-side environment and is never exposed here.
  var TURNSTILE_SITE_KEY = "0x4AAAAAAEqqo6c6nQmUc4d-";

  var $  = function (s, c) { return (c || document).querySelector(s); };
  var $$ = function (s, c) { return Array.prototype.slice.call((c || document).querySelectorAll(s)); };
  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;


  /* =====================================================
     LEAD SOURCE
     This one landing page serves every ad/referral channel.
     Read ?lead_source= (falls back to ?utm_source=) so campaign
     links can tag which channel drove the visit — e.g.
     ?lead_source=nextdoor for the NextDoor campaign. The worker
     resolves the tag, GHL label, and any calendar override; this
     page only needs to pass the raw key through untouched.
  ===================================================== */
  function detectLeadSource() {
    try {
      var params = new URLSearchParams(window.location.search);
      var raw = params.get("lead_source") || params.get("utm_source") || "website";
      return raw.trim().toLowerCase() || "website";
    } catch (e) {
      return "website";
    }
  }
  var LEAD_SOURCE = detectLeadSource();


  /* =====================================================
     MISSING PHOTOS
     Only real photography is shown. If a file is missing,
     the tile is removed rather than replaced with artwork.
  ===================================================== */
  function tidyGallery() {
    var gallery = $(".gallery");
    var homes = $("#homes");
    if (!gallery || !homes) return;
    if ($$("figure", gallery).length < 2) homes.style.display = "none";
  }

  function dropImage(img) {
    var fig = img.closest("figure");
    if (fig) { fig.remove(); tidyGallery(); return; }
    var frame = img.closest(".frame");
    if (frame) {
      img.remove();
      frame.classList.add("art-only");
      var wrap = frame.closest(".hero-img");
      if (wrap) wrap.classList.add("no-photo");
      return;
    }
    var sys = img.closest(".system-images");
    if (sys) { sys.remove(); var sg = $(".system-grid"); if (sg) sg.style.gridTemplateColumns = "1fr"; }
  }

  $$(".gallery img, .hero-img img, .system-images img").forEach(function (img) {
    img.addEventListener("error", function () { dropImage(img); });
    if (img.complete && img.naturalWidth === 0) dropImage(img);
  });

  // brand assets: hide quietly if the logo file hasn't been copied in yet
  $$(".brand-logo, .watermark, .form-logo").forEach(function (img) {
    img.addEventListener("error", function () { img.style.display = "none"; });
  });


  /* =====================================================
     SCROLL REVEAL
  ===================================================== */
  var revealItems = $$(".reveal");
  if ("IntersectionObserver" in window && !reduceMotion) {
    var revealObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("show");
          revealObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });
    revealItems.forEach(function (el) { revealObserver.observe(el); });
  } else {
    revealItems.forEach(function (el) { el.classList.add("show"); });
  }


  /* =====================================================
     HEADER, PROGRESS BAR, ACTIVE LINK, MOBILE CTA
  ===================================================== */
  var header = $("#siteHeader");
  var progress = $("#progress");
  var mobileCta = $("#mobileCta");

  function onScroll() {
    var y = window.scrollY;
    header.classList.toggle("scrolled", y > 10);
    var max = document.documentElement.scrollHeight - window.innerHeight;
    progress.style.transform = "scaleX(" + (max > 0 ? y / max : 0) + ")";
    if (!mobileCta.dataset.done) mobileCta.classList.toggle("show", y > 700);
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  var navLinks = $$(".links a");
  var sections = navLinks.map(function (a) { return $(a.getAttribute("href")); }).filter(Boolean);
  if ("IntersectionObserver" in window && sections.length) {
    var spy = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        navLinks.forEach(function (a) {
          a.classList.toggle("active", a.getAttribute("href") === "#" + entry.target.id);
        });
      });
    }, { rootMargin: "-45% 0px -50% 0px" });
    sections.forEach(function (s) { spy.observe(s); });
  }


  /* =====================================================
     MOBILE MENU
  ===================================================== */
  var menuBtn = $("#menuBtn");
  var menu = $("#navLinks");

  function setMenu(open) {
    menu.classList.toggle("open", open);
    menuBtn.setAttribute("aria-expanded", String(open));
    menuBtn.setAttribute("aria-label", open ? "Close menu" : "Open menu");
  }
  menuBtn.addEventListener("click", function () {
    setMenu(menuBtn.getAttribute("aria-expanded") !== "true");
  });
  navLinks.forEach(function (link) {
    link.addEventListener("click", function () { setMenu(false); });
  });
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") setMenu(false);
  });


  /* =====================================================
     COUNT-UP STATS
  ===================================================== */
  function animateCount(el) {
    var target = parseInt(el.dataset.count, 10);
    var suffix = el.dataset.suffix || "";
    if (reduceMotion) { el.textContent = target.toLocaleString() + suffix; return; }
    var start = performance.now(), dur = 1400;
    function step(now) {
      var p = Math.min((now - start) / dur, 1);
      var eased = 1 - Math.pow(1 - p, 3);
      el.textContent = Math.round(target * eased).toLocaleString() + suffix;
      if (p < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }

  var counters = $$("[data-count]");
  if ("IntersectionObserver" in window) {
    var countObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          animateCount(entry.target);
          countObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.6 });
    counters.forEach(function (el) { countObserver.observe(el); });
  }


  /* =====================================================
     CROSS-SECTION DEMO TOGGLE
  ===================================================== */
  var demo = $("#demo");
  if (demo) {
    $$(".demo-btn", demo).forEach(function (btn) {
      btn.addEventListener("click", function () {
        demo.dataset.mode = btn.dataset.mode;
        $$(".demo-btn", demo).forEach(function (b) {
          b.setAttribute("aria-pressed", String(b === btn));
        });
      });
    });
  }


  /* =====================================================
     COLOR STUDIO
     (Removed for launch — will be reintroduced later. The
     hidden #colorPreference input still exists in the form
     markup and simply stays empty until this section returns.)
  ===================================================== */


  /* =====================================================
     REVIEW CAROUSEL
  ===================================================== */
  (function () {
    var root = $("#reviewCarousel");
    if (!root) return;

    var track  = $("#carouselTrack");
    var slides = $$(".slide", track);
    var dots   = $$(".dot", $("#carouselDots"));
    var count  = $("#carouselCount");
    var index  = 0;
    var timer  = null;
    var DELAY  = 4200;

    function render() {
      track.style.transform = "translateX(" + (-index * 100) + "%)";
      dots.forEach(function (d, i) { d.setAttribute("aria-selected", String(i === index)); });
      slides.forEach(function (sl, i) { sl.setAttribute("aria-hidden", String(i !== index)); });
      count.textContent = (index + 1) + " / " + slides.length;
    }

    function go(n) { index = (n + slides.length) % slides.length; render(); }

    function play() {
      if (reduceMotion || timer) return;
      timer = setInterval(function () { go(index + 1); }, DELAY);
    }
    function pause() { clearInterval(timer); timer = null; }
    function restart() { pause(); play(); }

    $("#nextReview").addEventListener("click", function () { go(index + 1); restart(); });
    $("#prevReview").addEventListener("click", function () { go(index - 1); restart(); });
    dots.forEach(function (d, i) {
      d.addEventListener("click", function () { go(i); restart(); });
    });

    root.addEventListener("mouseenter", pause);
    root.addEventListener("mouseleave", play);
    root.addEventListener("focusin", pause);
    root.addEventListener("focusout", play);
    document.addEventListener("visibilitychange", function () {
      if (document.hidden) pause(); else play();
    });

    root.addEventListener("keydown", function (e) {
      if (e.key === "ArrowRight") { go(index + 1); restart(); }
      if (e.key === "ArrowLeft")  { go(index - 1); restart(); }
    });

    var x0 = null;
    root.addEventListener("touchstart", function (e) { x0 = e.touches[0].clientX; pause(); }, { passive: true });
    root.addEventListener("touchend", function (e) {
      if (x0 === null) return;
      var dx = e.changedTouches[0].clientX - x0;
      if (Math.abs(dx) > 45) go(index + (dx < 0 ? 1 : -1));
      x0 = null;
      play();
    });

    render();
    play();
  })();


  /* =====================================================
     GALLERY LIGHTBOX
  ===================================================== */
  var lightbox = $("#lightbox");
  var lightboxImg = $("#lightboxImg");

  $$(".gallery figure").forEach(function (fig) {
    fig.addEventListener("click", function () {
      var img = $("img", fig);
      lightboxImg.src = img.currentSrc || img.src;
      lightboxImg.alt = img.alt;
      lightbox.classList.add("open");
      document.body.style.overflow = "hidden";
    });
  });

  function closeLightbox() {
    if (!lightbox.classList.contains("open")) return;
    lightbox.classList.remove("open");
    document.body.style.overflow = "";
  }
  $("#lightboxClose").addEventListener("click", closeLightbox);
  lightbox.addEventListener("click", function (e) { if (e.target === lightbox) closeLightbox(); });
  document.addEventListener("keydown", function (e) { if (e.key === "Escape") closeLightbox(); });


  /* =====================================================
     ASSESSMENT FORM
     One shared form feeds all three right-hand choices. The three
     CTA clicks ARE the submit actions — there is no separate
     "submit the form" step before choosing a path.
  ===================================================== */
  var form = $("#assessmentForm");
  var formContainer = $("#formContainer");
  var quoteTransition = $("#quoteTransition");
  var phone = $("#phone");
  var zip = $("#zip");
  var consent = $("#consent");
  var formStatus = $("#formStatus");
  var leadData = null;       // last validated snapshot of the shared form
  var pendingRequest = null; // { request_id, territory, zip } from address-lookup, used by OTP flow

  phone.addEventListener("input", function () {
    var d = phone.value.replace(/\D/g, "").slice(0, 10);
    phone.value = d.length > 6 ? "(" + d.slice(0, 3) + ") " + d.slice(3, 6) + "-" + d.slice(6)
                : d.length > 3 ? "(" + d.slice(0, 3) + ") " + d.slice(3)
                : d.length     ? "(" + d
                : "";
  });

  zip.addEventListener("input", function () {
    zip.value = zip.value.replace(/\D/g, "").slice(0, 5);
  });

  function showError(field, show) {
    var msg = $('.error[data-for="' + field.id + '"]');
    field.classList.toggle("invalid", show);
    field.setAttribute("aria-invalid", String(show));
    if (msg) msg.classList.toggle("show", show);
  }

  function isValid(field) {
    var v = field.value.trim();
    if (!v) return false;
    if (field.id === "phone") return v.replace(/\D/g, "").length === 10;
    if (field.id === "email") return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v);
    if (field.id === "zip")   return /^\d{5}$/.test(v);
    return true;
  }

  var fields = ["first_name", "last_name", "phone", "email", "address", "zip"].map(function (id) { return $("#" + id); });
  fields.forEach(function (f) {
    f.addEventListener("blur", function () { showError(f, !isValid(f)); });
    f.addEventListener("input", function () { if (f.classList.contains("invalid") && isValid(f)) showError(f, false); });
    f.addEventListener("change", function () { if (isValid(f)) showError(f, false); });
  });

  var consentWrap = consent.closest(".consent-check");
  consent.addEventListener("change", function () {
    if (consent.checked) {
      consentWrap.classList.remove("invalid");
      $('.error[data-for="consent"]').classList.remove("show");
    }
  });

  // Validates every field + consent. Returns a plain data object on success,
  // or null (and focuses/highlights the first problem) on failure.
  function validateLeftForm() {
    if ($("#company").value) return null; // spam trap — fail silently, no error shown

    var firstBad = null;
    fields.forEach(function (f) {
      var ok = isValid(f);
      showError(f, !ok);
      if (!ok && !firstBad) firstBad = f;
    });

    var consentOk = consent.checked;
    consentWrap.classList.toggle("invalid", !consentOk);
    $('.error[data-for="consent"]').classList.toggle("show", !consentOk);
    if (!consentOk && !firstBad) firstBad = consent;

    if (firstBad) { firstBad.focus(); return null; }

    return {
      first_name: $("#first_name").value.trim(),
      last_name:  $("#last_name").value.trim(),
      phone:      phone.value.trim(),
      email:      $("#email").value.trim(),
      address:    $("#address").value.trim(),
      zip:        zip.value.trim(),
      color_preference: $("#colorPreference").value || ""
    };
  }

  function toE164(phoneDisplay) {
    return "+1" + phoneDisplay.replace(/\D/g, "");
  }

  function setStatus(msg, isErr) {
    formStatus.textContent = msg || "";
    formStatus.classList.toggle("is-error", Boolean(isErr));
  }

  function setBtnLoading(btn, loading, label) {
    if (loading) {
      if (!btn.dataset.originalHtml) btn.dataset.originalHtml = btn.innerHTML;
      btn.disabled = true;
      btn.innerHTML = '<span class="spinner" aria-hidden="true"></span> ' + (label || "Please wait\u2026");
    } else {
      btn.disabled = false;
      if (btn.dataset.originalHtml) btn.innerHTML = btn.dataset.originalHtml;
    }
  }

  function showCtaError(id, message) {
    var el = $("#" + id);
    if (!el) return;
    if (message) { el.textContent = message; el.classList.add("show"); }
    else { el.textContent = ""; el.classList.remove("show"); }
  }

  // Best-effort — a CRM/DB hiccup on our side should never block the visitor.
  function submitLead(payload) {
    return getTurnstileToken().then(function (token) {
      return fetch(LEAD_CAPTURE_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(Object.assign({}, payload, { turnstile_token: token }))
      });
    });
  }

  function showQuoteTransition() {
    formContainer.classList.add("hide");
    quoteTransition.classList.add("show");
    $("#transitionName").textContent = (leadData && leadData.first_name) ? ", " + leadData.first_name : "";
    $("#transitionAddress").textContent = (leadData && leadData.address) ? " for " + leadData.address : "";
    quoteTransition.scrollIntoView({ block: "center" });
    var cta = $("#mobileCta");
    if (cta) { cta.classList.remove("show"); cta.dataset.done = "true"; }
  }


  /* ---------- device fingerprint (FingerprintJS, with a light fallback) ---------- */
  function fallbackFingerprint() {
    try {
      var raw = [
        navigator.userAgent, navigator.language,
        screen.width, screen.height, screen.colorDepth,
        new Date().getTimezoneOffset()
      ].join("|");
      var hash = 0;
      for (var i = 0; i < raw.length; i++) { hash = ((hash << 5) - hash + raw.charCodeAt(i)) | 0; }
      return "fallback-" + Math.abs(hash).toString(36);
    } catch (e) {
      return "fallback-unknown";
    }
  }

  function getDeviceFingerprint() {
    return new Promise(function (resolve) {
      var tries = 0;
      (function attempt() {
        if (window.FingerprintJS) {
          window.FingerprintJS.load()
            .then(function (fp) { return fp.get(); })
            .then(function (result) { resolve(result.visitorId); })
            .catch(function () { resolve(fallbackFingerprint()); });
        } else if (tries++ < 20) {
          setTimeout(attempt, 100);
        } else {
          resolve(fallbackFingerprint());
        }
      })();
    });
  }


  /* ---------- Cloudflare Turnstile (invisible bot check) ---------- */
  // Rendered once in explicit+execute mode: the widget stays inert until we
  // call turnstile.execute(), which mints one fresh, single-use token per
  // call — exactly what we need since each protected request (address
  // lookup, OTP send, lead capture) must present its own token server-side.
  var turnstileWidgetId = null;
  var turnstilePending = null;

  function ensureTurnstileWidget() {
    if (turnstileWidgetId !== null || !window.turnstile || !$("#cf-turnstile")) return;
    turnstileWidgetId = window.turnstile.render("#cf-turnstile", {
      sitekey: TURNSTILE_SITE_KEY,
      size: "invisible",
      execution: "execute",
      callback: function (token) {
        if (turnstilePending) { turnstilePending.resolve(token); turnstilePending = null; }
      },
      "error-callback": function () {
        if (turnstilePending) { turnstilePending.resolve(null); turnstilePending = null; }
      },
      "timeout-callback": function () {
        if (turnstilePending) { turnstilePending.resolve(null); turnstilePending = null; }
      }
    });
  }

  // Resolves to a token string, or null if Turnstile never loaded/responded
  // (e.g. blocked by an extension, slow network, or a stalled challenge).
  // Callers send null through as-is — the worker treats a missing token as
  // a hard block, by design. A hard 10s safety timeout guarantees this
  // promise always settles, so a submit button can never hang forever
  // waiting on a Cloudflare callback that fails to fire.
  function getTurnstileToken() {
    return new Promise(function (resolve) {
      var settled = false;
      var safety = setTimeout(function () {
        if (settled) return;
        settled = true;
        turnstilePending = null;
        resolve(null);
      }, 10000);

      function settle(token) {
        if (settled) return;
        settled = true;
        clearTimeout(safety);
        resolve(token);
      }

      var tries = 0;
      (function wait() {
        if (settled) return;
        if (window.turnstile) {
          ensureTurnstileWidget();
          if (turnstileWidgetId === null) { settle(null); return; }
          turnstilePending = { resolve: settle };
          try {
            window.turnstile.execute(turnstileWidgetId);
          } catch (e) {
            turnstilePending = null;
            settle(null);
          }
        } else if (tries++ < 40) {
          setTimeout(wait, 100);
        } else {
          settle(null);
        }
      })();
    });
  }


  /* ---------- GET ESTIMATE: validate -> address-lookup -> otp-send -> OTP modal ---------- */
  form.addEventListener("submit", function (event) {
    event.preventDefault();

    var data = validateLeftForm();
    if (!data) return;

    showCtaError("ctaEstimateError", "");
    var btn = $("#ctaEstimate");
    setBtnLoading(btn, true, "Checking address\u2026");

    var fullAddress = data.address + ", " + data.zip;

    Promise.all([getDeviceFingerprint(), getTurnstileToken()]).then(function (results) {
      var fingerprint = results[0];
      var turnstileToken = results[1];
      return fetch(ADDRESS_LOOKUP_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ address: fullAddress, device_fingerprint: fingerprint, turnstile_token: turnstileToken })
      });
    }).then(function (res) {
      return res.json().catch(function () { return {}; }).then(function (body) {
        return { ok: res.ok, status: res.status, body: body };
      });
    }).then(function (result) {
      if (!result.ok || result.body.in_service_area === false) {
        var outOfArea = result.status === 422 || result.body.in_service_area === false;
        var err = new Error(outOfArea ? "OUT_OF_AREA" : (result.body.error || "ADDRESS_LOOKUP_FAILED"));
        throw err;
      }

      var lookup = result.body;
      pendingRequest = { request_id: lookup.request_id, territory: lookup.territory, zip: lookup.zip || data.zip };
      leadData = Object.assign({}, data, {
        territory: lookup.territory || territoryFor(data.zip) || FALLBACK_TERRITORY,
        source: "GutterMaxx website",
        lead_source: LEAD_SOURCE,
        submitted_at: new Date().toISOString()
      });

      return getTurnstileToken().then(function (turnstileToken) {
        return fetch(OTP_SEND_URL, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ request_id: lookup.request_id, phone_e164: toE164(data.phone), turnstile_token: turnstileToken })
        });
      });
    }).then(function (res) {
      return res.json().catch(function () { return {}; }).then(function (body) {
        return { ok: res.ok, body: body };
      });
    }).then(function (result) {
      if (!result.ok || !result.body.sent) {
        throw new Error((result.body && result.body.error) || "OTP_SEND_FAILED");
      }
      setBtnLoading(btn, false);
      openOtpModal();
    }).catch(function (err) {
      setBtnLoading(btn, false);
      console.error(err);
      if (err && err.message === "OUT_OF_AREA") {
        showCtaError("ctaEstimateError", "That address is outside our current service area right now \u2014 we\u2019ll still reach out to see how we can help.");
      } else {
        showCtaError("ctaEstimateError", "That didn\u2019t go through. Check your connection and try again.");
      }
    });
  });


  /* ---------- 15-min Zoom / In-Home Demo: validate -> lead-capture -> booking modal ---------- */
  function bindBookingCta(buttonId, errorId, step) {
    var btn = $("#" + buttonId);
    if (!btn) return;
    btn.addEventListener("click", function () {
      var data = validateLeftForm();
      if (!data) return;

      showCtaError(errorId, "");
      var territory = territoryFor(data.zip) || FALLBACK_TERRITORY;
      leadData = Object.assign({}, data, {
        territory: territory,
        source: "GutterMaxx website",
        lead_source: LEAD_SOURCE,
        submitted_at: new Date().toISOString()
      });

      setBtnLoading(btn, true, "One moment\u2026");
      submitLead(Object.assign({}, leadData, {
        next_step: step,
        next_step_chosen_at: new Date().toISOString()
      })).catch(function (err) {
        console.error(err); // best-effort — still let them book below
      }).then(function () {
        setBtnLoading(btn, false);
        openBooking(step);
      });
    });
  }


  /* =====================================================
     TERRITORY ROUTING
     ZIP ranges decide which office's calendar is shown.
  ===================================================== */
  var TERRITORIES = {
    dfw:     { label: "Dallas-Fort Worth",   ranges: [[75000,75849],[75900,75949],[76000,76499],[76600,76799],[76900,76999]] },
    houston: { label: "Houston",             ranges: [[75850,75899],[75950,75999],[77000,77999],[78930,78939]] },
    sanaus:  { label: "San Antonio/Austin",  ranges: [[76500,76599],[76800,76899],[78000,78929],[78940,78999]] }
  };

  // Used when a ZIP falls outside every territory (out of area or mistyped).
  var FALLBACK_TERRITORY = "dfw";

  var BOOKINGS = {
    dfw: {
      "in-home-demo":   "https://dfw.tx.guttermaxx.com/widget/booking/jQu4BSi04kW3O5BWNLj9",
      "virtual-15-min": "https://dfw.tx.guttermaxx.com/widget/booking/S2hBljugiSYRwa6fE6Ns"
    },
    houston: {
      "in-home-demo":   "https://houston.tx.guttermaxx.com/widget/booking/mb9wxJVQrNrg7uPbA7qo",
      "virtual-15-min": "https://houston.tx.guttermaxx.com/widget/booking/XP5kYxruHd2Rdyg0c70O"
    },
    sanaus: {
      "in-home-demo":   "https://sanantonio.austin.tx.guttermaxx.com/widget/booking/k68wUyycpcYoyu9oyG0L",
      "virtual-15-min": "https://sanantonio.austin.tx.guttermaxx.com/widget/booking/WwMyfr31G7Cv3jTOFpqY"
    }
  };

  function territoryFor(zipValue) {
    var n = parseInt(String(zipValue || "").replace(/\D/g, ""), 10);
    if (isNaN(n)) return null;
    for (var key in TERRITORIES) {
      var ranges = TERRITORIES[key].ranges;
      for (var i = 0; i < ranges.length; i++) {
        if (n >= ranges[i][0] && n <= ranges[i][1]) return key;
      }
    }
    return null;
  }


  /* =====================================================
     BOOKING MODAL
  ===================================================== */
  var STEP_TITLES = {
    "in-home-demo":   "Book your free in-home demo",
    "virtual-15-min": "Book your 15-minute virtual meeting"
  };

  var bookingModal = $("#bookingModal");
  var bookingFrame = $("#bookingFrame");
  var bookingTitle = $("#bookingTitle");
  var bookingTerritory = $("#bookingTerritory");
  var bookingNewTab = $("#bookingNewTab");
  var lastFocus = null;

  function withPrefill(base) {
    if (!leadData) return base;
    var params = {
      first_name: leadData.first_name,
      last_name:  leadData.last_name,
      email:      leadData.email,
      phone:      leadData.phone
    };
    var qs = Object.keys(params)
      .filter(function (k) { return params[k]; })
      .map(function (k) { return k + "=" + encodeURIComponent(params[k]); })
      .join("&");
    if (!qs) return base;
    return base + (base.indexOf("?") === -1 ? "?" : "&") + qs;
  }

  function openBooking(step) {
    var key = (leadData && leadData.territory) || FALLBACK_TERRITORY;
    if (!BOOKINGS[key]) key = FALLBACK_TERRITORY;
    var url = withPrefill(BOOKINGS[key][step]);

    lastFocus = document.activeElement;
    bookingTitle.textContent = STEP_TITLES[step] || "Book your appointment";
    bookingTerritory.textContent = TERRITORIES[key].label + " team";
    bookingNewTab.href = url;
    bookingFrame.src = url;
    bookingModal.classList.add("open");
    document.body.style.overflow = "hidden";
    $("#bookingClose").focus();
  }

  function closeBooking() {
    if (!bookingModal.classList.contains("open")) return;
    bookingModal.classList.remove("open");
    bookingFrame.src = "";                 // stops the widget when closed
    document.body.style.overflow = "";
    if (lastFocus) lastFocus.focus();
  }

  $("#bookingClose").addEventListener("click", closeBooking);
  $$("[data-close]", bookingModal).forEach(function (el) {
    el.addEventListener("click", closeBooking);
  });
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") closeBooking();
  });


  /* =====================================================
     OTP VERIFICATION MODAL
     Opened right after address-lookup + otp-send succeed for the
     GET ESTIMATE flow. On a verified code: capture the lead, then
     move into the (temporary) quote transition state.
  ===================================================== */
  var otpModal = $("#otpModal");
  var otpCode = $("#otpCode");
  var otpVerifyBtn = $("#otpVerifyBtn");
  var otpResend = $("#otpResend");
  var otpPhoneDisplay = $("#otpPhoneDisplay");
  var otpLastFocus = null;

  function showOtpError(msg) {
    var el = $("#otpError");
    if (msg) { el.textContent = msg; el.classList.add("show"); }
    else { el.textContent = ""; el.classList.remove("show"); }
  }

  function openOtpModal() {
    otpCode.value = "";
    showOtpError("");
    otpPhoneDisplay.textContent = (leadData && leadData.phone) || "your phone";
    otpLastFocus = document.activeElement;
    otpModal.classList.add("open");
    document.body.style.overflow = "hidden";
    setTimeout(function () { otpCode.focus(); }, 50);
  }

  function closeOtpModal() {
    if (!otpModal.classList.contains("open")) return;
    otpModal.classList.remove("open");
    document.body.style.overflow = "";
    if (otpLastFocus) otpLastFocus.focus();
  }

  otpCode.addEventListener("input", function () {
    otpCode.value = otpCode.value.replace(/\D/g, "").slice(0, 6);
  });
  otpCode.addEventListener("keydown", function (e) {
    if (e.key === "Enter") { e.preventDefault(); otpVerifyBtn.click(); }
  });

  $("#otpClose").addEventListener("click", closeOtpModal);
  $$("[data-otp-close]", otpModal).forEach(function (el) {
    el.addEventListener("click", closeOtpModal);
  });
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") closeOtpModal();
  });

  otpVerifyBtn.addEventListener("click", function () {
    var code = otpCode.value.trim();
    if (!/^\d{6}$/.test(code)) {
      showOtpError("Enter the 6-digit code we texted you.");
      otpCode.focus();
      return;
    }
    if (!pendingRequest) {
      showOtpError("Something went wrong. Please close this and try again.");
      return;
    }

    showOtpError("");
    setBtnLoading(otpVerifyBtn, true, "Verifying\u2026");

    fetch(OTP_VERIFY_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        request_id: pendingRequest.request_id,
        phone_e164: toE164(leadData.phone),
        code: code
      })
    }).then(function (res) {
      return res.json().catch(function () { return {}; }).then(function (body) {
        return { ok: res.ok, body: body };
      });
    }).then(function (result) {
      setBtnLoading(otpVerifyBtn, false);
      if (!result.ok || !result.body.verified) {
        showOtpError("That code didn't match. Check it and try again, or resend.");
        otpCode.focus();
        return;
      }
      closeOtpModal();
      submitLead(Object.assign({}, leadData, {
        next_step: "quote-5-min",
        next_step_chosen_at: new Date().toISOString()
      })).catch(function (err) { console.error(err); });
      showQuoteTransition();
    }).catch(function (err) {
      console.error(err);
      setBtnLoading(otpVerifyBtn, false);
      showOtpError("That didn't go through. Check your connection and try again.");
    });
  });

  otpResend.addEventListener("click", function () {
    if (!pendingRequest || !leadData) return;
    otpResend.disabled = true;
    var original = otpResend.textContent;
    otpResend.textContent = "Sending\u2026";

    getTurnstileToken().then(function (turnstileToken) {
      return fetch(OTP_SEND_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ request_id: pendingRequest.request_id, phone_e164: toE164(leadData.phone), turnstile_token: turnstileToken })
      });
    }).then(function (res) {
      return res.json().catch(function () { return {}; }).then(function (body) {
        return { ok: res.ok, body: body };
      });
    }).then(function (result) {
      otpResend.disabled = false;
      otpResend.textContent = original;
      showOtpError(result.ok && result.body.sent ? "" : "Couldn't resend. Try again in a moment.");
    }).catch(function () {
      otpResend.disabled = false;
      otpResend.textContent = original;
      showOtpError("Couldn't resend. Try again in a moment.");
    });
  });


  /* =====================================================
     WIRE THE 15-MIN ZOOM / IN-HOME DEMO CTAs
  ===================================================== */
  bindBookingCta("ctaZoom", "ctaZoomError", "virtual-15-min");
  bindBookingCta("ctaDemo", "ctaDemoError", "in-home-demo");


  /* =====================================================
     MISC
  ===================================================== */
  $("#year").textContent = new Date().getFullYear();

})();
