// 中鱼后事件数据
import { EVENT_TYPES } from './event_types.js';
import { getEventOptions } from './event_options.js';

export const PostCatchEvents = [
  {
    id: 'EVENT_08',
    type: EVENT_TYPES.POST_CATCH,
    name: '鱼儿挂到障碍',
    description: '在所难免，耐久度减少',
    effect: {
      catchSuccess: -0.2,
      lineDurability: -10
    }
    // 选项通过getEventOptions('EVENT_08')获取
  },
  {
    id: 'EVENT_09',
    type: EVENT_TYPES.POST_CATCH,
    name: '鱼奋力挣扎',
    description: '鱼儿挣扎失败，耐久度减少',
    effect: {
      catchSuccess: -0.3,
      lineDurability: -15
    }
    // 选项通过getEventOptions('EVENT_09')获取
  }


];