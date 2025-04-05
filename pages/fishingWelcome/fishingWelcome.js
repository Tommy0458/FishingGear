// pages/fishingWelcome/fishingWelcome.js
Page({
  data: {
    showTips: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    console.log('[钓鱼模拟器] 欢迎页面加载');
  },

  /**
   * 显示/隐藏功能提示
   */
  toggleTips() {
    this.setData({
      showTips: !this.data.showTips
    });
    console.log('[钓鱼模拟器] 切换提示显示状态:', this.data.showTips);
  },

  /**
   * 开始钓鱼，跳转到钓鱼游戏页面
   */
  startFishing() {
    console.log('[钓鱼模拟器] 用户点击了开始钓鱼按钮');
    wx.navigateTo({
      url: '/pages/gamePage/gamePage'
    });
  }
});