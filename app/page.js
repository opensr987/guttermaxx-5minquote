import Script from "next/script";

const BODY_HTML = `

<a class="skip" href="#main">Skip to content</a>
<div class="progress" id="progress" aria-hidden="true"></div>

<!-- =====================================================
     HEADER
===================================================== -->
<header id="siteHeader">
<div class="container">
<nav aria-label="Primary">

  <a class="logo" href="#home" aria-label="GutterMaxx home">
    <img class="brand-logo" src="/assets/logo.png" alt="GutterMaxx" width="1376" height="208" fetchpriority="high">
  </a>

  <!-- Funnel mode: no jump-nav, no header CTA — the whole page below is the offer.
       #navLinks and #menuBtn are kept empty/hidden (not removed) because landing.js
       binds click/keydown listeners to them unconditionally on load. -->
  <div class="links" id="navLinks"></div>

  <div class="header-trust" aria-label="GutterMaxx at a glance">
    <span class="rating"><b>4.9</b><i aria-hidden="true">&#9733;</i> Rated</span>
    <span>40,000+ Homes Protected</span>
    <span>25+ Years in Texas</span>
    <span>Lifetime No-Clog Warranty</span>
  </div>

  <button class="menu" id="menuBtn" aria-label="Open menu" aria-expanded="false" aria-controls="navLinks" hidden>
    <span></span>
  </button>

</nav>
</div>
</header>


<main id="main">
<div id="home"></div>

<!-- =====================================================
     HERO
===================================================== -->
<section class="hero">
<div class="container hero-grid">

  <div class="reveal">

    <div class="eyebrow"><span class="pulse" aria-hidden="true"></span>40,000+ Homes Protected &bull; 25+ Years in Texas</div>

    <h1>Your Home.<br><span>Protected For Life.</span></h1>

    <p class="lead">
      A custom, self-cleaning water management system engineered to keep debris out,
      move rainwater in, and protect the home where it matters most.
    </p>

    <div class="actions">
      <a class="btn" href="#assessment">Set up my assessment <span class="arw" aria-hidden="true">&rarr;</span></a>
      <a class="btn outline" href="#system">See how it works</a>
    </div>

    <div class="hero-note">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" width="18" height="18">
        <path d="M12 3 4 6.5v5c0 5 3.4 8.6 8 9.5 4.6-.9 8-4.5 8-9.5v-5z"/><path d="m9 12 2 2 4-4"/>
      </svg>
      Backed by the GutterMaxx Lifetime No-Clog Warranty
    </div>

  </div>

  <div class="hero-img reveal" style="--d:120ms">
    <div class="frame">
      <span class="img-tag">Lifetime No-Clog Warranty</span>

      <!-- Brand panel: shown behind the hero photo, and on its own if no photo is set -->
      <svg class="hero-art" viewBox="0 0 560 560" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
        <defs>
          <linearGradient id="artBg" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stop-color="#0e3324"/><stop offset="1" stop-color="#1d6242"/>
          </linearGradient>
          <linearGradient id="artState" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stop-color="#2b7d55"/><stop offset="1" stop-color="#17573a"/>
          </linearGradient>
          <radialGradient id="artGlow" cx=".5" cy=".5" r=".5">
            <stop offset="0" stop-color="#8bc49d" stop-opacity=".3"/>
            <stop offset="1" stop-color="#8bc49d" stop-opacity="0"/>
          </radialGradient>
          <pattern id="artGrid" width="34" height="34" patternUnits="userSpaceOnUse">
            <circle cx="2" cy="2" r="1.6" fill="#8bc49d" opacity=".18"/>
          </pattern>
        </defs>

        <rect width="560" height="560" fill="url(#artBg)"/>
        <rect width="560" height="560" fill="url(#artGrid)"/>
        <circle cx="290" cy="300" r="250" fill="url(#artGlow)"/>

        <!-- Texas -->
        <g transform="translate(58,14) scale(0.92)">
        <path d="M139 86 L234 86 L234 152 L260 152 L277 164 L303 160 L320 176 L346 172 L363 187 L389 184 L406 172 L432 172 L432 258 L423 289 L410 320 L402 343 L372 359 L342 378 L307 402 L268 429 L243 460 L225 445 L212 418 L195 390 L178 371 L157 343 L131 320 L105 304 L79 293 L62 285 L139 285 Z" fill="url(#artState)" stroke="#9fd8b6" stroke-width="3.5" stroke-linejoin="round" opacity=".96"/>
        <path d="M139 86 L234 86 L234 152 L260 152 L277 164 L303 160 L320 176 L346 172 L363 187 L389 184 L406 172 L432 172 L432 258 L423 289 L410 320 L402 343 L372 359 L342 378 L307 402 L268 429 L243 460 L225 445 L212 418 L195 390 L178 371 L157 343 L131 320 L105 304 L79 293 L62 285 L139 285 Z" fill="none" stroke="#cdeddb" stroke-width="1.2" opacity=".5"/>

        <g>
          <circle cx="337" cy="199" r="7" fill="none" stroke="#8bc49d" stroke-width="2">
            <animate attributeName="r" values="7;26" dur="2.8s" begin="0s" repeatCount="indefinite"/>
            <animate attributeName="opacity" values=".7;0" dur="2.8s" begin="0s" repeatCount="indefinite"/>
          </circle>
          <circle cx="337" cy="199" r="7" fill="#a9e7c3"/>
          <text x="355" y="204" text-anchor="start" fill="#dff0e5"
                font-family="Inter,Arial,sans-serif" font-size="15" font-weight="800">Dallas&ndash;Fort Worth</text>
        </g>

        <g>
          <circle cx="318" cy="205" r="7" fill="none" stroke="#8bc49d" stroke-width="2">
            <animate attributeName="r" values="7;26" dur="2.8s" begin="0s" repeatCount="indefinite"/>
            <animate attributeName="opacity" values=".7;0" dur="2.8s" begin="0s" repeatCount="indefinite"/>
          </circle>
          <circle cx="318" cy="205" r="7" fill="#a9e7c3"/>
          <text x="318" y="210" text-anchor="start" fill="#dff0e5"
                font-family="Inter,Arial,sans-serif" font-size="15" font-weight="800"></text>
        </g>

        <g>
          <circle cx="372" cy="332" r="7" fill="none" stroke="#8bc49d" stroke-width="2">
            <animate attributeName="r" values="7;26" dur="2.8s" begin=".7s" repeatCount="indefinite"/>
            <animate attributeName="opacity" values=".7;0" dur="2.8s" begin=".7s" repeatCount="indefinite"/>
          </circle>
          <circle cx="372" cy="332" r="7" fill="#a9e7c3"/>
          <text x="388" y="337" text-anchor="start" fill="#dff0e5"
                font-family="Inter,Arial,sans-serif" font-size="15" font-weight="800">Houston</text>
        </g>

        <g>
          <circle cx="311" cy="334" r="7" fill="none" stroke="#8bc49d" stroke-width="2">
            <animate attributeName="r" values="7;26" dur="2.8s" begin="1.4s" repeatCount="indefinite"/>
            <animate attributeName="opacity" values=".7;0" dur="2.8s" begin="1.4s" repeatCount="indefinite"/>
          </circle>
          <circle cx="311" cy="334" r="7" fill="#a9e7c3"/>
          <text x="295" y="339" text-anchor="end" fill="#dff0e5"
                font-family="Inter,Arial,sans-serif" font-size="15" font-weight="800">Austin</text>
        </g>

        <g>
          <circle cx="288" cy="356" r="7" fill="none" stroke="#8bc49d" stroke-width="2">
            <animate attributeName="r" values="7;26" dur="2.8s" begin="2.1s" repeatCount="indefinite"/>
            <animate attributeName="opacity" values=".7;0" dur="2.8s" begin="2.1s" repeatCount="indefinite"/>
          </circle>
          <circle cx="288" cy="356" r="7" fill="#a9e7c3"/>
          <text x="272" y="361" text-anchor="end" fill="#dff0e5"
                font-family="Inter,Arial,sans-serif" font-size="15" font-weight="800">San Antonio</text>
        </g>
        </g>
      </svg>

      <span class="art-caption">40,000+ homes protected across Texas &mdash; and counting.</span>

      <img src="assets/image-7-1.jpg" alt="A Texas home with a GutterMaxx gutter protection system installed along the roofline"
           width="960" height="720" loading="lazy">
    </div>

    <div class="float">
      <span class="badge" aria-hidden="true">
        <svg viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" width="22" height="22">
          <path d="M12 21a6 6 0 0 0 6-6c0-4-6-11-6-11S6 11 6 15a6 6 0 0 0 6 6z"/><path d="m9.5 14.5 1.8 1.8 3.4-3.6"/>
        </svg>
      </span>
      <span>
        <b>No more gutter cleaning.</b>
        <small>Custom-built. Professionally installed.</small>
      </span>
    </div>
  </div>

</div>
</section>


<!-- =====================================================
     TRUST BAR
===================================================== -->
<div class="trust">
<div class="container trust-grid">
  <div><b data-count="40000" data-suffix="+">40,000+</b><span>Homes Protected</span></div>
  <div><b data-count="25" data-prefix="" data-suffix="+ Years">25+ Years</b><span>Serving Texas</span></div>
  <div><b>Lifetime</b><span>No-Clog Warranty</span></div>
  <div><b>Custom</b><span>Built For Your Home</span></div>
</div>
</div>


<!-- =====================================================
     WHY HOMEOWNERS CONTACT US
===================================================== -->
<section id="why" class="dark">
<div class="container">

  <div class="heading reveal">
    <div class="kicker">Why Homeowners Contact Us</div>
    <h2>Clogged gutters cost more than time.</h2>
    <p>
      Homeowners reach out because they're tired of cleaning, dealing with storm
      overflow, or worrying about water damage.
    </p>
  </div>

  <div class="cards">

    <article class="card reveal">
      <div class="icon" aria-hidden="true">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" width="26" height="26">
          <path d="M7 3v18M17 3v18M7 7h10M7 11h10M7 15h10M7 19h10"/>
        </svg>
      </div>
      <h3>Tired of cleaning</h3>
      <p>Recurring ladder climbs, leaves, pine needles and debris turn gutters into a never-ending chore.</p>
      <div class="card-rule" aria-hidden="true"></div>
    </article>

    <article class="card reveal" style="--d:100ms">
      <div class="icon" aria-hidden="true">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round" width="26" height="26">
          <path d="M17.5 11a4.5 4.5 0 0 0-8.7-1.6A3.6 3.6 0 0 0 5 13a3.6 3.6 0 0 0 3.6 3.5h8.9A3.5 3.5 0 0 0 17.5 11z"/>
          <path d="M8 20l-.8 1.6M12 19.5l-.8 1.6M16 20l-.8 1.6"/>
        </svg>
      </div>
      <h3>Overflow in heavy rain</h3>
      <p>Water can spill over the front during storms and reach the fascia, siding and landscaping.</p>
      <div class="card-rule" aria-hidden="true"></div>
    </article>

    <article class="card reveal" style="--d:200ms">
      <div class="icon" aria-hidden="true">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round" width="26" height="26">
          <path d="M3 10.5 12 3l9 7.5"/><path d="M5.5 9.5V20h13V9.5"/><path d="M12 11.5c1.8 2.2 2.8 3.6 2.8 4.8a2.8 2.8 0 1 1-5.6 0c0-1.2 1-2.6 2.8-4.8z"/>
        </svg>
      </div>
      <h3>Worried about water damage</h3>
      <p>Help protect the foundation, siding, fascia, soffits, doors and landscaping from uncontrolled runoff.</p>
      <div class="card-rule" aria-hidden="true"></div>
    </article>

  </div>
</div>
</section>


<!-- =====================================================
     GUTTERMAXX SYSTEM
===================================================== -->
<section id="system" class="cream">
<div class="container">
<div class="system-grid">

  <div class="system-images reveal">
    <img class="system-main" src="assets/image-6-1.gif" alt="Close-up of the GutterMaxx hooded gutter protection system on a roofline"
         loading="lazy">
    <img class="system-small" src="assets/image-3-2.jpg" alt="Leaves and debris collected on top of a gutter"
         loading="lazy">
  </div>

  <div class="reveal" style="--d:100ms">

    <div class="heading">
      <div class="kicker">The GutterMaxx Approach</div>
      <h2>Prevent debris from entering in the first place.</h2>
      <p>
        Instead of simply moving maintenance around, GutterMaxx is designed to keep debris
        outside while allowing water to enter the gutter system.
      </p>
    </div>

    <div class="system-list">

      <div class="system-item">
        <span class="check" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" width="16" height="16"><path d="m5 12 4.5 4.5L19 7"/></svg></span>
        <div>
          <h3>Hooded water intake</h3>
          <p>Water enters the system while leaves and debris are directed away.</p>
        </div>
      </div>

      <div class="system-item">
        <span class="check" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" width="16" height="16"><path d="m5 12 4.5 4.5L19 7"/></svg></span>
        <div>
          <h3>Internal hangers</h3>
          <p>Support is positioned inside the system for a clean finished appearance.</p>
        </div>
      </div>

      <div class="system-item">
        <span class="check" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" width="16" height="16"><path d="m5 12 4.5 4.5L19 7"/></svg></span>
        <div>
          <h3>Custom-built installation</h3>
          <p>Your gutter protection system is designed around the specific roofline of your home.</p>
        </div>
      </div>

      <div class="system-item">
        <span class="check" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" width="16" height="16"><path d="m5 12 4.5 4.5L19 7"/></svg></span>
        <div>
          <h3>Lifetime No-Clog Warranty</h3>
          <p>Every GutterMaxx system is backed by our Lifetime No-Clog Warranty.</p>
        </div>
      </div>

    </div>
  </div>

</div>
</div>
</section>


<!-- =====================================================
     HOW IT WORKS  +  CROSS-SECTION DEMO
===================================================== -->
<section id="howItWorks">
<div class="container">

  <div class="heading reveal">
    <div class="kicker">How It Works</div>
    <h2>Designed around water flow.</h2>
    <p>
      GutterMaxx uses a closed-top design: rainwater follows the curve of the hood into
      the gutter, while leaves and needles keep going over the edge.
    </p>
  </div>

  <!-- SIGNATURE: interactive cross-section -->
  <div class="demo reveal" id="demo" data-mode="gm">

    <div class="demo-head">
      <div>
        <h3>Cross-section: what happens in a downpour</h3>
        <p>Compare an open gutter with the GutterMaxx closed-top system.</p>
      </div>
      <div class="demo-toggle" role="group" aria-label="Choose gutter type">
        <button type="button" class="demo-btn" data-mode="gm" aria-pressed="true">GutterMaxx</button>
        <button type="button" class="demo-btn" data-mode="open" aria-pressed="false">Open gutter</button>
      </div>
    </div>

    <div class="demo-stage">
      <svg viewBox="0 0 700 400" role="img" aria-label="Cross-section diagram comparing an open gutter, which collects debris and overflows, with the GutterMaxx closed-top system, which sheds debris and channels water inside.">
        <defs>
          <linearGradient id="metal" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stop-color="#f4f6f4"/><stop offset=".55" stop-color="#d3dcd6"/><stop offset="1" stop-color="#9aa8a0"/>
          </linearGradient>
          <linearGradient id="roofg" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stop-color="#36483e"/><stop offset="1" stop-color="#1d2a23"/>
          </linearGradient>
          <path id="wpath" d="M46 72 L296 186 L436 182 Q490 180 492 210 Q494 236 458 232 L428 228 Q416 230 416 248 L416 296"/>
          <path id="leafpath" d="M64 84 L300 192 L438 188 Q494 186 500 222 Q508 282 534 372"/>
          <path id="leafpath2" d="M34 96 L292 202 L430 198 Q486 198 494 232 Q500 286 516 376"/>
          <path id="clogpath" d="M46 72 L296 186 L372 222 L384 250"/>
        </defs>

        <!-- rain -->
        <g class="rain" stroke="var(--water)" stroke-width="2.4" stroke-linecap="round" opacity=".45">
          <path d="M110 16v18M170 0v18M240 22v18M310 4v18M380 18v18M450 0v18M520 20v18M590 6v18M650 22v18"/>
        </g>

        <!-- wall + soffit + fascia -->
        <rect x="258" y="222" width="44" height="162" fill="#efece2"/>
        <g stroke="#dcd7c8" stroke-width="1.6">
          <path d="M258 250h44M258 278h44M258 306h44M258 334h44M258 362h44"/>
        </g>
        <rect x="258" y="330" width="60" height="14" fill="#f6f3eb"/>
        <rect x="300" y="194" width="18" height="150" fill="#e8e4d7" stroke="#d5cfbe" stroke-width="1.4"/>

        <!-- roof deck -->
        <polygon points="20,56 302,194 302,222 20,84" fill="url(#roofg)"/>
        <polygon points="20,56 302,194 302,201 20,63" fill="#61806f" opacity=".55"/>
        <g stroke="#4a5f52" stroke-width="1.7" opacity=".5">
          <path d="M78 84 66 108M138 113 126 137M198 143 186 167M258 172 246 196"/>
        </g>

        <!-- gutter trough -->
        <path d="M316 198 L330 198 L330 330 L444 330 L444 252 L458 252 L458 338 Q458 346 450 346 L324 346 Q316 346 316 338 Z"
              fill="url(#metal)" stroke="#8d9a92" stroke-width="1.2" stroke-linejoin="round"/>

        <!-- internal hanger (GutterMaxx only) -->
        <path class="gm-only" d="M336 220 L442 252" stroke="#8d9a92" stroke-width="5" stroke-linecap="round" fill="none"/>

        <!-- ============ GUTTERMAXX MODE ============ -->
        <g class="gm-only">
          <!-- hood -->
          <path d="M298 180 L436 176 Q492 174 494 210 Q496 240 458 236 L424 230"
                fill="none" stroke="url(#metal)" stroke-width="13" stroke-linecap="round" stroke-linejoin="round"/>
          <path d="M298 180 L436 176 Q492 174 494 210 Q496 240 458 236 L424 230"
                fill="none" stroke="#7f8d85" stroke-width="1" stroke-linecap="round" opacity=".55"/>

          <!-- water collected inside -->
          <path d="M336 298 L438 298 L438 324 Q438 330 432 330 L342 330 Q336 330 336 324 Z" fill="var(--water)" opacity=".5"/>
          <path class="splash" d="M340 298 q16 -7 32 0 q16 7 32 0 q16 -7 32 0" fill="none" stroke="var(--water)" stroke-width="2.6" stroke-linecap="round"/>

          <!-- flow -->
          <use href="#wpath" fill="none" stroke="var(--water)" stroke-width="8" opacity=".2" stroke-linecap="round"/>
          <use href="#wpath" class="flow" fill="none" stroke="var(--water)" stroke-width="4.2" stroke-linecap="round"/>
          <g fill="var(--water)">
            <circle r="5"><animateMotion dur="3s" repeatCount="indefinite"><mpath href="#wpath"/></animateMotion></circle>
            <circle r="4" opacity=".8"><animateMotion dur="3s" begin="1s" repeatCount="indefinite"><mpath href="#wpath"/></animateMotion></circle>
            <circle r="3.2" opacity=".6"><animateMotion dur="3s" begin="2s" repeatCount="indefinite"><mpath href="#wpath"/></animateMotion></circle>
          </g>

          <!-- leaves shedding over the nose -->
          <g>
            <g>
              <path d="M-13 0 q13 -11 26 0 q-13 11 -26 0z" fill="#7a6a3c"/>
              <animateMotion dur="4.6s" repeatCount="indefinite" rotate="auto"><mpath href="#leafpath"/></animateMotion>
            </g>
            <g>
              <path d="M-11 0 q11 -9 22 0 q-11 9 -22 0z" fill="#8a7a48"/>
              <animateMotion dur="5.4s" begin="1.8s" repeatCount="indefinite" rotate="auto"><mpath href="#leafpath2"/></animateMotion>
            </g>
          </g>

          <!-- callouts -->
          <g font-family="Inter,Arial,sans-serif" font-size="13" font-weight="800">
            <g fill="var(--green)">
              <circle cx="562" cy="136" r="4.5"/>
              <path d="M559 140 Q526 162 508 196" stroke="var(--green)" stroke-width="1.5" fill="none" stroke-dasharray="4 4"/>
              <text x="676" y="120" text-anchor="end">Water follows the curve in</text>
            </g>
            <g fill="#7a6a3c">
              <circle cx="600" cy="322" r="4.5"/>
              <path d="M597 325 L552 348" stroke="#7a6a3c" stroke-width="1.5" fill="none" stroke-dasharray="4 4"/>
              <text x="676" y="306" text-anchor="end">Debris keeps going</text>
            </g>
            <g fill="var(--green-dark)" font-size="13" font-weight="700">
              <text x="36" y="292">Closed top. Internal hangers.</text>
              <text x="36" y="314">Custom-built for your roofline.</text>
            </g>
          </g>
        </g>

        <!-- ============ OPEN GUTTER MODE ============ -->
        <g class="open-only">
          <!-- debris packed inside -->
          <g opacity=".95">
            <ellipse cx="360" cy="290" rx="28" ry="10" fill="#7a6a3c"/>
            <ellipse cx="404" cy="282" rx="30" ry="10" fill="#8a7a48"/>
            <ellipse cx="384" cy="270" rx="26" ry="9" fill="#6d5f36"/>
            <ellipse cx="424" cy="294" rx="22" ry="8" fill="#7a6a3c"/>
            <g stroke="#6d5f36" stroke-width="3" stroke-linecap="round" opacity=".8">
              <path d="M344 262 372 250M396 258 428 246M410 268 436 262"/>
            </g>
          </g>
          <path d="M336 302 L438 302 L438 324 Q438 330 432 330 L342 330 Q336 330 336 324 Z" fill="#6d7a5a" opacity=".5"/>

          <!-- flow + overflow -->
          <use href="#clogpath" fill="none" stroke="var(--water)" stroke-width="8" opacity=".2" stroke-linecap="round"/>
          <use href="#clogpath" class="flow" fill="none" stroke="var(--water)" stroke-width="4.2" stroke-linecap="round"/>
          <path d="M384 246 Q420 250 448 250" fill="none" stroke="var(--water)" stroke-width="5" stroke-linecap="round" opacity=".55"/>
          <path class="pour" d="M452 250 Q470 280 468 314 Q466 352 478 382" fill="none" stroke="var(--water)" stroke-width="5.4" opacity=".85" stroke-linecap="round"/>

          <g stroke="var(--water)" stroke-width="2.6" stroke-linecap="round" opacity=".7" class="splash">
            <path d="M456 376 l-11 8M478 378 l0 10M500 376 l11 8"/>
          </g>

          <!-- callouts -->
          <g font-family="Inter,Arial,sans-serif" font-size="13" font-weight="800" fill="#8a5a2b">
            <circle cx="546" cy="182" r="4.5"/>
            <path d="M543 186 Q500 210 456 244" stroke="#8a5a2b" stroke-width="1.5" fill="none" stroke-dasharray="4 4"/>
            <text x="676" y="140" text-anchor="end">Debris blocks the opening</text>
            <text x="676" y="162" text-anchor="end">Water spills over the front</text>
            <g fill="#7a6a3c" font-size="13" font-weight="700">
              <text x="36" y="292">Open top. Recurring cleaning.</text>
              <text x="36" y="314">Overflow risk in heavy rain.</text>
            </g>
          </g>
        </g>

        <!-- ground -->
        <path d="M20 384 H680" stroke="#d9e0da" stroke-width="4" stroke-linecap="round"/>
      </svg>
    </div>

    <div class="demo-foot">
      <span class="legend"><i style="background:var(--water)"></i> Rainwater</span>
      <span class="legend"><i style="background:#8a7a48"></i> Leaves &amp; debris</span>
      <span class="legend"><i style="background:#cfd8d2"></i> Aluminum system</span>
      <span class="legend">Illustration for explanation &mdash; your system is measured and built for your roofline.</span>
    </div>

  </div>

  <div class="feature-grid">

    <div class="feature-card reveal">
      <div class="feature-ico" aria-hidden="true">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round" width="24" height="24">
          <path d="M2 9 12 3l10 6"/><path d="M4 9h16v3a4 4 0 0 1-4 4H4z"/>
        </svg>
      </div>
      <h3>Closed-top design</h3>
      <p>Helps keep leaves, pine needles and other debris from entering the gutter.</p>
    </div>

    <div class="feature-card reveal" style="--d:80ms">
      <div class="feature-ico" aria-hidden="true">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round" width="24" height="24">
          <path d="M12 21a6 6 0 0 0 6-6c0-4-6-11-6-11S6 11 6 15a6 6 0 0 0 6 6z"/><path d="M9 15c0 1.7 1.3 3 3 3"/>
        </svg>
      </div>
      <h3>Liquid adhesion</h3>
      <p>Water follows the surface and enters the gutter while debris sheds away.</p>
    </div>

    <div class="feature-card reveal" style="--d:160ms">
      <div class="feature-ico" aria-hidden="true">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round" width="24" height="24">
          <path d="M12 2.5 20 6v6c0 4.6-3.3 8.4-8 9.5C7.3 20.4 4 16.6 4 12V6z"/><path d="M12 7v8M8.5 11h7"/>
        </svg>
      </div>
      <h3>Heavy-duty construction</h3>
      <p>Built as a permanent gutter protection solution rather than a temporary screen.</p>
    </div>

    <div class="feature-card reveal" style="--d:240ms">
      <div class="feature-ico" aria-hidden="true">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round" width="24" height="24">
          <path d="M3 15 15 3l6 6L9 21z"/><path d="m8 10 2 2M11 7l2 2M5 13l2 2"/>
        </svg>
      </div>
      <h3>Custom fit</h3>
      <p>The system is customized around the home's roofline and gutter configuration.</p>
    </div>

  </div>
</div>
</section>


<!-- =====================================================
     REAL TEXAS HOMES
===================================================== -->
<section id="homes" class="cream">
<div class="container">

  <div class="heading reveal">
    <div class="kicker">Real Texas Homes</div>
    <h2>See GutterMaxx on real homes.</h2>
    <p>Completed installations across Texas, including San Antonio, Fort Worth, Houston and Austin.</p>
  </div>

  <div class="gallery">

    <figure class="gallery-large reveal">
      <img src="assets/image-7-1.jpg" alt="GutterMaxx installation on a two-story Texas home" loading="lazy">
    </figure>

    <figure class="gallery-item reveal" style="--d:80ms">
      <img src="assets/image-7-2.jpg" alt="GutterMaxx gutters along a brick home's roofline" loading="lazy">
    </figure>

    <figure class="gallery-item reveal" style="--d:160ms">
      <img src="assets/image-7-3.jpg" alt="GutterMaxx gutter installation viewed from the driveway" loading="lazy">
    </figure>

    <figure class="gallery-item reveal" style="--d:240ms">
      <img src="assets/image-7-4.jpg" alt="Home protected by a custom GutterMaxx system" loading="lazy">
    </figure>

    <figure class="gallery-item reveal" style="--d:320ms">
      <img src="assets/image-3-3.jpg" alt="Close-up of a finished GutterMaxx gutter run" loading="lazy">
    </figure>

  </div>

  <p class="gallery-caption">Different homes. Different rooflines. One professionally installed GutterMaxx system.</p>

</div>
</section>


<!-- =====================================================
     NUMBERS
===================================================== -->
<section id="numbersStrip" class="numbers">
<div class="container">
<div class="number-grid">
  <div class="number-card reveal"><strong data-count="40000" data-suffix="+">40,000+</strong><span>Homes Protected</span></div>
  <div class="number-card reveal" style="--d:80ms"><strong data-count="25" data-suffix="+">25+</strong><span>Years of Trust</span></div>
  <div class="number-card reveal" style="--d:160ms"><strong>Lifetime</strong><span>No-Clog Warranty</span></div>
  <div class="number-card reveal" style="--d:240ms"><strong>Custom</strong><span>Built For Your Home</span></div>
</div>
</div>
</section>


<!-- =====================================================
     INSTALLATION PROCESS
===================================================== -->
<section id="process" class="process-section">
<div class="container">

  <div class="heading reveal">
    <div class="kicker">What Happens Next</div>
    <h2>Four simple steps. One protected home.</h2>
    <p>From final measurement to professional installation, the process is straightforward.</p>
  </div>

  <div class="process-grid">

    <div class="process-card reveal">
      <div class="process-number">01</div>
      <h3>Final verification measurement</h3>
      <p>Our team confirms the dimensions and details needed for your custom system.</p>
    </div>

    <div class="process-card reveal" style="--d:80ms">
      <div class="process-number">02</div>
      <h3>Custom manufacturing</h3>
      <p>Your system is prepared around the specific requirements of your home.</p>
    </div>

    <div class="process-card reveal" style="--d:160ms">
      <div class="process-number">03</div>
      <h3>Professional installation</h3>
      <p>Your GutterMaxx system is professionally installed on your home.</p>
    </div>

    <div class="process-card reveal" style="--d:240ms">
      <div class="process-number">04</div>
      <h3>Lifetime peace of mind</h3>
      <p>Your system is backed by the GutterMaxx Lifetime No-Clog Warranty.</p>
    </div>

  </div>
</div>
</section>


<!-- =====================================================
     SOCIAL PROOF
===================================================== -->
<section id="reviews" class="social-section">
<div class="container">
<div class="social-grid">

  <div class="reveal">
    <div class="kicker">Trusted Across Texas</div>
    <h2>You're surrounded by homeowners who chose GutterMaxx.</h2>
    <p class="social-description">
      Join more than 40,000 Texas homeowners who have trusted GutterMaxx to protect their homes.
    </p>

    <div class="social-stats">
      <div><strong data-count="40000" data-suffix="+">40,000+</strong><span>Homes Protected</span></div>
      <div><strong data-count="25" data-suffix="+">25+</strong><span>Years of Trust</span></div>
      <div><strong>Lifetime</strong><span>No-Clog Warranty</span></div>
    </div>
  </div>

  <!-- =====================================================
       REVIEW CAROUSEL

       ⚠ PLACEHOLDER CONTENT — reviews 2-5 are examples.
       Replace them with your own verified customer reviews
       (Google, BBB, Angi or signed testimonials) before
       publishing this page.
  ===================================================== -->
  <div class="carousel reveal" id="reviewCarousel" style="--d:100ms" aria-roledescription="carousel" aria-label="Homeowner reviews">

    <div class="carousel-window">
      <div class="carousel-track" id="carouselTrack">
        <div class="slide" role="group" aria-roledescription="review" aria-label="Review 1 of 5">
          <figure class="testimonial">
            <div class="review-top">
              <span class="stars" role="img" aria-label="5 out of 5 stars"><svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16" aria-hidden="true"><path d="m12 3 2.6 5.6 6 .8-4.4 4.2 1.1 6-5.3-3-5.3 3 1.1-6L3.4 9.4l6-.8z"/></svg><svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16" aria-hidden="true"><path d="m12 3 2.6 5.6 6 .8-4.4 4.2 1.1 6-5.3-3-5.3 3 1.1-6L3.4 9.4l6-.8z"/></svg><svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16" aria-hidden="true"><path d="m12 3 2.6 5.6 6 .8-4.4 4.2 1.1 6-5.3-3-5.3 3 1.1-6L3.4 9.4l6-.8z"/></svg><svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16" aria-hidden="true"><path d="m12 3 2.6 5.6 6 .8-4.4 4.2 1.1 6-5.3-3-5.3 3 1.1-6L3.4 9.4l6-.8z"/></svg><svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16" aria-hidden="true"><path d="m12 3 2.6 5.6 6 .8-4.4 4.2 1.1 6-5.3-3-5.3 3 1.1-6L3.4 9.4l6-.8z"/></svg></span>
              <span class="verified"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round" width="12" height="12" aria-hidden="true"><path d="m5 12 4.5 4.5L19 7"/></svg> Verified customer</span>
            </div>
            <div class="quote" aria-hidden="true">&ldquo;</div>
            <blockquote><p>GutterMaxx gave me a fully-customized system for my home at almost 20% less than the leading hooded competitor &mdash; and it&#39;s a far superior product.</p></blockquote>
            <figcaption class="author">
              <span class="avatar" aria-hidden="true">JR</span>
              <span>
                <strong>Jeff R.</strong>
                <span>GutterMaxx Homeowner</span>
              </span>
            </figcaption>
          </figure>
        </div>

        <div class="slide" role="group" aria-roledescription="review" aria-label="Review 2 of 5">
          <figure class="testimonial">
            <div class="review-top">
              <span class="stars" role="img" aria-label="5 out of 5 stars"><svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16" aria-hidden="true"><path d="m12 3 2.6 5.6 6 .8-4.4 4.2 1.1 6-5.3-3-5.3 3 1.1-6L3.4 9.4l6-.8z"/></svg><svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16" aria-hidden="true"><path d="m12 3 2.6 5.6 6 .8-4.4 4.2 1.1 6-5.3-3-5.3 3 1.1-6L3.4 9.4l6-.8z"/></svg><svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16" aria-hidden="true"><path d="m12 3 2.6 5.6 6 .8-4.4 4.2 1.1 6-5.3-3-5.3 3 1.1-6L3.4 9.4l6-.8z"/></svg><svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16" aria-hidden="true"><path d="m12 3 2.6 5.6 6 .8-4.4 4.2 1.1 6-5.3-3-5.3 3 1.1-6L3.4 9.4l6-.8z"/></svg><svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16" aria-hidden="true"><path d="m12 3 2.6 5.6 6 .8-4.4 4.2 1.1 6-5.3-3-5.3 3 1.1-6L3.4 9.4l6-.8z"/></svg></span>
              <span class="verified"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round" width="12" height="12" aria-hidden="true"><path d="m5 12 4.5 4.5L19 7"/></svg> Verified customer</span>
            </div>
            <div class="quote" aria-hidden="true">&ldquo;</div>
            <blockquote><p>The crew measured everything twice and the fit around our dormers is exact. We&#39;ve had two storms since the install and the gutters have stayed completely clear.</p></blockquote>
            <figcaption class="author">
              <span class="avatar" aria-hidden="true">MD</span>
              <span>
                <strong>Marcus D.</strong>
                <span>Two-story brick home &middot; Installed 2024</span>
              </span>
            </figcaption>
          </figure>
        </div>

        <div class="slide" role="group" aria-roledescription="review" aria-label="Review 3 of 5">
          <figure class="testimonial">
            <div class="review-top">
              <span class="stars" role="img" aria-label="5 out of 5 stars"><svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16" aria-hidden="true"><path d="m12 3 2.6 5.6 6 .8-4.4 4.2 1.1 6-5.3-3-5.3 3 1.1-6L3.4 9.4l6-.8z"/></svg><svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16" aria-hidden="true"><path d="m12 3 2.6 5.6 6 .8-4.4 4.2 1.1 6-5.3-3-5.3 3 1.1-6L3.4 9.4l6-.8z"/></svg><svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16" aria-hidden="true"><path d="m12 3 2.6 5.6 6 .8-4.4 4.2 1.1 6-5.3-3-5.3 3 1.1-6L3.4 9.4l6-.8z"/></svg><svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16" aria-hidden="true"><path d="m12 3 2.6 5.6 6 .8-4.4 4.2 1.1 6-5.3-3-5.3 3 1.1-6L3.4 9.4l6-.8z"/></svg><svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16" aria-hidden="true"><path d="m12 3 2.6 5.6 6 .8-4.4 4.2 1.1 6-5.3-3-5.3 3 1.1-6L3.4 9.4l6-.8z"/></svg></span>
              <span class="verified"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round" width="12" height="12" aria-hidden="true"><path d="m5 12 4.5 4.5L19 7"/></svg> Verified customer</span>
            </div>
            <div class="quote" aria-hidden="true">&ldquo;</div>
            <blockquote><p>I was cleaning gutters three times a year because of the pine needles behind our house. I haven&#39;t been up a ladder since GutterMaxx went on.</p></blockquote>
            <figcaption class="author">
              <span class="avatar" aria-hidden="true">LH</span>
              <span>
                <strong>Linda H.</strong>
                <span>Pine-heavy lot &middot; Full-home system</span>
              </span>
            </figcaption>
          </figure>
        </div>

        <div class="slide" role="group" aria-roledescription="review" aria-label="Review 4 of 5">
          <figure class="testimonial">
            <div class="review-top">
              <span class="stars" role="img" aria-label="5 out of 5 stars"><svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16" aria-hidden="true"><path d="m12 3 2.6 5.6 6 .8-4.4 4.2 1.1 6-5.3-3-5.3 3 1.1-6L3.4 9.4l6-.8z"/></svg><svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16" aria-hidden="true"><path d="m12 3 2.6 5.6 6 .8-4.4 4.2 1.1 6-5.3-3-5.3 3 1.1-6L3.4 9.4l6-.8z"/></svg><svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16" aria-hidden="true"><path d="m12 3 2.6 5.6 6 .8-4.4 4.2 1.1 6-5.3-3-5.3 3 1.1-6L3.4 9.4l6-.8z"/></svg><svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16" aria-hidden="true"><path d="m12 3 2.6 5.6 6 .8-4.4 4.2 1.1 6-5.3-3-5.3 3 1.1-6L3.4 9.4l6-.8z"/></svg><svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16" aria-hidden="true"><path d="m12 3 2.6 5.6 6 .8-4.4 4.2 1.1 6-5.3-3-5.3 3 1.1-6L3.4 9.4l6-.8z"/></svg></span>
              <span class="verified"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round" width="12" height="12" aria-hidden="true"><path d="m5 12 4.5 4.5L19 7"/></svg> Verified customer</span>
            </div>
            <div class="quote" aria-hidden="true">&ldquo;</div>
            <blockquote><p>The quote was clear, there was no pressure, and the installation took a single day. The color match against our fascia is spot on.</p></blockquote>
            <figcaption class="author">
              <span class="avatar" aria-hidden="true">RS</span>
              <span>
                <strong>Rob &amp; Terri S.</strong>
                <span>Full-home system &middot; Installed 2023</span>
              </span>
            </figcaption>
          </figure>
        </div>

        <div class="slide" role="group" aria-roledescription="review" aria-label="Review 5 of 5">
          <figure class="testimonial">
            <div class="review-top">
              <span class="stars" role="img" aria-label="5 out of 5 stars"><svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16" aria-hidden="true"><path d="m12 3 2.6 5.6 6 .8-4.4 4.2 1.1 6-5.3-3-5.3 3 1.1-6L3.4 9.4l6-.8z"/></svg><svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16" aria-hidden="true"><path d="m12 3 2.6 5.6 6 .8-4.4 4.2 1.1 6-5.3-3-5.3 3 1.1-6L3.4 9.4l6-.8z"/></svg><svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16" aria-hidden="true"><path d="m12 3 2.6 5.6 6 .8-4.4 4.2 1.1 6-5.3-3-5.3 3 1.1-6L3.4 9.4l6-.8z"/></svg><svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16" aria-hidden="true"><path d="m12 3 2.6 5.6 6 .8-4.4 4.2 1.1 6-5.3-3-5.3 3 1.1-6L3.4 9.4l6-.8z"/></svg><svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16" aria-hidden="true"><path d="m12 3 2.6 5.6 6 .8-4.4 4.2 1.1 6-5.3-3-5.3 3 1.1-6L3.4 9.4l6-.8z"/></svg></span>
              <span class="verified"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round" width="12" height="12" aria-hidden="true"><path d="m5 12 4.5 4.5L19 7"/></svg> Verified customer</span>
            </div>
            <div class="quote" aria-hidden="true">&ldquo;</div>
            <blockquote><p>After the spring storms our neighbors had water pouring over the front of their gutters. Ours ran straight through to the downspouts.</p></blockquote>
            <figcaption class="author">
              <span class="avatar" aria-hidden="true">PN</span>
              <span>
                <strong>Priya N.</strong>
                <span>Custom roofline &middot; Installed 2024</span>
              </span>
            </figcaption>
          </figure>
        </div>
      </div>
    </div>

    <div class="carousel-controls">
      <div class="dots" role="tablist" aria-label="Choose a review" id="carouselDots">
          <button type="button" class="dot" role="tab" aria-selected="true" aria-label="Review 1"></button>
          <button type="button" class="dot" role="tab" aria-selected="false" aria-label="Review 2"></button>
          <button type="button" class="dot" role="tab" aria-selected="false" aria-label="Review 3"></button>
          <button type="button" class="dot" role="tab" aria-selected="false" aria-label="Review 4"></button>
          <button type="button" class="dot" role="tab" aria-selected="false" aria-label="Review 5"></button>
      </div>
      <div class="arrows">
        <span class="carousel-count" id="carouselCount">1 / 5</span>
        <button type="button" class="arrow" id="prevReview" aria-label="Previous review">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" width="18" height="18"><path d="m15 5-7 7 7 7"/></svg>
        </button>
        <button type="button" class="arrow" id="nextReview" aria-label="Next review">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" width="18" height="18"><path d="m9 5 7 7-7 7"/></svg>
        </button>
      </div>
    </div>

  </div>

</div>

<div class="trust-points reveal">
  <div><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" width="16" height="16"><path d="m5 12 4.5 4.5L19 7"/></svg> 40,000+ Texas homeowners</div>
  <div><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" width="16" height="16"><path d="m5 12 4.5 4.5L19 7"/></svg> Custom-built systems</div>
  <div><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" width="16" height="16"><path d="m5 12 4.5 4.5L19 7"/></svg> Professional installation</div>
  <div><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" width="16" height="16"><path d="m5 12 4.5 4.5L19 7"/></svg> Lifetime No-Clog Warranty</div>
</div>

</div>
</section>


<!-- =====================================================
     ASSESSMENT
===================================================== -->
<section id="assessment" class="assessment">
<div class="container">

  <div class="assessment-head">
    <div class="kicker">Your Home. Your Design.</div>
    <h2>Your Home. Protected For Life.</h2>
    <p>Tell us about your home and see your custom GutterMaxx estimate in under 5 minutes.</p>
  </div>

  <div class="assessment-grid">

    <!-- LEFT: lead form -->
    <div class="form-card">

      <div id="formContainer">

        <div class="form-title">
          <img class="form-logo" src="/assets/logo.png">
          <span>YOUR INFORMATION</span>
          <h3>Tell us about your home.</h3>
          <p>Fill this out, then tap <b>Get My Estimate</b> below.</p>
        </div>

        <form id="assessmentForm" novalidate>

          <p class="form-validation-banner" id="formValidationBanner" role="alert" tabindex="-1">Please complete the highlighted field(s) below to continue.</p>

          <div class="form-row">
            <div>
              <label for="first_name">First name <span class="req-mark" aria-hidden="true">*</span></label>
              <input type="text" id="first_name" name="first_name" placeholder="First name" autocomplete="given-name" required aria-required="true">
              <p class="error" data-for="first_name">Enter your first name.</p>
            </div>
            <div>
              <label for="last_name">Last name <span class="req-mark" aria-hidden="true">*</span></label>
              <input type="text" id="last_name" name="last_name" placeholder="Last name" autocomplete="family-name" required aria-required="true">
              <p class="error" data-for="last_name">Enter your last name.</p>
            </div>
          </div>

          <div class="form-field">
            <label for="phone">Phone <span class="req-mark" aria-hidden="true">*</span></label>
            <input type="tel" id="phone" name="phone" placeholder="+1 (555) 000-0000" autocomplete="tel" inputmode="tel" required aria-required="true">
            <p class="error" data-for="phone">Enter a 10-digit phone number.</p>
          </div>

          <div class="form-field">
            <label for="email">Email <span class="req-mark" aria-hidden="true">*</span></label>
            <input type="email" id="email" name="email" placeholder="you@example.com" autocomplete="email" required aria-required="true">
            <p class="error" data-for="email">Enter a valid email address.</p>
          </div>

          <div class="form-field">
            <label for="address">Street address <span class="req-mark" aria-hidden="true">*</span></label>
            <input type="text" id="address" name="address" placeholder="Enter your full address" autocomplete="street-address" required aria-required="true">
            <p class="error" data-for="address">Enter your full property address.</p>
          </div>

          <div class="form-field">
            <label for="zip">ZIP code <span class="req-mark" aria-hidden="true">*</span></label>
            <input type="text" id="zip" name="zip" placeholder="Enter ZIP code" autocomplete="postal-code"
                   inputmode="numeric" maxlength="5" required aria-required="true">
            <p class="error" data-for="zip">Enter your 5-digit ZIP code.</p>
          </div>

          <!-- Cloudflare Turnstile — invisible bot check, no visitor interaction -->
          <div id="cf-turnstile" aria-hidden="true"></div>


          <input type="hidden" name="color_preference" id="colorPreference" value="">

          <div class="consent-group">
            <label class="consent-row">
              <input type="checkbox" id="consent" name="consent" required>
              <span>
                I agree to receive automated calls or texts from GutterMaxx&trade;. Consent isn&rsquo;t required to buy.
                Msg/data rates may apply. Reply STOP to opt out. By continuing, you accept our
                <a href="https://guttermaxx.com/terms-of-use/" target="_blank" rel="noopener">Terms of Use</a> and
                <a href="https://guttermaxx.com/privacy-policy/" target="_blank" rel="noopener">Privacy Policy</a>.
              </span>
            </label>
            <label class="consent-row">
              <input type="checkbox" id="homeownerCertify" name="homeowner_certify" required>
              <span>I certify that I am a homeowner at the address provided above.</span>
            </label>
          </div>
          <p class="error" data-for="consent">Please agree to continue before choosing an option.</p>
          <p class="error" data-for="homeownerCertify">Please confirm you're the homeowner to continue.</p>

          <div class="form-cta" id="formCta">
            <button type="submit" class="cta-btn cta-btn-primary" id="ctaEstimate" data-step="quote-5-min">
              GET MY ESTIMATE <span class="arw" aria-hidden="true">&rarr;</span>
            </button>
            <p class="form-cta-note">See your price on screen in under 5 minutes.</p>
            <p class="cta-trust-chip"><b>4.9&#9733;</b> Rated &middot; Licensed &amp; Insured &middot; No obligation</p>
            <p class="cta-error" id="ctaEstimateError" role="alert"></p>
          </div>

          <p class="form-status" id="formStatus" role="status" aria-live="polite"></p>

        </form>
      </div>

      <div id="quoteTransition" class="quote-transition" role="status" aria-live="polite" hidden>
        <div class="success-circle" aria-hidden="true">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round" width="30" height="30"><path d="m5 12 4.5 4.5L19 7"/></svg>
        </div>
        <h3>You&rsquo;re verified!</h3>
        <p>Thanks<span id="transitionName"></span> &mdash; we&rsquo;ve got your details<span id="transitionAddress"></span>. Our team will follow up shortly by phone and text with your custom GutterMaxx pricing.</p>
      </div>

    </div>

    <!-- RIGHT: trust slider (desktop) + ATTOM retry panel. Zoom / In-Home Demo
         are offered only from the Price Rollout slide onward, after the deck. -->
    <div class="right-col">

      <!-- Before/after compare slider — desktop-only sizzle, sits above the
           CTAs. Hidden below 901px so it never competes with the form/CTAs
           for the tight mobile zero-scroll budget. -->
      <div class="front-pitch">
        <div class="cta-kicker">Your free estimate</div>
        <div class="cta-head">
          <img class="cta-avatar" src="assets/cta-woman-phone.jpg" loading="lazy" decoding="async" alt="" aria-hidden="true">
          <h3>Get Your Home&rsquo;s GutterMaxx Estimate In Under 5 Minutes!</h3>
        </div>
        <ul class="front-pitch-list">
          <li>Measured to your home&rsquo;s actual roofline</li>
          <li>Real pricing for your home &mdash; not a ballpark</li>
          <li>No obligation &mdash; see your price on your own time</li>
        </ul>
      </div>

      <div class="mini-compare" id="miniCompare">
        <div class="mc-frame" id="mcFrame">
          <img class="mc-img mc-before" src="assets/gutter-before.jpg" loading="lazy" decoding="async" alt="Clogged gutter before GutterMaxx" draggable="false" style="clip-path:inset(0 50% 0 0)">
          <img class="mc-img mc-after" src="assets/gutter-after.jpg" loading="lazy" decoding="async" alt="Real GutterMaxx no-clog gutter cover installed on a home" draggable="false" style="clip-path:inset(0 0 0 50%)">
          <div class="mc-tag mc-tag-before">BEFORE</div>
          <div class="mc-tag mc-tag-after">AFTER</div>
          <div class="mc-divider" aria-hidden="true"></div>
        </div>
        <p class="mc-caption"><b>4.9&#9733;</b> rated, 40,000+ homes protected</p>
      </div>

      <div class="cta-stack">

      <div class="cta-card cta-retry" id="attomRetryPanel" role="alert" hidden>
        <div class="cta-kicker cta-kicker-warn">We need a bit more info</div>
        <h3 id="attomRetryHeadline">We Need to Verify a Few Property Details</h3>
        <p id="attomRetryMessage">Please retry entering your information in case the information was invalid. We are not finding a property with the info you originally submitted.</p>
        <button type="submit" form="assessmentForm" class="cta-btn cta-btn-primary" id="attomRetrySubmit">
          Update &amp; try again <span class="arw" aria-hidden="true">&rarr;</span>
        </button>
        <div class="cta-retry-actions">
          <button type="button" class="cta-btn cta-btn-secondary" id="attomManualReviewBtn">
            Request Manual Review <span class="arw" aria-hidden="true">&rarr;</span>
          </button>
          <a class="cta-btn cta-btn-secondary" id="attomCallBtn" href="tel:">
            Call <span id="attomCallPhone"></span>
          </a>
        </div>
        <p class="cta-error" id="attomRetryError" role="alert"></p>
      </div>

      </div>

    </div>

  </div>
</div>
</section>

<!-- =====================================================
     FINAL CTA
===================================================== -->
<section class="final-section">
<div class="container">
  <div class="final-box reveal">
    <div>
      <span class="logo-plate"><img class="brand-logo" src="/assets/logo.png" alt="GutterMaxx" loading="lazy" decoding="async"></span>
      <h2>Protect what you own. Stop worrying about gutters.</h2>
      <p>Engineered for Protection. Designed for Performance.</p>
    </div>
    <a href="#assessment" class="final-btn">Set up my installation <span class="arw" aria-hidden="true">&rarr;</span></a>
    <img class="watermark" src="/assets/watermark.png" loading="lazy" decoding="async" alt="" aria-hidden="true">
  </div>
</div>
</section>

</main>


<!-- =====================================================
     FOOTER
===================================================== -->
<footer>
<div class="container footer-grid">

  <div class="footer-brand">
    <div class="footer-logo">
      <span class="logo-plate"><img class="brand-logo" src="/assets/logo.png" alt="GutterMaxx" loading="lazy" decoding="async"></span>
    </div>
    <p>Engineered for Protection. Designed for Performance.</p>
    <small>Serving Texas homeowners.</small>
  </div>

  <nav class="footer-column" aria-label="Explore">
    <h4>Explore</h4>
    <a href="#why">Why GutterMaxx</a>
    <a href="#system">The System</a>
    <a href="#homes">Real Homes</a>
    <a href="#reviews">Reviews</a>
  </nav>

  <nav class="footer-column" aria-label="Company">
    <h4>Company</h4>
    <a href="#process">Our Process</a>
    <a href="#assessment">Assessment</a>
    <a href="#assessment">Installation</a>
  </nav>

  <div class="footer-column">
    <h4>Texas Areas</h4>
    <span>Dallas</span>
    <span>Fort Worth</span>
    <span>Houston</span>
    <span>San Antonio</span>
    <span>Austin</span>
  </div>

</div>

<div class="footer-bottom">
  <div class="container footer-trustbar">
    <div class="ftb-rating">
      <span class="ftb-stars" aria-hidden="true">&#9733;&#9733;&#9733;&#9733;&#9733;</span>
      <span class="ftb-score">4.9</span>
      <span class="ftb-rcount">500+ Reviews</span>
    </div>
    <div class="ftb-items">
      <span class="ftb-item"><b>40,000+</b> Homes Protected</span>
      <span class="ftb-item"><b>25+ Years</b> in Texas</span>
      <span class="ftb-item"><b>Licensed</b> &amp; Insured</span>
      <span class="ftb-item"><b>Lifetime</b> No-Clog Warranty</span>
    </div>
    <span class="ftb-copyright">&copy; <span id="year">2026</span> GutterMaxx&trade;</span>
  </div>
</div>
</footer>


<!-- Sticky mobile CTA -->
<div class="mobile-cta" id="mobileCta">
  <a class="btn" href="#assessment">Get my free assessment <span class="arw" aria-hidden="true">&rarr;</span></a>
</div>

<!-- Lightbox -->
<div class="lightbox" id="lightbox" role="dialog" aria-modal="true" aria-label="Project photo">
  <button type="button" id="lightboxClose" aria-label="Close photo">&times;</button>
  <img src="" alt="" id="lightboxImg">
</div>

<!-- OTP verification modal -->
<div class="otp-modal" id="otpModal" role="dialog" aria-modal="true" aria-labelledby="otpTitle">
  <div class="otp-backdrop" data-otp-close></div>
  <div class="otp-panel">
    <button type="button" class="otp-close" id="otpClose" aria-label="Close verification window">&times;</button>
    <div class="otp-icon" aria-hidden="true">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" width="26" height="26"><rect x="5" y="3" width="14" height="18" rx="2.5"/><path d="M9 18h6"/></svg>
    </div>
    <h3 id="otpTitle">Verify your number</h3>
    <p id="otpSubtitle"><span id="otpSubtitleText">We just texted a 6-digit code to </span><strong id="otpPhoneDisplay"></strong>.</p>
    <div class="otp-input-row">
      <input type="text" id="otpCode" inputmode="numeric" maxlength="6" placeholder="000000" autocomplete="one-time-code" aria-label="6-digit verification code">
    </div>
    <p class="otp-error" id="otpError" role="alert"></p>
    <button type="button" class="otp-verify-btn" id="otpVerifyBtn">Verify &amp; continue</button>
    <button type="button" class="otp-resend" id="otpResend">Resend code</button>
    <button type="button" class="otp-resend otp-callme" id="otpCallMe">Call me with the code instead</button>
  </div>
</div>

<!-- Booking modal -->
<div class="booking-modal" id="bookingModal" role="dialog" aria-modal="true" aria-labelledby="bookingTitle">
  <div class="booking-backdrop" data-close></div>
  <div class="booking-panel">
    <div class="booking-head">
      <div>
        <h3 id="bookingTitle">Book your appointment</h3>
        <p id="bookingTerritory"></p>
        <a href="#" id="bookingNewTab" target="_blank" rel="noopener">Open in a new tab</a>
      </div>
      <button type="button" class="booking-close" id="bookingClose" aria-label="Close booking window">&times;</button>
    </div>
    <div class="booking-body">
      <iframe id="bookingFrame" title="GutterMaxx booking calendar" src="" scrolling="yes"></iframe>
    </div>
  </div>
</div>



`;

// Changes on every deploy, so the browser can cache landing.js for a year.
const LANDING_VERSION = (process.env.VERCEL_GIT_COMMIT_SHA || process.env.VERCEL_DEPLOYMENT_ID || Date.now().toString(36)).slice(-8);

export default function Home() {
  return (
    <>
      <div dangerouslySetInnerHTML={{ __html: BODY_HTML }} />
      <Script src={`/landing.js?v=${LANDING_VERSION}`} strategy="afterInteractive" />
    </>
  );
}
