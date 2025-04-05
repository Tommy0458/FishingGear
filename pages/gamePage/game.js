import { FishData } from '../../data/FishData/fish_data.js';
import { EventData } from '../../data/FishData/event_data.js';
import { EVENT_TYPES, EventProbabilities } from '../../data/FishData/event_types.js';
import { WaterData } from '../../data/FishData/water_data.js';
import { getEventOptions } from '../../data/FishData/event_options.js';
import { randomInt } from '../../utils/rng.js';

/**
 * 钓鱼游戏核心类
 * 负责管理游戏状态、事件触发和结果判定
 */
export class FishingGame {
  constructor() {
    // 游戏状态
    this.state = 'PREPARE'; // PREPARE, FISHING, SETTLE
    this.equipment = {
      BAIT: null, // 鱼饵类型
      ROD: 'BASIC', // 鱼竿类型，默认为基础
      LINE: 'BASIC' // 鱼线类型，默认为基础
    };
    
    // 游戏数据
    this.lineDurability = 100; // 鱼线耐久度
    this.catchedFish = []; // 已捕获的鱼
    this.eventLog = []; // 事件日志
    this.currentFish = null; // 当前咬钩的鱼
    this.currentEvent = null; // 当前触发的事件
    this.consecutiveNoEvents = 0; // 连续无事件计数器
    this.maxConsecutiveNoEvents = 3; // 最大连续无事件次数
    this.currentWaterId = null; // 当前水域ID
    this.extraWeatherCounter = 0; // 附加天气事件触发后的计数器
    this.extraWeatherInterval = 4; // 附加天气事件触发的间隔次数
    this.preCastCounter = 0; // 抛竿前事件触发后的计数器
    this.postCatchCounter = 0; // 中鱼后事件触发后的计数器
    this.aftCatchCounter = 0; // 钓到鱼后事件触发后的计数器
    this.eventInterval = 4; // 事件触发的间隔次数
    this.hasTriggeredBaseWeather = false; // 是否已触发过基础天气事件
    this.hasTriggeredPreOrPostEvent = false; // 本轮是否已触发pre_cast或post_catch事件
    this.hasTriggeredAftCatchEvent = false; // 本轮是否已触发aft_catch事件
    
    // 游戏配置
    this.eventProbabilities = {
      FISH_BITE: 0.3, // 鱼咬钩概率
      ...EventProbabilities // 从事件数据中导入事件概率配置
    };
  }
  
  /**
   * 选择装备
   * @param {string} type - 装备类型 (BAIT, ROD, LINE)
   * @param {string} item - 装备名称
   */
  selectEquipment(type, item) {
    this.log(`[DEBUG] 尝试选择装备，类型: ${type}, 物品: ${item}, 当前状态: ${this.state}`);
    
    if (this.state !== 'PREPARE') {
      this.log(`[DEBUG] 错误: 当前状态不是准备状态，无法选择装备`);
      return false;
    }
    
    this.equipment[type] = item;
    this.log(`[DEBUG] 已设置装备 ${type} = ${item}`);
    
    // 如果是鱼饵选择，检查是否需要替换之前的记录
    if (type === 'BAIT') {
      // 查找最后一条鱼饵选择记录
      const lastBaitIndex = this.eventLog.findIndex(log => log.startsWith('选择了BAIT:'));
      this.log(`[DEBUG] 查找鱼饵选择记录，结果索引: ${lastBaitIndex}`);
      
      if (lastBaitIndex !== -1) {
        // 替换最后一条鱼饵选择记录
        this.eventLog[lastBaitIndex] = `选择了${type}: ${item}`;
        this.log(`[DEBUG] 更新鱼饵选择记录，索引: ${lastBaitIndex}, 新值: 选择了${type}: ${item}`);
      } else {
        // 没有找到鱼饵选择记录，添加新记录
        this.log(`选择了${type}: ${item}`);
        this.log(`[DEBUG] 添加新的鱼饵选择记录`);
      }
    } else {
      // 非鱼饵装备，正常记录
      this.log(`选择了${type}: ${item}`);
      this.log(`[DEBUG] 添加非鱼饵装备选择记录`);
    }
    
    return true;
  }
  
  /**
   * 开始钓鱼
   */
  startFishing() {
    this.log(`[DEBUG] 尝试开始钓鱼，当前状态: ${this.state}, 当前鱼饵: ${this.equipment.BAIT}`);
    
    if (this.state !== 'PREPARE') {
      this.log(`[DEBUG] 错误: 当前状态不是准备状态，无法开始钓鱼`);
      return false;
    }
    
    if (!this.equipment.BAIT) {
      this.log(`[DEBUG] 错误: 未选择鱼饵，无法开始钓鱼`);
      return false;
    }
    
    // 重置天气事件相关状态
    this.hasTriggeredBaseWeather = false;
    this.hasTriggeredPreOrPostEvent = false;
    this.hasTriggeredAftCatchEvent = false;
    this.extraWeatherCounter = 0;
    this.preCastCounter = 0;
    this.postCatchCounter = 0;
    this.aftCatchCounter = 0;
    
    this.state = 'FISHING';
    this.log(`[DEBUG] 游戏状态已更改为钓鱼中`);
    this.log('开始钓鱼');
    
    // 在开始钓鱼时直接触发一次基础天气事件
    this.log(`[DEBUG] 开始钓鱼时强制触发基础天气事件`);
    this.triggerEvent(EVENT_TYPES.BASE_WEATHER);
    
    return true;
  }
  
