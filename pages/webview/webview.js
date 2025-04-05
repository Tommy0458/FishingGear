// pages/webview/webview.js
Page({
  data: {
    url: '',
    title: ''
  },

  onLoad: function (options) {
    // 获取并解码URL参数
    if (options.url) {
      const url = decodeURIComponent(options.url);
      const title = options.title ? decodeURIComponent(options.title) : '网页内容';
      
      this.setData({
        url: url,
        title: title
      });

      // 设置页面标题
      wx.setNavigationBarTitle({
        title: title
      });
    } else {
      wx.showToast({
        title: '无效的URL',
        icon: 'none'
      });
      setTimeout(() => {
        wx.navigateBack();
      }, 1500);
    }
  },

  /**
   * 导航到主页
   */
  navigateToHome() {
    wx.switchTab({
      url: '/pages/home/home'
    });
  },

  onShareAppMessage: function () {
    return {
      title: this.data.title,
      path: `/pages/webview/webview?url=${encodeURIComponent(this.data.url)}&title=${encodeURIComponent(this.data.title)}`
    };
  }
});