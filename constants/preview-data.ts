// Preview section data — shared across all theme variants

// ─── FAQ ────────────────────────────────────────────────────────

export interface FaqItem {
  q: string
  a: string
}

export interface FaqCategory {
  category: string
  questions: FaqItem[]
}

export const FAQ_ITEMS: FaqItem[] = [
  {
    q: "リモートワークは可能ですか?",
    a: "はい、完全リモートでの業務に対応しています。Slack、Discord、Teams等のツールを活用し、円滑なコミュニケーションを心がけています。",
  },
  {
    q: "稼働時間はどのくらいですか?",
    a: "週20〜40時間での稼働が可能です。プロジェクトの状況に応じて柔軟に対応いたします。",
  },
  {
    q: "対応可能な技術スタックは?",
    a: "React、Next.js、TypeScript、Vue.js、Node.js、Python、Go、PostgreSQL、MongoDB、AWS、GCP、Vercel等に対応しています。",
  },
  {
    q: "新しい技術のキャッチアップは可能?",
    a: "はい、積極的に新技術を学習しています。プロジェクトで必要な技術は事前にキャッチアップして対応いたします。",
  },
  {
    q: "設計から実装まで対応できる?",
    a: "はい、要件定義から設計、実装、テスト、デプロイまで一貫して対応可能です。",
  },
  {
    q: "見積もりは無料ですか?",
    a: "はい、お見積もりは無料で承っております。お気軽にご相談ください。",
  },
]

export const FAQ_ITEMS_EN: FaqItem[] = [
  {
    q: "Are you available for remote work?",
    a: "Yes, I am fully available for remote work. I use tools like Slack, Discord, and Teams to ensure smooth communication.",
  },
  {
    q: "How many hours can you work per week?",
    a: "I can work 20-40 hours per week. I am flexible depending on project needs.",
  },
  {
    q: "What tech stack do you support?",
    a: "I work with React, Next.js, TypeScript, Vue.js, Node.js, Python, Go, PostgreSQL, MongoDB, AWS, GCP, Vercel, and more.",
  },
  {
    q: "Can you quickly learn new technologies?",
    a: "Yes, I actively learn new technologies. I can catch up on required technologies before project kickoff.",
  },
  {
    q: "Can you handle everything from design to implementation?",
    a: "Yes, I can handle the entire process from requirements definition, design, implementation, testing, to deployment.",
  },
  {
    q: "Is the estimate free?",
    a: "Yes, estimates are provided free of charge. Feel free to reach out.",
  },
]

export const getFaqItems = (locale: string) => (locale === "en" ? FAQ_ITEMS_EN : FAQ_ITEMS)

export const FAQ_CATEGORIES: FaqCategory[] = [
  {
    category: "業務について",
    questions: [
      FAQ_ITEMS[0],
      FAQ_ITEMS[1],
      {
        q: "副業・業務委託での参画は可能ですか?",
        a: "はい、対応可能です。契約形態についてはご相談ください。",
      },
    ],
  },
  {
    category: "技術について",
    questions: [
      FAQ_ITEMS[2],
      {
        q: "設計から実装まで一人で対応できますか?",
        a: "はい、要件定義から設計、実装、テスト、デプロイまで一貫して対応可能です。",
      },
    ],
  },
  {
    category: "その他",
    questions: [
      FAQ_ITEMS[5],
      {
        q: "面談は可能ですか?",
        a: "はい、オンラインでの面談に対応しています。お気軽にお申し付けください。",
      },
    ],
  },
]

export const FAQ_CATEGORIES_EN: FaqCategory[] = [
  {
    category: "About Work",
    questions: [
      FAQ_ITEMS_EN[0],
      FAQ_ITEMS_EN[1],
      {
        q: "Can you work as a side job or contract?",
        a: "Yes, I can. Please contact me to discuss contract details.",
      },
    ],
  },
  {
    category: "About Technology",
    questions: [
      FAQ_ITEMS_EN[2],
      {
        q: "Can you handle everything from design to implementation alone?",
        a: "Yes, I can handle the entire process from requirements definition, design, implementation, testing, to deployment.",
      },
    ],
  },
  {
    category: "Other",
    questions: [
      FAQ_ITEMS_EN[5],
      {
        q: "Is an interview possible?",
        a: "Yes, I am available for online interviews. Feel free to request one.",
      },
    ],
  },
]