  /**
   * 触发随机事件
   * @param {string} forcedEventType - 强制触发的事件类型（可选）
   * @returns {string} 事件类型
   */
  triggerEvent(forcedEventType = null) {
    if (this.state !== 'FISHING') {
      this.log('[DEBUG] 当前不是钓鱼状态，无法触发事件，当前状态: ' + this.state);
      return null;
    }
    
    this.log('[DEBUG] 开始触发事件，当前鱼饵: ' + this.equipment.BAIT + ', 当前水域ID: ' + this.currentWaterId);
    
    // 如果指定了强制触发的事件类型，则直接触发该类型事件
    if (forcedEventType) {
      this.log(`[DEBUG] 强制触发事件类型: ${forcedEventType}`);
      
      switch (forcedEventType) {
        case 'FISH_BITE':
          this.log('[DEBUG] 尝试强制触发鱼咬钩事件');
          const success = this._handleFishBite();
          if (!success) {
            this.log('[DEBUG] 尝试触发鱼咬钩事件失败，可能没有鱼对当前鱼饵感兴趣');
            return 'NONE';
          }
          this.log('[DEBUG] 强制触发鱼咬钩事件成功');
          return forcedEventType;
          
        case EVENT_TYPES.BASE_WEATHER:
          // 只有在还没触发过基础天气事件的情况下才触发
          if (!this.hasTriggeredBaseWeather) {
            this.log('[DEBUG] 强制触发基础天气事件');
            this._handleWeatherEvent(EVENT_TYPES.BASE_WEATHER);
            this.hasTriggeredBaseWeather = true;
            return forcedEventType;
          } else {
            this.log('[DEBUG] 基础天气事件已经触发过，忽略此次触发');
            return 'NONE';
          }
          
        case EVENT_TYPES.EXTRA_WEATHER:
          // 检查是否满足附加天气事件触发条件
          // 如果本轮已触发了pre_cast_events或post_catch_events，不触发extra_weather_events
          if (this.hasTriggeredPreOrPostEvent) {
            this.log('[DEBUG] 本轮已触发pre_cast或post_catch事件，不触发附加天气事件');
            return 'NONE';
          }
          
          // 附加天气不会连续触发，在一次触发后，间隔4次判断，再次触发
          if (this.extraWeatherCounter < this.extraWeatherInterval) {
            this.log(`[DEBUG] 附加天气事件触发间隔未到(${this.extraWeatherCounter}/${this.extraWeatherInterval})，不触发附加天气事件`);
            this.extraWeatherCounter++;
            return 'NONE';
          }
          
          this.log('[DEBUG] 强制触发附加天气事件');
          this._handleWeatherEvent(EVENT_TYPES.EXTRA_WEATHER);
          this.extraWeatherCounter = 0; // 重置计数器
          return forcedEventType;
          
        case EVENT_TYPES.POST_CATCH:
          // 检查是否满足中鱼后事件触发条件
          if (this.postCatchCounter < this.eventInterval) {
            this.log(`[DEBUG] 中鱼后事件触发间隔未到(${this.postCatchCounter}/${this.eventInterval})，不触发中鱼后事件`);
            this.postCatchCounter++;
            return 'NONE';
          }
          
          this.log('[DEBUG] 强制触发中鱼后事件');
          this._handleWeatherEvent(EVENT_TYPES.POST_CATCH);
          this.hasTriggeredPreOrPostEvent = true; // 标记已触发post_catch事件
          this.postCatchCounter = 0; // 重置计数器
          return forcedEventType;
          
        case EVENT_TYPES.PRE_CAST:
          // 检查是否满足抛竿前事件触发条件
          if (this.preCastCounter < this.eventInterval) {
            this.log(`[DEBUG] 抛竿前事件触发间隔未到(${this.preCastCounter}/${this.eventInterval})，不触发抛竿前事件`);
            this.preCastCounter++;
            return 'NONE';
          }
          
          this.log('[DEBUG] 强制触发抛竿前事件');
          this._handleWeatherEvent(EVENT_TYPES.PRE_CAST);
          this.hasTriggeredPreOrPostEvent = true; // 标记已触发pre_cast事件
          this.preCastCounter = 0; // 重置计数器
          return forcedEventType;
          
        case EVENT_TYPES.AFT_CATCH:
          // 检查是否满足钓到鱼后事件触发条件
          if (this.aftCatchCounter < this.eventInterval) {
            this.log(`[DEBUG] 钓到鱼后事件触发间隔未到(${this.aftCatchCounter}/${this.eventInterval})，不触发钓到鱼后事件`);
            this.aftCatchCounter++;
            return 'NONE';
          }
          
          this.log('[DEBUG] 强制触发钓到鱼后事件');
          this._handleAftCatchEvent();
          this.hasTriggeredAftCatchEvent = true; // 标记已触发aft_catch事件
          this.aftCatchCounter = 0; // 重置计数器
          return forcedEventType;
          
        default:
          this.log(`[DEBUG] 未知的强制事件类型: ${forcedEventType}`);
          return 'NONE';
      }
    }
    
    // 随机数决定事件类型
    const rand = Math.random();
    let eventType = 'NONE';
    
    this.log(`[DEBUG] 触发事件随机数: ${rand.toFixed(6)}`);
    this.log(`[DEBUG] 当前事件概率配置: 鱼咬钩=${this.eventProbabilities.FISH_BITE.toFixed(4)}, 基础天气=${this.eventProbabilities[EVENT_TYPES.BASE_WEATHER].toFixed(4)}, 附加天气=${this.eventProbabilities[EVENT_TYPES.EXTRA_WEATHER].toFixed(4)}, 抛竿前=${this.eventProbabilities[EVENT_TYPES.PRE_CAST].toFixed(4)}, 中鱼后=${this.eventProbabilities[EVENT_TYPES.POST_CATCH].toFixed(4)}, 钓到鱼后=${this.eventProbabilities[EVENT_TYPES.AFT_CATCH].toFixed(4)}, 无事件=${this.eventProbabilities.NONE.toFixed(4)}`);
    
    // 检查是否达到最大连续无事件次数，如果是则强制触发一个事件
    if (this.consecutiveNoEvents >= this.maxConsecutiveNoEvents) {
      // 强制触发鱼咬钩或天气事件，各50%概率
      const forcedRand = Math.random();
      this.log(`[DEBUG] 已连续${this.consecutiveNoEvents}次无事件，强制触发事件，随机数: ${forcedRand.toFixed(6)}`);
      
      if (forcedRand < 0.5) {
        eventType = 'FISH_BITE';
        this.log('[DEBUG] 强制触发鱼咬钩事件，概率判定: ' + forcedRand.toFixed(6) + ' < 0.5');
        const success = this._handleFishBite();
        if (success) {
          this.log('经过长时间等待，终于有鱼咬钩了！');
          this.log('[DEBUG] 强制鱼咬钩事件处理成功');
        } else {
          this.log('尝试触发鱼咬钩事件失败，可能没有鱼对当前鱼饵感兴趣');
          this.log('[DEBUG] 强制鱼咬钩事件处理失败，没有找到匹配的鱼');
          eventType = 'NONE';
        }
      } else {
        // 随机选择一种天气事件类型
        const weatherTypes = [EVENT_TYPES.BASE_WEATHER, EVENT_TYPES.EXTRA_WEATHER];
        const randomIndex = Math.floor(Math.random() * weatherTypes.length);
        const randomWeatherType = weatherTypes[randomIndex];
        this.log(`[DEBUG] 强制触发天气事件，选择索引: ${randomIndex}, 事件类型: ${randomWeatherType}`);
        eventType = randomWeatherType;
        this._handleWeatherEvent(randomWeatherType);
        this.log('经过长时间等待，天气发生了变化！');
      }
      this.consecutiveNoEvents = 0; // 重置计数器
      this.log('[DEBUG] 重置连续无事件计数器为0');
    } else {
      // 计算各事件的累积概率
      let cumulativeProbability = 0;
      
      // 鱼咬钩事件
      cumulativeProbability += this.eventProbabilities.FISH_BITE;
      this.log(`[DEBUG] 累积概率计算: 鱼咬钩事件 = ${cumulativeProbability.toFixed(6)}`);
      
      if (rand < cumulativeProbability) {
        eventType = 'FISH_BITE';
        this.log(`[DEBUG] 触发鱼咬钩事件，概率判定: ${rand.toFixed(6)} < ${cumulativeProbability.toFixed(6)}`);
        const success = this._handleFishBite();
        if (!success) {
          this.log('尝试触发鱼咬钩事件失败，可能没有鱼对当前鱼饵感兴趣');
          this.log('[DEBUG] 鱼咬钩事件处理失败，没有找到匹配的鱼');
          eventType = 'NONE';
          this.consecutiveNoEvents++; // 增加连续无事件计数
          this.log(`[DEBUG] 增加连续无事件计数，当前值: ${this.consecutiveNoEvents}`);
        } else {
          this.consecutiveNoEvents = 0; // 重置计数器
          this.log('[DEBUG] 重置连续无事件计数器为0');
        }
      }
      // 基础天气事件
      else {
        cumulativeProbability += this.eventProbabilities[EVENT_TYPES.BASE_WEATHER];
        this.log(`[DEBUG] 累积概率计算: 基础天气事件 = ${cumulativeProbability.toFixed(6)}`);
        
        if (rand < cumulativeProbability) {
          eventType = EVENT_TYPES.BASE_WEATHER;
          this.log(`[DEBUG] 触发基础天气事件，概率判定: ${rand.toFixed(6)} < ${cumulativeProbability.toFixed(6)}`);
          this._handleWeatherEvent(EVENT_TYPES.BASE_WEATHER);
          this.consecutiveNoEvents = 0; // 重置计数器
          this.log('[DEBUG] 重置连续无事件计数器为0');
        }
        // 附加天气事件
        else {
          cumulativeProbability += this.eventProbabilities[EVENT_TYPES.EXTRA_WEATHER];
          this.log(`[DEBUG] 累积概率计算: 附加天气事件 = ${cumulativeProbability.toFixed(6)}`);
          
          if (rand < cumulativeProbability) {
            // 如果本轮已触发了pre_cast_events或post_catch_events，不触发extra_weather_events
            if (this.hasTriggeredPreOrPostEvent) {
              this.log('[DEBUG] 本轮已触发pre_cast或post_catch事件，不触发附加天气事件');
              // 继续累积概率，但不触发事件
            }
            // 附加天气不会连续触发，在一次触发后，间隔4次判断，再次触发
            else if (this.extraWeatherCounter < this.extraWeatherInterval) {
              this.log(`[DEBUG] 附加天气事件触发间隔未到(${this.extraWeatherCounter}/${this.extraWeatherInterval})，不触发附加天气事件`);
              this.extraWeatherCounter++;
              // 继续累积概率，但不触发事件
            }
            else {
              eventType = EVENT_TYPES.EXTRA_WEATHER;
              this.log(`[DEBUG] 触发附加天气事件，概率判定: ${rand.toFixed(6)} < ${cumulativeProbability.toFixed(6)}`);
              this._handleWeatherEvent(EVENT_TYPES.EXTRA_WEATHER);
              this.extraWeatherCounter = 0; // 重置计数器
              this.consecutiveNoEvents = 0; // 重置计数器
              this.log('[DEBUG] 重置连续无事件计数器为0');
            }
          }
          // 中鱼后事件
          else {
            cumulativeProbability += this.eventProbabilities[EVENT_TYPES.POST_CATCH];
            this.log(`[DEBUG] 累积概率计算: 中鱼后事件 = ${cumulativeProbability.toFixed(6)}`);
            
            if (rand < cumulativeProbability && this.currentFish && !this.hasTriggeredPreOrPostEvent && !this.hasTriggeredAftCatchEvent && this.postCatchCounter >= this.eventInterval) {
              eventType = EVENT_TYPES.POST_CATCH;
              this.log(`[DEBUG] 触发中鱼后事件，概率判定: ${rand.toFixed(6)} < ${cumulativeProbability.toFixed(6)}`);
              this._handleWeatherEvent(EVENT_TYPES.POST_CATCH);
              this.hasTriggeredPreOrPostEvent = true;
              this.postCatchCounter = 0; // 重置计数器
              this.consecutiveNoEvents = 0; // 重置计数器
              this.log('[DEBUG] 重置连续无事件计数器为0');
            }
            // 抛竿前事件
            else {
              cumulativeProbability += this.eventProbabilities[EVENT_TYPES.PRE_CAST];
              this.log(`[DEBUG] 累积概率计算: 抛竿前事件 = ${cumulativeProbability.toFixed(6)}`);
              
              if (rand < cumulativeProbability && !this.hasTriggeredPreOrPostEvent && !this.hasTriggeredAftCatchEvent && this.preCastCounter >= this.eventInterval) {
                eventType = EVENT_TYPES.PRE_CAST;
                this.log(`[DEBUG] 触发抛竿前事件，概率判定: ${rand.toFixed(6)} < ${cumulativeProbability.toFixed(6)}`);
                this._handleWeatherEvent(EVENT_TYPES.PRE_CAST);
                this.hasTriggeredPreOrPostEvent = true;
                this.preCastCounter = 0; // 重置计数器
                this.consecutiveNoEvents = 0; // 重置计数器
                this.log('[DEBUG] 重置连续无事件计数器为0');
              }
              // 钓到鱼后事件
              else {
                cumulativeProbability += this.eventProbabilities[EVENT_TYPES.AFT_CATCH];
                this.log(`[DEBUG] 累积概率计算: 钓到鱼后事件 = ${cumulativeProbability.toFixed(6)}`);
                
                if (rand < cumulativeProbability && !this.hasTriggeredPreOrPostEvent && !this.hasTriggeredAftCatchEvent && this.aftCatchCounter >= this.eventInterval) {
                  eventType = EVENT_TYPES.AFT_CATCH;
                  this.log(`[DEBUG] 触发钓到鱼后事件，概率判定: ${rand.toFixed(6)} < ${cumulativeProbability.toFixed(6)}`);
                  this._handleAftCatchEvent();
                  this.hasTriggeredAftCatchEvent = true;
                  this.aftCatchCounter = 0; // 重置计数器
                  this.consecutiveNoEvents = 0; // 重置计数器
                  this.log('[DEBUG] 重置连续无事件计数器为0');
                }
                // 无事件
                else {
                  this.log('平静无事发生...');
                  this.log(`[DEBUG] 无事件触发，概率判定: ${rand.toFixed(6)} >= ${cumulativeProbability.toFixed(6)}`);
                  this.consecutiveNoEvents++; // 增加连续无事件计数
                  this.log(`[DEBUG] 增加连续无事件计数，当前值: ${this.consecutiveNoEvents}`);
                  this.log(`已连续${this.consecutiveNoEvents}次无事件发生`);
                  
                  // 增加各事件计数器
                  if (this.preCastCounter < this.eventInterval) this.preCastCounter++;
                  if (this.postCatchCounter < this.eventInterval) this.postCatchCounter++;
                  if (this.aftCatchCounter < this.eventInterval) this.aftCatchCounter++;
                }
              }
            }
          }
        }
      }
    }
    
    this.log(`触发事件类型: ${eventType}`);
    return eventType;
  }
  
