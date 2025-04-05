const personalityTest = {
    id: 1,
    title: "钓鱼人性格测试",
    questions: [
        {
            id: 1,
            text: "到达新钓点后，你首先会？",
            options: [
                { text: "观察水面波纹和风向", resultKey: ["analyst", "detail"], icon: "🌊" },
                { text: "直接抛竿试手感", resultKey: ["action", "intuition"], icon: "🎣" },
                { text: "拍照发朋友圈", resultKey: ["social", "creative"], icon: "📸" }
            ]
        },
        {
            id: 2,
            text: "遇到连续空竿时，你会？",
            options: [
                { text: "分析水文数据调整策略", resultKey: ["analyst", "scientific"], icon: "📊" },
                { text: "更换玄学配色拟饵", resultKey: ["lucky", "experimental"], icon: "🌈" },
                { text: "换个钓点重新开始", resultKey: ["flexible", "adaptive"], icon: "📍" }
            ]
        },
        {
            id: 3,
            text: "你喜欢什么类型的钓鱼装备？",
            options: [
                { text: "高科技电子装备", resultKey: ["analyst", "modern"], icon: "📡" },
                { text: "经典传统钓具", resultKey: ["nostalgic", "classic"], icon: "🎣" },
                { text: "只要实用就行", resultKey: ["practical", "efficient"], icon: "🔧" }
            ]
        },
        {
            id: 4,
            text: "你的钓鱼风格是？",
            options: [
                { text: "耐心等待，守株待兔", resultKey: ["patient", "strategic"], icon: "🕰️" },
                { text: "频繁换点，主动出击", resultKey: ["aggressive", "active"], icon: "🚀" },
                { text: "享受过程，钓多少不重要", resultKey: ["relaxed", "casual"], icon: "☀️" }
            ]
        },
        {
            id: 5,
            text: "你最喜欢什么时间段钓鱼？",
            options: [
                { text: "清晨，鱼最活跃", resultKey: ["morning", "energetic"], icon: "🌅" },
                { text: "黄昏，景色最美", resultKey: ["evening", "aesthetic"], icon: "🌇" },
                { text: "深夜，安静无干扰", resultKey: ["night", "focused"], icon: "🌙" }
            ]
        }
    ],
    results: {
        analyst: {
            title: "水文侦探",
            desc: "你相信数据胜过直觉\n擅长通过科学分析找到最佳钓点",
            recommend: ["电子探鱼器", "水质检测仪"]
        },
        action: {
            title: "实战派猛将",
            desc: "宁可错抛千竿\n绝不放过任何咬口机会",
            recommend: ["强力PE线", "快调竿"]
        },
        social: {
            title: "分享达人",
            desc: "钓鱼不仅是乐趣，更是社交！\n你喜欢与朋友分享每一次的收获",
            recommend: ["运动相机", "直播支架"]
        },
        lucky: {
            title: "玄学大师",
            desc: "你相信某些颜色、饵料、天气\n都会影响鱼的咬口，玄学才是王道！",
            recommend: ["五彩拟饵", "风水指南"]
        },
        flexible: {
            title: "随机应变",
            desc: "你不会固守一个钓点，总能灵活调整策略\n随时适应环境变化",
            recommend: ["轻便折叠椅", "便携式鱼护"]
        },
        patient: {
            title: "耐心大师",
            desc: "钓鱼讲究等待，你愿意花时间守候\n只为那一次完美的上钩！",
            recommend: ["舒适钓椅", "遮阳伞"]
        },
        aggressive: {
            title: "主动猎手",
            desc: "你不喜欢死守一个地方\n更愿意主动出击，寻找鱼儿的踪迹",
            recommend: ["路亚装备", "探鱼器"]
        },
        relaxed: {
            title: "悠闲垂钓者",
            desc: "钓鱼对你来说是放松身心的一种方式\n收获多少并不重要，享受过程才是关键！",
            recommend: ["轻便折叠凳", "钓鱼音箱"]
        }
    }
};

// 应急处理能力测试
const emergencyTest = {
    id: 2,
    title: "钓鱼应急能力测试",
    questions: [
        {
            id: 1,
            text: "主线突然断开时你会？",
            options: [
                { text: "现场重绑线组继续作钓", resultKey: ["calm", "skilled"], icon: "🧵" },
                { text: "启用备用竿坚持作战", resultKey: ["prepared", "persistent"], icon: "🎒" },
                { text: "提前结束本次垂钓", resultKey: ["prudent", "flexible"], icon: "🚪" }
            ]
        },
        {
            id: 2,
            text: "暴雨突降时的应对方案？",
            options: [
                { text: "搭建雨棚继续坚守", resultKey: ["dedicated", "weatherproof"], icon: "⛺" },
                { text: "转移至树下避雨", resultKey: ["adaptive", "riskaware"], icon: "🌳" },
                { text: "立即收竿返程", resultKey: ["safetyfirst", "prudent"], icon: "🌂" }
            ]
        },
        {
            id: 3,
            text: "夜钓时头灯没电怎么办？",
            options: [
                { text: "手机照明坚持作钓", resultKey: ["resourceful", "improvised"], icon: "📱" },
                { text: "依靠月光继续观察", resultKey: ["naturalist", "prepared"], icon: "🌕" },
                { text: "立即收拾装备离开", resultKey: ["prudent", "systematic"], icon: "🔦" }
            ]
        },
        {
            id: 4,
            text: "鱼护破损导致跑鱼如何处理？",
            options: [
                { text: "现场修补继续使用", resultKey: ["frugal", "repairer"], icon: "🛠️" },
                { text: "改用备用鱼护", resultKey: ["backupper", "organized"], icon: "🎏" },
                { text: "水里有妖怪，快跑", resultKey: ["bold", "prudent"], icon: "✋" }
            ]
        },
        {
            id: 5,
            text: "遭遇蛇类靠近时反应？",
            options: [
                { text: "保持静止等待离开", resultKey: ["composed", "observant"], icon: "🐍" },
                { text: "轻敲鱼竿驱赶", resultKey: ["prepared", "controller"], icon: "🎣" },
                { text: "迅速撤离现场", resultKey: ["prudent", "safetyfirst"], icon: "🏃" }
            ]
        }
    ],
    results: {
        calm: {
            title: "危机指挥官",
            desc: "在突发状况中保持绝对冷静\n总能找到最优解决方案",
            recommend: ["多功能工具钳", "应急医疗包"]
        },
        prepared: {
            title: "战备专家",
            desc: "完善的预案准备\n让意外永远在掌控之中",
            recommend: ["备用线组盒", "三防装备箱"]
        },
        prudent: {
            title: "安全卫士",
            desc: "将风险控制视为第一要务\n擅长制定撤退方案",
            recommend: ["气象预警器", "紧急呼救哨"]
        }
    }
};

