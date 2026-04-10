/**
 * Initial content for the aboutPage singleton.
 * Mirrors the hardcoded values from the legacy AboutClient so the first
 * seed produces the same page the editor will see.
 */

export type PresidentEntry = {
  term: string
  name: string
  role: string
  years: string
  highlight: string
  current?: boolean
}

export const PRESIDENTS: PresidentEntry[] = [
  { term: '第1-2屆', name: '莊富雄', role: '創會理事長', years: '1994-2000', highlight: '篳路藍縷，奠定基石' },
  { term: '第3-4屆', name: '郭朝坤', role: '理事長', years: '2000-2006', highlight: '邁向國際' },
  { term: '第5-6屆', name: '謝美美', role: '理事長', years: '2006-2012', highlight: '深耕教育' },
  { term: '第7屆', name: '郭朝坤', role: '理事長', years: '2012-2015', highlight: '競賽輝煌' },
  { term: '第8屆', name: '鄧杞祝', role: '理事長', years: '2015-2018', highlight: '世界冠軍' },
  { term: '第9-10屆', name: '郭朝坤', role: '理事長', years: '2018-2024', highlight: '承先啟後' },
  { term: '第11屆', name: '郭植伶', role: '現任理事長', years: '2025-2029', highlight: '嶄新篇章', current: true },
]

export type FeaturedOfficer = {
  personId: string
  titleEn: string
  displayTitle: string
  meta: string
  ringColor: 'amber' | 'indigo' | 'violet' | 'rose' | 'emerald'
}

export const FEATURED_OFFICERS: FeaturedOfficer[] = [
  {
    personId: 'person.kuo-chih-ling',
    titleEn: 'President',
    displayTitle: '第11屆理事長',
    meta: '2025-2029',
    ringColor: 'amber',
  },
  {
    personId: 'person.hsieh-mei-mei',
    titleEn: 'Ex BAT President',
    displayTitle: '前B.A.T 國際會長',
    meta: '',
    ringColor: 'indigo',
  },
  {
    personId: 'person.kuo-chao-kun',
    titleEn: 'Ex IBA Edu President',
    displayTitle: '前IBA 教育會長',
    meta: '',
    ringColor: 'violet',
  },
]

export type OtherOfficer = {
  personId: string
  titleEn: string
  displayTitle: string
  accentColor: 'amber' | 'indigo' | 'violet' | 'rose' | 'emerald'
}

export const OTHER_OFFICERS: OtherOfficer[] = [
  { personId: 'person.jao-wen-pin', titleEn: 'Vice President', displayTitle: '副會長', accentColor: 'amber' },
  { personId: 'person.deng-chi-chu', titleEn: 'Vice President', displayTitle: '副會長', accentColor: 'amber' },
  { personId: 'person.wang-nien-tzu', titleEn: 'Secretary', displayTitle: '秘書', accentColor: 'emerald' },
]

export type MissionGoal = {
  title: string
  description: string
  color: 'indigo' | 'amber' | 'rose' | 'emerald' | 'violet'
}

export const MISSION_GOALS: MissionGoal[] = [
  { title: '參加 IBA 國際組織', description: '與世界65個會員國建立連結，推動調酒藝術的共通語言', color: 'indigo' },
  { title: '推動技能檢定', description: '促成政府辦理調酒師技能檢定和證照核發', color: 'amber' },
  { title: '爭取世界盃主辦權', description: '爭取辦理世界國際調酒年會與世界盃調酒大賽', color: 'rose' },
  { title: '社會培力', description: '幫助弱勢團體習得一技之長，讓技藝成為改變生命的力量', color: 'emerald' },
  { title: '提升專業知識', description: '持續提升我國調酒師專業知識與國際競爭力', color: 'violet' },
]

export const TASKS: string[] = [
  '中外酒類之調配、研究與示範',
  '國內外酒類及調酒知識之交換與報導',
  '調酒技藝競賽之舉辦',
  '調酒教學教材提供與師資推薦',
  '社會服務、會刊出版事項',
  '承辦政府委託之教育訓練事項',
  '承辦政府委託檢定事項',
  '推廣國際事務，發揚國民外交',
]

export type AchievementStat = {
  value: number
  suffix: string
  label: string
  descEn: string
}

export const ACHIEVEMENT_STATS: AchievementStat[] = [
  { value: 80, suffix: '+', label: '國際獎項', descEn: 'International Awards' },
  { value: 11, suffix: '連霸', label: '亞太盃花式冠軍', descEn: 'Asia Pacific Champion' },
  { value: 2015, suffix: '', label: '史上首次雙料冠軍', descEn: 'World Champion' },
  { value: 32, suffix: '年', label: '專業傳承', descEn: 'Years of Excellence' },
]

export type CompetitionEntry = { year: string; title: string; highlight?: boolean }

export const INTERNATIONAL_COMPETITIONS: CompetitionEntry[] = [
  { year: '2006', title: '世界盃傳統冠軍' },
  { year: '2009', title: '世界盃技藝冠軍' },
  { year: '2013', title: '世界盃傳統銅牌' },
  { year: '2014', title: '世界盃傳統銀牌' },
  { year: '2015', title: '雙料冠軍（傳統+花式）', highlight: true },
]

export const DOMESTIC_COMPETITIONS: string[] = [
  '金爵獎國際調酒大賽',
  '杜康盃',
  '大同盃',
  '五洲盃',
  '竹葉青盃',
  '港都盃',
]

export const INTERNATIONAL_CERTS: string[] = [
  'IBA 國際專業吧檯調酒師初階',
  'IBA 國際專業吧檯調酒師中階',
  '國際葡萄酒師',
  'TIPS 品酒安全課程',
  '國際咖啡師',
]

export const DOMESTIC_CERTS: string[] = [
  '專業咖啡師初階 / 中階',
  '專業泡沫茶師',
  '專業調酒師',
  '專業葡萄師初階 / 中階',
  '飲料調製乙丙級',
]

export const BAT_TEAM = {
  title: '表演團隊',
  description:
    '本協會創立至今，成就出無數個台灣之光，並組成表演團體 B.A.T，由郭植伶、郭詠謚、許博勝三位榮獲技職之光和多項大獎的選手，代表中華民國國際調酒協會推廣調酒藝術。',
  members: ['郭植伶', '郭詠謚', '許博勝'],
  badges: ['技職之光', '國際大獎得主'],
}

export const HERO = {
  eyebrow: 'Established',
  foundedYear: '1994',
  title: '中華民國國際調酒協會',
  subtitle: 'Bartender Association of Taiwan',
  tags: ['IBA 正式會員國', '32 年專業傳承', '80+ 國際獎項'],
}