export const getFaqCategories = (locale: string) =>
  locale === "en" ? FAQ_CATEGORIES_EN : FAQ_CATEGORIES

// ─── Contact ────────────────────────────────────────────────────

export interface ContactLink {
  label: string
  value: string
  href: string
}

export const CONTACT_LINKS: ContactLink[] = [
  { label: "Email", value: "contact@example.com", href: "mailto:contact@example.com" },
  { label: "GitHub", value: "github.com/yourusername", href: "https://github.com/yourusername" },
  {
    label: "LinkedIn",
    value: "linkedin.com/in/yourprofile",
    href: "https://linkedin.com/in/yourprofile",
  },
  { label: "Twitter", value: "@yourusername", href: "https://twitter.com/yourusername" },
]

export const SERVICES = [
  "Webアプリケーション開発",
  "フロントエンド開発",
  "バックエンド開発",
  "技術コンサルティング",
  "コードレビュー",
  "技術記事執筆",
]

export const SERVICES_EN = [
  "Web Application Development",
  "Frontend Development",
  "Backend Development",
  "Technical Consulting",
  "Code Review",
  "Technical Writing",
]

export const getServices = (locale: string) => (locale === "en" ? SERVICES_EN : SERVICES)

// ─── Skills ─────────────────────────────────────────────────────

export interface Skill {
  name: string
  years: number
  rank: string
}

export interface SkillCategory {
  category: string
  icon: string
  skills: Skill[]
}

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    category: "フロントエンド",
    icon: "💻",
    skills: [
      { name: "React", years: 5, rank: "S" },
      { name: "Next.js", years: 4, rank: "S" },
      { name: "TypeScript", years: 4, rank: "A" },
    ],
  },
  {
    category: "バックエンド",
    icon: "⚙️",
    skills: [
      { name: "Node.js", years: 4, rank: "A" },
      { name: "Python", years: 3, rank: "B" },
      { name: "PostgreSQL", years: 3, rank: "A" },
    ],
  },
  {
    category: "AI / ML",
    icon: "🤖",
    skills: [
      { name: "OpenAI API", years: 2, rank: "A" },
      { name: "LangChain", years: 1, rank: "B" },
      { name: "RAG", years: 1, rank: "B" },
    ],
  },
  {
    category: "インフラ",
    icon: "☁️",
    skills: [
      { name: "AWS", years: 3, rank: "A" },
      { name: "Docker", years: 3, rank: "A" },
      { name: "Terraform", years: 2, rank: "B" },
    ],
  },
]

export const SKILL_CATEGORIES_EN: SkillCategory[] = [
  {
    category: "Frontend",
    icon: "💻",
    skills: [
      { name: "React", years: 5, rank: "S" },
      { name: "Next.js", years: 4, rank: "S" },
      { name: "TypeScript", years: 4, rank: "A" },
    ],
  },
  {
    category: "Backend",
    icon: "⚙️",
    skills: [
      { name: "Node.js", years: 4, rank: "A" },
      { name: "Python", years: 3, rank: "B" },
      { name: "PostgreSQL", years: 3, rank: "A" },
    ],
  },
  {
    category: "AI / ML",
    icon: "🤖",
    skills: [
      { name: "OpenAI API", years: 2, rank: "A" },
      { name: "LangChain", years: 1, rank: "B" },
      { name: "RAG", years: 1, rank: "B" },
    ],
  },
  {
    category: "Infrastructure",
    icon: "☁️",
    skills: [
      { name: "AWS", years: 3, rank: "A" },
      { name: "Docker", years: 3, rank: "A" },
      { name: "Terraform", years: 2, rank: "B" },
    ],
  },
]

