// ポートフォリオのファイルツリーデータ

import type { ChangelogEntry, Extension, FileItem, GitCommit } from "@/types"

export const gitHistory: GitCommit[] = [
  {
    hash: "a7f3d2e",
    date: "2024-01-15",
    author: "神宮 章",
    message: "feat: AI機能の実装とチームリード経験を追加",
    company: "Tech Startup Inc.",
    position: "シニアフルスタックエンジニア",
    changes: [
      "AI/MLプロジェクトのリード",
      "チーム規模を5名→12名に拡大",
      "アーキテクチャ設計の主導",
    ],
  },
  {
    hash: "b3c8f91",
    date: "2023-03-20",
    author: "神宮 章",
    message: "feat: Next.js 13移行とパフォーマンス改善",
    company: "Tech Startup Inc.",
    position: "フルスタックエンジニア",
    changes: ["App Routerへの全面移行", "パフォーマンス40%向上", "TypeScript導入100%達成"],
  },
  {
    hash: "c9e2a44",
    date: "2021-06-10",
    author: "神宮 章",
    message: "refactor: SaaSプロダクトの設計刷新",
    company: "Tech Startup Inc.",
    position: "フルスタックエンジニア",
    changes: [
      "マイクロサービスアーキテクチャ導入",
      "CI/CDパイプライン構築",
      "ユーザー数150%増加に貢献",
    ],
  },
  {
    hash: "d1f5b88",
    date: "2020-09-05",
    author: "神宮 章",
    message: "feat: React/Next.jsスタック移行を主導",
    company: "Web Agency Co.",
    position: "フロントエンドエンジニア",
    changes: ["レガシーコードのモダン化", "コンポーネントライブラリ構築", "開発効率30%向上"],
  },
  {
    hash: "e7a9c22",
    date: "2019-04-01",
    author: "神宮 章",
    message: "init: Web開発キャリアスタート",
    company: "Web Agency Co.",
    position: "フロントエンドエンジニア",
    changes: [
      "HTML/CSS/JavaScriptの実務経験",
      "20以上のWebサイト制作",
      "クライアント折衝スキル習得",
    ],
  },
]

export const gitHistory_EN: GitCommit[] = [
  {
    hash: "a7f3d2e",
    date: "2024-01-15",
    author: "Akira Shingu",
    message: "feat: Implement AI features and add team lead experience",
    company: "Tech Startup Inc.",
    position: "Senior Full-Stack Engineer",
    changes: [
      "Led AI/ML projects",
      "Expanded team from 5 to 12 members",
      "Led architecture design",
    ],
  },
  {
    hash: "b3c8f91",
    date: "2023-03-20",
    author: "Akira Shingu",
    message: "feat: Next.js 13 migration and performance improvements",
    company: "Tech Startup Inc.",
    position: "Full-Stack Engineer",
    changes: [
      "Full migration to App Router",
      "40% performance improvement",
      "100% TypeScript adoption",
    ],
  },
  {
    hash: "c9e2a44",
    date: "2021-06-10",
    author: "Akira Shingu",
    message: "refactor: SaaS product architecture redesign",
    company: "Tech Startup Inc.",
    position: "Full-Stack Engineer",
    changes: [
      "Introduced microservices architecture",
      "Built CI/CD pipeline",
      "Contributed to 150% user growth",
    ],
  },
  {
    hash: "d1f5b88",
    date: "2020-09-05",
    author: "Akira Shingu",
    message: "feat: Led React/Next.js stack migration",
    company: "Web Agency Co.",
    position: "Frontend Engineer",
    changes: [
      "Modernized legacy codebase",
      "Built component library",
      "30% development efficiency improvement",
    ],
  },
  {
    hash: "e7a9c22",
    date: "2019-04-01",
    author: "Akira Shingu",
    message: "init: Started web development career",
    company: "Web Agency Co.",
    position: "Frontend Engineer",
    changes: [
      "Practical HTML/CSS/JavaScript experience",
      "Produced 20+ websites",
      "Acquired client negotiation skills",
    ],
  },
]

export const getGitHistory = (locale: string) => (locale === "en" ? gitHistory_EN : gitHistory)

// アプリの変更履歴 (CHANGELOG)
export const changelog: ChangelogEntry[] = [
  {
    version: "2.0.0",
    date: "2024-01-15",
    type: "major",
    title: "VS Code風UIの完全リニューアル",
    changes: [
      { type: "added", description: "VS Code風のエディタUI全面採用" },
      { type: "added", description: "3種類のプレビューテーマ(モダン/革新的/プロフェッショナル)" },
      { type: "added", description: "インタラクティブチュートリアル機能" },
      { type: "improved", description: "レスポンシブデザインの改善" },
    ],
  },
  {
    version: "1.5.0",
    date: "2023-11-20",
    type: "minor",
    title: "拡張機能パネルの追加",
    changes: [
      { type: "added", description: "プロジェクト一覧を拡張機能形式で表示" },
      { type: "added", description: "スクリーンショットギャラリー機能" },
      { type: "added", description: "GitHubリポジトリ/デモサイトへのリンク" },
      { type: "improved", description: "検索機能の精度向上" },
    ],
  },
  {
    version: "1.4.0",
    date: "2023-09-10",
    type: "minor",
    title: "Git履歴ビューの実装",
    changes: [
      { type: "added", description: "キャリア履歴をGitコミット形式で表示" },
      { type: "added", description: "タイムライン形式のUI" },
      { type: "improved", description: "アニメーションの追加" },
    ],
  },
  {
    version: "1.3.0",
    date: "2023-07-05",
    type: "minor",
    title: "ターミナル機能の追加",
    changes: [
      { type: "added", description: "インタラクティブターミナルUI" },
      { type: "added", description: "コマンド履歴機能" },
      { type: "added", description: "help, about, skills コマンド" },
    ],
  },
  {
    version: "1.2.0",
    date: "2023-05-15",
    type: "minor",
    title: "設定パネルの追加",
    changes: [
      { type: "added", description: "背景色/テキスト色/アクセントカラーのカスタマイズ" },
      { type: "added", description: "フォントサイズ調整機能" },
      { type: "improved", description: "設定のローカルストレージ保存" },
    ],
  },
  {
    version: "1.1.0",
    date: "2023-03-20",
    type: "minor",
    title: "検索機能の実装",
    changes: [
      { type: "added", description: "ファイル内容の全文検索" },
      { type: "added", description: "検索結果のハイライト表示" },
      { type: "fixed", description: "ファイルツリーの展開状態の保持" },
    ],
  },
  {
    version: "1.0.0",
    date: "2023-01-10",
    type: "major",
    title: "初回リリース",
    changes: [
      { type: "added", description: "VS Code風ファイルエクスプローラー" },
      { type: "added", description: "Markdownファイルのプレビュー機能" },
      { type: "added", description: "タブ形式のエディタUI" },
    ],
  },
]

