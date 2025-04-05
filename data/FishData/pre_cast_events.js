// 抛竿前事件数据
import { EVENT_TYPES } from './event_types.js';
import { getEventOptions } from './event_options.js';

export const PreCastEvents = [
  // {
  //   id: 'EVENT_06',
  //   type: EVENT_TYPES.PRE_CAST,
  //   name: '鱼群经过',
  //   effect: {
  //     baitEfficiency: 0.5,
  //     fishActivity: 0.5
  //   },
  //   // 选项通过getEventOptions('EVENT_06')获取
  // },
  {
    id: 'EVENT_07',
    type: EVENT_TYPES.PRE_CAST,
    name: '抛竿挂到身后的植物',
    description: '心情低落，钓鱼效率下降',
    effect: {
      baitEfficiency: -0.5,
      fishActivity: 0
    },
    // 选项通过getEventOptions('EVENT_07')获取
  }
];