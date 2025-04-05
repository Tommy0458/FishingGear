// 附加天气事件数据
import { EVENT_TYPES } from './event_types.js';
import { getEventOptions } from './event_options.js';

export const ExtraWeatherEvents = [
  {
    id: 'EVENT_04',
    type: EVENT_TYPES.EXTRA_WEATHER,
    name: '雷暴天气',
    description: '极端天气不利于钓鱼，而且鱼类活跃度受限。',
    effect: {
      baitEfficiency: -0.4,
      fishActivity: -0.3
    }
    // 选项通过getEventOptions('EVENT_04')获取
  },
  {
    id: 'EVENT_05',
    type: EVENT_TYPES.EXTRA_WEATHER,
    name: '突然下雾',
    description: '稀有的鱼儿出现概率提升。',
    effect: {
      baitEfficiency: 0.1,
      fishActivity: 0.3
    }
    // 选项通过getEventOptions('EVENT_05')获取
  }
];