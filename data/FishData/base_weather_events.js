// 基础天气事件数据
import { EVENT_TYPES } from './event_types.js';
import { getEventOptions } from './event_options.js';

export const BaseWeatherEvents = [
  // {
  //   id: 'EVENT_01',
  //   type: EVENT_TYPES.BASE_WEATHER,
  //   name: '突然下雨',
  //   effect: {
  //     baitEfficiency: -0.3,
  //     fishActivity: 0.2
  //   },
  //   // 选项通过getEventOptions('EVENT_01')获取
  // },
  {
    id: 'EVENT_02',
    type: EVENT_TYPES.BASE_WEATHER,
    name: '阳光明媚',
    effect: {
      baitEfficiency: 0.2,
      fishActivity: 0.1
    },
    // 选项通过getEventOptions('EVENT_02')获取
  }
  // ,{
  //   id: 'EVENT_03',
  //   type: EVENT_TYPES.BASE_WEATHER,
  //   name: '大风天气',
  //   effect: {
  //     baitEfficiency: -0.2,
  //     fishActivity: -0.1
  //   },
  //   // 选项通过getEventOptions('EVENT_03')获取
  // }
];