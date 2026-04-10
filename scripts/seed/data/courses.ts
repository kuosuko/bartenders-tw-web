/**
 * Seed courses. Kept as data, with the seed script generating the actual
 * Portable Text blocks + certification object.
 *
 * Available image refs: 'goldenCup' | 'iba'
 */

export type SeedSyllabusItem = { title: string; description: string }
export type SeedScheduleSlot = {
  date: string
  startTime: string
  endTime: string
  location: string
}

export type SeedCertification = {
  hasCertification: boolean
  type?: 'included' | 'additionalFee' | 'feeAndTest'
  fee?: number
  description?: string
}

export type SeedCourse = {
  id: string
  slug: string
  title: string
  shortDescription: string
  descriptionParagraphs: string[]
  image: 'goldenCup' | 'iba'
  categoryRef: string
  instructorRef: string
  level: 'beginner' | 'intermediate' | 'advanced' | 'professional'
  duration: string
  price: number
  memberPrice: number
  maxParticipants: number
  schedule: SeedScheduleSlot[]
  syllabus: SeedSyllabusItem[]
  certification: SeedCertification
  status: 'draft' | 'upcoming' | 'open' | 'full' | 'completed'
  featured: boolean
}

export const SEED_COURSES: SeedCourse[] = [
  {
    id: 'course.iba-foundation',
    slug: 'iba-foundation',
    title: 'IBA 經典調酒入門課程',
    shortDescription:
      '從零開始認識 IBA 國際調酒師協會 50 款經典調酒，理論、技法、實作三軌並進。',
    descriptionParagraphs: [
      '本課程針對完全沒有調酒基礎的學員設計，由協會資深講師親自帶領，從基礎工具認識、酒類分類、計量換算開始，逐步進入 IBA 官方 50 款經典調酒的實作練習。',
      '每堂課都會安排實作時間，讓學員在講師直接指導下練習技法，並於最後一週進行綜合評量，通過者可獲得協會結業證書。',
    ],
    image: 'iba',
    categoryRef: 'courseCategory.foundation',
    instructorRef: 'person.kuo-chih-ling',
    level: 'beginner',
    duration: '六週 / 共 24 小時',
    price: 18000,
    memberPrice: 15000,
    maxParticipants: 12,
    schedule: [
      {
        date: '2026-05-10',
        startTime: '14:00',
        endTime: '17:00',
        location: '台北市協會教室',
      },
      {
        date: '2026-05-17',
        startTime: '14:00',
        endTime: '17:00',
        location: '台北市協會教室',
      },
    ],
    syllabus: [
      {
        title: '第一週：工具與酒類認識',
        description:
          '搖酒器、量酒器、攪拌長匙等工具介紹，烈酒、利口酒、香艾酒分類。',
      },
      {
        title: '第二週：基礎技法',
        description: 'Build, Stir, Shake, Blend, Layer 五大技法實作。',
      },
      {
        title: '第三週：Gin 與 Vodka 經典',
        description: 'Martini、Negroni、Moscow Mule 等 12 款經典配方實作。',
      },
      {
        title: '第四週：Rum 與 Tequila 經典',
        description: 'Mojito、Daiquiri、Margarita 等 10 款經典配方實作。',
      },
      {
        title: '第五週：Whisky 與 Brandy 經典',
        description: 'Old Fashioned、Manhattan、Sidecar 等 12 款經典配方實作。',
      },
      {
        title: '第六週：綜合評量與結業',
        description: '隨機抽題實作考核、講師個別回饋、結業證書頒發。',
      },
    ],
    certification: {
      hasCertification: true,
      type: 'included',
      description: '完成課程並通過實作評量，可獲得協會結業證書。',
    },
    status: 'open',
    featured: true,
  },
  {
    id: 'course.iba-advanced',
    slug: 'iba-advanced',
    title: 'IBA 進階經典與創新調酒',
    shortDescription:
      '針對已掌握基礎技法的調酒師，深入探討經典配方的變奏與現代創新應用。',
    descriptionParagraphs: [
      '進階課程著重於「理解配方背後的邏輯」——學員將學習如何拆解經典調酒的味覺結構，並以此為基礎發展自己的創新配方。',
      '本課程要求學員需具備基礎調酒經驗或已完成協會基礎課程，名額有限，採面試制錄取。',
    ],
    image: 'iba',
    categoryRef: 'courseCategory.advanced',
    instructorRef: 'person.deng-chi-chu',
    level: 'advanced',
    duration: '八週 / 共 32 小時',
    price: 32000,
    memberPrice: 28000,
    maxParticipants: 8,
    schedule: [
      {
        date: '2026-06-05',
        startTime: '19:00',
        endTime: '22:00',
        location: '台北市協會教室',
      },
    ],
    syllabus: [
      {
        title: '味覺架構解析',
        description: '酸、甜、苦、鹹、鮮五味在調酒中的平衡原則與實作練習。',
      },
      {
        title: '經典配方變奏',
        description: '以 Old Fashioned 為例，探討 12 種經典衍生配方的設計邏輯。',
      },
      {
        title: '分子調酒入門',
        description: '澄清技法、泡沫層、氣體注入等現代技術介紹與實作。',
      },
      {
        title: '個人作品發表',
        description: '每位學員於期末發表兩款原創作品，接受講師與同儕講評。',
      },
    ],
    certification: {
      hasCertification: true,
      type: 'included',
      description: '通過期末作品發表評審可獲得進階結業證書。',
    },
    status: 'upcoming',
    featured: true,
  },
  {
    id: 'course.competition-training',
    slug: 'competition-training',
    title: '國際賽事培訓班',
    shortDescription:
      '針對有意參加 IBA 世界盃、亞太盃等國際賽事的選手設計的密集培訓課程。',
    descriptionParagraphs: [
      '由曾任國際賽事評審與選手的協會講師親自帶領，內容涵蓋賽制解析、配方設計、舞台表現、英語溝通等全方位訓練。',
      '課程結束後通過選拔者將由協會推薦參加該年度國際賽事代表隊選拔。',
    ],
    image: 'goldenCup',
    categoryRef: 'courseCategory.competition',
    instructorRef: 'person.kuo-chao-kun',
    level: 'professional',
    duration: '十二週 / 共 60 小時',
    price: 65000,
    memberPrice: 55000,
    maxParticipants: 6,
    schedule: [
      {
        date: '2026-07-01',
        startTime: '10:00',
        endTime: '17:00',
        location: '台北市協會大會堂',
      },
    ],
    syllabus: [
      {
        title: '賽制與評分規則',
        description: 'IBA、WBA、各國主流賽事的評分標準與歷年判例解析。',
      },
      {
        title: '原創配方開發',
        description: '從命題、選酒、調味到裝飾設計的完整作品開發流程。',
      },
      {
        title: '舞台表現與溝通',
        description: '計時練習、現場解說、英語訪談模擬。',
      },
      {
        title: '模擬賽與講評',
        description: '三場完整模擬賽事，邀請外部評審講評。',
      },
    ],
    certification: { hasCertification: false },
    status: 'upcoming',
    featured: true,
  },
  {
    id: 'course.flair-basics',
    slug: 'flair-basics',
    title: '花式調酒基礎養成',
    shortDescription:
      '從基本的拋接、翻轉開始，循序漸進進入花式調酒的世界。',
    descriptionParagraphs: [
      '花式調酒（Flair Bartending）結合技術與娛樂效果，是許多酒吧吸引顧客的重要元素。本課程以安全、紮實的基本功為核心，避免學員養成受傷的壞習慣。',
      '課程使用練習專用的無酒精器材，零基礎學員也能安心學習。',
    ],
    image: 'goldenCup',
    categoryRef: 'courseCategory.flair',
    instructorRef: 'person.jao-wen-pin',
    level: 'beginner',
    duration: '四週 / 共 16 小時',
    price: 12000,
    memberPrice: 9800,
    maxParticipants: 10,
    schedule: [
      {
        date: '2026-05-20',
        startTime: '19:00',
        endTime: '21:00',
        location: '台北市協會花式練習室',
      },
    ],
    syllabus: [
      { title: '暖身與基本握姿', description: '避免運動傷害的基礎姿勢練習。' },
      { title: '單手拋接', description: '瓶身、搖酒器、量酒器的單手動作練習。' },
      { title: '雙手交換', description: '兩手之間的物件交換與節奏掌握。' },
      { title: '組合動作', description: '30 秒內完成一組由三個動作組成的連續表演。' },
    ],
    certification: { hasCertification: false },
    status: 'open',
    featured: false,
  },
  {
    id: 'course.license-guidance',
    slug: 'license-guidance',
    title: '乙級調酒技術士考照輔導班',
    shortDescription:
      '配合勞動部乙級技術士技能檢定，完整涵蓋學科、術科的三個月考照密集輔導課程。',
    descriptionParagraphs: [
      '乙級調酒技術士是台灣目前最具公信力的調酒專業認證之一。本輔導班由協會長期協助勞動部出題與審核的資深講師親自授課，針對歷屆考題進行系統性整理。',
      '本課程不包含實際考試報名費，考試報名需由學員自行辦理。',
    ],
    image: 'iba',
    categoryRef: 'courseCategory.certification',
    instructorRef: 'person.hsieh-mei-mei',
    level: 'intermediate',
    duration: '十二週 / 共 48 小時',
    price: 28000,
    memberPrice: 24000,
    maxParticipants: 15,
    schedule: [
      {
        date: '2026-05-15',
        startTime: '14:00',
        endTime: '18:00',
        location: '台北市協會教室',
      },
    ],
    syllabus: [
      { title: '學科：酒類常識與服務禮儀', description: '歷屆試題解析與重點觀念整理。' },
      { title: '學科：食品衛生安全', description: 'HACCP 概念與考試常見題型。' },
      { title: '術科：器材辨識與操作', description: '限時作業評分標準講解與練習。' },
      { title: '術科：指定調酒製作', description: '乙級指定 15 款配方的完整練習與模擬考。' },
    ],
    certification: {
      hasCertification: true,
      type: 'feeAndTest',
      description: '協會提供完整輔導，證照由勞動部核發，需另行報名考試。',
    },
    status: 'open',
    featured: false,
  },
  {
    id: 'course.cocktail-history',
    slug: 'cocktail-history',
    title: '雞尾酒歷史與文化',
    shortDescription:
      '從 19 世紀美國禁酒令到當代精品雞尾酒運動，一次理解每款經典背後的文化脈絡。',
    descriptionParagraphs: [
      '想真正成為一位出色的調酒師，光掌握技法還不夠。本課程以文化史、社會史的角度切入，讓學員理解每款經典調酒背後的時代背景、人物故事與文化意涵。',
      '課程以講座形式為主，搭配少量代表性品飲，適合對調酒文化有興趣的所有學員。',
    ],
    image: 'iba',
    categoryRef: 'courseCategory.foundation',
    instructorRef: 'person.wang-nien-tzu',
    level: 'beginner',
    duration: '四週 / 共 12 小時',
    price: 6800,
    memberPrice: 5500,
    maxParticipants: 20,
    schedule: [
      {
        date: '2026-06-12',
        startTime: '19:30',
        endTime: '21:30',
        location: '台北市協會大會堂',
      },
    ],
    syllabus: [
      { title: '雞尾酒的起源', description: '18-19 世紀的美國酒吧文化與 Jerry Thomas。' },
      { title: '禁酒令的影響', description: '1920 年代美國禁酒令如何改變全球調酒版圖。' },
      { title: 'Tiki 文化的興衰', description: '南太平洋風格如何成為二戰後的流行符號。' },
      { title: '當代精品雞尾酒運動', description: '從紐約到東京的 Craft Cocktail 復興。' },
    ],
    certification: { hasCertification: false },
    status: 'upcoming',
    featured: false,
  },
]
