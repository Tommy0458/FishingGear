const personalityTest = {
    id: 1,
    title: "钓鱼人格精密分析",
    questions:[
      {
        id: 1,
        text: "到达新钓点后，你首先会？",
        options: [
          {
            text: "沿着岸线快速抛投找标点",
            resultKey: [
              ['Action',8],    // [维度名称, 基础权重]
              ['Casual',2]
            ],
            icon: "🌊"
          },
          {
            text: "观察结构物分布 + 感受水流温度",
            resultKey: [
              ['Observe',7],    // [维度名称, 基础权重]
              ['Nature',3]
            ],
            icon: "📸"
          },{
            text: "掏出钓箱里的刚买的饵试钓",
            resultKey: [
              ['Experiment',6],    // [维度名称, 基础权重]
              ['Tech',4]
            ],
            icon: "🎣"
          }
        ]
      },{
        id: 2,
        text: "遇到鱼群不开口时，你会？",
        options: [
          {
            text: "调整钓组参数 + 尝试新饵组合",
            resultKey: [
              ['Tech',6],    // [维度名称, 基础权重]
              ['Experiment',4]
            ],
            icon: "✋"
          },
          {
            text: "观察水面涟漪 + 模仿自然饵动作",
            resultKey: [
              ['Observe',5.5],    // [维度名称, 基础权重]
              ['Nature',4.5]
            ],
            icon: "🌈"
          },{
            text: "掏出手机查气压数据 + 对比历史鱼获",
            resultKey: [
              ['Data',7],    // [维度名称, 基础权重]
              ['Action',3]
            ],
            icon: "🌈"
          }
        ]
      },{
        id: 3,
        text: "选择钓竿时更关注？",
        options: [
          {
            text: "调性参数 + 碳布等级",
            resultKey: [
              ['Tech',8],    // [维度名称, 基础权重]
              ['Data',2]
            ],
            icon: "📡"
          },
          {
            text: "涂装设计 + 握把材质",
            resultKey: [
              ['Casual',7],    // [维度名称, 基础权重]
              ['Nature',3]
            ],
            icon: "🎣"
          },{
            text: "实战测评数据 + 钓友口碑",
            resultKey: [
              ['Data',6.5],    // [维度名称, 基础权重]
              ['Observe',3.5]
            ],
            icon: "🔧"
          }
        ]
      },{
        id: 4,
        text: "作钓时间分配策略？",
        options: [
          {
            text: "日出后黄金两小时 + 窗口期死守",
            resultKey: [
              ['Nature',6],    // [维度名称, 基础权重]
              ['Action',4]
            ],
            icon: "🕰️"
          },
          {
            text: "按潮汐表制定计划 + 分段试钓",
            resultKey: [
              ['Data',7.5],    // [维度名称, 基础权重]
              ['Experiment',2.5]
            ],
            icon: "🚀"
          },{
            text: "看天气随机决定 + 钓累就歇",
            resultKey: [
              ['Casual',8.5],    // [维度名称, 基础权重]
              ['Observe',1.5]
            ],
            icon: "☀️"
          }
        ]
      },{
        id: 5,
        text: "如何看待钓获分享？",
        options: [
          {
            text: "必须九宫格配技术分析",
            resultKey: [
              ['Tech',6],    // [维度名称, 基础权重]
              ['Data',4]
            ],
            icon: "🌅"
          },
          {
            text: "只发背影照 + 定位打码",
            resultKey: [
              ['Observe',5],    // [维度名称, 基础权重]
              ['Nature',5]
            ],
            icon: "📸"
          },{
            text: "朋友圈发 '空军' 自嘲 + 即兴段子",
            resultKey: [
              ['Casual',7],    // [维度名称, 基础权重]
              ['Experiment',3]
            ],
            icon: "🙉"
          }
        ]
      }
    ],
  // 维度权重配置矩阵
  dimensionWeights: {
    Action: 1.15,    // 技术应用
    Tech: 1.05,   // 自然观察
    Data: 1.15,      // 艺术审美
    Observe: 1.1,     // 数据分析
    Nature: 1.2,     // 人体工学
    Casual: 1.1,     // 规划能力
    Experiment: 1.65,// 直觉判断
    // 教学能力
  },
    // 复合结果判定规则
    results: [
      {
          title: "技术暴君（Tech）",
          description: "在钓鱼界，你就是那技术至上的独裁者！每一次抛竿、收线，都精准得如同精密仪器。理性分析是你的强项，对钓组参数、饵料搭配的研究深入骨髓。仿佛你手中的钓竿不是渔具，而是一把能征服鱼群的权杖，所到之处，鱼儿都得乖乖就范。",
          formula: "Tech>=18",
          suggestion: "你有着精湛的技术，不妨挑战一些复杂的钓法，比如飞蝇钓。同时，可以多参加一些钓鱼技术交流活动，与其他钓友切磋技艺，不断提升自己。",
          equip: "选择高端、精密的钓具，如高模量的碳纤维钓竿，能更好地满足你对技术操作的要求。搭配顺滑的渔轮，确保抛投和收线的精准度。"
      },
      {
          title: "数据先知（Data）",
          description: "你就像钓鱼世界里的超级预言家，对数据有着超乎常人的敏感度。气压、潮汐、历史鱼获，这些数据在你眼中就是解开钓鱼密码的钥匙。凭借着强大的数据分析能力，你总能提前布局，让鱼群无处遁形，执行力更是如同火箭发射一般迅猛。",
          formula: "Data>=19",
          suggestion: "继续收集和分析更多的数据，建立自己的钓鱼数据库。根据不同季节、地点和鱼种的特点，制定更精准的钓鱼计划。",
          equip: "配备带有数据记录功能的智能钓具，如智能渔轮可以记录抛投距离、收线速度等数据。还可以使用专业的钓鱼气象仪，实时获取气压、温度等信息。"
      },
      {
          title: "自然之子（Nature）",
          description: "你与大自然融为一体，仿佛是鱼群的亲密伙伴。对水流温度、结构物分布的感知如同本能，能敏锐地捕捉到自然的微妙变化。在钓鱼这件事上，你各方面表现均衡，就像大自然精心雕琢的艺术品，享受着与自然和谐共处的钓鱼时光。",
          formula: "Nature>=18",
          suggestion: "多去一些自然环境优美、生态多样的钓点，感受不同的自然条件对鱼群的影响。尝试使用天然饵料，更贴近自然的方式钓鱼。",
          equip: "选择轻便、舒适的钓具，如轻质的钓竿，让你在长时间的钓鱼过程中不会感到疲惫。使用仿生饵，更符合自然环境，增加诱鱼效果。"
      },
      {
          title: "鹰眼观测者（Observe）",
          description: "你的观察力堪比鹰眼，任何细微的变化都逃不过你的眼睛。水面的涟漪、鱼群的动向，都能被你精准捕捉。理性分析在你这里发挥得淋漓尽致，就像一位冷静的侦探，通过观察解开钓鱼的谜团。",
          formula: "Observe>=14",
          suggestion: "在钓鱼时，更加注重观察鱼群的行为模式和环境变化。可以提前到达钓点，观察一段时间再下竿，提高钓鱼的成功率。",
          equip: "配备高倍望远镜，帮助你更清晰地观察远处水面的情况。使用带有反光涂层的鱼线，在阳光下更容易观察鱼线的动态。"
      },
      {
          title: "抛投永动机（Action）",
          description: "你是钓鱼场上的活力源泉，抛竿的动作如同永动机一般不知疲倦。强大的执行力让你在到达新钓点后迅速展开行动，不放过任何一个可能藏鱼的标点。鱼群在你这无休止的抛投攻势下，迟早会成为你的囊中之物。",
          formula: "Action>=14",
          suggestion: "在保持高频率抛投的同时，注意调整抛投的角度和力度，尝试不同的抛投方式，找到最适合当前钓点的方法。",
          equip: "选择弹性好、韧性强的钓竿，能够承受频繁抛投的压力。配备大容量的渔轮，保证有足够的鱼线进行长距离抛投。"
      },
      {
          title: "实验狂魔（Experiment）",
          description: "你对钓鱼充满了无尽的好奇心，就像一位疯狂的科学家，不断尝试新的饵料、钓组组合。勇于探索未知，不怕失败，每一次实验都是向成功迈进的一步。在你的世界里，钓鱼就是一场永不停歇的科学实验。",
          formula: "Experiment>=18",
          suggestion: "继续大胆尝试各种新奇的钓鱼方法和装备，但也要及时总结经验教训。可以将每次实验的结果记录下来，以便后续分析和改进。",
          equip: "购买一些小众、独特的钓具和饵料，满足你的实验需求。例如，不同形状和颜色的拟饵，以及各种新型的钓组配件。"
      },
      {
          title: "佛系天尊（Casual）",
          description: "你以一种云淡风轻的姿态对待钓鱼，仿佛世间的喧嚣都与你无关。看天气随机决定，钓累了就歇一歇，享受着这份随性与自在。在钓鱼这件事上，你更注重过程而非结果，是钓鱼界的佛系代言人。",
          formula: "Casual>=18",
          suggestion: "不要过于在意鱼获的多少，享受钓鱼的过程才是最重要的。可以选择一些风景优美、环境舒适的钓点，放松身心。",
          equip: "选择简单、易用的钓具，不需要过于追求高端和复杂。一套基础的钓竿、渔轮和鱼线就可以满足你的需求。"
      },
      {
          title: "实验室战神（Tech/Data）",
          description: "你将技术与数据完美融合，如同钓鱼实验室里的战神。凭借着精湛的技术和强大的数据分析能力，在钓鱼战场上战无不胜。每一次决策都经过深思熟虑，让你在复杂的钓鱼环境中脱颖而出。",
          formula: "(Tech>=14 && Data>=10)",
          suggestion: "结合技术和数据的优势，开发出适合自己的钓鱼策略。可以根据数据调整钓组参数和饵料选择，提高钓鱼的效率。",
          equip: "选择具备高科技功能的钓具，如带有传感器的钓竿，可以实时反馈鱼咬钩的信息。同时，使用专业的钓鱼数据分析软件，更好地管理和分析数据。"
      },
      {
          title: "荒野先知（Nature+Observe）",
          description: "你是荒野中的智者，对自然的观察细致入微。既能感知大自然的微妙变化，又能通过敏锐的观察力洞察鱼群的动向。在荒野中，你就像一位先知，引领着自己走向钓鱼的胜利之路。",
          formula: "(Nature>=10 && Observe>=10)",
          suggestion: "在荒野环境中钓鱼时，充分利用你对自然和观察的优势。注意观察周围的生态环境，寻找鱼群可能栖息的地方。",
          equip: "选择适合野外环境的耐用钓具，如防水、防腐蚀的钓竿和渔轮。配备野外生存工具，如刀具、指南针等，确保在荒野中的安全。"
      },
      {
          title: "人形AI探测器（Data+Experiment）",
          description: "你如同一个人形的AI探测器，结合了数据分析和实验探索的能力。通过对数据的研究和不断的实验，你能快速找到最适合的钓鱼方法。在钓鱼的世界里，你就像一台高效的智能机器，精准地解决各种难题。",
          formula: "(Data>=12 && Experiment>=9)",
          suggestion: "利用数据分析的结果指导实验，不断优化钓鱼方法。可以进行对比实验，找出不同条件下最有效的饵料和钓组组合。",
          equip: "购买具有数据记录和分析功能的智能钓具，方便你进行实验和数据收集。同时，准备多种不同类型的饵料和钓组，满足实验的需求。"
      },
      {
          title: "六边形战士（Four-Dimension）",
          description: "你就是钓鱼界的六边形战士，在多个维度都有着出色的表现。技术、数据、自然感知、观察力等方面样样精通，就像一个全能的战士，无论面对何种钓鱼场景，都能轻松应对，战无不胜。",
          formula: "true",
          suggestion: "不断挑战更高难度的钓鱼场景和目标鱼种，进一步提升自己的综合能力。可以参加一些高水平的钓鱼比赛，与其他高手切磋。",
          equip: "根据不同的钓鱼场景和鱼种，配备一套完整的高端钓具。包括不同长度和调性的钓竿、各种类型的渔轮和丰富多样的饵料。"
      }
  ]
};    
const emergencyTest = {
    id: 2,
    title: "路亚佬应急能力测考验",
    questions: [
        {
            id: 1,
            text: '拟饵挂底了，你会？',
            options: [
                {
                    text: '尝试大力拉扯，说不定能扯出来',
                    resultKey: [
                        ['Bold', 7],
                        ['Aggressive', 3]
                    ],
                    icon: '💪'
                },
                {
                    text: '小心地收线，慢慢调整角度尝试取出',
                    resultKey: [
                        ['Patient', 7],
                        ['Prudent', 3]
                    ],
                    icon: '🧐'
                },
                {
                    text: '直接剪断鱼线，换个拟饵继续',
                    resultKey: [
                        ['Practical', 8],
                        ['Efficient', 2]
                    ],
                    icon: '✂️'
                }
            ]
        },
        {
            id: 2,
            text: '遇到鱼咬口很凶，但就是钓不上来，你咋办？',
            options: [
                {
                    text: '换个更锋利的鱼钩，加大力度刺鱼',
                    resultKey: [
                        ['Aggressive', 7],
                        ['Patient', 3]
                    ],
                    icon: '🔪'
                },
                {
                    text: '调整拟饵的动作和速度，尝试不同的手法',
                    resultKey: [
                        ['Adaptable', 6],
                        ['Practical', 4]
                    ],
                    icon: '🔄'
                },
                {
                    text: '先休息一会儿，观察下鱼情再做决定',
                    resultKey: [
                        ['Prudent', 8],
                        ['Adaptable', 2]
                    ],
                    icon: '😴'
                }
            ]
        },
        {
            id: 3,
            text: '在陌生水域，鱼情一直不好，你怎么搞？',
            options: [
                {
                    text: '坚持在这个钓点，相信总会有鱼上钩',
                    resultKey: [
                        ['Patient', 7],
                        ['Adaptable', 3]
                    ],
                    icon: '💎'
                },
                {
                    text: '四处走走，换几个不同的钓点试试',
                    resultKey: [
                        ['Practical', 6],
                        ['Bold', 4]
                    ],
                    icon: '🚶'
                },
                {
                    text: '向当地钓友请教经验',
                    resultKey: [
                        ['Efficient', 8],
                        ['Prudent', 2]
                    ],
                    icon: '👥'
                }
            ]
        },
        {
            id: 4,
            text: '突然狂风大作，浪很大，你怎么应对？',
            options: [
                {
                    text: '不管风浪，继续抛竿作钓',
                    resultKey: [
                        ['Aggressive', 7],
                        ['Bold', 3]
                    ],
                    icon: '🌪️'
                },
                {
                    text: '找个避风的地方继续作钓',
                    resultKey: [
                        ['Patient', 6],
                        ['Practical', 4]
                    ],
                    icon: '⛺'
                },
                {
                    text: '收拾装备回家，等风停了再来',
                    resultKey: [
                        ['Prudent', 8],
                        ['Adaptable', 2]
                    ],
                    icon: '🏠'
                }
            ]
        },
        {
            id: 5,
            text: '鱼轮突然卡死了，你咋整？',
            options: [
                {
                    text: '自己动手拆开鱼轮修理',
                    resultKey: [
                        ['Patient', 7],
                        ['Bold', 3]
                    ],
                    icon: '🛠️'
                },
                {
                    text: '赶紧拿出备用鱼轮换上',
                    resultKey: [
                        ['Practical', 8],
                        ['Efficient', 2]
                    ],
                    icon: '🎏'
                },
                {
                    text: '打电话给大师朋友求救',
                    resultKey: [
                        ['Prudent', 7],
                        ['Efficient', 3]
                    ],
                    icon: '📞'
                }
            ]
        }
    ],
    dimensionWeights: {
        Bold: 1.4,
        Aggressive:1.8,
        Patient: 1.8,
        Prudent: 1.8,
        Practical: 1.4,
        Efficient: 1.4,
        Adaptable: 1.8,
    },
    results: [
        {
            title: "路亚勇者(Bold+Aggressive)",
            description: "嘿哟，你就是那路亚江湖里的勇者！不管遇到啥情况，直接开干，拟饵挂底了大力扯，鱼咬不上就加大力度刺。你这股子猛劲，说不定哪天能把水底的龙王都给钓上来！",
            formula: "(Bold>=16 && Aggressive>=13)",
            suggestion: "有时候稍微冷静下，别太冲动，不然拟饵和鱼线可遭不住你的折腾。多学习点技巧，让你的猛劲更有方向。",
            equip: "带上一些结实耐用的拟饵和鱼线，能扛得住你的大力拉扯。"
        },
        {
            title: "耐心大师(Patient+Adaptable)",
            description: "你就像一位耐心的隐士，拟饵挂底了慢慢弄，鱼咬不上就调整手法。在这快节奏的路亚世界里，你用耐心编织着自己的钓鱼梦，说不定能钓到那些最狡猾的鱼。",
            formula: "(Patient>=11 && Adaptable>=13)",
            suggestion: "继续保持这份耐心，但也别太钻牛角尖，如果实在不行，也可以换个思路。",
            equip: "一套轻便且灵活的钓具，让你在调整手法时更加得心应手。"
        },
        {
            title: "实用达人(Practical+Efficient)",
            description: "你是路亚界的实用主义者，拟饵挂底直接剪，鱼轮卡死换备用。不搞那些花里胡哨的，怎么方便怎么来，高效又实在。",
            formula: "(Practical>=13 && Efficient>=13)",
            suggestion: "可以多备一些常用的配件和拟饵，这样在遇到问题时能更快速地解决。",
            equip: "一个装满各种备用配件的渔具盒，让你随时应对突发情况。"
        },
        {
            title: "执着钓者(Patient+Aggressive)",
            description: "不管鱼情好不好，你都死死守在一个钓点，就像坚守着自己的阵地。这份执着，说不定能让你等到那条超级大鱼，成为路亚界的传奇。",
            formula: "(Patient>= 15 && Aggressive>=15)",
            suggestion: "在执着的同时，也可以适当灵活点，换个钓点说不定有意外收获。",
            equip: "一把舒适的钓椅，让你在长时间坚守时不会太累。"
        },
        {
            title: "机智探险家(Aggressive+Prudent)",
            description: "在陌生水域，你就像一个勇敢的探险家，四处走走，换钓点、请教钓友。你这灵活的头脑和探索精神，能让你发现更多的钓鱼宝藏地。",
            formula: "(Aggressive>=13 && Prudent>=11)",
            suggestion: "多和钓友交流经验，分享你的发现，说不定能建立一个属于自己的路亚小圈子。",
            equip: "一个防水的地图和指南针，让你在陌生水域也不会迷路。"
        },
        {
            title: "安全卫士(Prudent+Adaptable)",
            description: "你是路亚世界的安全守护者，狂风大作就找避风处或者回家，鱼轮卡死也不慌。你把安全和理智放在首位，让钓鱼之旅稳稳当当。",
            formula: "(Prudent>=10 && Adaptable>=12)",
            suggestion: "继续保持对安全的重视，在钓鱼前多关注下天气和水域情况。",
            equip: "一件救生衣和一个急救包，为你的安全保驾护航。"
        },
        {
            title: "自力更生者(Bold+Patient)",
            description: "你就像一个全能的工匠，鱼轮卡死自己修。你相信自己的双手，用自己的技能解决问题，在路亚的世界里走出一条属于自己的路。",
            formula: "(Bold>=13 &&Patient>=10)",
            suggestion: "多学习一些渔具维修的知识，让自己的技能更加全面。",
            equip: "一套专业的渔具维修工具，让你在修理渔具时更加得心应手。"
        },
        {
            title: "冷静观察者(Practical+Prudent)",
            description: "当鱼情不好或者遇到突发情况时，你能冷静观察，先思考再行动。你这敏锐的洞察力和冷静的头脑，能让你在复杂的路亚环境中找到最佳的解决方案。",
            formula: "(Practical>=13 && Prudent>=13)",
            suggestion: "继续保持观察和思考的习惯，这会让你在钓鱼中越来越厉害。",
            equip: "一副高倍望远镜，让你能更清楚地观察鱼情和环境。"
        },
        {
            title: "全能路亚侠",
            description: "哇塞，你就是路亚界的超级英雄！在各个方面都表现得非常出色，勇敢、耐心、实用、执着……你就像一个装满了各种技能的百宝箱。不管遇到什么困难和挑战，你都能轻松应对，让路亚之旅变得完美无缺。",
            formula: "true",
            suggestion: "继续保持自己的优势，不断挑战更高难度的路亚环境和目标鱼种。参加一些路亚比赛和交流活动，与其他高手切磋技艺，提升自己的水平。",
            equip: "配备一套顶级的路亚装备，包括高端的钓竿、渔轮、拟饵等，让你在任何情况下都能发挥出最佳水平。再带上一个专业的户外摄影设备，记录下自己精彩的路亚瞬间。"
        }
    ]
};   
const natureAbilityTest = {
  id: 3,
  title: "路亚佬自然应对力测评",
  questions: [
      {
          id: 1,
          text: "暴雨突降时发现巨物炸水，你会？",
          options: [
              {
                  text: "穿着冲锋衣愈战愈勇，大风大浪出大雨",
                  resultKey: [['Storm', 9], ['Gear', 1]],
                  icon: "⚡",
                  remark: "真正的勇士敢于直面暴雨中的GT，水滴是免费的肌力训练"
              },
              {
                  text: "按部就班，丝毫不影响今天的既定节奏",
                  resultKey: [['Data', 7], ['Current', 3]],
                  icon: "📡",
                  remark: "科技是第一生产力，淋雨也要科学淋"
              },
              {
                  text: "找地方躲雨，审阅钓友群消息",
                  resultKey: [['Zen', 8], ['Improv', 2]],
                  icon: "📱",
                  remark: "鱼与熊掌不可兼得，但淋雨和段子可以"
              }
          ]
      },
      {
          id: 2,
          text: "潮水突然暴涨两米，你会？",
          options: [
              {
                  text: "立即转移至高位观测新鱼道",
                  resultKey: [['Current', 8], ['Ecology', 2]],
                  icon: "🌊",
                  remark: "潮起潮落皆是自然给的考卷，您是满分考生"
              },
              {
                  text: "换上沉水铅笔直击底层",
                  resultKey: [['Gear', 6], ['Storm', 4]],
                  icon: "🎣",
                  remark: "水位上涨？正是测试新钓法的好机会"
              },
              {
                  text: "拍照发朋友圈#今日摸鱼#",
                  resultKey: [['Zen', 7], ['Improv', 3]],
                  icon: "📸",
                  remark: "水位可以涨，人设不能崩"
              }
          ]
      },
      {
          id: 3,
          text: "烈日当空鱼口全停时，你会？",
          options: [
              {
                  text: "调整钓组玩微物钓白条",
                  resultKey: [['Improv', 8], ['Gear', 2]],
                  icon: "🎯",
                  remark: "空军是不可能的，这辈子都不可能空军"
              },
              {
                  text: "立即研究水温变化与含氧量的关系",
                  resultKey: [['Data', 7], ['Ecology', 3]],
                  icon: "📊",
                  remark: "此刻您不是钓手，是海洋学家"
              },
              {
                  text: "树荫下开啤酒等晚口期",
                  resultKey: [['Zen', 9], ['Current', 1]],
                  icon: "🍺",
                  remark: "钓鱼的最高境界是愿者上钩"
              }
          ]
      },
      {
          id: 4,
          text: "遇到洄游鱼群突然改道，你会？",
          options: [
              {
                  text: "驾船、驾船追击三公里",
                  resultKey: [['Storm', 8], ['Current', 2]],
                  icon: "🚤",
                  remark: "您不是在钓鱼，是在拍《速度与激情》"
              },
              {
                  text: "分析历史的今天情况预判新路线",
                  resultKey: [['Data', 7], ['Ecology', 3]],
                  icon: "🛰️",
                  remark: "NASA需要您这样的人才"
              },
              {
                  text: "掏出手机点外卖",
                  resultKey: [['Zen', 6], ['Improv', 4]],
                  icon: "🍱",
                  remark: "鱼跑了没关系，饭不能不吃"
              }
          ]
      },
      {
          id: 5,
          text: "夜钓遭遇萤火虫风暴，你会？",
          options: [
              {
                  text: "改用荧光虫形饵趁乱作案",
                  resultKey: [['Improv', 9], ['Gear', 1]],
                  icon: "✨",
                  remark: "自然给的伪装，不用白不用"
              },
              {
                  text: "记录当前详细日期节气，以备来年再战",
                  resultKey: [['Ecology', 7], ['Data', 3]],
                  icon: "📝",
                  remark: "达尔文看了都直呼专业"
              },
              {
                  text: "躺平欣赏自然灯光秀",
                  resultKey: [['Zen', 8], ['Current', 2]],
                  icon: "🛌",
                  remark: "钓鱼？我这是沉浸式生态旅游"
              }
          ]
      }
  ],
  dimensionWeights: {
      Storm: 1.9,    // 极端天气应对
      Current: 1.7,   // 水文变化感知
      Ecology: 2.0,   // 生态链理解
      Gear: 2.0,      // 装备应变
      Data: 1.8,     // 科学分析
      Improv: 1.5,   // 即兴策略
      Zen: 0.95,     // 佛系心态
  },
  results: [
      {
          title: "风暴指挥官（Storm+Current）",
          description: "您是暴雨中的交响乐指挥家！雷声是您的背景乐，闪电是您的舞台灯，十米大浪中照样精准抛投。",
          formula: "Storm>=16 && Current>=15",
          suggestion: "建议承包台风季所有船钓赛事，记得给救生衣系个蝴蝶结",
          equip: "钛合金伞帽 + 防雷击碳素竿 + 声纳泳镜"
      },
      {
          title: "水文博士（Data+Ecology）",
          description: "您眼里流动的不是水，是数据流！连河蚌开合频率都能算出斐波那契数列，鱼群在您这没有隐私可言。",
          formula: "Data>=19 && Ecology>=15",
          suggestion: "该考虑给流域管理局开发智能预警系统了",
          equip: "量子波动测深仪 + 鳗鱼皮数据手册"
      },
      {
          title: "装备魔术师（Gear+Improv）",
          description: "给您一根铁丝都能变出路亚神饵！总能在绝境中开发出匪夷所思的钓组，厂家看了都想请您当顾问。",
          formula: "Gear>=13 && Improv>=13",
          suggestion: "开个直播教钓友用奶茶吸管做波爬",
          equip: "万能工具钳 + 502胶水 + 脑洞补给包"
      },
      {
          title: "生态黑客（Ecology+Data）",
          description: "您掌握着水域生态的后门密码！知道什么时候该在饵料里加咖啡因，什么时候要喷古龙水迷惑鱼群。",
          formula: "Ecology>=15 && Data>=12",
          suggestion: "建议成立反电鱼特攻队，您当技术顾问",
          equip: "仿生信息素发射器 + 水下监听耳机"
      },
      {
          title: "追流者（Current+Storm）",
          description: "您是天生的弄潮儿！别人避之不及的激流在您眼里是天然传送带，专送大鱼到跟前。",
          formula: "Current>=19 && Storm>=12",
          suggestion: "可以考虑报名漂流世界杯跨界发展",
          equip: "流体动力学钓箱 + 逆流专用铁板"
      },
      {
          title: "科学狂人（Data+Gear）",
          description: "您的钓箱里装着微型实验室！每次抛竿都是对照组实验，鱼获都是科研成果。",
          formula: "Data>=17 && Gear>=14",
          suggestion: "该申请国家自然科学基金了",
          equip: "电子应变片钓竿 + 数据手套"
      },
      {
          title: "佛系钓圣（Zen+Improv）",
          description: "您已参透钓鱼禅机！挂底是缘分，空军是修行，十斤巨物咬钩还能淡定发朋友圈先。",
          formula: "Zen>=22",
          suggestion: "建议开班授课《论空军的十种美学价值》",
          equip: "随便折根树枝都是因果钓竿"
      },
      {
          title: "即兴诗人（Improv+Zen）",
          description: "您把意外变成艺术！断线能改飞蝇钓，挂树转型岸抛铁板，钓不到鱼还能写三百行叙事诗。",
          formula: "Improv>=19 && Zen>=10",
          suggestion: "出本《钓鱼事故文学集》吧",
          equip: "多功能魔术贴腰带 + 灵感记录板"
      },
      {
          title: "全境猎手（Storm+Ecology）",
          description: "您是天灾级的捕食者！台风眼中心都能找到鱼道，火山湖里照钓不误。",
          formula: "Storm>=14 && Ecology>=16",
          suggestion: "建议参与末日片拍摄当技术指导",
          equip: "灾害预警手表 + 岩浆抗性钓线"
      },
      {
          title: "量子钓者（Current+Data）",
          description: "您眼中万物皆是概率云！能同时存在于所有标点，直到收竿那刻才坍缩成现实。",
          formula: "Current>=16 && Data>=16",
          suggestion: "该考虑量子纠缠绑钩法专利申请了",
          equip: "薛定谔的钓箱（打开前永远有鱼）"
      },
      {
          title: "自然共生体（保底结果）",
          description: "您就是生态系统的人形终端！蚊子不叮咬，水蛭让道走，站哪哪出鱼，堪称人形打窝机。",
          formula: "true",
          suggestion: "建议成立路亚教派，您当现世神",
          equip: "随便捡片落叶都是神饵"
      }
  ]
};
const juece = {
    "id": 4,
    "title": "作钓决策风格测试",
    "questions": [
        {
            "id": 1,
            "text": "面对不熟悉的钓点，你的第一步是？",
            "options": [
                {
                    "text": "立即开抛，不中鱼就换点！",
                    "resultKey": [["Aggressive", 8], ["Adaptive", 2]],
                    "icon": "🎯"
                },
                {
                    "text": "先观察水流、温度，再决定策略",
                    "resultKey": [["Analytical", 7], ["Patient", 3]],
                    "icon": "🔍"
                },
                {
                    "text": "翻开潮汐表、气象数据，制定作钓计划",
                    "resultKey": [["Strategic", 6], ["Data", 4]],
                    "icon": "📊"
                }
            ]
        },
        {
            "id": 2,
            "text": "目标鱼种突然不咬，你的应对方式是？",
            "options": [
                {
                    "text": "换饵换钓法，狂轰滥炸试到底！",
                    "resultKey": [["Aggressive", 6], ["Experimental", 4]],
                    "icon": "🎣"
                },
                {
                    "text": "耐心等待窗口期，相信自己的判断",
                    "resultKey": [["Patient", 5.5], ["Analytical", 4.5]],
                    "icon": "🕰"
                },
                {
                    "text": "回看天气、气压、历史数据，调整策略",
                    "resultKey": [["Data", 7], ["Strategic", 3]],
                    "icon": "📈"
                }
            ]
        },
        {
            "id": 3,
            "text": "你如何决定今天用什么饵？",
            "options": [
                {
                    "text": "翻开作钓日记，看往年同样天气的数据",
                    "resultKey": [["Data", 8], ["Strategic", 2]],
                    "icon": "📓"
                },
                {
                    "text": "先试几款最有信心的饵，再视情况调整",
                    "resultKey": [["Adaptive", 7], ["Experimental", 3]],
                    "icon": "🔄"
                },
                {
                    "text": "随缘挑一款，反正钓鱼主要是放松",
                    "resultKey": [["Casual", 6.5], ["Patient", 3.5]],
                    "icon": "🌿"
                }
            ]
        },
        {
            "id": 4,
            "text": "作钓时间分配策略？",
            "options": [
                {
                    "text": "按潮汐、天气精准计算作钓时段",
                    "resultKey": [["Strategic", 7], ["Data", 3]],
                    "icon": "⏰"
                },
                {
                    "text": "先观察现场环境，灵活调整计划",
                    "resultKey": [["Analytical", 6], ["Adaptive", 4]],
                    "icon": "👀"
                },
                {
                    "text": "看心情决定，随缘而行",
                    "resultKey": [["Casual", 8], ["Patient", 2]],
                    "icon": "😌"
                }
            ]
        },
        {
            "id": 5,
            "text": "如何看待钓获分享？",
            "options": [
                {
                    "text": "精心编辑，详细分析每一次收获",
                    "resultKey": [["Data", 6], ["Analytical", 4]],
                    "icon": "📝"
                },
                {
                    "text": "晒图为主，偶尔配上幽默点评",
                    "resultKey": [["Casual", 7], ["Adaptive", 3]],
                    "icon": "📸"
                },
                {
                    "text": "口头分享，现场体验最真实",
                    "resultKey": [["Experimental", 5], ["Patient", 5]],
                    "icon": "💬"
                }
            ]
        }
    ],
    "dimensionWeights": {
        "Aggressive": 1.4,
        "Strategic": 1.5,
        "Data": 1.1,
        "Analytical": 1.3,
        "Adaptive": 1.3,
        "Patient": 1.5,
        "Experimental": 1.8,
        "Casual": 1,
    },
    "results": [
        {
            "title": "战术狂徒（Aggressive）",
            "description": "你的作钓风格就是‘猛冲猛打’，不断尝试，直到找到鱼的弱点。你的钓箱里永远装满了各种饵，你的座右铭是‘换饵就是换思路’！",
            "formula": "Aggressive >= 17",
            "suggestion": "尝试将攻击性作钓与精细化调整结合，优化中鱼率！",
            "equip": "选择响应迅速的钓竿和高速比渔轮，确保频繁调整的效率。"
        },
        {
            "title": "数据军师（Data）",
            "description": "你的作钓风格建立在数据的海洋上，潮汐、气温、气压……你是钓鱼界的Excel达人！",
            "formula": "Data >= 20",
            "suggestion": "继续优化你的数据系统，并结合现场观察，提高综合判断力！",
            "equip": "智能渔轮、气象仪、记录仪，让数据成为你的第二双眼睛。"
        },
        {
            "title": "随机钓士（Casual）",
            "description": "你享受钓鱼的过程，不拘泥于结果。天气合适就钓，心情好就甩几竿，讲究一个‘佛系’。",
            "formula": "Casual >= 17",
            "suggestion": "享受钓鱼的同时，也可以尝试一些新的钓法，增加乐趣！",
            "equip": "一套简单易用的钓组，重点是舒适！"
        },
        {
            "title": "策略大师（Strategic + Data）",
            "description": "你像一位将军，擅长布局。每一次抛竿都是精心计算后的结果，鱼群在你面前无处可逃。",
            "formula": "Strategic >= 14 && Data >= 14",
            "suggestion": "结合实践经验和数据，让你的策略更具适应性！",
            "equip": "高端探测设备，帮助你精准锁定目标鱼。"
        },
        {
            "title": "观察大师（Analytical）",
            "description": "你以敏锐的观察力捕捉每一个微妙信号，是钓场上的福尔摩斯。你总能发现别人忽略的细节，让每次作钓都成为一场智慧的较量。",
            "formula": "Analytical >= 17",
            "suggestion": "试着记录下每次观察到的细节，找出潜在的钓鱼规律，提升作钓决策的精确性。",
            "equip": "一款高倍望远镜和详细的环境记录本，让你的观察更上一层楼。"
        },
        {
            "title": "柔性变通者（Adaptive）",
            "description": "你灵活变通，善于根据现场情况迅速调整策略。无论遇到何种突发状况，你总能从容应对，转危为机。",
            "formula": "Adaptive >= 15",
            "suggestion": "保持这种灵活性，同时尝试结合一些数据分析，或许能让你的决策更具说服力。",
            "equip": "选择操作便捷、易于调节的钓具，助你快速适应不同作钓场景。"
        },
        {
            "title": "耐心老钓（Patient）",
            "description": "你拥有罕见的耐心，总能在漫长的等待中找到属于你的那份平静。你的作钓风格更像是一种艺术，时间在你这里仿佛都静止了。",
            "formula": "Patient >= 17",
            "suggestion": "耐心是一种美德，但适时的决策调整也同样重要。保持平和心态的同时，不妨偶尔尝试些大胆策略。",
            "equip": "一套舒适、稳重的钓具，配合长时间作钓的坐椅，帮你在等待中保持最佳状态。"
        },
        {
            "title": "实验先行者（Experimental）",
            "description": "你对钓鱼充满好奇，每次作钓都是一场实验。你勇于打破常规，用新的方式探索未知，总能带来意想不到的惊喜。",
            "formula": "Experimental >= 16",
            "suggestion": "鼓励你继续进行各种实验，但别忘了记录数据，以便总结出属于自己的独家作钓秘籍。",
            "equip": "一套多功能实验装备，包括各式新奇饵料和可调试的钓具，为你的实验提供保障。"
        },
        {
            "title": "数据狂热者（Data & Experimental）",
            "description": "你将数据与实验完美融合，通过对数据的深入分析和不断的实验优化，每一次作钓都充满科学的魅力。",
            "formula": "(Data >= 10 && Experimental >= 7)",
            "suggestion": "试着构建一个系统的数据记录与反馈机制，不断验证和改进你的作钓策略。",
            "equip": "智能钓具和数据记录仪器将成为你的得力助手，助你在实验中不断突破。"
        },
        {
            "title": "全能勇士（All-Rounder）",
            "description": "你是钓鱼场上的全能战士，无论是数据分析、策略制定还是现场应变，你都能游刃有余。每一次作钓都证明了你的多面手实力。",
            "formula": "true",
            "suggestion": "继续保持全面的作钓风格，不断挑战自我，迎接更多未知的钓鱼场景！",
            "equip": "多功能全能钓具，满足各种作钓需求，让你无论面对怎样的水域，都能轻松取胜。"
        }
    ]
};
const fishingKnowledgeTest = {
    id: 5,
    title: "钓鱼知识获取偏好",
    questions: [
        {
            id: 1,
            text: "当你想要学习新的路亚拟饵使用技巧时，你会？",
            options: [
                {
                    text: "观看知名路亚钓鱼博主的教学视频",
                    resultKey: [
                        ['Digital',7],  // 合并 Online+Visual+Community
                        ['Exploratory',3]
                    ],
                    icon: "📺"
                },
                {
                    text: "阅读专业的路亚钓鱼书籍和杂志",
                    resultKey: [
                        ['Traditional',7], // 合并 Print+Text
                        ['Analytical',3]
                    ],
                    icon: "📖"
                },
                {
                    text: "线下和路亚高手面对面交流",
                    resultKey: [
                        ['Social',6],      // 合并 Offline+Interactive
                        ['Practical',4]
                    ],
                    icon: "🏫"
                }
            ]
        },
        {
            id: 2,
            text: "在选择路亚钓鱼装备时，你通过什么途径了解产品信息？",
            options: [
                {
                    text: "在路亚钓鱼论坛和社群中查看其他钓友的评价和推荐",
                    resultKey: [
                        ['Digital',7],
                        ['Social',3]
                    ],
                    icon: "💬"
                },
                {
                    text: "咨询专业的路亚钓具店老板",
                    resultKey: [
                        ['Expert',7],    // 独立维度
                        ['Practical',3]
                    ],
                    icon: "👨‍💼"
                },
                {
                    text: "自己研究产品的参数和性能，对比不同品牌",
                    resultKey: [
                        ['Analytical',6], // 合并 Research+Data
                        ['Exploratory',4]
                    ],
                    icon: "🔍"
                }
            ]
        },
        {
            id: 3,
            text: "当你遇到路亚钓鱼中的难题时，你会？",
            options: [
                {
                    text: "在社交媒体上发布求助帖，寻求其他钓友的帮助",
                    resultKey: [
                        ['Digital',7],
                        ['Social',3]
                    ],
                    icon: "📢"
                },
                {
                    text: "查阅自己收藏的路亚钓鱼资料和笔记",
                    resultKey: [
                        ['Traditional',6],
                        ['Analytical',4]
                    ],
                    icon: "🗄️"
                },
                {
                    text: "亲自去钓鱼现场，尝试不同的方法解决问题",
                    resultKey: [
                        ['Practical',7],
                        ['Exploratory',3]
                    ],
                    icon: "🎣"
                }
            ]
        },
        {
            id: 4,
            text: "你平时获取路亚钓鱼资讯的频率是？",
            options: [
                {
                    text: "每天都会花时间关注",
                    resultKey: [
                        ['Digital',8],
                        ['Exploratory',2]
                    ],
                    icon: "⏰"
                },
                {
                    text: "每周固定时间查看",
                    resultKey: [
                        ['Traditional',7],
                        ['Analytical',3]
                    ],
                    icon: "📅"
                },
                {
                    text: "遇到问题才去查找",
                    resultKey: [
                        ['Practical',5],
                        ['Reactive',5]  // 新增维度
                    ],
                    icon: "❓"
                }
            ]
        },
        {
            id: 5,
            text: "对于新出现的路亚钓鱼技术和趋势，你会？",
            options: [
                {
                    text: "第一时间学习和尝试",
                    resultKey: [
                        ['Exploratory',7],
                        ['Practical',3]
                    ],
                    icon: "🚀"
                },
                {
                    text: "观察一段时间，等大家反馈后再决定是否学习",
                    resultKey: [
                        ['Analytical',7],
                        ['Social',3]
                    ],
                    icon: "👀"
                },
                {
                    text: "不太在意，坚持自己熟悉的方法",
                    resultKey: [
                        ['Traditional',2],
                        ['Reactive',8]
                    ],
                    icon: "📌"
                }
            ]
        }
    ],
    // 维度权重配置矩阵（7个核心维度）
    dimensionWeights: {
        Digital: 1.2,      // 覆盖所有线上行为
        Traditional: 1.2,  // 传统学习方式
        Social: 1.35,      // 社交互动相关
        Practical: 1.45,    // 实践应用
        Analytical: 1.35,  // 数据分析
        Exploratory: 1.6,  // 探索创新
        Reactive: 1.62      // 被动响应
    },
    // 复合结果判定规则
    results: [
        {
        title: "数字先锋（Digital）",
        description: "具备典型的技术依赖型人格特征（心理学中的高神经质倾向）。擅长利用现代科技手段获取信息，对卫星地图、水文监测系统等数字工具的使用频率显著高于平均水平。偏好通过数据可视化（如水温曲线、潮汐预测）制定作钓策略。",
        formula: "Digital >= 19",
        suggestion: "参与《智能钓鱼设备应用》专项培训，考取无人机遥感操作证书。建立个人作钓数据库，通过 SPSS 分析历史数据规律。",
        equip: "智能钓鱼手表（支持 4G 数据传输）+ 便携式水下声呐探测仪"
        },
        {
        title: "传统学者（Traditional）",
        description: "表现出明显的保守型认知风格（心理学中的高尽责性倾向）。对传统钓法的研究深度达到行业平均水平的 3.2 倍，古籍阅读量占知识获取总量的 67%。擅长将历史文献中的经验转化为现代作钓技巧。",
        formula: "Traditional >= 17",
        suggestion: "申请国家非物质文化遗产钓具保护项目，参与《中国古代渔具图谱》编纂工作。建立传统钓法教学示范基地。",
        equip: "黄花梨鱼竿收藏架 + 手工蚕丝钓线套装 + 青铜古法打窝器"
        },
        {
        title: "社交实践家（Social+Practical）",
        description: "具有突出的外向型社交特质（心理学中的高外向性倾向）。平均每次作钓组织规模达 15-20 人，教学时长占比达 41%。擅长通过实践演示传播钓鱼知识，语言表达能力较行业均值高 28%。",
        formula: "(Social>= 12 && Practical >= 10)",
        suggestion: "考取钓鱼培训师资格认证，开发《30 天钓鱼速成》课程体系。建立钓友互助平台，设计积分制技能交换系统。",
        equip: "多功能教学折叠桌 + 防水教学平板电脑 + 智能钓友定位手环"
        },
        {
        title: "数据分析师（Analytical）",
        description: "呈现典型的分析型思维模式（心理学中的高开放性倾向）。作钓数据记录完整度达 92%，擅长构建数学模型预测鱼情。对环境变量（气压、水温）的敏感度较普通钓友高 40%。",
        formula: "Analytical >= 16",
        suggestion: "参与《渔业大数据应用》学术研讨会，开发钓鱼 AI 预测系统。在核心期刊发表《基于机器学习的鱼类行为分析》。",
        equip: "便携式气象站 + 智能鱼情分析终端 + 高精度水质检测仪"
        },
        {
        title: "创新探索者（Exploratory）",
        description: "展现强烈的创新型人格特质（心理学中的高冒险性倾向）。每年尝试新钓法数量超过 12 种，钓具改装成功率达 68%。对新材料、新技术的接受速度是行业平均的 2.3 倍。",
        formula: "Exploratory >= 15",
        suggestion: "加入钓具研发实验室，申请新型实用专利。参与《未来钓鱼科技》国际论坛，推动跨界技术融合。",
        equip: "微型 3D 打印装置 + 智能材料试验机 + 水下机器人操控台"
        },
        {
        title: "应变大师（Reactive）",
        description: "具备优异的情境适应能力（心理学中的高灵活性倾向）。突发状况处理速度较普通钓友快 35%，平均携带应急工具种类达 18 种。擅长利用环境资源进行钓具临时改造。",
        formula: "Reactive >= 13",
        suggestion: "考取野外生存急救证书，开发《钓鱼应急处理》在线课程。设计模块化应急钓具包，建立钓友互助救援网络。",
        equip: "战术多功能马甲 + 纳米修复喷雾 + 智能应急通讯器"
        },
        {
        title: "全能钓手（All-Rounder）",
        description: "呈现复合型人格特征。传统与现代钓法掌握度均超过 85%，跨场景作钓成功率达 79%。具备将不同流派技术融合创新的能力，形成独特的个人作钓体系。",
        formula: "true",
        suggestion: "参加世界钓鱼锦标赛全能组赛事，建立跨领域技术交流平台。开发《钓鱼技能矩阵评估体系》，推动行业标准化建设。",
        equip: "智能模块化钓箱 + 全频段鱼情监测系统 + 多场景切换钓具套装"
        }
        ]
};
const yuhuochuli = {
    id: 6,
    title: "鱼获处理方式偏好",
    questions: [
        {
            id: 1,
            text: "当钓到一条大鱼后，你首先会？",
            options: [
                {
                    text: "迅速拍照发朋友圈炫耀，然后放生",
                    resultKey: [
                        ["Showoff", 7],
                        ["Social", 3]
                    ],
                    icon: "📸"
                },
                {
                    text: "小心翼翼地把鱼放进鱼护/鱼扣，准备带回家烹饪",
                    resultKey: [
                        ["Gourmet", 8],
                        ["Collector", 2]
                    ],
                    icon: "🎣"
                },
                {
                    text: "先仔细观察鱼的品种和特征，再决定处理方式",
                    resultKey: [
                        ["Research", 6],
                        ["Observe", 4]
                    ],
                    icon: "🔍"
                }
            ]
        },
        {
            id: 2,
            text: "如果鱼获很多，你会？",
            options: [
                {
                    text: "把大部分鱼放生，只索取几条",
                    resultKey: [
                        ["Conservation", 7],
                        ["Showoff", 3]
                    ],
                    icon: "🌊"
                },
                {
                    text: "全部烹饪并邀请朋友一起尝个鲜",
                    resultKey: [
                        ["Gourmet", 8],
                        ["Social", 2]
                    ],
                    icon: "👥"
                },
                {
                    text: "拿几条适合饲养的回家",
                    resultKey: [
                        ["Observe", 6],
                        ["Collector", 4]
                    ],
                    icon: "📚"
                }
            ]
        },
        {
            id: 3,
            text: "处理鱼获时，你更注重？",
            options: [
                {
                    text: "鱼的外观完整，便于拍照展示",
                    resultKey: [
                        ["Showoff", 8],
                        ["Conservation", 2]
                    ],
                    icon: "📷"
                },
                {
                    text: "鱼的新鲜度和口感，为烹饪做准备",
                    resultKey: [
                        ["Gourmet", 7],
                        ["Collector", 3]
                    ],
                    icon: "🍲"
                },
                {
                    text: "遵循环保原则，减少对鱼的伤害",
                    resultKey: [
                        ["Conservation", 6],
                        ["Research", 4]
                    ],
                    icon: "🌱"
                }
            ]
        },
        {
            id: 4,
            text: "当钓到稀有鱼种时，你会？",
            options: [
                {
                    text: "立即联系渔业部门报备，然后放生",
                    resultKey: [
                        ["Conservation", 8],
                        ["Research", 2]
                    ],
                    icon: "📞"
                },
                {
                    text: "制作成标本收藏起来",
                    resultKey: [
                        ["Collector", 7],
                        ["Research", 3]
                    ],
                    icon: "🦴"
                },
                {
                    text: "详细记录鱼的信息，拍照后放生",
                    resultKey: [
                        ["Research", 6],
                        ["Conservation", 4]
                    ],
                    icon: "📝"
                }
            ]
        },
        {
            id: 5,
            text: "对于鱼获的去向，你更倾向于？",
            options: [
                {
                    text: "送给亲戚朋友邻里街坊",
                    resultKey: [
                        ["Social", 8],
                        ["Showoff", 2]
                    ],
                    icon: "🤝"
                },
                {
                    text: "拍摄鱼获美照到互联网上炫耀、对比",
                    resultKey: [
                        ["Showoff", 8],
                        ["Social", 2]
                    ],
                    icon: "🏆"
                },
                {
                    text: "自己慢慢品尝，享受钓鱼的成果",
                    resultKey: [
                        ["Gourmet", 7],
                        ["Collector", 3]
                    ],
                    icon: "😋"
                }
            ]
        }
    ],
    dimensionWeights: {
        Showoff: 1.3,//炫耀
        Conservation: 1.58,//保护
        Gourmet: 1.45,//美食
        Collector: 1.3,//收集
        Research: 1.75,//研究
        Social: 1.5,//社交
        Observe: 1.12,//观察
    },
    results: [
        {
            title: "炫技日常（Showoff）",
            description: "你就像钓鱼圈的明星，钓到鱼后不勾引其他钓友那简直比没钓到鱼还难受！每次鱼获都要全方位展示，恨不得让全世界都知道你是钓鱼小能手。你就是钓鱼场上的焦点，闪光灯下的王者！",
            formula: "Showoff >= 21",
            suggestion: "可以多参加一些钓鱼摄影比赛，把你的鱼获美照展示给更多人。同时，也可以分享一些钓鱼技巧，让你的炫耀更有内涵。",
            equip: "配备一台高清相机，记录每一个精彩瞬间。再准备一些漂亮的鱼获展示道具，让你的照片更加出彩。"
        },
        {
            title: "环保卫士（Conservation）",
            description: "你是大自然的守护者，钓鱼只是你与大自然互动的方式，鱼获的最终归宿大多是回归自然。你深知生态平衡的重要性，用实际行动保护着钓鱼资源，是钓鱼界的环保楷模！",
            formula: "Conservation >= 25",
            suggestion: "可以加入一些环保钓鱼组织，参与更多的渔业保护活动。学习更多的鱼类知识，更好地保护它们的生存环境。",
            equip: "选择无倒刺鱼钩，减少对鱼的伤害。准备一个放生网，让鱼能够安全地回到水中。"
        },
        {
            title: "美食家（Gourmet）",
            description: "你把钓鱼当成了寻找美食的旅程，每一条鱼都是你餐桌上的美味佳肴。你对鱼的烹饪方法了如指掌，能把鱼做成各种美味。在你眼中，钓鱼不仅仅是乐趣，更是一场美食盛宴！",
            formula: "Gourmet >= 23",
            suggestion: "可以尝试一些新的鱼类烹饪方法，参加美食交流活动，分享你的烹饪心得。也可以根据不同的鱼种搭配不同的调料，让你的美食更加丰富多样。",
            equip: "准备一套专业的厨房刀具和烹饪器具，确保能够完美地处理鱼获。再买一些优质的调料，提升鱼的口感。"
        },
        {
            title: "收藏家（Collector）",
            description: "你对鱼获有着特殊的感情，喜欢把它们变成永久的纪念。制作标本、分类存放，每一条鱼都承载着你的回忆。你就像一个钓鱼博物馆馆长，守护着自己的鱼获宝藏！",
            formula: "Collector >= 14 && Research >= 14",
            suggestion: "可以学习一些专业的标本制作技术，让你的鱼标本更加精美。也可以参加一些标本展览活动，与其他收藏家交流经验。",
            equip: "购买一些标本制作工具和材料，如标本架、防腐剂等。再准备一个专门的展示柜，展示你的鱼获标本。"
        },
        {
            title: "研究员（Research）",
            description: "你对鱼的世界充满了好奇，每钓到一条鱼都要研究一番。从鱼的品种、特征到生活习性，你都了如指掌。你是钓鱼界的科学家，用知识武装自己，探索钓鱼的奥秘！",
            formula: "Research >= 23",
            suggestion: "可以发表一些关于鱼类研究的文章，与其他钓友分享你的研究成果。也可以参加一些渔业科研项目，为鱼类保护和研究做出贡献。",
            equip: "准备一本专业的鱼类图鉴和记录笔记本，方便你随时记录和查阅鱼的信息。再配备一些简单的测量工具，如卡尺、天平，用于测量鱼的大小和重量。"
        },
        {
            title: "社交达人（Social）",
            description: "钓鱼对你来说不仅是个人爱好，更是社交活动。你喜欢和朋友一起分享钓鱼的快乐，一起烹饪鱼获，享受社交的乐趣。你是钓鱼圈的人气王，有你在的地方就有欢声笑语！",
            formula: "Social >= 15 && Gourmet >= 11",
            suggestion: "可以组织更多的钓鱼聚会和活动，邀请更多的钓友参加。也可以建立一个钓鱼社交群，方便大家交流和分享。",
            equip: "准备一套适合多人使用的钓鱼装备和烹饪工具，如多人帐篷、烧烤架等。再准备一些饮料和小吃，让聚会更加愉快。"
        },
        {
            title: "观察者（Observe）",
            description: "你有着敏锐的观察力，总能从鱼获中发现别人忽略的细节。你就像钓鱼界的福尔摩斯，通过观察鱼的每一个特征来推断它们的生存状态。",
            formula: "Observe >= 10 && Research >= 10",
            suggestion: "可以练习速写或摄影技能，更准确地记录鱼获特征。也可以参与鱼类观察研究项目，将你的观察技能发挥到极致。",
            equip: "准备一个便携式显微镜和测光仪，用于更细致地观察鱼获。再带一本速写本，随时记录观察结果。"
        },
        {
            title: "均衡路亚人（Multi-Dimension）",
            description: "你是一个全面发展的钓鱼高手，在鱼获处理方面展现出惊人的多样性。无论是炫耀、烹饪还是科研，你都能找到最适合的处理方式。",
            formula: "true",
            suggestion: "继续保持多元化的处理方式，根据不同的钓鱼场景灵活调整策略。可以尝试开发自己的鱼获处理系统，形成独特的风格。",
            equip: "配备一套完整的钓鱼工具包，包含展示、烹饪、研究等多种用途的装备，满足不同场景的需求。"
        }
    ]
};
const baoyang = {
    id: 7,
    title: "装备保养习惯分析",
    questions: [
        {
            id: 1,
            text: "作钓结束后，你对钓竿的处理方式是？",
            options: [
                {
                    text: "立即用清水冲洗，仔细擦干后涂抹保养油，再放入竿套",
                    resultKey: [
                        ['Careful', 7],
                        ['Tech', 3]
                    ],
                    icon: "🧼"
                },
                {
                    text: "简单用布擦一擦，就随意放在角落",
                    resultKey: [
                        ['Casual', 5],
                        ['Lazy', 5]
                    ],
                    icon: "😴"
                },
                {
                    text: "先不管，等下次作钓前再处理",
                    resultKey: [
                        ['Lazy', 7],
                        ['Risky', 3]
                    ],
                    icon: "🕒"
                }
            ]
        },
        {
            id: 2,
            text: "对于渔轮，你多久进行一次保养？",
            options: [
                {
                    text: "每次作钓后都拆开清洗、上油",
                    resultKey: [
                        ['Tech', 5],
                        ['Careful', 5]
                    ],
                    icon: "🔧"
                },
                {
                    text: "每季度保养一次",
                    resultKey: [
                        ['Routine', 7],
                        ['Safety', 3]
                    ],
                    icon: "📅"
                },
                {
                    text: "直到渔轮出问题才保养",
                    resultKey: [
                        ['Lazy', 7],
                        ['Risky', 3]
                    ],
                    icon: "🚨"
                }
            ]
        },
        {
            id: 3,
            text: "鱼线使用一段时间后，你会？",
            options: [
                {
                    text: "定期检查磨损情况，及时更换",
                    resultKey: [
                        ['Careful', 5],
                        ['Safety', 5]
                    ],
                    icon: "👀"
                },
                {
                    text: "等鱼线断了再换",
                    resultKey: [
                        ['Routine', 8],
                        ['Lazy', 2]
                    ],
                    icon: "💥"
                },
                {
                    text: "不管它，能用就行",
                    resultKey: [
                        ['Casual', 7],
                        ['Risky', 3]
                    ],
                    icon: "🙈"
                }
            ]
        },
        {
            id: 4,
            text: "当你的假饵有损坏时，你会？",
            options: [
                {
                    text: "马上修复或更换新的假饵",
                    resultKey: [
                        ['Tech', 7],
                        ['Careful', 3]
                    ],
                    icon: "🛠️"
                },
                {
                    text: "继续使用，直到完全不能用",
                    resultKey: [
                        ['Risky', 7],
                        ['Casual', 3]
                    ],
                    icon: "💪"
                },
                {
                    text: "看心情决定是否修复",
                    resultKey: [
                        ['Casual', 7],
                        ['Lazy', 3]
                    ],
                    icon: "😜"
                }
            ]
        },
        {
            id: 5,
            text: "你存放钓具的地方是？",
            options: [
                {
                    text: "专门的钓具收纳柜，分类摆放整齐",
                    resultKey: [
                        ['Safety', 5],
                        ['Routine', 5]
                    ],
                    icon: "🗄️"
                },
                {
                    text: "随意堆放在车库或角落",
                    resultKey: [
                        ['Casual', 5],
                        ['Risky', 5]
                    ],
                    icon: "🗑️"
                },
                {
                    text: "放在渔具包里，扔在一边",
                    resultKey: [
                        ['Casual', 7],
                        ['Lazy', 3]
                    ],
                    icon: "🎒"
                }
            ]
        }
    ],
    dimensionWeights: {
        Careful: 1.45,
        Tech: 1.45,
        Lazy: 1.1,
        Routine: 1.25,
        Risky: 1,
        Safety: 1.5,
        Casual: 1,
    },
    // 复合结果判定规则
    results: [
        {
            title: "装备守护神（Careful）",
            formula: "Careful >= 21",
            description: "你简直就是钓具的守护神！对装备的保养无微不至，每一个细节都不放过。在你眼中，钓具不仅仅是工具，更是并肩作战的战友。有你这样的呵护，钓具们都能超长待机，陪你征战无数钓场！",
            suggestion: "继续保持你的细心和专业，不过偶尔也可以尝试一些新的保养方法和产品，让装备得到更好的呵护。",
            equip: "选择高品质的保养工具和产品，如专业的竿子清洁剂、渔轮保养套装等，为装备提供全方位的保护。"
        },
        {
            title: "技术保养大师（Tech）",
            formula: "Tech >= 16",
            description: "你是技术流的保养大师！对钓具的结构和原理了如指掌，每次保养都像是一场精密的手术。在你的操作下，钓具们不仅能恢复活力，还能提升性能。鱼群在你这专业的装备面前，根本无处可逃！",
            suggestion: "可以多参加一些钓具保养的交流活动，和其他钓友分享你的经验和技巧，同时也学习一些新的知识。",
            equip: "配备专业的保养工具，如高精度的螺丝刀、卡尺等，让你的保养工作更加精准高效。"
        },
        {
            title: "随性保养达人（Casual）",
            description: "你是随性的保养达人！对装备的保养没有太多的条条框框，一切随心而为。虽然有时候看起来有些随意，但也能让装备保持基本的状态。说不定这种随性的态度，也能给你带来意想不到的好运呢！",
            formula: "Casual >= 18",
            suggestion: "可以适当增加一些保养的频率和细节，让装备的状态更加稳定。同时，也可以整理一下钓具的存放方式，让它们更加有序。",
            equip: "选择一些简单易用的保养产品，如多功能的清洁剂、润滑剂等，方便你随时进行保养。"
        },

        {
            title: "规律保养者（Routine）",
            description: "你是规律的保养者！严格按照计划对装备进行保养，就像时钟一样精准。在你的规律呵护下，钓具们始终保持着良好的状态，随时准备陪你出发。有这样的装备，你还怕钓不到鱼吗？",
            formula: "Routine >= 16",
            suggestion: "可以根据不同的季节和作钓环境，调整你的保养计划，让装备更好地适应各种情况。",
            equip: "选择一些适合长期使用的保养产品，如长效的润滑剂、防腐剂等，确保装备在长时间内都能得到保护。"
        },
        {
            title: "冒险保养侠（Risky）",
            description: "你是个冒险的保养侠！总是在挑战装备的极限，直到出现问题才会采取行动。虽然这种冒险精神有时候能让你节省一些时间和精力，但也可能会让你失去一些好机会。下次还是多关心一下你的装备吧！",
            formula: "Risky >= 14",
            suggestion: "在作钓前，多检查一下装备的状态，及时发现潜在的问题。同时，准备一些备用的装备，以防万一。",
            equip: "选择一些质量可靠、抗造的钓具，降低因装备问题带来的风险。"
        },
        {
            title: "安全第一卫士（Safety）",
            description: "你是安全第一的卫士！对装备的安全性非常重视，总是提前做好预防措施。在你眼中，只有装备安全可靠，才能让你安心作钓。有你这样的态度，鱼群肯定会被你的严谨所折服！",
            formula: "Safety >= 16",
            suggestion: "可以学习一些急救知识，当装备出现紧急情况时，能够及时进行处理。同时，也可以和其他钓友分享你的安全经验，让大家都能享受安全的作钓时光。",
            equip: "选择一些具有安全保障的钓具，如带有防滑设计的手柄、防腐蚀的材质等，确保你的安全。"
        },
        {
            title: "精细保养学者（Careful+Tech）",
            description: "你既是精细的保养学者，又是技术高超的保养大师！将细心和专业完美结合，对装备进行全方位的呵护。在你的精心照料下，钓具们就像一件件艺术品，不仅美观，而且性能卓越。鱼群在这样的装备面前，只能乖乖投降！",
            formula: "Careful >= 14 && Tech >= 14",
            suggestion: "可以尝试自己动手改造一些钓具，让它们更加符合你的需求。同时，也可以参加一些钓具制作的培训课程，提升自己的技能。",
            equip: "选择高端、定制化的钓具，让你的装备更加独特和专业。"
        },
        {
            title: "随性规律玩家（Casual+Routine）",
            description: "你是随性与规律的完美结合体！既有着随性的态度，又能保持一定的规律。在保养装备时，既能享受轻松的过程，又能让装备得到适当的照顾。这种平衡的状态，让你在钓鱼界独树一帜！",
            formula: "Casual >= 12 && Routine >= 12",
            suggestion: "可以根据自己的心情和时间，灵活调整保养计划。同时，也可以尝试一些新的钓具和保养方法，让自己的作钓体验更加丰富。",
            equip: "选择一些时尚、实用的钓具，让你的装备既能满足功能需求，又能展现你的个性。"
        },
        {
            title: "安全细心守护者（Safety+Careful）",
            formula: "Safety >= 14 && Careful >= 14",
            description: "你是安全与细心的守护者！对装备的安全性和细节都非常关注，总是能提前发现并解决问题。在你的守护下，钓具们就像被穿上了一层坚固的铠甲，能够抵御各种挑战。有你这样的守护者，钓鱼之旅肯定会一帆风顺！",
            suggestion: "可以分享一些安全和保养的知识给其他钓友，让大家都能提高安全意识。同时，也可以关注一些最新的安全和保养技术，让自己的装备始终保持领先水平。",
            equip: "选择一些具有高科技含量的安全和保养产品，如智能的监测设备、自动的保养系统等，为装备提供更加全面的保护。"
        },
        {
            title: "综合平衡钓手（All-Rounder）",
            description: "你是一位综合平衡的钓手！在各个维度上都有不错的表现，没有明显的短板。对装备的保养有着自己的一套方法，既能保证装备的性能，又能让自己享受作钓的乐趣。继续保持这种平衡的状态，你将在钓鱼的道路上越走越远！",
            formula: "true",
            suggestion: "不断学习和尝试新的保养方法和技巧，提升自己的综合能力。同时，也可以根据不同的作钓场景和需求，灵活调整装备的保养策略。",
            equip: "选择一些通用性强、性能稳定的钓具，满足你各种作钓需求。"
        }
    ]
};
const nierxuanze = {
    id: 8,
    title: "拟饵选择策略人格分析",
    questions: [
        {
            id: 1,
            text: "在清澈浅水环境作钓，你会优先选择哪种拟饵？",
            options: [
                {
                    text: "米诺，模仿小鱼游动吸引掠食者",
                    resultKey: [
                        ['Analyticalmind', 7], ['Optimisticcore', 3] 
                    ],
                    icon: "🐟"
                },
                {
                    text: "VIB，通过震动引起鱼的注意",
                    resultKey: [
                        ['Extremehandler', 6], ['Risktolerance', 4]
                    ],
                    icon: "⚡"
                },
                {
                    text: "波趴，制造水面声响诱鱼",
                    resultKey: [
                        ['Weatheradapter', 8], ['Safetypriority', 2] 
                    ],
                    icon: "💥"
                }
            ]
        },
        {
            id: 2,
            text: "当目标鱼是黑鱼时，你会用？",
            options: [
                {
                    text: "雷蛙，专门针对黑鱼设计",
                    resultKey: [
                        ['Safetyplanner', 8], ['Risktolerance', 2] 
                    ],
                    icon: "🐸"
                },
                {
                    text: "复合亮片，多种元素吸引黑鱼",
                    resultKey: [
                        ['Optimisticcore', 6], ['Analyticalmind', 4]
                    ],
                    icon: "🌟"
                },
                {
                    text: "软虫，慢动作诱使黑鱼咬饵",
                    resultKey: [
                        ['Risktolerance', 7], ['Safetypriority', 3] 
                    ],
                    icon: "🐛"
                }
            ]
        },
        {
            id: 3,
            text: "在水草密集区域作钓，你会选？",
            options: [
                {
                    text: "铅头钩配软虫，可深入水草",
                    resultKey: [
                        ['Extremehandler', 7], ['Safetyplanner', 3] 
                    ],
                    icon: "🌱"
                },
                {
                    text: "德州钓组，防挂草效果好",
                    resultKey: [
                        ['Weatheradapter', 6], ['Optimisticcore', 4]
                    ],
                    icon: "🛡️"
                },
                {
                    text: "水面系蛙型拟饵，在水草上跳动",
                    resultKey: [
                        ['Analyticalmind', 5], ['Safetypriority', 5] 
                    ],
                    icon: "🪷"
                }
            ]
        },
        {
            id: 4,
            text: "面对不同季节，你的拟饵选择策略是？",
            options: [
                {
                    text: "根据季节变化，精准切换拟饵",
                    resultKey: [
                        ['Safetyplanner', 6], ['Extremehandler', 4] 
                    ],
                    icon: "🍃"
                },
                {
                    text: "常用几种拟饵，以不变应万变",
                    resultKey: [
                        ['Analyticalmind', 7.5], ['Weatheradapter', 2.5] 
                    ],
                    icon: "🔁"
                },
                {
                    text: "尝试新拟饵，探索不同季节的可能性",
                    resultKey: [
                        ['Safetypriority', 8.5], ['Optimisticcore', 1.5]
                    ],
                    icon: "🚀"
                }
            ]
        },
        {
            id: 5,
            text: "当看到别人用某种拟饵上鱼时，你会？",
            options: [
                {
                    text: "马上换同款拟饵尝试",
                    resultKey: [
                        ['Analyticalmind', 6], ['Weatheradapter', 4]
                    ],
                    icon: "👥"
                },
                {
                    text: "分析情况，考虑是否适合自己的钓点",
                    resultKey: [
                        ['Safetypriority', 5], ['Extremehandler', 5]
                    ],
                    icon: "🧠"
                },
                {
                    text: "坚持用自己的拟饵，相信自己的判断",
                    resultKey: [
                        ['Optimisticcore', 7], ['Risktolerance', 3] 
                    ],
                    icon: "💪"
                }
            ]
        }
    ],
    // 维度权重配置矩阵
    dimensionWeights: { 
        Extremehandler: 1.4, 
        Safetyplanner: 1.45, 
        Weatheradapter: 1.55, 
        Optimisticcore: 1.48, 
        Analyticalmind: 1.45, 
        Risktolerance: 1.55, 
        Safetypriority: 1.65,
    }, 
    // 复合结果判定规则
    results: [
        {
            title: "极端拟饵大师（Extremehandler）",
            description:"你在拟饵选择上敢于突破常规，善于利用极端手法制造诱鱼效果，让目标鱼群在你的攻势下无所遁形。",
            formula: "Extremehandler>=20",  
            suggestion: "继续深入研究不同鱼类喜欢的猎物动作，建议多尝试具有冲击力的拟饵动作，同时注意其他维度的平衡。",
            equip: "选择逼真度高、动作灵活的拟饵，如高品质的米诺和仿生软虫。搭配灵敏的钓竿和渔轮，能更好地感知鱼咬饵的瞬间。"
        },
        {
            title: "安全规划专家（Safetyplanner）",
            description: "你在拟饵选择上注重整体规划，力求在吸引鱼群的同时确保作钓过程的安全与稳定。",
            formula: "Safetyplanner>=18",
            suggestion: "可以多关注拟饵的设计细节，确保既能吸引目标鱼又能降低作钓风险。",
            equip: "选择结构稳固、设计合理的拟饵，并搭配安全防护装备。"
        },
        {
           title: "天气应变高手（Weatheradapter）",
           description: "你对环境变化反应迅速，能根据水温、光线等条件灵活调整拟饵策略，让鱼群对你的饵料产生浓厚兴趣。",
           formula: "Weatheradapter>=20", 
           suggestion: "建议结合实时天气变化，选用颜色或动作更具适应性的拟饵。",
            equip: "选择具备多重颜色变化功能的拟饵，搭配环境监测设备。"
        },
        {
            title: "乐观先锋（Optimisticcore）", 
            description: "你充满活力与创意，在拟饵选择上总能提出新颖独特的方案，即便环境不佳也能乐观迎战。", 
            formula: "Optimisticcore>=20", 
            suggestion: "建议在创新的同时注意结合实际情况，确保拟饵效果与作钓环境匹配。", 
            equip: "选择设计独特、造型夸张的拟饵，激发鱼群的好奇心。" 
        },
        {
            title: "理性分析师（Analyticalmind）", 
            description: "你擅长通过数据与经验进行理性判断，对拟饵的选择总能做出精准分析，确保每一次作钓都有据可依。", 
            formula: "Analyticalmind>=19", 
            suggestion: "建议多记录作钓数据，进一步优化拟饵选择策略。", 
            equip: "选择参数可调、效果稳定的拟饵，配合数据分析系统。" 
        },
        {
            title: "风险承受者（Risktolerance）", 
            description: "你敢于挑战极限，即使面对较高风险也能镇定应对，凭借出色的风险承受能力选择最具冲击力的拟饵。", 
            formula: "Risktolerance>=19", 
            suggestion: "建议在冒险之余注意适时调整策略，避免过度冒险。", 
            equip: "选择高刺激性的拟饵，同时配备紧急应变装备。"
        },
        {
            title: "安全优先守护者（Safetypriority）", 
            description: "你始终将安全放在首位，无论拟饵如何设计，都严格把控风险，确保作钓过程万无一失。", 
            formula: "Safetypriority>=19",
             suggestion: "建议在确保安全的基础上，逐步尝试更多创新型拟饵，提高整体作钓体验。", 
            equip: "选择安全性极高的拟饵，并配置完善的防护措施。"
        },
        {
            title: "全能拟饵师", 
            description: "你在各个维度上均表现出色，既能突破极限又能保证安全，是一个全面发展的拟饵选择高手。",
            formula: "true", 
            suggestion: "继续保持多元化的作钓策略，不断完善自己的拟饵选择体系，迎接更多挑战。",
             equip: "根据不同环境灵活搭配各种高端拟饵与钓具，成就全能作钓风格。" 
        }
    ]
};
const shejiao = {
    id: 9,
    title: "钓鱼社交人格测试",
    questions: [
        {
            id: 1,
            text: "在钓鱼群里看到有人分享超厉害的钓获，你会？",
            options: [
                {
                    text: "马上点赞评论，求钓点和经验分享",
                    resultKey: [
                        ['Socialengager', 7],
                        ['Knowledgesharer', 3]
                    ],
                    icon: "👍"
                },
                {
                    text: "默默收藏，自己研究分析",
                    resultKey: [
                        ['Prudentshow', 6],
                        ['Knowledgesharer', 4]
                    ],
                    icon: "📌"
                },
                {
                    text: "觉得他在炫耀，不予理会",
                    resultKey: [
                        ['Soloenjoyer', 8],
                        ['Educator', 2]
                    ],
                    icon: "🙄"
                }
            ]
        },
        {
            id: 2,
            text: "群里组织集体钓鱼活动，你会？",
            options: [
                {
                    text: "毫不犹豫报名，积极参与讨论准备",
                    resultKey: [
                        ['Socialengager', 6],
                        ['Groupsynergy', 4]
                    ],
                    icon: "🎉"
                },
                {
                    text: "考虑时间和地点再决定，若合适就参加",
                    resultKey: [
                        ['Prudentshow', 7],
                        ['Groupsynergy', 3]
                    ],
                    icon: "🤔"
                },
                {
                    text: "直接拒绝，更喜欢独自钓鱼",
                    resultKey: [
                        ['Soloenjoyer', 5],
                        ['Educator', 5]
                    ],
                    icon: "🚫"
                }
            ]
        },
        {
            id: 3,
            text: "在钓点遇到陌生钓友，你会？",
            options: [
                {
                    text: "主动打招呼，交流钓鱼心得",
                    resultKey: [
                        ['Socialengager', 8],
                        ['Knowledgesharer', 2]
                    ],
                    icon: "👋"
                },
                {
                    text: "点头示意，保持距离继续钓鱼",
                    resultKey: [
                        ['Groupsynergy', 7],
                        ['Soloenjoyer', 3]
                    ],
                    icon: "🙂"
                },
                {
                    text: "当作没看见，专心自己的钓事",
                    resultKey: [
                        ['Soloenjoyer', 6],
                        ['Educator', 4]
                    ],
                    icon: "👀"
                }
            ]
        },
        {
            id: 4,
            text: "钓到一条大鱼，你会？",
            options: [
                {
                    text: "马上拍照发群里，大肆炫耀",
                    resultKey: [
                        ['Natureharmony', 7],
                        ['Socialengager', 3]
                    ],
                    icon: "📸"
                },
                {
                    text: "拍几张美照，悄悄发朋友圈",
                    resultKey: [
                        ['Knowledgesharer', 6],
                        ['Socialengager', 4]
                    ],
                    icon: "📱"
                },
                {
                    text: "默默放生，不声张",
                    resultKey: [
                        ['Prudentshow', 5],
                        ['Educator', 5]
                    ],
                    icon: "🐟"
                }
            ]
        },
        {
            id: 5,
            text: "群里有人分享错误的钓鱼知识，你会？",
            options: [
                {
                    text: "立刻指出错误，详细讲解正确知识",
                    resultKey: [
                        ['Knowledgesharer', 3],  // ✅ 统一维度命名
                        ['Educator', 7]          // ✅ 新增教育者维度
                    ],
                    icon: "🧐"
                },
                {
                    text: "委婉提醒，怕伤和气",
                    resultKey: [
                        ['Groupsynergy', 7],
                        ['Natureharmony', 3]
                    ],
                    icon: "😶‍🌫️"
                },
                {
                    text: "不管他，让他自己吃亏",
                    resultKey: [
                        ['Soloenjoyer', 3],
                        ['Educator', 7]
                    ],
                    icon: "🙈"
                }
            ]
        }
    ],
    // 维度权重配置矩阵
    dimensionWeights: {  // ✅ 重构后的7个核心维度
        Socialengager: 1.21,    // 社交活跃度
        Knowledgesharer: 1.6, // 知识分享欲
        Soloenjoyer: 1.5,    // 独处偏好
        Groupsynergy: 1.71,   // 团队协同
        Prudentshow: 1.45,    // 谨慎展示
        Natureharmony: 1.55,   // 自然亲和
        Educator: 1.8,         // 教育倾向
    },
    // 复合结果判定规则
    results: [
        {
            title: "社交达人（Social Seeker）",
            description: "你在钓鱼圈就是社交界的超级明星！不管是群里还是钓点，你总是热情满满，主动和大家交流，分享经验，求知识，求钓点，就像一块巨大的磁铁，把钓友们都吸引过来。有你在的地方，钓鱼群永远不会冷场，钓点也充满欢声笑语。",
            formula:"Socialengager >= 21",
            suggestion: "继续发挥你的社交优势，组织更多有趣的钓鱼活动，让更多钓友认识你。同时，也可以利用社交关系，拓展更多优质的钓点资源。",
            equip: "选择颜色鲜艳、有个性的钓具，让你在钓点更加引人注目。配备一个大容量的钓具包，方便携带更多的装备和分享给其他钓友。"
        },
        {
            title: "知识大师（Knowledge Hunter）",
            description: "你对钓鱼知识的渴望就像海绵吸水一样，永无止境！遇到错误的知识会立刻纠正，看到别人分享好的钓获就会求经验。你脑袋里装满了各种钓鱼知识，就像一本行走的钓鱼百科全书，是钓友们眼中的知识权威。",
            formula: "(Knowledgesharer>=19 && Educator>=9)", // ✅ 复合条件
            suggestion: "可以把自己的知识整理成文章或者视频分享到网络上，让更多人受益。同时，不断学习新的钓鱼知识，保持知识的更新。",
            equip: "配备专业的钓鱼书籍和电子设备，如钓鱼知识学习平板，方便你随时学习和查阅资料。"
        },
        {
            title: "独行侠（Soloenjoyer）",
            description: "你喜欢独自享受钓鱼的宁静，对社交活动不太感兴趣。在钓点，你就像一个孤独的剑客，专注于自己的钓事，不被外界干扰。鱼群就是你唯一的伙伴，你享受着与大自然独处的时光。",
            formula: "Soloenjoyer >= 22", 
            suggestion: "虽然独自钓鱼很惬意，但偶尔也可以参加一些集体活动，结交一些志同道合的朋友，说不定会有新的收获。",
            equip: "选择轻便、易于携带的钓具，方便你独自出行。配备一个小型的钓鱼帐篷，为你提供一个舒适的个人空间。"
        },
        {
            title: "低调展示者（Prudent Show）",
            description: "你钓到好鱼不会大肆张扬，但也会悄悄发个朋友圈展示一下。你就像一个神秘的钓鱼高手，不轻易显露自己的实力，但偶尔的小炫耀也能让朋友们知道你的厉害。",
            formula: "Prudentshow >= 18", 
            suggestion: "可以适当多分享一些钓鱼过程中的趣事和经验，让朋友们更了解你的钓鱼生活。",
            equip: "选择外观简约但性能卓越的钓具，体现你的低调奢华。"
        },
        {
            title: "团队核心（Group Synergy）",
            description: "你是钓鱼团队活动的积极参与者，只要时间和地点合适，你就会毫不犹豫地加入。在团队中，你就像一颗螺丝钉，虽然不起眼，但却起着重要的作用，为团队的和谐和成功贡献自己的力量。",
            formula: "(Groupsynergy>=18 && Socialengager>=16)", // ✅ 新增复合判断
            suggestion: "在团队活动中，发挥你的组织和协调能力，让活动更加有序和有趣。",
            equip: "选择适合团队活动的钓具，如通用型的钓竿和渔轮，方便与队友交换使用。"
        },
        {
            title: "研究学者（Prudentshow）",
            description: "你就像一个钓鱼界的研究员，看到别人分享的钓获会默默收藏研究。你喜欢通过自己的分析和研究来提高钓鱼技能，不依赖别人的经验，有着自己独特的见解。",
            formula: "Prudentshow >= 16",
            suggestion: "可以把自己的研究成果分享给其他钓友，促进大家共同进步。同时，多参加一些钓鱼研讨会，与其他研究者交流心得。",
            equip: "配备专业的钓鱼研究工具，如显微镜观察鱼饵，数据记录器记录钓鱼数据。"
        },   
        {
            title: "全能社交型（All-Rounder）",
            description: "你的各项维度得分都比较均衡，没有明显的偏向。你是一个全能型的钓友，既能享受社交的乐趣，又能独自沉浸在钓鱼的世界里。你就像一个多面手，在不同的钓鱼场景中都能游刃有余。",
            formula: "true",
            suggestion: "根据不同的情况和心情，选择适合自己的钓鱼方式和社交方式。不断尝试新的事物，让自己的钓鱼生活更加丰富多彩。",
            equip: "配备一套齐全的钓具，包括各种类型的钓竿、渔轮和鱼饵，适应不同的钓鱼需求。"
        }
    ]
};
const tianqi = {
    id: 10,
    title: "对天气的敏感度",
    questions: [
        {
            id: 1,
            text: "出发钓鱼前一天，天气预报显示有雨，你会？",
            options: [
                {
                    text: "不管雨不雨的，照去不误，钓鱼人的字典里没有怕雨",
                    resultKey: [
                        ['Extremehandler',8],  // ✅ 合并原WeatherWarrior/Rebel
                        ['Risktolerance',2]
                    ],
                    icon: "🌧️"
                },
                {
                    text: "先准备好雨具，再看看当天实际天气情况再决定",
                    resultKey: [
                        ['Safetyplanner',7],  // ✅ 合并原WeatherPlanner/SafetyFirst
                        ['Analyticalmind',3]
                    ],
                    icon: "⛱️"
                },
                {
                    text: "直接取消行程，雨天鱼肯定不好钓",
                    resultKey: [
                        ['WeatherAvoider',6],
                        ['Safetypriority',4]
                    ],
                    icon: "🏠"
                }
            ]
        },
        {
            id: 2,
            text: "钓鱼时突然刮起大风，你会？",
            options: [
                {
                    text: "迎难而上，调整抛竿技巧继续钓，大风算什么",
                    resultKey: [
                        ['Extremehandler', 6],  // ✅ 合并原WeatherWarrior/Adventurous
                        ['Risktolerance', 4]    // ✅ 风险承受维度
                    ],
                    icon: "💨"
                },
                {
                    text: "先观察风的方向和强度，再调整钓位和钓组",
                    resultKey: [
                        ['Safetyplanner', 5],   // ✅ 安全规划者
                        ['Analyticalmind', 5]   // ✅ 分析思维
                    ],
                    icon: "🗡️"
                },
                {
                    text: "赶紧收拾东西回家，这风太大没法钓了",
                    resultKey: [
                        ['WeatherAvoider', 7],  // ✅ 天气逃避者
                        ['Safetypriority', 3]   // ✅ 安全优先
                    ],
                    icon: "🚪"
                }
            ]
        },
        {
            id: 3,
            text: "当气温骤降时，你觉得鱼会？",
            options: [
                {
                    text: "鱼肯定更活跃了，赶紧多下几竿",
                    resultKey: [
                        ['Optimisticcore', 8],   // ✅ 合并原OptimisticWeather
                        ['Risktolerance', 2]     // ✅ 风险承受
                    ],
                    icon: "❄️"
                },
                {
                    text: "鱼可能会游到深水区，得换个钓点试试",
                    resultKey: [
                        ['Weatheradapter', 7],   // ✅ 天气适应者
                        ['Analyticalmind', 3]    // ✅ 分析思维
                    ],
                    icon: "🧐"
                },
                {
                    text: "气温降了鱼都不咬钩了，今天白来了",
                    resultKey: [
                        ['WeatherAvoider', 6],   // ✅ 天气逃避者
                        ['Safetypriority', 4]    // ✅ 安全优先
                    ],
                    icon: "😢"
                }
            ]
        },
        {
            id: 4,
            text: "遇到阴天时，你会选择？",
            options: [
                {
                    text: "阴天好啊，鱼更放松，加大抛竿频率",
                    resultKey: [
                        ['Optimisticcore', 6],   // ✅ 乐观核心
                        ['Extremehandler', 4]    // ✅ 极端处理
                    ],
                    icon: "☁️"
                },
                {
                    text: "阴天光线暗，用颜色鲜艳的饵试试",
                    resultKey: [
                        ['Weatheradapter', 5],   // ✅ 天气适应者
                        ['Analyticalmind', 5]    // ✅ 分析思维
                    ],
                    icon: "🎨"
                },
                {
                    text: "阴天鱼口不好，等晴天再来",
                    resultKey: [
                        ['Safetyplanner', 7],    // ✅ 安全规划者
                        ['Safetypriority', 3]    // ✅ 安全优先
                    ],
                    icon: "⏳"
                }
            ]
        },
        {
            id: 5,
            text: "预报说有雷阵雨，你还会去钓鱼吗？",
            options: [
                {
                    text: "雷阵雨算啥，带个避雷针继续钓",
                    resultKey: [
                        ['Extremehandler', 6],
                        ['Risktolerance', 4]
                    ],
                    icon: "⚡"
                },
                {
                    text: "等雷阵雨过去再去，安全第一",
                    resultKey: [
                        ['Safetyplanner', 7],
                        ['Safetypriority', 3]
                    ],
                    icon: "🛡️"
                },
                {
                    text: "不去了，雷阵雨太危险了",
                    resultKey: [
                        ['WeatherAvoider', 8],
                        ['Safetypriority', 2]
                    ],
                    icon: "👀"
                }
            ]
        }
    ],
    dimensionWeights: {  // ✅ 重构后的7个核心维度
        Extremehandler: 1.5,    // 极端天气处理者（合并Warrior/Rebel）
        Safetyplanner: 1.65,    // 安全规划者（合并Planner/SafetyFirst）  
        Weatheradapter: 1.75,    // 天气适应者（原Adapter）
        Optimisticcore: 1.75,   // 乐观核心（合并Optimist/Optimistic）
        Analyticalmind: 1.75,    // 分析思维（原Analyst）
        Risktolerance: 1.75,    // 风险承受（合并RiskTaker/Tolerance）
        Safetypriority: 1.9,     // 安全优先（原Priority）
    },
    // 复合结果判定规则
    results: [
        {
            title: "极端天气征服者（Extremehandler）",
            description: "你就是钓鱼界的天气战神！不管狂风暴雨、电闪雷鸣，都无法阻挡你奔向钓点的脚步。在你眼中，恶劣天气就是与鱼群战斗的最佳时机，你就像一位无畏的勇士，在风雨中抛竿，让鱼群闻风丧胆！",
            formula:  "Extremehandler>=22",
            suggestion: "虽然你勇气可嘉，但也要注意安全哦。可以准备一些专业的防雨防风装备，让自己在恶劣天气中也能舒适钓鱼。",
            equip: "选择坚固耐用的钓竿和渔轮，能承受恶劣天气的考验。穿上防水防风的钓鱼服，戴上防滑手套。"
        },
        {
            title: "安全规划大师（Safetyplanner）",
            description: "你是个精明的天气规划师，出发钓鱼前会仔细研究天气预报，做好各种应对准备。不管天气如何变化，你都能有条不紊地调整策略，就像一位运筹帷幄的将军，让鱼群乖乖上钩！",
            formula: "(Safetyplanner>=18 && Analyticalmind>= 16)",  // ✅ 复合条件
            suggestion: "继续保持你的规划能力，同时可以多关注一些实时的天气数据，让你的计划更加精准。",
            equip: "配备一个多功能的天气监测设备，如智能手表或气象仪。准备不同类型的饵料，以应对不同天气下鱼的口味变化。"
        },
        {
            title: "天气观察者（Weatheradapter）",
            description: "你的观察力堪比鹰眼，钓鱼时能敏锐地捕捉到天气的细微变化。通过观察风的方向、云的形状，你就能判断鱼群的动向，就像一位神秘的天气巫师，让鱼群无处遁形！",
            formula: "Weatheradapter >= 13",
            suggestion: "继续发挥你的观察能力，同时可以学习一些气象知识，让你的判断更加准确。",
            equip: "配备一个高倍望远镜，帮助你更清晰地观察天气变化。使用带有反光涂层的鱼线，在不同天气下更容易观察鱼线的动态。"
        },
        
        {
            title:"乐观主义核心（Optimisticcore）",
            description: "你对天气的乐观简直爆棚！任何天气在你眼里都是钓鱼的好时机，你的积极态度就像一把火，能点燃整个钓鱼场的热情，让大家都跟着你一起享受钓鱼的乐趣！",
            formula: "(Optimisticcore>=20 || (Optimisticcore>=18 && Risktolerance>=12))", 
            suggestion: "保持这份乐观，同时可以和其他钓友分享你的快乐，让更多人爱上钓鱼。",
            equip: "选择带有欢快色彩的钓鱼装备，如彩色的钓竿和渔轮。带上一些小零食，和钓友们一起分享。"
        },
        {
            title: "风险掌控者（Risktolerance）",
            description: "你在风险与收获之间找到完美平衡，不管天气如何变化，你都能迅速调整自己的钓鱼策略，让鱼群防不胜防！",
            formula:  "(Risktolerance>=10 && Analyticalmind>=10)",
            suggestion: "继续提升你的适应能力，尝试在更多极端天气下钓鱼。",
            equip: "准备多种类型的钓饵和钓具，以适应不同天气下的钓鱼需求。带上一个多功能的钓鱼工具包，方便随时调整装备。"
        },

        {
            title: "安全至上模范（Safetypriority）",
            description: "你把安全放在第一位，钓鱼时会根据天气情况做出最安全的选择。你的谨慎就像一道防线，能保护你在钓鱼时免受伤害，让你安心享受钓鱼的乐趣。",
            formula: "Safetypriority >= 20",  // ✅ 最高优先级
            suggestion: "继续保持安全意识，同时也可以在安全的前提下，尝试一些新的钓鱼地点和方法。",
            equip: "选择质量可靠、符合安全标准的钓鱼装备。带上救生衣、防滑鞋等安全装备。"
        },
        {
            title: "综合气象钓手（All-Rounder）",
            description: "你在面对天气时表现比较均衡，没有明显的偏向。你就像一位全能选手，能在不同的天气条件下灵活应对，享受钓鱼的每一刻。",
            formula: "true",
            suggestion: "继续保持这种均衡的状态，不断学习和积累经验，提升自己的钓鱼水平。",
            equip: "根据不同的天气情况选择合适的钓鱼装备，确保自己在各种天气下都能舒适钓鱼。"
        }
    ]
};    

  module.exports = {
    personalityTest,
    emergencyTest, 
    natureAbilityTest,
    juece,
    fishingKnowledgeTest,
    yuhuochuli,
    baoyang,
    nierxuanze,
    shejiao,
    tianqi
  };
  
  