// 天气变化应对测试
const weatherTest = {
    id: 3,
    title: "应对自然的能力诊断",
    questions: [
        {
            id: 1,
            text: "突然刮起西南风时你会？",
            options: [
                { text: "改用浮钓法应对变温", resultKey: ["meteorological", "adaptive"], icon: "🌪️" },
                { text: "加重铅坠稳定线组", resultKey: ["stable", "forceful"], icon: "⚓" },
                { text: "转移到背风位置", resultKey: ["positioning", "sheltered"], icon: "🏔️" }
            ]
        },
        {
            id: 2,
            text: "气温骤降5℃以上时你的策略？",
            options: [
                {text: "改钓深水区底层鱼",resultKey: ["temperature", "strategic"],icon: "🧊"},
                {text: "加强雾化诱鱼",resultKey: ["adaptation", "active"],icon: "🌫️"},
                {
                    text: "立即收竿回家",
                    resultKey: ["cautious", "flexible"],
                    icon: "🏠"
                }
            ]
        },
        {
            id: 3,
            text: "发现气压持续下降时？",
            options: [
                {
                    text: "改用浮钓法应对鱼离底",
                    resultKey: ["pressure", "technical"],
                    icon: "📉"
                },
                {
                    text: "加大饵料腥味比例",
                    resultKey: ["scent", "adaptive"],
                    icon: "👃"
                },
                {
                    text: "开启增氧泵辅助",
                    resultKey: ["equipment", "control"],
                    icon: "💨"
                }
            ]
        },
        {
            id: 4,
            text: "遭遇雷雨天气前兆时？",
            options: [
                {
                    text: "立即寻找避雷场所",
                    resultKey: ["safety", "prudent"],
                    icon: "⚡"
                },
                {
                    text: "抓住雨前窗口期抢钓",
                    resultKey: ["opportunistic", "bold"],
                    icon: "🎯"
                },
                {
                    text: "观察云层变化决定",
                    resultKey: ["observant", "analytical"],
                    icon: "👀"
                }
            ]
        },
        {
            id: 5,
            text: "持续干旱季节的作钓策略？",
            options: [
                {
                    text: "寻找深潭水域",
                    resultKey: ["depth", "conservative"],
                    icon: "🕳️"
                },
                {
                    text: "改用活饵增强诱惑",
                    resultKey: ["bait", "aggressive"],
                    icon: "🪱"
                },
                {
                    text: "晨昏时段重点出击",
                    resultKey: ["timing", "strategic"],
                    icon: "⏳"
                }
            ]
        }
    ],
    results: {
        meteorological: {
            title: "天气先知",
            desc: "精通气象水文关联\n善用自然力量作钓",
            recommend: ["电子气压计", "风速测量仪"]
        },
        pressure: {
            title: "气压猎手",
            desc: "对气压变化极度敏感\n善用浮钓技巧应对鱼情",
            recommend: ["数字气压表", "浮钓专用漂"]
        },
        safety: {
            title: "安全专家",
            desc: "永远把人身安全\n放在垂钓乐趣之上",
            recommend: ["防雷鞋套", "应急避雷针"]
        }
    }
};