  /**
   * 处理玩家选择
   * @param {number} choiceIndex - 选择的选项索引
   */
  handleChoice(choiceIndex) {
    if (this.state !== 'FISHING') return false;
    
    if (this.currentEvent) {
      // 检查是否是继续钓鱼的提示
      if (this.currentEvent.type === 'CONTINUE_PROMPT') {
        return this._handleContinueFishingChoice(choiceIndex);
      }
      // 处理其他类型的事件
      return this._handleWeatherChoice(choiceIndex);
    } else if (this.currentFish) {
      return this._handleFishingChoice(choiceIndex);
    }
    
    return false;
  }
  
  /**
   * 结束钓鱼
   */
  endFishing() {
    this.log(`[DEBUG] 结束钓鱼，当前状态: ${this.state}`);
    this.state = 'SETTLE';
    this.log(`[DEBUG] 游戏状态已更改为结算`);
    this.log('钓鱼结束');
    return true;
  }
  
  /**
   * 重新开始
   */
  restart() {
    this.log(`[DEBUG] 重新开始游戏，当前状态: ${this.state}`);
    this.state = 'PREPARE';
    this.lineDurability = 100;
    this.catchedFish = [];
    this.eventLog = [];
    this.currentFish = null;
    this.currentEvent = null;
    this.consecutiveNoEvents = 0; // 重置连续无事件计数器
    this.log(`[DEBUG] 游戏状态已重置，当前状态: ${this.state}`);
    this.log('重新开始');
    return true;
  }
  
