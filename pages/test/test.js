const testDataModule = require('../../data/testDataNew');

Page({
  data: {
    testData: null,
    currentQuestion: {},
    totalQuestions: 0,
    progress: 0,
    selectedIndex: null,
    answers: [],
    showResult: false,
    resultData: {},
    dimensionScores: {}, // 维度得分
    isProcessing: false // 添加处理标志位，防止重复处理
  },

  onLoad(options) {
    this.initTest();
  },

  initTest() {
    const selectedTest = wx.getStorageSync('selectedTest') || testDataModule.Testone;

    this.setData({
      testData: selectedTest,
      currentQuestion: selectedTest.questions[0],
      totalQuestions: selectedTest.questions.length,
      progress: (1 / selectedTest.questions.length) * 100,
      dimensionScores: {}, // 确保初始化为空
      answers: []
    });
  },

  selectOption(e) {
    const index = e.currentTarget.dataset.index;
    this.setData({ selectedIndex: index });
  },

  handleAutoNext(e) {
    // 如果正在处理中，则忽略此次点击
    if (this.data.isProcessing) return;
    
    const index = e.currentTarget.dataset.index;
    this.setData({ selectedIndex: index });
    
    // 短暂延迟后自动进入下一题，给用户一个视觉反馈的时间
    setTimeout(() => {
      this.goNext();
    }, 300);
  },

  goNext() {
    // 如果没有选择或正在处理中，则返回
    if (this.data.selectedIndex === null || this.data.isProcessing) return;
    
    // 设置处理标志位，防止重复处理
    this.setData({ isProcessing: true });

    const currentAnswer = this.data.currentQuestion.options[this.data.selectedIndex];

    // 记录用户选择的维度信息
    const updatedAnswers = [...this.data.answers];
    updatedAnswers.push({
      questionId: this.data.currentQuestion.id,
      selectedOption: this.data.selectedIndex,
      resultKey: currentAnswer.resultKey
    });

    // 计算维度得分
    const updatedDimensionScores = { ...this.data.dimensionScores };

    currentAnswer.resultKey.forEach(([dimension, baseWeight]) => {
      const cleanDim = dimension.trim().charAt(0).toUpperCase() + dimension.trim().slice(1).toLowerCase();
      const dimensionWeight = this.data.testData.dimensionWeights[cleanDim] || 1;
      const finalWeight = baseWeight * dimensionWeight;
      
      if (!updatedDimensionScores[cleanDim]) {
        updatedDimensionScores[cleanDim] = 0;
      }
      updatedDimensionScores[cleanDim] += finalWeight;
    });

    // 确保数据正确存储
    this.setData({
      answers: updatedAnswers,
      dimensionScores: updatedDimensionScores
    });

    const nextId = this.data.currentQuestion.id + 1;
    if (nextId <= this.data.testData.questions.length) {
      this.setData({
        currentQuestion: this.data.testData.questions.find(q => q.id === nextId),
        progress: (nextId / this.data.testData.questions.length) * 100,
        selectedIndex: null,
        isProcessing: false // 重置处理标志位
      });
    } else {
      this.calculateResult();
    }
  },

  calculateResult() {
    console.log('最终维度得分:', this.data.dimensionScores);
    console.log('所有答案记录:', JSON.stringify(this.data.answers));
    
    // 确保答案数量不超过题目数量
    let validAnswers = this.data.answers;
    if (validAnswers.length > this.data.totalQuestions) {
      console.warn(`答案数量(${validAnswers.length})超过题目数量(${this.data.totalQuestions})，将只使用前${this.data.totalQuestions}个答案`);
      validAnswers = validAnswers.slice(0, this.data.totalQuestions);
    }

    const recalculatedScores = {};

    // 遍历答案并重新计算维度得分
    validAnswers.forEach(answer => {
        answer.resultKey.forEach(([dimension, baseWeight]) => {
            const cleanDim = dimension.trim().charAt(0).toUpperCase() + dimension.trim().slice(1).toLowerCase();
            // 应用维度权重配置系数
            const dimensionWeight = this.data.testData.dimensionWeights[cleanDim] || 1;
            const finalWeight = baseWeight * dimensionWeight;

            recalculatedScores[cleanDim] = (recalculatedScores[cleanDim] || 0) + finalWeight;
        });
    });

    // 输出应用权重后的维度得分
    console.log('应用权重后的维度得分:', recalculatedScores);
    this.setData({ dimensionScores: recalculatedScores });

    let bestMatch = null;
    let highestScore = -Infinity;
    let defaultResult = null;

    // 第一阶段：尝试匹配所有特定公式
    this.data.testData.results.forEach(result => {
        try {
            // 保存formula为"true"的结果作为默认结果
            if (result.formula === "true") {
                defaultResult = result;
                return; // 继续检查其他结果
            }

            const isMatch = this.evaluateFormula(result.formula, recalculatedScores);
            console.log(`计算公式: ${result.formula}, 结果: ${isMatch}`);
            if (isMatch) {
                const totalScore = Object.values(recalculatedScores).reduce((sum, score) => sum + score, 0);
                if (totalScore > highestScore) {
                    highestScore = totalScore;
                    bestMatch = result;
                }
            }
        } catch (e) {
            console.error(`公式计算失败`, e);
        }
    });

    // 第二阶段：如果没有匹配到特定公式，使用formula为"true"的默认结果
    if (!bestMatch && defaultResult) {
        console.log('使用默认结果:', defaultResult.title);
        bestMatch = defaultResult;
    }

    console.log('最佳匹配结果:', bestMatch ? bestMatch.title : '无匹配结果');
    // 如果没有任何匹配（包括默认结果），则使用第一个结果
    this.showResult(bestMatch || this.data.testData.results[0]);
}

,

evaluateFormula(formula, env) {
  try {
      // 确保 `safeEnv` 是标准对象
      let safeEnv = JSON.parse(JSON.stringify(env));
      Object.keys(safeEnv).forEach(key => {
          if (safeEnv[key] === undefined) {
              safeEnv[key] = 0;
          }
      });

      // 替换变量
      const processedFormula = formula.replace(/\b([a-zA-Z_][a-zA-Z0-9_]*)\b/g, match => {
          if (["true", "false"].includes(match)) return match; // 避免 true/false 误替换
          return `safeEnv["${match}"]`;
      });

      console.log(`解析后的公式: return (${processedFormula});`);
      console.log(`当前维度得分:`, safeEnv);

      // 直接使用 eval 计算（微信小程序支持）
      let result = eval(`(function(safeEnv){ return (${processedFormula}); })`)(safeEnv);

      console.log(`计算公式: ${formula}, 结果: ${result}`);
      return Boolean(result);
  } catch (e) {
      console.error('公式执行失败:', formula, e);
      return false;
  }
}






,

  showResult(data) {
    this.setData({
      showResult: true,
      resultData: data,
      isProcessing: false // 重置处理标志位
    });
    
    // 触发测试完成成就检查
    this.checkTestAchievements();
    
    // 检查时间相关成就
    this.checkTimeAchievements();
  },
  
  // 检查测试相关成就
  checkTestAchievements() {
    const app = getApp();
    
    // 获取已完成的测试数量
    const completedTests = app.globalData.completedTests || [];
    const testId = this.data.testData.id;
    
    console.log('===== 测试成就检查 =====')
    console.log(`当前测试ID: ${testId}, 测试名称: ${this.data.testData.title || '未知'}`)
    console.log(`已完成测试列表: ${JSON.stringify(completedTests)}`)
    
    // 如果这个测试ID不在已完成列表中，添加它
    if (!completedTests.includes(testId)) {
      completedTests.push(testId);
      app.globalData.completedTests = completedTests;
      wx.setStorageSync('completedTests', completedTests);
      
      console.log(`新测试完成，更新后的测试列表: ${JSON.stringify(completedTests)}`)
      console.log(`当前已完成测试总数: ${completedTests.length}`)
      
      // 检查成就：首次完成任意测试
      if (completedTests.length === 1) {
        console.log('触发成就检查: 初次见面 (test1)')
        this.updateAchievement('test1', 1);
      }
      
      // 检查成就：完成5个测试
      if (completedTests.length >= 5) {
        console.log('触发成就检查: 测试达人 (test2)')
        this.updateAchievement('test2', 5);
      }
      
      // 检查成就：完成10个测试
      if (completedTests.length >= 10) {
        console.log('触发成就检查: 测试专家 (test4)')
        this.updateAchievement('test4', 10);
      }
      
      // 检查成就：完成20个测试
      if (completedTests.length >= 20) {
        console.log('触发成就检查: 测试大师 (test5)')
        this.updateAchievement('test5', 20);
      }
    } else {
      console.log(`该测试已完成过，不重复计入成就`)
    }
  },
  
  // 更新成就进度
  updateAchievement(achievementId, progress) {
    const app = getApp();
    // 获取当前成就数据，适配新旧格式
    const achievementData = typeof app.globalData.userAchievements[achievementId] === 'object' 
      ? app.globalData.userAchievements[achievementId] 
      : { progress: 0, unlockTime: null };
    
    const current = achievementData.progress || 0;
    
    console.log(`===== 成就更新 =====`)
    console.log(`成就ID: ${achievementId}, 当前进度: ${current}, 目标进度: ${progress}`)
    
    // 如果已经达到目标值，不再更新
    if (current >= progress) {
      console.log(`成就[${achievementId}]已达到目标值，不再更新`)
      return;
    }
    
    // 使用app.js中的方法更新成就进度，这样会自动记录解锁时间
    app.updateAchievementProgress(achievementId, progress - current);
    console.log(`成就进度已更新: ${current} -> ${progress}`)
    
    // 获取成就数据
    const { achievements: allAchievements } = require('../../data/achievements.js');
    const achievement = allAchievements.find(a => a.id === achievementId);
    
    if (achievement) {
      console.log(`成就详情: ${achievement.title} - ${achievement.description}`)
      console.log(`成就分数: ${achievement.score}, 权重: ${achievement.weight}`)
      
      // 增加成就分数
      const oldScore = app.globalData.achievementScore || 0;
      app.globalData.achievementScore = oldScore + achievement.score;
      wx.setStorageSync('achievementScore', app.globalData.achievementScore);
      console.log(`成就分数更新: ${oldScore} -> ${app.globalData.achievementScore}`)
      
      // 将成就添加到待展示队列
      if (!app.globalData.pendingAchievements) {
        app.globalData.pendingAchievements = [];
      }
      app.globalData.pendingAchievements.push(achievement);
      wx.setStorageSync('pendingAchievements', app.globalData.pendingAchievements);
      console.log(`成就已添加到展示队列，当前队列长度: ${app.globalData.pendingAchievements.length}`)
      
      // 检查成就值相关的成就
      console.log(`开始检查成就值相关成就...`)
      this.checkScoreAchievements();
    } else {
      console.error(`找不到成就定义: ${achievementId}`)
    }
  },
  
  // 检查成就值相关的成就
  checkScoreAchievements() {
    const app = getApp();
    const { achievements: allAchievements } = require('../../data/achievements.js');
    const scoreAchievements = allAchievements.filter(a => a.type === 2);
    const currentScore = app.globalData.achievementScore || 0;
    
    console.log(`===== 成就值相关成就检查 =====`)
    console.log(`当前成就总分: ${currentScore}`)
    console.log(`成就值相关成就数量: ${scoreAchievements.length}`)
    
    scoreAchievements.forEach(achievement => {
      const current = app.globalData.userAchievements[achievement.id] || 0;
      console.log(`检查成就[${achievement.id}] ${achievement.title}: 需要${achievement.value}分，当前进度${current}/${achievement.value}`)
      
      if (currentScore >= achievement.value) {
        console.log(`当前成就分数(${currentScore})已达到解锁条件(${achievement.value})`)
        
        if (current < achievement.value) {
          console.log(`成就[${achievement.id}] ${achievement.title} 解锁条件满足，准备解锁`)
          
          // 解锁成就，使用app.js中的方法更新成就进度，这样会自动记录解锁时间
          app.updateAchievementProgress(achievement.id, achievement.value - current);
          console.log(`成就进度已更新: ${current} -> ${achievement.value}`)
          
          // 增加成就分数
          const oldScore = app.globalData.achievementScore;
          app.globalData.achievementScore += achievement.score;
          wx.setStorageSync('achievementScore', app.globalData.achievementScore);
          console.log(`成就分数更新: ${oldScore} -> ${app.globalData.achievementScore}`)
          
          // 将成就添加到待展示队列
          if (!app.globalData.pendingAchievements) {
            app.globalData.pendingAchievements = [];
          }
          app.globalData.pendingAchievements.push(achievement);
          wx.setStorageSync('pendingAchievements', app.globalData.pendingAchievements);
          console.log(`成就已添加到展示队列，当前队列长度: ${app.globalData.pendingAchievements.length}`)
        } else {
          console.log(`成就[${achievement.id}] ${achievement.title} 已解锁，无需更新`)
        }
      } else {
        console.log(`当前成就分数(${currentScore})未达到解锁条件(${achievement.value})，无法解锁`)
      }
    });
  },

  // 检查时间相关成就
  checkTimeAchievements() {
    const app = getApp();
    const { achievements: allAchievements } = require('../../data/achievements.js');
    
    // 获取当前时间（北京时间，UTC+8）
    const now = new Date();
    const beijingTime = new Date(now.getTime() + 8 * 60 * 60 * 1000);
    const currentHour = beijingTime.getUTCHours();
    
    console.log(`===== 时间相关成就检查 =====`);
    console.log(`当前时间: ${beijingTime.toISOString()}, 小时: ${currentHour}`);
    
    // 筛选出type:4类型的成就（时间段内完成测试）
    const timeAchievements = allAchievements.filter(a => a.type === 4);
    console.log(`时间相关成就数量: ${timeAchievements.length}`);
    
    timeAchievements.forEach(achievement => {
      // 获取成就定义的时间范围
      const startHour = achievement.value[0][0];
      const endHour = achievement.value[1][0];
      
      console.log(`检查成就[${achievement.id}] ${achievement.title}: 时间范围 ${startHour}-${endHour}点, 当前时间: ${currentHour}点`);
      
      // 检查当前时间是否在成就定义的时间范围内
      let isInTimeRange = false;
      
      if (startHour <= endHour) {
        // 正常时间段（例如：8点到17点）
        isInTimeRange = currentHour >= startHour && currentHour < endHour;
      } else {
        // 跨天时间段（例如：22点到5点）
        isInTimeRange = currentHour >= startHour || currentHour < endHour;
      }
      
      if (isInTimeRange) {
        console.log(`当前时间在成就[${achievement.id}]的时间范围内，检查是否需要解锁`);
        
        // 获取当前成就进度
        const achievementData = typeof app.globalData.userAchievements[achievement.id] === 'object'
          ? app.globalData.userAchievements[achievement.id]
          : { progress: 0, unlockTime: null };
        
        const current = achievementData.progress || 0;
        
        // 如果成就尚未解锁，则解锁它
        if (current < 1) {
          console.log(`解锁时间相关成就: ${achievement.title}`);
          this.updateAchievement(achievement.id, 1);
        } else {
          console.log(`成就[${achievement.id}] ${achievement.title} 已解锁，无需更新`);
        }
      } else {
        console.log(`当前时间不在成就[${achievement.id}]的时间范围内，无法解锁`);
      }
    });
  },
  
  backToHome() {
    wx.navigateBack({
      delta: 1,
      fail: function() {
        wx.switchTab({ url: '/pages/home/home' });
      }
    });
  },

  goPrev() {
    if (this.data.currentQuestion.id <= 1) return;
    
    const prevId = this.data.currentQuestion.id - 1;
    const prevQuestion = this.data.testData.questions.find(q => q.id === prevId);
    
    // 查找之前的答案
    const prevAnswer = this.data.answers.find(a => a.questionId === prevId);
    const prevSelectedIndex = prevAnswer ? prevAnswer.selectedOption : null;
    
    this.setData({
      currentQuestion: prevQuestion,
      progress: (prevId / this.data.totalQuestions) * 100,
      selectedIndex: prevSelectedIndex
    });
  },

  // 触摸事件处理
  touchStart(e) {
    this.startX = e.touches[0].pageX;
  },

  touchEnd(e) {
    const endX = e.changedTouches[0].pageX;
    const diff = endX - this.startX;
    
    // 判断是左滑还是右滑，阈值为50
    if (Math.abs(diff) > 50) {
      if (diff > 0) {
        // 右滑，返回上一题
        this.goPrev();
      } else {
        // 左滑，如果已选择则进入下一题
        if (this.data.selectedIndex !== null) {
          this.goNext();
        }
      }
    }
  }
});
