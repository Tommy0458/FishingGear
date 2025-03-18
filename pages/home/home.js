Page({
    data: {
        searchQuery: ""
    },
    onSearchInput(e) {
        this.setData({ searchQuery: e.detail.value });
    },
    onSearch() {
        console.log("搜索内容：", this.data.searchQuery);
        // 这里可以调用搜索功能或跳转到搜索结果页面
    },
    goToTest1() {
        wx.navigateTo({ url: "/pages/test/test1" });
    },
    goToTest2() {
        wx.navigateTo({ url: "/pages/test/test2" });
    },
    goToTest3() {
        wx.navigateTo({ url: "/pages/test/test3" });
    },
    goToTest4() {
        wx.navigateTo({ url: "/pages/test/test4" });
    },
    goToTest5() {
        wx.navigateTo({ url: "/pages/test/test5" });
    },
    goToGearTest1() {
        wx.navigateTo({ url: "/pages/gearTest/test1" });
    },
    goToGearTest2() {
        wx.navigateTo({ url: "/pages/gearTest/test2" });
    },
    goToGearTest3() {
        wx.navigateTo({ url: "/pages/gearTest/test3" });
    },
    goToGearTest4() {
        wx.navigateTo({ url: "/pages/gearTest/test4" });
    },
    goToGearTest5() {
        wx.navigateTo({ url: "/pages/gearTest/test5" });
    }
});
