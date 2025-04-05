// components/fish-on-popup/fish-on-popup.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    visible: {
      type: Boolean,
      value: false
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    animationData: {}
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
    onFight() {
      this.triggerEvent('fight');
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
    }
  },
  
  /**
   * 组件生命周期
   */
  lifetimes: {
    attached() {
      // 在组件实例进入页面节点树时执行
    },
    
    ready() {
      // 在组件在视图层布局完成后执行
      if (this.data.visible) {
        this.showAnimation();
      }
    }
  },
  
  /**
   * 组件所在页面的生命周期
   */
  pageLifetimes: {
    show() {
      // 页面被展示时执行
    }
  },
  
  /**
   * 属性监听器
   */
  observers: {
    'visible': function(visible) {
      if (visible) {
        this.showAnimation();
      }
    }
  }
})