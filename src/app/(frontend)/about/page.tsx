import { sanityClient } from '@/sanity/client'
import { AboutClient, type AboutData } from './AboutClient'

export const metadata = {
  title: '協會簡介',
  description: '中華民國國際調酒協會成立於民國83年，致力於推廣調酒藝術、培育專業人才，並與IBA國際調酒協會接軌。',
  openGraph: {
    title: '協會簡介 · BAT 台灣調酒師',
    description: '中華民國國際調酒協會成立於民國83年，致力於推廣調酒藝術、培育專業人才，並與IBA國際調酒協會接軌。',
    images: [{ url: '/og-image.png', width: 1200, height: 630 }],
  },
  twitter: { card: 'summary_large_image' as const },
}

const ABOUT_QUERY = /* groq */ `
  *[_type == "aboutPage" && _id == "aboutPage"][0]{
    hero,
    presidents,
    "featuredOfficers": featuredOfficers[]{
      titleEn,
      displayTitle,
      meta,
      ringColor,
      "person": person->{ name, "avatar": avatar.asset->url }
    },
    "otherOfficers": otherOfficers[]{
      titleEn,
      displayTitle,
      accentColor,
      "person": person->{ name, "avatar": avatar.asset->url }
    },
    missionEyebrow,
    missionTitle,
    "goals": goals[]{
      title,
      description,
      color,
      "image": image.asset->url
    },
    tasks,
    stats,
    internationalCompetitions,
    domesticCompetitions,
    internationalCerts,
    domesticCerts,
    batTeamTitle,
    batTeamDescription,
    batTeamMembers,
    batTeamBadges,
    "batTeamImage": batTeamImage.asset->url
  }
`

async function getAboutPage(): Promise<AboutData | null> {
  return sanityClient.fetch(
    ABOUT_QUERY,
    {},
    // ISR: cache forever until revalidated by tag (via Sanity webhook).
    // No periodic refetch — nothing refetches unless aboutPage mutates.
    { next: { revalidate: false } },
  )
}

export default async function AboutPage() {
  const data = await getAboutPage().catch(() => null)

  if (!data) {
    return (
      <div className="min-h-screen bg-zinc-950 flex items-center justify-center text-zinc-400">
        <p>協會簡介內容載入中…</p>
      </div>
    )
  }

  return <AboutClient data={data} />
}
