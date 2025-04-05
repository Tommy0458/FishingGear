// pages/articlePage/articlePage.js
Page({
  data: {
    articles: [],
    loading: true,
    originalArticles: [], // 原始文章数据
    searchKeyword: "", // 搜索关键词
    showNoResults: false, // 是否显示无结果提示
    highlightedArticles: [] // 用于存储高亮处理后的文章数据
  },

  onLoad: function(options) {
    this.loadArticles();
  },

  // 加载文章数据
  loadArticles: function() {
    try {
      // 动态加载文章数据
      const articleData = [];
      
      // 获取textData目录下的所有文章文件
      const fs = wx.getFileSystemManager();
      // 使用正则表达式匹配文章文件名模式
      const articlePattern = /article\d+\.js$/;
      
      // 尝试读取data/textData目录下的所有文章文件
      try {
        // 使用文件系统API读取目录下的所有文件
        const fs = wx.getFileSystemManager();
        // 读取data/textData目录下的所有文件
        const fileList = fs.readdirSync('data/textData');
        // 过滤出所有js文件
        const articleFiles = fileList.filter(file => file.endsWith('.js'));
        
        // 遍历所有文章文件并尝试加载
        articleFiles.forEach((fileName, index) => {
          try {
            // 动态构建require路径
            const articleModule = require(`../../data/textData/${fileName}`);
            // 检查导出方式，支持多种导出格式
            if (articleModule.fishingData) {
              articleData.push(articleModule.fishingData);
            } else if (articleModule.default) {
              articleData.push(articleModule.default);
            } else {
              articleData.push(articleModule);
            }
            console.log(`成功加载文章: ${fileName}`);
          } catch (e) {
            console.error(`加载${fileName}失败:`, e);
          }
        });
      } catch (e) {
        console.error('读取文章目录失败:', e);
      }
      
      // 如果没有加载到任何文章，使用默认数据
      if (articleData.length === 0) {
        // 文章1数据
        const article1 = {
          "title": "春季路亚鲈鱼技巧与找鱼方式全解析",
          "author": "李华",
          "publishDate": "2024-02-15",
          "content": "",
          "children": [
            {
              "title": "引言",
              "content": "春季是路亚鲈鱼的黄金季节，尤其是对于淡水鲈鱼（大口鲈、大口黑鲈）来说，这一时期鲈鱼的活性高，觅食积极，是钓获大鱼的最佳时机。本报告将全面分析春季路亚鲈鱼的技巧和找鱼方式，帮助钓友在春季钓鲈鱼时取得更好的成绩。",
              "children": []
            }
          ]
        };
        articleData.push(article1);
      }
      
      // 处理文章数据
      const articles = articleData.map((fishingData, index) => {
        // 检查文章格式，适配新旧两种格式
        if (fishingData.content !== undefined) {
          // 新格式使用 content 属性
          return {
            id: index + 1,
            meta: {
              title: fishingData.title || "无标题",
              author: fishingData.author || "未知作者",
              publishDate: fishingData.publishDate || "未知日期"
            },
            text: fishingData.content, // 将 content 映射到 text
            children: fishingData.children || [],
            previewText: fishingData.children && fishingData.children.length > 0 ? 
                        fishingData.children[0].content.substring(0, 50) + '...' : ''
          };
        } else if (fishingData.text !== undefined) {
          // 旧格式使用 text 属性
          return {
            id: index + 1,
            meta: {
              title: fishingData.title || "无标题",
              author: fishingData.author || "未知作者",
              publishDate: fishingData.publishDate || "未知日期"
            },
            text: fishingData.text,
            children: fishingData.children || [],
            previewText: fishingData.text.substring(0, 50) + '...'
          };
        } else {
          // 如果两种属性都不存在，提供默认值
          return {
            id: index + 1,
            meta: {
              title: fishingData.title || "无标题",
              author: fishingData.author || "未知作者",
              publishDate: fishingData.publishDate || "未知日期"
            },
            text: "",
            children: fishingData.children || [],
            previewText: ''
          };
        }
      });
      
      // 初始化高亮文章数据（初始状态无高亮）
      const initialHighlightedArticles = articles.map(article => ({
        id: article.id,
        titleNodes: article.meta.title,
        previewNodes: article.previewText
      }));
      
      this.setData({
        articles: articles,
        originalArticles: articles, // 保存原始文章列表
        loading: false,
        currentArticleIndex: 0,
        showNoResults: false,
        highlightedArticles: initialHighlightedArticles // 初始化高亮文章数据
      });
    } catch (error) {
      console.error("加载文章失败:", error);
      wx.showToast({
        title: '加载文章失败',
        icon: 'none'
      });
    }
  },

  // 监听搜索框输入事件
  onSearchInput: function(e) {
    const keyword = e.detail.value.trim();
    this.setData({ searchKeyword: keyword });
    
    // 防抖处理
    if (this.searchTimer) {
      clearTimeout(this.searchTimer);
    }
    
    this.searchTimer = setTimeout(() => {
      this.filterArticles(keyword);
    }, 300);
  },
  
  // 搜索按钮点击事件
  onSearch: function() {
    this.filterArticles(this.data.searchKeyword);
  },
  
  // 高亮文本处理函数
  highlightText: function(text, keyword) {
    if (!keyword || !text) return text;
    
    // 检查关键词是否存在于文本中（不区分大小写）
    const lowerText = text.toLowerCase();
    const lowerKeyword = keyword.toLowerCase();
    if (!lowerText.includes(lowerKeyword)) return text;
    
    try {
      // 创建安全的HTML字符串
      let result = '';
      let lastIndex = 0;
      const regex = new RegExp(keyword, 'gi');
      let match;
      
      // 使用正则表达式的exec方法逐个查找匹配项
      while ((match = regex.exec(text)) !== null) {
        // 添加匹配前的文本
        result += text.substring(lastIndex, match.index);
        // 添加带高亮的匹配文本
        result += `<span style="color:#1E3A8A;font-weight:bold;">${match[0]}</span>`;
        // 更新lastIndex
        lastIndex = match.index + match[0].length;
      }
      
      // 添加最后一个匹配后的文本
      result += text.substring(lastIndex);
      return result;
    } catch (e) {
      console.error('高亮处理出错:', e);
      return text; // 出错时返回原始文本
    }
  },
  
  // 过滤文章
  filterArticles: function(keyword) {
    const { articles } = this.data;
    
    if (!this.data.originalArticles || this.data.originalArticles.length === 0) {
      // 首次搜索时保存原始文章列表
      this.setData({ originalArticles: articles });
    }
    
    if (!keyword) {
      // 搜索关键词为空，显示所有文章
      this.setData({
        articles: this.data.originalArticles,
        highlightedArticles: this.data.originalArticles.map(article => ({
          id: article.id,
          titleNodes: article.meta.title,
          previewNodes: article.previewText
        })),
        showNoResults: false
      });
      return;
    }
    
    // 根据关键词过滤文章
    const filteredArticles = this.data.originalArticles.filter(article => {
      // 在标题、作者、内容中搜索关键词
      return (
        article.meta.title.toLowerCase().includes(keyword.toLowerCase()) ||
        article.meta.author.toLowerCase().includes(keyword.toLowerCase()) ||
        article.previewText.toLowerCase().includes(keyword.toLowerCase()) ||
        (article.text && article.text.toLowerCase().includes(keyword.toLowerCase()))
      );
    });
    
    // 处理高亮显示
    const highlightedArticles = filteredArticles.map(article => ({
      id: article.id,
      titleNodes: this.highlightText(article.meta.title, keyword),
      previewNodes: this.highlightText(article.previewText, keyword)
    }));
    
    // 更新数据
    this.setData({
      articles: filteredArticles,
      highlightedArticles: highlightedArticles,
      showNoResults: filteredArticles.length === 0
    });
  },
  
  // 跳转到文章详情页
  navigateToArticleDetail: function(e) {
    const articleId = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: `/pages/articleDetail/articleDetail?articleId=${articleId}`
    });
  },

  // 导航到主页
  navigateToHome: function() {
    wx.switchTab({
      url: '/pages/home/home'
    });
  }
});