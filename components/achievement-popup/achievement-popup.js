// components/achievement-popup/achievement-popup.js
Component({
  properties: {
    visible: {
      type: Boolean,
      value: false
    },
    achievement: {
      type: Object,
      value: null
    }
  },

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
  
  // 监听页面生命周期
  pageLifetimes: {
    hide() {
      const pages = getCurrentPages();
      if (pages.length > 0 && pages[pages.length - 1].route.includes('pages/achievements/achievements')) {
        return;
      }
      if (this.properties.visible) {
        this.triggerEvent('close');
      }
    }
  },

  observers: {
    'visible': function(visible) {
      // 确保animation对象已创建后再执行动画
      if (!this.animation) {
        this.animation = wx.createAnimation({
          duration: 300,
          timingFunction: 'ease'
        })
      }
      
      if (visible) {
        this.showAnimation()
      } else {
        this.hideAnimation()
      }
    }
  },

  methods: {
    preventTouchMove() {
      // 阻止触摸事件穿透
      return false
    },
    
    showAnimation() {
      // 添加安全检查，确保animation对象存在
      if (!this.animation) {
        this.animation = wx.createAnimation({
          duration: 300,
          timingFunction: 'ease'
        })
      }
      this.animation.opacity(1).scale(1).step()
      this.setData({
        animationData: this.animation.export()
      })
    },

    hideAnimation() {
      // 添加安全检查，确保animation对象存在
      if (!this.animation) {
        this.animation = wx.createAnimation({
          duration: 300,
          timingFunction: 'ease'
        })
        // 初始状态设置为隐藏
        this.animation.opacity(0).scale(0.8).step()
      } else {
        this.animation.opacity(0).scale(0.8).step()
      }
      this.setData({
        animationData: this.animation.export()
      })
    },

    onClose() {
      this.triggerEvent('close')
    },

    onViewDetails() {
      // 触发viewdetails事件，并传递当前成就信息
      this.triggerEvent('viewdetails', { achievement: this.properties.achievement });
      
      // 直接跳转到成就页面，并传递成就ID
      if (this.properties.achievement && this.properties.achievement.id) {
        const achievementId = this.properties.achievement.id;
        const pages = getCurrentPages();
        const currentPage = pages[pages.length - 1];
        
        if (currentPage && currentPage.route === 'pages/achievements/achievements') {
            currentPage.handleViewDetails({
              detail: { achievement: this.properties.achievement }
            });
            this.onClose();
          } else {
            wx.switchTab({
              url: `/pages/achievements/achievements`,
              success: () => {
                // 成功跳转后再关闭弹窗，避免页面隐藏时触发 close
                setTimeout(() => this.onClose(), 300);
              }
            });
          }
        }
      }
  }
})