const traditionalStyleTest = {
    id: 4,
    title: "保守派&现代派测试",
    questions: [
        {
            id: 1,
            text: "选择钓竿时，你最看重？",
            options: [
                {
                    text: "竹制竿的天然手感",
                    resultKey: ["traditionalist", "natural"],
                    icon: "🎋"
                },
                {
                    text: "玻璃钢竿的耐用性",
                    resultKey: ["practical", "durable"],
                    icon: "🔩"
                },
                {
                    text: "碳纤维材料的现代化趋势",
                    resultKey: ["balanced", "economical"],
                    icon: "⚖️"
                }
            ]
        },
        {
            id: 2,
            text: "面对流水环境你的应对策略是？",
            options: [
                {
                    text: "逐渐增加铅的重量调节",
                    resultKey: ["stable", "precision"],
                    icon: "🎯"
                },
                {
                    text: "飘到哪我就钓到哪",
                    resultKey: ["adaptive", "flowing"],
                    icon: "🌊"
                },
                {
                    text: "猛猛重铅一步到位",
                    resultKey: ["forceful", "control"],
                    icon: "⚓"
                }
            ]
        },
        {
            id: 3,
            text: "选择鱼饵时你更偏好？",
            options: [
                {
                    text: "完全使用天然材料",
                    resultKey: ["purist", "natural"],
                    icon: "🌾"
                },
                {
                    text: "适当添加诱鱼剂",
                    resultKey: ["balanced", "modern"],
                    icon: "🛍️"
                },
                {
                    text: "自主研发神秘小料",
                    resultKey: ["innovative", "experimental"],
                    icon: "🧪"
                }
            ]
        },
        {
            id: 4,
            text: "遇到使用鱼探钓友挑战时？",
            options: [
                {
                    text: "坚持大众钓技钓法的优势",
                    resultKey: ["traditionalist", "confident"],
                    icon: "🛡️"
                },
                {
                    text: "借鉴现代装备改良",
                    resultKey: ["adaptive", "progressive"],
                    icon: "🔧"
                },
                {
                    text: "摇人，组织技法交流活动",
                    resultKey: ["social", "ambassador"],
                    icon: "🤝"
                }
            ]
        },
        {
            id: 5,
            text: "选择鱼线的标准是？",
            options: [
                {
                    text: "纯碳的绝命感知",
                    resultKey: ["sensitivity", "purist"],
                    icon: "🎋"
                },
                {
                    text: "PE的低延展性",
                    resultKey: ["stable", "modern"],
                    icon: "🧊"
                },
                {
                    text: "从小用到大的情怀",
                    resultKey: ["nostalgic", "aesthetic"],
                    icon: "🦢"
                }
            ]
        }
    ],
    results: {
        traditionalist: {
            title: "古法传承者",
            desc: "你追求原汁原味的钓鱼体验\n擅长利用自然环境特点作钓",
            recommend: ["竹制钓竿", "芦苇浮漂"]
        },
        purist: {
            title: "纯粹主义者",
            desc: "坚持百年传承技法\n拒绝现代工业介入",
            recommend: ["手工鱼钩", "天然麻线"]
        },
        adaptive: {
            title: "改良先锋",
            desc: "在传统基础上\n巧妙融入现代科技",
            recommend: ["碳素竿尖", "复合材料线轮"]
        }
    }
};

// 更多测试模板示例（夜钓风格测试）
const nightFishingTest = {
    id: 5,
    title: "夜钓风格诊断",
    questions: [
        {
            id: 1,
            text: "夜钓照明设备你首选？",
            options: [
                {
                    text: "强光探照灯全面照亮",
                    resultKey: ["confident", "control"],
                    icon: "💡"
                },
                {
                    text: "柔光夜光漂保持隐蔽",
                    resultKey: ["stealthy", "natural"],
                    icon: "🌙"
                },
                {
                    text: "头灯配合荧光棒",
                    resultKey: ["balanced", "practical"],
                    icon: "🔦"
                }
            ]
        },
        {
            id: 2,
            text: "遭遇大鱼突袭时你会？",
            options: [
                {
                    text: "硬调竿直接弓鱼",
                    resultKey: ["aggressive", "confrontational"],
                    icon: "🎯"
                },
                {
                    text: "松线泄力消耗体力",
                    resultKey: ["patient", "strategic"],
                    icon: "⏳"
                },
                {
                    text: "呼叫同伴帮忙控鱼",
                    resultKey: ["social", "teamwork"],
                    icon: "👥"
                }
            ]
        },
        {
            id: 3,
            text: "处理水面反光干扰时？",
            options: [
                {
                    text: "使用偏光镜消除眩光",
                    resultKey: ["technical", "equipment"],
                    icon: "🕶️"
                },
                {
                    text: "调整观察角度避开光源",
                    resultKey: ["adaptive", "natural"],
                    icon: "🔍"
                },
                {
                    text: "直接关闭所有灯光",
                    resultKey: ["radical", "stealthy"],
                    icon: "🚫"
                }
            ]
        },
        {
            id: 4,
            text: "选择夜钓线组时？",
            options: [
                {
                    text: "荧光PE线增强可视性",
                    resultKey: ["visible", "control"],
                    icon: "🌟"
                },
                {
                    text: "透明尼龙线保持隐蔽",
                    resultKey: ["stealthy", "natural"],
                    icon: "🎭"
                },
                {
                    text: "电子感应报警线组",
                    resultKey: ["tech", "innovative"],
                    icon: "📡"
                }
            ]
        },
        {
            id: 5,
            text: "后半夜鱼停口时？",
            options: [
                {
                    text: "分析月相调整策略",
                    resultKey: ["analytical", "patient"],
                    icon: "🌗"
                },
                {
                    text: "更换振动型拟饵",
                    resultKey: ["active", "adaptive"],
                    icon: "🎸"
                },
                {
                    text: "开直播与网友互动",
                    resultKey: ["social", "entertain"],
                    icon: "📱"
                }
            ]
        }
    ],
    results: {
        stealthy: {
            title: "暗夜刺客",
            desc: "擅长利用夜色掩护\n精于捕捉细微咬口信号",
            recommend: ["夜光漂", "消音铅坠"]
        },
        aggressive: {
            title: "黑夜斗士",
            desc: "享受与大物的正面对决\n崇尚强力装备压制",
            recommend: ["重型钓竿", "钢丝前导线"]
        },
        tech: {
            title: "夜视专家",
            desc: "善用科技装备突破视觉限制\n推荐：热成像仪+电子报警器",
            recommend: ["红外摄像头", "震动感应竿"]
        }
    }
};

