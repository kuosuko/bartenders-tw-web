import { defineField, defineType } from 'sanity'

/**
 * Singleton for the /about page. All content that was hardcoded in the
 * legacy AboutClient lives here so editors can update it via Studio.
 *
 * Pinned as a single document by structure.ts with _id = 'aboutPage'.
 */
export const aboutPage = defineType({
  name: 'aboutPage',
  title: '協會簡介頁面',
  type: 'document',
  groups: [
    { name: 'hero', title: 'Hero' },
    { name: 'history', title: '歷屆理事長' },
    { name: 'leadership', title: '現任團隊' },
    { name: 'mission', title: '發展目標' },
    { name: 'achievements', title: '成就' },
    { name: 'batTeam', title: '表演團隊' },
  ],
  fields: [
    // ----- HERO -----
    defineField({
      name: 'hero',
      title: 'Hero 區塊',
      type: 'aboutHero',
      group: 'hero',
    }),

    // ----- HISTORY -----
    defineField({
      name: 'presidents',
      title: '歷屆理事長',
      type: 'array',
      of: [{ type: 'presidentEntry' }],
      group: 'history',
    }),

    // ----- LEADERSHIP -----
    defineField({
      name: 'featuredOfficers',
      title: '重點幹部 (顯示 3 位大圖)',
      type: 'array',
      of: [{ type: 'leadershipFeatured' }],
      validation: (R) => R.max(3),
      group: 'leadership',
    }),
    defineField({
      name: 'otherOfficers',
      title: '其他幹部 (顯示小圖)',
      type: 'array',
      of: [{ type: 'leadershipOther' }],
      group: 'leadership',
    }),

    // ----- MISSION -----
    defineField({
      name: 'missionEyebrow',
      title: 'Mission eyebrow',
      type: 'string',
      initialValue: 'Mission & Goals',
      group: 'mission',
    }),
    defineField({
      name: 'missionTitle',
      title: 'Mission 標題',
      type: 'string',
      initialValue: '發展目標',
      group: 'mission',
    }),
    defineField({
      name: 'goals',
      title: '發展目標列表',
      type: 'array',
      of: [{ type: 'missionGoal' }],
      group: 'mission',
    }),
    defineField({
      name: 'tasks',
      title: '本會任務 (條列)',
      type: 'array',
      of: [{ type: 'string' }],
      group: 'mission',
    }),

    // ----- ACHIEVEMENTS -----
    defineField({
      name: 'stats',
      title: '統計數字',
      type: 'array',
      of: [{ type: 'achievementStat' }],
      group: 'achievements',
    }),
    defineField({
      name: 'internationalCompetitions',
      title: '國際賽事紀錄',
      type: 'array',
      of: [{ type: 'competitionEntry' }],
      group: 'achievements',
    }),
    defineField({
      name: 'domesticCompetitions',
      title: '國內主辦賽事',
      type: 'array',
      of: [{ type: 'string' }],
      group: 'achievements',
    }),
    defineField({
      name: 'internationalCerts',
      title: '國際認證',
      type: 'array',
      of: [{ type: 'string' }],
      group: 'achievements',
    }),
    defineField({
      name: 'domesticCerts',
      title: '教育部民間證照',
      type: 'array',
      of: [{ type: 'string' }],
      group: 'achievements',
    }),

    // ----- BAT TEAM -----
    defineField({
      name: 'batTeamTitle',
      title: '表演團隊標題',
      type: 'string',
      initialValue: '表演團隊',
      group: 'batTeam',
    }),
    defineField({
      name: 'batTeamDescription',
      title: '表演團隊說明',
      type: 'text',
      rows: 4,
      group: 'batTeam',
    }),
    defineField({
      name: 'batTeamMembers',
      title: '團隊成員 (純文字)',
      type: 'array',
      of: [{ type: 'string' }],
      group: 'batTeam',
    }),
    defineField({
      name: 'batTeamBadges',
      title: '榮譽標籤',
      type: 'array',
      of: [{ type: 'string' }],
      group: 'batTeam',
    }),
    defineField({
      name: 'batTeamImage',
      title: '表演團隊照片 (選填)',
      type: 'image',
      options: { hotspot: true },
      group: 'batTeam',
    }),
  ],
  preview: {
    prepare: () => ({ title: '協會簡介頁面' }),
  },
})
