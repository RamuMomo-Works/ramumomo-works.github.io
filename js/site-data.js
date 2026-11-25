/* ============================================================
   RamuMomo Works ─ サイトの内容ファイル（ふだん編集するのは、このファイルだけ）

   ■ 書き換えるときの約束（これだけ守れば大丈夫です）
     1. 「 " 」（ダブルクォーテーション）で囲まれた部分の【中だけ】を書き換えます。
        引用符そのものは消さないでください。
     2. 行の終わりの「 , 」（カンマ）は消さないでください。
     3. 「 { 」と「 } 」、「 [ 」と「 ] 」は、必ずペアで残してください。
     4. 「 // 」から始まる行は、メモです。サイトには表示されません。
     5. 文章の中に「 " 」を入れたいときは、「 」などの別の記号を使ってください。
     6. 日本語は ja、英語は en の欄に書きます。英語を書かなければ、日本語が表示されます。
     7. 書き間違えてサイトが真っ白になったら、直前の編集を元に戻してください。

   ■ ファイルを編集するときは、「メモ帳」や「VS Code」などで開き、
     保存するときの文字コードは UTF-8 にしてください。
     （Wordや「ワードパッド」は使わないでください）
   ============================================================ */

window.SITE_DATA = {

  /* ----------------------------------------------------------
     1. サイトの基本情報
     ---------------------------------------------------------- */
  site: {
    name: "RamuMomo Works",     // サイト名
    author: "RamuMomo",         // 作者名
    defaultLang: "ja",          // 見る人のブラウザの言語がわからないときに表示する言語（"ja" か "en"）
    startYear: 2026,            // フッターの © に出す開始年
    tagline: {
      ja: "個人制作のツールと素材、活動内容を、お届けします。",
      en: "Tools and assets made by an individual creator."
    }
  },

  /* ----------------------------------------------------------
     2. リンク（BOOTH・YouTube・GitHub・X）
        url の "" の中に、https:// から始まるURLを貼り付けます。
        空のままだと「準備中」と表示され、クリックできません。
        （URLが決まってから入れてください。架空のURLは入れないでください）
        リンクは増やせます。1行コピーして、名前（半角英字）・label・url を書き換えます。
        書いた順に、ABOUT ページとページ下に表示されます。
        ※ 最後の行だけは、} のあとにカンマ「 , 」を付けません。
     ---------------------------------------------------------- */
  links: {
    booth:   { label: "BOOTH",   url: "https://ramumomo.booth.pm/" },   // 例："https://〇〇.booth.pm/"
    youtube: { label: "YouTube", url: "https://www.youtube.com/channel/UCZ0jNLGlaBpfzQAsdtZoNVA" },   // 例："https://www.youtube.com/@〇〇"
    Kick:    { label: "Kick",    url: "https://kick.com/nagi-creative-lab" },    // 使わなければ、空のままで大丈夫です
    Twitch:  { label: "Twitch",  url: "https://twitch.tv/nagi_creative_lab" },    // 使わなければ、空のままで大丈夫です
    github:  { label: "GitHub",  url: "" },   // 例："https://github.com/〇〇"
    x:       { label: "X",       url: "https://x.com/NagiCreativeLab" },    // 使わなければ、空のままで大丈夫です
    Discord: { label: "Discord", url: "https://discord.gg/cmHHpuTSWE" }   // 例："https://www.youtube.com/@〇〇"
  },

  /* ----------------------------------------------------------
     3. HOME ページの文章
     ---------------------------------------------------------- */
  home: {
    lead: {
      ja: "RamuMomo Works は、個人で制作しているソフトウェア、ツール、画像素材などを紹介・配布するサイトです。配信や動画制作、3D制作で「ちょっと便利」になるものをつくっています。",
      en: "RamuMomo Works is a site where I introduce and share software, tools and image assets I make as an individual. I make small things that help with streaming, video editing and 3D work."
    },
    // 「活動紹介」の欄です。増やすときは { ... }, のかたまりをコピーして貼り付けます。
    activities: [
      {
        title: { ja: "Pythonツール", en: "Python tools" },
        text: {
          ja: "配信や作業を助ける、小さなツールをつくっています。",
          en: "Small tools that help with streaming and everyday work."
        }
      },
      {
        title: { ja: "Blenderアドオン", en: "Blender add-ons" },
        text: {
          ja: "Blender向けのアドオンを制作しています。",
          en: "Add-ons for Blender."
        }
      },
      {
        title: { ja: "画像素材・小物", en: "Image assets and small goods" },
        text: {
          ja: "画像素材や、便利な小物も、少しずつ追加していく予定です。",
          en: "I plan to add image assets and handy little things over time."
        }
      }
    ]
  },

  /* ----------------------------------------------------------
     4. TOOLS（ソフトウェア・ツール）

        ツールを増やすには：下の { ... }, のかたまり（Ramu_Action）を
        まるごとコピーして、すぐ下に貼り付け、中身を書き換えます。
        ※ かたまりとかたまりの間には、カンマ「 , 」が必要です。

        各項目の意味
          id        … 半角の英数字とハイフンだけ。他の制作物と重ならない名前
          status    … "released"（公開中） / "coming"（公開予定） / "wip"（制作中）
          featured  … true にすると、HOME の「最新の制作物」にも出ます（false なら出ません）
          name      … 制作物の名前
          version   … バージョン（なければ "" のまま）
          image     … 画像。images フォルダに入れた画像を "images/ファイル名.png" の形で指定
                      （ファイル名は、半角の英数字・ハイフン・アンダーバーだけ）
                      空 "" のままなら、名前の頭文字が表示されます
          imageAlt  … 画像の説明（読み上げソフト用。なくても大丈夫です）
          tagline   … 一言の紹介
          description … 説明文
          features  … 特徴の箇条書き（なければ [] のまま）
          platforms … 対応環境（言語を分けず、そのまま表示されます）
          price     … 価格（なければ "" のまま）
          notice    … 注意書き（なければ "" のまま）
          links     … ボタン。url が "" のときは「準備中」と表示されます
                      サイト内のページは "notes.html#〇〇" のように書けます
     ---------------------------------------------------------- */
  tools: [
    {
      id: "ramu-action",
      status: "coming",
      featured: true,
      name: "Ramu_Action",
      version: "v1.5",
      image: "",
      imageAlt: { ja: "", en: "" },
      tagline: {
        ja: "OBS向け キー・マウス操作表示ツール",
        en: "Key and mouse input display for OBS"
      },
      description: {
        ja: "押したショートカットキーやマウス操作を、OBSの配信・録画画面に文字で表示します。VOICEVOXでの読み上げにも対応しています。BOOTHで配布予定です。",
        en: "Shows the keyboard shortcuts and mouse actions you perform on your OBS stream or recording. It can also read them aloud with VOICEVOX. Planned for release on BOOTH."
      },
      features: {
        ja: [
          "Ctrl / Alt / Shift を押しながらの操作を表示（例：Ctrl + K）",
          "Alt + スクロールや Ctrl + ドラッグなど、マウス操作も表示",
          "「Unknown」など、認識できないキーは表示しない",
          "VOICEVOXで、押したキーを読み上げ（任意）",
          "OBSの画面から、一時停止・再開や、日本語／英語の表示切り替えができる"
        ],
        en: [
          "Shows actions made with Ctrl / Alt / Shift (for example: Ctrl + K)",
          "Also shows mouse actions such as Alt + scroll and Ctrl + drag",
          "Ignores unrecognized keys such as \"Unknown\"",
          "Reads keys aloud with VOICEVOX (optional)",
          "Pause and resume, and Japanese / English labels, from the OBS settings screen"
        ]
      },
      platforms: ["Windows", "OBS Studio", "Python 3.12", "VOICEVOX (optional)"],
      price: {
        ja: "基本無料（任意のご支援版あり・予定）",
        en: "Free (an optional support edition is planned)"
      },
      notice: {
        ja: "VOICEVOXの音声を配信や動画で使う場合は、VOICEVOXと各キャラクターの利用規約に従い、クレジット表記が必要です。VOICEVOX本体と音声は同梱していません。",
        en: "If you use VOICEVOX voices in streams or videos, follow the terms of VOICEVOX and of each character, including the required credit. VOICEVOX itself and its voices are not included."
      },
      links: [
        { label: { ja: "BOOTHで入手", en: "Get on BOOTH" }, url: "" },
        { label: { ja: "導入の流れ", en: "Setup overview" }, url: "notes.html#ramu-action-guide" }
      ]
    },

    {
      id: "timer-craft",
      status: "coming",
      featured: true,
      name: "Timer Craft",
      version: "",
      image: "",
      imageAlt: { ja: "", en: "" },
      tagline: {
        ja: "Blender向け カウントダウンタイマーアドオン",
        en: "Countdown timer add-on for Blender"
      },
      description: {
        ja: "Blenderで使える、カウントダウンタイマーのアドオンです。関連する画像素材も、今後追加する予定です。",
        en: "A countdown timer add-on for Blender. Related image assets are planned to be added later."
      },
      features: { ja: [], en: [] },
      platforms: ["Blender"],
      price: { ja: "", en: "" },
      notice: { ja: "", en: "" },
      links: [
        { label: { ja: "配布ページ", en: "Download page" }, url: "" }
      ]
    },

    {
      id: "stream-assistant",
      status: "wip",
      featured: true,
      name: "OBS統合配信アシスタント（仮）",
      version: "",
      image: "",
      imageAlt: { ja: "", en: "" },
      tagline: {
        ja: "OBSだけで、YouTube・Twitch・Kick のチャットをまとめて扱うツール",
        en: "Handle YouTube, Twitch and Kick chat together, all inside OBS"
      },
      description: {
        ja: "ほかのアプリを何個も起動せず、OBSの中だけで、3つの配信サービスのチャットへの一括投稿、コメントのまとめ表示、VOICEVOXでの読み上げ、キャラクターの簡単なリアクションができるOBS用スクリプトです。いまは、自分の配信で試しながら制作中です。",
        en: "An OBS script that lets you post to the chats of three streaming services at once, see comments in one place, read them aloud with VOICEVOX, and show simple character reactions, all inside OBS without running extra apps. I am currently testing it on my own streams."
      },
      features: {
        ja: [
          "1回の入力で、YouTube・Twitch・Kick のチャットにまとめて投稿（送信先は個別に選べる）",
          "YouTube・Twitch のコメントを、OBSのドックにまとめて表示（Kick の受信は準備中）",
          "コメントをVOICEVOXで読み上げ（NGワード・連投・URL・長文の制限つき）",
          "読み上げに合わせて口パクするキャラクター表示（PNG・GIF・APNG・WebMの画像を差し替える方式）",
          "配信開始の挨拶、初めてコメントした人への歓迎、Twitch のレイド・サブスクへのお礼",
          "各サービスの公式APIと公式の認証だけを使用。ログイン情報は Windows の暗号化機能で保存"
        ],
        en: [
          "Type once and post to YouTube, Twitch and Kick chat together (choose each destination)",
          "See YouTube and Twitch comments together in an OBS dock (Kick receiving is in preparation)",
          "Read comments aloud with VOICEVOX, with limits for NG words, spam, URLs and long messages",
          "A character display that lip-syncs to the voice (swaps PNG, GIF, APNG or WebM images)",
          "Greets at stream start, welcomes first-time commenters, and thanks Twitch raids and subs",
          "Uses only the official APIs and sign-in of each service. Sign-in data is stored with Windows encryption"
        ]
      },
      platforms: ["Windows", "OBS Studio 32", "Python 3.12", "VOICEVOX"],
      price: { ja: "未定", en: "Not decided yet" },
      notice: {
        ja: "使うには、YouTube（Google Cloud）・Twitch・Kick それぞれの開発者向けページで、アプリの登録が必要です。VOICEVOXの音声を配信で使う場合は、VOICEVOXと各キャラクターの利用規約に従い、クレジット表記（例：VOICEVOX:東北ずん子）が必要です。VOICEVOX本体と音声は同梱しません。",
        en: "To use it, you need to register an app on the developer pages of YouTube (Google Cloud), Twitch and Kick. If you use VOICEVOX voices in streams, follow the terms of VOICEVOX and of each character, including the required credit (for example: VOICEVOX:Tohoku Zunko). VOICEVOX itself and its voices are not included."
      },
      links: [
        { label: { ja: "制作のお知らせ", en: "Development news" }, url: "notes.html#stream-assistant-wip" }
      ]
    }

    // ↑ ツールを増やすときは、} のあとにカンマ「 , 」を付けて、
    //   上のかたまりをコピーして貼り付けます。
  ],

  /* ----------------------------------------------------------
     5. ASSETS（画像素材・タイマー用素材など）

        いまは、掲載できる素材がないので、空（[ ]）にしてあります。
        追加するときは、下の見本を囲んでいる「メモの記号」（見本の前後にある、
        スラッシュとアスタリスクの行）を消して、中身を書き換えます。
        書き方は TOOLS と同じです。
     ---------------------------------------------------------- */
  assets: [
    /*
    {
      id: "sample-asset",
      status: "coming",
      featured: false,
      name: "素材の名前",
      version: "",
      image: "images/sample-asset.png",
      imageAlt: { ja: "素材の説明", en: "Description of the asset" },
      tagline: { ja: "一言の紹介", en: "One-line summary" },
      description: { ja: "説明文", en: "Description" },
      features: { ja: [], en: [] },
      platforms: ["PNG"],
      price: { ja: "", en: "" },
      notice: { ja: "", en: "" },
      links: [
        { label: { ja: "ダウンロード", en: "Download" }, url: "" }
      ]
    }
    */
  ],

  /* ----------------------------------------------------------
     6. NOTES（お知らせ・使い方）

        新しい記事は、かたまりをコピーして追加します（順番は自動で、日付の新しい順になります）。
          id       … 半角の英数字とハイフンだけ
          date     … "2026-10-31" のように、年-月-日
          category … "news"（お知らせ） か "guide"（使い方）
          title    … タイトル
          body     … 本文。段落ごとに "…" で区切って、カンマでつなぎます
          link     … 記事の最後に付けるボタン（なければ省略できます）
     ---------------------------------------------------------- */
  notes: [
    {
      id: "stream-assistant-wip",
      date: "2026-11-18",
      category: "news",
      title: {
        ja: "OBS統合配信アシスタント（仮）を制作中です",
        en: "Working on a multi-service stream assistant for OBS"
      },
      body: {
        ja: [
          "YouTube・Twitch・Kick のチャットを、OBSの中だけでまとめて扱えるスクリプトを作っています。",
          "外部のアプリを増やさずに、OBSだけで完結させるのが目標です。一括投稿、コメントのまとめ表示、VOICEVOXでの読み上げ、口パクするキャラクター表示まで、少しずつ形になりました。",
          "いまは、自分の配信で実際に使いながら、動作を確かめています。公開の時期や形は、まだ決まっていません。"
        ],
        en: [
          "I am making a script that lets you handle YouTube, Twitch and Kick chat together, all inside OBS.",
          "The goal is to do everything in OBS without adding more apps. Posting to all chats at once, a combined comment view, VOICEVOX readout and a lip-syncing character display are now taking shape.",
          "I am now testing it on my own streams. The release date and form are not decided yet."
        ]
      },
      link: {
        label: { ja: "TOOLS で見る", en: "See it in TOOLS" },
        url: "tools.html#stream-assistant"
      }
    },
    {
      id: "opening",
      date: "2026-10-31",
      category: "news",
      title: { ja: "サイトを開設しました", en: "The site is open" },
      body: {
        ja: [
          "個人制作のツールや素材を紹介・配布するサイトです。",
          "制作物は、少しずつ追加していきます。"
        ],
        en: [
          "This is a site to introduce and share tools and assets I make as an individual.",
          "I will add my works little by little."
        ]
      }
    },
    {
      id: "ramu-action-guide",
      date: "2026-10-31",
      category: "guide",
      title: {
        ja: "Ramu_Action の導入の流れ（概要）",
        en: "Ramu_Action: setup overview"
      },
      body: {
        ja: [
          "必要なもの：Windows、OBS Studio、Python 3.12（64bit）、pynput。読み上げを使う場合は、VOICEVOXも必要です。",
          "1. Python 3.12 をインストールし、pip で pynput を入れます。",
          "2. OBSの「ツール → スクリプト → Python設定」で、Pythonのフォルダを指定します。",
          "3. 文字を表示するための「テキスト (GDI+)」ソースを作ります。",
          "4. ramu_action.py をスクリプトとして読み込み、作ったテキストソースを選びます。",
          "くわしい手順は、配布物に同梱の「使い方.txt」をご覧ください。",
          "VOICEVOXの音声を配信や動画で使う場合は、VOICEVOXと各キャラクターの利用規約に従い、クレジット表記をお願いします。"
        ],
        en: [
          "You need: Windows, OBS Studio, Python 3.12 (64-bit) and pynput. VOICEVOX is also needed if you want voice readout.",
          "1. Install Python 3.12 and add pynput with pip.",
          "2. In OBS, open Tools > Scripts > Python Settings and set the Python folder.",
          "3. Create a \"Text (GDI+)\" source to display the text.",
          "4. Load ramu_action.py as a script and select the text source you created.",
          "For the full steps, see the \"usage guide\" text file included in the download (written in Japanese).",
          "If you use VOICEVOX voices in streams or videos, please follow the terms of VOICEVOX and of each character, including the credit."
        ]
      },
      link: {
        label: { ja: "TOOLS で Ramu_Action を見る", en: "See Ramu_Action in TOOLS" },
        url: "tools.html#ramu-action"
      }
    }
  ],

  /* ----------------------------------------------------------
     7. ABOUT ページの文章
     ---------------------------------------------------------- */
  about: {
    paragraphs: {
      ja: [
        "RamuMomo Works は、RamuMomo が個人で運営している制作サイトです。ソフトウェア、ツール、画像素材などを制作し、紹介・配布しています。",
        "今後も、Pythonツール、画像素材、便利な小物などを、少しずつ増やしていく予定です。"
      ],
      en: [
        "RamuMomo Works is a creative site run by RamuMomo as an individual. I make software, tools and image assets, and introduce and share them here.",
        "I plan to keep adding Python tools, image assets and handy little things over time."
      ]
    },
    usage: {
      ja: [
        "各制作物の利用条件は、配布ページや、同梱の説明書に書かれています。ご利用の前に、ご確認ください。",
        "すべての制作物は、ご自身の責任でご利用ください。"
      ],
      en: [
        "The terms of use for each work are written on its download page or in the included guide. Please read them before use.",
        "Please use all works at your own responsibility."
      ]
    }
  }
};