export const getSkillCategories = (locale: string) =>
  locale === "en" ? SKILL_CATEGORIES_EN : SKILL_CATEGORIES

export const OTHER_TOOLS = [
  "Git",
  "GitHub Actions",
  "Vercel",
  "Figma",
  "Agile",
  "TDD",
  "Redis",
  "Kubernetes",
]

export const OTHER_SKILLS_PROFESSIONAL = [
  "Agile開発",
  "テスト駆動開発",
  "レスポンシブデザイン",
  "アクセシビリティ",
  "パフォーマンス最適化",
  "SEO",
  "チームリーダーシップ",
  "コードレビュー",
]

export const OTHER_SKILLS_PROFESSIONAL_EN = [
  "Agile Development",
  "Test-Driven Development",
  "Responsive Design",
  "Accessibility",
  "Performance Optimization",
  "SEO",
  "Team Leadership",
  "Code Review",
]

export const getOtherSkillsProfessional = (locale: string) =>
  locale === "en" ? OTHER_SKILLS_PROFESSIONAL_EN : OTHER_SKILLS_PROFESSIONAL

// ─── Profile ────────────────────────────────────────────────────

export const PROFILE_FRONTEND_SKILLS = ["React", "Next.js", "TypeScript", "Tailwind CSS"]
export const PROFILE_BACKEND_SKILLS = ["Node.js", "Python", "PostgreSQL", "MongoDB"]

export const PROFILE_ACHIEVEMENTS = [
  "5年以上のWeb開発経験",
  "大規模なSaaSプロダクトの開発経験",
  "アジャイル開発チームでのリード経験",
]

export const PROFILE_ACHIEVEMENTS_EN = [
  "5+ years of web development experience",
  "Experience developing large-scale SaaS products",
  "Team lead experience in agile development",
]

export const getProfileAchievements = (locale: string) =>
  locale === "en" ? PROFILE_ACHIEVEMENTS_EN : PROFILE_ACHIEVEMENTS

export interface ProfileStat {
  num: string
  label: string
}

export const PROFILE_STATS: ProfileStat[] = [
  { num: "5+", label: "年の経験" },
  { num: "50+", label: "プロジェクト" },
  { num: "100%", label: "満足度" },
]

export const PROFILE_STATS_EN: ProfileStat[] = [
  { num: "5+", label: "Years of Experience" },
  { num: "50+", label: "Projects" },
  { num: "100%", label: "Satisfaction" },
]

export const getProfileStats = (locale: string) =>
  locale === "en" ? PROFILE_STATS_EN : PROFILE_STATS

export const PROFILE_FRONTEND_PROFESSIONAL = [
  "React / Next.js",
  "TypeScript",
  "Tailwind CSS",
  "レスポンシブデザイン",
]
export const PROFILE_BACKEND_PROFESSIONAL = [
  "Node.js / Express",
  "Python / Django",
  "PostgreSQL / MongoDB",
  "RESTful API設計",
]

export const PROFILE_FRONTEND_PROFESSIONAL_EN = [
  "React / Next.js",
  "TypeScript",
  "Tailwind CSS",
  "Responsive Design",
]

export const PROFILE_BACKEND_PROFESSIONAL_EN = [
  "Node.js / Express",
  "Python / Django",
  "PostgreSQL / MongoDB",
  "RESTful API Design",
]

export const getProfileFrontendProfessional = (locale: string) =>
  locale === "en" ? PROFILE_FRONTEND_PROFESSIONAL_EN : PROFILE_FRONTEND_PROFESSIONAL

export const getProfileBackendProfessional = (locale: string) =>
  locale === "en" ? PROFILE_BACKEND_PROFESSIONAL_EN : PROFILE_BACKEND_PROFESSIONAL

// ─── Strong Points ──────────────────────────────────────────────

export interface Strength {
  title: string
  desc: string
  icon: string
  color: string
}

