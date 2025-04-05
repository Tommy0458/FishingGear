export const WaterData = [
  {
    id: 'WATER_01',
    name: '溪流',
    description: '清澈的山间溪流，水流湍急，适合钓一些喜欢流水的鱼类。',
    image: '../../images/icons/stream.png',
    fishProbabilities: {//鱼概率
      'FISH_01': 0.35, // 鲫鱼
      'FISH_03': 0.25, // 草鱼
      'FISH_05': 0.25, // 金鱼
      'FISH_06': 0.15  // 溪流限定：山溪鱼
    },
    backgroundImage: '../../images/icons/stream_bg.png'
  }
  // ,{
  //   id: 'WATER_02',
  //   name: '湖泊',
  //   description: '宁静的湖泊，水域开阔，是各种鱼类的栖息地。',
  //   image: '../../images/icons/lake.png',
  //   fishProbabilities: {
  //     'FISH_01': 0.2, // 鲫鱼
  //     'FISH_02': 0.3, // 鲤鱼
  //     'FISH_03': 0.2, // 草鱼
  //     'FISH_04': 0.2, // 鲈鱼
  //     'FISH_07': 0.1  // 湖泊限定：青鱼
  //   },
  //   backgroundImage: '../../images/icons/lake_bg.png'
  // },
  // {
  //   id: 'WATER_03',
  //   name: '城市河道',
  //   description: '城市中的河道，水质一般，但也有不少鱼类生存。',
  //   image: '../../images/icons/urban_river.png',
  //   fishProbabilities: {
  //     'FISH_01': 0.3, // 鲫鱼
  //     'FISH_02': 0.3, // 鲤鱼
  //     'FISH_05': 0.3, // 金鱼
  //     'FISH_08': 0.1  // 城市河道限定：鲶鱼
  //   },
  //   backgroundImage: '../../images/icons/urban_river_bg.png'
  // }
];