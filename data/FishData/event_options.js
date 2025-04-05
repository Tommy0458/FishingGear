// 事件选项数据
import { EVENT_TYPES } from './event_types.js';

// 事件选项数据，按事件ID组织
export const EventOptions = {
  // 基础天气事件选项
  'EVENT_01': [
    { text: '继续钓鱼', successRate: 0.6 },
    { text: '收起鱼竿', result: 'ESCAPE' }
  ],
  'EVENT_02': [
    { text: '继续钓鱼', successRate: 0.8 },
    { text: '更换位置', result: 'CHANGE_SPOT' }
  ],
  'EVENT_03': [
    { text: '坚持钓鱼', successRate: 0.5 },
    { text: '收起鱼竿', result: 'ESCAPE' }
  ],
  
  // 附加天气事件选项
  'EVENT_04': [
    { text: '寻找避雨处', successRate: 0.7 },
    { text: '收起鱼竿', result: 'ESCAPE' }
  ],
  'EVENT_05': [
    { text: '继续钓鱼', successRate: 0.8 },
    { text: '更换鱼饵', result: 'CHANGE_BAIT' }
  ],
  
  // 抛竿前事件选项
  'EVENT_06': [
    { text: '快速抛竿', successRate: 0.7 },
    { text: '耐心等待', successRate: 0.9 }
  ],
  'EVENT_07': [
    { text: '临时修理', successRate: 0.4 },
    { text: '更换钓竿', result: 'CHANGE_ROD' }
  ],
  
  // 中鱼后事件选项
  'EVENT_08': [
    { text: '放松鱼线', successRate: 0.7 },
    { text: '强行拉扯', successRate: 0.4 }
  ],
  'EVENT_09': [
    { text: '稳住鱼竿', successRate: 0.6 },
    { text: '快速收线', successRate: 0.5 }
  ],
  
  // 是否继续钓鱼的选项
  'CONTINUE_FISHING': [
    { text: '是，继续钓鱼' },
    { text: '否，结束钓鱼' }
  ]
};

/**
 * 获取事件选项
 * @param {string} eventId - 事件ID
 * @returns {Array} 事件选项数组
 */
export function getEventOptions(eventId) {
  return EventOptions[eventId] || [];
}