  /**
   * 记录日志
   * @private
   * @param {string} message - 日志消息
   */
  log(message) {
    // 将日志添加到事件日志数组
    this.eventLog.push(message);
    
    // 输出到控制台，调试日志使用不同的标记以便于区分
    if (message.startsWith('[DEBUG]')) {
      console.log(`[FishingGame:DEBUG] ${message}`);
    } else {
      console.log(`[FishingGame] ${message}`);
    }
  }
  
  /**
   * 处理鱼咬钩事件
   * @private
   * @returns {boolean} 是否成功触发鱼咬钩事件
   */
  _handleFishBite() {
    this.log('[DEBUG] 开始处理鱼咬钩事件');
    this.log(`[DEBUG] 当前鱼饵: ${this.equipment.BAIT}, 当前水域ID: ${this.currentWaterId}`);
    
    // 获取当前水域数据
    const currentWater = this.currentWaterId ? 
      WaterData.find(water => water.id === this.currentWaterId) : null;
    
    // 如果没有指定水域，使用默认逻辑
    if (!currentWater) {
      this.log('[DEBUG] 未指定水域，使用默认鱼种选择逻辑');
      
      // 根据鱼饵类型选择可能咬钩的鱼
      const possibleFish = FishData.filter(fish => 
        fish.baitPref.includes(this.equipment.BAIT)
      );
      
      this.log(`[DEBUG] 找到对当前鱼饵(${this.equipment.BAIT})感兴趣的鱼: ${possibleFish.length}条`);
      if (possibleFish.length > 0) {
        this.log(`[DEBUG] 可能的鱼种: ${possibleFish.map(f => f.name).join(', ')}`);
      }
      
      if (possibleFish.length === 0) {
        this.log('[DEBUG] 没有鱼对当前鱼饵感兴趣，鱼咬钩事件失败');
        this.log('没有鱼对当前鱼饵感兴趣');
        return false;
      }
      
      // 随机选择一条鱼
      const fishIndex = randomInt(0, possibleFish.length - 1);
      this.log(`[DEBUG] 随机选择鱼索引: ${fishIndex}, 总数: ${possibleFish.length}`);
      this.currentFish = possibleFish[fishIndex];
      this.log(`[DEBUG] 选中的鱼: ${this.currentFish.name}, ID: ${this.currentFish.id}`);
    } else {
      this.log(`[DEBUG] 使用水域(${currentWater.name})特定的鱼种概率`);
      
      // 使用水域特定的鱼种概率
      const fishProbabilities = currentWater.fishProbabilities;
      const fishIds = Object.keys(fishProbabilities);
      this.log(`[DEBUG] 水域中的鱼种总数: ${fishIds.length}`);
      
      // 过滤出对当前鱼饵感兴趣的鱼
      const possibleFishIds = fishIds.filter(fishId => {
        const fish = FishData.find(f => f.id === fishId);
        return fish && fish.baitPref.includes(this.equipment.BAIT);
      });
      
      this.log(`[DEBUG] 对当前鱼饵(${this.equipment.BAIT})感兴趣的鱼种数: ${possibleFishIds.length}`);
      if (possibleFishIds.length > 0) {
        const fishNames = possibleFishIds.map(id => {
          const fish = FishData.find(f => f.id === id);
          return fish ? fish.name : id;
        }).join(', ');
        this.log(`[DEBUG] 可能的鱼种: ${fishNames}`);
      }
      
      if (possibleFishIds.length === 0) {
        this.log('[DEBUG] 没有鱼对当前鱼饵感兴趣，鱼咬钩事件失败');
        this.log('没有鱼对当前鱼饵感兴趣');
        return false;
      }
      
      // 根据概率选择鱼种
      const rand = Math.random();
      this.log(`[DEBUG] 鱼种选择随机数: ${rand.toFixed(6)}`);
      let cumulativeProbability = 0;
      let selectedFishId = null;
      
      // 重新计算概率总和（仅考虑对当前鱼饵感兴趣的鱼）
      const totalProbability = possibleFishIds.reduce((sum, fishId) => 
        sum + fishProbabilities[fishId], 0);
      this.log(`[DEBUG] 概率总和(仅考虑对当前鱼饵感兴趣的鱼): ${totalProbability.toFixed(6)}`);
      
      // 根据概率选择鱼种
      for (const fishId of possibleFishIds) {
        // 归一化概率
        const normalizedProbability = fishProbabilities[fishId] / totalProbability;
        cumulativeProbability += normalizedProbability;
        
        const fish = FishData.find(f => f.id === fishId);
        const fishName = fish ? fish.name : fishId;
        this.log(`[DEBUG] 鱼种(${fishName})概率: ${normalizedProbability.toFixed(6)}, 累积概率: ${cumulativeProbability.toFixed(6)}`);
        
        if (rand <= cumulativeProbability) {
          selectedFishId = fishId;
          this.log(`[DEBUG] 选中鱼种ID: ${selectedFishId}, 随机数(${rand.toFixed(6)}) <= 累积概率(${cumulativeProbability.toFixed(6)})`);
          break;
        }
      }
      
      // 如果没有选中，选择第一个
      if (!selectedFishId && possibleFishIds.length > 0) {
        selectedFishId = possibleFishIds[0];
        this.log(`[DEBUG] 未通过概率选中鱼种，默认选择第一个: ${selectedFishId}`);
      }
      
      this.currentFish = FishData.find(fish => fish.id === selectedFishId);
      if (this.currentFish) {
        this.log(`[DEBUG] 最终选中的鱼: ${this.currentFish.name}, ID: ${this.currentFish.id}`);
      } else {
        this.log(`[DEBUG] 错误: 未能找到ID为${selectedFishId}的鱼`);
        return false;
      }
    }
    
    // 添加标记，表示鱼已咬钩但尚未显示FishOn弹窗
    this.currentFish.fishBiteTime = Date.now();
    this.log(`${this.currentFish.name}咬钩了！`);
    return true;
  }
  
