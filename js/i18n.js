/* ============================================================
   画面の固定文言（日本語 / 英語）

   ボタンや見出しなど、サイト共通の言葉です。ふだんは編集しません。
   言い回しを変えたいときだけ、「 」の中を書き換えてください。
   （制作物の説明などは、js/site-data.js に書きます）
   ============================================================ */
window.SITE_UI = {
  langLabel: { ja: "言語", en: "Language" },
  langNames: { ja: "日本語", en: "English" },
  skip: { ja: "本文へスキップ", en: "Skip to main content" },
  navLabel: { ja: "メインメニュー", en: "Main menu" },

  theme: {
    label: { ja: "表示モードを切り替える", en: "Toggle color theme" },
    toDark: { ja: "ダーク", en: "Dark" },
    toLight: { ja: "ライト", en: "Light" }
  },

  nav: { home: "HOME", tools: "TOOLS", assets: "ASSETS", about: "ABOUT", notes: "NOTES" },

  pages: {
    tools: {
      heading: "TOOLS",
      sub: { ja: "制作したソフトウェア・ツール", en: "Software and tools I have made" }
    },
    assets: {
      heading: "ASSETS",
      sub: { ja: "画像素材・タイマー用素材など", en: "Images, timer materials and more" }
    },
    about: {
      heading: "ABOUT",
      sub: { ja: "RamuMomo Works について", en: "About RamuMomo Works" }
    },
    notes: {
      heading: "NOTES",
      sub: { ja: "使い方・お知らせ", en: "Guides and news" }
    }
  },

  home: {
    eyebrow: { ja: "Personal works", en: "Personal works" },
    viewTools: { ja: "TOOLS を見る", en: "View TOOLS" },
    viewAssets: { ja: "ASSETS を見る", en: "View ASSETS" },
    latestEyebrow: { ja: "Latest works", en: "Latest works" },
    latestTitle: { ja: "最新の制作物", en: "Latest works" },
    emptyLatest: { ja: "掲載できる制作物を準備中です。", en: "Works are being prepared." },
    newsEyebrow: { ja: "News", en: "News" },
    newsTitle: { ja: "お知らせ", en: "News" },
    allNews: { ja: "NOTES をすべて見る", en: "View all NOTES" },
    activityEyebrow: { ja: "What I make", en: "What I make" },
    activityTitle: { ja: "活動紹介", en: "What I do" }
  },

  status: {
    released: { ja: "公開中", en: "Available" },
    coming: { ja: "公開予定", en: "Coming soon" },
    wip: { ja: "制作中", en: "In progress" }
  },
  kind: { tool: "TOOL", asset: "ASSET" },
  details: { ja: "くわしく見る", en: "Details" },
  soon: { ja: "準備中", en: "Coming soon" },
  platforms: { ja: "対応環境", en: "Works with" },
  price: { ja: "価格", en: "Price" },

  emptyTools: { ja: "ツールは準備中です。", en: "Tools are coming soon." },
  emptyAssets: {
    ja: "素材は準備中です。公開までお待ちください。",
    en: "Assets are coming soon. Please check back later."
  },
  emptyNotes: { ja: "お知らせはまだありません。", en: "No notes yet." },

  noteFilter: {
    all: { ja: "すべて", en: "All" },
    news: { ja: "お知らせ", en: "News" },
    guide: { ja: "使い方", en: "Guides" }
  },
  noteCategory: {
    news: { ja: "お知らせ", en: "News" },
    guide: { ja: "使い方", en: "Guide" }
  },

  about: {
    usageTitle: { ja: "制作物のご利用について", en: "Using my works" },
    linksTitle: { ja: "リンク", en: "Links" },
    linksLead: {
      ja: "お問い合わせ・ご連絡や、最新情報は、こちらからお願いします。",
      en: "Contact and latest updates are available here."
    }
  },

  footer: { copyright: { ja: "All rights reserved.", en: "All rights reserved." } },

  fatal: {
    ja: "サイトの内容ファイル（js/site-data.js）を読み込めませんでした。直前に編集した場所に、書き間違い（引用符「\"」やカンマ「,」の抜け、「{ }」の閉じ忘れなど）がないか確認してください。元に戻せば、表示されます。",
    en: "Could not load the content file (js/site-data.js). Please check the part you edited last for typos, such as a missing quote, comma or closing brace. Undoing the edit will fix it."
  }
};
