/**
 * Seed news posts. The body is stored as raw Portable Text blocks so the
 * seed script doesn't need a markdown converter. Keep paragraphs short —
 * this is fake content to fill the list, not a CMS demo.
 *
 * Block/span _key values must be unique within a document, so each post
 * prefixes them with its slug to avoid collisions.
 *
 * Available image refs: 'goldenCup' | 'iba'
 */

export type SeedParagraph = { type: 'p'; text: string }
export type SeedHeading = { type: 'h2'; text: string }
export type SeedBullet = { type: 'li'; text: string }
export type SeedBlock = SeedParagraph | SeedHeading | SeedBullet

export type SeedNewsPost = {
  id: string
  slug: string
  title: string
  excerpt: string
  image: 'goldenCup' | 'iba'
  categoryRef: string
  tagRefs: string[]
  authorRef: string
  publishedAt: string
  blocks: SeedBlock[]
}

export const SEED_NEWS_POSTS: SeedNewsPost[] = [
  {
    id: 'newsPost.welcome',
    slug: 'welcome',
    title: '台灣調酒師協會官網全新上線',
    excerpt:
      '協會官方網站經過全新改版上線，未來最新消息、課程、賽事資訊都將在此第一時間發佈。',
    image: 'goldenCup',
    categoryRef: 'category.announcements',
    tagRefs: ['tag.competition'],
    authorRef: 'person.kuo-chih-ling',
    publishedAt: '2026-04-01T10:00:00Z',
    blocks: [
      {
        type: 'p',
        text: '感謝大家長久以來對台灣調酒師協會的支持。為了提供更即時、更完整的資訊，協會官方網站經過全新改版，今日正式上線。',
      },
      { type: 'h2', text: '網站新增功能' },
      { type: 'li', text: '最新消息與活動報導' },
      { type: 'li', text: '完整課程資訊與線上報名導引' },
      { type: 'li', text: '師資團隊介紹' },
    ],
  },
  {
    id: 'newsPost.golden-cup-2026-open',
    slug: 'golden-cup-2026-open',
    title: '2026 金盃調酒大賽正式開放報名',
    excerpt:
      '年度最受矚目的金盃調酒大賽回歸，分為經典組、創意組與青年組三大類別，即日起至 5 月 31 日開放線上報名。',
    image: 'goldenCup',
    categoryRef: 'category.competition',
    tagRefs: ['tag.competition', 'tag.iba'],
    authorRef: 'person.deng-chi-chu',
    publishedAt: '2026-03-28T09:00:00Z',
    blocks: [
      {
        type: 'p',
        text: '由中華民國國際調酒協會主辦的 2026 金盃調酒大賽，將於 7 月 15 日至 17 日於台北國際會議中心盛大舉辦。本屆賽事總獎金突破新台幣 80 萬元，並由 IBA 國際裁判擔任評審陣容。',
      },
      { type: 'h2', text: '參賽組別' },
      { type: 'li', text: '經典調酒組：依 IBA 官方 50 款經典配方進行盲評' },
      { type: 'li', text: '創意調酒組：自由命題，強調在地食材應用' },
      { type: 'li', text: '青年組：限 25 歲以下從業人員或在學學生' },
      {
        type: 'p',
        text: '詳細賽制與報名辦法請至協會官方頁面下載簡章。',
      },
    ],
  },
  {
    id: 'newsPost.iba-world-2025-review',
    slug: 'iba-world-2025-review',
    title: 'IBA 2025 世界盃回顧：台灣代表隊挺進前十',
    excerpt:
      '2025 年 IBA 世界盃調酒大賽於義大利羅馬落幕，台灣代表隊於經典組獲得第 8 名，創下近年最佳成績。',
    image: 'iba',
    categoryRef: 'category.competition',
    tagRefs: ['tag.iba', 'tag.competition'],
    authorRef: 'person.kuo-chao-kun',
    publishedAt: '2026-03-20T14:00:00Z',
    blocks: [
      {
        type: 'p',
        text: '由協會選拔出的台灣代表隊，在 2025 年 IBA 世界盃經典組與創意組兩大類別中皆有亮眼表現。代表選手在經典組獲得第 8 名，較前一年度成績大幅躍進。',
      },
      {
        type: 'p',
        text: '協會將於四月份舉辦選手分享會，邀請代表隊成員回台後與學員面對面交流比賽心得與經驗。',
      },
    ],
  },
  {
    id: 'newsPost.foundation-course-2026-spring',
    slug: 'foundation-course-2026-spring',
    title: '2026 春季基礎調酒課程開始招生',
    excerpt:
      '為期六週的基礎調酒課程將於 5 月 10 日正式開班，由協會資深講師親自授課，完成課程可獲得結業證書。',
    image: 'iba',
    categoryRef: 'category.education',
    tagRefs: ['tag.training'],
    authorRef: 'person.jao-wen-pin',
    publishedAt: '2026-03-15T11:00:00Z',
    blocks: [
      {
        type: 'p',
        text: '基礎調酒課程以「零基礎也能入門」為設計理念，從認識吧檯工具、酒類分類、度量換算開始，逐步進入 IBA 50 款經典配方的實作練習。',
      },
      { type: 'h2', text: '課程特色' },
      { type: 'li', text: '小班教學，每班最多 12 人' },
      { type: 'li', text: '每堂課皆有實作評量與個別指導' },
      { type: 'li', text: '完課頒發協會結業證書' },
    ],
  },
  {
    id: 'newsPost.suntory-partnership',
    slug: 'suntory-partnership',
    title: '協會與三得利台灣達成教育合作',
    excerpt:
      '協會與三得利台灣股份有限公司簽署教育合作備忘錄，未來將共同推動日系調酒文化交流與師資培訓計畫。',
    image: 'iba',
    categoryRef: 'category.partnership',
    tagRefs: ['tag.training'],
    authorRef: 'person.hsieh-mei-mei',
    publishedAt: '2026-03-10T15:30:00Z',
    blocks: [
      {
        type: 'p',
        text: '此次合作將為協會會員提供三得利日本原廠師資的講座機會，包含 Highball、Japanese Hard Shake 等具代表性的日系調酒技法。',
      },
      {
        type: 'p',
        text: '首場合作講座預計於 2026 年 6 月舉辦，相關報名資訊將於協會官網另行公告。',
      },
    ],
  },
  {
    id: 'newsPost.asia-forum-2026',
    slug: 'asia-forum-2026',
    title: '第二屆亞洲調酒師論壇圓滿落幕',
    excerpt:
      '為期三天的亞洲調酒師論壇在台北圓滿落幕，共有來自 12 個國家與地區、超過 400 位調酒師齊聚交流。',
    image: 'goldenCup',
    categoryRef: 'category.events',
    tagRefs: ['tag.training', 'tag.cocktail'],
    authorRef: 'person.wang-nien-tzu',
    publishedAt: '2026-03-05T18:00:00Z',
    blocks: [
      {
        type: 'p',
        text: '本屆論壇主題為「Local Ingredients, Global Stage」，探討如何運用在地食材創造具有文化辨識度的調酒作品。',
      },
      {
        type: 'p',
        text: '論壇期間共舉辦 18 場技術工作坊、6 場專題演講，以及一場由日本、韓國、泰國、台灣四國頂尖調酒師聯手演出的示範秀。',
      },
    ],
  },
  {
    id: 'newsPost.annual-meeting-2026',
    slug: 'annual-meeting-2026',
    title: '2026 年度會員大會會議紀錄公告',
    excerpt:
      '本屆會員大會已於 2 月 28 日順利召開，通過新年度工作計畫、預算案與第 12 屆理監事改選結果。',
    image: 'goldenCup',
    categoryRef: 'category.announcements',
    tagRefs: [],
    authorRef: 'person.kuo-chih-ling',
    publishedAt: '2026-03-02T09:00:00Z',
    blocks: [
      {
        type: 'p',
        text: '會員大會於 2 月 28 日上午於協會大會堂召開，共有 186 位會員出席，出席率達 78%，已達法定開會人數。',
      },
      {
        type: 'p',
        text: '本屆大會通過 2026 年度工作計畫、預算案，並完成第 12 屆理監事改選。完整會議紀錄已寄送至會員登記信箱。',
      },
    ],
  },
  {
    id: 'newsPost.license-guidance-program',
    slug: 'license-guidance-program',
    title: '調酒師執照輔導計畫正式啟動',
    excerpt:
      '配合勞動部乙級技術士技能檢定，協會推出為期三個月的考照輔導班，協助從業人員取得專業證照。',
    image: 'iba',
    categoryRef: 'category.education',
    tagRefs: ['tag.training'],
    authorRef: 'person.deng-chi-chu',
    publishedAt: '2026-02-25T10:00:00Z',
    blocks: [
      {
        type: 'p',
        text: '乙級證照為調酒產業目前最具公信力的專業認證之一，通過者可於飯店、酒吧、餐飲業界獲得職位加分與薪資調整的實際效益。',
      },
      {
        type: 'p',
        text: '本計畫結合學科、術科兩階段模擬測驗，以及協會資深講師一對一輔導，報名即享會員專屬優惠。',
      },
    ],
  },
  {
    id: 'newsPost.tourism-bureau-award',
    slug: 'tourism-bureau-award',
    title: '協會獲頒觀光局優良培訓單位',
    excerpt:
      '協會長年推動調酒專業教育與國際交流，獲交通部觀光局頒發 2025 年度優良培訓單位獎項。',
    image: 'goldenCup',
    categoryRef: 'category.announcements',
    tagRefs: [],
    authorRef: 'person.kuo-chao-kun',
    publishedAt: '2026-02-18T13:00:00Z',
    blocks: [
      {
        type: 'p',
        text: '交通部觀光局於 2 月 18 日舉辦之「觀光產業人才培訓成果發表會」中，公開表揚協會於 2025 年度對觀光調酒人才培育的貢獻。',
      },
      {
        type: 'p',
        text: '此獎項為協會成立以來第三度獲得，協會將持續深化與產業的合作，推動台灣調酒接軌國際。',
      },
    ],
  },
  {
    id: 'newsPost.winter-workshop',
    slug: 'winter-workshop',
    title: '冬季調酒工作坊：溫熱雞尾酒特輯',
    excerpt:
      '冬季限定工作坊精選 Hot Toddy、Mulled Wine 等六款經典熱調酒，一日體驗式課程即日起受理報名。',
    image: 'iba',
    categoryRef: 'category.events',
    tagRefs: ['tag.cocktail', 'tag.classic'],
    authorRef: 'person.jao-wen-pin',
    publishedAt: '2026-02-10T11:00:00Z',
    blocks: [
      {
        type: 'p',
        text: '熱調酒是許多初學者容易忽略的重要領域。本次工作坊將帶領學員認識六款歐美經典熱調酒的歷史背景、風味結構與現場製作技法。',
      },
      {
        type: 'p',
        text: '工作坊為一日體驗課程，學費含材料費，完課後可帶回協會特製熱調酒配方手冊。',
      },
    ],
  },
]
