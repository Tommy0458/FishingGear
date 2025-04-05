const fishingKeywords = [
    // 基础关键词
    // '钓鱼', '垂钓', '路亚', '海钓', '野钓', '台钓', '冰钓', '筏钓', '矶钓',
    // '夜钓', '船钓', '溪流钓', '竞技钓', '传统钓', '飞蝇钓', '抛竿',
    
    // // 装备类
    // '鱼竿', '钓竿', '鱼线', '鱼钩', '鱼漂', '浮漂', '鱼护', '抄网',
    // '钓箱', '钓椅', '鱼饵', '饵料', '窝料', '假饵', '亮片', '软饵',
    // '硬饵', '纺车轮', '水滴轮', '前打轮', '钓具', '钓组',
  
    // // 鱼类名称
    // '鲫鱼', '鲤鱼', '草鱼', '青鱼', '鲢鳙', '黑鱼', '鲈鱼', '鳜鱼',
    // '罗非', '翘嘴', '黄颡鱼', '鲶鱼', '红鲌', '鳊鱼', '马口', '白条',
    // '金枪鱼', '石斑', '带鱼', '秋刀鱼', '鳟鱼', '鲑鱼',
  
    // // 场景/地点
    // '水库', '湖泊', '江河', '黑坑', '鱼塘', '海岸', '礁石', '码头',
    // '河流', '溪流', '湿地', '人工湖', '自然水域',
  
    // // 技术/活动
    // '调漂', '打窝', '开饵', '溜鱼', '爆护', '空军', '连竿', '切线',
    // '钓法', '钓技', '钓点', '钓位', '钓获', '放流', '渔获', '垂钓大赛',
    // '钓鱼比赛', '钓鱼人', '垂钓俱乐部',
  
    // // 生态相关
    // '渔业资源', '禁渔期', '生态保护', '增殖放流', '鱼类保护',
    // '海洋资源', '淡水生态', '鱼类图鉴', '鱼种识别', '水产资源'
  ];