export const STRENGTHS: Strength[] = [
  {
    title: "フルスタック開発力",
    desc: "フロントエンドからバックエンド、インフラまで一貫して対応。プロジェクト全体を俯瞰した設計・実装が可能です。",
    icon: "🔧",
    color: "from-emerald-500 to-cyan-500",
  },
  {
    title: "モダン技術への適応力",
    desc: "Next.js 14、TypeScript厳密モード、tRPCなど最新技術を積極採用。常に技術のアップデートを続けています。",
    icon: "🚀",
    color: "from-cyan-500 to-blue-500",
  },
  {
    title: "パフォーマンス最適化",
    desc: "Core Web Vitalsを意識した実装、バンドルサイズ最適化、DBクエリ改善などの経験が豊富です。",
    icon: "⚡",
    color: "from-blue-500 to-purple-500",
  },
  {
    title: "リーダーシップ",
    desc: "12名規模のチームリード経験。コードレビュー文化の醸成やメンバーの成長サポートを実践してきました。",
    icon: "👥",
    color: "from-purple-500 to-pink-500",
  },
]

export const STRENGTHS_EN: Strength[] = [
  {
    title: "Full-Stack Development",
    desc: "Capable of handling everything from frontend to backend and infrastructure. Can design and implement with a holistic project perspective.",
    icon: "🔧",
    color: "from-emerald-500 to-cyan-500",
  },
  {
    title: "Modern Tech Adaptability",
    desc: "Actively adopting cutting-edge technologies like Next.js 14, strict TypeScript mode, and tRPC. Continuously staying up to date.",
    icon: "🚀",
    color: "from-cyan-500 to-blue-500",
  },
  {
    title: "Performance Optimization",
    desc: "Extensive experience with Core Web Vitals-conscious implementation, bundle size optimization, and database query improvements.",
    icon: "⚡",
    color: "from-blue-500 to-purple-500",
  },
  {
    title: "Leadership",
    desc: "Led a team of 12 members. Fostered a code review culture and supported team members' growth.",
    icon: "👥",
    color: "from-purple-500 to-pink-500",
  },
]

export const getStrengths = (locale: string) => (locale === "en" ? STRENGTHS_EN : STRENGTHS)

export interface SoftSkillSection {
  title: string
  items: string[]
}

export const SOFT_SKILLS: SoftSkillSection[] = [
  {
    title: "コミュニケーション",
    items: ["非エンジニアへの説明が得意", "ドキュメント作成重視", "チーム間の橋渡し役"],
  },
  {
    title: "問題解決",
    items: ["複雑な問題の分解", "根本原因の特定", "技術的負債の計画的解消"],
  },
  {
    title: "学習意欲",
    items: ["新技術の積極的習得", "ブログでの知見共有", "コミュニティ活動"],
  },
]

export const SOFT_SKILLS_EN: SoftSkillSection[] = [
  {
    title: "Communication",
    items: [
      "Good at explaining to non-engineers",
      "Documentation-oriented",
      "Bridge between teams",
    ],
  },
  {
    title: "Problem Solving",
    items: [
      "Breaking down complex problems",
      "Identifying root causes",
      "Systematic technical debt resolution",
    ],
  },
  {
    title: "Learning Drive",
    items: [
      "Actively learning new technologies",
      "Sharing knowledge through blog",
      "Community involvement",
    ],
  },
]

export const getSoftSkills = (locale: string) => (locale === "en" ? SOFT_SKILLS_EN : SOFT_SKILLS)

export interface AchievementStat {
  num: string
  label: string
  color?: string
}

export const ACHIEVEMENT_STATS: AchievementStat[] = [
  { num: "40%", label: "パフォーマンス改善", color: "from-emerald-500 to-cyan-500" },
  { num: "150%", label: "ユーザー数成長", color: "from-cyan-500 to-blue-500" },
  { num: "30%", label: "生産性向上", color: "from-blue-500 to-purple-500" },
  { num: "10万PV", label: "月間ブログ", color: "from-purple-500 to-pink-500" },
]

