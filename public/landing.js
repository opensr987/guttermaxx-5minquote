
(function () {
  "use strict";

  /* =====================================================
     CONFIG — the 5MinQuote worker's lead-capture endpoint.
     Every submit on this shared landing page (any lead source —
     Website, NextDoor, Google, Facebook/IG, TikTok...) posts here.
  ===================================================== */
  var HIGHLEVEL_WEBHOOK = "https://guttermaxx-5minquote-worker.vercel.app/api/lead-capture";

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
  $$(".brand-logo, .watermark, .form-logo, .success-logo").forEach(function (img) {
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
  ===================================================== */
  var COLORS = [
    ["White", "#ffffff"], ["Eggshell", "#eee7d8"], ["Antique Ivory", "#eee4ca"], ["Almond", "#dfd1a9"],
    ["Linen", "#d6c8ae"], ["Wicker", "#b9a27d"], ["Pearl Gray", "#a5a7a4"], ["Dove Gray", "#9b9e9b"],
    ["Tuxedo Gray", "#808180"], ["Terratone", "#735e49"], ["Cocoa Brown", "#624835"], ["Royal Brown", "#593725"],
    ["Musket Brown", "#503a2d"], ["Dark Bronze", "#3d332e"], ["Forest Green", "#385c42"], ["Traditional Blue", "#293f61"],
    ["Red", "#8e2725"], ["Clay", "#a77a52"], ["Cream", "#f0e0c4"], ["Black", "#151716"]
  ];

  var grid = $("#colorGrid");
  var readoutName = $("#readoutName");
  var readoutSwatch = $("#readoutSwatch");
  var colorPreference = $("#colorPreference");

  COLORS.forEach(function (c, i) {
    var btn = document.createElement("button");
    btn.type = "button";
    btn.className = "color-option reveal";
    btn.style.setProperty("--d", (i % 5) * 50 + "ms");
    btn.setAttribute("aria-pressed", "false");
    btn.innerHTML = '<span class="swatch" style="background:' + c[1] + '"></span><span>' + c[0] + "</span>";
    btn.addEventListener("click", function () {
      $$(".color-option", grid).forEach(function (b) { b.setAttribute("aria-pressed", "false"); });
      btn.setAttribute("aria-pressed", "true");
      readoutName.textContent = c[0];
      readoutSwatch.style.background = c[1];
      colorPreference.value = c[0];
    });
    grid.appendChild(btn);
    if (revealItems.length && "IntersectionObserver" in window && !reduceMotion) {
      revealObserver.observe(btn);
    } else {
      btn.classList.add("show");
    }
  });


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
  ===================================================== */
  var form = $("#assessmentForm");
  var formContainer = $("#formContainer");
  var successMessage = $("#successMessage");
  var submitBtn = $("#submitBtn");
  var phone = $("#phone");
  var zip = $("#zip");
  var leadData = null;

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

  var fields = ["first_name", "last_name", "phone", "email", "address", "city", "zip"].map(function (id) { return $("#" + id); });
  fields.forEach(function (f) {
    f.addEventListener("blur", function () { showError(f, !isValid(f)); });
    f.addEventListener("input", function () { if (f.classList.contains("invalid") && isValid(f)) showError(f, false); });
    f.addEventListener("change", function () { if (isValid(f)) showError(f, false); });
  });

  form.addEventListener("submit", function (event) {
    event.preventDefault();

    if ($("#company").value) return;               // spam trap

    var firstBad = null;
    fields.forEach(function (f) {
      var ok = isValid(f);
      showError(f, !ok);
      if (!ok && !firstBad) firstBad = f;
    });
    if (firstBad) { firstBad.focus(); return; }

    var original = submitBtn.innerHTML;
    submitBtn.disabled = true;
    submitBtn.innerHTML = '<span class="spinner" aria-hidden="true"></span> Sending...';

    var data = Object.fromEntries(new FormData(form).entries());
    data.source = "GutterMaxx website";
    data.lead_source = LEAD_SOURCE;
    data.submitted_at = new Date().toISOString();
    data.territory = territoryFor(data.zip) || FALLBACK_TERRITORY;
    leadData = data;

    var request = HIGHLEVEL_WEBHOOK
      ? fetch(HIGHLEVEL_WEBHOOK, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data)
        })
      : Promise.resolve();

    request.then(function () {
      formContainer.style.display = "none";
      successMessage.style.display = "block";
      successMessage.scrollIntoView({ block: "center" });
      var cta = $("#mobileCta");
      if (cta) { cta.classList.remove("show"); cta.dataset.done = "true"; }
    }).catch(function (err) {
      console.error(err);
      submitBtn.disabled = false;
      submitBtn.innerHTML = original;
      var note = $(".privacy");
      note.textContent = "That didn't go through. Check your connection and try again.";
      note.style.color = "#b4453f";
    });
  });


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
     NEXT STEP AFTER SUBMISSION
  ===================================================== */
  var STEP_REPLIES = {
    "quote-5-min":    "Perfect - we'll call you within 5 minutes during business hours with your quote.",
    "in-home-demo":   "Pick a time that suits you in the booking window.",
    "virtual-15-min": "Pick a time that suits you in the booking window."
  };

  var stepOptions = $$(".step-option");
  var stepsConfirm = $("#stepsConfirm");
  var stepsConfirmText = $("#stepsConfirmText");

  stepOptions.forEach(function (opt) {
    opt.addEventListener("click", function () {
      var step = opt.dataset.step;

      stepOptions.forEach(function (o) {
        o.setAttribute("aria-pressed", String(o === opt));
      });

      stepsConfirmText.textContent = STEP_REPLIES[step] || "Thanks - we'll be in touch shortly.";
      stepsConfirm.classList.add("show");

      if (BOOKINGS.dfw[step]) openBooking(step);

      if (HIGHLEVEL_WEBHOOK) {
        var payload = Object.assign({}, leadData || {}, {
          lead_source: (leadData && leadData.lead_source) || LEAD_SOURCE,
          next_step: step,
          next_step_chosen_at: new Date().toISOString()
        });
        fetch(HIGHLEVEL_WEBHOOK, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload)
        }).catch(function (err) { console.error(err); });
      }
    });
  });


  /* =====================================================
     MISC
  ===================================================== */
  $("#year").textContent = new Date().getFullYear();

})();