// pages/news/news.js
Page({
    data: {
      newsData: [],          // 原始数据
      filteredNews: [],      // 筛选后数据
      displayedNews: [],     // 当前显示数据
      displayCount: 10,      // 默认显示数量
      hasMoreNews: false,    // 是否有更多数据
      weatherInfo: null,     // 天气信息
      lastUpdate: ''         // 新增：数据更新时间
    },
  
    onLoad(options) {
      this.fetchHotNews();
      this.fetchWeatherData();
    },
  
    // 获取热搜数据（使用聚合数据新闻头条API）
    fetchHotNews() {
      wx.showLoading({ title: '加载中' });
  
      wx.request({
        url: 'https://v.juhe.cn/toutiao/index',
        method: 'GET',
        data: { 
          key: 'a81f80231237461e168c2e3f7e1a735d',
          type: 'top',
          page: 1,
          page_size: 30,
          is_filter: 1 // 只返回有内容详情的新闻
        },
        success: (res) => {
          if (res.data?.error_code === 0 && res.data?.result?.data) {
            const newsItems = res.data.result.data || [];
            
            // ------------------ 核心过滤逻辑 ------------------
            // 使用已定义的钓鱼关键词列表进行过滤
            const fishingPattern = new RegExp(fishingKeywords.join('|'), 'i');
            
            // 检查标题和分类
            const filteredNews = newsItems.filter(item => {
              return fishingPattern.test(item.title) || 
                     fishingPattern.test(item.category || '');
            });
            
            // 格式化数据以适应现有的UI结构
            const formattedNews = filteredNews.map(item => ({
              ID: item.uniquekey,
              title: item.title,
              sitename: item.author_name,
              url: item.url,
              thumbnail: item.thumbnail_pic_s,
              extra: item.date, // 使用日期作为额外信息
              views: item.category // 使用分类作为浏览量
            }));
            // ------------------------------------------------
  
            this.setData({ 
              newsData: formattedNews,
              filteredNews: formattedNews,
              lastUpdate: new Date().toLocaleTimeString() // 更新时间
            }, () => this.updateDisplayedNews());
  
            // 调试日志
            console.log('垂钓相关新闻:', formattedNews.map(n => n.title)); 
          } else {
            wx.showToast({ title: '数据接口异常: ' + (res.data?.reason || '未知错误'), icon: 'none' });
            console.error('API错误:', res.data);
          }
        },
        fail: (err) => {
          console.error('请求失败:', err);
          // 显示更详细的错误信息
          let errorMsg = '服务不可用';
          if (err.errMsg) {
            errorMsg = err.errMsg;
            // 检查是否是网络请求相关错误
            if (err.errMsg.includes('request:fail')) {
              console.error('网络请求错误详情:', JSON.stringify(err));
            }
          }
          wx.showToast({ title: errorMsg, icon: 'none', duration: 3000 });
        },
        complete: () => wx.hideLoading()
      });
    },
  

    /**
     * 获取天气数据
     */
    fetchWeatherData() {
        // 默认使用北京的adcode
        const adcode = 110101; // 北京市东城区

        wx.request({
            url: 'https://luckycola.com.cn/weather/getWeather',
            method: 'POST',
            data: {
                adcode: adcode,
                appKey: 'Nl38NONMSfcZnN1742368605395v91mURwnM1',
                uid: '22kgiu1742368605395gQ0mgBTQLl',
                weatherType: 'base'
            },
            success: (res) => {
                if (res.data && res.data.code === 0 && res.data.data.lives && res.data.data.lives.length > 0) {
                    // 格式化日期显示
                    const weatherData = res.data.data.lives[0];
                    
                    // 如果需要格式化reporttime，可以在这里处理
                    // 例如：将 2023-04-15 12:30:45 格式化为 04-15 12:30
                    
                    this.setData({
                        weatherInfo: weatherData
                    });
                }
            },
            fail: (err) => {
                console.error('获取天气失败:', err);
            }
        });
    },

    /**
     * 根据分类筛选新闻
     */
    filterNewsByCategory() {
        const { newsData, currentCategory } = this.data;
        let filtered = [];
        
        if (currentCategory === '全部') {
            filtered = [...newsData];
        } else {
            filtered = newsData.filter(item => {
                const title = item.title.toLowerCase();
                return title.includes(currentCategory.toLowerCase());
            });
        }
        
        this.setData({
            filteredNews: filtered
        }, () => {
            this.updateDisplayedNews();
        });
    },

    /**
     * 更新显示的新闻列表
     */
    updateDisplayedNews() {
        const { filteredNews, displayCount } = this.data;
        const displayed = filteredNews.slice(0, displayCount);
        const hasMore = filteredNews.length > displayCount && filteredNews.length > 10;
        
        this.setData({
            displayedNews: displayed,
            hasMoreNews: hasMore
        });
    },

    /**
     * 导航到主页
     */
    navigateToHome() {
        wx.switchTab({
            url: '/pages/home/home'
        });
    },

    /**
     * 切换分类
     */
    switchCategory(e) {
        const category = e.currentTarget.dataset.category;
        this.setData({
            currentCategory: category,
            displayCount: 10 // 切换分类时重置显示数量
        }, () => {
            this.filterNewsByCategory();
        });
    },

    /**
     * 加载更多新闻
     */
    loadMoreNews() {
        const { displayCount, filteredNews } = this.data;
        const newDisplayCount = displayCount + 10;
        
        this.setData({
            displayCount: newDisplayCount
        }, () => {
            this.updateDisplayedNews();
        });
    },

    /**
     * 查看新闻详情
     */
    viewNewsDetail(e) {
        const newsItem = e.currentTarget.dataset.news;
        // 使用web-view打开新闻链接
        wx.navigateTo({
            url: `/pages/webview/webview?url=${encodeURIComponent(newsItem.url)}&title=${encodeURIComponent(newsItem.title)}`
        });
    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh() {
        this.fetchHotNews();
        this.fetchWeatherData();
        wx.stopPullDownRefresh();
    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage() {
        return {
            title: '钓鱼热搜榜 - 了解最新钓鱼资讯',
            path: '/pages/news/news'
        };
    }
})