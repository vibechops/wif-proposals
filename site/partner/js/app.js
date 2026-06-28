(function () {
  const pages = window.PROPOSAL_PAGES;
  let current = 0;
  document.documentElement.classList.add("font-instrument");

  const DOC_TITLE = "Partner with Us · WIF India";
  const RUNNER_BRAND = "WIF&nbsp;India";

  const els = {
    stage: document.getElementById("stage"),
    btnPrev: document.getElementById("btn-prev"),
    btnNext: document.getElementById("btn-next"),
  };

  const KICKERS = {
    statement: "The proposal, in one sentence",
    bullets: "Why now",
    sections: "Partner credentials",
    advisory: "Industry backing",
    comparison: "Choose a track",
    roles: "Division of work",
    timeline: "Program schedule",
    budget: "The investment",
    split: "The story",
    team: "The people",
    ask: "The decision",
  };

  const pad2 = (n) => String(n).padStart(2, "0");
  const total = () => pad2(pages.length);

  function runner(page) {
    return `
      <header class="runner">
        <span class="runner__left">
          <span class="runner__idx">${pad2(page.id)}</span>
          <span class="runner__rule"></span>
          <span class="runner__name">${page.title}</span>
        </span>
        <span class="runner__brand">${RUNNER_BRAND}</span>
      </header>`;
  }

  function folio(page) {
    return `
      <footer class="folio">
        <span class="folio__no"><b>${pad2(page.id)}</b><span class="folio__den">/ ${total()}</span></span>
      </footer>`;
  }

  function titleblock(kicker, titleHTML) {
    return `
      <div class="titleblock">
        <p class="kicker">${kicker}</p>
        <h1 class="page-title">${titleHTML}</h1>
      </div>`;
  }

  function page(page, inner, mod) {
    return `
      <article class="page page--paper ${mod || ""} page--accent">
        ${runner(page)}
        <div class="page-body">${inner}</div>
        ${folio(page)}
      </article>`;
  }

  function orbArt(suffix, flip) {
    const y1 = flip ? 680 : 420;
    const y2 = flip ? 820 : 580;
    return `
      <svg class="orb-art" viewBox="0 0 794 1123" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
        <defs>
          <linearGradient id="orbA${suffix}" x1="0" y1="1" x2="1" y2="0">
            <stop offset="0" stop-color="#ff6b4a"/>
            <stop offset="0.45" stop-color="#e040a0"/>
            <stop offset="1" stop-color="#ff8c42"/>
          </linearGradient>
          <linearGradient id="orbB${suffix}" x1="1" y1="1" x2="0" y2="0">
            <stop offset="0" stop-color="#5ecfc0"/>
            <stop offset="0.45" stop-color="#9b8cff"/>
            <stop offset="1" stop-color="#ffc8a8"/>
          </linearGradient>
          <pattern id="halftone${suffix}" width="5" height="5" patternUnits="userSpaceOnUse">
            <circle cx="2.5" cy="2.5" r="0.85" fill="#1c1524" opacity="0.14"/>
          </pattern>
        </defs>
        <rect width="794" height="1123" fill="#ebe6df"/>
        <circle cx="520" cy="${y1}" r="290" fill="url(#orbA${suffix})" opacity="0.88"/>
        <circle cx="470" cy="${y2}" r="265" fill="url(#orbB${suffix})" opacity="0.82"/>
        <circle cx="495" cy="${y1 + 80}" r="275" fill="url(#halftone${suffix})" opacity="0.5"/>
      </svg>`;
  }

  /* ---------- Cover (orb) ---------- */
  function renderCover(p) {
    const d = p.data;
    const titleLines = (d.subtitle || "Partner with Us")
      .replace(/\s+with\s+Us/i, "<br>with Us");
    return `
      <article class="page page--cover-orb">
        <div class="orb-bg" aria-hidden="true">${orbArt("c", false)}</div>
        <header class="orb-top">
          <span class="orb-eyebrow">${d.eyebrow}</span>
          <span class="orb-tag">${d.meta || ""}</span>
        </header>
        <h1 class="orb-title">${titleLines}</h1>
        <p class="orb-blurb">${d.blurb || ""}</p>
        <footer class="orb-foot">
          <img src="assets/wif-logo.png?v=2" alt="WIF India" class="orb-wif-logo">
          <span class="orb-year">${d.date || ""}</span>
        </footer>
      </article>`;
  }

  /* ---------- Statement (designed sentence) ---------- */
  function renderStatement(p) {
    const d = p.data;
    const lead = d.lead
      .map((s) => (s.em ? `<em>${s.t}</em>` : s.t))
      .join("");
    const cards = d.cards
      .map(
        (c) => `
        <div class="parse">
          <span class="parse__no">${c.no}</span>
          <p class="parse__title">${c.title}</p>
          <p class="parse__text">${c.text}</p>
        </div>`
      )
      .join("");
    const inner = `
      ${titleblock(d.kicker || KICKERS.statement, d.heading)}
      <p class="statement-lead">${lead}</p>
      <div class="parse-row">${cards}</div>
      <p class="statement-foot"><span class="statement-foot__tick">&rsaquo;</span>${d.footer}</p>`;
    return page(p, inner, "page--statement");
  }

  /* ---------- Bullets (why now) ---------- */
  function renderBullets(p) {
    const d = p.data;
    const items = d.items
      .map(
        (t, i) => `
        <li class="point">
          <span class="point__no">${pad2(i + 1)}</span>
          <p class="point__text">${t}</p>
        </li>`
      )
      .join("");
    const inner = `
      ${titleblock(d.kicker || KICKERS.bullets, d.heading)}
      <ol class="points">${items}</ol>`;
    return page(p, inner, "page--why");
  }

  /* ---------- Sections (credentials) ---------- */
  function renderSections(p) {
    const d = p.data;
    const blocks = d.sections
      .map(
        (s, i) => `
        <div class="cred">
          <div class="cred__head">
            <span class="cred__no">${pad2(i + 1)}</span>
            <p class="cred__label">${s.title}</p>
          </div>
          <ul class="cred__list">${s.items.map((x) => `<li>${x}</li>`).join("")}</ul>
        </div>`
      )
      .join("");
    const lead = d.lead ? `<p class="tl-intro">${d.lead}</p>` : "";
    const mod = d.sections.length >= 4 ? "page--cred page--cred-compact" : "page--cred";
    const inner = `
      ${titleblock(d.kicker || KICKERS.sections, d.heading)}
      ${lead}
      <div class="creds">${blocks}</div>`;
    return page(p, inner, mod);
  }

  /* ---------- Comparison ---------- */
  function renderComparison(p) {
    const d = p.data;
    const mark = (on) =>
      on ? '<span class="mk mk--yes" aria-label="included">&#10003;</span>' : '<span class="mk mk--no" aria-label="not included">&ndash;</span>';
    const rows = d.rows
      .map(
        ([label, a, b]) => `
        <tr>
          <td class="cmp__feat">${label}</td>
          <td class="cmp__opt">${mark(a)}</td>
          <td class="cmp__opt cmp__opt--b">${mark(b)}</td>
        </tr>`
      )
      .join("");
    const inner = `
      ${titleblock(KICKERS.comparison, d.heading)}
      <table class="cmp">
        <thead>
          <tr>
            <th class="cmp__feat">Program feature</th>
            <th class="cmp__opt"><span class="cmp__tag">A</span></th>
            <th class="cmp__opt cmp__opt--b"><span class="cmp__tag cmp__tag--b">B</span></th>
          </tr>
        </thead>
        <tbody>${rows}</tbody>
      </table>
      <div class="opts">
        <div class="opt">
          <p class="opt__tag">Option A: Events</p>
          <p class="opt__text">${d.optionA}</p>
        </div>
        <div class="opt opt--b">
          <p class="opt__tag">Option B: Events + Filmathon</p>
          <p class="opt__text">${d.optionB}</p>
        </div>
      </div>`;
    return page(p, inner, "page--cmp");
  }

  /* ---------- Roles ---------- */
  function renderRoles(p) {
    const d = p.data;
    const blocks = d.options
      .map(
        (opt) => `
        <div class="role-block${opt.tag === "Option B" ? " role-block--b" : ""}">
          <p class="role-block__tag">${opt.tag}</p>
          <ul class="role-lines">
            ${opt.items
              .map(
                (item) => `
            <li><span class="role-party">${item.who}</span>${item.what}</li>`
              )
              .join("")}
          </ul>
        </div>`
      )
      .join("");
    const inner = `
      ${titleblock(KICKERS.roles, d.heading)}
      <div class="roles">${blocks}</div>`;
    return page(p, inner, "page--roles");
  }

  /* ---------- Timeline (vertical spine) ---------- */
  function renderTimeline(p) {
    const d = p.data;
    const phases = d.phases
      .map((ph, i) => {
        const body = ph.cities
          ? `<div class="tl__cities">${ph.cities.map((c) => `<span class="tl__city">${c}</span>`).join("")}</div>`
          : `<ul class="tl__items">${ph.items.map((x) => `<li>${x}</li>`).join("")}</ul>`;
        const note = ph.note ? `<p class="tl__note">${ph.note}</p>` : "";
        return `
        <li class="tl__phase">
          <span class="tl__marker">${pad2(i + 1)}</span>
          <div class="tl__content">
            <div class="tl__head">
              <p class="tl__label">${ph.label}</p>
              <p class="tl__range">${ph.range}</p>
            </div>
            ${body}
            ${note}
          </div>
        </li>`;
      })
      .join("");
    const title = `Timeline <span class="title-tag">${d.optionTag}</span>`;
    const inner = `
      ${titleblock(KICKERS.timeline, title)}
      <p class="tl-intro">${d.intro}</p>
      <ol class="tl">${phases}</ol>`;
    return page(p, inner, "page--timeline");

    /* --- Week-by-week toggle (paused per Rabia: too much info for now).
       Re-enable by swapping the `inner` above for the block below.
    const weeks = (d.weeks || [])
      .map(
        (w, i) => `
        <tr class="tlw__row tlw__row--${w.phase.toLowerCase()}">
          <td class="tlw__wk">${pad2(i + 1)}</td>
          <td class="tlw__phase">${w.phase}</td>
          <td class="tlw__what">${w.what}</td>
        </tr>`
      )
      .join("");
    const innerWithToggle = `
      ${titleblock(KICKERS.timeline, title)}
      <div class="tl-bar">
        <p class="tl-intro">${d.intro}</p>
        <div class="tl-toggle" role="tablist">
          <button class="tl-toggle__btn is-active" data-view="phases" type="button">By phase</button>
          <button class="tl-toggle__btn" data-view="weeks" type="button">Week by week</button>
        </div>
      </div>
      <div class="tl-wrap" data-view="phases">
        <ol class="tl tl-view tl-view--phases">${phases}</ol>
        <table class="tlw tl-view tl-view--weeks">
          <thead>
            <tr><th class="tlw__wk">Wk</th><th class="tlw__phase">Phase</th><th class="tlw__what">What happens</th></tr>
          </thead>
          <tbody>${weeks}</tbody>
        </table>
      </div>`;
    --- */
  }

  /* ---------- Budget ---------- */
  function renderBudget(p) {
    const d = p.data;
    const covers = d.covers.map((x) => `<li>${x}</li>`).join("");
    const tiers = d.tiers
      .map(
        (t) => `
        <div class="budget-tier">
          <p class="budget-tier__tag">${t.tag}</p>
          <p class="budget-tier__amount">${t.amount}</p>
          ${t.plus ? `<p class="budget-tier__plus">${t.plus}</p>` : ""}
          <p class="budget-tier__desc">${t.desc}</p>
        </div>`
      )
      .join("");
    const inner = `
      ${titleblock(d.kicker || KICKERS.budget, d.heading)}
      <div class="budget">
        <p class="budget__label">${d.label}</p>
        <div class="budget-tiers">${tiers}</div>
        ${d.lead ? `<p class="budget__lead">${d.lead}</p>` : ""}
        <ul class="budget__covers">${covers}</ul>
        <p class="aside"><span class="aside__bar"></span>${d.note}</p>
      </div>`;
    return page(p, inner, "page--budget page--accent");
  }

  /* ---------- Ask (closing) ---------- */
  function renderAsk(p) {
    const d = p.data;
    const asks = d.ask
      .map((a, i) => `<li><span class="ask__no">${pad2(i + 1)}</span><p>${a}</p></li>`)
      .join("");
    const inner = `
      ${titleblock(d.kicker || KICKERS.ask, d.heading)}
      <p class="ask-lead">${d.lead}</p>
      <div class="ask-grid">
        <div class="ask-col">
          <p class="ask-col__label">${d.colLabel || "What we ask"}</p>
          <ol class="ask-list">${asks}</ol>
        </div>
      </div>`;
    return page(p, inner, "page--ask");
  }

  /* ---------- Advisory board ---------- */
  function renderAdvisory(p) {
    const d = p.data;
    const cards = d.members
      .map(
        (m) => `
        <div class="advisor-card">
          <div class="advisor-card__photo">
            <img src="assets/advisors/${m.photo}.jpg?v=8" alt="${m.name}" loading="lazy">
          </div>
          <p class="advisor-card__name">${m.name}</p>
          <p class="advisor-card__title">${m.title}</p>
        </div>`
      )
      .join("");
    const intro = d.intro ? `<p class="advisor-intro">${d.intro}</p>` : "";
    const inner = `
      ${titleblock(KICKERS.advisory, d.heading)}
      ${intro}
      <div class="advisor-grid">${cards}</div>`;
    return page(p, inner, "page--advisory");
  }

  /* ---------- Split + photo ---------- */
  function renderSplit(p) {
    const d = p.data;
    const paras = (d.paragraphs || [])
      .map((x) => `<p class="split__p">${x}</p>`)
      .join("");
    const items = d.items
      ? `<ul class="split__list">${d.items.map((x) => `<li>${x}</li>`).join("")}</ul>`
      : "";
    const foot = d.footnote ? `<p class="split__foot">${d.footnote}</p>` : "";
    const pos = d.imagePosition === "left" ? "split--left" : "";
    const tall = d.imageTall ? " split__fig--tall" : "";
    const inner = `
      ${titleblock(d.kicker || KICKERS.split, d.heading)}
      <div class="split ${pos}">
        <div class="split__copy">${paras}${items}${foot}</div>
        <figure class="split__fig${tall}">
          <img src="assets/charter/${d.image}" alt="${d.imageAlt || ""}" loading="lazy">
        </figure>
      </div>`;
    return page(p, inner, "page--split page--accent");
  }

  /* ---------- Team ---------- */
  function renderTeam(p) {
    const d = p.data;
    const cards = d.members
      .map(
        (m) => `
        <article class="team-card">
          <div class="team-card__photo">
            <img src="assets/charter/${m.photo}" alt="${m.name}" loading="lazy">
          </div>
          <p class="team-card__name">${m.name}</p>
          <p class="team-card__role">${m.role}</p>
          <p class="team-card__bio">${m.bio}</p>
        </article>`
      )
      .join("");
    const strip = (d.boardPhotos || [])
      .map(
        (m) =>
          `<figure class="board-chip"><img src="assets/advisors/${m.photo}.jpg" alt="${m.name}" loading="lazy"><figcaption>${m.name}</figcaption></figure>`
      )
      .join("");
    const board = d.board
      ? `
      <div class="team-board">
        <p class="team-board__label">${d.board.label}</p>
        <p class="team-board__text">${d.board.text}</p>
        ${strip ? `<div class="team-board__strip">${strip}</div>` : ""}
      </div>`
      : "";
    const inner = `
      ${titleblock(d.kicker || KICKERS.team, d.heading)}
      <div class="team-grid">${cards}</div>
      ${board}`;
    return page(p, inner, "page--team page--accent");
  }

  /* ---------- Closing (orb + social) ---------- */
  function renderClosing(p) {
    const d = p.data;
    const lead = d.lead.map((s) => (s.em ? `<em>${s.t}</em>` : s.t)).join("");
    const socials = (d.socials || [])
      .map(
        (s) =>
          `<a href="${s.url}" class="orb-social" target="_blank" rel="noopener noreferrer">${s.label}</a>`
      )
      .join("");
    return `
      <article class="page page--closing-orb">
        <div class="orb-bg" aria-hidden="true">${orbArt("x", true)}</div>
        <header class="orb-top">
          <span class="orb-eyebrow">${d.eyebrow}</span>
        </header>
        <div class="orb-hero">
          <p class="orb-statement">${lead}</p>
          <p class="orb-cta">${d.close}</p>
          <div class="orb-socials">${socials}</div>
        </div>
        <span class="orb-brand">${d.brand || ""}</span>
      </article>`;
  }

  const renderers = {
    cover: renderCover,
    statement: renderStatement,
    bullets: renderBullets,
    sections: renderSections,
    split: renderSplit,
    team: renderTeam,
    advisory: renderAdvisory,
    comparison: renderComparison,
    roles: renderRoles,
    timeline: renderTimeline,
    budget: renderBudget,
    ask: renderAsk,
    closing: renderClosing,
  };

  const A4_W = 794;
  const A4_H = 1123;

  function fitPage() {
    const frame = els.stage.querySelector(".page-frame");
    if (!frame) return;
    const pad = 48;
    const availW = els.stage.clientWidth - pad;
    const availH = els.stage.clientHeight - pad;
    const scale = Math.min(availW / A4_W, availH / A4_H);
    frame.style.setProperty("--page-scale", scale.toFixed(4));
  }

  function renderPage(index) {
    const p = pages[index];
    const fn = renderers[p.template];
    els.stage.innerHTML = `<div class="page-frame">${fn(p)}</div>`;
    fitPage();
  }

  function updateUI() {
    const p = pages[current];
    els.btnPrev.disabled = current === 0;
    els.btnNext.disabled = current === pages.length - 1;
    history.replaceState(null, "", `#page-${p.id}`);
    document.title = `${p.title} | ${DOC_TITLE}`;
  }

  function goTo(index) {
    if (index < 0 || index >= pages.length) return;
    current = index;
    renderPage(current);
    updateUI();
  }

  function parseHash() {
    const m = location.hash.match(/^#page-(\d+)$/);
    if (m) {
      const id = Number(m[1]);
      const idx = pages.findIndex((p) => p.id === id);
      if (idx >= 0) current = idx;
    }
  }

  // Expose renderers so the print page can build all pages at once.
  window.PROPOSAL = {
    pages,
    renderPageHTML: (p) => renderers[p.template](p),
  };

  // Interactive viewer init: only runs when the viewer chrome is present.
  if (els.stage && els.btnPrev && els.btnNext) {
    els.btnPrev.addEventListener("click", () => goTo(current - 1));
    els.btnNext.addEventListener("click", () => goTo(current + 1));

    // Timeline view toggle (phase view <-> week-by-week table).
    els.stage.addEventListener("click", (e) => {
      const btn = e.target.closest(".tl-toggle__btn");
      if (!btn) return;
      const wrap = btn.closest(".page-body").querySelector(".tl-wrap");
      if (wrap) wrap.dataset.view = btn.dataset.view;
      btn.parentElement.querySelectorAll(".tl-toggle__btn").forEach((b) => {
        b.classList.toggle("is-active", b === btn);
      });
    });

    document.addEventListener("keydown", (e) => {
      if (e.key === "ArrowLeft") goTo(current - 1);
      if (e.key === "ArrowRight") goTo(current + 1);
    });

    window.addEventListener("hashchange", () => {
      parseHash();
      renderPage(current);
      updateUI();
    });

    window.addEventListener("resize", fitPage);

    parseHash();
    renderPage(current);
    updateUI();
  }
})();