export const changelog_EN: ChangelogEntry[] = [
  {
    version: "2.0.0",
    date: "2024-01-15",
    type: "major",
    title: "Complete VS Code-style UI Overhaul",
    changes: [
      { type: "added", description: "Full adoption of VS Code-style editor UI" },
      { type: "added", description: "3 preview themes (Modern/Innovative/Professional)" },
      { type: "added", description: "Interactive tutorial feature" },
      { type: "improved", description: "Responsive design improvements" },
    ],
  },
  {
    version: "1.5.0",
    date: "2023-11-20",
    type: "minor",
    title: "Extension Panel Addition",
    changes: [
      { type: "added", description: "Display projects in extension format" },
      { type: "added", description: "Screenshot gallery feature" },
      { type: "added", description: "Links to GitHub repos/demo sites" },
      { type: "improved", description: "Search accuracy improvement" },
    ],
  },
  {
    version: "1.4.0",
    date: "2023-09-10",
    type: "minor",
    title: "Git History View Implementation",
    changes: [
      { type: "added", description: "Display career history as Git commits" },
      { type: "added", description: "Timeline-style UI" },
      { type: "improved", description: "Added animations" },
    ],
  },
  {
    version: "1.3.0",
    date: "2023-07-05",
    type: "minor",
    title: "Terminal Feature Addition",
    changes: [
      { type: "added", description: "Interactive terminal UI" },
      { type: "added", description: "Command history feature" },
      { type: "added", description: "help, about, skills commands" },
    ],
  },
  {
    version: "1.2.0",
    date: "2023-05-15",
    type: "minor",
    title: "Settings Panel Addition",
    changes: [
      { type: "added", description: "Background/text/accent color customization" },
      { type: "added", description: "Font size adjustment" },
      { type: "improved", description: "Settings saved to localStorage" },
    ],
  },
  {
    version: "1.1.0",
    date: "2023-03-20",
    type: "minor",
    title: "Search Feature Implementation",
    changes: [
      { type: "added", description: "Full-text search of file contents" },
      { type: "added", description: "Search result highlighting" },
      { type: "fixed", description: "File tree expansion state preservation" },
    ],
  },
  {
    version: "1.0.0",
    date: "2023-01-10",
    type: "major",
    title: "Initial Release",
    changes: [
      { type: "added", description: "VS Code-style file explorer" },
      { type: "added", description: "Markdown file preview" },
      { type: "added", description: "Tabbed editor UI" },
    ],
  },
]

export const getChangelog = (locale: string) => (locale === "en" ? changelog_EN : changelog)

