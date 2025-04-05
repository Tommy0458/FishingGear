export const FishData = [
    {
      id: 'FISH_01',
      name: '鲫鱼',
      rarity: 1,
      habitats: ['SHALLOW'],
      baitPref: ['BREAD'],
      escapePattern: [2, 1, 3],
      strength: 10,
      image: '../../images/icons/fish.png'
    },
    {
      id: 'FISH_02',
      name: '鲤鱼',
      rarity: 2,
      habitats: ['DEEP'],
      baitPref: ['WORM'],
      escapePattern: [3, 2, 1],
      strength: 30,
      image: '../../images/icons/fish.png'
    },
    {
      id: 'FISH_03',
      name: '草鱼',
      rarity: 2,
      habitats: ['SHALLOW', 'DEEP'],
      baitPref: ['BREAD', 'WORM'],
      escapePattern: [1, 3, 2],
      strength: 70,
      image: '../../images/icons/fish.png'
    },
    {
      id: 'FISH_04',
      name: '鲈鱼',
      rarity: 3,
      habitats: ['DEEP'],
      baitPref: ['LURE'],
      escapePattern: [3, 3, 2],
      strength: 90,
      image: '../../images/icons/fish.png'
    },
    {
      id: 'FISH_05',
      name: '金鱼',
      rarity: 4,
      habitats: ['SHALLOW'],
      baitPref: ['BREAD', 'WORM'],
      escapePattern: [1, 1, 1],
      strength: 10,
      image: '../../images/icons/fish.png'
    },
    {
      id: 'FISH_06',
      name: '山溪鱼',
      rarity: 3,
      habitats: ['SHALLOW'],
      baitPref: ['WORM', 'LURE'],
      escapePattern: [2, 3, 1],
      strength: 65,
      image: '../../images/icons/fish.png',
      waterLimited: 'WATER_01' // 溪流限定
    },
    {
      id: 'FISH_07',
      name: '青鱼',
      rarity: 4,
      habitats: ['DEEP'],
      baitPref: ['WORM', 'LURE'],
      escapePattern: [3, 3, 3],
      strength: 85,
      image: '../../images/icons/fish.png',
      waterLimited: 'WATER_02' // 湖泊限定
    },
    {
      id: 'FISH_08',
      name: '鲶鱼',
      rarity: 3,
      habitats: ['DEEP'],
      baitPref: ['BREAD', 'WORM'],
      escapePattern: [2, 2, 3],
      strength: 75,
      image: '../../images/icons/fish.png',
      waterLimited: 'WATER_03' // 城市河道限定
    }
  ];