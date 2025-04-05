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
    dimensionScores: {} // 维度得分
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
    const index = e.currentTarget.dataset.index;
    this.setData({ selectedIndex: index });
    
    // 短暂延迟后自动进入下一题，给用户一个视觉反馈的时间
    setTimeout(() => {
      this.goNext();
    }, 300);
  },

  goNext() {
    if (this.data.selectedIndex === null) return;

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
        selectedIndex: null
      });
    } else {
      this.calculateResult();
    }
  },

  calculateResult() {
    console.log('最终维度得分:', this.data.dimensionScores);
    console.log('所有答案记录:', JSON.stringify(this.data.answers));

    const recalculatedScores = {};

    // 遍历答案并重新计算维度得分
    this.data.answers.forEach(answer => {
        answer.resultKey.forEach(([dimension, baseWeight]) => {
            const cleanDim = dimension.trim().charAt(0).toUpperCase() + dimension.trim().slice(1).toLowerCase();
            const dimensionWeight = this.data.testData.dimensionWeights[cleanDim] || 1;
            const finalWeight = baseWeight * dimensionWeight;

            recalculatedScores[cleanDim] = (recalculatedScores[cleanDim] || 0) + finalWeight;
        });
    });

    this.setData({ dimensionScores: recalculatedScores });

    let bestMatch = null;
    let highestScore = -Infinity;

    this.data.testData.results.forEach(result => {
        try {
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

    console.log('最佳匹配结果:', bestMatch ? bestMatch.title : '无匹配结果');
    this.showResult(bestMatch || this.data.testData.results[0]);
}

,

evaluateFormula(formula, env) {
  try {
      // 1. 确保 `safeEnv` 是标准对象
      let safeEnv = JSON.parse(JSON.stringify(env));
      Object.keys(safeEnv).forEach(key => {
          if (safeEnv[key] === undefined) {
              safeEnv[key] = 0;
          }
      });

      // 2. 修正变量替换逻辑
      const processedFormula = formula.replace(/\b([a-zA-Z_][a-zA-Z0-9_]*)\b/g, match => {
          if (["true", "false"].includes(match)) return match; // 避免 true/false 误替换
          return `safeEnv["${match}"]`;
      });

      console.log(`解析后的公式: return (${processedFormula});`);
      console.log(`当前维度得分:`, safeEnv);

      // 3. 计算公式
      const func = new Function("safeEnv", `return (${processedFormula});`);
      const result = func(safeEnv);

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
      resultData: data
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
