/* ============================================================
   画面を組み立てるプログラム（ふだんは編集しません）

   js/site-data.js の内容を読み込んで、各ページを表示します。
   ・外部のサービスやスクリプトは、一切使っていません。
   ・文章は、安全な方法（textContent）で表示するので、
     「<」「>」などの記号を書いても、表示が壊れたり、悪用されたりしません。
   ・リンクは https:// のものと、サイト内のページだけを許可します。
   ============================================================ */
(function () {
  "use strict";

  var D = window.SITE_DATA;
  var U = window.SITE_UI;
  var app = document.getElementById("app");
  if (!app) { return; }

  var LANGS = ["ja", "en"];
  var PAGES = ["home", "tools", "assets", "about", "notes"];
  var FILES = {
    home: "index.html", tools: "tools.html", assets: "assets.html",
    about: "about.html", notes: "notes.html"
  };
  var page = document.body.getAttribute("data-page") || "home";
  if (PAGES.indexOf(page) < 0) { page = "home"; }

  var lang = "ja";
  var noteFilter = "all";

  /* ---------- 読み込みに失敗したとき ---------- */
  if (!D || !U) {
    var box = document.createElement("div");
    box.className = "fatal";
    var p1 = document.createElement("p");
    p1.textContent = "サイトの内容ファイル（js/site-data.js）を読み込めませんでした。直前に編集した場所に、書き間違い（引用符やカンマの抜けなど）がないか確認してください。元に戻せば、表示されます。";
    var p2 = document.createElement("p");
    p2.textContent = "Could not load js/site-data.js. Please check the part you edited last for typos, such as a missing quote or comma. Undoing the edit will fix it.";
    box.appendChild(p1);
    box.appendChild(p2);
    app.textContent = "";
    app.appendChild(box);
    return;
  }

  /* ---------- 小さな道具 ---------- */
  function el(tag, attrs, kids) {
    var n = document.createElement(tag);
    if (attrs) {
      for (var k in attrs) {
        if (!Object.prototype.hasOwnProperty.call(attrs, k)) { continue; }
        var v = attrs[k];
        if (v === null || v === undefined || v === false) { continue; }
        n.setAttribute(k, v === true ? "" : String(v));
      }
    }
    append(n, kids);
    return n;
  }

  function append(n, kids) {
    if (kids === null || kids === undefined || kids === false) { return; }
    if (!Array.isArray(kids)) { kids = [kids]; }
    kids.forEach(function (c) {
      if (c === null || c === undefined || c === false) { return; }
      if (Array.isArray(c)) { append(n, c); return; }
      if (typeof c === "string" || typeof c === "number") {
        n.appendChild(document.createTextNode(String(c)));
      } else {
        n.appendChild(c);
      }
    });
  }

  // { ja: "...", en: "..." } から、いまの言語の文字を取り出す
  function tr(v) {
    if (v === null || v === undefined) { return ""; }
    if (typeof v === "string") { return v; }
    if (typeof v === "object") {
      if (typeof v[lang] === "string" && v[lang] !== "") { return v[lang]; }
      if (typeof v.ja === "string") { return v.ja; }
    }
    return "";
  }

  // { ja: [...], en: [...] } から、いまの言語の配列を取り出す
  function trList(v) {
    if (Array.isArray(v)) { return v; }
    if (v && typeof v === "object") {
      if (Array.isArray(v[lang]) && v[lang].length) { return v[lang]; }
      if (Array.isArray(v.ja)) { return v.ja; }
    }
    return [];
  }

  function getStored(key) {
    try { return localStorage.getItem(key); } catch (e) { return null; }
  }
  function setStored(key, val) {
    try { localStorage.setItem(key, val); } catch (e) { /* 保存できなくても続けます */ }
  }

  // リンクとして使ってよいものだけを通す（https:// と、サイト内のページ）
  function safeUrl(u) {
    if (typeof u !== "string") { return null; }
    u = u.trim();
    if (!u) { return null; }
    if (/^https:\/\/[^\s"'<>]+$/i.test(u)) { return u; }
    if (/^(\.\/)?[A-Za-z0-9_\-]+\.html?(#[A-Za-z0-9_\-]+)?$/.test(u)) { return u; }
    if (/^#[A-Za-z0-9_\-]+$/.test(u)) { return u; }
    return null;
  }

  // 画像は images フォルダの中のものだけを通す
  function safeImage(p) {
    if (typeof p !== "string") { return null; }
    p = p.trim();
    if (!p) { return null; }
    if (/^images\/[A-Za-z0-9_\-.\/]+$/.test(p) && p.indexOf("..") < 0) { return p; }
    return null;
  }

  function safeId(s) { return String(s === undefined || s === null ? "" : s).replace(/[^A-Za-z0-9_\-]/g, ""); }

  function isExternal(u) { return /^https:/i.test(u); }

  function fmtDate(s) {
    var m = /^(\d{4})-(\d{1,2})-(\d{1,2})$/.exec(String(s || ""));
    if (!m) { return String(s || ""); }
    var y = +m[1], mo = +m[2], d = +m[3];
    if (lang === "ja") { return y + "年" + mo + "月" + d + "日"; }
    var names = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    return (names[mo - 1] || mo) + " " + d + ", " + y;
  }

  function timeEl(s) {
    var m = /^\d{4}-\d{1,2}-\d{1,2}$/.test(String(s || ""));
    return el("time", m ? { datetime: s } : null, fmtDate(s));
  }

  /* ---------- 言語・テーマ ---------- */
  // 見ている人のブラウザの言語設定（ふつうは PC・スマホの言語）から選ぶ。
  // 日本語なら ja、それ以外の言語なら en。読み取れなければ null（defaultLang を使う）
  function browserLang() {
    var list = [];
    try {
      if (navigator.languages && navigator.languages.length) { list = Array.prototype.slice.call(navigator.languages); }
      else if (navigator.language) { list = [navigator.language]; }
    } catch (e) { list = []; }
    for (var i = 0; i < list.length; i++) {
      var code = String(list[i] || "").toLowerCase().split("-")[0];
      if (LANGS.indexOf(code) >= 0) { return code; }
    }
    return list.length ? "en" : null;
  }

  function initialLang() {
    var q = null;
    try { q = new URLSearchParams(location.search).get("lang"); } catch (e) { q = null; }
    if (LANGS.indexOf(q) >= 0) { setStored("rw-lang", q); return q; }
    var s = getStored("rw-lang");
    if (LANGS.indexOf(s) >= 0) { return s; }
    var b = browserLang();
    if (b) { return b; }
    var d = D.site && D.site.defaultLang;
    return LANGS.indexOf(d) >= 0 ? d : "ja";
  }

  function currentTheme() {
    var t = document.documentElement.getAttribute("data-theme");
    if (t === "dark" || t === "light") { return t; }
    return (window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches) ? "dark" : "light";
  }

  function themeButtonText() {
    return currentTheme() === "dark" ? tr(U.theme.toLight) : tr(U.theme.toDark);
  }

  /* ---------- 部品 ---------- */
  function badge(status) {
    if (!U.status[status]) { return null; }
    return el("span", { class: "badge badge-" + status }, tr(U.status[status]));
  }

  function thumb(it) {
    var src = safeImage(it.image);
    var box = el("div", { class: "thumb" });
    if (src) {
      box.appendChild(el("img", {
        src: src, alt: tr(it.imageAlt), loading: "lazy", decoding: "async"
      }));
    } else {
      box.appendChild(el("span", { class: "thumb-initial", "aria-hidden": "true" },
        String(it.name || "?").charAt(0).toUpperCase()));
    }
    return box;
  }

  function linkButton(lnk, primary) {
    var label = tr(lnk && lnk.label);
    var url = safeUrl(lnk && lnk.url);
    if (!url) {
      return el("span", { class: "btn is-disabled", "aria-disabled": "true" },
        [label, el("small", null, lang === "ja" ? "（" + tr(U.soon) + "）" : "(" + tr(U.soon) + ")")]);
    }
    var attrs = { class: "btn" + (primary ? " btn-primary" : ""), href: url };
    if (isExternal(url)) { attrs.target = "_blank"; attrs.rel = "noopener noreferrer"; }
    return el("a", attrs, label);
  }

  function section(eyebrow, title, content) {
    return el("section", { class: "section" }, [
      el("div", { class: "section-head" }, [
        el("p", { class: "eyebrow" }, tr(eyebrow)),
        el("h2", null, tr(title))
      ]),
      content
    ]);
  }

  function pageHead(key) {
    var p = U.pages[key];
    return el("div", { class: "page-head" }, [
      el("h1", null, p.heading),
      el("p", { class: "page-sub" }, tr(p.sub))
    ]);
  }

  function paragraphs(list) {
    return trList(list).map(function (t) { return el("p", null, t); });
  }

  /* ---------- 制作物（TOOLS / ASSETS） ---------- */
  function renderProduct(it) {
    var id = safeId(it.id);
    var feats = trList(it.features);
    var meta = [];
    if (it.platforms && it.platforms.length) {
      meta.push(el("dt", null, tr(U.platforms)));
      meta.push(el("dd", null, el("ul", { class: "tags" },
        it.platforms.map(function (p) { return el("li", null, String(p)); }))));
    }
    var price = tr(it.price);
    if (price) {
      meta.push(el("dt", null, tr(U.price)));
      meta.push(el("dd", null, price));
    }
    var links = (it.links || []).map(function (l, i) { return linkButton(l, i === 0); });
    var notice = tr(it.notice);

    return el("article", { class: "product", id: id || null }, [
      thumb(it),
      el("div", { class: "product-body" }, [
        el("div", { class: "product-head" }, [
          el("h2", null, it.name),
          badge(it.status),
          it.version ? el("span", { class: "version" }, it.version) : null
        ]),
        el("p", { class: "tagline" }, tr(it.tagline)),
        el("p", null, tr(it.description)),
        feats.length ? el("ul", { class: "features" }, feats.map(function (f) { return el("li", null, f); })) : null,
        meta.length ? el("dl", { class: "meta" }, meta) : null,
        notice ? el("p", { class: "notice" }, notice) : null,
        links.length ? el("div", { class: "actions" }, links) : null
      ])
    ]);
  }

  function renderCard(e) {
    var it = e.item;
    var id = safeId(it.id);
    var href = FILES[e.kind === "asset" ? "assets" : "tools"] + (id ? "#" + id : "");
    return el("article", { class: "card" }, [
      thumb(it),
      el("div", { class: "body" }, [
        el("div", { class: "card-meta" }, [
          el("span", { class: "kind" }, U.kind[e.kind]),
          badge(it.status)
        ]),
        el("h3", null, it.name),
        el("p", { class: "card-text" }, tr(it.tagline)),
        el("a", { class: "more", href: href }, tr(U.details))
      ])
    ]);
  }

  function featuredItems() {
    var out = [];
    (D.tools || []).forEach(function (t) { if (t && t.featured === true) { out.push({ item: t, kind: "tool" }); } });
    (D.assets || []).forEach(function (a) { if (a && a.featured === true) { out.push({ item: a, kind: "asset" }); } });
    return out;
  }

  /* ---------- NOTES ---------- */
  function sortedNotes() {
    var list = (D.notes || []).map(function (n, i) { return { n: n, i: i }; });
    list.sort(function (a, b) {
      var da = String(a.n.date || ""), db = String(b.n.date || "");
      if (da === db) { return a.i - b.i; }
      return da < db ? 1 : -1;
    });
    return list.map(function (x) { return x.n; });
  }

  function noteCategory(n) { return n.category === "guide" ? "guide" : "news"; }

  function renderNote(n) {
    var id = safeId(n.id);
    var cat = noteCategory(n);
    var kids = [
      el("div", { class: "note-meta" }, [
        el("span", { class: "badge badge-coming" }, tr(U.noteCategory[cat])),
        timeEl(n.date)
      ]),
      el("h2", null, tr(n.title))
    ];
    kids = kids.concat(paragraphs(n.body));
    if (n.link) {
      kids.push(el("div", { class: "actions" }, [linkButton(n.link, false)]));
    }
    return el("article", { class: "note", id: id || null }, kids);
  }

  function renderNotesPage() {
    var all = sortedNotes();
    var listBox = el("div", { class: "notes-list" });
    var chipBox = el("div", { class: "chips", role: "group", "aria-label": tr(U.noteFilter.all) });

    function fill() {
      listBox.textContent = "";
      var shown = all.filter(function (n) { return noteFilter === "all" || noteCategory(n) === noteFilter; });
      if (!shown.length) {
        listBox.appendChild(el("p", { class: "empty" }, tr(U.emptyNotes)));
        return;
      }
      shown.forEach(function (n) { listBox.appendChild(renderNote(n)); });
    }

    ["all", "news", "guide"].forEach(function (key) {
      var b = el("button", { type: "button", class: "chip", "aria-pressed": key === noteFilter ? "true" : "false" },
        tr(U.noteFilter[key]));
      b.addEventListener("click", function () {
        noteFilter = key;
        Array.prototype.forEach.call(chipBox.children, function (c) { c.setAttribute("aria-pressed", "false"); });
        b.setAttribute("aria-pressed", "true");
        fill();
      });
      chipBox.appendChild(b);
    });

    fill();
    return [pageHead("notes"), chipBox, listBox];
  }

  /* ---------- 各ページ ---------- */
  function renderHome() {
    var out = [];
    var home = D.home || {};

    out.push(el("section", { class: "hero" }, [
      el("p", { class: "eyebrow" }, tr(U.home.eyebrow)),
      el("h1", null, D.site.name),
      el("p", { class: "hero-tagline" }, tr(D.site.tagline)),
      el("p", { class: "hero-lead" }, tr(home.lead)),
      el("div", { class: "actions" }, [
        el("a", { class: "btn btn-primary", href: FILES.tools }, tr(U.home.viewTools)),
        el("a", { class: "btn", href: FILES.assets }, tr(U.home.viewAssets))
      ])
    ]));

    var items = featuredItems();
    out.push(section(U.home.latestEyebrow, U.home.latestTitle,
      items.length ? el("div", { class: "grid" }, items.map(renderCard))
                   : el("p", { class: "empty" }, tr(U.home.emptyLatest))));

    var latestNotes = sortedNotes().slice(0, 3);
    if (latestNotes.length) {
      var ul = el("ul", { class: "news-list" }, latestNotes.map(function (n) {
        var id = safeId(n.id);
        return el("li", null, [
          timeEl(n.date),
          el("a", { href: FILES.notes + (id ? "#" + id : "") }, tr(n.title))
        ]);
      }));
      out.push(section(U.home.newsEyebrow, U.home.newsTitle, [
        ul,
        el("p", { class: "news-link" }, el("a", { href: FILES.notes }, tr(U.home.allNews)))
      ]));
    }

    var acts = (home.activities || []);
    if (acts.length) {
      out.push(section(U.home.activityEyebrow, U.home.activityTitle,
        el("div", { class: "grid" }, acts.map(function (a) {
          return el("div", { class: "card plain" }, [
            el("h3", null, tr(a.title)),
            el("p", null, tr(a.text))
          ]);
        }))));
    }
    return out;
  }

  function renderList(key, list, emptyMsg) {
    var out = [pageHead(key)];
    if (list && list.length) {
      out.push(el("div", { class: "products" }, list.map(renderProduct)));
    } else {
      out.push(el("p", { class: "empty" }, tr(emptyMsg)));
    }
    return out;
  }

  // site-data.js の links に書いたものを、書いた順にすべて使う
  function linkKeys() {
    var links = D.links;
    if (!links || typeof links !== "object") { return []; }
    return Object.keys(links).filter(function (k) {
      return links[k] && typeof links[k] === "object";
    });
  }

  function renderAbout() {
    var about = D.about || {};
    var linkItems = [];
    linkKeys().forEach(function (k) {
      var l = D.links && D.links[k];
      if (l) { linkItems.push(el("li", null, linkButton({ label: l.label || k, url: l.url }, false))); }
    });
    return [
      pageHead("about"),
      el("div", { class: "prose" }, [
        paragraphs(about.paragraphs),
        el("section", { class: "section" }, [
          el("div", { class: "section-head" }, el("h2", null, tr(U.about.usageTitle))),
          el("ul", null, trList(about.usage).map(function (t) { return el("li", null, t); }))
        ]),
        el("section", { class: "section" }, [
          el("div", { class: "section-head" }, el("h2", null, tr(U.about.linksTitle))),
          el("p", null, tr(U.about.linksLead)),
          el("ul", { class: "link-list" }, linkItems)
        ])
      ])
    ];
  }

  function renderPage() {
    switch (page) {
      case "tools":  return renderList("tools", D.tools, U.emptyTools);
      case "assets": return renderList("assets", D.assets, U.emptyAssets);
      case "about":  return renderAbout();
      case "notes":  return renderNotesPage();
      default:       return renderHome();
    }
  }

  /* ---------- ヘッダー・フッター ---------- */
  function renderHeader() {
    var brand = el("a", { class: "brand", href: FILES.home }, [
      el("img", { src: "images/logo.svg", alt: "", width: "30", height: "30" }),
      el("span", null, D.site.name)
    ]);

    var sel = el("select", { class: "pill", id: "lang-select", "aria-label": tr(U.langLabel) },
      LANGS.map(function (l) { return el("option", { value: l }, U.langNames[l]); }));
    sel.value = lang;
    sel.addEventListener("change", function () {
      if (LANGS.indexOf(sel.value) < 0) { return; }
      lang = sel.value;
      setStored("rw-lang", lang);
      renderAll(false);
      var again = document.getElementById("lang-select");
      if (again) { again.focus(); }
    });

    var themeBtn = el("button", { type: "button", class: "pill", id: "theme-btn", "aria-label": tr(U.theme.label) },
      themeButtonText());
    themeBtn.addEventListener("click", function () {
      var next = currentTheme() === "dark" ? "light" : "dark";
      document.documentElement.setAttribute("data-theme", next);
      setStored("rw-theme", next);
      themeBtn.textContent = themeButtonText();
    });

    var nav = el("nav", { "aria-label": tr(U.navLabel) },
      el("ul", { class: "nav" }, PAGES.map(function (k) {
        return el("li", null, el("a", { href: FILES[k], "aria-current": k === page ? "page" : null }, U.nav[k]));
      })));

    return el("header", { class: "site-header" }, [
      el("div", { class: "container header-top" }, [brand, el("div", { class: "controls" }, [sel, themeBtn])]),
      el("div", { class: "container" }, nav)
    ]);
  }

  function renderFooter() {
    var linkNodes = [];
    linkKeys().forEach(function (k) {
      var l = D.links && D.links[k];
      var url = l && safeUrl(l.url);
      if (url) {
        var attrs = { href: url };
        if (isExternal(url)) { attrs.target = "_blank"; attrs.rel = "noopener noreferrer"; }
        linkNodes.push(el("li", null, el("a", attrs, l.label || k)));
      }
    });
    var year = new Date().getFullYear();
    var start = parseInt(D.site.startYear, 10);
    var years = (start && start < year) ? start + "–" + year : String(year);
    return el("footer", { class: "site-footer" },
      el("div", { class: "container footer-inner" }, [
        el("p", null, "© " + years + " " + D.site.name + ". " + tr(U.footer.copyright)),
        linkNodes.length ? el("ul", { class: "footer-links" }, linkNodes) : null
      ]));
  }

  /* ---------- 全体の描画 ---------- */
  function pageTitle() {
    if (page === "home") { return D.site.name; }
    return U.pages[page].heading + " | " + D.site.name;
  }

  function pageDescription() {
    if (page === "home") { return tr(D.site.tagline) + " " + tr((D.home || {}).lead); }
    return tr(U.pages[page].sub) + " | " + D.site.name;
  }

  function renderAll(isFirst) {
    document.documentElement.setAttribute("lang", lang);
    document.title = pageTitle();
    var meta = document.querySelector('meta[name="description"]');
    if (meta) { meta.setAttribute("content", pageDescription()); }

    var main = el("main", { id: "main", class: "container", tabindex: "-1" }, renderPage());
    app.textContent = "";
    app.appendChild(el("a", { class: "skip", href: "#main" }, tr(U.skip)));
    app.appendChild(renderHeader());
    app.appendChild(main);
    app.appendChild(renderFooter());

    if (isFirst) { scrollToHash(); }
  }

  function scrollToHash() {
    var h = location.hash;
    if (!h || h.length < 2) { return; }
    var raw = h.slice(1);
    try { raw = decodeURIComponent(raw); } catch (e) { /* そのまま使います */ }
    var id = safeId(raw);
    var target = id && document.getElementById(id);
    if (target) { target.scrollIntoView(); }
  }

  lang = initialLang();
  renderAll(true);
})();
