import { FishingGame } from './game.js';
import { WaterData } from '../../data/FishData/water_data.js';
import { EVENT_TYPES } from '../../data/FishData/event_types.js';
import { getEventOptions } from '../../data/FishData/event_options.js';

Page({
    data: {
      currentState: 'PREPARE',
      baitOptions: ['BREAD', 'WORM', 'LURE'],
      currentEvent: null,
      log: [],
      lineDurability: 100,
      catchedFish: [],
      selectedBait: 'BREAD', // 默认选择第一个鱼饵
      currentWater: null,
      currentWaterName: '',
      currentWaterDescription: '',
      currentWaterBackground: '',
      scrollTop: 0, // 添加scrollTop变量用于控制scroll-view滚动
      showFishingResult: false, // 是否显示钓鱼结果弹窗
      fishingResultData: null, // 钓鱼结果数据
      showFishOnPopup: false, // 是否显示鱼上钩弹窗
      showWeatherEventPopup: false, // 是否显示天气事件弹窗
      weatherEventData: null, // 天气事件数据
      showEventPopup: false, // 是否显示游戏事件弹窗
      eventData: null, // 游戏事件数据
      fishingAnimation: false, // 是否显示钓鱼动画
      isFishBiting: false // 鱼是否正在咬钩
    },
  
    onLoad(options) {
      console.log('[钓鱼模拟器] 游戏页面加载', options);
      this.game = new FishingGame();
      console.log('[钓鱼模拟器] 游戏实例已创建');
      
      // 默认选择第一个鱼饵
      this.game.selectEquipment('BAIT', this.data.selectedBait);
    },
  
    // 选择鱼饵
    selectBait(e) {
      const bait = e.currentTarget.dataset.bait;
      console.log('[钓鱼模拟器] 用户选择了鱼饵:', bait);
      this.game.selectEquipment('BAIT', bait);
      console.log('[钓鱼模拟器] 已设置游戏装备-鱼饵');
      this.setData({ selectedBait: bait });
    },
  
    // 开始钓鱼
    startFishing() {
      console.log('[钓鱼模拟器] 开始钓鱼');
      
      // 随机选择水域（移到这里，确保点击开始钓鱼后才选择水域）
      this.randomSelectWater();
      
      // 开始钓鱼 - 注意：game.js的startFishing方法中已经触发了基础天气事件
      this.game.startFishing();
      console.log('[钓鱼模拟器] 游戏状态已更改为钓鱼中');
      
      // 获取当前的基础天气事件并解析
      const parsedEvent = this.parseEvent(EVENT_TYPES.BASE_WEATHER);
      console.log('[钓鱼模拟器] 解析后的基础天气事件:', parsedEvent);
      
      // 更新UI状态，显示开始钓鱼的日志和基础天气
      this.setData({
        currentState: 'FISHING',
        log: this.game.eventLog,
        currentEvent: parsedEvent
      });
      
      // 不再重复触发基础天气事件，因为game.js中已经触发过了
      
      // 延迟一小段时间后再触发第一个随机事件，让用户能看到"开始钓鱼"的日志
      setTimeout(() => {
        const event = this.game.triggerEvent();
        console.log('[钓鱼模拟器] 触发事件类型:', event);
        
        const parsedEvent = this.parseEvent(event);
        console.log('[钓鱼模拟器] 解析后的事件:', parsedEvent);
        
        this.setData({
          currentEvent: parsedEvent,
          log: this.game.eventLog
        }, () => {
          this.scrollToBottom();
        });
      }, 1000); // 延迟1秒触发第一个事件
    },
  
    // 处理玩家选择
    // 处理玩家选择
    handleChoice(e) {
      const index = e.currentTarget.dataset.index;
      console.log('[钓鱼模拟器] 用户选择了选项:', index);
      
      // 首先检查游戏状态，如果已经是结算状态，不应该继续处理任何操作
      if (this.game.state === 'SETTLE') {
        console.log('[钓鱼模拟器] 游戏已经处于结算状态，忽略用户操作');
        this.setData({
          log: this.game.eventLog,
          currentState: this.game.state,
          lineDurability: this.game.lineDurability,
          catchedFish: this.game.catchedFish,
          currentEvent: {
            type: 'GAME_OVER',
            options: [{ text: '重新开始' }],
            message: '游戏结束！鱼线断裂，无法继续钓鱼。'
          },
          showFishOnPopup: false, // 确保关闭任何可能的弹窗
          showFishingResult: false // 确保关闭钓鱼结果弹窗
        }, () => {
          this.scrollToBottom();
        });
        return;
      }
      
      // 检查当前是否有鱼咬钩但还未显示FishOn弹窗
      if (this.game.currentFish && !this.data.showFishOnPopup && this.data.currentEvent && this.data.currentEvent.type !== 'FISH') {
        console.log('[钓鱼模拟器] 检测到鱼咬钩但未显示FishOn弹窗，先显示弹窗');
        this.setData({
          showFishOnPopup: true
        });
        return;
      }
      
      // 检查是否是钓鱼选择（快速收线或缓慢拉扯）
      const isFishingChoice = this.data.currentEvent && this.data.currentEvent.type === 'FISH';
      
      this.game.handleChoice(index);
      console.log('[钓鱼模拟器] 游戏处理了用户选择');
      console.log('[钓鱼模拟器] 当前游戏状态:', this.game.state);
      console.log('[钓鱼模拟器] 鱼线耐久度:', this.game.lineDurability);
      console.log('[钓鱼模拟器] 已捕获的鱼:', this.game.catchedFish);
      
      // 检查鱼线耐久度，如果小于等于0，强制结束游戏
      if (this.game.lineDurability <= 0) {
        console.log('[钓鱼模拟器] 检测到鱼线耐久度小于等于0，强制结束游戏');
        // 确保游戏状态为结算
        if (this.game.state !== 'SETTLE') {
          this.game.endFishing();
        }
        
        this.setData({
          log: this.game.eventLog,
          currentState: 'SETTLE',
          lineDurability: this.game.lineDurability,
          catchedFish: this.game.catchedFish,
          currentEvent: {
            type: 'GAME_OVER',
            options: [{ text: '重新开始' }],
            message: '游戏结束！鱼线断裂，无法继续钓鱼。'
          },
          showFishOnPopup: false, // 确保关闭任何可能的弹窗
          showFishingResult: false // 确保关闭钓鱼结果弹窗
        }, () => {
          this.scrollToBottom();
        });
        return;
      }
      
      // 检查是否有钓鱼结果需要显示
      // 修复：特别检查如果是钓鱼选择（快速收线或缓慢拉扯），必须检查钓鱼结果
      if (isFishingChoice) {
        // 如果是钓鱼选择，无论成功与否都显示结果弹窗
        console.log('[钓鱼模拟器] 显示钓鱼结果弹窗:', this.game.fishingResult);
        this.setData({
          showFishingResult: true,
          fishingResultData: this.game.fishingResult || {
            isSuccess: false,
            fish: this.data.currentEvent.fish
          }
        });
        return;
      } else if (this.game.fishingResult) {
        // 处理其他情况下的钓鱼结果
        console.log('[钓鱼模拟器] 显示钓鱼结果弹窗:', this.game.fishingResult);
        this.setData({
          showFishingResult: true,
          fishingResultData: this.game.fishingResult
        });
        return;
      }
      
      // 如果游戏状态变为结算，直接更新状态
      if (this.game.state === 'SETTLE') {
        this.setData({
          log: this.game.eventLog,
          currentState: this.game.state,
          lineDurability: this.game.lineDurability,
          catchedFish: this.game.catchedFish,
          currentEvent: {
            type: 'GAME_OVER',
            options: [{ text: '重新开始' }],
            message: '游戏结束！鱼线断裂，无法继续钓鱼。'
          },
          showFishOnPopup: false // 确保关闭任何可能的弹窗
        }, () => {
          this.scrollToBottom();
        });
        return;
      }
      
      // 触发下一个事件
      const eventType = this.game.triggerEvent();
      console.log('[钓鱼模拟器] 触发下一个事件类型:', eventType);
      
      const nextEvent = this.parseEvent(eventType);
      console.log('[钓鱼模拟器] 下一个事件:', nextEvent);
      
      this.setData({
        log: this.game.eventLog,
        currentState: this.game.state,
        lineDurability: this.game.lineDurability,
        catchedFish: this.game.catchedFish,
        currentEvent: nextEvent
      }, () => {
        this.scrollToBottom();
      });
    },
  
    // 事件解析
    parseEvent(event) {
      // 获取当前天气信息，用于在各种事件中保持天气显示
      // 从当前事件中获取天气信息，或者从当前显示的事件中获取之前保存的天气信息
      let currentWeather = this.game.currentEvent && this.game.currentEvent.type === 'WEATHER' ? 
        this.game.currentEvent : null;
      
      // 如果当前游戏事件中没有天气信息，但UI中的currentEvent有天气信息，则使用UI中的天气信息
      if (!currentWeather && this.data.currentEvent && this.data.currentEvent.weather) {
        currentWeather = this.data.currentEvent.weather;
      }
      
      if (event === 'FISH_BITE') {
        console.log('[钓鱼模拟器] 鱼咬钩事件触发，开始钓鱼动画');
        
        // 添加钓鱼动画效果，延迟显示FishOn弹窗
        this.setData({
          isFishBiting: true, // 标记鱼正在咬钩中
          fishingAnimation: true // 开始钓鱼动画
        });
        
        // 延迟显示FishOn弹窗，模拟钓鱼过程
        setTimeout(() => {
          this.setData({
            fishingAnimation: false, // 结束钓鱼动画
            showFishOnPopup: true // 显示FishOn弹窗
          });
          console.log('[钓鱼模拟器] 钓鱼动画结束，显示FishOn弹窗');
        }, 2000); // 延迟2秒
        
        // 返回事件，并保留当前天气信息
        return {
          type: 'WAITING_FISH_RESPONSE',
          fish: this.game.currentFish,
          weather: currentWeather, // 保留天气信息
          options: [], // 不显示选项按钮
          isFishing: true // 标记正在钓鱼中
        };
      } else if (event === EVENT_TYPES.BASE_WEATHER || event === EVENT_TYPES.EXTRA_WEATHER) {
        // 处理天气事件
        const weatherOptions = [];
        if (this.game.currentEvent) {
          // 从event_options.js获取事件选项
          const eventOptions = getEventOptions(this.game.currentEvent.id);
          // 转换选项格式以适应UI显示
          eventOptions.forEach(option => {
            weatherOptions.push({ text: option.text });
          });
          
          // 如果是附加天气事件，显示天气事件弹窗
          if (event === EVENT_TYPES.EXTRA_WEATHER) {
            this.setData({
              showWeatherEventPopup: true,
              weatherEventData: this.game.currentEvent
            });
          }
          
          // 对于基础天气事件，记录到控制台以便调试
          if (event === EVENT_TYPES.BASE_WEATHER) {
            console.log('[钓鱼模拟器] 基础天气事件:', this.game.currentEvent);
          }
        }
        
        return {
          type: 'WEATHER',
          weather: this.game.currentEvent,
          options: weatherOptions.length > 0 ? weatherOptions : [{ text: '继续钓鱼' }]
        };
      } else if (event === EVENT_TYPES.POST_CATCH) {
        // 处理中鱼后事件
        const postcatchOptions = [];
        if (this.game.currentEvent) {
          // 从event_options.js获取事件选项
          const eventOptions = getEventOptions(this.game.currentEvent.id);
          eventOptions.forEach(option => {
            postcatchOptions.push({ text: option.text });
          });
          
          // 显示事件弹窗
          this.setData({
            showEventPopup: true,
            eventData: this.game.currentEvent
          });
        }
        
        return {
          type: 'POST_CATCH',
          eventData: this.game.currentEvent, // 使用eventData字段存储事件数据，不再使用weather字段
          weather: currentWeather, // 保留当前天气信息
          options: postcatchOptions.length > 0 ? postcatchOptions : [{ text: '继续钓鱼' }]
        };
      } else if (event === EVENT_TYPES.PRE_CAST) {
        // 处理抛竿前事件
        const precastOptions = [];
        if (this.game.currentEvent) {
          // 从event_options.js获取事件选项
          const eventOptions = getEventOptions(this.game.currentEvent.id);
          eventOptions.forEach(option => {
            precastOptions.push({ text: option.text });
          });
          
          // 显示事件弹窗
          this.setData({
            showEventPopup: true,
            eventData: this.game.currentEvent
          });
        }
        
        return {
          type: 'PRE_CAST',
          eventData: this.game.currentEvent, // 使用eventData字段存储事件数据，不再使用weather字段
          weather: currentWeather, // 保留当前天气信息
          options: precastOptions.length > 0 ? precastOptions : [{ text: '继续钓鱼' }]
        };
      } else if (event === EVENT_TYPES.AFT_CATCH) {
        // 处理钓到鱼后事件
        const aftcatchOptions = [];
        if (this.game.currentEvent) {
          // 从event_options.js获取事件选项
          const eventOptions = getEventOptions(this.game.currentEvent.id);
          eventOptions.forEach(option => {
            aftcatchOptions.push({ text: option.text });
          });
          
          // 显示事件弹窗
          this.setData({
            showEventPopup: true,
            eventData: this.game.currentEvent
          });
        }
        
        return {
          type: 'AFT_CATCH',
          eventData: this.game.currentEvent, // 使用eventData字段存储事件数据，不再使用weather字段
          weather: currentWeather, // 保留当前天气信息
          options: aftcatchOptions.length > 0 ? aftcatchOptions : [{ text: '继续钓鱼' }]
        };
      } else if (this.game.currentEvent && this.game.currentEvent.type === 'CONTINUE_PROMPT') {
        // 处理是否继续钓鱼的提示
        return {
          type: 'CONTINUE_PROMPT',
          weather: currentWeather, // 保留天气信息
          options: [
            { text: '是，继续钓鱼' },
            { text: '否，结束钓鱼' }
          ]
        };
      } else if (event === 'GAME_OVER' || this.data.currentEvent && this.data.currentEvent.type === 'GAME_OVER') {
        // 处理游戏结束状态
        return {
          type: 'GAME_OVER',
          weather: currentWeather, // 保留天气信息
          message: '游戏结束！鱼线断裂，无法继续钓鱼。',
          options: [{ text: '重新开始' }]
        };
      } else {
        return {
          type: 'NONE',
          weather: currentWeather, // 保留天气信息
          options: [{ text: '继续等待' }]
        };
      }
    },
    
    // 随机选择水域
    randomSelectWater() {
      const randomIndex = Math.floor(Math.random() * WaterData.length);
      const selectedWater = WaterData[randomIndex];
      
      console.log('[钓鱼模拟器] 随机选择了水域:', selectedWater.name);
      
      // 确保背景图片路径正确
      const backgroundImage = selectedWater.backgroundImage;
      
      this.setData({
        currentWater: selectedWater,
        currentWaterName: selectedWater.name,
        currentWaterDescription: selectedWater.description,
        currentWaterBackground: backgroundImage
      });
      
      // 将选择的水域ID传递给游戏实例，用于鱼种概率计算
      if (this.game) {
        this.game.currentWaterId = selectedWater.id;
      }
    },
    
    // 重新开始游戏
    restart() {
      console.log('[钓鱼模拟器] 重新开始游戏');
      this.game.restart();
      console.log('[钓鱼模拟器] 游戏实例已重置');
      
      // 重新随机选择水域
      this.randomSelectWater();
      
      this.setData({
        currentState: 'PREPARE',
        currentEvent: null,
        log: [],
        lineDurability: 100,
        catchedFish: [],
        selectedBait: 'BREAD', // 重置为默认鱼饵
        showFishingResult: false, // 隐藏钓鱼结果弹窗
        fishingResultData: null, // 清除钓鱼结果数据
        showFishOnPopup: false, // 隐藏鱼上钩弹窗
        showWeatherEventPopup: false, // 隐藏天气事件弹窗
        weatherEventData: null, // 清除天气事件数据
        showEventPopup: false, // 隐藏游戏事件弹窗
        eventData: null // 清除游戏事件数据
      });
      
      // 默认选择第一个鱼饵
      this.game.selectEquipment('BAIT', this.data.selectedBait);
      
      console.log('[钓鱼模拟器] 游戏界面已重置');
    },
    
    // 滚动日志到底部显示最新内容
    scrollToBottom() {
      const that = this;
      setTimeout(() => {
        // 计算一个足够大的值作为scrollTop，确保滚动到底部
        // 由于日志是动态增长的，我们可以使用一个足够大的数值
        // 小程序会自动处理超出范围的scrollTop值
        const newScrollTop = that.data.log.length * 1000;
        
        that.setData({
          scrollTop: newScrollTop
        });
        
        console.log('[钓鱼模拟器] 设置滚动位置到底部:', newScrollTop);
      }, 50); // 添加短暂延时确保DOM已更新
    },
    
    // 关闭钓鱼结果弹窗
    onCloseFishingResult() {
      console.log('[钓鱼模拟器] 关闭钓鱼结果弹窗');
      
      // 首先检查游戏状态，如果已经是结算状态，不应该继续处理任何操作
      if (this.game.state === 'SETTLE') {
        console.log('[钓鱼模拟器] 游戏已经处于结算状态，忽略后续操作');
        this.setData({
          showFishingResult: false,
          currentEvent: {
            type: 'GAME_OVER',
            options: [{ text: '重新开始' }],
            message: '游戏结束！鱼线断裂，无法继续钓鱼。'
          },
          currentState: 'SETTLE',
          showFishOnPopup: false // 确保关闭任何可能的弹窗
        });
        return;
      }
      
      // 获取当前天气信息，确保在关闭钓鱼结果弹窗后保留天气显示
      const currentWeather = this.data.currentEvent && this.data.currentEvent.weather ? 
        this.data.currentEvent.weather : null;
      
      this.setData({
        showFishingResult: false
      });
      
      // 清除游戏中的钓鱼结果数据
      this.game.fishingResult = null;
      
      // 检查当前是否已有CONTINUE_PROMPT事件
      if (this.game.currentEvent && this.game.currentEvent.type === 'CONTINUE_PROMPT') {
        console.log('[钓鱼模拟器] 检测到已有继续钓鱼提示事件，直接使用');
        const parsedEvent = this.parseEvent('CONTINUE_PROMPT');
        console.log('[钓鱼模拟器] 解析后的事件:', parsedEvent);
        
        // 确保保留天气信息
        if (currentWeather && !parsedEvent.weather) {
          parsedEvent.weather = currentWeather;
        }
        
        this.setData({
          currentEvent: parsedEvent,
          log: this.game.eventLog,
          lineDurability: this.game.lineDurability
        }, () => {
          this.scrollToBottom();
        });
      } else {
        // 继续游戏流程，触发下一个事件
        const event = this.game.triggerEvent();
        console.log('[钓鱼模拟器] 触发下一个事件:', event);
        
        const parsedEvent = this.parseEvent(event);
        console.log('[钓鱼模拟器] 解析后的事件:', parsedEvent);
        
        // 确保保留天气信息
        if (currentWeather && !parsedEvent.weather) {
          parsedEvent.weather = currentWeather;
        }
        
        this.setData({
          currentEvent: parsedEvent,
          log: this.game.eventLog,
          lineDurability: this.game.lineDurability
        }, () => {
          this.scrollToBottom();
        });
      }
    },
    
    // 处理鱼上钩弹窗的搏鱼按钮点击
    onFishOnFight() {
      console.log('[钓鱼模拟器] 用户点击了搏鱼按钮');
      
      // 首先检查游戏状态，如果已经是结算状态，不应该继续处理任何操作
      if (this.game.state === 'SETTLE') {
        console.log('[钓鱼模拟器] 游戏已经处于结算状态，忽略搏鱼操作');
        this.setData({
          showFishOnPopup: false,
          currentEvent: {
            type: 'GAME_OVER',
            options: [{ text: '重新开始' }],
            message: '游戏结束！鱼线断裂，无法继续钓鱼。'
          },
          currentState: 'SETTLE'
        });
        return;
      }
      
      // 获取当前天气信息，确保在搏鱼时保留天气显示
      const currentWeather = this.data.currentEvent && this.data.currentEvent.weather ? 
        this.data.currentEvent.weather : null;
      
      // 确保当前有鱼咬钩
      if (!this.game.currentFish) {
        console.log('[钓鱼模拟器] 错误：当前没有鱼咬钩，无法处理搏鱼操作');
        this.setData({
          showFishOnPopup: false
        });
        return;
      }
      
      this.setData({
        showFishOnPopup: false,
        // 显示钓鱼选项，并保留天气信息
        currentEvent: {
          type: 'FISH',
          fish: this.game.currentFish,
          weather: currentWeather, // 保留天气信息
          options: [
            { text: '快速收线' }, 
            { text: '缓慢拉扯' }
          ]
        }
      });
      
      console.log('[钓鱼模拟器] 关闭鱼上钩弹窗，显示钓鱼选项');
      this.scrollToBottom(); // 确保滚动到最新内容
    },
    
    // 关闭天气事件弹窗
    onCloseWeatherEventPopup() {
      console.log('[钓鱼模拟器] 关闭天气事件弹窗');
      this.setData({
        showWeatherEventPopup: false
      });
    },
    
    // 关闭游戏事件弹窗
    onCloseEventPopup() {
      console.log('[钓鱼模拟器] 关闭游戏事件弹窗');
      this.setData({
        showEventPopup: false
      });
    }
  });