const juece = {
    id: 6,
    title: "作钓决策风格测试",
    questions: [
        {
            id: 1,
            text: "选择钓点时你最看重？",
            options: [
                { text: "水文数据（温度/流速）", resultKey: ["data"], icon: "🌡️" },
                { text: "周边自然环境舒适度", resultKey: ["comfort"], icon: "🌳" },
                { text: "钓友打卡的热门程度", resultKey: ["social"], icon: "🔥" }
            ]
        },
        {
            id: 2,
            text: "发现鱼情变化时首先？",
            options: [
                { text: "查阅钓鱼日志找规律", resultKey: ["data"], icon: "📖" },
                { text: "根据直觉调整策略", resultKey: ["comfort"], icon: "💡" },
                { text: "询问周边钓友建议", resultKey: ["social"], icon: "👥" }
            ]
        },
        {
            id: 3,
            text: "选择新钓具时主要依据？",
            options: [
                { text: "实验室测试报告", resultKey: ["data"], icon: "📊" },
                { text: "握持手感舒适度", resultKey: ["comfort"], icon: "🖐️" },
                { text: "网红达人推荐", resultKey: ["social"], icon: "🌟" }
            ]
        },
        {
            id: 4,
            text: "遇到陌生钓场时你会？",
            options: [
                { text: "先测水深和流速", resultKey: ["data"], icon: "📏" },
                { text: "寻找舒适休息点", resultKey: ["comfort"], icon: "🪑" },
                { text: "观察当地钓友操作", resultKey: ["social"], icon: "👀" }
            ]
        },
        {
            id: 5,
            text: "如何安排作钓时间？",
            options: [
                { text: "根据潮汐表精确计划", resultKey: ["data"], icon: "⏱️" },
                { text: "天气舒适就出发", resultKey: ["comfort"], icon: "🌤️" },
                { text: "跟随钓友团队行动", resultKey: ["social"], icon: "👫" }
            ]
        }
    ],
    results: {
        data: {
            title: "数据指挥官",
            desc: "用科学测量代替经验主义\n装备推荐：电子流速仪+多参数水质笔",
            recommend: ["智能探鱼器", "电子温度计"]
        },
        comfort: {
            title: "自然诗人",
            desc: "享受过程胜过渔获结果\n装备推荐：便携折叠椅+遮阳伞",
            recommend: ["户外咖啡壶", "防潮地垫"]
        },
        social: {
            title: "社交达人",
            desc: "钓鱼是连接同好的社交方式\n装备推荐：直播支架+网红拟饵",
            recommend: ["防水手机袋", "自拍杆"]
        }
    }
};

const tufa = {
    id: 7,
    title: "突发状况应对测试",
    questions: [
        {
            id: 1,
            text: "突遇暴雨时你会？",
            options: [
                { text: "立即分析雨势持续时间", resultKey: ["analyst"], icon: "📈" },
                { text: "凭直觉判断是否继续作钓", resultKey: ["intuition"], icon: "💡" },
                { text: "拍摄暴雨视频发朋友圈", resultKey: ["social"], icon: "📱" }
            ]
        },
        {
            id: 2,
            text: "钓竿突然卡节如何处理？",
            options: [
                { text: "查阅维修手册找方案", resultKey: ["analyst"], icon: "📖" },
                { text: "凭手感慢慢摇晃解决", resultKey: ["intuition"], icon: "🔄" },
                { text: "直播求助网友支招", resultKey: ["social"], icon: "📡" }
            ]
        },
        {
            id: 3,
            text: "鱼线缠成乱麻时？",
            options: [
                { text: "系统分析缠绕原因", resultKey: ["analyst"], icon: "🧩" },
                { text: "直接剪断重新绑线", resultKey: ["intuition"], icon: "✂️" },
                { text: "拍照发群求安慰", resultKey: ["social"], icon: "😢" }
            ]
        },
        {
            id: 4,
            text: "误入陌生水域时？",
            options: [
                { text: "研究卫星地图定位", resultKey: ["analyst"], icon: "🗺️" },
                { text: "跟着感觉寻找钓位", resultKey: ["intuition"], icon: "🧭" },
                { text: "询问当地居民建议", resultKey: ["social"], icon: "🗣️" }
            ]
        },
        {
            id: 5,
            text: "遭遇渔具店关门时？",
            options: [
                { text: "分析替代品参数", resultKey: ["analyst"], icon: "📋" },
                { text: "就地取材DIY解决", resultKey: ["intuition"], icon: "🧰" },
                { text: "社交平台求转让", resultKey: ["social"], icon: "🆘" }
            ]
        }
    ],
    results: {
        analyst: {
            title: "战术大师",
            desc: "精准预判各类突发状况\n推荐：气压监测手表+防水背包",
            recommend: ["电子气压计", "速干雨衣"]
        },
        intuition: {
            title: "本能猎手",
            desc: "相信身体感知胜过仪器数据\n推荐：防滑溯溪鞋+触感强化手套",
            recommend: ["碳素手竿", "荧光拟饵"]
        },
        social: {
            title: "社群达人",
            desc: "善用群体智慧解决问题\n推荐：网络信号增强器+移动电源",
            recommend: ["直播三脚架", "防水蓝牙耳机"]
        }
    }
}
const jiazhi = {
    id: 8,
    title: "装备价值取向测试",
    questions: [
        {
            id: 1,
            text: "购买钓竿时优先考虑？",
            options: [
                { text: "详细参数和测试报告", resultKey: ["tech"], icon: "📊" },
                { text: "握持手感和外观设计", resultKey: ["sense"], icon: "🎨" },
                { text: "网红达人的同款推荐", resultKey: ["trend"], icon: "🌟" }
            ]
        },
        {
            id: 2,
            text: "选择钓线时更关注？",
            options: [
                {
                    text: "拉力值和结节强度",
                    resultKey: ["tech"],
                    icon: "💪"
                },
                {
                    text: "线体顺滑度和颜色",
                    resultKey: ["sense"],
                    icon: "🖌️"
                },
                {
                    text: "网红同款限量版",
                    resultKey: ["trend"],
                    icon: "🚨"
                }
            ]
        },
        {
            id: 3,
            text: "购买钓箱主要考量？",
            options: [
                {
                    text: "内部结构科学性",
                    resultKey: ["tech"],
                    icon: "📐"
                },
                {
                    text: "外观配色协调性",
                    resultKey: ["sense"],
                    icon: "🎨"
                },
                {
                    text: "社交媒体曝光度",
                    resultKey: ["trend"],
                    icon: "📸"
                }
            ]
        },
        {
            id: 4,
            text: "购买鱼饵的原因是？",
            options: [
                {
                    text: "实验室测试数据优异",
                    resultKey: ["tech"],
                    icon: "🔬"
                },
                {
                    text: "色肉眼可见的精致程度",
                    resultKey: ["sense"],
                    icon: "👁️"
                },
                {
                    text: "钓鱼博主联名款",
                    resultKey: ["trend"],
                    icon: "✍️"
                }
            ]
        },
        {
            id: 5,
            text: "保养钓具时注重？",
            options: [
                {
                    text: "参数性能恢复",
                    resultKey: ["tech"],
                    icon: "📈"
                },
                {
                    text: "外观成色维护",
                    resultKey: ["sense"],
                    icon: "✨"
                },
                {
                    text: "保持网红款的新潮感",
                    resultKey: ["trend"],
                    icon: "🆕"
                }
            ]
        }
    ],
    results: {
        tech: {
            title: "参数党",
            desc: "用数据量化装备性能\n推荐：碳布检测仪+拉力测试器",
            recommend: ["数字秤重器", "微距镜头"]
        },
        sense: {
            title: "手感派",
            desc: "人竿合一的玄学境界\n推荐：手工木质轮座+真皮握把",
            recommend: ["檀香线轮", "定制涂装"]
        },
        trend: {
            title: "潮流先锋",
            desc: "装备即社交货币\n推荐：限量版竿袋+联名配件",
            recommend: ["网红防晒服", "定制竿贴纸"]
        }
    }
};

