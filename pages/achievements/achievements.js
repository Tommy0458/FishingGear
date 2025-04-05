// pages/achievement/achievement.js
const app = getApp()
const fs = wx.getFileSystemManager()
import lottie from 'lottie-miniprogram';
Page({
    onReady() {
        // 添加延迟确保canvas已完全渲染
        setTimeout(() => {
            wx.createSelectorQuery().select('#lottie-canvas').node(res => {
              if (!res || !res.node) {
                console.error('获取canvas节点失败，节点可能未渲染完成');
                return;
              }
              
              const canvas = res.node;
              const context = canvas.getContext('2d');
              const dpr = wx.getSystemInfoSync().pixelRatio;
        
              // 设置 Canvas 尺寸
              canvas.width = 300 * dpr;
              canvas.height = 300 * dpr;
              context.scale(dpr, dpr);
        
              // 初始化 Lottie
              try {
                lottie.setup(canvas);
                
                // 加载动画数据
                this.animation = lottie.loadAnimation({
                  loop: true,
                  autoplay: true,
                  animationData: require('../../Lottie/Animation.js'),
                  rendererSettings: { context }
                });
              } catch (error) {
                console.error('Lottie初始化失败:', error);
              }
            }).exec();
        }, 300); // 延迟300ms确保canvas已渲染
    },
    onUnload() {
        if (this.animation) this.animation.destroy();
      },
      
      // 每次显示页面时刷新成就数据
      onShow() {
        // 重新从全局数据获取最新的成就数据
        const userData = app.globalData.userAchievements
        const achievementScore = app.globalData.achievementScore || 0
        
        console.log('成就页面显示，重新加载最新数据')
        console.log('当前成就分数:', achievementScore)
        console.log('成就进度:', JSON.stringify(userData))
        
        // 强制重新加载最新的成就数据
        this.loadAchievements()
        // 检查是否有新解锁的成就
        this.checkNewAchievements()
        
        // 更新过滤后的成就列表
        this.updateFilteredAchievements()
        
        // 重置滚动位置到顶部
        wx.createSelectorQuery()
          .select('.achievement-list')
          .node()
          .exec(res => {
            if (res && res[0] && res[0].node) {
              res[0].node.scrollTop = 0
              console.log('成就列表滚动位置已重置')
            }
          })
      },
  data: {
    categories: [
      { id: 'all', name: '全部' },
      { id: 'testman', name: '测试达人' },
      { id: 'persion', name: '个人成就' },
      { id: 'fishing', name: '作钓大师' }
    ],
    activeCategory: 'all',
    achievements: [],
    filteredAchievements: [],
    unlockedCount: 0,
    totalCount: 0,
    newAchievement: null,
    showAnimation: false,
    showPopup: false,
    showDetailPopup: false,
    selectedAchievement: null,
    animationData: null,
    achievementScore: 0,
    scrollIntoViewId: ''
  },

  onLoad(options) {
    this.loadAchievements()
    this.checkNewAchievements()
    this.loadAnimationData()
    
    // 处理从其他页面传递过来的成就ID参数
    if (options && options.achievementId) {
      const achievementId = options.achievementId
      
      // 延迟执行，确保成就数据已加载完成
      setTimeout(() => {
        // 找到对应成就的索引
        const achievement = this.data.achievements.find(a => a.id === achievementId)
        
        if (achievement) {
          // 切换到对应成就的分类
          const category = achievement.category
          
          this.setData({ 
            activeCategory: category,
            scrollIntoViewId: `achievement-${achievementId}`
          })
          
          // 更新过滤后的成就列表
          this.updateFilteredAchievements()
        }
      }, 500)
    }
  },

  // 加载成就数据
  loadAchievements() {
    const { achievements: allAchievements } = require('../../data/achievements.js')
    const userData = app.globalData.userAchievements
    const achievementScore = app.globalData.achievementScore || 0
    
    const processed = allAchievements.map(a => {
      // 获取成就数据，适配新旧格式
      const achievementData = userData[a.id] || { progress: 0, unlockTime: null }
      
      // 获取当前进度，确保是数字类型
      const currentProgress = typeof achievementData === 'object' 
        ? parseInt(achievementData.progress || 0, 10)
        : parseInt(achievementData || 0, 10)
      
      // 根据成就类型处理不同的解锁条件
      let isUnlocked = false
      
      // 定义目标值变量
      let targetValue = 0;
      
      // 根据成就类型处理不同的解锁条件
      if (a.type === 3) {
        // type:3 - 首次使用特定功能后解锁成就
        targetValue = 1; // 首次使用类型的目标值固定为1
        isUnlocked = currentProgress >= 1;
      } else if (a.type === 4) {
        // type:4 - 在特定时间段内完成测试解锁成就
        targetValue = 1; // 时间段类型的目标值固定为1
        isUnlocked = currentProgress >= 1;
      } else {
        // 其他类型成就，获取目标值，确保是数字类型
        targetValue = parseInt(a.value, 10);
        // 确保targetValue是有效数字
        if (isNaN(targetValue)) targetValue = 1;
        // 判断是否解锁，确保数值比较正确
        isUnlocked = currentProgress >= targetValue;
      }
      
      // 获取解锁时间
      const unlockTime = typeof achievementData === 'object' ? achievementData.unlockTime : null;
      
      // 根据成就类型显示不同的目标值
      let targetDisplay = targetValue;
      console.log(`成就[${a.id}] ${a.title}: 进度 ${currentProgress}/${targetDisplay} ${isUnlocked ? '已解锁' : '未解锁'} 解锁时间: ${unlockTime || '未解锁'}`);

      
      return {
        ...a,
        currentProgress: currentProgress,
        targetProgress: targetValue,
        unlocked: isUnlocked,
        unlockTime: unlockTime,
        scrollId: `achievement-${a.id}`
      }
    })

    this.setData({
      achievements: processed,
      totalCount: allAchievements.length,
      unlockedCount: processed.filter(a => a.unlocked).length,
      achievementScore: achievementScore
    })
    
    // 更新过滤后的成就列表
    this.updateFilteredAchievements()
  },

  // 分类过滤
  switchCategory(e) {
    const category = e.currentTarget.dataset.id
    this.setData({ activeCategory: category })
    
    // 更新过滤后的成就列表
    this.updateFilteredAchievements()
  },
  
  // 获取过滤后的成就列表
  get filteredAchievements() {
    if (this.data.activeCategory === 'all') {
      return this.data.achievements
    } else {
      return this.data.achievements.filter(a => a.category === this.data.activeCategory)
    }
  },
  
  // 计算并更新过滤后的成就列表
  updateFilteredAchievements() {
    let filtered;
    if (this.data.activeCategory === 'all') {
      filtered = this.data.achievements;
    } else {
      filtered = this.data.achievements.filter(a => a.category === this.data.activeCategory);
    }
    
    // 1级排序：已解锁成就优先显示，2级排序：按照num升序排列
    filtered.sort((a, b) => {
      // 1级排序：已解锁成就优先显示
      if (a.unlocked && !b.unlocked) return -1;
      if (!a.unlocked && b.unlocked) return 1;
      // 2级排序：按照num升序排列
      return a.num - b.num;
    });
    
    this.setData({
      filteredAchievements: filtered
    });
  },

  // 检查新成就
  checkNewAchievements() {
    const newAchieves = this.data.achievements
      .filter(a => a.unlocked && !a.viewed)
      .sort((a,b) => b.weight - a.weight)
    
    if (newAchieves.length > 0) {
      this.setData({ newAchievement: newAchieves[0] })
      // 标记为已查看
      app.markAchievementViewed(newAchieves[0].id)
    }
  },

  // 成就解锁触发
  unlockAchievement(achievementId, progress) {
    const current = app.globalData.userAchievements[achievementId] || 0
    const achievement = this.data.achievements.find(a => a.id === achievementId)
    
    if (!achievement) return
    
    const newValue = Math.min(current + progress, achievement.value)
    
    if (newValue > current) {
      app.globalData.userAchievements[achievementId] = newValue
      wx.setStorageSync('achievements', app.globalData.userAchievements)
      
      // 检查是否解锁成就
      if (newValue >= achievement.value && current < achievement.value) {
        // 增加成就分数
        app.globalData.achievementScore = (app.globalData.achievementScore || 0) + achievement.score
        wx.setStorageSync('achievementScore', app.globalData.achievementScore)
        
        // 检查是否触发了成就值相关的成就
        this.checkScoreAchievements()
        
        // 触发界面更新
        this.showUnlockEffect(achievement)
      }
    }
  },

  // 加载动画数据
  loadAnimationData() {
    try {
      // 读取动画JSON文件
      const animationData = require('../../Lottie/Animation.js')
      this.setData({
        animationData: animationData
      })
    } catch (error) {
      console.error('加载动画数据失败:', error)
    }
  },

  // 显示动画效果
  showUnlockEffect(achievement) {
    // 显示动画
    this.setData({
      showAnimation: true,
      newAchievement: achievement
    })
    
    // 3秒后隐藏动画并显示弹窗
    setTimeout(() => {
      this.setData({
        showAnimation: false,
        showPopup: true
      })
    }, 3000)
    
    // 将成就添加到待展示队列
    if (!app.globalData.pendingAchievements) {
      app.globalData.pendingAchievements = []
    }
    app.globalData.pendingAchievements.push(achievement)
    wx.setStorageSync('pendingAchievements', app.globalData.pendingAchievements)
  },
  
  // 关闭成就弹窗
  closePopup() {
    this.setData({
      showPopup: false
    })
  },
  
  // 检查成就值相关的成就
  checkScoreAchievements() {
    // 获取所有type为2的成就（成就值相关成就）
    const scoreAchievements = this.data.achievements.filter(a => a.type === 2)
    const currentScore = app.globalData.achievementScore || 0
    
    console.log('检查成就值相关成就，当前成就值:', currentScore)
    
    // 遍历所有成就值相关成就
    scoreAchievements.forEach(achievement => {
      // 检查当前成就值是否达到成就要求
      if (currentScore >= achievement.value) {
        const current = app.globalData.userAchievements[achievement.id] || 0
        console.log(`检查成就[${achievement.id}] ${achievement.title}，要求:${achievement.value}，当前进度:${current}`)
        
        // 如果成就尚未解锁
        if (current < achievement.value) {
          console.log(`解锁成就值成就: ${achievement.title}`)
          
          // 解锁成就
          app.globalData.userAchievements[achievement.id] = achievement.value
          wx.setStorageSync('achievements', app.globalData.userAchievements)
          
          // 增加成就分数（注意：这里可能会导致递归触发其他成就）
          const newScore = app.globalData.achievementScore + achievement.score
          app.globalData.achievementScore = newScore
          wx.setStorageSync('achievementScore', newScore)
          
          console.log(`成就值更新: ${app.globalData.achievementScore - achievement.score} -> ${app.globalData.achievementScore}`)
          
          // 触发界面更新
          this.showUnlockEffect(achievement)
          
          // 更新页面数据
          this.setData({
            achievementScore: app.globalData.achievementScore
          })
          
          // 重新加载成就列表以更新UI
          this.loadAchievements()
        }
      }
    })
  },
  
  // 显示成就详情
  showAchievementDetail(e) {
    // 获取点击的成就数据
    const achievement = e.currentTarget.dataset.achievement
    
    if (achievement && achievement.unlocked) {
      console.log('显示成就详情:', achievement.title)
      
      // 显示成就详情弹窗
      this.setData({
        selectedAchievement: achievement,
        showDetailPopup: true
      })
    }
  },
  
  // 显示未解锁成就提示
  showLockedTip() {
    wx.showToast({
      title: '解锁后查看详情',
      icon: 'none',
      duration: 1500
    })
  },
  
  // 关闭成就详情弹窗
  closeDetailPopup() {
    this.setData({
      showDetailPopup: false
    })
  },
  
  // 处理成就弹窗的查看详情按钮点击事件
  handleViewDetails(e) {
    // 关闭弹窗
    this.setData({
      showPopup: false
    })
    
    // 获取成就信息，优先使用事件传递的数据
    const achievement = e && e.detail && e.detail.achievement ? e.detail.achievement : this.data.newAchievement
    
    // 如果当前已经在成就页面，则滚动到对应成就位置
    if (achievement) {
      const achievementId = achievement.id
      // 找到对应成就的索引
      const index = this.data.achievements.findIndex(a => a.id === achievementId)
      
      if (index !== -1) {
        // 切换到对应成就的分类
        const category = this.data.achievements[index].category
        
        // 为成就卡片添加唯一ID，用于scrollIntoView
        const achievementsWithId = this.data.achievements.map(a => ({
          ...a,
          scrollId: `achievement-${a.id}`
        }))
        
        this.setData({ 
          activeCategory: category,
          achievements: achievementsWithId
        })
        
        // 使用延时确保UI更新后再滚动
        setTimeout(() => {
          // 使用scroll-view的scrollIntoView功能滚动到指定成就
          this.setData({
            scrollIntoViewId: `achievement-${achievementId}`
          })
        }, 300)
      }
    }
    
    console.log('显示成就详情:', achievement)
  },

  // 其他辅助方法...
})