export const fileTree: FileItem[] = [
  {
    name: "about",
    type: "folder",
    icon: "folder",
    children: [
      {
        name: "profile.md",
        type: "file",
        icon: "file-text",
        content: `# プロフィール

## 自己紹介

こんにちは!私はフルスタックエンジニアです。

### スキル
- **フロントエンド**: React, Next.js, TypeScript, Tailwind CSS
- **バックエンド**: Node.js, Python, Go
- **データベース**: PostgreSQL, MongoDB, Redis
- **インフラ**: AWS, Docker, Kubernetes

### 経験
- 5年以上のWeb開発経験
- 大規模なSaaSプロダクトの開発経験
- アジャイル開発チームでのリード経験

### 趣味
- オープンソースへの貢献
- 技術ブログの執筆
- ハッカソンへの参加`,
      },
      {
        name: "strong-points.md",
        type: "file",
        icon: "zap",
        content: `# 強み・アピールポイント

## 技術的な強み

### 1. フルスタック開発力
フロントエンドからバックエンド、インフラまで一貫して対応可能。
プロジェクト全体を俯瞰した設計・実装ができます。

### 2. モダン技術への適応力
- Next.js 14 App Router / Server Actions
- TypeScript 厳密モード での開発
- tRPC を用いた型安全なAPI設計
- 最新のReact機能（Server Components, Suspense）

### 3. パフォーマンス最適化
- Core Web Vitals を意識した実装
- バンドルサイズの最適化
- データベースクエリの最適化経験

## ソフトスキル

### コミュニケーション
- 非エンジニアへの技術説明が得意
- ドキュメント作成を重視
- チーム間の橋渡し役として活躍

### 問題解決
- 複雑な問題を分解して対処
- 根本原因の特定と恒久対策の提案
- 技術的負債の計画的な解消

### リーダーシップ
- 12名規模のチームリード経験
- コードレビュー文化の醸成
- メンバーの成長をサポート

## 実績ハイライト

| 指標 | 成果 |
|------|------|
| パフォーマンス改善 | 読み込み時間 **40%短縮** |
| ユーザー数増加 | **150%** の成長に貢献 |
| 開発効率 | チーム生産性 **30%向上** |
| 技術ブログ | 月間 **10万PV** 達成 |`,
      },
      {
        name: "faq.md",
        type: "file",
        icon: "help-circle",
        content: `# よくある質問 (FAQ)

## 業務について

### Q: リモートワークは可能ですか？
**A:** はい、完全リモートでの業務に対応しています。
オンラインでのコミュニケーションツール（Slack, Discord, Teams等）を活用し、
円滑なやり取りを心がけています。

### Q: 稼働時間はどのくらいですか？
**A:** 週20〜40時間での稼働が可能です。
プロジェクトの状況に応じて柔軟に対応いたします。

### Q: 副業・業務委託での参画は可能ですか？
**A:** はい、対応可能です。
契約形態についてはご相談ください。

## 技術について

### Q: 対応可能な技術スタックは？
**A:** 主に以下の技術に対応しています：
- **フロントエンド**: React, Next.js, TypeScript, Vue.js
- **バックエンド**: Node.js, Python, Go
- **データベース**: PostgreSQL, MongoDB, Redis, Supabase
- **インフラ**: AWS, GCP, Vercel, Docker

### Q: 新しい技術のキャッチアップは可能ですか？
**A:** はい、積極的に新技術を学習しています。
プロジェクトで必要な技術は事前にキャッチアップして対応いたします。

### Q: 設計から実装まで一人で対応できますか？
**A:** はい、要件定義から設計、実装、テスト、デプロイまで
一貫して対応可能です。

## 料金について

### Q: 時間単価はいくらですか？
**A:** プロジェクトの内容や期間により変動します。
詳細はお問い合わせください。

### Q: 見積もりは無料ですか？
**A:** はい、お見積もりは無料で承っております。
お気軽にご相談ください。

## その他

### Q: ポートフォリオのソースコードは公開していますか？
**A:** はい、GitHubで公開しています。
実際のコードを見ていただくことで、
コーディングスタイルを確認いただけます。

### Q: 面談は可能ですか？
**A:** はい、オンラインでの面談に対応しています。
お気軽にお申し付けください。`,
      },
      {
        name: "experience.json",
        type: "file",
        icon: "braces",
        content: `{
  "workExperience": [
    {
      "company": "Tech Startup Inc.",
      "position": "シニアフルスタックエンジニア",
      "period": "2021年4月 - 現在",
      "startYear": 2021,
      "startMonth": 4,
      "endYear": null,
      "description": "SaaSプロダクトの設計と開発をリード。プロダクトのアーキテクチャ設計から実装、チームマネジメントまで一貫して担当。",
      "techStack": ["Next.js", "TypeScript", "PostgreSQL", "AWS", "Docker", "Terraform", "tRPC", "Prisma"],
      "role": "テックリード / フルスタック",
      "teamSize": 12,
      "achievements": [
        "新機能開発により、ユーザー数を150%増加",
        "パフォーマンス最適化により、読み込み時間を40%短縮",
        "CI/CDパイプラインの構築と改善",
        "マイクロサービスアーキテクチャへの段階的移行を設計・実行"
      ],
      "details": "入社時はフロントエンドエンジニアとして参画。半年後にテックリードに昇格し、バックエンドを含むプロダクト全体の技術的意思決定を担当。特にNext.js App Routerへの移行とtRPCの導入により、開発生産性を大幅に向上させた。"
    },
    {
      "company": "Web Agency Co.",
      "position": "フロントエンドエンジニア",
      "period": "2019年4月 - 2021年3月",
      "startYear": 2019,
      "startMonth": 4,
      "endYear": 2021,
      "endMonth": 3,
      "description": "クライアントのWebサイトとアプリケーション開発を担当。受託開発を中心に幅広い業界のプロジェクトに従事。",
      "techStack": ["React", "Next.js", "Vue.js", "SCSS", "Node.js", "Firebase"],
      "role": "フロントエンドエンジニア",
      "teamSize": 5,
      "achievements": [
        "20以上のプロジェクトを納品",
        "React/Next.jsへの技術スタック移行を主導",
        "コードレビュー文化の確立"
      ],
      "details": "新卒入社後、HTML/CSS/jQueryベースの開発からスタートし、React/Next.jsへの技術移行を提案・主導。社内の技術基盤をモダン化し、開発効率を2倍以上に改善。コードレビューのガイドライン策定やJr.エンジニアの育成にも注力。"
    },
    {
      "company": "フリーランス",
      "position": "Webデベロッパー",
      "period": "2020年10月 - 2021年6月",
      "startYear": 2020,
      "startMonth": 10,
      "endYear": 2021,
      "endMonth": 6,
      "description": "本業と並行して個人でWeb開発案件を受注。副業としてスタートアップのMVP開発を支援。",
      "techStack": ["Next.js", "Tailwind CSS", "Supabase", "Vercel", "Stripe"],
      "role": "フルスタックエンジニア",
      "teamSize": 1,
      "achievements": [
        "3つのMVPを短期間で開発・リリース",
        "Stripe決済統合の実装",
        "Supabaseを活用したリアルタイム機能の構築"
      ],
      "details": "Web Agency Co.在籍中に副業として開始。スタートアップのMVP開発を中心に、企画段階から技術選定・実装・デプロイまでワンストップで対応。この経験がフルスタックエンジニアへの転向のきっかけとなった。"
    }
  ],
  "education": {
    "degree": "情報工学学士",
    "university": "○○大学",
    "year": "2019年卒業",
    "startYear": 2015,
    "endYear": 2019,
    "details": "情報工学を専攻。卒業研究ではWebアクセシビリティに関する研究を実施。在学中にインターンシップでWeb開発の実務経験を積む。"
  }
}`,
      },
    ],
  },
  {
    name: "projects",
    type: "folder",
    icon: "folder",
    children: [
      {
        name: "README.md",
        type: "file",
        icon: "book-open",
        content: `# プロジェクト一覧

このフォルダには、私が開発した主要なプロジェクトが含まれています。
詳細は拡張機能パネルからご確認ください。

## Featured Projects

### Next.js Eコマースプラットフォーム v2.1.0
Next.js 14とSupabaseを使用した完全なEコマースソリューション。
Stripe決済、在庫管理、ユーザー認証などの機能を備えた実用的なプラットフォーム。

**Technologies:** Next.js, TypeScript, Supabase, Stripe, Tailwind CSS
**Downloads:** 15,000+ | **Rating:** 4.8/5

---

### リアルタイムチャットアプリ v1.5.3
WebSocketを使用した高性能なリアルタイムコミュニケーションプラットフォーム。
プライベート/グループチャット、ファイル共有、通知機能を実装。

**Technologies:** React, Node.js, Socket.io, MongoDB, Redis
**Downloads:** 8,500+ | **Rating:** 4.6/5

---

### プロジェクト管理ツール v3.0.1
チーム向けの包括的なプロジェクト管理システム。
かんばんボード、ガントチャート、タスク管理、リアルタイムコラボレーション機能を提供。

**Technologies:** Next.js, tRPC, Prisma, PostgreSQL, Zustand
**Downloads:** 12,000+ | **Rating:** 4.9/5

---

### React UIコンポーネントライブラリ v1.8.0
再利用可能でアクセシブルなReactコンポーネントライブラリ。
Tailwind CSSベースで、ダークモード、テーマカスタマイズをサポート。

**Technologies:** React, TypeScript, Tailwind CSS, Storybook
**Downloads:** 25,000+ | **Rating:** 4.7/5

---

## More Projects

- AI コンテンツジェネレーター - OpenAI APIを使用したコンテンツ生成ツール
- 画像最適化API - 高速な画像変換・圧縮APIサービス

すべてのプロジェクトはGitHubで公開されており、デモもご覧いただけます。`,
      },
    ],
  },
  {
    name: "skills.json",
    type: "file",
    icon: "braces",
    content: `{
  "frontend": {
    "frameworks": [
      { "name": "React", "level": 95, "years": 5 },
      { "name": "Next.js", "level": 90, "years": 4 },
      { "name": "Vue.js", "level": 75, "years": 2 },
      { "name": "TypeScript", "level": 90, "years": 4 }
    ],
    "styling": [
      { "name": "Tailwind CSS", "level": 95, "years": 4 },
      { "name": "CSS/SCSS", "level": 90, "years": 6 },
      { "name": "Styled Components", "level": 80, "years": 3 }
    ],
    "tools": [
      "Webpack",
      "Vite",
      "ESLint",
      "Prettier"
    ]
  },
  "backend": {
    "languages": [
      { "name": "Node.js", "level": 90, "years": 5 },
      { "name": "Python", "level": 80, "years": 3 },
      { "name": "Go", "level": 70, "years": 2 }
    ],
    "frameworks": [
      "Express",
      "NestJS",
      "FastAPI",
      "tRPC"
    ],
    "databases": [
      { "name": "PostgreSQL", "level": 85 },
      { "name": "MongoDB", "level": 80 },
      { "name": "Redis", "level": 75 },
      { "name": "Supabase", "level": 85 }
    ]
  },
  "devops": {
    "cloud": ["AWS", "Vercel", "Heroku", "DigitalOcean"],
    "containers": ["Docker", "Kubernetes"],
    "cicd": ["GitHub Actions", "GitLab CI", "CircleCI"],
    "monitoring": ["DataDog", "Sentry", "LogRocket"]
  },
  "other": {
    "versionControl": ["Git", "GitHub", "GitLab"],
    "methodology": ["Agile", "Scrum", "TDD"],
    "design": ["Figma", "Adobe XD"]
  }
}`,
  },
  {
    name: "contact.md",
    type: "file",
    icon: "mail",
    content: `# お問い合わせ

## 連絡方法

お仕事のご依頼やご相談など、お気軽にお問い合わせください。

### メール
contact@example.com

### SNS・リンク

- **GitHub**: [github.com/yourusername](https://github.com/yourusername)
- **Twitter/X**: [@yourusername](https://twitter.com/yourusername)
- **LinkedIn**: [linkedin.com/in/yourprofile](https://linkedin.com/in/yourprofile)
- **ポートフォリオ**: [yourportfolio.com](https://yourportfolio.com)

### 対応可能な業務

- Webアプリケーション開発
- フロントエンド開発(React/Next.js)
- バックエンド開発(Node.js/Python)
- 技術コンサルティング
- コードレビューとリファクタリング
- 技術記事執筆

### 稼働状況

現在、フリーランスとして活動しており、新規プロジェクトのご相談を受け付けております。

**レスポンス時間**: 通常24時間以内に返信いたします。

---

## よくある質問

**Q: リモートワークは可能ですか?**  
A: はい、完全リモートでの業務に対応しています。

**Q: 時間単価はいくらですか?**  
A: プロジェクトの内容により変動します。詳細はお問い合わせください。

**Q: 小規模プロジェクトも対応可能ですか?**  
A: はい、小規模から大規模まで、幅広く対応可能です。

ご連絡お待ちしております!`,
  },
  {
    name: "config.yaml",
    type: "file",
    icon: "settings",
    content: `# ポートフォリオ設定

site:
  title: "Developer Portfolio"
  description: "フルスタックエンジニアのポートフォリオサイト"
  author: "神宮 章"
  url: "https://yourportfolio.com"

theme:
  primaryColor: "#007ACC"
  darkMode: true
  font: "Geist"

social:
  github: "yourusername"
  twitter: "yourusername"
  linkedin: "yourprofile"
  email: "contact@example.com"

features:
  blog: true
  projects: true
  resume: true
  contact: true

seo:
  keywords:
    - "フルスタックエンジニア"
    - "React"
    - "Next.js"
    - "TypeScript"
  ogImage: "/og-image.png"
  twitterCard: "summary_large_image"`,
  },
]

