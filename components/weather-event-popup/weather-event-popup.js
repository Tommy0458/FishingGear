// components/weather-event-popup/weather-event-popup.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    visible: {
      type: Boolean,
      value: false
    },
    weatherEvent: {
      type: Object,
      value: null
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    animationData: {}
  },

  lifetimes: {
    attached() {
      // 创建动画实例
      this.animation = wx.createAnimation({
        duration: 300,
        timingFunction: 'ease'
      })
    },
    ready() {
      // 确保动画实例已创建
      if (!this.animation) {
        this.animation = wx.createAnimation({
          duration: 300,
          timingFunction: 'ease'
        })
      }
    }
  },

  observers: {
    'visible': function(visible) {
      if (visible) {
        this.showAnimation();
      } else {
        this.hideAnimation();
      }
    }
  },

  /**
   * 组件的方法列表
   */
  methods: {
    // 防止滑动穿透
    preventTouchMove() {
      return false;
    },
    
    // 关闭弹窗
    onClose() {
      this.triggerEvent('close');
    },
    
    // 显示弹窗时的动画
    showAnimation() {
      const animation = wx.createAnimation({
        duration: 300,
        timingFunction: 'ease',
      });
      
      animation.opacity(1).scale(1).step();
      
      this.setData({
        animationData: animation.export()
      });
    },
    
    // 隐藏弹窗时的动画
    hideAnimation() {
      const animation = wx.createAnimation({
        duration: 200,
        timingFunction: 'ease',
      });
      
      animation.opacity(0).scale(0.8).step();
      
      this.setData({
        animationData: animation.export()
      });
    }
  }
})