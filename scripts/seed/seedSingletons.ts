import { client, uploadImageAsset } from './sanityClient'
import {
  HERO,
  PRESIDENTS,
  FEATURED_OFFICERS,
  OTHER_OFFICERS,
  MISSION_GOALS,
  TASKS,
  ACHIEVEMENT_STATS,
  INTERNATIONAL_COMPETITIONS,
  DOMESTIC_COMPETITIONS,
  INTERNATIONAL_CERTS,
  DOMESTIC_CERTS,
  BAT_TEAM,
} from './data/aboutPage'

const LEGACY_PUBLIC = '/home/ubuntu/bartw/bartenders-tw/public'

export async function seedSiteSettings(): Promise<void> {
  console.log('\n[siteSettings] seeding singleton')
  const logo = await uploadImageAsset(`${LEGACY_PUBLIC}/logo.png`, '台灣調酒師協會 Logo')
  const doc = {
    _id: 'siteSettings',
    _type: 'siteSettings',
    siteName: '台灣調酒師協會',
    siteDescription:
      '中華民國國際調酒協會 (台灣調酒師) — 推廣專業調酒文化、舉辦國際賽事、培訓新世代調酒人才。',
    logo,
    contactEmail: 'contact@bartenders.tw',
    contactPhone: '+886-2-0000-0000',
    address: '台北市',
    socialLinks: [
      { _key: 'fb', _type: 'socialLink', platform: 'facebook', url: 'https://www.facebook.com/' },
      { _key: 'ig', _type: 'socialLink', platform: 'instagram', url: 'https://www.instagram.com/' },
    ],
    defaultSeo: {
      _type: 'seo',
      metaTitle: '台灣調酒師協會',
      metaDescription:
        '推廣專業調酒文化、舉辦國際賽事、培訓新世代調酒人才的官方協會網站。',
    },
  }
  await client.createOrReplace(doc)
  console.log('  ✓ siteSettings')
}

export async function seedAboutPage(): Promise<void> {
  console.log('\n[aboutPage] seeding singleton')

  const featuredOfficers = FEATURED_OFFICERS.map((o, i) => ({
    _key: `featured-${i}`,
    _type: 'leadershipFeatured',
    person: { _type: 'reference', _ref: o.personId },
    titleEn: o.titleEn,
    displayTitle: o.displayTitle,
    meta: o.meta,
    ringColor: o.ringColor,
  }))

  const otherOfficers = OTHER_OFFICERS.map((o, i) => ({
    _key: `other-${i}`,
    _type: 'leadershipOther',
    person: { _type: 'reference', _ref: o.personId },
    titleEn: o.titleEn,
    displayTitle: o.displayTitle,
    accentColor: o.accentColor,
  }))

  const presidents = PRESIDENTS.map((p, i) => ({
    _key: `president-${i}`,
    _type: 'presidentEntry',
    ...p,
  }))

  const goals = MISSION_GOALS.map((g, i) => ({
    _key: `goal-${i}`,
    _type: 'missionGoal',
    title: g.title,
    description: g.description,
    color: g.color,
  }))

  const stats = ACHIEVEMENT_STATS.map((s, i) => ({
    _key: `stat-${i}`,
    _type: 'achievementStat',
    ...s,
  }))

  const internationalCompetitions = INTERNATIONAL_COMPETITIONS.map((c, i) => ({
    _key: `ic-${i}`,
    _type: 'competitionEntry',
    ...c,
  }))

  const doc = {
    _id: 'aboutPage',
    _type: 'aboutPage',
    hero: {
      _type: 'aboutHero',
      eyebrow: HERO.eyebrow,
      foundedYear: HERO.foundedYear,
      title: HERO.title,
      subtitle: HERO.subtitle,
      tags: HERO.tags,
    },
    presidents,
    featuredOfficers,
    otherOfficers,
    missionEyebrow: 'Mission & Goals',
    missionTitle: '發展目標',
    goals,
    tasks: TASKS,
    stats,
    internationalCompetitions,
    domesticCompetitions: DOMESTIC_COMPETITIONS,
    internationalCerts: INTERNATIONAL_CERTS,
    domesticCerts: DOMESTIC_CERTS,
    batTeamTitle: BAT_TEAM.title,
    batTeamDescription: BAT_TEAM.description,
    batTeamMembers: BAT_TEAM.members,
    batTeamBadges: BAT_TEAM.badges,
  }

  await client.createOrReplace(doc)
  console.log('  ✓ aboutPage')
}

export async function seedNavigation(): Promise<void> {
  console.log('\n[navigation] seeding singleton')
  const doc = {
    _id: 'navigation',
    _type: 'navigation',
    mainNav: [
      { _key: 'home', _type: 'navItem', label: '首頁', link: '/' },
      { _key: 'news', _type: 'navItem', label: '最新消息', link: '/news' },
      { _key: 'courses', _type: 'navItem', label: '課程', link: '/courses' },
      { _key: 'about', _type: 'navItem', label: '關於我們', link: '/about' },
    ],
    footerNav: [
      {
        _key: 'about',
        _type: 'footerColumn',
        heading: '關於協會',
        links: [
          { _key: 'mission', _type: 'navLink', label: '宗旨與使命', link: '/about' },
          { _key: 'team', _type: 'navLink', label: '師資團隊', link: '/about#team' },
        ],
      },
      {
        _key: 'resources',
        _type: 'footerColumn',
        heading: '資源',
        links: [
          { _key: 'news', _type: 'navLink', label: '最新消息', link: '/news' },
          { _key: 'courses', _type: 'navLink', label: '課程列表', link: '/courses' },
        ],
      },
    ],
  }
  await client.createOrReplace(doc)
  console.log('  ✓ navigation')
}