export const fileTree_EN: FileItem[] = [
  {
    name: "about",
    type: "folder",
    icon: "folder",
    children: [
      {
        name: "profile.md",
        type: "file",
        icon: "file-text",
        content: `# Profile

## About Me

Hello! I'm a full-stack engineer.

### Skills
- **Frontend**: React, Next.js, TypeScript, Tailwind CSS
- **Backend**: Node.js, Python, Go
- **Databases**: PostgreSQL, MongoDB, Redis
- **Infrastructure**: AWS, Docker, Kubernetes

### Experience
- 5+ years of web development experience
- Large-scale SaaS product development
- Team lead in agile development

### Interests
- Contributing to open source
- Writing technical blog posts
- Participating in hackathons`,
      },
      {
        name: "strong-points.md",
        type: "file",
        icon: "zap",
        content: `# Strengths & Highlights

## Technical Strengths

### 1. Full-Stack Development
Capable of handling everything from frontend to backend and infrastructure.
Can design and implement with a holistic project perspective.

### 2. Modern Tech Adaptability
- Next.js 14 App Router / Server Actions
- TypeScript strict mode development
- Type-safe API design with tRPC
- Latest React features (Server Components, Suspense)

### 3. Performance Optimization
- Core Web Vitals-conscious implementation
- Bundle size optimization
- Database query optimization experience

## Soft Skills

### Communication
- Good at explaining technical concepts to non-engineers
- Documentation-oriented approach
- Bridge between teams

### Problem Solving
- Breaking down complex problems
- Root cause identification and permanent solutions
- Systematic technical debt resolution

### Leadership
- Led a team of 12 members
- Fostered code review culture
- Supported team members' growth

## Achievement Highlights

| Metric | Result |
|--------|--------|
| Performance Improvement | **40% faster** load times |
| User Growth | Contributed to **150%** growth |
| Development Efficiency | **30% improvement** in team productivity |
| Technical Blog | **100K monthly PV** achieved |`,
      },
      {
        name: "faq.md",
        type: "file",
        icon: "help-circle",
        content: `# Frequently Asked Questions (FAQ)

## About Work

### Q: Are you available for remote work?
**A:** Yes, I am fully available for remote work.
I use communication tools (Slack, Discord, Teams, etc.) to ensure smooth collaboration.

### Q: How many hours can you work per week?
**A:** I can work 20-40 hours per week.
I am flexible depending on project needs.

### Q: Can you work as a side job or contract?
**A:** Yes, I can.
Please contact me to discuss contract details.

## About Technology

### Q: What tech stack do you support?
**A:** I primarily work with the following technologies:
- **Frontend**: React, Next.js, TypeScript, Vue.js
- **Backend**: Node.js, Python, Go
- **Databases**: PostgreSQL, MongoDB, Redis, Supabase
- **Infrastructure**: AWS, GCP, Vercel, Docker

### Q: Can you quickly learn new technologies?
**A:** Yes, I actively learn new technologies.
I can catch up on required technologies before project kickoff.

### Q: Can you handle everything from design to implementation alone?
**A:** Yes, I can handle the entire process from requirements definition,
design, implementation, testing, to deployment.

## About Pricing

### Q: What is your hourly rate?
**A:** It varies depending on the project scope and duration.
Please contact me for details.

### Q: Is the estimate free?
**A:** Yes, estimates are provided free of charge.
Feel free to reach out.

## Other

### Q: Is the portfolio source code public?
**A:** Yes, it is available on GitHub.
You can check my coding style by viewing the actual code.

### Q: Is an interview possible?
**A:** Yes, I am available for online interviews.
Feel free to request one.`,
      },
      {
        name: "experience.json",
        type: "file",
        icon: "braces",
        content: `{
  "workExperience": [
    {
      "company": "Tech Startup Inc.",
      "position": "Senior Full-Stack Engineer",
      "period": "Apr 2021 - Present",
      "startYear": 2021,
      "startMonth": 4,
      "endYear": null,
      "description": "Led the design and development of a SaaS product. Responsible for everything from architecture design to implementation and team management.",
      "techStack": ["Next.js", "TypeScript", "PostgreSQL", "AWS", "Docker", "Terraform", "tRPC", "Prisma"],
      "role": "Tech Lead / Full-Stack",
      "teamSize": 12,
      "achievements": [
        "Increased user count by 150% through new feature development",
        "Reduced load times by 40% through performance optimization",
        "Built and improved CI/CD pipeline",
        "Designed and executed gradual migration to microservices architecture"
      ],
      "details": "Joined as a frontend engineer. Promoted to tech lead after six months, taking charge of technical decisions across the entire product including backend. Significantly improved development productivity through Next.js App Router migration and tRPC adoption."
    },
    {
      "company": "Web Agency Co.",
      "position": "Frontend Engineer",
      "period": "Apr 2019 - Mar 2021",
      "startYear": 2019,
      "startMonth": 4,
      "endYear": 2021,
      "endMonth": 3,
      "description": "Handled client website and application development. Worked on projects across a wide range of industries, primarily in contract development.",
      "techStack": ["React", "Next.js", "Vue.js", "SCSS", "Node.js", "Firebase"],
      "role": "Frontend Engineer",
      "teamSize": 5,
      "achievements": [
        "Delivered 20+ projects",
        "Led the tech stack migration to React/Next.js",
        "Established code review culture"
      ],
      "details": "Started with HTML/CSS/jQuery-based development after joining as a new graduate. Proposed and led the technology migration to React/Next.js. Modernized the company's technical foundation and improved development efficiency by more than 2x. Also focused on creating code review guidelines and mentoring junior engineers."
    },
    {
      "company": "Freelance",
      "position": "Web Developer",
      "period": "Oct 2020 - Jun 2021",
      "startYear": 2020,
      "startMonth": 10,
      "endYear": 2021,
      "endMonth": 6,
      "description": "Took on web development projects independently alongside my main job. Supported startup MVP development as a side project.",
      "techStack": ["Next.js", "Tailwind CSS", "Supabase", "Vercel", "Stripe"],
      "role": "Full-Stack Engineer",
      "teamSize": 1,
      "achievements": [
        "Developed and launched 3 MVPs in a short period",
        "Implemented Stripe payment integration",
        "Built real-time features using Supabase"
      ],
      "details": "Started as a side project while at Web Agency Co. Provided end-to-end support from planning, technology selection, implementation, to deployment, primarily for startup MVP development. This experience became the catalyst for transitioning to a full-stack engineer role."
    }
  ],
  "education": {
    "degree": "B.S. in Computer Science",
    "university": "XX University",
    "year": "Graduated 2019",
    "startYear": 2015,
    "endYear": 2019,
    "details": "Majored in Computer Science. Conducted research on web accessibility for the graduation thesis. Gained practical web development experience through internships during studies."
  }
}`,
      },
    ],
  },
  {
    name: "projects",
    type: "folder",
    icon: "folder",
    children: [
      {
        name: "README.md",
        type: "file",
        icon: "book-open",
        content: `# Project List

This folder contains the major projects I have developed.
Please check the extension panel for details.

## Featured Projects

### Next.js E-Commerce Platform v2.1.0
A complete e-commerce solution built with Next.js 14 and Supabase.
A practical platform featuring Stripe payments, inventory management, and user authentication.

**Technologies:** Next.js, TypeScript, Supabase, Stripe, Tailwind CSS
**Downloads:** 15,000+ | **Rating:** 4.8/5

---

### Real-Time Chat App v1.5.3
A high-performance real-time communication platform using WebSocket.
Features private/group chat, file sharing, and notifications.

**Technologies:** React, Node.js, Socket.io, MongoDB, Redis
**Downloads:** 8,500+ | **Rating:** 4.6/5

---

### Project Management Tool v3.0.1
A comprehensive project management system for teams.
Features Kanban boards, Gantt charts, task management, and real-time collaboration.

**Technologies:** Next.js, tRPC, Prisma, PostgreSQL, Zustand
**Downloads:** 12,000+ | **Rating:** 4.9/5

---

### React UI Component Library v1.8.0
A reusable and accessible React component library.
Tailwind CSS-based with dark mode and theme customization support.

**Technologies:** React, TypeScript, Tailwind CSS, Storybook
**Downloads:** 25,000+ | **Rating:** 4.7/5

---

## More Projects

- AI Content Generator - Content generation tool using OpenAI API
- Image Optimization API - High-speed image conversion and compression API service

All projects are publicly available on GitHub, and demos are also available.`,
      },
    ],
  },
  {
    name: "skills.json",
    type: "file",
    icon: "braces",
    content: `{
  "frontend": {
    "frameworks": [
      { "name": "React", "level": 95, "years": 5 },
      { "name": "Next.js", "level": 90, "years": 4 },
      { "name": "Vue.js", "level": 75, "years": 2 },
      { "name": "TypeScript", "level": 90, "years": 4 }
    ],
    "styling": [
      { "name": "Tailwind CSS", "level": 95, "years": 4 },
      { "name": "CSS/SCSS", "level": 90, "years": 6 },
      { "name": "Styled Components", "level": 80, "years": 3 }
    ],
    "tools": [
      "Webpack",
      "Vite",
      "ESLint",
      "Prettier"
    ]
  },
  "backend": {
    "languages": [
      { "name": "Node.js", "level": 90, "years": 5 },
      { "name": "Python", "level": 80, "years": 3 },
      { "name": "Go", "level": 70, "years": 2 }
    ],
    "frameworks": [
      "Express",
      "NestJS",
      "FastAPI",
      "tRPC"
    ],
    "databases": [
      { "name": "PostgreSQL", "level": 85 },
      { "name": "MongoDB", "level": 80 },
      { "name": "Redis", "level": 75 },
      { "name": "Supabase", "level": 85 }
    ]
  },
  "devops": {
    "cloud": ["AWS", "Vercel", "Heroku", "DigitalOcean"],
    "containers": ["Docker", "Kubernetes"],
    "cicd": ["GitHub Actions", "GitLab CI", "CircleCI"],
    "monitoring": ["DataDog", "Sentry", "LogRocket"]
  },
  "other": {
    "versionControl": ["Git", "GitHub", "GitLab"],
    "methodology": ["Agile", "Scrum", "TDD"],
    "design": ["Figma", "Adobe XD"]
  }
}`,
  },
  {
    name: "contact.md",
    type: "file",
    icon: "mail",
    content: `# Contact

## How to Reach Me

Feel free to contact me for work inquiries or consultations.

### Email
contact@example.com

### Social & Links

- **GitHub**: [github.com/yourusername](https://github.com/yourusername)
- **Twitter/X**: [@yourusername](https://twitter.com/yourusername)
- **LinkedIn**: [linkedin.com/in/yourprofile](https://linkedin.com/in/yourprofile)
- **Portfolio**: [yourportfolio.com](https://yourportfolio.com)

### Available Services

- Web application development
- Frontend development (React/Next.js)
- Backend development (Node.js/Python)
- Technical consulting
- Code review and refactoring
- Technical writing

### Availability

Currently working as a freelancer and accepting new project inquiries.

**Response time**: I typically reply within 24 hours.

---

## FAQ

**Q: Are you available for remote work?**
A: Yes, I am fully available for remote work.

**Q: What is your hourly rate?**
A: It varies depending on the project. Please contact me for details.

**Q: Can you handle small-scale projects?**
A: Yes, I can handle projects of all sizes, from small to large.

Looking forward to hearing from you!`,
  },
  {
    name: "config.yaml",
    type: "file",
    icon: "settings",
    content: `# Portfolio Configuration

site:
  title: "Developer Portfolio"
  description: "Full-stack engineer's portfolio site"
  author: "Akira Shingu"
  url: "https://yourportfolio.com"

theme:
  primaryColor: "#007ACC"
  darkMode: true
  font: "Geist"

social:
  github: "yourusername"
  twitter: "yourusername"
  linkedin: "yourprofile"
  email: "contact@example.com"

features:
  blog: true
  projects: true
  resume: true
  contact: true

seo:
  keywords:
    - "Full-Stack Engineer"
    - "React"
    - "Next.js"
    - "TypeScript"
  ogImage: "/og-image.png"
  twitterCard: "summary_large_image"`,
  },
]

