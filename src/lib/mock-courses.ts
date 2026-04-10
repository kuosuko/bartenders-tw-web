export const MOCK_COURSES = [
  {
    id: '1',
    title: '國際 IBA 專業調酒師認證課程',
    slug: 'iba-professional-bartender-level-1',
    shortDescription: '從基礎技法到專業轉型培訓。成就你的職人夢想，立即報名下期課程。',
    description: '本課程專為想進入專業調酒領域的學員設計，整合國際 IBA 標準與在地市場需求。',
    level: 'intermediate',
    price: 12000,
    memberPrice: 9800,
    duration: '40 小時 (共 10 堂課)',
    featuredImage: 'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?q=80&w=2070&auto=format&fit=crop',
    status: 'open',
    category: '國際認證',
    instructor: 'Gary Ku',
    featured: true,
    syllabus: [
      { 
        title: '調酒基礎工具與杯型認識', 
        description: '了解吧檯靈魂工具的使用時機與保養細節。',
        extraDetails: '包含：量酒器、雪克杯、吧叉匙、過濾器等專用器材操作手法，以及針對不同酒種搭配正確杯型的視覺美學。',
        image: 'https://images.unsplash.com/photo-1574096079513-d8259312b785?q=80&w=1000&auto=format&fit=crop'
      },
      { 
        title: '六大基酒特性與風味分析', 
        description: '深入探討琴酒、伏特加、蘭姆酒、龍舌蘭、威士忌與白蘭地的風味地圖。',
        extraDetails: '學習辨別不同基酒的製程差異與感官評選標準，並練習盲飲判斷酒精度及原料特徵。',
        image: 'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?q=80&w=1000&auto=format&fit=crop'
      },
      { 
        title: '經典雞尾酒調製技法 (Shaking & Stirring)', 
        description: '掌握搖盪與攪拌的核心物理化學變化，確保每一杯酒的平衡。',
        extraDetails: '實作演練：Dry Martini (Stir) 與 Daiquiri (Shake)。重点在於冰塊溶水率控制與空氣感的注入。',
        image: 'https://images.unsplash.com/photo-1510626176961-4b57d4fbad03?q=80&w=1000&auto=format&fit=crop'
      }
    ],
    schedule: [
      { date: '2026-03-01', startTime: '14:00', endTime: '18:00', location: '台北市大安區中心教室' }
    ]
  }
]
