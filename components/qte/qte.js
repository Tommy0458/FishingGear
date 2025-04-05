import { GestureRecognizer } from '../../utils/gesture';

Component({
  properties: {
    // 定义组件的属性
    difficulty: {
      type: Number,
      value: 1 // 默认难度
    }
  },

  data: {
    qteSteps: [], // QTE步骤
    currentStep: 0, // 当前步骤
    feedback: null, // 反馈状态
    timeRemaining: 100, // 剩余时间百分比
    qteType: 'BASIC', // QTE类型
    isActive: false // QTE是否激活
  },

  methods: {
    // 初始化手势识别
    initGesture() {
      console.log('QTE - 初始化手势识别器');
      this.gesture = new GestureRecognizer();
      this.expectedGestures = []; // 当前期待的QTE手势序列
      this.currentStep = 0;
      this.timeoutId = null;
      console.log('QTE - 手势识别器初始化完成');
    },

    // 处理触摸事件
    handleTouchStart(e) {
      if (!this.data.isActive) return;
      this.gesture.onStart(e);
      // 长按检测开始
      if (this._isCurrentGestureHold()) {
        this._startHoldTimer();
      }
    },
    
    handleTouchMove(e) {
      if (!this.data.isActive) return;
      this.gesture.onMove(e);
    },

    handleTouchEnd() {
      if (!this.data.isActive) return;
      const result = this.gesture.onEnd();
      // 清除长按计时器
      this._clearHoldTimer();
      this.checkGestureMatch(result);
    },

    // 验证手势是否匹配
    checkGestureMatch(actualGesture) {
      console.log('QTE - 检查手势匹配, 当前步骤:', this.currentStep, '总步骤:', this.expectedGestures.length);
      console.log('QTE - 实际手势:', actualGesture.type, actualGesture.duration ? `持续时间:${actualGesture.duration}ms` : '');
      
      if (this.currentStep >= this.expectedGestures.length) {
        console.error('QTE - 当前步骤超出范围!');  
        return;
      }
      
      const expected = this.expectedGestures[this.currentStep];
      console.log('QTE - 期望手势:', expected);
      let isMatch = false;

      // 动态匹配逻辑
      if (expected.startsWith("HOLD")) {
        const requiredTime = parseInt(expected.split("_")[1]);
        isMatch = actualGesture.type === "HOLD" && 
                 actualGesture.duration >= requiredTime;
        console.log(`QTE - HOLD手势检查: 需要${requiredTime}ms, 实际${actualGesture.duration}ms, 匹配:${isMatch}`);
      } else if (expected.startsWith("SWIPE")) {
        // 滑动方向匹配
        isMatch = actualGesture.type === expected;
        console.log(`QTE - SWIPE手势检查: 需要${expected}, 实际${actualGesture.type}, 匹配:${isMatch}`);
      } else if (expected === "TAP") {
        isMatch = actualGesture.type === "TAP";
        console.log(`QTE - TAP手势检查: 需要TAP, 实际${actualGesture.type}, 匹配:${isMatch}`);
      }

      if (isMatch) {
        this.currentStep++;
        this.setData({ currentStep: this.currentStep });
        this._showFeedback("success");
        
        // 更新进度显示
        this._updateProgressDisplay();
        
        if (this.currentStep >= this.expectedGestures.length) {
          this._onQTEComplete(true);
        }
      } else {
        this._showFeedback("fail");
        // 根据难度决定失败后的行为
        if (this.data.qteType === "BOSS" || this.properties.difficulty >= 3) {
          // 高难度：直接失败
          this._onQTEComplete(false);
        } else {
          // 低难度：允许重试当前步骤
          this._showRetryHint();
        }
      }
    },

    // 启动QTE序列
    startGame(options) {
      console.log('QTE - 启动游戏', options);
      const { fish, onComplete } = options;
      this.onCompleteCallback = onComplete;
      console.log('QTE - 鱼类信息:', fish.name, '难度:', this.properties.difficulty);
      this.startComplexQTE(fish);
    },

    // 启动复杂QTE序列
    startComplexQTE(fishData) {
      console.log('QTE - 启动复杂QTE序列');
      this.initGesture();
      
      if (!fishData || !fishData.escapePattern) {
        console.error('QTE - 鱼类数据无效或缺少逃脱模式!', fishData);
        if (typeof this.onCompleteCallback === 'function') {
          this.onCompleteCallback(false);
        }
        return;
      }
      
      this.expectedGestures = [...fishData.escapePattern];
      this.currentStep = 0;
      console.log('QTE - 期望手势序列:', this.expectedGestures);
      
      // 设置QTE类型
      const qteType = fishData.qteType || 'BASIC';
      console.log('QTE - 类型:', qteType);
      
      // 显示手势提示
      const qteSteps = this.expectedGestures.map(g => ({
        type: g,
        icon: this._getGestureIcon(g)
      }));
      
      this.setData({
        qteSteps: qteSteps,
        currentStep: 0,
        qteType: qteType,
        isActive: true,
        timeRemaining: 100
      });
      console.log('QTE - 界面更新完成，步骤数:', qteSteps.length);
      
      // 启动计时器
      this._startQTETimer(fishData.strength);
      
      // 根据鱼类类型设置特殊效果
      this._applyQTETypeEffects(qteType);
    },

    // 应用不同QTE类型的特殊效果
    _applyQTETypeEffects(qteType) {
      switch(qteType) {
        case 'RHYTHM':
          // 节奏型QTE：需要按照节奏点击
          this._setupRhythmEffect();
          break;
        case 'RAPID':
          // 快速连击型：需要快速完成
          this._setupRapidEffect();
          break;
        case 'BOSS':
          // BOSS级：更复杂的视觉效果和更严格的时间限制
          this._setupBossEffect();
          break;
        // 其他类型...
      }
    },

    // 设置节奏型效果
    _setupRhythmEffect() {
      // 实现节奏型QTE的特殊效果
      this.rhythmInterval = setInterval(() => {
        // 闪烁当前需要操作的步骤
        const currentStep = this.data.currentStep;
        if (currentStep < this.expectedGestures.length) {
          this.setData({
            [`qteSteps[${currentStep}].highlight`]: true
          });
          setTimeout(() => {
            this.setData({
              [`qteSteps[${currentStep}].highlight`]: false
            });
          }, 300);
        }
      }, 1000); // 每秒闪烁一次
    },

    // 设置快速连击效果
    _setupRapidEffect() {
      // 实现快速连击的特殊效果
      // 例如：加快时间流逝
      this.timeMultiplier = 1.5;
    },

    // 设置BOSS效果
    _setupBossEffect() {
      // 实现BOSS级QTE的特殊效果
      // 例如：更复杂的视觉反馈，更严格的时间限制
      this.timeMultiplier = 2.0;
      this.setData({
        bossModeActive: true
      });
    },

    // 启动QTE计时器
    _startQTETimer(fishStrength) {
      // 根据鱼的强度计算总时间
      const baseTime = 10000; // 基础10秒
      const totalTime = baseTime - (fishStrength * 50); // 鱼越强，时间越短
      
      const timeMultiplier = this.timeMultiplier || 1.0;
      const adjustedTime = totalTime / timeMultiplier;
      
      const updateInterval = 100; // 每100ms更新一次
      const steps = adjustedTime / updateInterval;
      const decrementPerStep = 100 / steps;
      
      this.qteTimer = setInterval(() => {
        const newTimeRemaining = Math.max(0, this.data.timeRemaining - decrementPerStep);
        this.setData({ timeRemaining: newTimeRemaining });
        
        if (newTimeRemaining <= 0) {
          // 时间耗尽，QTE失败
          clearInterval(this.qteTimer);
          this._onQTEComplete(false);
        }
      }, updateInterval);
    },

    // QTE完成处理
    _onQTEComplete(success) {
      // 清理所有计时器
      this._clearAllTimers();
      
      this.setData({ isActive: false });
      
      // 调用回调函数
      if (typeof this.onCompleteCallback === 'function') {
        this.onCompleteCallback(success);
      }
    },

    // 清理所有计时器
    _clearAllTimers() {
      if (this.qteTimer) clearInterval(this.qteTimer);
      if (this.rhythmInterval) clearInterval(this.rhythmInterval);
      this._clearHoldTimer();
    },

    // 更新进度显示
    _updateProgressDisplay() {
      // 更新进度显示逻辑
    },

    // 显示重试提示
    _showRetryHint() {
      this.setData({ retryHint: true });
      setTimeout(() => this.setData({ retryHint: false }), 1000);
    },

    // 检查当前手势是否为长按
    _isCurrentGestureHold() {
      if (this.currentStep >= this.expectedGestures.length) return false;
      return this.expectedGestures[this.currentStep].startsWith("HOLD");
    },

    // 开始长按计时器
    _startHoldTimer() {
      if (this.holdTimer) clearTimeout(this.holdTimer);
      
      const expected = this.expectedGestures[this.currentStep];
      if (!expected.startsWith("HOLD")) return;
      
      const requiredTime = parseInt(expected.split("_")[1]);
      
      this.holdProgress = 0;
      this.holdUpdateInterval = setInterval(() => {
        this.holdProgress += 100;
        const progressPercent = Math.min(100, (this.holdProgress / requiredTime) * 100);
        this.setData({ holdProgress: progressPercent });
      }, 100);
    },

    // 清除长按计时器
    _clearHoldTimer() {
      if (this.holdUpdateInterval) {
        clearInterval(this.holdUpdateInterval);
        this.holdUpdateInterval = null;
      }
      this.setData({ holdProgress: 0 });
    },

    // 获取手势图标
    _getGestureIcon(gesture) {
      const icons = {
        "TAP": "/images/gestures/tap.png",
        "HOLD_500": "/images/gestures/hold.png",
        "HOLD_800": "/images/gestures/hold.png",
        "HOLD_1000": "/images/gestures/hold_long.png",
        "HOLD_1200": "/images/gestures/hold_long.png",
        "HOLD_1500": "/images/gestures/hold_very_long.png",
        "HOLD_2000": "/images/gestures/hold_very_long.png",
        "SWIPE_LEFT": "/images/gestures/swipe_left.png",
        "SWIPE_RIGHT": "/images/gestures/swipe_right.png",
        "SWIPE_UP": "/images/gestures/swipe_up.png",
        "SWIPE_DOWN": "/images/gestures/swipe_down.png"
      };
      return icons[gesture] || "/images/gestures/unknown.png";
    },

    // 显示操作反馈
    _showFeedback(type) {
      this.setData({ feedback: type });
      setTimeout(() => this.setData({ feedback: null }), 300);
    },

    // 触发成功回调
    triggerSuccess() {
      if (typeof this.onSuccessCallback === 'function') {
        this.onSuccessCallback();
      }
    },

    // 触发失败回调
    triggerFail() {
      if (typeof this.onFailCallback === 'function') {
        this.onFailCallback();
      }
    }
  }
});