export const ACHIEVEMENT_STATS_EN: AchievementStat[] = [
  { num: "40%", label: "Performance Improvement", color: "from-emerald-500 to-cyan-500" },
  { num: "150%", label: "User Growth", color: "from-cyan-500 to-blue-500" },
  { num: "30%", label: "Productivity Increase", color: "from-blue-500 to-purple-500" },
  { num: "100K PV", label: "Monthly Blog", color: "from-purple-500 to-pink-500" },
]

export const getAchievementStats = (locale: string) =>
  locale === "en" ? ACHIEVEMENT_STATS_EN : ACHIEVEMENT_STATS

// ─── Projects ───────────────────────────────────────────────────

export interface Project {
  title: string
  desc: string
  techs: string[]
  color: string
  icon: string
}

export const PROJECTS: Project[] = [
  {
    title: "Eコマースプラットフォーム",
    desc: "Next.js 14とSupabaseを使用した完全なEコマースソリューション",
    techs: ["Next.js", "TypeScript", "Supabase", "Stripe"],
    color: "from-blue-600 to-blue-800",
    icon: "🛒",
  },
  {
    title: "リアルタイムチャットアプリ",
    desc: "WebSocketを使用したリアルタイムコミュニケーションプラットフォーム",
    techs: ["React", "Node.js", "Socket.io", "MongoDB"],
    color: "from-purple-600 to-purple-800",
    icon: "💬",
  },
  {
    title: "プロジェクト管理ツール",
    desc: "チーム向けの包括的なプロジェクト管理システム",
    techs: ["Next.js", "tRPC", "Prisma", "PostgreSQL"],
    color: "from-pink-600 to-pink-800",
    icon: "📊",
  },
]

export const PROJECTS_EN: Project[] = [
  {
    title: "E-Commerce Platform",
    desc: "A complete e-commerce solution built with Next.js 14 and Supabase",
    techs: ["Next.js", "TypeScript", "Supabase", "Stripe"],
    color: "from-blue-600 to-blue-800",
    icon: "🛒",
  },
  {
    title: "Real-Time Chat App",
    desc: "A real-time communication platform using WebSocket",
    techs: ["React", "Node.js", "Socket.io", "MongoDB"],
    color: "from-purple-600 to-purple-800",
    icon: "💬",
  },
  {
    title: "Project Management Tool",
    desc: "A comprehensive project management system for teams",
    techs: ["Next.js", "tRPC", "Prisma", "PostgreSQL"],
    color: "from-pink-600 to-pink-800",
    icon: "📊",
  },
]

export const getProjects = (locale: string) => (locale === "en" ? PROJECTS_EN : PROJECTS)

export interface ProfessionalProject {
  num: string
  title: string
  client: string
  year: string
  desc: string
}

export const PROJECTS_PROFESSIONAL: ProfessionalProject[] = [
  {
    num: "01",
    title: "Eコマースプラットフォーム",
    client: "Tech Startup Inc.",
    year: "2024",
    desc: "Next.js 14とSupabaseを使用した完全なEコマースソリューション。高速なページロードとシームレスなチェックアウト体験を実現。",
  },
  {
    num: "02",
    title: "プロジェクト管理システム",
    client: "Enterprise Co.",
    year: "2023",
    desc: "チーム向けの包括的なプロジェクト管理ツール。リアルタイムコラボレーションとカンバンボードを実装。",
  },
  {
    num: "03",
    title: "コーポレートウェブサイト",
    client: "Design Studio",
    year: "2023",
    desc: "モダンでミニマルなコーポレートサイト。優れたタイポグラフィとスムーズなアニメーションが特徴。",
  },
]

