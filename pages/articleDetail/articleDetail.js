// pages/articleDetail/articleDetail.js
Page({
  data: {
    article: null,
    loading: true,
    articleId: null
  },

  onLoad: function(options) {
    // 获取文章ID
    if (options.articleId) {
      const articleId = parseInt(options.articleId);
      this.setData({
        articleId: articleId
      });
      this.loadArticleDetail(articleId);
    } else {
      wx.showToast({
        title: '无效的文章ID',
        icon: 'none'
      });
      setTimeout(() => {
        wx.navigateBack();
      }, 1500);
    }
  },

  // 加载文章详情
  loadArticleDetail: function(articleId) {
    try {
      // 动态加载文章数据
      const articleFiles = [];
      
      // 尝试加载所有可能的文章文件
      let article = null;
      
      // 使用文件系统API读取目录下的所有文件
      const fs = wx.getFileSystemManager();
      // 读取data/textData目录下的所有文件
      const fileList = fs.readdirSync('data/textData');
      // 过滤出所有js文件
      const articleFileNames = fileList.filter(file => file.endsWith('.js'));
      
      // 遍历所有文章文件并尝试加载
      articleFileNames.forEach((fileName, index) => {
        try {
          // 动态构建require路径
          const articleModule = require(`../../data/textData/${fileName}`);
          // 检查导出方式，支持多种导出格式
          let articleData;
          if (articleModule.fishingData) {
            articleData = articleModule.fishingData;
          } else if (articleModule.default) {
            articleData = articleModule.default;
          } else {
            articleData = articleModule;
          }
          
          // 将文章添加到列表中
          const currentId = index + 1;
          articleFiles.push({id: currentId, data: articleData});
          
          // 如果ID匹配，设置为当前文章
          if (currentId === articleId) {
            article = articleData;
          }
        } catch (e) {
          console.error(`加载${fileName}失败:`, e);
        }
      });
      
      // 如果没有直接匹配到文章ID，则从加载的文章列表中查找
      if (!article && articleFiles.length > 0) {
        const foundArticle = articleFiles.find(item => item.id === articleId);
        if (foundArticle) {
          article = foundArticle.data;
        }
      }
      
      if (article) {
        // 处理文章数据，转换为适合在详情页显示的格式
        const processedArticle = this.processArticleData(article);
        
        this.setData({
          article: processedArticle,
          loading: false
        });
      } else {
        wx.showToast({
          title: '文章不存在',
          icon: 'none'
        });
        setTimeout(() => {
          wx.navigateBack();
        }, 1500);
      }
    } catch (error) {
      console.error('加载文章详情失败:', error);
      wx.showToast({
        title: '加载文章失败',
        icon: 'none'
      });
      setTimeout(() => {
        wx.navigateBack();
      }, 1500);
    }
  },

  // 导航到主页
  navigateToHome: function() {
    wx.switchTab({
      url: '/pages/home/home'
    });
  },

  // 返回上一页
  navigateBack: function() {
    wx.navigateBack();
  },
  
  // 处理文章数据，转换为适合在详情页显示的格式
  processArticleData: function(rawArticle) {
    // 创建一个新的文章对象，包含meta信息
    const processedArticle = {
      meta: {
        title: rawArticle.title || "无标题",
        author: rawArticle.author || "未知作者",
        publishDate: rawArticle.publishDate || "未知日期"
      },
      introduction: {
        title: "引言",
        text: ""
      },
      // 保留原始的content字段
      content: rawArticle.content || rawArticle.text || "",
      // 保留原始的children结构
      children: rawArticle.children || [],
      chapters: []
    };
    
    // 处理文章内容
    if (rawArticle.children && rawArticle.children.length > 0) {
      // 第一个子节点通常是引言
      const intro = rawArticle.children[0];
      if (intro) {
        processedArticle.introduction = {
          title: intro.title || "引言",
          text: intro.content || ""
        };
      }
      
      // 处理其余章节
      for (let i = 1; i < rawArticle.children.length; i++) {
        const chapter = rawArticle.children[i];
        if (!chapter) continue;
        
        const processedChapter = {
          title: chapter.title || `章节 ${i}`,
          sections: []
        };
        
        // 如果章节有直接内容
        if (chapter.content && chapter.content.trim() !== "") {
          processedChapter.sections.push({
            subtitle: "",
            content: [{ type: "text", value: chapter.content }]
          });
        }
        
        // 处理章节的子节点
        if (chapter.children && chapter.children.length > 0) {
          chapter.children.forEach(section => {
            if (section) {
              processedChapter.sections.push({
                subtitle: section.title || "",
                content: [{ type: "text", value: section.content || "" }]
              });
            }
          });
        }
        
        // 只有当章节有内容或子节点时才添加到章节列表
        if (processedChapter.sections.length > 0) {
          processedArticle.chapters.push(processedChapter);
        }
      }
    } else {
      // 处理没有children结构的文章
      // 如果文章有content字段，将其作为引言
      if (rawArticle.content && rawArticle.content.trim() !== "") {
        processedArticle.introduction = {
          title: "引言",
          text: rawArticle.content
        };
      } 
      // 如果文章有text字段（旧格式），将其作为引言
      else if (rawArticle.text && rawArticle.text.trim() !== "") {
        processedArticle.introduction = {
          title: "引言",
          text: rawArticle.text
        };
      }
      
      // 创建一个默认章节，确保页面有内容显示
      if (!processedArticle.introduction.text && !processedArticle.content) {
        processedArticle.chapters.push({
          title: "内容",
          sections: [{
            subtitle: "",
            content: [{ type: "text", value: "暂无内容" }]
          }]
        });
      }
    }
    
    return processedArticle;
  }
});