const pianhao = {
    id: 9,
    title: "作钓时段偏好测试",
    questions: [
        {
            id: 1,
            text: "最喜欢的作钓时段是？",
            options: [
                { text: "晨光初现的黄金窗口期", resultKey: ["dawn", "early_morning"], icon: "🌅" },
                { text: "烈日当头的正午时分", resultKey: ["noon", "midday"], icon: "🌞" },
                { text: "星月交辉的静谧夜晚", resultKey: ["night", "late_night"], icon: "🌙" }
            ]
        },
        {
            id: 2,
            text: "你更喜欢的作钓环境是？",
            options: [
                { text: "清晨薄雾中的静谧湖泊", resultKey: ["dawn", "misty_morning"], icon: "🏞" },
                { text: "日照充足的宽阔江面", resultKey: ["noon", "sunny_river"], icon: "🌊" },
                { text: "夜幕降临的宁静溪流", resultKey: ["night", "moonlit_stream"], icon: "🌌" }
            ]
        },
        {
            id: 3,
            text: "你认为鱼群最活跃的时间是？",
            options: [
                { text: "太阳刚刚升起的时候", resultKey: ["dawn", "sunrise_peak"], icon: "🌅" },
                { text: "中午水温最适合的时候", resultKey: ["noon", "warm_midday"], icon: "🌞" },
                { text: "夜晚水温下降的时候", resultKey: ["night", "cool_night"], icon: "🌙" }
            ]
        },
        {
            id: 4,
            text: "作钓时，你最关注的因素是？",
            options: [
                { text: "晨间水流的变化", resultKey: ["dawn", "morning_current"], icon: "💧" },
                { text: "太阳光照的强度", resultKey: ["noon", "solar_intensity"], icon: "🔆" },
                { text: "夜晚的温差变化", resultKey: ["night", "temperature_drop"], icon: "🌡" }
            ]
        },
        {
            id: 5,
            text: "哪种钓组最适合你？",
            options: [
                { text: "清水区适用的灯笼钓法", resultKey: ["dawn", "shallow_fishing"], icon: "🎣" },
                { text: "直达底部的深水卡罗", resultKey: ["noon", "deep_fishing"], icon: "🌊" },
                { text: "适用于夜钓的荧光鱼饵", resultKey: ["night", "glow_float"], icon: "🔦" }
            ]
        }
    ],
    results: {
        dawn: {
            title: "晨曦猎手",
            desc: "善用鱼群晨间活跃规律\n推荐：偏光镜+浅层搜索饵",
            recommend: ["驱蚊手环", "保温水壶"]
        },
        noon: {
            title: "烈日征服者",
            desc: "掌握深处的作钓方法\n推荐：防晒服+重铅钓组",
            recommend: ["冰爽毛巾", "耐热饮料瓶"]
        },
        night: {
            title: "暗夜行者",
            desc: "精通夜钓特殊技巧\n推荐：夜光饵+红外头灯",
            recommend: ["声呐探测器", "防寒睡袋"]
        }
    }
};


