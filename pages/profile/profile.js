// pages/profile/profile.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        isUpdateLogOpen: false, // 控制更新日志的展开/折叠状态
        achievementScore: 0,    // 成就分数
        unlockedAchievements: 0 // 已解锁成就数量
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {

    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady() {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow() {
        // 获取全局数据
        const app = getApp()
        const achievementScore = app.globalData.achievementScore || 0
        const unlockedAchievements = Object.keys(app.globalData.userAchievements || {}).length
        
        // 更新页面数据
        this.setData({
            achievementScore: achievementScore,
            unlockedAchievements: unlockedAchievements
        })
    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide() {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload() {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh() {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom() {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage() {

    },
    
    /**
     * 切换更新日志的展开/折叠状态
     */
    toggleUpdateLog() {
        this.setData({
            isUpdateLogOpen: !this.data.isUpdateLogOpen
        });
    },
    
    /**
     * 导航到设置页面
     */
    navigateToSettings() {
        wx.navigateTo({
            url: '/pages/settings/settings'
        });
    },
    
    /**
     * 导航到收藏页面
     */
    navigateToFavorites() {
        wx.navigateTo({
            url: '/pages/favorites/favorites'
        });
    },
    
    /**
     * 导航到反馈页面
     */
    navigateToFeedback() {
        wx.navigateTo({
            url: '/pages/feedback/feedback'
        });
    }
})