一、实现效果
搜索框输入文字：实时过滤文章列表，只显示标题或内容包含关键词的文章。

清空搜索框：自动恢复显示全部文章。

无匹配结果：显示提示文本“没有相关文章”。

二、完整代码实现
1. WXML 结构 (articlePage.wxml)
html
复制
<!-- 搜索框 -->
<view class="search-box">
  <input 
    placeholder="输入关键词搜索" 
    value="{{searchKeyword}}" 
    bindinput="onSearchInput" 
    class="search-input"
  />
</view>

<!-- 文章列表 -->
<view class="article-list">
  <block wx:if="{{filteredArticles.length > 0}}">
    <view 
      wx:for="{{filteredArticles}}" 
      wx:key="id" 
      class="article-item" 
      bindtap="onArticleTap" 
      data-id="{{item.id}}"
    >
      <text class="title">{{item.title}}</text>
      <text class="content">{{item.content}}</text>
    </view>
  </block>

  <!-- 无搜索结果提示 -->
  <view wx:if="{{showNoResults}}" class="no-results">
    <text>没有相关文章</text>
  </view>
</view>
运行 HTML
2. WXSS 样式 (articlePage.wxss)
css
复制
/* 搜索框样式 */
.search-box {
  padding: 20rpx;
  background: #f5f5f5;
}
.search-input {
  background: white;
  padding: 15rpx 20rpx;
  border-radius: 8rpx;
}

/* 文章列表样式 */
.article-list {
  padding: 20rpx;
}
.article-item {
  margin-bottom: 20rpx;
  padding: 20rpx;
  background: white;
  border-radius: 8rpx;
}
.title {
  font-weight: bold;
  margin-bottom: 10rpx;
}
.content {
  color: #666;
}

/* 无结果提示 */
.no-results {
  text-align: center;
  padding: 40rpx;
  color: #999;
}
3. JS 逻辑 (articlePage.js)
javascript
复制
Page({
  data: {
    originalArticles: [],    // 原始文章数据
    filteredArticles: [],     // 过滤后的文章数据
    searchKeyword: "",        // 搜索关键词
    showNoResults: false      // 是否显示“无结果”提示
  },

  onLoad() {
    // 模拟初始数据加载（实际替换为网络请求）
    const articles = [
      { id: 1, title: "小程序开发指南", content: "学习小程序的基础用法" },
      { id: 2, title: "JavaScript教程", content: "掌握JS核心语法" },
      { id: 3, title: "前端框架对比", content: "Vue vs React vs Angular" }
    ];
    this.setData({ 
      originalArticles: articles,
      filteredArticles: articles 
    });
  },

  // 监听搜索框输入事件
  onSearchInput(e) {
    const keyword = e.detail.value.trim().toLowerCase();
    this.setData({ searchKeyword: keyword });
    this.filterArticles(keyword);
  },

  // 过滤文章
  filterArticles(keyword) {
    const { originalArticles } = this.data;
    let filtered = [];

    if (keyword === "") {
      // 清空搜索时恢复全部数据
      filtered = originalArticles;
    } else {
      // 根据关键词过滤（同时匹配标题和内容）
      filtered = originalArticles.filter(item => {
        return (
          item.title.toLowerCase().includes(keyword) ||
          item.content.toLowerCase().includes(keyword)
        );
      });
    }

    // 更新数据和提示状态
    this.setData({ 
      filteredArticles: filtered,
      showNoResults: filtered.length === 0 && keyword !== ""
    });
  },

  // 点击文章跳转详情
  onArticleTap(e) {
    const id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: `/pages/articleDetail/articleDetail?id=${id}`
    });
  }
});
三、关键逻辑说明
1. 数据管理
originalArticles：保存从服务器获取的原始文章数据，避免重复请求。

filteredArticles：动态存储过滤后的文章列表，用于页面渲染。

searchKeyword：实时绑定搜索框输入内容。

2. 搜索触发机制
bindinput 事件：通过 bindinput 监听输入框内容变化，触发 onSearchInput 方法。

过滤逻辑：将关键词和文章标题/内容转为小写后，用 includes 进行模糊匹配。

3. 无结果提示
条件渲染：当 filteredArticles 为空且 searchKeyword 不为空时，显示“没有相关文章”。

四、优化与扩展
防抖处理（优化性能）：

javascript
复制
// 在 JS 中定义防抖函数
let timer = null;
onSearchInput(e) {
  const keyword = e.detail.value.trim().toLowerCase();
  this.setData({ searchKeyword: keyword });

  // 防抖：300ms内无新输入才触发搜索
  clearTimeout(timer);
  timer = setTimeout(() => {
    this.filterArticles(keyword);
  }, 300);
}
高亮关键词（扩展功能）：

html
复制
<!-- 在 WXML 中使用正则替换 -->
<text class="title">
  <rich-text nodes="{{item.title.replace(new RegExp(searchKeyword, 'gi'), '<span style=\"color:red;\">$&</span>')}}"></rich-text>
</text>
运行 HTML