const shejiao = {
    id: 10,
    title: "钓鱼社交人格测试",
    questions: [
        {
            id: 1,
            text: "发现秘密钓点时你会？",
            options: [
                { text: "独自享受不与他人分享", resultKey: ["solo"], icon: "🤫" },
                { text: "只告诉亲密钓友", resultKey: ["close"], icon: "👥" },
                { text: "立即发定位到钓友群", resultKey: ["public"], icon: "📢" }
            ]
        },
        {
            id: 2,
            text: "钓获米级大鱼时会？",
            options: [
                { text: "悄悄测量后放流", resultKey: ["solo"], icon: "🎣" },
                { text: "只给老婆看照片", resultKey: ["close"], icon: "👩❤️" },
                { text: "发起直播称重仪式", resultKey: ["public"], icon: "📹" }
            ]
        },
        {
            id: 3,
            text: "遇到新手求教时？",
            options: [
                { text: "假装没听见继续抛竿", resultKey: ["solo"], icon: "🙉" },
                { text: "偷偷传授独门秘籍", resultKey: ["close"], icon: "🗝️" },
                { text: "当场开办钓鱼速成班", resultKey: ["public"], icon: "🎓" }
            ]
        },
        {
            id: 4,
            text: "选择钓鱼服装时？",
            options: [
                { text: "迷彩服融入环境", resultKey: ["solo"], icon: "🎭" },
                { text: "情侣款防晒衣", resultKey: ["close"], icon: "👫" },
                { text: "荧光战队定制服", resultKey: ["public"], icon: "👕" }
            ]
        },
        {
            id: 5,
            text: "发现幽灵钓点（很多垃圾）时？",
            options: [
                { text: "默默清理后独自使用", resultKey: ["solo"], icon: "👻" },
                { text: "约老友一起打扫", resultKey: ["close"], icon: "🧹" },
                { text: "发起环保打卡活动", resultKey: ["public"], icon: "♻️" }
            ]
        }
    ],
    results: {
        solo: {
            title: "孤岛隐者",
            desc: "一人一竿一世界\n推荐：隐形帐篷+消音饵盒",
            recommend: ["迷彩渔夫帽", "无声地钉"]
        },
        close: {
            title: "秘密守护者",
            desc: "只与信任的人分享渔趣\n推荐：情侣钓鱼服+情趣软饵",
            recommend: ["加密记事本", "情侣竿套"]
        },
        public: {
            title: "钓圈明星",
            desc: "河边就是你的舞台\n推荐：直播三脚架+闪光铃铛",
            recommend: ["网红防晒面罩", "自动点赞器"]
        }
    }
};

const celue = {
    id: 11,
    title: "拟饵选择策略",
    questions: [
        {
            id: 1,
            text: "水质浑浊时首选？",
            options: [
                { text: "荧光粉让鱼得雪盲症", resultKey: ["visual"], icon: "👁️" },
                { text: "震波传递地震预警", resultKey: ["vibration"], icon: "📳" },
                { text: "大蒜味征服鱼类的胃", resultKey: ["scent"], icon: "🧄" }
            ]
        },
        {
            id: 2,
            text: "夜钓鲈鱼的必杀技？",
            options: [
                { text: "LED拟饵变身水下迪厅", resultKey: ["visual"], icon: "💃" },
                { text: "响珠制造心跳节奏", resultKey: ["vibration"], icon: "💓" },
                { text: "鱼肝油浸泡饵诱惑", resultKey: ["scent"], icon: "🩸" }
            ]
        },
        {
            id: 3,
            text: "鱼活性低下时？",
            options: [
                { text: "换七种颜色激发好奇心", resultKey: ["visual"], icon: "🌈" },
                { text: "慢摇手法演绎饵的垂死", resultKey: ["vibration"], icon: "🩰" },
                { text: "注入咖啡因唤醒鱼", resultKey: ["scent"], icon: "☕" }
            ]
        },
        {
            id: 4,
            text: "遭遇小鱼闹窝时？",
            options: [
                { text: "纯黑拟饵实施隐身", resultKey: ["visual"], icon: "🕶️" },
                { text: "超频震动驱赶杂兵", resultKey: ["vibration"], icon: "⚡" },
                { text: "辣椒味让小鱼自闭", resultKey: ["scent"], icon: "🌶️" }
            ]
        },
        {
            id: 5,
            text: "想要吸引远距离目标？",
            options: [
                { text: "反光片制造水下光剑", resultKey: ["visual"], icon: "⚔️" },
                { text: "直升机式螺旋噪音", resultKey: ["vibration"], icon: "🚁" },
                { text: "扩散型信息素导弹", resultKey: ["scent"], icon: "💨" }
            ]
        }
    ],
    results: {
        visual: {
            title: "色彩巫师",
            desc: "让鱼产生'这是最后一口'的幻觉\n推荐：幻彩贴纸+镭射鱼钩",
            recommend: ["变色龙拟饵", "UV手电筒"]
        },
        vibration: {
            title: "节奏大师",
            desc: "用水下震动谱写捕鱼交响曲\n推荐：电子节拍器+声波探测器",
            recommend: ["多频响珠", "震动手柄"]
        },
        scent: {
            title: "气味炼金师",
            desc: "研制让鱼失眠的致命诱惑\n推荐：精油调配瓶+注射式软饵",
            recommend: ["腥味增强剂", "大蒜浓缩液"]
        }
    }
};