export const getFileTree = (locale: string) => (locale === "en" ? fileTree_EN : fileTree)

export const extensions: Extension[] = [
  {
    id: "nextjs-ecommerce",
    name: "nextjs-ecommerce",
    displayName: "Next.js Eコマースプラットフォーム",
    description:
      "Next.js 14とSupabaseを使用した完全なEコマースソリューション。Stripe決済、在庫管理、ユーザー認証などの機能を備えた実用的なプラットフォーム。",
    version: "2.1.0",
    publisher: "神宮 章",
    icon: "shopping-cart",
    categories: ["フルスタック", "Eコマース"],
    tags: ["Next.js", "TypeScript", "Supabase", "Stripe", "Tailwind CSS"],
    downloads: 15000,
    rating: 4.8,
    repository: "https://github.com/yourusername/nextjs-ecommerce",
    homepage: "https://ecommerce-demo.example.com",
    features: [
      "商品管理と在庫システム",
      "Stripe決済統合",
      "ユーザー認証と注文履歴",
      "レスポンシブデザイン",
      "管理者ダッシュボード",
    ],
    screenshots: [
      "/ecommerce-homepage-with-products-grid.jpg",
      "/shopping-cart-checkout-page.jpg",
      "/admin-dashboard-analytics.jpg",
      "/product-detail-page-with-reviews.jpg",
    ],
  },
  {
    id: "realtime-chat",
    name: "realtime-chat",
    displayName: "リアルタイムチャットアプリ",
    description:
      "WebSocketを使用した高性能なリアルタイムコミュニケーションプラットフォーム。プライベート/グループチャット、ファイル共有、通知機能を実装。",
    version: "1.5.3",
    publisher: "神宮 章",
    icon: "message-circle",
    categories: ["フルスタック", "リアルタイム"],
    tags: ["React", "Node.js", "Socket.io", "MongoDB", "Redis"],
    downloads: 8500,
    rating: 4.6,
    repository: "https://github.com/yourusername/realtime-chat",
    homepage: "https://chat-demo.example.com",
    features: [
      "リアルタイムメッセージング",
      "プライベートとグループチャット",
      "ファイル共有機能",
      "オンラインステータス表示",
      "既読・未読管理",
    ],
    screenshots: [
      "/chat-application-with-message-bubbles.jpg",
      "/group-chat-room-with-multiple-users.jpg",
      "/file-sharing-interface-in-chat.jpg",
      "/user-profile-settings-page.jpg",
    ],
  },
  {
    id: "project-management",
    name: "project-management",
    displayName: "プロジェクト管理ツール",
    description:
      "チーム向けの包括的なプロジェクト管理システム。かんばんボード、ガントチャート、タスク管理、リアルタイムコラボレーション機能を提供。",
    version: "3.0.1",
    publisher: "神宮 章",
    icon: "layout-dashboard",
    categories: ["フルスタック", "生産性"],
    tags: ["Next.js", "tRPC", "Prisma", "PostgreSQL", "Zustand"],
    downloads: 12000,
    rating: 4.9,
    repository: "https://github.com/yourusername/project-manager",
    homepage: "https://pm-demo.example.com",
    features: [
      "かんばんボードとガントチャート",
      "タスク管理と進捗追跡",
      "チームコラボレーション機能",
      "リアルタイム通知",
      "カスタマイズ可能なワークフロー",
    ],
    screenshots: [
      "/kanban-board-with-task-cards.jpg",
      "/gantt-chart-project-timeline.jpg",
      "/team-collaboration-dashboard.png",
      "/task-detail-modal-with-comments.jpg",
    ],
  },
  {
    id: "design-system",
    name: "design-system",
    displayName: "React UIコンポーネントライブラリ",
    description:
      "再利用可能でアクセシブルなReactコンポーネントライブラリ。Tailwind CSSベースで、ダークモード、テーマカスタマイズをサポート。",
    version: "1.8.0",
    publisher: "神宮 章",
    icon: "palette",
    categories: ["フロントエンド", "UIライブラリ"],
    tags: ["React", "TypeScript", "Tailwind CSS", "Storybook", "Accessibility"],
    downloads: 25000,
    rating: 4.7,
    repository: "https://github.com/yourusername/ui-library",
    homepage: "https://ui-docs.example.com",
    features: [
      "50以上のコンポーネント",
      "完全なTypeScriptサポート",
      "WCAG 2.1 AAレベル準拠",
      "ダークモード対応",
      "Storybookドキュメント",
    ],
    screenshots: [
      "/component-library-storybook-documentation.jpg",
      "/button-variants-showcase.jpg",
      "/form-components-with-validation.jpg",
      "/dark-mode-theme-toggle.jpg",
    ],
  },
  {
    id: "ai-content-generator",
    name: "ai-content-generator",
    displayName: "AI コンテンツジェネレーター",
    description:
      "OpenAI APIを使用したコンテンツ生成ツール。ブログ記事、SNS投稿、マーケティングコピーなどを自動生成。",
    version: "1.2.5",
    publisher: "神宮 章",
    icon: "sparkles",
    categories: ["AI/ML", "ツール"],
    tags: ["Next.js", "OpenAI", "TypeScript", "Prisma"],
    downloads: 6200,
    rating: 4.5,
    repository: "https://github.com/yourusername/ai-content-gen",
    homepage: "https://ai-content.example.com",
    features: [
      "複数のコンテンツタイプに対応",
      "カスタマイズ可能なプロンプト",
      "履歴管理と保存",
      "エクスポート機能",
      "トーン調整機能",
    ],
    screenshots: [
      "/placeholder.svg?height=400&width=700",
      "/placeholder.svg?height=400&width=700",
      "/placeholder.svg?height=400&width=700",
      "/placeholder.svg?height=400&width=700",
    ],
  },
  {
    id: "image-optimizer",
    name: "image-optimizer",
    displayName: "画像最適化API",
    description:
      "高速な画像変換・圧縮APIサービス。複数フォーマット対応、リサイズ、WebP変換などの機能を提供。",
    version: "2.3.0",
    publisher: "神宮 章",
    icon: "image",
    categories: ["バックエンド", "API"],
    tags: ["Node.js", "Sharp", "Express", "Docker"],
    downloads: 10500,
    rating: 4.8,
    repository: "https://github.com/yourusername/image-optimizer",
    homepage: "https://api-docs.example.com",
    features: [
      "複数の画像フォーマットをサポート",
      "バッチ処理対応",
      "WebP/AVIF変換",
      "リサイズとクロップ",
      "RESTful API",
    ],
    screenshots: [
      "/placeholder.svg?height=400&width=700",
      "/placeholder.svg?height=400&width=700",
      "/placeholder.svg?height=400&width=700",
      "/placeholder.svg?height=400&width=700",
    ],
  },
]

