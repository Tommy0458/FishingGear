Component({
  options: {
    multipleSlots: true // 在组件定义时的选项中启用多slot支持
  },
  /**
   * 组件的属性列表
   */
  properties: {
    extClass: {
      type: String,
      value: ''
    },
    title: {
      type: String,
      value: ''
    },
    background: {
      type: String,
      value: ''
    },
    color: {
      type: String,
      value: ''
    },
    back: {
      type: Boolean,
      value: true
    },
    loading: {
      type: Boolean,
      value: false
    },
    homeButton: {
      type: Boolean,
      value: false,
    },
    animated: {
      // 显示隐藏的时候opacity动画效果
      type: Boolean,
      value: true
    },
    show: {
      // 显示隐藏导航，隐藏的时候navigation-bar的高度占位还在
      type: Boolean,
      value: true,
      observer: '_showChange'
    },
    // back为true的时候，返回的页面深度
    delta: {
      type: Number,
      value: 1
    },
  },
  /**
   * 组件的初始数据
   */
  data: {
    displayStyle: '',
    backgroundStyle: ''
  },
  lifetimes: {
    attached() {
      try {
        const rect = wx.getMenuButtonBoundingClientRect()
        // 使用同步方法获取系统信息，避免异步导致的渲染问题
        const res = wx.getSystemInfoSync()
        const isAndroid = res.platform === 'android'
        const isDevtools = res.platform === 'devtools'
        
        // 先准备好所有数据，然后一次性setData
        const data = {
          ios: !isAndroid,
          innerPaddingRight: `padding-right: ${res.windowWidth - rect.left}px`,
          leftWidth: `width: ${res.windowWidth - rect.left}px`,
          safeAreaTop: isDevtools || isAndroid ? `height: calc(var(--height) + ${res.safeArea.top}px); padding-top: ${res.safeArea.top}px` : ``
        }
        
        // 使用nextTick确保数据在下一个渲染周期更新
        wx.nextTick(() => {
          this.setData(data)
        })
      } catch (error) {
        console.error('导航栏初始化失败:', error)
      }
    },
  },
  /**
   * 组件的方法列表
   */
  methods: {
    _showChange(show) {
      const animated = this.data.animated
      let displayStyle = ''
      if (animated) {
        displayStyle = `opacity: ${
          show ? '1' : '0'
        };transition:opacity 0.5s;`
      } else {
        displayStyle = `display: ${show ? '' : 'none'}`
      }
      
      // 使用nextTick确保在下一个渲染周期更新数据
      wx.nextTick(() => {
        this.setData({
          displayStyle
        })
      })
    },
    back() {
      const data = this.data
      if (data.delta) {
        wx.navigateBack({
          delta: data.delta
        })
      }
      this.triggerEvent('back', { delta: data.delta }, {})
    }
  },
})