export const PROJECTS_PROFESSIONAL_EN: ProfessionalProject[] = [
  {
    num: "01",
    title: "E-Commerce Platform",
    client: "Tech Startup Inc.",
    year: "2024",
    desc: "A complete e-commerce solution built with Next.js 14 and Supabase. Achieved fast page loads and seamless checkout experience.",
  },
  {
    num: "02",
    title: "Project Management System",
    client: "Enterprise Co.",
    year: "2023",
    desc: "A comprehensive project management tool for teams. Implemented real-time collaboration and Kanban boards.",
  },
  {
    num: "03",
    title: "Corporate Website",
    client: "Design Studio",
    year: "2023",
    desc: "A modern, minimal corporate website. Features excellent typography and smooth animations.",
  },
]

export const getProjectsProfessional = (locale: string) =>
  locale === "en" ? PROJECTS_PROFESSIONAL_EN : PROJECTS_PROFESSIONAL

export interface InnovativeProject {
  title: string
  desc: string
  gradient: string
  icon: string
}

export const PROJECTS_INNOVATIVE: InnovativeProject[] = [
  {
    title: "AI パワードEコマース",
    desc: "機械学習を活用した次世代のショッピング体験",
    gradient: "from-cyan-500 via-blue-500 to-purple-500",
    icon: "🤖",
  },
  {
    title: "リアルタイム3Dコラボレーション",
    desc: "WebGLとWebSocketsによる革新的な共同作業空間",
    gradient: "from-purple-500 via-pink-500 to-red-500",
    icon: "🎨",
  },
  {
    title: "ブロックチェーンプラットフォーム",
    desc: "分散型アプリケーションの未来を構築",
    gradient: "from-pink-500 via-red-500 to-orange-500",
    icon: "⛓️",
  },
]

export const PROJECTS_INNOVATIVE_EN: InnovativeProject[] = [
  {
    title: "AI-Powered E-Commerce",
    desc: "Next-gen shopping experience leveraging machine learning",
    gradient: "from-cyan-500 via-blue-500 to-purple-500",
    icon: "🤖",
  },
  {
    title: "Real-Time 3D Collaboration",
    desc: "Innovative co-working space powered by WebGL and WebSockets",
    gradient: "from-purple-500 via-pink-500 to-red-500",
    icon: "🎨",
  },
  {
    title: "Blockchain Platform",
    desc: "Building the future of decentralized applications",
    gradient: "from-pink-500 via-red-500 to-orange-500",
    icon: "⛓️",
  },
]

export const getProjectsInnovative = (locale: string) =>
  locale === "en" ? PROJECTS_INNOVATIVE_EN : PROJECTS_INNOVATIVE

// ─── Terminal ───────────────────────────────────────────────────

export const TERMINAL_HELP_TEXT = [
  "",
  "╔══════════════════════════════════════════════════════════╗",
  "║                  Available Commands                       ║",
  "╠══════════════════════════════════════════════════════════╣",
  "║  npm run start  │ Show career history as dev server log  ║",
  "║  ls             │ List project directories               ║",
  "║  clear          │ Clear terminal output                  ║",
  "║  help           │ Show this help message                 ║",
  "╚══════════════════════════════════════════════════════════╝",
  "",
]

export const TERMINAL_LS_FILES = [
  "about/",
  "projects/",
  "package.json",
  "tsconfig.json",
  "README.md",
]

export const TERMINAL_START_SEQUENCE = [
  "> portfolio@1.0.0 start",
  "> next dev",
  "",
  "ready - started server on 0.0.0.0:3000, url: http://localhost:3000",
  "info  - Loaded env from .env",
]

export const TERMINAL_INITIAL_LOGS = [
  "Microsoft Windows [Version 10.0.19045.2364]",
  "(c) Microsoft Corporation. All rights reserved.",
  "",
]

// ─── Extension Gallery ──────────────────────────────────────────

export const EXTENSION_COLOR_MAP: Record<string, string> = {
  "nextjs-ecommerce": "from-emerald-500 to-teal-500",
  "realtime-chat": "from-blue-500 to-cyan-500",
  "project-management": "from-violet-500 to-purple-500",
  "design-system": "from-pink-500 to-rose-500",
  "ai-content-generator": "from-orange-500 to-amber-500",
  "image-optimizer": "from-indigo-500 to-blue-500",
}