export const extensions_EN: Extension[] = [
  {
    id: "nextjs-ecommerce",
    name: "nextjs-ecommerce",
    displayName: "Next.js E-Commerce Platform",
    description:
      "A complete e-commerce solution built with Next.js 14 and Supabase. Features Stripe payments, inventory management, and user authentication.",
    version: "2.1.0",
    publisher: "Akira Shingu",
    icon: "shopping-cart",
    categories: ["Full-Stack", "E-Commerce"],
    tags: ["Next.js", "TypeScript", "Supabase", "Stripe", "Tailwind CSS"],
    downloads: 15000,
    rating: 4.8,
    repository: "https://github.com/yourusername/nextjs-ecommerce",
    homepage: "https://ecommerce-demo.example.com",
    features: [
      "Product management & inventory system",
      "Stripe payment integration",
      "User authentication & order history",
      "Responsive design",
      "Admin dashboard",
    ],
    screenshots: [
      "/ecommerce-homepage-with-products-grid.jpg",
      "/shopping-cart-checkout-page.jpg",
      "/admin-dashboard-analytics.jpg",
      "/product-detail-page-with-reviews.jpg",
    ],
  },
  {
    id: "realtime-chat",
    name: "realtime-chat",
    displayName: "Real-Time Chat App",
    description:
      "A high-performance real-time communication platform using WebSocket. Features private/group chat, file sharing, and notifications.",
    version: "1.5.3",
    publisher: "Akira Shingu",
    icon: "message-circle",
    categories: ["Full-Stack", "Real-Time"],
    tags: ["React", "Node.js", "Socket.io", "MongoDB", "Redis"],
    downloads: 8500,
    rating: 4.6,
    repository: "https://github.com/yourusername/realtime-chat",
    homepage: "https://chat-demo.example.com",
    features: [
      "Real-time messaging",
      "Private and group chat",
      "File sharing",
      "Online status display",
      "Read/unread management",
    ],
    screenshots: [
      "/chat-application-with-message-bubbles.jpg",
      "/group-chat-room-with-multiple-users.jpg",
      "/file-sharing-interface-in-chat.jpg",
      "/user-profile-settings-page.jpg",
    ],
  },
  {
    id: "project-management",
    name: "project-management",
    displayName: "Project Management Tool",
    description:
      "A comprehensive project management system for teams. Features Kanban boards, Gantt charts, task management, and real-time collaboration.",
    version: "3.0.1",
    publisher: "Akira Shingu",
    icon: "layout-dashboard",
    categories: ["Full-Stack", "Productivity"],
    tags: ["Next.js", "tRPC", "Prisma", "PostgreSQL", "Zustand"],
    downloads: 12000,
    rating: 4.9,
    repository: "https://github.com/yourusername/project-manager",
    homepage: "https://pm-demo.example.com",
    features: [
      "Kanban boards & Gantt charts",
      "Task management & progress tracking",
      "Team collaboration features",
      "Real-time notifications",
      "Customizable workflows",
    ],
    screenshots: [
      "/kanban-board-with-task-cards.jpg",
      "/gantt-chart-project-timeline.jpg",
      "/team-collaboration-dashboard.png",
      "/task-detail-modal-with-comments.jpg",
    ],
  },
  {
    id: "design-system",
    name: "design-system",
    displayName: "React UI Component Library",
    description:
      "A reusable and accessible React component library. Tailwind CSS-based with dark mode and theme customization support.",
    version: "1.8.0",
    publisher: "Akira Shingu",
    icon: "palette",
    categories: ["Frontend", "UI Library"],
    tags: ["React", "TypeScript", "Tailwind CSS", "Storybook", "Accessibility"],
    downloads: 25000,
    rating: 4.7,
    repository: "https://github.com/yourusername/ui-library",
    homepage: "https://ui-docs.example.com",
    features: [
      "50+ components",
      "Full TypeScript support",
      "WCAG 2.1 AA compliant",
      "Dark mode support",
      "Storybook documentation",
    ],
    screenshots: [
      "/component-library-storybook-documentation.jpg",
      "/button-variants-showcase.jpg",
      "/form-components-with-validation.jpg",
      "/dark-mode-theme-toggle.jpg",
    ],
  },
  {
    id: "ai-content-generator",
    name: "ai-content-generator",
    displayName: "AI Content Generator",
    description:
      "A content generation tool using OpenAI API. Automatically generates blog posts, social media content, and marketing copy.",
    version: "1.2.5",
    publisher: "Akira Shingu",
    icon: "sparkles",
    categories: ["AI/ML", "Tools"],
    tags: ["Next.js", "OpenAI", "TypeScript", "Prisma"],
    downloads: 6200,
    rating: 4.5,
    repository: "https://github.com/yourusername/ai-content-gen",
    homepage: "https://ai-content.example.com",
    features: [
      "Multiple content types",
      "Customizable prompts",
      "History management & saving",
      "Export functionality",
      "Tone adjustment",
    ],
    screenshots: [
      "/placeholder.svg?height=400&width=700",
      "/placeholder.svg?height=400&width=700",
      "/placeholder.svg?height=400&width=700",
      "/placeholder.svg?height=400&width=700",
    ],
  },
  {
    id: "image-optimizer",
    name: "image-optimizer",
    displayName: "Image Optimization API",
    description:
      "A high-speed image conversion and compression API service. Supports multiple formats, resizing, and WebP conversion.",
    version: "2.3.0",
    publisher: "Akira Shingu",
    icon: "image",
    categories: ["Backend", "API"],
    tags: ["Node.js", "Sharp", "Express", "Docker"],
    downloads: 10500,
    rating: 4.8,
    repository: "https://github.com/yourusername/image-optimizer",
    homepage: "https://api-docs.example.com",
    features: [
      "Multiple image format support",
      "Batch processing",
      "WebP/AVIF conversion",
      "Resize and crop",
      "RESTful API",
    ],
    screenshots: [
      "/placeholder.svg?height=400&width=700",
      "/placeholder.svg?height=400&width=700",
      "/placeholder.svg?height=400&width=700",
      "/placeholder.svg?height=400&width=700",
    ],
  },
]

export const getExtensions = (locale: string) => (locale === "en" ? extensions_EN : extensions)