const tianqi = {
    id: 12,
    title: "天气敏感度",
    questions: [
        {
            id: 1,
            text: "出发前如何确认天气？",
            options: [
                { text: "同时打开3个气象APP交叉验证", resultKey: ["tech"], icon: "📱" },
                { text: "伸出胳膊感受风速和湿度", resultKey: ["observant"], icon: "💪" },
                { text: "直接出发反正来都来了", resultKey: ["carefree"], icon: "🎒" }
            ]
        },
        {
            id: 2,
            text: "突然降温3度时你会？",
            options: [
                { text: "立即分析水温变化曲线", resultKey: ["analyst"], icon: "📉" },
                { text: "默默套上秋裤继续钓", resultKey: ["adaptive"], icon: "🧦" },
                { text: "发朋友圈《钓手的寒冬》", resultKey: ["social"], icon: "📸" }
            ]
        },
        {
            id: 3,
            text: "遇到湿度飙升如何处理？",
            options: [
                { text: "启动钓箱除湿系统", resultKey: ["tech"], icon: "💨" },
                { text: "改用防潮拟饵", resultKey: ["adaptive"], icon: "🦐" },
                { text: "拍摄头发炸毛的搞笑视频", resultKey: ["social"], icon: "🤯" }
            ]
        },
        {
            id: 4,
            text: "气压骤变的应对方式是？",
            options: [
                { text: "用专业设备计算钓组调整量", resultKey: ["tech"], icon: "🎚️" },
                { text: "凭关节酸痛程度判断", resultKey: ["intuitive"], icon: "🦴" },
                { text: "发钓鱼群问'今天口怎么不好'", resultKey: ["social"], icon: "🗣️" }
            ]
        },
        {
            id: 5,
            text: "持续雨季的作钓策略？",
            options: [
                { text: "穿戴全地形防水套装", resultKey: ["tech"], icon: "🦺" },
                { text: "改用跳底钓法", resultKey: ["adaptive"], icon: "🦘" },
                { text: "直播雨中甩竿的悲壮画面", resultKey: ["social"], icon: "🎥" }
            ]
        }
    ],
    results: {
        tech: {
            title: "气象学家",
            desc: "把钓鱼变成气象观测行为\n推荐：电子气象站+防水记事本",
            recommend: ["温湿度记录仪", "可编程浮漂"]
        },
        adaptive: {
            title: "全天候战士",
            desc: "用肉体凡胎对抗自然变化\n推荐：自适应钓组+速干战袍",
            recommend: ["关节护具", "驱寒姜茶"]
        },
        social: {
            title: "社交气象员",
            desc: "天气只是发动态的素材\n推荐：防水手机套+雨景滤镜",
            recommend: ["悲情文案生成器", "防水睫毛膏"]
        }
    }
};

const baoyang = {
    id: 13,
    title: "装备保养习惯",
    questions: [
        {
            id: 1,
            text: "如何清洁钓竿？",
            options: [
                { text: "棉签蘸专用油逐节擦拭", resultKey: ["careful"], icon: "🧼" },
                { text: "河水里涮两下继续用", resultKey: ["casual"], icon: "💦" },
                { text: "改装成晾衣竿物尽其用", resultKey: ["modder"], icon: "🔧" }
            ]
        },
        {
            id: 2,
            text: "钓后如何保养轮轴？",
            options: [
                { text: "全套拆洗上油流程", resultKey: ["careful"], icon: "⚙️" },
                { text: "拍两下泥沙就算保养", resultKey: ["casual"], icon: "✋" },
                { text: "加装USB充电接口", resultKey: ["modder"], icon: "🔌" }
            ]
        },
        {
            id: 3,
            text: "多久更换鱼线？",
            options: [
                { text: "按使用小时精确计算", resultKey: ["careful"], icon: "⏱️" },
                { text: "等到断线才想起来换", resultKey: ["casual"], icon: "💥" },
                { text: "改装成风筝线再利用", resultKey: ["modder"], icon: "🪁" }
            ]
        },
        {
            id: 4,
            text: "如何处理旧饵盒？",
            options: [
                { text: "按色系分装消毒", resultKey: ["careful"], icon: "🎨" },
                { text: "全部混用形成独家气味", resultKey: ["casual"], icon: "🤢" },
                { text: "新三年，旧三年", resultKey: ["modder"], icon: "📱" }
            ]
        },
        {
            id: 5,
            text: "闲置装备怎么处理？",
            options: [
                { text: "真空封装保存", resultKey: ["careful"], icon: "🛍️" },
                { text: "堆在阳台接受日晒雨淋", resultKey: ["casual"], icon: "☀️" },
                { text: "拆零件组装新式武器", resultKey: ["modder"], icon: "🤖" }
            ]
        }
    ],
    results: {
        careful: {
            title: "器械医生",
            desc: "执行装备器官移植手术\n推荐：精密保养套装+无尘室",
            recommend: ["纳米棉签", "恒温防潮箱"]
        },
        casual: {
            title: "暴力玩家",
            desc: "坚信装备是消耗品\n推荐：军工三防钓具+终身保修",
            recommend: ["502胶水", "备用竿稍"]
        },
        modder: {
            title: "改装狂魔",
            desc: "万物皆可改造成钓具\n推荐：3D打印机+电焊套装",
            recommend: ["废品收购站会员", "意外伤害险"]
        }
    }
};