  /**
   * 处理事件
   * @private
   * @param {string} eventType - 事件类型
   */
  _handleWeatherEvent(eventType = EVENT_TYPES.BASE_WEATHER) {
    this.log(`[DEBUG] 开始处理${eventType}类型事件`);
    
    // 根据事件类型筛选事件
    const filteredEvents = EventData.filter(event => event.type === eventType);
    
    this.log(`[DEBUG] 找到${filteredEvents.length}个类型为${eventType}的事件`);
    if (filteredEvents.length > 0) {
      this.log(`[DEBUG] 可能的事件: ${filteredEvents.map(e => e.name).join(', ')}`);
    }
    
    if (filteredEvents.length === 0) {
      this.log(`[DEBUG] 错误: 没有找到类型为 ${eventType} 的事件`);
      this.log(`没有找到类型为 ${eventType} 的事件`);
      return false;
    }
    
    // 随机选择一个事件
    const eventIndex = randomInt(0, filteredEvents.length - 1);
    this.log(`[DEBUG] 随机选择事件索引: ${eventIndex}, 总数: ${filteredEvents.length}`);
    this.currentEvent = filteredEvents[eventIndex];
    this.log(`[DEBUG] 选中的事件: ${this.currentEvent.name}, ID: ${this.currentEvent.id}`);
    
    // 根据事件类型显示不同的日志信息
    switch (eventType) {
      case EVENT_TYPES.BASE_WEATHER:
      case EVENT_TYPES.EXTRA_WEATHER:
        this.log(`天气变化: ${this.currentEvent.name}`);
        break;
      case EVENT_TYPES.PRE_CAST:
        this.log(`抛竿前: ${this.currentEvent.name}`);
        break;
      case EVENT_TYPES.POST_CATCH:
        this.log(`中鱼后: ${this.currentEvent.name}`);
        break;
      default:
        this.log(`事件触发: ${this.currentEvent.name}`);
    }
    
    return true;
  }
  
