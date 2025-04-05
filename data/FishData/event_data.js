// 导入事件类型和概率配置
export { EVENT_TYPES, EventProbabilities } from './event_types.js';

// 导入各类型事件数据
import { BaseWeatherEvents } from './base_weather_events.js';
import { ExtraWeatherEvents } from './extra_weather_events.js';
import { PreCastEvents } from './pre_cast_events.js';
import { PostCatchEvents } from './post_catch_events.js';
import { AftCatchEvents } from './aft_catch_events.js';

// 合并所有事件数据
export const EventData = [
  ...BaseWeatherEvents,
  ...ExtraWeatherEvents,
  ...PreCastEvents,
  ...PostCatchEvents,
  ...AftCatchEvents
];