const chuli = {
    id: 14,
    title: "鱼获处理方式",
    questions: [
        {
            id: 1,
            text: "钓到巴掌大的小鱼如何处理？",
            options: [
                { text: "亲吻后放生培养感情", resultKey: ["eco"], icon: "💋" },
                { text: "现场油炸当下酒菜", resultKey: ["foodie"], icon: "🍺" },
                { text: "制作钥匙扣标本", resultKey: ["specimen"], icon: "🔑" }
            ]
        },
        {
            id: 2,
            text: "意外钓获保护鱼种时？",
            options: [
                { text: "拍摄证件照后放流", resultKey: ["eco"], icon: "📸" },
                { text: "连夜研究烹饪方式", resultKey: ["foodie"], icon: "🔪" },
                { text: "联系博物馆制作模型", resultKey: ["specimen"], icon: "🦴" }
            ]
        },
        {
            id: 3,
            text: "收获太多如何处置？",
            options: [
                { text: "分批放流维持生态", resultKey: ["eco"], icon: "♻️" },
                { text: "举办全鱼宴宴请邻里", resultKey: ["foodie"], icon: "🎉" },
                { text: "制作咸鱼风铃装饰", resultKey: ["specimen"], icon: "🎐" }
            ]
        },
        {
            id: 4,
            text: "鱼获严重受伤时？",
            options: [
                { text: "急救后放归自然", resultKey: ["eco"], icon: "🚑" },
                { text: "立即刮鳞去内脏保鲜", resultKey: ["foodie"], icon: "⏳" },
                { text: "制作战损版鱼拓", resultKey: ["specimen"], icon: "🎨" }
            ]
        },
        {
            id: 5,
            text: "钓获记录级大鱼时？",
            options: [
                { text: "量完尺寸即刻放生", resultKey: ["eco"], icon: "📏" },
                { text: "定制全鱼宴邀请函", resultKey: ["foodie"], icon: "💌" },
                { text: "制作等比例充气模型", resultKey: ["specimen"], icon: "🎈" }
            ]
        }
    ],
    results: {
        eco: {
            title: "生态卫士",
            desc: "江河湖海的义务管理员\n推荐：无倒刺钩+活鱼扣",
            recommend: ["量鱼尺", "放流专用网"]
        },
        foodie: {
            title: "河鲜主厨",
            desc: "开发出108种鱼料理\n推荐：便携炊具+保鲜冰桶",
            recommend: ["去鳞神器", "便携烤架"]
        },
        specimen: {
            title: "标本艺术家",
            desc: "把渔获变成永恒艺术品\n推荐：树脂封装套装+3D扫描仪",
            recommend: ["鱼拓工具包", "标本展示架"]
        }
    }
};

const huoqu = {
    id: 15,
    title: "钓鱼知识获取偏好",
    questions: [
        {
            id: 1,
            text: "如何学习新钓法？",
            options: [
                { text: "研读《鱼类行为学》", resultKey: ["academic"], icon: "📚" },
                { text: "刷短视频现学现卖", resultKey: ["trend"], icon: "📱" },
                { text: "请老钓头儿现场教学", resultKey: ["oral"], icon: "👴" }
            ]
        },
        {
            id: 2,
            text: "遇到技术难题时？",
            options: [
                { text: "查阅知网论文库", resultKey: ["academic"], icon: "🔍" },
                { text: "直播求助网友", resultKey: ["trend"], icon: "📡" },
                { text: "带酒请教水库大爷", resultKey: ["oral"], icon: "🍶" }
            ]
        },
        {
            id: 3,
            text: "了解装备知识途径？",
            options: [
                { text: "研究材料力学报告", resultKey: ["academic"], icon: "📊" },
                { text: "看带货主播演示", resultKey: ["trend"], icon: "🛒" },
                { text: "摸老钓头儿的竿，把握到包浆", resultKey: ["oral"], icon: "✋" }
            ]
        },
        {
            id: 4,
            text: "提升技术的秘诀是？",
            options: [
                { text: "建立作钓数据库", resultKey: ["academic"], icon: "💾" },
                { text: "购买网红同款装备", resultKey: ["trend"], icon: "🌟" },
                { text: "继承师傅的祖传神秘添加剂", resultKey: ["oral"], icon: "🧪" }
            ]
        },
        {
            id: 5,
            text: "如何分享经验？",
            options: [
                { text: "发表核心期刊论文", resultKey: ["academic"], icon: "📝" },
                { text: "制作竖屏小剧场", resultKey: ["trend"], icon: "🎬" },
                { text: "河边现场收徒", resultKey: ["oral"], icon: "🎣" }
            ]
        }
    ],
    results: {
        academic: {
            title: "钓界学者",
            desc: "把钓鱼变成科研项目\n推荐：电子日志本+水质检测仪",
            recommend: ["论文查重券", "文献管理软件"]
        },
        trend: {
            title: "网红学徒",
            desc: "坚信流量就是生产力\n推荐：美颜补光灯+洗脑BGM",
            recommend: ["假鱼摆拍道具", "点赞倍增器"]
        },
        oral: {
            title: "口传弟子",
            desc: "传承担竿授业的古老传统\n推荐：拜师专用跪垫+敬师茶具",
            recommend: ["祖传秘方饵", "师傅语录手册"]
        }
    }
}


module.exports = {
    personalityTest,
    emergencyTest, // 紧急情况处理
    weatherTest,
    traditionalStyleTest, // 传统钓法
    nightFishingTest,
    juece, // 钓鱼风格
    tufa,       // 路亚钓法
    jiazhi,   // 野钓生存
    pianhao,// 竞技心理
    shejiao,       // 饵料哲学
    celue, // 装备极简
    tianqi,        // 生态保护
    baoyang,     // 传统革新
    chuli,    // 钓获分享
    huoqu
};
