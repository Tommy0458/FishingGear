// 事件类型常量
export const EVENT_TYPES = {
  BASE_WEATHER: 'BASE_WEATHER',     // 基础天气事件
  EXTRA_WEATHER: 'EXTRA_WEATHER',   // 附加天气事件
  PRE_CAST: 'PRE_CAST',             // 抛竿前天气事件
  POST_CATCH: 'POST_CATCH',             // 中鱼后事件
  AFT_CATCH: 'AFT_CATCH'            // 中鱼后事件
};

// 事件触发率配置
export const EventProbabilities = {
  [EVENT_TYPES.BASE_WEATHER]: 0.15,  // 基础天气事件触发率
  [EVENT_TYPES.EXTRA_WEATHER]: 0.10, // 附加天气事件触发率
  [EVENT_TYPES.PRE_CAST]: 0.5,      // 抛竿前天气事件触发率
  [EVENT_TYPES.POST_CATCH]: 0.10,    // 中鱼后事件触发率
  [EVENT_TYPES.AFT_CATCH]: 0.10,    // 中鱼后事件触发率
  NONE: 0.60                         // 无事件触发率
};