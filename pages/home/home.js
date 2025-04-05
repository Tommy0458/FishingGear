Page({
    data: {
        showPrompt: true,
        searchQuery: "",
        showTips: false,
        tipsText: "",
        weatherModalVisible: false,
        weatherCityName: "",
        weatherData: {},
        weatherPressure: "",
        weatherSunsetTime: "",
        // 成就弹窗相关数据
        achievementPopupVisible: false,
        currentAchievement: null,
        // 背景渐变样式
        containerStyle: "linear-gradient(to bottom, #1E3A8A 0%, #4169E1 50%, #ffffff 100%)",
        // 标题样式
        welcomeCardStyle: "linear-gradient(135deg, #1E3A8A, #4169E1)",
        welcomeTextColor: "white",
        sectionTitleStyle: {}
        
    },
    onLoad() {
        // 检查是否首次访问
        const hasClosed = wx.getStorageSync('hasClosedPrompt')
        if (hasClosed) {
          this.setData({ showPrompt: false })
        } else {
          // 设置3秒自动关闭
          this.autoCloseTimer = setTimeout(() => {
            this.closePrompt()
          }, 3000)
        }
      },
    closePrompt() {
        clearTimeout(this.autoCloseTimer)
        this.setData({ showPrompt: false })
        wx.setStorageSync('hasClosedPrompt', true)
    },
    
    // 触摸移动事件处理，阻止默认行为，防止出现半透明"划块"
    touchMove(e) {
        e.preventDefault && e.preventDefault();
        return false;
    },
    // 搜索相关功能
    onSearchInput(e) {
        this.setData({ searchQuery: e.detail.value });
    },

    onSearch() {
        console.log("搜索内容：", this.data.searchQuery);
        // 这里可以调用搜索功能或跳转到搜索结果页面
    },

    // 测试页面导航
    goToTest1() {
        // 跳转到第一个测试（钓鱼人格精密分析）
        const testData = require('../../data/testDataNew');
        // 确保使用id为1的测试数据
        wx.setStorageSync('selectedTest', testData.personalityTest);
        wx.navigateTo({ url: "/pages/test/test?id=1" });
    },

    goToTest2() {
        // 跳转到第二个测试（钓鱼应急能力测试）
        const testData = require('../../data/testDataNew');
        // 确保使用id为2的测试数据
        wx.setStorageSync('selectedTest', testData.emergencyTest);
        wx.navigateTo({ url: "/pages/test/test?id=2" });
    },
    
    goToRandomTest() {
        // 防止连续点击
        if (this.isRandomSelecting) {
            return;
        }
        this.isRandomSelecting = true;
        
        // 随机选择一个测试
        const testData = require('../../data/testDataNew');
        const testKeys = [];
        
        // 添加随机效果动画
        const randomBtn = this.selectComponent('.random-test-btn');
        if (randomBtn) {
            // 如果能直接获取到组件，添加动画效果
            // 微信小程序中这种方式可能不适用，所以添加备选方案
        }
        
        // 显示随机中的提示
        this.setData({
            showTips: true,
            tipsText: "随机选择中..."  
        });
        
        // 收集所有有效的测试数据
        for (const key in testData) {
            if (testData.hasOwnProperty(key) && typeof testData[key] === 'object' && testData[key].id && testData[key].title) {
                testKeys.push(key);
            }
        }
        
        // 随机选择一个测试，添加延迟增强随机感
        if (testKeys.length > 0) {
            setTimeout(() => {
                // 隐藏提示
                this.setData({ showTips: false });
                // 重置标志，允许再次点击
                this.isRandomSelecting = false;
                
                const randomIndex = Math.floor(Math.random() * testKeys.length);
                const randomKey = testKeys[randomIndex];
                const randomTest = testData[randomKey];
                
                console.log(`随机选择了测试: ${randomTest.title} (ID: ${randomTest.id})`);
                wx.setStorageSync('selectedTest', randomTest);
                wx.navigateTo({ url: `/pages/test/test?id=${randomTest.id}` });
            }, 800); // 延迟800毫秒，增强随机感
        }
    },
    
    goToAllTests() {
        // 跳转到所有测试列表页面
        wx.navigateTo({ url: "/pages/test/test-list" });
    },

    // 齿轮测试页面导航
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
    },

    // 设备页面导航
    goToEquipment() {
        wx.navigateTo({ url: "/pages/equipment/equipment" });
    },

    // 天气功能
    checkWeather() {
        // 检查并解锁首次使用天气功能的成就
        this.checkFeatureAchievement('checkWeather');
        
        wx.getSetting({
            success: (res) => {
                if (res.authSetting['scope.userLocation']) {
                    this.doGetLocation();
                } else {
                    this.requestLocationAuth();
                }
            },
            fail: () => this.showError('权限检查失败')
        });
    },
    requestLocationAuth() {
        wx.showModal({
            title: '权限申请',
            content: '需要您的位置权限以提供精准天气服务',
            success: (res) => {
                if (res.confirm) {
                    wx.authorize({
                        scope: 'scope.userLocation',
                        success: () => this.doGetLocation(),
                        fail: () => this.handleLocationError({ errMsg: 'auth deny' })
                    });
                }
            }
        });
    },

    doGetLocation() {
        wx.showLoading({ title: '定位中...' });
        wx.getLocation({
            type: 'gcj02',
            success: (locRes) => {
                console.log('[定位成功]', locRes);
                this.fetchWeatherByCoord(locRes.longitude, locRes.latitude);
            },
            fail: (err) => {
                wx.hideLoading();
                this.handleLocationError(err);
            }
        });
    },
    // 处理定位失败
    handleLocationError(err) {
        console.error('定位失败:', err);
        let msg = '获取位置失败，请检查是否开启定位权限';

        if (err.errMsg.includes('auth deny')) {
            msg = '需要位置权限获取当地天气，点击确定前往设置';
            wx.showModal({
                title: '权限提示',
                content: msg,
                success: (res) => {
                    if (res.confirm) {
                        wx.openSetting(); // 跳转权限设置页
                    }
                }
            });
        } else {
            wx.showToast({ title: msg, icon: 'none' });
        }
    },

    // 根据坐标获取天气
    fetchWeatherByCoord(lng, lat) {
        const key = '12ac567f073843fc9e1ea417883ce8e5'; // 替换为你的和风天气Key
        const location = `${lng},${lat}`;
        wx.request({
            url: 'https://geoapi.qweather.com/v2/city/lookup',
            data: { location: location, key: key },
            success: (geoRes) => {
                if (geoRes.data.code === '200' && geoRes.data.location?.length > 0) {
                    const cityInfo = geoRes.data.location[0];
                    this.fetchWeatherData(cityInfo.id, cityInfo.name);
                } else {
                    this.showError('定位失败：未找到匹配城市');
                }
            },
            fail: (err) => this.showError('城市查询服务异常')
        });
    },

    // 获取实时天气数据
    fetchWeatherData(cityId, cityName) {
        const key = '12ac567f073843fc9e1ea417883ce8e5';

        // 获取实时天气数据
        wx.request({
            url: 'https://devapi.qweather.com/v7/weather/now',
            data: { location: cityId, key: key },
            success: (res) => {
                if (res.data.code === '200') {
                    // 获取日出日落数据
                    this.fetchSunData(cityId, cityName, res.data.now);
                } else {
                    wx.hideLoading();
                    this.showError(`天气获取失败：${res.data.code}`);
                }
            },
            fail: (err) => {
                wx.hideLoading();
                this.showError('天气服务请求超时');
            }
        });
    },

    // 获取日出日落数据
    fetchSunData(cityId, cityName, weatherData) {
        const key = '12ac567f073843fc9e1ea417883ce8e5';

        wx.request({
            url: 'https://devapi.qweather.com/v7/astronomy/sun',
            data: {
                location: cityId,
                key: key,
                date: new Date().toISOString().split('T')[0].replace(/-/g, '') // 当前日期，格式：yyyyMMdd
            },
            success: (res) => {
                wx.hideLoading();
                if (res.data.code === '200') {
                    // 显示天气弹窗，包含日落时间
                    const sunsetTime = res.data.sunset || '未知';
                    this.showWeatherModal(cityName, weatherData, weatherData.pressure || '未知', sunsetTime);
                } else {
                    // 如果获取日出日落失败，仍然显示天气信息
                    this.showWeatherModal(cityName, weatherData, weatherData.pressure || '未知', '未知');
                }
            },
            fail: (err) => {
                // 如果获取日出日落失败，仍然显示天气信息
                wx.hideLoading();
                this.showWeatherModal(cityName, weatherData, weatherData.pressure || '未知', '未知');
            }
        });
    },

    // 显示天气弹窗
    showWeatherModal(cityName, weatherData, pressure, sunsetTime) {
        // 使用自定义弹窗组件显示天气信息
        this.setData({
            weatherModalVisible: true,
            weatherCityName: cityName,
            weatherData: weatherData,
            weatherPressure: pressure,
            weatherSunsetTime: sunsetTime
        });
    },

    // 关闭天气弹窗
    closeWeatherModal() {
        this.setData({
            weatherModalVisible: false
        });
    },

    // 统一错误处理
    showError(msg) {
        const errorMap = {
            '204': '查询位置无结果',
            '400': '请求参数错误',
            '401': '密钥无效',
            '402': '超过访问次数',
            '403': '无访问权限'
        };

        const displayMsg = errorMap[msg] || msg;

        wx.showModal({
            title: '提示',
            content: displayMsg,
            showCancel: false
        });
    },
    
    // 检查功能使用相关成就
    checkFeatureAchievement(featureId) {
        const app = getApp();
        const { achievements } = require('../../data/achievements.js');
        
        console.log(`===== 功能使用成就检查 =====`);
        console.log(`当前使用功能: ${featureId}`);
        
        // 筛选出type:3类型的成就（首次使用特定功能）
        const featureAchievements = achievements.filter(a => a.type === 3 && a.value === featureId);
        console.log(`相关功能成就数量: ${featureAchievements.length}`);
        
        featureAchievements.forEach(achievement => {
            // 获取当前成就进度
            const achievementData = typeof app.globalData.userAchievements[achievement.id] === 'object'
                ? app.globalData.userAchievements[achievement.id]
                : { progress: 0, unlockTime: null };
            
            const current = achievementData.progress || 0;
            
            console.log(`检查成就[${achievement.id}] ${achievement.title}: 当前进度 ${current}`);
            
            // 如果成就尚未解锁，则解锁它
            if (current < 1) {
                console.log(`解锁功能使用成就: ${achievement.title}`);
                
                // 更新成就进度
                app.updateAchievementProgress(achievement.id, 1);
                
                // 获取成就数据 - 使用不同的变量名避免覆盖
                const achievementData = achievements.find(a => a.id === achievement.id);
                
                if (achievementData) {
                    // 增加成就分数
                    const oldScore = app.globalData.achievementScore || 0;
                    app.globalData.achievementScore = oldScore + achievementData.score;
                    wx.setStorageSync('achievementScore', app.globalData.achievementScore);
                    console.log(`成就分数更新: ${oldScore} -> ${app.globalData.achievementScore}`);
                    
                    // 将成就添加到待展示队列
                    if (!app.globalData.pendingAchievements) {
                        app.globalData.pendingAchievements = [];
                    }
                    app.globalData.pendingAchievements.push(achievementData);
                    wx.setStorageSync('pendingAchievements', app.globalData.pendingAchievements);
                    console.log(`成就已添加到展示队列，当前队列长度: ${app.globalData.pendingAchievements.length}`);
                }
            } else {
                console.log(`成就[${achievement.id}] ${achievement.title} 已解锁，无需更新`);
            }
        });
    },

    // 其他功能提示
    showOtherFeatures() {
        this.setData({
            showTips: true,
            tipsText: "敬请期待更多功能！"
        });

        // 1秒后自动隐藏提示
        setTimeout(() => {
            this.setData({
                showTips: false
            });
        }, 1000);
    },
    
    // 钓鱼模拟器功能
    goToFishingSimulator() {
        console.log('[钓鱼模拟器] 用户点击了钓鱼模拟器按钮');
        
        // 跳转到钓鱼模拟器欢迎页面
        wx.navigateTo({ 
            url: "/pages/fishingWelcome/fishingWelcome",
            success: (res) => {
                console.log('[钓鱼模拟器] 成功跳转到钓鱼模拟器欢迎页面', res);
            },
            fail: (err) => {
                console.error('[钓鱼模拟器] 跳转到钓鱼模拟器欢迎页面失败:', err);
                // 跳转失败时显示提示
                this.setData({
                    showTips: true,
                    tipsText: "跳转失败，请稍后再试！"
                });
                
                // 2秒后自动隐藏提示
                setTimeout(() => {
                    this.setData({
                        showTips: false
                    });
                }, 2000);
            },
            complete: () => {
                console.log('[钓鱼模拟器] 跳转操作完成');
            }
        });
    },
    
    // 成就相关方法
    onShow() {
        // 检查是否有待展示的成就
        this.checkPendingAchievements();
    },
    
    // 检查待展示的成就
    checkPendingAchievements() {
        const app = getApp();
        if (app.globalData.pendingAchievements && app.globalData.pendingAchievements.length > 0) {
            // 获取第一个待展示的成就
            const achievement = app.globalData.pendingAchievements[0];
            
            // 从队列中移除该成就
            app.globalData.pendingAchievements.shift();
            wx.setStorageSync('pendingAchievements', app.globalData.pendingAchievements);
            
            // 显示成就弹窗
            this.setData({
                currentAchievement: achievement,
                achievementPopupVisible: true
            });
        }
    },
    
    // 关闭成就弹窗
    onCloseAchievementPopup() {
        this.setData({ achievementPopupVisible: false });
        
        // 检查是否还有其他待展示的成就
        setTimeout(() => {
            this.checkPendingAchievements();
        }, 500);
    },
    
    // 查看成就详情
    onViewAchievementDetails(e) {
        this.setData({ achievementPopupVisible: false });
        
        // 获取成就信息
        const achievement = e && e.detail && e.detail.achievement ? e.detail.achievement : this.data.currentAchievement;
        
        // 跳转到成就页面并传递成就ID
        if (achievement && achievement.id) {
            wx.navigateTo({ url: `/pages/achievements/achievements?achievementId=${achievement.id}` });
        } else {
            wx.navigateTo({ url: "/pages/achievements/achievements" });
        }
    },
    // 处理轮播图点击事件
    onBannerTap(e) {
        const index = e.currentTarget.dataset.index;
        console.log('[Banner点击]', '点击了第', index, '张banner图');
        
        if (index == 0) {
            // 第一张图点击打开test-list页面
            wx.navigateTo({
                url: "/pages/test/test-list",
                success: (res) => {
                    console.log('[Banner跳转]', '成功跳转到test-list页面');
                },
                fail: (err) => {
                    console.error('[Banner跳转]', '跳转到test-list页面失败:', err);
                }
            });
        } else if (index == 1) {
            // 第二张图点击打开articlePage页面（tabBar页面使用switchTab）
            wx.switchTab({
                url: "/pages/articlePage/articlePage",
                success: (res) => {
                    console.log('[Banner跳转]', '成功跳转到articlePage页面');
                },
                fail: (err) => {
                    console.error('[Banner跳转]', '跳转到articlePage页面失败:', err);
                }
            });
        }
    },
    
    // 处理轮播图切换事件，提取主色调并设置背景渐变色
    onSwiperChange(e) {
        const index = e.detail.current;
        
        // 预设的颜色方案，避免Canvas API兼容性问题
        const colorSchemes = [
            { dark: '#1E3A8A', light: '#4169E1' }, // 第一张图的颜色方案
            { dark: '#8B4513', light: '#D2691E' }, // 第二张图的颜色方案
            { dark: '#006400', light: '#32CD32' }, // 第三张图的颜色方案
            { dark: '#191970', light: '#4682B4' }  // 第四张图的颜色方案
        ];
        
        // 使用预设的颜色方案
        const scheme = colorSchemes[index] || colorSchemes[0]; // 如果找不到对应的颜色方案，使用默认方案
        
        // 生成渐变样式
        const gradientStyle = `linear-gradient(to bottom, ${scheme.dark} 0%, ${scheme.light} 20%, #ffffff 40%)`;
        
        // 生成欢迎卡片渐变样式
        const welcomeCardStyle = `linear-gradient(135deg, ${scheme.dark}, ${scheme.light})`;
        
        // 判断颜色亮度，决定文字颜色
        // 简单的亮度计算公式：(R*299 + G*587 + B*114) / 1000
        const getColorBrightness = (hex) => {
            // 移除#号并转换为RGB
            const r = parseInt(hex.slice(1, 3), 16);
            const g = parseInt(hex.slice(3, 5), 16);
            const b = parseInt(hex.slice(5, 7), 16);
            return (r * 299 + g * 587 + b * 114) / 1000;
        };
        
        // 计算主色调亮度
        const brightness = getColorBrightness(scheme.light);
        // 亮度阈值，低于此值使用白色文字，高于此值使用黑色文字
        const textColor = brightness < 128 ? 'white' : 'black';
        
        // 设置各部分标题颜色
        const sectionTitleStyle = {
            testTitle: scheme.dark,
            gearTitle: scheme.dark,
            featuresTitle: scheme.dark
        };
        
        // 设置页面背景样式和标题样式
        this.setData({
            containerStyle: gradientStyle,
            welcomeCardStyle: welcomeCardStyle,
            welcomeTextColor: textColor,
            sectionTitleStyle: sectionTitleStyle
        });
        
        // 获取导航栏组件实例并更新其背景色和文字颜色
        const navigationBar = this.selectComponent('#navigation-bar');
        if (navigationBar) {
            // 计算导航栏背景色的亮度，决定文字颜色
            const navBgBrightness = getColorBrightness(scheme.dark);
            const navTextColor = navBgBrightness < 128 ? 'white' : 'black';
            
            // 使用banner的主色调作为导航栏背景色，并根据亮度设置文字颜色
            navigationBar.setData({
                background: scheme.dark,
                color: navTextColor
            });
        }
    }
    


});