  /**
   * 处理钓鱼选择
   * @private
   * @param {number} choiceIndex - 选择的选项索引
   */
  _handleFishingChoice(choiceIndex) {
    this.log(`[DEBUG] 开始处理钓鱼选择，选项索引: ${choiceIndex}`);
    
    if (!this.currentFish) {
      this.log('[DEBUG] 错误: 当前没有咬钩的鱼，无法处理钓鱼选择');
      return false;
    }
    
    this.log(`[DEBUG] 当前咬钩的鱼: ${this.currentFish.name}, 强度: ${this.currentFish.strength}`);
    
    // 快速收线 vs 缓慢拉扯
    let successRate = 0;
    
    if (choiceIndex === 0) { // 快速收线
      successRate = 0.1; // 基础成功率60%
      this.log('[DEBUG] 选择快速收线，基础成功率: 0.6');
    } else { // 缓慢拉扯
      successRate = 1; // 基础成功率80%
      this.log('[DEBUG] 选择缓慢拉扯，基础成功率: 0.8');
    }
    
    // 根据鱼的强度调整成功率
    const strengthAdjustment = (this.currentFish.strength / 100) * 0.3;
    successRate -= strengthAdjustment;
    this.log(`[DEBUG] 根据鱼的强度(${this.currentFish.strength})调整成功率: -${strengthAdjustment.toFixed(4)}, 最终成功率: ${successRate.toFixed(4)}`);
    
    // 判定结果
    const randValue = Math.random();
    const isSuccess = randValue < successRate;
    this.log(`[DEBUG] 钓鱼判定随机数: ${randValue.toFixed(6)}, 成功率: ${successRate.toFixed(4)}, 结果: ${isSuccess ? '成功' : '失败'}`);
    
    // 保存当前鱼的信息和钓鱼结果，用于显示结果弹窗
    const fishResult = {
      isSuccess: isSuccess,
      fish: this.currentFish
    };
    
    if (isSuccess) {
      this.catchedFish.push(this.currentFish);
      this.log(`成功钓到了${this.currentFish.name}！`);
      this.log(`[DEBUG] 已将${this.currentFish.name}添加到捕获列表，当前捕获数量: ${this.catchedFish.length}`);
    } else {
      this.lineDurability -= 20; // 失败减少耐久度
      this.log(`${this.currentFish.name}逃走了，鱼线耐久度降低！`);
      this.log(`[DEBUG] 钓鱼失败，鱼线耐久度降低20点`);
    }
    
    // 消耗鱼线耐久度（无论成功与否都会消耗一定耐久度）
    this.lineDurability -= 5;
    this.log(`消耗鱼线耐久度，当前耐久度: ${this.lineDurability}`);
    this.log(`[DEBUG] 基础消耗鱼线耐久度5点，当前总耐久度: ${this.lineDurability}`);
    
    // 检查鱼线耐久度
    if (this.lineDurability <= 0) {
      this.log('鱼线断裂！');
      this.log('[DEBUG] 鱼线耐久度降至0或以下，触发鱼线断裂');
      this.endFishing();
      return true;
    }
    
    // 设置询问是否继续钓鱼的事件
    this.currentEvent = {
      id: 'CONTINUE_FISHING',
      name: '是否继续钓鱼？',
      type: 'CONTINUE_PROMPT'
    };
    this.log('[DEBUG] 设置继续钓鱼提示事件');
    
    // 触发钓鱼结果弹窗事件
    this.fishingResult = fishResult;
    this.log('[DEBUG] 设置钓鱼结果，准备显示结果弹窗');
    
    this.currentFish = null;
    this.log('[DEBUG] 清除当前咬钩的鱼');
    return true;
  }
  
