// pages/test/test-list.js
const testData = require('../../data/testDataNew');

Page({
  data: {
    testList: [],
    btnPosition: {
      x: 0,
      y: 0
    },
    isDragging: false // 标记按钮是否正在拖动中
  },
  onLoad: function() {
    // 获取所有测试数据并转换为数组格式
    const testList = [];
    
    // 遍历testData中的所有测试对象
    for (const key in testData) {
      if (testData.hasOwnProperty(key) && typeof testData[key] === 'object' && testData[key].id && testData[key].title) {
        testList.push({
          id: testData[key].id,
          title: testData[key].title,
          key: key
        });
      }
    }
    
    // 按id排序
    testList.sort((a, b) => a.id - b.id);
    
    // 初始化按钮位置（默认在右侧中间）
    this.initButtonPosition();
    
    this.setData({
      testList: testList
    });
  },
  
  // 跳转到对应的测试页面
  goToTest: function(e) {
    const testKey = e.currentTarget.dataset.key;
    const testId = e.currentTarget.dataset.id;
    
    // 将选中的测试数据存入缓存
    wx.setStorageSync('selectedTest', testData[testKey]);
    
    // 跳转到测试页面
    wx.navigateTo({
      url: `/pages/test/test?id=${testId}`
    });
  },
  
  backToHome() {
    // 点击时先设置为不透明
    this.setData({
      isDragging: true
    });
    
    // 返回上一页，如果失败则返回首页
    wx.navigateBack({
      delta: 1,
      fail: function() {
        // 如果没有上一页，则返回首页
        wx.switchTab({
          url: '/pages/home/home'
        });
      }
    });
    
    // 由于导航可能会立即执行，我们不需要重置isDragging状态
    // 页面跳转后会自动销毁当前页面实例
  },
  
  // 初始化按钮位置
  initButtonPosition: function() {
    const that = this;
    wx.getSystemInfo({
      success: function(res) {
        // 设置按钮初始位置在右侧中间
        that.setData({
          btnPosition: {
            x: res.windowWidth - 60,
            y: res.windowHeight / 2
          },
          screenWidth: res.windowWidth,
          screenHeight: res.windowHeight
        });
      }
    });
  },
  
  // 拖动按钮
  dragButton: function(e) {
    // 确保是home按钮
    if (e.currentTarget.dataset.type === 'home') {
      const touch = e.touches[0];
      this.setData({
        'btnPosition.x': touch.clientX - 30, // 减去按钮宽度的一半，使触摸点在按钮中心
        'btnPosition.y': touch.clientY - 30,  // 减去按钮高度的一半
        isDragging: true // 标记按钮正在拖动中
      });
    }
  },
  
  // 触摸开始时的X坐标
  touchStart: function(e) {
    this.startX = e.touches[0].pageX;
    this.startY = e.touches[0].pageY;
    // 记录当前按钮位置，用于判断是否是按钮拖动
    this.btnStartX = this.data.btnPosition.x;
    this.btnStartY = this.data.btnPosition.y;
  },
  
  // 触摸移动
  touchMove: function(e) {
    // 阻止默认行为，防止出现半透明"划块"
    e.preventDefault && e.preventDefault();
    return false;
  },
  
  // 触摸结束时，检测是否为右滑操作或按钮拖动结束
  touchEnd: function(e) {
    const endX = e.changedTouches[0].pageX;
    const distance = endX - this.startX;
    
    // 如果是右滑操作（距离大于100）且不是按钮拖动
    if (distance > 100 && this.data.btnPosition.x === this.btnStartX && this.data.btnPosition.y === this.btnStartY) {
      this.backToHome();
      return;
    }
    
    // 如果按钮位置发生了变化，说明是按钮拖动结束，进行边缘吸附
    if (this.data.btnPosition.x !== this.btnStartX || this.data.btnPosition.y !== this.btnStartY) {
      this.snapToEdge();
    }
    
    // 重置拖动状态，恢复透明度动画
    if (this.data.isDragging) {
      this.setData({
        isDragging: false
      });
    }
  },
  
  // 按钮吸附到边缘
  snapToEdge: function() {
    const { btnPosition, screenWidth, screenHeight } = this.data;
    
    // 计算到四个边的距离
    const distToLeft = btnPosition.x;
    const distToRight = screenWidth - (btnPosition.x + 60); // 60是按钮宽度
    const distToTop = btnPosition.y;
    const distToBottom = screenHeight - (btnPosition.y + 60); // 60是按钮高度
    
    // 找出最小距离
    const minDist = Math.min(distToLeft, distToRight, distToTop, distToBottom);
    
    // 根据最小距离吸附到对应的边
    if (minDist === distToLeft) {
      // 吸附到左边
      this.setData({
        'btnPosition.x': 10
      });
    } else if (minDist === distToRight) {
      // 吸附到右边
      this.setData({
        'btnPosition.x': screenWidth - 70
      });
    } else if (minDist === distToTop) {
      // 吸附到顶部
      this.setData({
        'btnPosition.y': 10
      });
    } else {
      // 吸附到底部
      this.setData({
        'btnPosition.y': screenHeight - 70
      });
    }
  },
  
});