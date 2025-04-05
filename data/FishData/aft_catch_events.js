// 抛竿前事件数据
import { EVENT_TYPES } from './event_types.js';
import { getEventOptions } from './event_options.js';

export const AftCatchEvents = [
  {
    id: 'EVENT_10',
    type: EVENT_TYPES.AFT_CATCH,
    name: '发现奇怪的东西',
    description: '你突然发现了一个奇怪的东西，决定去看看，之后运气爆棚。\n稀有鱼出现概率增加',
    effect: {
      baitEfficiency: 2,
      fishActivity: 2
    },
    // 选项通过getEventOptions('EVENT_06')获取
  },
  {
    id: 'EVENT_11',
    type: EVENT_TYPES.AFT_CATCH,
    name: '邂逅女钓友',
    description: '突然发现女钓友，你决定去搭讪。\n耐久度恢复',
    effect: {
      baitEfficiency: -0.5,
      fishActivity: 0
    },
    // 选项通过getEventOptions('EVENT_07')获取
  }
];