  /**
   * 处理钓到鱼后事件
   * @private
   */
  _handleAftCatchEvent() {
    this.log('[DEBUG] 开始处理钓到鱼后事件');
    
    // 根据事件类型筛选事件
    const filteredEvents = EventData.filter(event => event.type === EVENT_TYPES.AFT_CATCH);
    
    this.log(`[DEBUG] 找到${filteredEvents.length}个类型为${EVENT_TYPES.AFT_CATCH}的事件`);
    if (filteredEvents.length > 0) {
      this.log(`[DEBUG] 可能的事件: ${filteredEvents.map(e => e.name).join(', ')}`);
    }
    
    if (filteredEvents.length === 0) {
      this.log(`[DEBUG] 错误: 没有找到类型为 ${EVENT_TYPES.AFT_CATCH} 的事件`);
      this.log(`没有找到类型为 ${EVENT_TYPES.AFT_CATCH} 的事件`);
      return false;
    }
    
    // 随机选择一个事件
    const eventIndex = randomInt(0, filteredEvents.length - 1);
    this.log(`[DEBUG] 随机选择事件索引: ${eventIndex}, 总数: ${filteredEvents.length}`);
    const selectedEvent = filteredEvents[eventIndex];
    
    // 设置当前事件
    this.currentEvent = selectedEvent;
    this.log(`[DEBUG] 设置当前事件: ${selectedEvent.name}, ID: ${selectedEvent.id}`);
    
    // 应用事件效果
    if (selectedEvent.effect) {
      if (selectedEvent.effect.baitEfficiency) {
        this.log(`[DEBUG] 应用鱼饵效率效果: ${selectedEvent.effect.baitEfficiency}`);
        this.log(`鱼饵效率${selectedEvent.effect.baitEfficiency > 0 ? '提高' : '降低'}了!`);
      }
      
      if (selectedEvent.effect.fishActivity) {
        this.log(`[DEBUG] 应用鱼活跃度效果: ${selectedEvent.effect.fishActivity}`);
        this.log(`鱼的活跃度${selectedEvent.effect.fishActivity > 0 ? '提高' : '降低'}了!`);
      }
      
      if (selectedEvent.effect.catchSuccess) {
        this.log(`[DEBUG] 应用钓鱼成功率效果: ${selectedEvent.effect.catchSuccess}`);
        this.log(`钓鱼成功率${selectedEvent.effect.catchSuccess > 0 ? '提高' : '降低'}了!`);
      }
      
      if (selectedEvent.effect.lineDurability) {
        this.lineDurability += selectedEvent.effect.lineDurability;
        this.log(`[DEBUG] 应用鱼线耐久度效果: ${selectedEvent.effect.lineDurability}, 当前耐久度: ${this.lineDurability}`);
        this.log(`鱼线耐久度${selectedEvent.effect.lineDurability > 0 ? '提高' : '降低'}了!`);
      }
    }
    
    this.log(`触发事件: ${selectedEvent.name}`);
    return true;
  }
  
  /**
   * 处理"是否继续钓鱼"的选择
   * @private
   * @param {number} choiceIndex - 选择的选项索引
   */
  _handleContinueFishingChoice(choiceIndex) {
    this.log(`[DEBUG] 开始处理"是否继续钓鱼"选择，选项索引: ${choiceIndex}`);
    
    if (!this.currentEvent || this.currentEvent.type !== 'CONTINUE_PROMPT') {
      this.log('[DEBUG] 错误: 当前没有继续钓鱼提示事件，或事件类型不匹配');
      this.log('没有继续钓鱼提示可处理');
      return false;
    }
    
    // 处理用户选择
    if (choiceIndex === 0) { // 是，继续钓鱼
      this.log('[DEBUG] 用户选择继续钓鱼');
      this.log('选择继续钓鱼');
      this.currentEvent = null;
      this.log('[DEBUG] 清除当前事件');
      
      // 重置本轮事件触发标记
      this.hasTriggeredPreOrPostEvent = false;
      this.hasTriggeredAftCatchEvent = false;
      
      // 首先尝试触发附加天气事件
      this.log('[DEBUG] 尝试触发附加天气事件');
      const extraWeatherEvent = this.triggerEvent(EVENT_TYPES.EXTRA_WEATHER);
      this.log(`触发附加天气事件: ${extraWeatherEvent}`);
      
      // 如果没有触发附加天气事件，再尝试触发抛竿前事件
      if (extraWeatherEvent === 'NONE') {
        this.log('[DEBUG] 尝试触发抛竿前事件');
        const preCastEvent = this.triggerEvent(EVENT_TYPES.PRE_CAST);
        this.log(`触发抛竿前事件: ${preCastEvent}`);
        
        // 如果没有触发抛竿前事件，尝试触发钓到鱼后事件
        if (preCastEvent === 'NONE' && !this.hasTriggeredPreOrPostEvent) {
          this.log('[DEBUG] 尝试触发钓到鱼后事件');
          const aftCatchEvent = this.triggerEvent(EVENT_TYPES.AFT_CATCH);
          this.log(`触发钓到鱼后事件: ${aftCatchEvent}`);
        }
        
        // 只有在其他事件都没触发的情况下，才考虑触发抛竿后事件
        if (preCastEvent === 'NONE' && !this.hasTriggeredPreOrPostEvent && !this.hasTriggeredAftCatchEvent) {
          this.log('[DEBUG] 尝试触发抛竿后事件');
          const postCatchEvent = this.triggerEvent(EVENT_TYPES.POST_CATCH);
          this.log(`触发抛竿后事件: ${postCatchEvent}`);
        }
      }
      
      // 重新进入中鱼判断环节
      this.log('[DEBUG] 尝试触发鱼咬钩事件');
      const fishBiteEvent = this.triggerEvent('FISH_BITE');
      this.log(`重新判断是否中鱼: ${fishBiteEvent}`);
      
      return true;
    } else { // 否，结束钓鱼
      this.log('[DEBUG] 用户选择结束钓鱼');
      this.log('选择结束钓鱼');
      this.endFishing();
      this.log('[DEBUG] 游戏状态已更改为结算');
      return true;
    }
  }

