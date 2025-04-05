要实现 Banner切换时页面标题栏（导航栏）颜色跟随主色调变化，需结合微信小程序的导航栏动态设置能力。以下是分步实现方案：

一、实现效果
标题栏变色：导航栏背景色跟随Banner主色调变化，文字颜色自动适配（深色背景用白色文字，浅色背景用黑色文字）。

平滑过渡：导航栏颜色切换时添加过渡动画（需自定义导航栏实现）。

与Banner背景同步：标题栏颜色与页面背景渐变同步切换。

二、核心代码实现
1. 修改WXML结构（自定义导航栏，可选）
如果使用原生导航栏，可直接通过API修改颜色。若需更复杂效果（如渐变），建议使用自定义导航栏：

html
复制
<!-- 自定义导航栏 -->
<view class="custom-navbar" style="{{navBarStyle}}">
  <view class="navbar-title">{{navTitle}}</view>
</view>

<!-- Banner轮播组件 -->
<swiper bindchange="onSwiperChange">
  <!-- swiper-item内容 -->
</swiper>
运行 HTML
2. WXSS样式
css
复制
/* 自定义导航栏样式 */
.custom-navbar {
  height: 60px;
  padding-top: 20px; /* 适配状态栏 */
  transition: background 0.5s ease-in-out;
}
.navbar-title {
  text-align: center;
  font-weight: bold;
}
3. JS逻辑
javascript
复制
Page({
  data: {
    navBarStyle: '',     // 导航栏动态样式
    navTitle: '首页',     // 导航栏标题
    bannerList: [/* ... */] // Banner数据（含预定义mainColor）
  },

  // 监听Banner切换
  onSwiperChange(e) {
    const index = e.detail.current;
    const mainColor = this.data.bannerList[index].mainColor;
    
    // 设置页面背景渐变
    this.setGradientStyle(mainColor);
    
    // 设置导航栏颜色及标题文字颜色
    this.setNavBarStyle(mainColor);
  },

  // 设置导航栏样式
  setNavBarStyle(mainColor) {
    // 计算文字颜色（深色背景用白色，浅色用黑色）
    const textColor = this.calculateTextColor(mainColor);
    
    // 生成导航栏样式
    const style = `background: ${mainColor}; color: ${textColor};`;
    this.setData({ navBarStyle: style });
    
    // 若使用原生导航栏，调用API：
    wx.setNavigationBarColor({
      frontColor: textColor, // 文字颜色
      backgroundColor: mainColor // 背景色
    });
  },

  // 计算文字颜色（基于颜色亮度）
  calculateTextColor(hexColor) {
    const rgb = parseInt(hexColor.replace('#', ''), 16);
    const r = (rgb >> 16) & 0xff;
    const g = (rgb >> 8) & 0xff;
    const b = (rgb >> 0) & 0xff;
    const brightness = (r * 299 + g * 587 + b * 114) / 1000;
    return brightness > 128 ? '#000000' : '#ffffff';
  }
});
三、关键实现细节
1. 动态设置原生导航栏颜色
通过 wx.setNavigationBarColor API 直接修改原生导航栏颜色：

javascript
复制
wx.setNavigationBarColor({
  frontColor: '#ffffff', // 前景色（标题文字）
  backgroundColor: '#2A5CA8' // 背景色
});
2. 自定义导航栏的渐变效果
若需要导航栏背景与页面背景同步渐变，可将样式设置为相同的渐变值：

javascript
复制
// 生成导航栏渐变样式
const gradient = `linear-gradient(to right, ${mainColor}, #ffffff)`;
this.setData({ navBarStyle: `background: ${gradient};` });
3. 颜色亮度计算
通过公式计算主色调亮度，自动切换文字颜色：

javascript
复制
// 判断颜色是否偏亮
isLightColor(hexColor) {
  const rgb = parseInt(hexColor.replace('#', ''), 16);
  const r = (rgb >> 16) & 0xff;
  const g = (rgb >> 8) & 0xff;
  const b = (rgb >> 0) & 0xff;
  return (r * 0.299 + g * 0.587 + b * 0.114) > 186;
}
四、扩展优化
1. 动态提取主色调
若Banner颜色未预定义，使用Canvas动态分析图片颜色：

javascript
复制
// 在onSwiperChange中动态提取颜色
extractColor(imageUrl) {
  const ctx = wx.createCanvasContext('colorCanvas');
  ctx.drawImage(imageUrl, 0, 0, 1, 1); // 绘制1x1像素（快速取色）
  ctx.getImageData({
    x: 0,
    y: 0,
    width: 1,
    height: 1,
    success: (res) => {
      const [r, g, b] = res.data;
      const mainColor = `#${r.toString(16)}${g.toString(16)}${b.toString(16)}`;
      this.setNavBarStyle(mainColor);
    }
  });
}
2. 添加过渡动画
通过CSS或小程序动画API实现颜色平滑过渡：

css
复制
.custom-navbar {
  transition: background 0.5s ease-in-out, color 0.5s ease-in-out;
}
3. 缓存颜色数据
首次加载时预计算所有Banner颜色，避免重复提取：

javascript
复制
onLoad() {
  this.data.bannerList.forEach(item => {
    this.extractColor(item.imageUrl).then(color => {
      item.mainColor = color;
    });
  });
}