  /**
   * 处理天气事件选择
   * @private
   * @param {number} choiceIndex - 选择的选项索引
   */
  _handleWeatherChoice(choiceIndex) {
    this.log(`[DEBUG] 开始处理天气事件选择，选项索引: ${choiceIndex}`);
    
    if (!this.currentEvent) {
      this.log('[DEBUG] 错误: 当前没有天气事件');
      this.log('没有天气事件可处理');
      return false;
    }
    
    this.log(`[DEBUG] 当前事件: ${this.currentEvent.name}, ID: ${this.currentEvent.id}, 类型: ${this.currentEvent.type}`);
    
    // 获取事件选项
    const eventOptions = getEventOptions(this.currentEvent.id);
    this.log(`[DEBUG] 获取事件选项，事件ID: ${this.currentEvent.id}, 选项数量: ${eventOptions ? eventOptions.length : 0}`);
    
    if (!eventOptions || eventOptions.length === 0) {
      this.log(`[DEBUG] 错误: 事件 ${this.currentEvent.id} 没有可用选项`);
      this.log(`事件 ${this.currentEvent.id} 没有可用选项`);
      this.currentEvent = null;
      this.log('[DEBUG] 清除当前事件');
      return false;
    }
    
    // 确保选择索引有效
    if (choiceIndex < 0 || choiceIndex >= eventOptions.length) {
      this.log(`[DEBUG] 错误: 无效的选择索引: ${choiceIndex}, 有效范围: 0-${eventOptions.length - 1}`);
      this.log(`无效的选择索引: ${choiceIndex}`);
      return false;
    }
    
    const selectedOption = eventOptions[choiceIndex];
    this.log(`[DEBUG] 选中的选项: ${selectedOption.text}, 索引: ${choiceIndex}`);
    this.log(`选择了: ${selectedOption.text}`);
    
    // 处理选项结果
    if (selectedOption.result) {
      this.log(`[DEBUG] 处理特殊结果: ${selectedOption.result}`);
      
      // 处理特殊结果
      switch (selectedOption.result) {
        case 'ESCAPE':
          this.log('[DEBUG] 处理ESCAPE结果: 结束钓鱼');
          this.log('选择离开钓鱼点');
          this.endFishing();
          break;
        case 'CHANGE_SPOT':
          this.log('[DEBUG] 处理CHANGE_SPOT结果: 更换钓鱼位置');
          this.log('选择更换钓鱼位置');
          // 这里可以添加更换位置的逻辑
          break;
        case 'CHANGE_BAIT':
          this.log('[DEBUG] 处理CHANGE_BAIT结果: 更换鱼饵');
          this.log('选择更换鱼饵');
          // 这里可以添加更换鱼饵的逻辑
          break;
        case 'CHANGE_ROD':
          this.log('[DEBUG] 处理CHANGE_ROD结果: 更换钓竿');
          this.log('选择更换钓竿');
          // 这里可以添加更换钓竿的逻辑
          break;
        default:
          this.log(`[DEBUG] 未知的结果类型: ${selectedOption.result}`);
          this.log(`未知结果: ${selectedOption.result}`);
      }
    } else if (selectedOption.successRate !== undefined) {
      this.log(`[DEBUG] 处理成功率判定，成功率: ${selectedOption.successRate}`);
      
      // 处理成功率判定
      const randValue = Math.random();
      const isSuccess = randValue < selectedOption.successRate;
      this.log(`[DEBUG] 成功率判定随机数: ${randValue.toFixed(6)}, 成功率: ${selectedOption.successRate}, 结果: ${isSuccess ? '成功' : '失败'}`);
      
      if (isSuccess) {
        this.log('[DEBUG] 选择成功');
        this.log('选择成功！');
        // 应用事件效果
        if (this.currentEvent.effect) {
          this.log(`[DEBUG] 应用事件效果: ${JSON.stringify(this.currentEvent.effect)}`);
          this.log(`应用事件效果: ${JSON.stringify(this.currentEvent.effect)}`);
          // 这里可以添加应用效果的逻辑
        } else {
          this.log('[DEBUG] 事件没有定义效果');
        }
      } else {
        this.log('[DEBUG] 选择失败');
        this.log('选择失败！');
        // 可以添加失败的后果
        this.lineDurability -= 10; // 例如减少鱼线耐久度
        this.log(`[DEBUG] 鱼线耐久度降低10点，当前耐久度: ${this.lineDurability}`);
        this.log(`鱼线耐久度降低，当前耐久度: ${this.lineDurability}`);
        
        // 检查鱼线耐久度
        if (this.lineDurability <= 0) {
          this.log('[DEBUG] 鱼线耐久度降至0或以下，触发鱼线断裂');
          this.log('鱼线断裂！');
          this.endFishing();
          this.log('[DEBUG] 游戏状态已更改为结算');
          return true;
        }
      }
    } else {
      this.log('[DEBUG] 选项没有定义结果或成功率');
    }
    
    // 清除当前事件
    this.currentEvent = null;
    this.log('[DEBUG] 清除当前事件');
    
    // 继续钓鱼流程
    this.log('[DEBUG] 尝试触发鱼咬钩事件');
    const fishBiteEvent = this.triggerEvent('FISH_BITE');
    this.log(`[DEBUG] 鱼咬钩事件结果: ${fishBiteEvent}`);
    this.log(`判断是否中鱼: ${fishBiteEvent}`);
    
    return true;
  }
}